#!/usr/bin/env python3
"""
Academy Engine - Zero-Configuration ORCID Publication Sync
Location: scripts/sync_orcid.py
-----------------------------------------------------------------------------
Automatically discovers the academician's ORCID ID from `_config.yml`
(or `_person/academician.md`), fetches bibliographic works from the ORCID
and Crossref APIs, prevents duplicate imports, and generates publication
markdown files under `_publications/en/`.
"""

import html
import json
import os
import re
import ssl
import sys
import unicodedata
import urllib.error
import urllib.request
from pathlib import Path

# Resolve Repository Root
REPO_ROOT = Path(__file__).resolve().parent.parent
SOCIALS_PATH = REPO_ROOT / "_data" / "socials.yml"
CONFIG_PATH = REPO_ROOT / "_config.yml"
PERSON_PATH = REPO_ROOT / "_person" / "academician.md"
PUBLICATIONS_DIR = REPO_ROOT / "_publications" / "en"

# ORCID & Crossref API Endpoints
ORCID_API_URL = "https://pub.orcid.org/v3.0/{orcid}/works"
CROSSREF_API_URL = "https://api.crossref.org/works/{doi}"

# Crossref type to standard entryType mapping
ENTRY_TYPE_MAP = {
    "journal-article": "article",
    "proceedings-article": "inproceedings",
    "book-chapter": "incollection",
    "book": "book",
    "dissertation": "phdthesis",
    "report": "techreport",
    "posted-content": "preprint",
    "dataset": "misc",
}

def get_ssl_context():
    """Returns an SSL context that gracefully falls back if local certs are missing."""
    try:
        return ssl.create_default_context()
    except Exception:
        pass
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx

def fetch_json(url, headers=None, timeout=15):
    """Fetches and parses JSON from a URL with polite headers and SSL fallback."""
    req_headers = {
        "Accept": "application/json",
        "User-Agent": "Academy-Jekyll/1.0 (https://github.com/BanaBirSebepVer/Academy)",
    }
    if headers:
        req_headers.update(headers)

    req = urllib.request.Request(url, headers=req_headers)
    ctx = get_ssl_context()

    try:
        with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise
    except Exception as e:
        # Retry once with unverified context if certificate verification failed
        if "CERTIFICATE_VERIFY_FAILED" in str(e):
            fallback_ctx = ssl.create_default_context()
            fallback_ctx.check_hostname = False
            fallback_ctx.verify_mode = ssl.CERT_NONE
            with urllib.request.urlopen(req, context=fallback_ctx, timeout=timeout) as resp:
                return json.loads(resp.read().decode("utf-8"))
        raise

def normalize_doi(doi_str):
    """Cleans and standardizes DOI string for exact matching."""
    if not doi_str:
        return ""
    doi = str(doi_str).strip()
    doi = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi, flags=re.IGNORECASE)
    doi = re.sub(r"^doi:\s*", "", doi, flags=re.IGNORECASE)
    return doi.strip().lower()

def extract_orcid_from_text(text):
    """Searches for a valid 16-digit ORCID identifier."""
    if not text:
        return None
    # Check for placeholder pattern
    if re.search(r'0000-000[0-9Xx]-[Xx]{4}-[Xx]{4}', text, re.IGNORECASE):
        return None

    m = re.search(r'\b(0000-000[1-9Xx]-\d{4}-[\dX]{4})\b', text, re.IGNORECASE)
    if m:
        return m.group(1).upper()
    m = re.search(r'\b(0000-\d{4}-\d{4}-[\dX]{4})\b', text, re.IGNORECASE)
    if m:
        val = m.group(1).upper()
        if not val.startswith("0000-0000-0000-0000"):
            return val
    return None

def detect_orcid_id():
    """Detects ORCID primarily from _data/socials.yml, falling back to _config.yml or _person/academician.md."""
    # 1. Primary: Check _data/socials.yml
    if SOCIALS_PATH.exists():
        try:
            content = SOCIALS_PATH.read_text(encoding="utf-8")
            m = re.search(r'^\s*orcid\s*:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
            if m:
                raw_val = m.group(1).strip()
                orcid = extract_orcid_from_text(raw_val)
                if orcid:
                    return orcid
        except Exception as e:
            print(f"[WARN] Failed to read _data/socials.yml: {e}", file=sys.stderr)

    # 2. Fallback: Check _config.yml
    if CONFIG_PATH.exists():
        try:
            content = CONFIG_PATH.read_text(encoding="utf-8")
            m = re.search(r'^\s*orcid\s*:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
            if m:
                raw_val = m.group(1).strip()
                orcid = extract_orcid_from_text(raw_val)
                if orcid:
                    return orcid
        except Exception as e:
            print(f"[WARN] Failed to read _config.yml: {e}", file=sys.stderr)

    # 3. Fallback: Check _person/academician.md
    if PERSON_PATH.exists():
        try:
            content = PERSON_PATH.read_text(encoding="utf-8")
            orcid = extract_orcid_from_text(content)
            if orcid:
                return orcid
        except Exception as e:
            print(f"[WARN] Failed to read _person/academician.md: {e}", file=sys.stderr)

    return None

def collect_existing_dois():
    """Recursively scans _publications/ and collects all normalized DOIs."""
    existing = set()
    pubs_root = REPO_ROOT / "_publications"
    if not pubs_root.exists():
        return existing

    for md_file in pubs_root.rglob("*.md"):
        try:
            content = md_file.read_text(encoding="utf-8")
            m = re.search(r'^\s*doi\s*:\s*["\']?([^"\'\n]+)["\']?', content, re.MULTILINE)
            if m:
                clean_d = normalize_doi(m.group(1))
                if clean_d:
                    existing.add(clean_d)
        except Exception as e:
            print(f"[WARN] Could not parse DOI in {md_file.name}: {e}", file=sys.stderr)

    return existing

def slugify(text):
    """Converts a title into a clean, filesystem-safe URL slug."""
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    text = re.sub(r'[^\w\s-]', '', text).strip().lower()
    text = re.sub(r'[-\s]+', '-', text)
    return text[:60].rstrip('-')

def clean_html_abstract(abstract_str):
    """Removes JATS XML, HTML tags, and escapes from abstracts."""
    if not abstract_str:
        return ""
    text = re.sub(r'<[^>]+>', ' ', str(abstract_str))
    text = html.unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def parse_crossref_work(doi, crossref_data):
    """Extracts standardized publication fields from Crossref work message."""
    msg = crossref_data.get("message", {})

    # Title
    raw_title = msg.get("title", [""])[0]
    title = html.unescape(str(raw_title)).strip()

    # Authors
    authors = []
    for a in msg.get("author", []):
        given = a.get("given", "").strip()
        family = a.get("family", "").strip()
        if given and family:
            authors.append(f"{given} {family}")
        elif family:
            authors.append(family)
        elif a.get("name"):
            authors.append(a.get("name").strip())

    # Journal / Container
    container = msg.get("container-title", [""])
    journal = html.unescape(container[0]).strip() if container else ""

    # Date & Year
    pub_date_parts = None
    for date_key in ("published-print", "published-online", "issued", "created"):
        d = msg.get(date_key, {})
        parts = d.get("date-parts", [[]])[0]
        if parts and len(parts) >= 1:
            pub_date_parts = parts
            break

    year = "2026"
    date_str = "2026-01-01"
    if pub_date_parts:
        year = str(pub_date_parts[0])
        month = f"{pub_date_parts[1]:02d}" if len(pub_date_parts) >= 2 else "01"
        day = f"{pub_date_parts[2]:02d}" if len(pub_date_parts) >= 3 else "01"
        date_str = f"{year}-{month}-{day}"

    # Volume, Issue, Pages
    volume = str(msg.get("volume", "")).strip()
    issue = str(msg.get("issue", "")).strip()
    pages = str(msg.get("page", "")).strip()

    # Entry Type
    crossref_type = msg.get("type", "")
    entry_type = ENTRY_TYPE_MAP.get(crossref_type, "article")

    # Abstract
    abstract = clean_html_abstract(msg.get("abstract", ""))

    return {
        "title": title or "Untitled Publication",
        "authors": authors,
        "journal": journal,
        "date": date_str,
        "year": year,
        "volume": volume,
        "issue": issue,
        "pages": pages,
        "doi": doi,
        "entryType": entry_type,
        "abstract": abstract,
    }

def format_publication_markdown(meta):
    """Formats the publication metadata into Jekyll markdown with YAML front matter."""
    lines = [
        "---",
        "layout: publication",
        f'title: {json.dumps(meta["title"], ensure_ascii=False)}',
        f'date: {meta["date"]}',
        f'year: "{meta["year"]}"',
    ]

    if meta.get("authors"):
        lines.append("authors:")
        for auth in meta["authors"]:
            lines.append(f'  - {json.dumps(auth, ensure_ascii=False)}')

    if meta.get("journal"):
        lines.append(f'journal: {json.dumps(meta["journal"], ensure_ascii=False)}')

    if meta.get("volume"):
        lines.append(f'volume: {json.dumps(meta["volume"])}')

    if meta.get("issue"):
        lines.append(f'issue: {json.dumps(meta["issue"])}')

    if meta.get("pages"):
        lines.append(f'pages: {json.dumps(meta["pages"])}')

    lines.append(f'doi: {json.dumps(meta["doi"])}')
    lines.append(f'entryType: {json.dumps(meta["entryType"])}')
    lines.append("lang: en")
    lines.append("---")

    body = ""
    if meta.get("abstract"):
        body = f"\n\n### Abstract\n\n{meta['abstract']}\n"
    else:
        body = "\n"

    return "\n".join(lines) + body

def sync_orcid():
    """Main workflow: checks config, fetches ORCID works, queries Crossref, and saves new publications."""
    dry_run = "--dry-run" in sys.argv

    print("=" * 70)
    print("Academy Engine - ORCID Publication Sync")
    if dry_run:
        print("Mode: DRY-RUN (no files will be written)")
    print("=" * 70)

    orcid = detect_orcid_id()
    if not orcid:
        print("Notice: No valid ORCID ID found in _data/socials.yml. Skipping publication sync.")
        sys.exit(0)

    print(f"[INFO] Synchronizing publications for ORCID: {orcid}")

    # Ensure destination directory exists
    PUBLICATIONS_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Collect existing DOIs to avoid duplicates
    existing_dois = collect_existing_dois()
    print(f"[INFO] Found {len(existing_dois)} existing publication DOI(s) in repository.")

    # 2. Fetch works list from ORCID Works API
    orcid_url = ORCID_API_URL.format(orcid=orcid)
    try:
        orcid_data = fetch_json(orcid_url)
    except Exception as e:
        print(f"[ERROR] Failed to query ORCID API: {e}", file=sys.stderr)
        sys.exit(1)

    if not orcid_data:
        print(f"[WARN] No public profile data returned for ORCID: {orcid}")
        sys.exit(0)

    groups = orcid_data.get("group", [])
    print(f"[INFO] Retrieved {len(groups)} work group(s) from ORCID.")

    # 3. Extract unique DOIs from ORCID works
    orcid_works_to_sync = []
    seen_dois = set()

    for g in groups:
        for summary in g.get("work-summary", []):
            ext_ids = summary.get("external-ids", {}).get("external-id", [])
            for eid in ext_ids:
                id_type = eid.get("external-id-type", "").strip().lower()
                id_val = eid.get("external-id-value", "").strip()
                if id_type == "doi" and id_val:
                    norm_d = normalize_doi(id_val)
                    if norm_d and norm_d not in seen_dois:
                        seen_dois.add(norm_d)
                        orcid_works_to_sync.append({
                            "doi": id_val,
                            "normalized_doi": norm_d,
                            "summary": summary
                        })

    print(f"[INFO] Found {len(orcid_works_to_sync)} unique DOI(s) in ORCID profile.")

    # 4. Filter out publications already in the repository
    new_works = [w for w in orcid_works_to_sync if w["normalized_doi"] not in existing_dois]
    print(f"[INFO] {len(new_works)} new publication(s) eligible for import.")

    if not new_works:
        print("[SUCCESS] All ORCID publications are already synchronized with repository.")
        sys.exit(0)

    # 5. Process each new publication
    synced_count = 0
    for work in new_works:
        doi = work["doi"]
        norm_doi = work["normalized_doi"]
        summary = work["summary"]

        print(f"\n[SYNCING] Fetching Crossref metadata for DOI: {doi}...")
        meta = None

        try:
            crossref_url = CROSSREF_API_URL.format(doi=doi)
            crossref_data = fetch_json(crossref_url)
            if crossref_data and "message" in crossref_data:
                meta = parse_crossref_work(doi, crossref_data)
        except Exception as e:
            print(f"  -> Crossref lookup failed ({e}). Falling back to ORCID summary data.")

        # Fallback to ORCID summary if Crossref is unavailable
        if not meta:
            title = summary.get("title", {}).get("title", {}).get("value") or "Untitled Publication"
            journal = summary.get("journal-title", {}).get("value") or ""
            pub_date = summary.get("publication-date") or {}
            year = pub_date.get("year", {}).get("value") or "2026"
            meta = {
                "title": title,
                "authors": [],
                "journal": journal,
                "date": f"{year}-01-01",
                "year": str(year),
                "volume": "",
                "issue": "",
                "pages": "",
                "doi": doi,
                "entryType": "article",
                "abstract": "",
            }

        # Determine target file name: YYYY-slugified-title.md
        year = meta["year"]
        slug = slugify(meta["title"])
        if not slug:
            slug = slugify(norm_doi)

        filename = f"{year}-{slug}.md"
        target_path = PUBLICATIONS_DIR / filename

        # Avoid collision if another file has the exact same name
        counter = 1
        while target_path.exists():
            filename = f"{year}-{slug}-{counter}.md"
            target_path = PUBLICATIONS_DIR / filename
            counter += 1

        if dry_run:
            print(f"  [DRY-RUN] Would create -> {target_path.relative_to(REPO_ROOT)}")
        else:
            md_content = format_publication_markdown(meta)
            target_path.write_text(md_content, encoding="utf-8")
            print(f"  [CREATED] -> {target_path.relative_to(REPO_ROOT)}")
        synced_count += 1

    print("\n" + "=" * 70)
    print(f"[SUCCESS] Synchronized {synced_count} new publication(s) into _publications/en/")
    print("=" * 70)

if __name__ == "__main__":
    sync_orcid()
