#!/usr/bin/env python3
"""
Academy Engine - Network & Markdown Front-Matter Integrity Linter
-----------------------------------------------------------------
Automated verification suite that validates:
  1. Markdown front-matter integrity across publications, lessons, and posts.
     - Required keys, syntax conformity, and schema correctness.
     - Valid entryType for publications.
     - Sub-module ordering, topics for weekly lessons.
     - Duplicate DOI detection.
  2. Academic Network Registry (_data/academic_network.yml):
     - HTTP 200 status and generator footprint verification.
     - Automatic avatar extraction and dead link pruning.

Usage:
  python3 scripts/verify_network.py [--dry-run] [--timeout 10] [--skip-lint] [--skip-network]
"""

import argparse
import os
import re
import sys
from pathlib import Path
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import requests
import yaml

REPO_ROOT = Path(__file__).resolve().parent.parent

HEADER_COMMENT = """# ==============================================================================
# Academic Network Registry
# Community of scholars, courses, and institutions powered by the Academy Engine
# ==============================================================================
"""

USER_AGENT = "Academy-Network-Audit/1.0"

FOOTPRINT_REGEX = re.compile(
    r'<meta\s+[^>]*name=["\']generator["\'][^>]*content=["\']Jekyll Academy Engine["\']|'
    r'<meta\s+[^>]*content=["\']Jekyll Academy Engine["\'][^>]*name=["\']generator["\']|'
    r'class=["\'][^"\']*academy-engine[^"\']*["\']',
    re.IGNORECASE
)

# Standard BibTeX / Scholarly entry types
VALID_ENTRY_TYPES = {
    "article",
    "book",
    "booklet",
    "conference",
    "inbook",
    "incollection",
    "inproceedings",
    "manual",
    "mastersthesis",
    "misc",
    "phdthesis",
    "proceedings",
    "techreport",
    "unpublished",
    "preprint",
}


# ==============================================================================
# MARKDOWN FRONT-MATTER INTEGRITY VALIDATION
# ==============================================================================

def normalize_doi(doi):
    """Cleans and standardizes DOI string for exact matching."""
    if not doi:
        return ""
    doi_str = str(doi).strip().lower()
    doi_str = re.sub(r"^https?://(dx\.)?doi\.org/", "", doi_str)
    doi_str = re.sub(r"^doi:\s*", "", doi_str)
    # Ignore placeholders such as 10.xxxx/...
    if "10.xxxx" in doi_str or doi_str == "":
        return ""
    return doi_str


def parse_front_matter(file_path):
    """
    Extracts and parses YAML front-matter from a markdown file.
    Returns (data_dict, error_message).
    """
    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        return None, f"Unable to read file: {e}"

    if not content.startswith("---"):
        return None, "Missing front-matter opening delimiter ('---') at start of file"

    # Search for closing delimiter '---' or '...' on its own line after opening
    match = re.search(r"^(?:---|\.\.\.)\s*$", content[3:], re.MULTILINE)
    if not match:
        return None, "Malformed front-matter: missing closing delimiter ('---')"

    fm_text = content[3 : 3 + match.start()]
    try:
        data = yaml.safe_load(fm_text)
    except yaml.YAMLError as e:
        return None, f"Malformed YAML syntax in front-matter: {e}"

    if data is None:
        return None, "Malformed front-matter: empty front-matter block"

    if not isinstance(data, dict):
        return None, "Malformed front-matter: front-matter must be a YAML mapping (key-value dictionary)"

    return data, None


def validate_front_matter(repo_root=None):
    """
    Validates Markdown front-matter integrity across publications, lessons, and posts.
    Returns (is_valid: bool, errors: list[str]).
    """
    if repo_root is None:
        repo_root = REPO_ROOT

    errors = []
    scanned_counts = {"publications": 0, "lessons": 0, "posts": 0}

    # 1. Publications (_publications/en/ and _publications/tr/)
    pub_dois = {}  # norm_doi -> list of {"path": str, "lang": str, "ref": str}
    pub_dirs = [repo_root / "_publications" / "en", repo_root / "_publications" / "tr"]

    for p_dir in pub_dirs:
        if not p_dir.is_dir():
            continue
        for pub_file in sorted(p_dir.glob("*.md")):
            if pub_file.name.lower() in ("template.md", "readme.md"):
                continue
            scanned_counts["publications"] += 1
            rel_path = pub_file.relative_to(repo_root)

            data, err = parse_front_matter(pub_file)
            if err:
                errors.append(f"{rel_path}: {err}")
                continue

            # Required keys: title, date, lang
            for req in ("title", "date", "lang"):
                if req not in data or data[req] is None or str(data[req]).strip() == "":
                    errors.append(f"{rel_path}: Missing required field '{req}'")

            # Valid entryType if present
            if "entryType" in data and data["entryType"] is not None:
                etype = str(data["entryType"]).strip().lower()
                if etype not in VALID_ENTRY_TYPES:
                    valid_list = ", ".join(sorted(VALID_ENTRY_TYPES))
                    errors.append(
                        f"{rel_path}: Invalid 'entryType' '{data['entryType']}'. Expected one of: {valid_list}"
                    )

            # Check duplicate DOI
            doi_val = data.get("doi")
            norm_doi = normalize_doi(doi_val)
            if norm_doi:
                file_lang = str(data.get("lang", "")).strip().lower()
                file_ref = str(data.get("ref", "")).strip().lower()

                if norm_doi in pub_dois:
                    for prev in pub_dois[norm_doi]:
                        # Duplicate within same language
                        if prev["lang"] == file_lang:
                            errors.append(
                                f"{rel_path}: Duplicate DOI '{norm_doi}' also found in '{prev['path']}' (same language '{file_lang}')"
                            )
                        # Different reference ID sharing the same DOI
                        elif file_ref and prev["ref"] and file_ref != prev["ref"]:
                            errors.append(
                                f"{rel_path}: Duplicate DOI '{norm_doi}' shared between distinct publications (ref '{file_ref}' vs '{prev['ref']}' in '{prev['path']}')"
                            )
                        elif not file_ref or not prev["ref"]:
                            errors.append(
                                f"{rel_path}: Duplicate DOI '{norm_doi}' also found in '{prev['path']}'"
                            )
                    pub_dois[norm_doi].append({"path": str(rel_path), "lang": file_lang, "ref": file_ref})
                else:
                    pub_dois[norm_doi] = [{"path": str(rel_path), "lang": file_lang, "ref": file_ref}]

    # 2. Lessons (_lessons/)
    lessons_dir = repo_root / "_lessons"
    if lessons_dir.is_dir():
        for lesson_file in sorted(lessons_dir.rglob("*.md")):
            if lesson_file.name.lower() in ("template.md", "readme.md"):
                continue
            scanned_counts["lessons"] += 1
            rel_path = lesson_file.relative_to(repo_root)

            data, err = parse_front_matter(lesson_file)
            if err:
                errors.append(f"{rel_path}: {err}")
                continue

            parent_name = lesson_file.parent.name
            is_main_course = (
                (lesson_file.stem == parent_name)
                or ("course_code" in data)
                or ("modules" in data)
            )

            if is_main_course:
                # Main course files must contain title and layout: lesson/single
                if not data.get("title") or not str(data["title"]).strip():
                    errors.append(f"{rel_path}: Main course file missing required field 'title'")

                layout = data.get("layout")
                if layout not in ("lesson/single", "lesson"):
                    errors.append(
                        f"{rel_path}: Main course file must specify 'layout: lesson/single' (found '{layout}')"
                    )
            else:
                # Sub-modules (e.g., week-*.md, *-policy.md)
                if not data.get("title") or not str(data["title"]).strip():
                    errors.append(f"{rel_path}: Sub-module missing required field 'title'")

                if "order" not in data or data["order"] is None or str(data["order"]).strip() == "":
                    errors.append(f"{rel_path}: Sub-module missing required field 'order'")

                # Weeks must contain topic
                is_week = lesson_file.name.startswith("week-") or (
                    str(data.get("section_type", "")).strip().lower() == "week"
                )
                if is_week:
                    if not data.get("topic") or not str(data["topic"]).strip():
                        errors.append(f"{rel_path}: Week sub-module missing required field 'topic'")

    # 3. Posts (_posts/en/ and _posts/tr/)
    if (repo_root / "_posts").is_dir():
        all_post_files = set(repo_root.glob("_posts/**/*.md"))
    else:
        all_post_files = set()

    for post_file in sorted(all_post_files):
        if post_file.name.lower() in ("template.md", "readme.md"):
            continue
        scanned_counts["posts"] += 1
        rel_path = post_file.relative_to(repo_root)

        data, err = parse_front_matter(post_file)
        if err:
            errors.append(f"{rel_path}: {err}")
            continue

        for req in ("title", "date", "lang"):
            if req not in data or data[req] is None or str(data[req]).strip() == "":
                errors.append(f"{rel_path}: Post missing required field '{req}'")

    total_scanned = sum(scanned_counts.values())
    print(
        f"[INFO] Front-Matter Audit: Scanned {total_scanned} files "
        f"({scanned_counts['publications']} publications, {scanned_counts['lessons']} lessons, {scanned_counts['posts']} posts)."
    )

    return len(errors) == 0, errors


# ==============================================================================
# ACADEMIC NETWORK REGISTRY VERIFICATION
# ==============================================================================

def find_registry_files():
    """Locate all existing academic_network.yml registry files."""
    candidates = [
        REPO_ROOT / "_data" / "academic_network.yml",
        Path("_data/academic_network.yml"),
    ]
    found = [p for p in candidates if p.is_file()]
    return list(dict.fromkeys(found))


def extract_avatar(html_content, base_url):
    """
    Parse HTML with BeautifulSoup to find the user's avatar image URL:
    1. Parse the retrieved HTML using BeautifulSoup (`soup.select_one("#profile .portrate img")`).
    2. If found, resolve any relative URL path (e.g., `/assets/images/custom-photo.jpg`)
       against the site's base URL using `urllib.parse.urljoin`.
    3. If not found, fallback to checking `<meta property="og:image" content="...">`.
    """
    if not html_content:
        return None

    try:
        soup = BeautifulSoup(html_content, "html.parser")
    except Exception:
        return None

    # 1. Primary selector: #profile .portrate img
    img_el = soup.select_one("#profile .portrate img")
    if img_el and img_el.get("src"):
        src = img_el.get("src").strip()
        if src:
            return urljoin(base_url, src)

    # 3. Fallback: <meta property="og:image" content="...">
    og_meta = soup.select_one('meta[property="og:image"]') or soup.select_one('meta[name="og:image"]')
    if og_meta and og_meta.get("content"):
        content = og_meta.get("content").strip()
        if content:
            return urljoin(base_url, content)

    return None


def verify_entry(entry, timeout=10):
    """
    Test a single academic network entry.
    Returns (is_valid, reason).
    """
    url = entry.get("url", "").strip()
    name = entry.get("name", "Unknown")
    institution = entry.get("institution", "Unknown")

    if not url:
        return False, "Missing URL"

    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    }

    try:
        response = requests.get(url, headers=headers, timeout=timeout, allow_redirects=True)
    except requests.exceptions.Timeout:
        return False, f"Timeout after {timeout}s"
    except requests.exceptions.SSLError as e:
        return False, f"SSL Error: {e}"
    except requests.exceptions.ConnectionError:
        return False, "Connection/DNS resolution failure"
    except requests.exceptions.RequestException as e:
        return False, f"Request exception: {e}"

    if response.status_code != 200:
        return False, f"HTTP {response.status_code} (expected 200)"

    html_content = response.text
    if not FOOTPRINT_REGEX.search(html_content):
        return False, 'Missing footprint (<meta name="generator" content="Jekyll Academy Engine"> or class="academy-engine")'

    # Extract avatar dynamically using BeautifulSoup
    avatar_url = extract_avatar(html_content, response.url or url)
    if avatar_url:
        entry["avatar"] = avatar_url
    elif "avatar" not in entry:
        entry["avatar"] = ""

    reason = "Verified (HTTP 200 + footprint confirmed"
    if avatar_url:
        reason += f" + avatar: {avatar_url}"
    reason += ")"

    return True, reason


def dump_yaml_clean(entries):
    """Format entries cleanly as YAML with header."""
    dumped = yaml.dump(
        entries,
        default_flow_style=False,
        allow_unicode=True,
        sort_keys=False
    )
    return HEADER_COMMENT + dumped


def main():
    parser = argparse.ArgumentParser(
        description="Audit academic network registry and validate markdown front-matter integrity (CI linter)."
    )
    parser.add_argument("--dry-run", action="store_true", help="Audit without saving changes.")
    parser.add_argument("--timeout", type=int, default=10, help="HTTP request timeout in seconds (default: 10).")
    parser.add_argument("--skip-lint", action="store_true", help="Skip markdown front-matter integrity validation.")
    parser.add_argument("--skip-network", action="store_true", help="Skip academic network registry audit.")
    args = parser.parse_args()

    lint_passed = True

    # --------------------------------------------------------------------------
    # 1. Front-Matter Integrity Validation
    # --------------------------------------------------------------------------
    if not args.skip_lint:
        print("=" * 70)
        print("Academy Engine - Markdown Front-Matter Integrity Linter (CI)")
        print("=" * 70)
        is_valid, errors = validate_front_matter(repo_root=REPO_ROOT)
        if not is_valid:
            lint_passed = False
            print(f"\n[FAIL] Front-matter validation failed with {len(errors)} error(s):")
            for err in errors:
                print(f"  ❌ {err}")
            print("\n[ERROR] Integrity checks failed. Please resolve the errors listed above.")
        else:
            print("[PASS] All publications, lessons, and posts passed front-matter integrity checks.")
        print("-" * 70)

    # If front-matter checks failed, exit with status code 1 immediately
    if not lint_passed:
        sys.exit(1)

    # --------------------------------------------------------------------------
    # 2. Academic Network Registry Audit
    # --------------------------------------------------------------------------
    if args.skip_network:
        print("[INFO] Academic network registry audit skipped (--skip-network).")
        sys.exit(0)

    registry_files = find_registry_files()
    if not registry_files:
        print("[INFO] No _data/academic_network.yml file found. Academic network is dynamically managed via central database API.")
        sys.exit(0)

    primary_file = registry_files[0]
    print(f"[INFO] Reading registry from: {primary_file}")

    with open(primary_file, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f) or []

    if not isinstance(data, list):
        print("[ERROR] Invalid YAML format: Root structure must be a list of entries.")
        sys.exit(1)

    total_count = len(data)
    print(f"[INFO] Auditing {total_count} academic network entries (timeout={args.timeout}s)...")
    print("-" * 70)

    verified_entries = []
    pruned_entries = []

    for idx, entry in enumerate(data, 1):
        name = entry.get("name", "Unknown")
        url = entry.get("url", "")
        institution = entry.get("institution", "")

        print(f"[{idx}/{total_count}] Checking: {name} ({institution}) - {url} ... ", end="", flush=True)
        is_valid, reason = verify_entry(entry, timeout=args.timeout)

        if is_valid:
            print(f"PASS ({reason})")
            entry["verified"] = True
            verified_entries.append(entry)
        else:
            print(f"FAIL -> [PRUNED] ({reason})")
            pruned_entries.append({"entry": entry, "reason": reason})

    print("-" * 70)
    print(f"[SUMMARY] Total: {total_count} | Verified: {len(verified_entries)} | Pruned: {len(pruned_entries)}")

    clean_yaml = dump_yaml_clean(verified_entries)
    with open(primary_file, "r", encoding="utf-8") as f:
        original_content = f.read()

    has_changes = (clean_yaml.strip() != original_content.strip())

    if has_changes and not args.dry_run:
        for target_file in registry_files:
            print(f"[INFO] Writing updated registry to: {target_file}")
            with open(target_file, "w", encoding="utf-8") as f:
                f.write(clean_yaml)
    elif args.dry_run:
        print("[INFO] Dry-run enabled. No files modified.")

    # Export GitHub Actions output parameters if running in GitHub Actions
    github_output = os.getenv("GITHUB_OUTPUT")
    if github_output:
        try:
            with open(github_output, "a", encoding="utf-8") as f:
                f.write(f"pruned_count={len(pruned_entries)}\n")
                f.write(f"verified_count={len(verified_entries)}\n")
                f.write(f"has_changes={'true' if has_changes else 'false'}\n")
        except IOError as e:
            print(f"[WARN] Failed to write to GITHUB_OUTPUT: {e}")

    sys.exit(0)


if __name__ == "__main__":
    main()
