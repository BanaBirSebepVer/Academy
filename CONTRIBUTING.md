# Contributing to Academy

Thank you for your interest in contributing to **Academy** ([https://banabirsebepver.github.io/Academy/](https://banabirsebepver.github.io/Academy/))! Whether you are an educator publishing course materials, a student fixing typographical errors, a researcher adding publications, or a software engineer optimizing the asset pipeline, your contributions help keep scholarly resources open, accessible, and high-quality.

---

## Target Audience Guide

> [!TIP]
> **First-time academic user?** If you are an academician setting up your website or creating content for the first time without Git or command-line experience, check out the step-by-step **[Academician's Tutorial (TUTORIAL.md)](./TUTORIAL.md)**.

| Contributor Group | Primary Activities | Key Sections to Focus On |
| :--- | :--- | :--- |
| **Teaching Assistants, Students & Scholars** | Authoring course modules, updating syllabi, adding publications, fixing typos, publishing lecture notes. | [3. Content Authoring Workflows](#3-content-authoring-workflows)<br>[4. Media & Asset Standards](#4-media--asset-standards)<br>[6. Pre-Flight Verification](#6-pre-flight-verification--ci-checks) |
| **Engineers, UI Designers & AI Agents** | Refactoring Sass/SCSS partials, enhancing JS modules, Liquid optimization, CI/CD workflows. | [2. Local Setup](#2-local-environment-setup--preview)<br>[5. The Localization Golden Rule](#5-architecture-awareness--localization-rule)<br>[7. Git Workflow & PR Checklist](#7-git-workflow--pr-checklist) |

---

## 1. Code of Conduct & Academic Integrity

All contributors are expected to uphold the highest standards of academic ethics and inclusive communication:
- **Respectful Collaboration**: Treat students, faculty, and open-source contributors with dignity and constructive professional courtesy.
- **Ethical Citation & Anti-Plagiarism**: Every excerpt, dataset, reading material, or diagram introduced must include appropriate attribution following academic standards (APA, IEEE, Chicago, or Oxford).
- **Copyright Compliance**: Do not commit unauthorized, copyrighted textbooks or paywalled PDFs. Provide canonical DOIs, official repository links, or open-access preprint attachments instead.

---

## 2. Local Environment Setup & Preview

The site is built with native Jekyll for GitHub Pages. You can run the entire site locally to preview your edits before submitting a Pull Request.

### 2.1 Prerequisites
- **Git**: `git --version`
- **Ruby** (`>= 3.0`, ideally `3.3.x`): `ruby -v`
- **Bundler**: `gem install bundler`
- **Python** (`>= 3.8`): `python3 --version` (for CI linter & sync scripts)

### 2.2 Setup Commands

```bash
# 1. Clone the repository
git clone https://github.com/BanaBirSebepVer/Academy.git
cd Academy

# 2. Configure UTF-8 encoding (critical for Turkish and international characters)
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# 3. Install required Ruby gems
bundle install

# 4. Start the live-reloading Jekyll server
./serve.sh
# Or alternatively:
# bundle exec jekyll serve --livereload
```

Navigate to **`http://localhost:4000`** in your browser to preview your changes.

> [!TIP]
> **macOS Bundler Permissions**: If you encounter gem permission conflicts, isolate Bundler into the project directory:
> ```bash
> bundle config set --local path 'vendor/bundle'
> bundle install
> ```

---

## 3. Content Authoring Workflows

All content in Academy is stored as Markdown files (`.md`) decorated with YAML Front Matter delimited by `---`.

---

### 3.1 Modular Courses & Syllabi (`_lessons/`)

Courses are organized as modular directories under `_lessons/{lang}/{course-slug}/`. Monolithic documents are broken down into maintainable sub-modules and assembled dynamically into the comprehensive syllabus page.

#### Directory Layout
```
_lessons/en/<course-slug>/
├── <course-slug>.md       # Main course entry file (layout: lesson/single)
├── 01-outcomes.md         # Learning outcomes (section_type: outcomes)
├── 02-policy.md           # Course policy & requirements (section_type: policy)
├── week-01.md             # Week 1 schedule & lab (section_type: week)
├── ...
├── week-14.md             # Week 14 schedule & lab (section_type: week)
├── practicals.md          # Evaluation criteria (section_type: exam)
└── final-project.md       # Capstone project guidelines (section_type: exam)
```

#### A. Main Course Front-Matter Schema (`<course-slug>.md`):
```yaml
---
ref: media-production-fundamentals
lang: en
layout: lesson/single
title: "Media Production Fundamentals"
course_code: "YMGA252"
course_order: 1
category: "Media Production"
institution: "Eastern Mediterranean University"
institution_initial: "EMU"
faculty: "Faculty of Communication"
department: "Department of New Media and Journalism"
instructor: "Can Bekcan"
instructor_title: "Lecturer"
course_date: "2024 - Present"
instructor_title_duration: "2024 - Present"
appointments:
  - instructor_title: "Lecturer"
    course_date: "2024 - Present"
    instructor_title_duration: "2024 - Present"
duties:
  - "Taught studio production, camera operation, and audio engineering fundamentals."
  - "Managed multi-camera live broadcast sessions with student production crews."
description: "Camera mechanics, visual narrative structures, lighting setups, and field recording fundamentals."
active_nav: lessons
lecture_notes_url: ""
discord: "https://discord.gg/your-channel"
email: "academician@example.edu"
modules:
  - 01-outcomes.md
  - 02-policy.md
  - week-01.md
  - practicals.md
  - final-project.md
---

Detailed course overview and semester introduction...
```

#### B. Weekly Sub-Module Schema (`week-*.md`):
```yaml
---
title: "Week 1"
topic: "Introduction to Camera Anatomy & Sensor Technology"
duty: "Team formation, equipment checkout protocols, and lab safety review."
practice: "Practical 1: Exposure triangle calibration"
order: 1
section_type: "week"
---

Detailed lecture summary, required readings, and laboratory tasks for Week 1...
```

#### C. Outcomes, Policy, and Assessment Schemas:
- **Outcomes (`01-outcomes.md`)**:
  ```yaml
  ---
  title: "Learning Outcomes"
  order: 1
  section_type: "outcomes"
  ---
  ```
- **Course Policy (`02-policy.md`)**:
  ```yaml
  ---
  title: "Course Policy & Attendance"
  order: 2
  section_type: "policy"
  ---
  ```
- **Evaluation / Exams (`practicals.md`, `final-project.md`)**:
  ```yaml
  ---
  title: "Practicals & Lab Assignments"
  percentage: 50
  section_type: "exam"
  order: 1
  ---
  ```

---

### 3.2 Scholarly Publications (`_publications/`)

Publications are stored under `_publications/tr/` and `_publications/en/`.

> [!NOTE]
> **Automated BiBTeX & Citations**: You **do not need** to author manual BiBTeX strings or citation text. Academy's citation engine automatically formats **APA 7th, IEEE, Oxford**, and standard **BiBTeX** citations directly from your front-matter metadata!

```yaml
---
ref: 2026-algorithmic-journalism-ethics
lang: en
layout: publication/single
title: "Algorithmic Gatekeeping in Post-Industrial Newsrooms: A Comparative Discourse Analysis"
date: 2026-03-01
pub_date: "2026-03-01"
year: "2026"
order: 1
entryType: "article" # Options: article, inproceedings, incollection, book, phdthesis, techreport, preprint
pub_type: "Journal Article"
type_label: "Peer-Reviewed Article"
journal: "International Journal of Communication & Information"
volume: "14"
issue: "2"
pages: "145-168"
doi: "10.1000/182"
author: "Can Bekcan"
authors:
  - "Can Bekcan"
  - "Dr. Alex Smith"
keywords:
  - "Algorithmic Journalism"
  - "Gatekeeping"
  - "Newsroom Sociology"
pdf_url: "/assets/publications/2026-algorithmic-journalism-ethics.pdf"
link: "https://doi.org/10.1000/182"
excerpt: "This study investigates the sociological and ethical implications of automated curation algorithms in contemporary newsrooms."
---

### Abstract
Detailed abstract of the research paper...

### Key Findings
- Primary empirical contribution...
```

---

### 3.3 Long-Form Essays & Posts (`_posts/`)

Essays, technical guides, and public academic commentary live under `_posts/{lang}/`:
- **Naming Rule**: `YYYY-MM-DD-hyphenated-slug.md` (e.g., `2026-03-10-prompt-engineering-in-humanities.md`).

```yaml
---
ref: prompt-engineering-humanities
lang: en
layout: post/single
title: "Prompt Engineering as a Critical Inquiry Method in Humanities"
date: 2026-03-10 14:00:00 +0300
author: "akademisyen"
categories: ["Academic", "Artificial Intelligence"]
tags: ["AI Ethics", "Media Studies", "Prompt Engineering"]
excerpt: "How prompt architecture transforms computational text generation into an analytical tool for media researchers."
featured_image: "/assets/images/posts/2026-prompt-engineering.webp"
---

Your article content formatted with standard GitHub Flavored Markdown.

## Mathematical Equations
You can embed inline math with `$E = mc^2$` or block LaTeX equations:

$$
\text{F1-Score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}
$$
```

---

### 3.4 Social Profiles & Academic Networks (`_data/socials.yml`)

Configure all public handles in `_data/socials.yml`:
```yaml
# Academic & Research Profiles
orcid: "0000-0002-1825-0097"
google_scholar: "https://scholar.google.com/citations?user=your_id"
researchgate: "https://www.researchgate.net/profile/your_username"
academia: "https://independent.academia.edu/your_username"
scopus: ""
web_of_science: ""

# Developer & Code
github: "https://github.com/your_username"
gitlab: ""

# Professional & Social Networks
linkedin: "https://www.linkedin.com/in/your_username"
x: "https://x.com/your_username"
bluesky: ""
mastodon: ""
youtube: ""
email: "academician@example.edu"
```

---

## 4. Media & Asset Standards

- **Directory Organization**:
  - General UI imagery: `assets/images/`
  - Post header images: `assets/images/posts/`
  - Publication PDFs: `assets/publications/`
- **Formats & Compression**:
  - Use **WebP** for photos and diagrams; use vector **SVG** for symbols and icons.
  - Keep image files **under 250 KB** (maximum 500 KB).
  - Use lowercase hyphenated filenames: `2026-camera-optics-sensor.webp`.
- **Vector SVG Icons**:
  - Do not load external icon font kits. Use the vector SVG include helper:
    ```liquid
    {% include icon.html name="orcid" %}
    {% include icon.html name="google-scholar" class="icon-sm" %}
    ```
  - Available symbols are defined in `_includes/icons-sprite.svg`.

---

## 5. Architecture Awareness & Localization Rule

> [!CAUTION]
> ### 🛑 The Localization Golden Rule
> **NEVER hardcode visible human-facing strings** into HTML, Markdown templates, or Liquid includes.
> 
> - ❌ **Incorrect**: `<span>Paylaş:</span>` or `<button>Read More</button>`
> - ✅ **Correct**: `<span>{{ locale.ui.share | default: "Paylaş" }}:</span>` or `<button>{{ locale.ui.read_more }}</button>`

### Introducing New Strings:
1. Define the Turkish term in `_data/locales/tr.yml`:
   ```yaml
   ui:
     exam_schedule: "Sınav Takvimi"
   ```
2. Define the exact same key in `_data/locales/en.yml`:
   ```yaml
   ui:
     exam_schedule: "Exam Schedule"
   ```
3. Reference in Liquid:
   ```liquid
   <h3>{{ locale.ui.exam_schedule }}</h3>
   ```

---

## 6. Pre-Flight Verification & CI Checks

Before opening a Pull Request or committing changes, run the automated verification suite:

### 1. Front-Matter Integrity Linter
Validate all Markdown front matter schemas, required keys, and check for duplicate DOIs:
```bash
python3 scripts/verify_network.py
```
*Must pass with exit code `0`.*

### 2. Zero-Warning Jekyll Build
Ensure that Liquid tags, Sass stylesheets, and asset pipelines compile cleanly:
```bash
export LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
bundle exec jekyll build --trace
```
*Must exit with code `0` and produce zero Liquid syntax errors.*

### 3. Print Stylesheet Preview
Open the homepage and a course page in your browser and trigger print preview (`Ctrl + P` / `Cmd + P`):
- Homepage should render as a clean **US Academic CV** (Times New Roman / Serif, BW).
- Course page should render as a formal **University Syllabus** with weekly tables and grading criteria.

---

## 7. Git Workflow & PR Checklist

### 7.1 Branch Conventions
- `content/<topic>`: Course additions, weekly updates, essays (`content/ymga252-week-4`)
- `fix/<issue>`: Bug fixes, broken URLs, localization updates (`fix/language-switcher-fallback`)
- `feature/<name>`: New stylesheets, toolchain scripts, or layouts (`feature/bibtex-export`)

### 7.2 Commit Standards
We adhere to [Conventional Commits](https://www.conventionalcommits.org/):
- `feat(lessons): add week 4 information architecture to YMGA107`
- `fix(i18n): resolve cross-language 404 fallback for research hub`
- `docs(contributing): update front-matter schema for modular courses`

### 7.3 Pull Request Checklist
Include this checklist in your Pull Request description:
```markdown
### Contributor Checklist
- [ ] Ran `python3 scripts/verify_network.py` (0 integrity errors).
- [ ] Ran `bundle exec jekyll build --trace` (exit code 0, 0 Liquid warnings).
- [ ] Local preview verified on `http://localhost:4000`.
- [ ] Bilingual `ref:` keys properly paired between TR and EN content.
- [ ] No hardcoded UI strings; added to `_data/locales/{tr,en}.yml`.
- [ ] Images compressed (< 250 KB) and named with lowercase hyphens.
- [ ] Print preview checked (`Ctrl + P`) for CV and course syllabus.
```

Thank you for contributing to Academy!
