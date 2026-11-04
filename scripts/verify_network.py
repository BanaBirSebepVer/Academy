#!/usr/bin/env python3
"""
Academic Network Verification Script
------------------------------------
Audits `_data/academic_network.yml` by performing HTTP GET requests to each listed site.
Validates:
  1. HTTP 200 OK status.
  2. Presence of the engine footprint signature:
     - <meta name="generator" content="Jekyll Academy Engine">
     - or class="academy-engine"

Entries that fail DNS resolution, time out, return non-200, or lack the footprint
are pruned from the registry.

Usage:
  python3 scripts/verify_network.py [--dry-run] [--timeout 10]
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


def find_registry_files():
    """Locate all existing academic_network.yml registry files."""
    candidates = [
        Path("_data/academic_network.yml"),
    ]
    found = [p for p in candidates if p.is_file()]
    if not found:
        script_dir = Path(__file__).resolve().parent
        candidates = [
            script_dir.parent / "_data/academic_network.yml",
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
    parser = argparse.ArgumentParser(description="Audit and prune academic_network.yml entries.")
    parser.add_argument("--dry-run", action="store_true", help="Audit without saving changes.")
    parser.add_argument("--timeout", type=int, default=10, help="HTTP request timeout in seconds (default: 10).")
    args = parser.parse_args()

    registry_files = find_registry_files()
    if not registry_files:
        print("[ERROR] No _data/academic_network.yml file found.")
        sys.exit(1)

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
