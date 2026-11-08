# Security Policy

The **Academy** theme engine powers academic websites, course syllabi, and departmental portals. We prioritize the security and integrity of our codebase, GitHub Actions workflows, and automated network verification pipelines.

---

## 1. Supported Versions

We provide security updates and bug fixes for the current active release line:

| Version | Supported          |
| :------ | :----------------- |
| `1.x`   | :white_check_mark: |
| `< 1.0` | :x:                |

We encourage all users and institutions to keep their forks and deployments aligned with the latest upstream release on the `main` branch.

---

## 2. Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests, or public discussions.**

If you discover a potential vulnerability (e.g., Cross-Site Scripting (XSS) in Liquid templates, workflow script injection in GitHub Actions, or insecure asset exposure):

1. **GitHub Private Security Advisory (Preferred):**
   * Go to the [Security Advisories](https://github.com/BanaBirSebepVer/Academy/security/advisories) tab of this repository.
   * Click **"Report a vulnerability"** to submit a private draft report directly to the repository maintainers.

2. **Direct Contact:**
   * Alternatively, send an email detailing the vulnerability to **security@banabirsebepver.org** (or your designated institutional address).

### What to Include in Your Report
To help us triage and resolve the issue quickly, please provide:
* A description of the vulnerability and its potential impact.
* Steps to reproduce the issue, including proof-of-concept (PoC) code or sample inputs.
* The Jekyll and Ruby versions used, as well as browser or OS details if client-side rendering is affected.
* Any potential mitigations or patches you have identified.

---

## 3. Our Response Process

* **Acknowledgment:** We will acknowledge receipt of your vulnerability report within **48 hours**.
* **Assessment & Fix:** We will evaluate the report, verify the impact, and develop a fix in a private branch or advisory workspace.
* **Coordinated Disclosure:** Once the fix is ready, we will publish a release containing the patch alongside a public advisory crediting your discovery (unless you prefer to remain anonymous).

---

## 4. Security Best Practices for Adopters

If you are running the Academy theme on your own domain or university server:
* Keep your GitHub Actions dependencies and runner versions updated.
* Ensure user-submitted inputs in course schedules, publication abstracts, or network links do not contain unescaped HTML/scripts.
* Host your site over HTTPS with an active Content Security Policy (CSP).