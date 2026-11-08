#!/usr/bin/env python3
"""
Academy Engine - Automated JavaScript Module Bundler
Location: scripts/bundle_js.py
-----------------------------------------------------------------------------
Concatenates and scopes capability-specific JavaScript modules from
`assets/js/modules/` into a single, high-performance `assets/js/bundle.js`
without requiring Node.js or npm build dependencies.
"""

import os
import re
import sys
from pathlib import Path

# Resolve root directory relative to this script
REPO_ROOT = Path(__file__).resolve().parent.parent
MODULES_DIR = REPO_ROOT / "assets" / "js" / "modules"
BUNDLE_OUTPUT = REPO_ROOT / "assets" / "js" / "bundle.js"

# Strict concatenation order respecting inter-module dependencies
MODULE_ORDER = [
    "navigation.js",
    "scroll.js",
    "accordion.js",
    "timeline.js",
    "citation/apa.js",
    "citation/ieee.js",
    "citation/oxford.js",
    "citation/bibtex.js",
    "citation/index.js",
    "publications.js",
    "archive.js",
    "network.js",
    "lesson.js",
    "contact/clipboard.js",
    "contact/index.js",
    "schema.js",
    "analytics.js",
]

def indent_code(code: str, spaces: int = 2) -> str:
    """Indents non-empty lines with the specified number of spaces."""
    prefix = " " * spaces
    return "\n".join(prefix + line if line.strip() else line for line in code.splitlines())

def process_module(file_path: Path, mod_name: str) -> str:
    """Reads a module, cleans ES module syntax, and wraps it in an IIFE."""
    if not file_path.exists():
        print(f"[ERROR] Required module not found: {file_path}", file=sys.stderr)
        sys.exit(1)

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    lines = []
    for line in content.splitlines():
        # Strip top-level ES module import statements
        if re.match(r'^\s*import\s+', line):
            continue
        # Strip export default identifier; or export { ... };
        if re.match(r'^\s*export\s+default\s+[a-zA-Z0-9_$]+;\s*$', line):
            continue
        if re.match(r'^\s*export\s*\{[^}]+\};\s*$', line):
            continue
        # Convert `export default function foo(` to `function foo(`
        line = re.sub(r'^\s*export\s+default\s+function\s+', 'function ', line)
        # Convert `export function foo(` to `function foo(`
        line = re.sub(r'^\s*export\s+function\s+', 'function ', line)
        lines.append(line)

    code = "\n".join(lines).strip()

    # Prepend scope bridges for modules that depend on exports of preceding modules
    prepends = []
    if mod_name == "citation/index.js":
        prepends.append("const formatApa = window.formatApa;")
        prepends.append("const formatIeee = window.formatIeee;")
        prepends.append("const formatOxford = window.formatOxford;")
        prepends.append("const generateBibTeX = window.generateBibTeX;")
    elif mod_name == "publications.js":
        prepends.append("const initCitationModule = window.initCitationModule;")
    elif mod_name == "contact/index.js":
        prepends.append("const setupClipboard = window.setupClipboard;")

    if prepends:
        code = "\n".join(prepends) + "\n\n" + code

    # Expose functions required by subsequent modules or global callers
    exposures = []
    if mod_name == "citation/apa.js":
        exposures.append("window.formatApa = formatApa;")
    elif mod_name == "citation/ieee.js":
        exposures.append("window.formatIeee = formatIeee;")
    elif mod_name == "citation/oxford.js":
        exposures.append("window.formatOxford = formatOxford;")
    elif mod_name == "citation/bibtex.js":
        exposures.append("window.generateBibTeX = generateBibTeX;")
        exposures.append("window.CitationFormats = window.CitationFormats || {}; window.CitationFormats.bibtex = generateBibTeX;")
    elif mod_name == "citation/index.js":
        exposures.append("window.initCitationModule = initCitationModule;")
        exposures.append("window.registerCitationStyle = registerCitationStyle;")
        exposures.append("window.generateCitation = generateCitation;")
        exposures.append("window.copyBibTeXAction = copyBibTeXAction;")
        exposures.append("window.exportBibTeXAction = exportBibTeXAction;")
    elif mod_name == "publications.js":
        exposures.append("window.initPublications = initPublications;")
    elif mod_name == "contact/clipboard.js":
        exposures.append("window.setupClipboard = setupClipboard;")
    elif mod_name == "contact/index.js":
        exposures.append("window.initContact = initContact;")
    elif mod_name == "network.js":
        exposures.append("window.initNetwork = initNetwork;")
    elif mod_name == "analytics.js":
        exposures.append("window.initAnalytics = initAnalytics;")

    if exposures:
        code = code + "\n\n  // Global module bridge\n  " + "\n  ".join(exposures)

    # Wrap inside IIFE to avoid global variable collisions
    iife = (
        f"// =============================================================================\n"
        f"// Module: {mod_name}\n"
        f"// =============================================================================\n"
        f"(function () {{\n"
        f"{indent_code(code, 2)}\n"
        f"}})();\n"
    )
    return iife

def build_bundle():
    print(f"[INFO] Bundling JavaScript modules from {MODULES_DIR}...")
    bundle_parts = [
        "/**",
        " * Academy Academic Engine - Unified JavaScript Bundle",
        " * Generated automatically by scripts/bundle_js.py",
        " * DO NOT EDIT DIRECTLY. Edit individual modules under assets/js/modules/",
        " */",
        "",
    ]

    for mod in MODULE_ORDER:
        file_path = MODULES_DIR / mod
        print(f"  -> Adding {mod}")
        bundle_parts.append(process_module(file_path, mod))

    final_content = "\n".join(bundle_parts)

    BUNDLE_OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with open(BUNDLE_OUTPUT, "w", encoding="utf-8") as f:
        f.write(final_content)

    print(f"[SUCCESS] Generated {BUNDLE_OUTPUT} ({len(final_content):,} bytes, {len(MODULE_ORDER)} modules).")

if __name__ == "__main__":
    build_bundle()
