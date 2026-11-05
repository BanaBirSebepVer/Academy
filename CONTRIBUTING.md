# Contributing to Academy's Academic Website

Welcome! Thank you for taking the time to contribute to the **Academy Personal Academic Website & Digital Teaching Repository** ([https://canbekcan.github.io/Academy/](https://canbekcan.github.io/Academy/)).

This repository serves as both a public scholarly hub and an open pedagogical archive. Contributions of all kinds are warmly welcomed:
- Correcting lecture slides or typographical errors
- Publishing updated weekly syllabi or syllabus readings
- Sharing exam questions, course notes, or tutorial guides
- Adding academic publications, citations, and BibTeX entries
- Enhancing responsive layouts, accessible UI modules, or Liquid optimization

---

## Target Audience Guide

To ensure smooth collaboration, this guide is tailored for two distinct contributor groups:

| Contributor Group | Primary Activities | Key Sections to Focus On |
| :--- | :--- | :--- |
| **Teaching Assistants, Students & Academic Collaborators** | Updating course syllabi, fixing typos, publishing lecture notes, uploading slides. | [Local Environment Setup](#2-local-environment-setup--preview)<br>[Content Contribution Workflows](#3-content-contribution-workflows)<br>[Media & Asset Standards](#5-media--asset-standards) |
| **Engineers, UI Designers & AI Agents** | Refactoring Liquid templates, enhancing CSS modules, modifying config or build pipelines. | [Architecture Awareness](#4-architecture-awareness--the-localization-golden-rule)<br>[Git Workflow & PR Checklist](#6-git-workflow-branching--pull-request-checklist) |

---

## 1. Code of Conduct & Academic Ethics

When participating in this repository, contributors are expected to uphold the highest standards of academic integrity:

- **Respectful & Inclusive Communication**: Treat all collaborators, students, and peers with mutual respect regardless of technical experience, academic seniority, or background.
- **Ethical Attribution & Citation**: Ensure that all added text, excerpts, datasets, slide decks, and external media are properly cited according to APA or Chicago formatting standards.
- **Copyright Compliance**: Do not upload copyrighted textbooks, proprietary teaching materials, or unauthorized high-resolution media. When in doubt, link to the official open-access repository or DOI instead.

---

## 2. Local Environment Setup & Preview

The site is built with native Jekyll for GitHub Pages. You can run the entire site locally to preview your edits before submitting a Pull Request.

### 2.1 System Prerequisites
Ensure you have the following installed on your machine:
- **Git**: `git --version`
- **Ruby** (version `>= 3.0`, ideally `3.3.x`): `ruby -v`
- **Bundler**: `gem install bundler`

> [!TIP]
> If you are on macOS or Linux, we recommend managing your Ruby versions via [rbenv](https://github.com/rbenv/rbenv) or [chruby](https://github.com/postmodern/chruby) to avoid system permission issues.

### 2.2 Clone & Install Dependencies
Open your terminal and run:

```bash
# 1. Clone the repository
git clone https://github.com/canbekcan/Academy.git
cd Academy

# 2. Configure UTF-8 encoding (critical for Turkish and international characters)
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# 3. Install required Ruby gems
bundle install
```

### 2.3 Starting the Development Server
Launch the live-reloading Jekyll server:

```bash
./serve.sh
# Or manually:
# bundle exec jekyll serve --config _config_engine.yml,_config.yml --livereload
```

- **`--drafts`**: Renders posts stored in the `_drafts/` directory and unreleased teaching content.
- **`--livereload`**: Automatically refreshes your browser whenever you save changes to markdown or CSS files.
- **Local Preview URL**: Open [http://localhost:4000](http://localhost:4000) in your web browser.

### 2.4 Terminal Troubleshooting Tip
If you encounter bundler conflicts, path issues, or missing gem errors on macOS/Linux:

```bash
# Force bundler to use project-local vendor path
bundle config set --local path 'vendor/bundle'
bundle install

# If nokogiri or psych fail to build native extensions on macOS
bundle exec gem pristine --all
```

---

## 3. Content Contribution Workflows

All content in this website is stored as clean Markdown files (`.md`) decorated with YAML Front Matter blocks delimited by `---`.

Follow the exact schemas below to ensure proper routing, multilingual pairing, and visual layout rendering.

---

### 3.1 Courses & Lecture Notes (`_lessons/`)

Courses and lecture materials live under `_lessons/` and are strictly categorized by language:
- Turkish courses: `_lessons/tr/<course-slug>/<filename>.md`
- English courses: `_lessons/en/<course-slug>/<filename>.md`

#### A. Main Course Syllabus (`layout: lesson`)
Create `<course-slug>.md` inside `_lessons/<lang>/<course-slug>/`:

```yaml
---
ref: media-production-fundamentals
lang: en
layout: lesson
title: "Media Production Fundamentals"
course_code: "YMGA252"
course_order: 1
category: "Media Production"
institution: "Eastern Mediterranean University"
institution_initial: "EMU"
instructor: "Can Bekcan"
instructor_title: "Lecturer"
course_date: "2024 - Present"
instructor_title_duration: "2024 - Present"
description: "Camera mechanics, visual narrative structures, lighting setups, and field recording fundamentals."
permalink: /en/lessons/media-production-fundamentals/
active_nav: lessons
lecture_notes_url: "/en/lessons/media-production-fundamentals/lecture-notes/"
discord: "https://discord.gg/your-channel"
email: "can@canbekcan.com"
---

## Course Description
Detailed overview of the semester curriculum and pedagogical outcomes...

## Weekly Schedule
### Week 1: Introduction to Camera Anatomy
- Theoretical foundations of sensor sizes and lens focal lengths.
- Practical studio exercise: Exposure triangle calibration.
```

#### B. Supplemental Lecture Notes (`layout: page`)
Create supplemental files (e.g., lecture notes, reading packs, exam questions) in the same directory:

```yaml
---
ref: media-production-fundamentals
lang: en
layout: page
title: "Media Production Fundamentals - Lecture Notes"
permalink: /en/lessons/media-production-fundamentals/lecture-notes/
active_nav: lessons
doc_type: notes # Options: notes | syllabus | exam | project
---

# Week 1: Camera Mechanics & Aperture Guide

Here are the accompanying lecture slides, reference diagrams, and laboratory tasks for Week 1...
```

> [!NOTE]
> Linking Notes to Syllabus: Always ensure `lecture_notes_url` in the main syllabus matches the `permalink` defined in your supplemental notes file.

---

### 3.2 Blog Posts & Essays (`_posts/`)

Posts represent academic articles, critical commentary, and technology essays.

- **File Path**: `_posts/<lang>/YYYY-MM-DD-title-slug.md`
- **Naming Rule**: Must start with a 4-digit year, 2-digit month, and 2-digit day followed by a hyphenated slug (e.g., `2026-03-10-prompt-engineering-in-humanities.md`).

#### Copy-Paste Post Template:

```yaml
---
ref: prompt-engineering-humanities
lang: en
layout: post/single
title: "Prompt Engineering as a Critical Inquiry Method in Humanities"
date: 2026-03-10 14:00:00 +0300
author: "canbekcan" # Matches username in _person/ collection (e.g. canbekcan, chatgpt, gemini)
categories: ["Academic"]
tags: ["artificial intelligence", "media studies", "critical pedagogy"]
excerpt: "How prompt architecture transforms computational text generation into a hermeneutic analytical tool for media researchers."
featured_image: "/assets/images/posts/2026-prompt-engineering.webp"
---

Your essay body begins here. Write in standard GitHub Flavored Markdown.

## Analytical Framework
You can embed KaTeX mathematical notation using `$E = mc^2$` or block equations:

$$
\text{Precision} = \frac{TP}{TP + FP}
$$

## Concluding Remarks
Summary and implications for digital media educators...
```

---

### 3.3 Publications & Research (`_publications/`)

Research outputs live under `_publications/<lang>/<slug>.md`.

- **File Path**: `_publications/tr/<slug>.md` or `_publications/en/<slug>.md`
- **Layout**: `publication/single`

#### Copy-Paste Publication Template:

```yaml
---
ref: 2026-algorithmic-journalism-ethics
lang: en
layout: publication/single
title: "Algorithmic Gatekeeping in Post-Industrial Newsrooms: A Comparative Discourse Analysis"
publication_type: "Journal Article" # Options: Journal Article | Book Chapter | Conference Paper
type_label: "Peer-Reviewed Article"
link: "https://doi.org/10.1000/182"
author: "Can Bekcan"
citation: "Bekcan, C. (2026). Algorithmic Gatekeeping in Post-Industrial Newsrooms. Journal of Digital Media & Society, 14(2), 112-134."
year: 2026
doi: "10.1000/182"
pdf_download_url: "/assets/publications/2026-algorithmic-journalism-ethics.pdf"
bibtex: |
  @article{bekcan2026algorithmic,
    title={Algorithmic Gatekeeping in Post-Industrial Newsrooms: A Comparative Discourse Analysis},
    author={Bekcan, Can},
    journal={Journal of Digital Media \& Society},
    volume={14},
    number={2},
    pages={112--134},
    year={2026},
    publisher={Academic Press}
  }
order: 1
---

### Abstract
This study investigates the sociological and ethical implications of automated curation algorithms in contemporary newsrooms...

#### Keywords
Algorithmic Journalism, Automated Gatekeeping, Newsroom Sociology, Media Ethics.
```

---

### 3.4 Compact Curriculum Vitae Items (`_educations/`, `_awards/`, `_memberships/`, `_certificates/`)

Compact collections power the one-page academic CV on the homepage (`/` and `/en/`).

- **Bilingual Structure Rule**: Unlike long-form articles, single CV files serve both Turkish and English views. They use nested language keys (`tr:` and `en:`) or language-specific subdirectories depending on the collection.

#### Example: Education Item (`_educations/tr/01-phd.md`):

```yaml
---
degree: "PhD Candidate"
year: "Present"
field: "Communication and Media Studies"
institution: "Eastern Mediterranean University"
order: 1
---

### PhD Candidate (Present)
- **Field:** Communication and Media Studies
- **Institution:** Eastern Mediterranean University
```

#### Example: Award / Grant Item (`_awards/01-research-fellowship.md`):

```yaml
---
title: "Graduate Research Fellowship & Full Tuition Waiver"
start_year: "2014"
end_year: "2022"
order: 1
details:
  - "Competitive merit-based full tuition fellowship covering Master of Arts coursework and doctoral research residency."
  - "Awarded concurrently with formal appointment as Teaching & Research Assistant."
---
```

---

## 4. Architecture Awareness & The Localization Golden Rule

Before modifying any layout, template, or partial, you **must read [`ARCHITECTURE.md`](ARCHITECTURE.md)** to verify upstream and downstream dependencies.

> [!CAUTION]
> ### 🛑 The Golden Rule of Localization
> **NEVER hardcode visible human-facing strings** into HTML, Markdown templates, or Liquid includes.
> 
> - ❌ **Incorrect**: `<span>Paylaş:</span>` or `<button>Read More</button>`
> - ✅ **Correct**: `<span>{{ locale.ui.share | default: "Paylaş" }}:</span>` or `<button>{{ locale.ui.read_more }}</button>`

### How to Introduce or Modify UI Strings:
1. Open `_data/locales/tr.yml` and add the Turkish string under the appropriate namespace:
   ```yaml
   ui:
     exam_schedule: "Sınav Takvimi"
   ```
2. Open `_data/locales/en.yml` and add the English string under the exact same key:
   ```yaml
   ui:
     exam_schedule: "Exam Schedule"
   ```
3. Call the key in your Liquid template:
   ```liquid
   {% assign current_lang = page.lang | default: site.default_lang | default: "tr" %}
   {% assign locale = site.data.locales[current_lang] %}
   
   <h3>{{ locale.ui.exam_schedule }}</h3>
   ```

---

## 5. Media & Asset Standards

Fast loading times and accessible delivery are critical for students and academic readers on diverse connections.

### 5.1 Storage & Organization
- Store general images in `assets/images/`.
- Store post-specific images in `assets/images/posts/`.
- Store publication PDFs in `assets/publications/`.

### 5.2 File Naming Conventions
- Always use **lowercase, hyphen-separated** file names.
- ❌ `Screen Shot 2026-03-10 at 14.22.png`
- ✅ `2026-03-10-visual-storytelling-camera-rig.webp`

### 5.3 Format & Size Constraints
- **Format**: Prefer **WebP** for photographic content and illustrations. Use SVG for logos and vector icons.
- **File Size**: Compress all images to stay **under 500 KB** (ideally under 250 KB). Tools like [Squoosh](https://squoosh.app) or ImageOptim work excellently.
- **Dimensions**: Maximum width of `1920px` for hero banners; maximum width of `1000px` for inline diagrams.

### 5.4 Embedding Images in Markdown
Always wrap image paths with the `relative_url` filter to ensure proper path resolution across local subpaths and production domains:

```markdown
![Schematic diagram of the exposure triangle]({{ '/assets/images/posts/2026-exposure-triangle.webp' | relative_url }})
```

---

## 6. Git Workflow, Branching & Pull Request Checklist

### 6.1 Branch Naming Convention
Create a descriptive branch off `main` following standard prefixes:

- `content/<topic>`: Adding or editing lecture notes, syllabi, or essays (e.g. `content/ymga252-week3-notes`).
- `fix/<issue-name>`: Bug fixes, broken links, or typography adjustments (e.g. `fix/profile-institution-locale`).
- `feature/<name>`: New layouts, CSS modules, or interactive components (e.g. `feature/dark-mode-toggle`).

```bash
git checkout -b content/ymga252-week3-notes
```

### 6.2 Commit Message Standards
We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new course, post, publication, or feature
- `fix:` A bug fix or broken link resolution
- `docs:` Documentation changes (`README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`)
- `style:` Formatting, typography, or CSS module tweaks without logic changes
- `refactor:` Liquid template restructuring without changing output

*Example*: `git commit -m "feat(lessons): add week 3 lighting techniques to YMGA252"`

---

### 6.3 The Pre-Flight Check (Crucial)

Before pushing your branch or opening a Pull Request, **you must execute a clean build test**:

```bash
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
cd Academy
bundle exec jekyll build --trace
```

> [!IMPORTANT]
> The build command must exit with **exit code 0** and produce **0 Liquid syntax errors or fatal warnings**. If the terminal outputs Liquid syntax errors, fix them before committing.

---

### 6.4 Pull Request Submission Checklist

When opening a Pull Request on GitHub, include the following checklist in your description:

```markdown
### Contributor Pre-Flight Checklist
- [ ] Site builds cleanly with `bundle exec jekyll build --trace` (exit code 0).
- [ ] Tested locally via `bundle exec jekyll serve` on `http://localhost:4000`.
- [ ] Markdown Front Matter includes required `lang:` and paired `ref:` fields.
- [ ] No visible UI strings are hardcoded into HTML or Liquid templates.
- [ ] Any new UI text is added to both `_data/locales/tr.yml` and `_data/locales/en.yml`.
- [ ] All uploaded images are compressed (< 500 KB) and named with lowercase hyphens.
- [ ] Academic citations and external materials are ethically and properly referenced.
```

---

### 6.5 Automated Continuous Deployment (GitHub Actions)

Deployments are 100% automated via GitHub Actions:
- Whenever a Pull Request is merged into `main` (or a direct commit is pushed), the workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) automatically triggers.
- It builds the site using native GitHub Pages tooling (`actions/jekyll-build-pages@v1`), packages the artifact, and releases it to the live domain within minutes.
- You can monitor real-time build progress and deployment health under the **Actions** tab on GitHub.

---

## Questions or Need Assistance?

If you have questions regarding course material submissions, technical roadblocks, or architectural decisions, please [open a GitHub Discussion](https://github.com/canbekcan/Academy/discussions) or reach out via email at `can@canbekcan.com`.

Thank you for helping keep our academic and teaching resources open, accessible, and high-quality!
