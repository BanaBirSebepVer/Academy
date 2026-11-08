# Academy — Academic Portfolio, Course Hub & Research Archive

[![Deploy to GitHub Pages](https://github.com/BanaBirSebepVer/Academy/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/BanaBirSebepVer/Academy/actions/workflows/deploy.yml)
[![Network & Integrity CI](https://github.com/BanaBirSebepVer/Academy/actions/workflows/verify-network.yml/badge.svg?branch=main)](https://github.com/BanaBirSebepVer/Academy/actions/workflows/verify-network.yml)
[![Jekyll Engine](https://img.shields.io/badge/Jekyll-4.0.23-CC0000.svg?style=flat-square&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![Ruby Version](https://img.shields.io/badge/Ruby-%3E%3D%203.0-ruby.svg?style=flat-square&logo=ruby)](https://www.ruby-lang.org/)
[![License: MIT](https://img.shields.io/badge/Code%20License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Content License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey.svg?style=flat-square&logo=creative-commons)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Multilingual](https://img.shields.io/badge/Language-TR%20%7C%20EN-success.svg?style=flat-square)](/en/)

> **Live Production Website**: [**https://banabirsebepver.github.io/Academy/**](https://banabirsebepver.github.io/Academy/)  
> **English Portal**: [**https://banabirsebepver.github.io/Academy/en/**](https://banabirsebepver.github.io/Academy/en/)  
> **Automated Deployments**: Continuous integration and deployment is fully automated via GitHub Actions on every push to `main`.

---

## 1. Project Overview & Mission

**Academy** is an open-source, production-grade academic personal website, courseware management system, and scholarly publishing engine built on native Jekyll. Designed specifically for university faculty, researchers, and doctoral candidates, Academy eliminates CMS database bloat, security vulnerabilities, and proprietary platform lock-in.

### The Core Mission
1. **Open Courseware & Pedagogical Transparency**: Provide university students and independent researchers with structured syllabi, weekly reading lists, modular laboratory tutorials, grading criteria, and exam materials.
2. **Scholarly Dissemination & SEO**: Maintain a permanent, crawlable index of peer-reviewed publications, book chapters, conference papers, and preprints equipped with official DOIs, Google Scholar citation metadata, and instant BiBTeX exporting.
3. **Public Academic Commentary**: Host critical bilingual essays and research notes addressing data analytics, communication ethics, public-interest artificial intelligence, and open science workflows.
4. **AI & Machine Readability**: Deliver structured machine-readable manifests (`llms.txt`, `llms-full.txt`, `ai.json`) that allow large language models and search engines to cite and attribute scholarly work with academic accuracy.

---

## 2. Key Architectural Features

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       ACADEMY SYSTEM ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Unified Data & Configuration                                   │
│   • _config.yml               • _data/socials.yml (SNS & ORCID)         │
│   • _data/locales/{tr,en}.yml • Compact Collections (_educations/, etc.)│
├────────────────────────────────────┬────────────────────────────────────┤
│ Layer 2: Asset & Utility Pipeline  │ Layer 3: Dynamic Rendering & SEO   │
│   • Native Sass/SCSS in _sass/     │   • Google Scholar Meta Tags       │
│   • Bundled JS (bundle_js.py)      │   • Semantic Schema.org JSON-LD    │
│   • Vector SVG Sprite (0 WebFonts) │   • llms.txt, llms-full.txt, ai.json│
│   • BW Academic Print Stylesheet   │   • Smart i18n Switcher + Fallback │
├────────────────────────────────────┴────────────────────────────────────┤
│ Layer 4: Content Domains & Public Routing                               │
│   • TR: / (Home) | /dersler/ | /yayinlar/ | /yazilar/ | /arastirma/     │
│   • EN: /en/     | /en/lessons/ | /en/publications/ | /en/posts/        │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🌐 Smart Bilingual Architecture (TR / EN)
- **Folder-Driven Dynamic Navigation**: `_includes/navigation.html` dynamically scans `pages/tr/` when on Turkish routes and `pages/en/` on English routes. No hardcoded navigation links or duplicate route tables are maintained.
- **Resilient Language Switcher with 404 Fallback**: `_includes/language-switcher.html` leverages shared `ref:` identifiers across bilingual front matter to toggle between exact counterparts. If a translation does not exist, it gracefully routes the visitor to the corresponding section archive rather than producing a 404 error.
- **Strict Content Isolation**: Post and publication archives filter `site.posts` and `site.publications` strictly to the active language domain. Category filters, tag counts, and related posts never leak across language boundaries.

### 🎓 Modular Courseware Architecture (`_lessons/`)
- Course content is organized into multi-file course directories (`_lessons/{lang}/{course-slug}/`), separating monolithic course documents into clean, manageable sub-documents:
  - `01-outcomes.md`: Learning outcomes and competencies.
  - `02-policy.md`: Course policies, attendance requirements, and academic integrity guidelines.
  - `week-01.md` ... `week-14.md`: Weekly lectures, required readings, practical tasks, and laboratory modules.
  - `practicals.md` & `final-project.md`: Evaluation criteria and capstone guidelines.
- Course pages are assembled dynamically using `_layouts/lesson/single.html` with an interactive quick-navigation bar, collapsible week accordions, and automated grading tables.

### 📚 BiBTeX Generator, Citations & Academic SEO (`_publications/`)
- **Automated Client-Side Citations**: Supports standard citation formats (**APA 7th**, **IEEE**, and **Oxford**) with hover tooltips and one-click copy buttons.
- **BiBTeX Generator & `.bib` Exporter**: Dynamic JavaScript module (`assets/js/modules/citation/bibtex.js`) generates clean BiBTeX citations directly from publication front-matter and provides instant `.bib` file downloads.
- **Google Scholar & Zotero Meta Tags**: Injects comprehensive highwire meta tags (`citation_title`, `citation_author`, `citation_publication_date`, `citation_journal_title`, `citation_doi`, `citation_pdf_url`) into `<head>`.
- **Schema.org Structured Data**: Generates semantic JSON-LD (`Person`, `Course`, `ScholarlyArticle`, `BlogPosting`) with verified `sameAs` academic profiles.

### 🆔 Centralized Socials & Zero-Config ORCID Sync
- **Single Source of Truth (`_data/socials.yml`)**: Consolidates all scholarly identifiers (ORCID, Google Scholar, ResearchGate, Academia, Scopus, Web of Science) and social networks (GitHub, GitLab, LinkedIn, X, Bluesky, Mastodon, YouTube, Email).
- **Automated ORCID Sync (`scripts/sync_orcid.py`)**: Automatically detects the scholar's ORCID ID from `_data/socials.yml`, fetches publication metadata via ORCID and Crossref APIs, prevents duplicate imports, and generates publication Markdown records in `_publications/en/`. Supports `--dry-run` and scheduled sync via GitHub Actions.

### 🤖 AI Discovery & LLM Attributions (`llms.txt`, `llms-full.txt`, `ai.json`)
- **`llms.txt`**: Standardized Markdown context manifest summarizing author affiliations, core research fields, course hubs, and top publications for AI assistants.
- **`llms-full.txt`**: Comprehensive academic manifest containing full biographical CV details, complete research summaries, course outlines, and a mandatory attribution directive.
- **`ai.json`**: Machine-readable JSON manifest enabling automated retrieval-augmented generation (RAG) pipelines to parse scholarly expertise.

### 🖨️ Academic Print Stylesheet (US Academic CV & University Syllabus)
- Integrated `@media print` engine (`_sass/_print.scss`) automatically optimizes physical print and PDF export:
  - **Homepage** (`/` or `/en/`) prints as an official **US-style Academic Curriculum Vitae (CV)** with clean typography, institutional headers, and reverse-chronological appointments.
  - **Course Pages** (`_lessons/`) print as a formal **University Course Syllabus** with course codes, grading breakdown tables, weekly schedules, and institutional headers.
  - Non-print UI elements (sidebars, navigation drawers, language switchers, buttons, and badges) are cleanly suppressed.

### ⚡ Performance & Lightweight Asset Pipeline
- **Native Sass/SCSS Pipeline**: All modular styling is organized under `_sass/` partials and compiled via Jekyll's native Sass processor into `assets/css/master.css`. Legacy vendor CSS (`js_composer.min.css`) and webfonts have been completely eliminated.
- **Vector SVG Sprite System**: Replaced heavy icon font packages with lightweight vector SVG icons (`_includes/icon.html` and `_includes/icons-sprite.svg`).
- **Vanilla ES6 JS Bundler**: Client-side interactive modules are bundled via `scripts/bundle_js.py` into a unified `assets/js/bundle.js`.

### 🛡️ Automated CI Linter (`scripts/verify_network.py`)
- Automated GitHub Actions workflow (`.github/workflows/verify-network.yml`) audits every pull request and commit to `main`.
- Validates front-matter schemas across all publications, lessons, and posts, verifies required keys (`title`, `date`, `lang`), validates `entryType`, detects duplicate DOIs, and audits academic network health.

---

## 3. Repository Directory Structure

```
Academy/
├── _config.yml                    # Primary Jekyll configuration & global site defaults
├── _config-EXAMPLE.yml            # Reference configuration template for new deployments
├── _data/
│   ├── socials.yml                # Centralized SNS, ORCID & academic profiles
│   ├── socials-EXAMPLE.yml        # Reference template for socials
│   ├── academic_network.yml       # Verified peer network registry
│   ├── locales/                   # Strict bilingual UI dictionaries
│   │   ├── tr.yml                 # Turkish UI labels & terminology
│   │   └── en.yml                 # English UI labels & terminology
│   └── version.yml                # Build versioning metadata
│
├── _lessons/                      # Courseware & syllabus repository
│   ├── tr/<course-slug>/          # Turkish course modules (main course + weekly files)
│   └── en/<course-slug>/          # English course modules (main course + weekly files)
│
├── _publications/                 # Scholarly papers, book chapters & preprints
│   ├── tr/YYYY-<slug>.md          # Turkish publication records
│   ├── en/YYYY-<slug>.md          # English publication records
│   └── TEMPLATE.md                # APA 7th / IEEE / Oxford authoring guide
│
├── _posts/                        # Long-form essays & technology reflections
│   ├── tr/YYYY-MM-DD-<slug>.md    # Turkish blog articles
│   └── en/YYYY-MM-DD-<slug>.md    # English blog articles
│
├── _project/                      # Research projects and laboratory initiatives
│
├── _educations/                   # Compact CV: Degrees & postgraduate qualifications
├── _awards/                       # Compact CV: Honors, fellowships & scholarships
├── _academic_positions/           # Compact CV: Faculty ranks & appointments
├── _conferences/                  # Compact CV: Keynotes & conference papers
├── _experiences/                  # Compact CV: Professional industry roles
├── _memberships/                  # Compact CV: Professional affiliations & boards
├── _certificates/                 # Compact CV: Technical certificates & credentials
│
├── _includes/                     # Reusable HTML & SVG partials
│   ├── head.html                  # Metadata, fonts, and master.css include
│   ├── sidebar.html               # Responsive navigation drawer & scholar profile
│   ├── navigation.html            # Dynamic folder-driven navigation builder
│   ├── language-switcher.html     # Resilient bilingual switcher with 404 fallback
│   ├── social-links.html          # Centralized social handles (icons, badges, lists)
│   ├── icon.html                  # Inline vector SVG icon helper
│   ├── icons-sprite.svg           # Consolidated vector icon symbol definitions
│   ├── lesson/                    # Course-specific partials (header, modules, grading)
│   └── seo/                       # Highwire Google Scholar meta & Schema.org JSON-LD
│
├── _layouts/                      # Page layout templates
│   ├── default.html               # Base HTML5 wrapper with layout body classes
│   ├── homepage.html              # Interactive CV homepage & print CV layout
│   ├── lesson/single.html         # Comprehensive single-course syllabus layout
│   ├── lesson/archive.html        # Course catalog & search filter layout
│   ├── publication/single.html    # Single publication detail layout
│   ├── publication/archive.html   # Publication archive & filter layout
│   ├── post/single.html           # Long-form reading layout
│   └── folder-page.html           # Categorized directory / laboratory layout
│
├── _sass/                         # Native Sass/SCSS modular stylesheets
│   ├── _color.scss                # Design tokens & CSS custom property color system
│   ├── _layout.scss               # Grid, responsive layout & typography base
│   ├── _social.scss               # Social links, pills & badge styling
│   ├── _print.scss                # US Academic CV & Syllabus print stylesheet
│   └── ...                        # Component partials (card, timeline, sidebar, etc.)
│
├── assets/
│   ├── css/master.scss            # Main Sass entry point compiling _sass/ partials
│   ├── js/
│   │   ├── bundle.js              # Bundled vanilla ES6 JavaScript modules
│   │   └── modules/               # Modular JS components (citation, navigation, search)
│   └── images/                    # Photographic assets, diagrams, and default avatars
│
├── pages/                         # Symmetrical top-level static routes
│   ├── tr/                        # Turkish pages (/arastirma/, /iletisim/, /ag/, etc.)
│   └── en/                        # English pages (/en/research/, /en/contact/, etc.)
│
├── scripts/                       # Maintenance & verification toolchain
│   ├── sync_orcid.py              # Zero-config ORCID publication synchronizer
│   ├── verify_network.py          # Front-matter integrity CI linter & network audit
│   └── bundle_js.py               # JavaScript module bundler
│
├── ai.json                        # Machine-readable AI agent manifest
├── llms.txt                       # Standardized AI context overview
└── llms-full.txt                  # Full academic knowledge base for LLM retrieval
```

---

## 4. Local Quickstart (60 Seconds)

### Prerequisites
- **Git**: `git --version`
- **Ruby** (`>= 3.0`, recommended `3.3.x`): `ruby -v`
- **Bundler**: `gem install bundler`
- **Python** (`>= 3.8`): `python3 --version` (for toolchain scripts)

### Step-by-Step CLI Setup

```bash
# 1. Clone the repository
git clone https://github.com/BanaBirSebepVer/Academy.git
cd Academy

# 2. Configure UTF-8 encoding (critical for international characters)
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# 3. Install Ruby dependencies
bundle install

# 4. (Optional) Bundle JavaScript modules
python3 scripts/bundle_js.py

# 5. Boot the live-reloading development server
./serve.sh
# Or alternatively via Bundler directly:
# bundle exec jekyll serve --livereload
```

Open your browser at **`http://localhost:4000`**. Edits to Markdown, YAML, and SCSS files will trigger an instantaneous browser reload.

> [!TIP]
> **Isolated Bundle Path on macOS**: If you encounter gem permission conflicts, configure Bundler to use a local vendor path:
> ```bash
> bundle config set --local path 'vendor/bundle'
> bundle install
> ```

---

## 5. Toolchain & Automation CLI

Academy includes standalone utility scripts located in `scripts/`:

### 🔄 Zero-Config ORCID Publication Sync
Fetch all publications linked to your ORCID ID from Crossref and ORCID APIs:
```bash
# Preview changes without writing files:
python3 scripts/sync_orcid.py --dry-run

# Execute live synchronization:
python3 scripts/sync_orcid.py
```
*Configuration*: Ensure your ORCID ID is set in `_data/socials.yml` under `orcid: "0000-0002-xxxx-xxxx"`.

### 🛡️ Markdown Front-Matter & Network Linter (CI)
Validate YAML front-matter integrity across all publications, lessons, and posts:
```bash
python3 scripts/verify_network.py
```
*Checks performed*:
- Required fields (`title`, `date`, `lang`).
- Valid publication `entryType` values.
- Lesson sub-module sequencing (`order`) and weekly topics (`topic`).
- Detection of duplicate DOIs.
- Academic network URL health and engine footprint detection.

### 📦 JavaScript Module Bundler
Combine client-side ES6 modules into `assets/js/bundle.js`:
```bash
python3 scripts/bundle_js.py
```

---

## 6. Personalization & Configuration Guide

To configure Academy for your own academic profile:

1. **Academic Affiliation & Site Identity (`_config.yml`)**:
   - Update `title`, `author`, `institution`, and `department`.
   - Set production `url` (e.g. `https://yourname.github.io` or `https://yourdomain.edu`) and `baseurl`.
2. **Scholarly & Social Identifiers (`_data/socials.yml`)**:
   - Provide your ORCID, Google Scholar, ResearchGate, GitHub, LinkedIn, and Email handles.
3. **Homepage Curriculum Vitae (`pages/tr/index.md` & `pages/en/index.md`)**:
   - Update biography, research interests, and avatar image paths.
4. **Localization Strings (`_data/locales/`)**:
   - Customize university terminology, department titles, or button labels in `tr.yml` and `en.yml`.

---

## 7. Companion Documentation Hub

- 🗺️ [**`ARCHITECTURE.md`**](./ARCHITECTURE.md) — *Detailed system design, Liquid helper hierarchy, and component blast radius matrix.*
- ✍️ [**`CONTRIBUTING.md`**](./CONTRIBUTING.md) — *Step-by-step authoring schemas for courses, publications, essays, and Git workflow.*
- 💬 [**`SUPPORT.md`**](./SUPPORT.md) — *Community guidelines, troubleshooting solutions, and bug reporting procedures.*

---

## 8. Licensing & Academic Ethics

This repository operates under a dual-licensing framework:

- **Source Code, Stylesheets & Toolchain**: Licensed under the [**MIT License**](./LICENSE) &copy; 2026 Bana Bir Sebep Ver. You are free to fork, customize, and redistribute the engine.
- **Academic Writing, Course Notes & Teaching Materials**: Licensed under the [**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. Educational content may be shared and adapted for non-commercial pedagogical purposes with proper academic citation.
