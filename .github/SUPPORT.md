# Support & Community Guidelines

Thank you for using the **Academy** theme engine! Whether you are setting up your personal academic site, hosting course syllabi, or managing a departmental portal, here is how you can find help and connect with the community.

---

## 1. Documentation & Self-Help
Before opening a ticket, check the repository documentation:
- **[README.md](README.md):** Quickstart guide, local development prerequisites, and setup instructions.
- **[CONTRIBUTING.md](CONTRIBUTING.md):** How to submit fixes, translation files, or add your site to the Academic Network registry.
- **[Architecture Blueprint](ARCHITECTURE.md):** Detailed module layouts, Liquid helper logic, and directory structures.

---

## 2. Asking Questions & Getting Help
For general setup questions, theme customization, or configuration assistance:
- **GitHub Discussions:** Join our [GitHub Discussions](https://github.com/BanaBirSebepVer/Academy/discussions) tab to ask questions, share how you use the engine, and connect with other educators.
- **Community Portal:** Visit [BanaBirSebepVer](https://github.com/BanaBirSebepVer) for affiliated projects and community initiatives.

> **Note:** Please reserve the [Issue Tracker](https://github.com/BanaBirSebepVer/Academy/issues) for verified bugs, reproducibility problems, and technical feature requests rather than general setup troubleshooting.

---

## 3. Reporting Bugs
If you encounter a reproducible bug in the Jekyll build pipeline, Liquid parser, or modular styles:
1. Search [existing open and closed issues](https://github.com/BanaBirSebepVer/Academy/issues?q=is%3Aissue) to see if it has already been reported.
2. If it is new, open a [Bug Report](https://github.com/BanaBirSebepVer/Academy/issues/new) and include:
   - Your Ruby and Jekyll versions (`ruby -v`, `bundle exec jekyll -v`).
   - Operating system (macOS, Linux, Windows).
   - Terminal trace output (`bundle exec jekyll build --trace`).
   - Steps to reproduce or a link to a public branch.

---

## 4. Academic Network Verification
If your university, department, or faculty site is powered by Academy and you want it listed on the global network directory:
- Follow the submission steps in [CONTRIBUTING.md](CONTRIBUTING.md) to add your metadata to `_data/academic_network.yml`.
- Make sure your deployment retains the `<meta name="generator" content="Jekyll Academy Engine">` footprint so automated health checks can verify your site.

---

## 5. Security Vulnerabilities
If you discover a security issue or privacy concern, please do not file a public issue. See our [Security Policy](SECURITY.md) or contact the project maintainers directly.