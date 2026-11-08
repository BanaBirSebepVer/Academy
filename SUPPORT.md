# Support & Community Guidelines

Thank you for choosing the **Academy** theme engine! Whether you are building an academic curriculum vitae, organizing multi-week modular courseware, synchronizing scholarly records with ORCID, or federating with the global Academic Network, this guide provides pathways for technical support, self-help debugging, and community collaboration.

---

## 1. Documentation Index

Before filing an issue or asking for support, explore the comprehensive repository documentation:

| Document | Primary Focus |
|:---|:---|
| **[README.md](README.md)** | Engine overview, features, directory layout, local setup, and CLI verification tools. |
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Contribution standards, YAML front-matter schemas (modular courses, publications, posts), asset rules, and Git workflow. |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | Deep architectural blueprint, 4-tier execution layer, Liquid includes, and layout hierarchies. |
| **[Security Policy](SECURITY.md)** | Responsible disclosure guidelines for security or academic integrity issues. |

---

## 2. Common Troubleshooting & Self-Help

Most local environment and build issues stem from gem isolation, character encoding, or front-matter schema mismatches. Use the following solutions:

### A. Ruby & Bundler Permission / Path Issues
If `bundle install` fails with system permission warnings or gem version conflicts:
```bash
# Isolate gems locally to the repository vendor directory
bundle config set --local path 'vendor/bundle'
bundle install
```

### B. UTF-8 Character Encoding Errors
If Jekyll throws `Invalid US-ASCII character` or string decoding errors during markdown compilation:
```bash
# Set UTF-8 locale environment variables
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
bundle exec jekyll build
```

### C. Port 4000 Conflict During Local Development
If port `4000` is already in use by another local development server:
```bash
# Run Jekyll on an alternative port
bundle exec jekyll serve --port 4001
```

### D. Front-Matter Validation & Linting Failures
If GitHub Actions CI or local verification fails on markdown files:
```bash
# Run the built-in front-matter and network integrity linter
python3 scripts/verify_network.py
```
*Common fixes:*
- **Publications:** Ensure `title`, `date` (`YYYY-MM-DD`), and `lang` (`tr` or `en`) are defined.
- **Courses:** The main course file (`{course-slug}.md`) requires `layout: lesson/single`.
- **Modular Weeks:** Modular week files (`week-*.md`) require `title`, `order` (integer), and `topic`.

### E. Zero-Config ORCID Synchronization Issues
If `python3 scripts/sync_orcid.py` cannot retrieve your publications:
1. Verify that your 16-digit ORCID identifier is correctly set in `_data/socials.yml` (e.g., `orcid: "0000-0002-1825-0097"`).
2. Ensure that your works on [ORCID.org](https://orcid.org) have their privacy visibility set to **"Everyone"** (Public). Works set to "Trusted Parties" or "Only Me" cannot be read by public APIs without OAuth credentials.
3. Check network connectivity to `https://pub.orcid.org`.

### F. Print Stylesheet Previewing
To inspect the automatic **US Academic CV** or **Academic Course Syllabus** print layout:
- Open your browser's print dialog (`Cmd + P` on macOS, `Ctrl + P` on Windows/Linux).
- Enable *Background graphics* in the browser print dialog if you want subtle decorative borders rendered.
- All interactive controls, navbars, and buttons will automatically hide, leaving a clean, high-contrast, black-and-white academic document.

---

## 3. Asking Questions & Community Channels

For general configuration advice, design tips, or feature brainstorming:

- **GitHub Discussions:** Join the [Discussions Forum](https://github.com/BanaBirSebepVer/Academy/discussions) to ask questions, share how you use the engine in your classroom, and propose ideas.
- **Community Portal:** Explore affiliated academic projects and tools at [BanaBirSebepVer](https://github.com/BanaBirSebepVer).

> **Note:** Please reserve the GitHub Issue tracker for reproducible bugs, build errors, or concrete feature requests. General setup questions should be directed to GitHub Discussions.

---

## 4. Reporting Bugs

If you discover a reproducible defect in the Jekyll pipeline, Liquid template helpers, print stylesheets, or Python scripts:

1. Search [existing open and closed issues](https://github.com/BanaBirSebepVer/Academy/issues?q=is%3Aissue) to check if the problem is already being addressed.
2. If new, open a [Bug Report](https://github.com/BanaBirSebepVer/Academy/issues/new) containing:
   - **Environment:** OS (macOS / Linux / Windows), Ruby version (`ruby -v`), and Jekyll version (`bundle exec jekyll -v`).
   - **Stack Trace:** Full terminal error log captured with `bundle exec jekyll build --trace`.
   - **Steps to Reproduce:** Minimal reproduction steps, including relevant markdown front-matter snippets or config modifications.
   - **Expected vs. Actual Behavior:** What you expected to happen versus what occurred.

---

## 5. Academic Network Federation & Verification

If your university department, research lab, or faculty website runs on Academy:
1. Ensure your site retains the generator tag `<meta name="generator" content="Jekyll Academy Engine">` in the HTML `<head>`.
2. Add your site's metadata to `_data/academic_network.yml` following the guide in [CONTRIBUTING.md](CONTRIBUTING.md).
3. Open a pull request. Automated CI validation will verify connectivity, SSL status, and engine signature before listing your site in the global academic registry.

---

## 6. Security Vulnerabilities & Academic Integrity

If you uncover a security vulnerability (such as an XSS vector in citation rendering) or an academic integrity concern:
- **Do NOT file a public issue.**
- Review the [Security Policy](SECURITY.md) for encrypted reporting channels and responsible disclosure procedures.
