# Academy — Academic Portfolio, Course Hub & Research Archive

[![Deploy to GitHub Pages](https://github.com/BanaBirSebepVer/Academy/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/BanaBirSebepVer/Academy/actions/workflows/deploy.yml)
[![Jekyll Engine](https://img.shields.io/badge/Jekyll-4.0.23-CC0000.svg?style=flat-square&logo=jekyll&logoColor=white)](https://jekyllrb.com/)
[![Ruby Version](https://img.shields.io/badge/Ruby-%3E%3D%203.0-ruby.svg?style=flat-square&logo=ruby)](https://www.ruby-lang.org/)
[![License: MIT](https://img.shields.io/badge/Code%20License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Content License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey.svg?style=flat-square&logo=creative-commons)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Multilingual](https://img.shields.io/badge/Language-TR%20%7C%20EN-success.svg?style=flat-square)](/en/)

> **Live Production Website**: [**https://banabirsebepver.github.io/Academy/**](https://banabirsebepver.github.io/Academy/) (English Portal: [https://banabirsebepver.github.io/Academy/en/](https://banabirsebepver.github.io/Academy/en/))  
> **Automated Deployments**: Continuous integration and deployment is fully automated via GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) on every push to `main`.

---
 
## 1. Project Overview & Mission

This repository contains the complete source code, course materials, publication records, and digital essays for **Academy** — an open-source, bilingual static academic website engine designed for scholars, professors, and researchers.

### The Core Mission
1. **Open Courseware & Pedagogical Transparency**: Empower university students and independent learners with open access to semester syllabi, weekly reading lists, hands-on lab manuals, software tutorials, and sample exam questions.
2. **Scholarly Dissemination**: Provide a permanent, accessible index of peer-reviewed articles, book chapters, conference proceedings, direct DOI links, open-access PDF attachments, and one-click BibTeX citations.
3. **Public Academic Commentary**: Host critical essays and long-form analyses bridging artificial intelligence, data journalism, algorithmic gatekeeping, and communication ethics.

### Architectural Philosophy
- **100% Static & Native**: Built with native Jekyll without custom Ruby plugins, guaranteeing continuous, deterministic deployment on GitHub Pages.
- **Zero-Database & Indestructible**: Fully revision-controlled markdown files and YAML dictionaries replace heavy CMS databases, eliminating SQL injection vectors and maintenance overhead.
- **High Performance & Accessibility**: Lightweight, modular CSS (24 component stylesheets), dependency-free vanilla ES6 JavaScript modules, and responsive semantic HTML deliver sub-second page loads globally.

---

## 2. Core Architectural Highlights

```
┌────────────────────────────────────────────────────────────────────────┐
│                        4-LAYER RENDERING PIPELINE                      │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Core Configuration & Data                                     │
│   • _config.yml  • _data/locales/{tr,en}.yml  • Compact Collections    │
├───────────────────────────────────┬────────────────────────────────────┤
│ Layer 2: Reusable Partials        │ Layer 3: Layout Templates          │
│   • sidebar.html • navigation.html│   • default.html • homepage.html   │
│   • language-switcher.html        │   • lesson/single • post/archive   │
│   • lesson-timetable.html         │   • publication/single             │
├───────────────────────────────────┴────────────────────────────────────┤
│ Layer 4: Public Output URLs & Content Domains                          │
│   • TR: / , /dersler/ , /yayinlar/ , /yazilar/ , /akademik/            │
│   • EN: /en/ , /en/lessons/ , /en/publications/ , /en/posts/           │
└────────────────────────────────────────────────────────────────────────┘
```

### 🌐 Zero-Plugin Multilingual Architecture (TR / EN)
- **Folder-Driven Dynamic Navigation**: `_includes/navigation.html` dynamically scans `pages/tr/` when on Turkish routes and `pages/en/` on English routes. No hardcoded navigation links or duplicate route tables are maintained.
- **Strict Content Isolation**: Post and publication archives (`_layouts/post/archive.html`, `_layouts/publication/archive.html`) dynamically filter `site.posts` and `site.publications` to the active language domain. Category filters, tag counts, and related posts never leak across language boundaries.
- **Deep-Linking Translation Switcher**: `_includes/language-switcher.html` leverages shared `ref:` identifiers across bilingual front matter to toggle between exact counterparts (e.g. `/yayinlar/2019-ispanya-sivil-itaatsizlik/` $\leftrightarrow$ `/en/publications/2019-civil-disobedience-in-spain/`).
- **Dynamic Profile Localization**: The persistent sidebar dynamically displays institutional affiliations (`Eastern Mediterranean University` vs. `Doğu Akdeniz Üniversitesi`) and home root links matching the user's active language.

### 🎓 Hierarchical Course Hub (`_lessons/`)
- Structured course modules with localized syllabi, grading formulas, learning outcomes, and week-by-week schedules.
- **Dynamic Headings Bar**: Client-side JavaScript scans lecture headings (`h2`/`h3`) and automatically synthesizes a responsive, one-click syllabus navigation bar (`.lesson-timetable-bar`).
- Separate companion lecture notes (`layout: page`) linked seamlessly via `lecture_notes_url`.

### 📚 Academic Citation & Research Engine (`_publications/`)
- Comprehensive metadata schema featuring publication types (*Journal Article*, *Book Chapter*, *Conference Paper*), official DOIs, and direct research gate anchors.
- Dedicated `.publication-hero` banner layout with embedded, copy-to-clipboard BibTeX citations and local PDF download buttons.

### 🗂️ Unified Bilingual Compact Collections
- Compact curriculum vitae items (`_educations/`, `_awards/`, `_memberships/`, `_certificates/`, `_academic_positions/`, `_person/`) power the one-page homepage CV without cluttering full-page layouts.
- Dynamic empty-category suppression automatically hides CV categories that do not contain entries for the active language.

---

## 3. High-Level Repository Map

```
academy/
├── _config.yml                    # Unified site configuration (personal profile at top + framework architecture)
├── _data/
│   └── locales/                   # Strict UI interface dictionaries (NEVER hardcode strings!)
│       ├── tr.yml                 # Turkish UI labels, buttons, and navigation terms
│       └── en.yml                 # English UI labels, buttons, and navigation terms
│
├── _lessons/                      # Course modules & pedagogical materials
│   ├── tr/<course-slug>/          # Turkish course syllabi and lecture note markdown files
│   └── en/<course-slug>/          # English course syllabi and lecture note markdown files
│
├── _posts/                        # Long-form essays, critical commentary & tech reflections
│   ├── tr/YYYY-MM-DD-slug.md      # Turkish articles (routed to /yazilar/:date/:title/)
│   └── en/YYYY-MM-DD-slug.md      # English articles (routed to /en/posts/:date/:title/)
│
├── _publications/                 # Scholarly research papers, proceedings & book chapters
│   ├── tr/<slug>.md               # Turkish publication abstracts and citations
│   └── en/<slug>.md               # English publication abstracts and citations
│
├── _project/                      # Research initiatives and open-source software projects
│
├── _academic_positions/           # Compact CV: Faculty appointments and academic tiers
├── _awards/                       # Compact CV: Honors, scholarships, and research grants
├── _certificates/                 # Compact CV: Professional certifications and licenses
├── _conferences/                  # Compact CV: Presentations and keynote sessions
├── _educations/                   # Compact CV: Undergraduate, Master's, and Doctoral degrees
├── _experiences/                  # Compact CV: Professional industry background
├── _memberships/                  # Compact CV: Scientific societies and board memberships
├── _person/                       # Author personas for multi-author blog attribution
│
├── _includes/                     # Modular HTML partials
│   ├── head.html                  # Metadata, viewport, favicon, and master.css aggregator
│   ├── sidebar.html               # Responsive sidebar drawer, author card & switcher
│   ├── navigation.html            # Dynamic folder-driven menu builder (pages/{tr,en}/)
│   ├── language-switcher.html     # Bidirectional ref-based language switcher
│   ├── footer.html                # Sticky footer, copyright, and master.js bundle loader
│   ├── lesson/                    # Course-specific partials (header, timetable bar, sidebar)
│   └── post/                      # Post-specific partials (sidebar, category counts, related)
│
├── _layouts/                      # Structural HTML layouts
│   ├── default.html               # Base HTML5 wrapper (head + sidebar + footer)
│   ├── homepage.html              # Interactive one-page academic CV
│   ├── page.html                  # Clean layout for static reading pages
│   ├── lesson/                    # Course archive and single syllabus layouts
│   ├── post/                      # Post archive and localized single post layouts
│   ├── publication/               # Publication archive and single research detail layouts
│   └── project/                   # Project archive and single initiative layouts
│
├── pages/                         # Top-level symmetrical static pages
│   ├── tr/                        # Turkish pages (/akademik/, /iletisim/, /dersler/, etc.)
│   └── en/                        # English pages (/en/academic/, /en/contact/, /en/lessons/, etc.)
│
└── assets/                        # Static assets & front-end pipeline
    ├── css/
    │   ├── master.css             # Main stylesheet aggregating all 24 modular stylesheets
    │   └── modules/               # BEM-compliant CSS modules (color, layout, lesson-panel, etc.)
    ├── js/
    │   ├── master.js              # Vanilla ES6 module entry point
    │   └── modules/               # Client-side modules (archive search, lesson pills, scroll)
    └── images/                    # Compressed WebP/JPG visual assets and diagrams
```

---

## 4. Local Setup & Quickstart (60 Seconds)

Follow these steps to preview and test the website locally on your computer.

### Prerequisites
- **Git**: `git --version`
- **Ruby** (`>= 3.0`, ideally `3.3.x`): `ruby -v`
- **Bundler**: `gem install bundler`

### Step-by-Step CLI Setup

```bash
# 1. Clone the repository
git clone https://github.com/BanaBirSebepVer/Academy.git
cd Academy

# 2. Configure UTF-8 encoding (critical for Turkish and international characters)
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# 3. Install project dependencies
bundle install

# 4. Boot the live-reloading development server
./serve.sh
# Or alternatively with bundle directly:
# bundle exec jekyll serve --livereload
```

Open your browser and navigate to **`http://localhost:4000`**. Changes to Markdown, Liquid, and CSS files will trigger an instantaneous browser reload.

> [!TIP]
> **macOS Bundler Troubleshooting**: If you run into gem permission issues or path conflicts on macOS, force Bundler to use a local isolated directory:
> ```bash
> bundle config set --local path 'vendor/bundle'
> bundle install
> ```

---

## 5. Companion Documentation Hub

To maintain architectural stability and ensure error-free contributions, this repository provides specialized companion guides:

- 🗺️ [**`ARCHITECTURE.md`**](./ARCHITECTURE.md)  
  *Mandatory reading for developers and UI contributors.* Contains the complete Mermaid rendering pipeline diagram, the BEM CSS modular dependency tree, and the **Exhaustive File Blast Radius Matrix** (risk ratings from `🔴 Critical` to `🟢 Low`).
- ✍️ [**`CONTRIBUTING.md`**](./CONTRIBUTING.md)  
  *Mandatory reading for teaching assistants, students, and content authors.* Includes copy-ready YAML Front Matter templates for courses, essays, publications, and CV items, asset compression standards, and the **Pre-Flight Build Checklist**.

---

## 6. Contribution Golden Rules

All contributors (human and AI) must adhere to these non-negotiable principles:

1. **The Localization Golden Rule**: **NEVER hardcode visible human-facing text** in templates or Markdown files. All static strings must be declared inside `_data/locales/tr.yml` and `_data/locales/en.yml` and referenced via `locale.ui.<key>`.
2. **Bidirectional Ref Pairing**: Every translated page, post, lesson, or publication must specify a shared `ref:` key in its Front Matter to allow seamless language switching.
3. **Pre-Flight Validation**: Prior to opening a Pull Request, verify that the site builds with **zero warnings and exit code 0**:
   ```bash
   bundle exec jekyll build --trace
   ```

---

## 7. Licensing & Intellectual Property

This repository operates under a dual-licensing model:

- **Source Code, Layouts & Stylesheets**: Licensed under the [**MIT License**](./LICENSE) &copy; 2026 Bana Bir Sebep Ver. You are free to fork, adapt, and build upon the template architecture with proper attribution.
- **Academic Writing, Course Notes & Teaching Materials**: Licensed under the [**Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. You may share and adapt the educational content for non-commercial pedagogical purposes with appropriate credit.

---

## 8. Academic Configuration & Deployment

- **Custom Domain**: Set your domain in `_config.yml` (`url: "https://yourdomain.com"` and `baseurl: ""`).
- **GitHub Pages Subpath**: If hosting on `username.github.io/repo`, set `baseurl: "/repo"` and `url: "https://username.github.io"`.
- **Personal Information**: Edit the top section of `_config.yml` and `pages/tr/index.md` / `pages/en/index.md`.
- **License**: MIT License - free to use, modify, and distribute.
