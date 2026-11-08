> ⚠️ **Notice for Contributors:**
> All pull requests must target the `test` (or `dev`) branch, **not** `main`. 
> Please ensure the base branch dropdown above is set to `base: test`.

## Type of Change
<!-- Select all that apply by putting an 'x' inside the brackets: [x] -->
- [ ] 🎓 **Academic Network Addition:** Adding an institution/scholar to `_data/academic_network.yml`
- [ ] 🐛 **Bug Fix:** Non-breaking fix for an issue or Liquid build error
- [ ] ✨ **New Feature:** Enhancing layouts, Liquid includes, or modular assets
- [ ] 🎨 **Styling / Modular CSS:** Updates to `assets/css/modules/*.css`
- [ ] 🌐 **Localization:** Changes to `_data/locales/` (`tr.yml`, `en.yml`, or adding a new locale)
- [ ] 📝 **Documentation:** Updates to `README.md`, `ARCHITECTURE.md`, or guides
- [ ] ⚙️ **CI/CD / Automation:** Updates to GitHub Actions workflows or verification scripts

---

## Academic Network Verification (If Submitting a Site)
<!-- If this PR registers your site to `_data/academic_network.yml`, please check these: -->
- [ ] The site is live and reachable over HTTPS.
- [ ] The site includes the engine footprint: `<meta name="generator" content="Jekyll Academy Engine">`
- [ ] The avatar image is publicly accessible or points to a valid file path.

---

## Quality Checklist
<!-- Before submitting, please verify that your changes satisfy these requirements: -->
- [ ] My code follows the repository's modular asset structure (no monolithic or inline styles).
- [ ] I have tested the build locally using `bundle exec jekyll build --trace`.
- [ ] The local Jekyll server runs cleanly with `bundle exec jekyll serve` with zero Liquid errors.
- [ ] New strings are localized in both `_data/locales/tr.yml` and `_data/locales/en.yml`.
- [ ] I have read and agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Related Issue / Context
<!-- Link related issues if applicable (e.g., Closes #12, Fixes #4). -->
Closes #