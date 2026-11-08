# The Academician's Guide to Academy
### A Step-by-Step Tutorial for Educators, Researchers & Scholars

Welcome to **Academy**! This tutorial is written specifically for professors, lecturers, postdocs, research scientists, and graduate students.

You do **not** need to be a software developer or computer programmer to build and maintain a professional academic website. If you know how to write an abstract, edit a syllabus in Word, or post a PDF, you already have all the skills needed.

---

## Table of Contents
1. [Why Academy? The 3-Minute Pitch](#1-why-academy-the-3-minute-pitch)
2. [Step 1: Get Your Site Online in 5 Minutes (Zero Cost)](#2-step-1-get-your-site-online-in-5-minutes-zero-cost)
3. [Step 2: How to Edit Pages (In Your Web Browser!)](#3-step-2-how-to-edit-pages-in-your-web-browser)
4. [Step 3: Personalize Your Academic Profile & Socials](#4-step-3-personalize-your-academic-profile--socials)
5. [Step 4: Build Your Academic CV (Degrees, Awards, Appointments)](#5-step-4-build-your-academic-cv-degrees-awards-appointments)
6. [Step 5: Publish Your Research (The Magic of Automated ORCID Sync)](#6-step-5-publish-your-research-the-magic-of-automated-orcid-sync)
7. [Step 6: Build Your Course & Syllabus (The Weekly Modular System)](#7-step-6-build-your-course--syllabus-the-weekly-modular-system)
8. [Step 7: Publish Essays, Notes & Announcements](#8-step-7-publish-essays-notes--announcements)
9. [Step 8: One-Click Academic Printing (US Academic CV & Course Syllabus)](#9-step-8-one-click-academic-printing-us-academic-cv--course-syllabus)
10. [Step 9: Bilingual Content (Turkish & English)](#10-step-9-bilingual-content-turkish--english)
11. [Step 10: Safety First — Checking Your Work with the Built-In Linter](#11-step-10-safety-first--checking-your-work-with-the-built-in-linter)
12. [Frequently Asked Questions (FAQ) for Academics](#12-frequently-asked-questions-faq-for-academics)

---

## 1. Why Academy? The 3-Minute Pitch

Traditional academic websites suffer from three major headaches:
- **University CMS Portals:** Rigid, outdated, slow, and you lose everything when you change institutions.
- **Commercial Site Builders (Wix, Squarespace, WordPress):** Expensive monthly hosting fees, security update popups, broken database plugins, and zero support for LaTeX formulas, BiBTeX, or DOIs.
- **Academic Social Networks (ResearchGate, Academia.edu):** Proprietary walled gardens that paywall analytics and own your data.

**The Academy Solution:**
- **100% Free Forever:** Hosted on GitHub Pages with enterprise-grade SSL, 99.99% uptime, and zero server fees.
- **You Own Your Data:** Every syllabus, publication, and CV item is stored as a clean, human-readable text file (`.md`).
- **Scholarly Superpowers:** Automated ORCID publication sync, instant BiBTeX generation, Google Scholar indexing, and one-click US Academic CV and Course Syllabus printing.

---

## 2. Step 1: Get Your Site Online in 5 Minutes (Zero Cost)

### A. Create Your Copy on GitHub
1. Sign up for a free account at [GitHub.com](https://github.com) if you do not have one.
2. Navigate to the [Academy Repository](https://github.com/BanaBirSebepVer/Academy).
3. Click the green **"Use this template"** button (or **"Fork"**) in the top right corner.
4. Name your repository:
   - **Recommended:** `yourusername.github.io` (This will make your website live at `https://yourusername.github.io/`).
   - **Alternative:** `academy` (Your website will be live at `https://yourusername.github.io/academy/`).

### B. Activate GitHub Pages
1. In your newly created repository, click **Settings** (gear icon at the top).
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. That's it! GitHub Actions will now automatically build and publish your website whenever you save a change.

---

## 3. Step 2: How to Edit Pages (In Your Web Browser!)

You don't need to install Git or use a terminal if you don't want to. You can edit your entire website directly in your web browser:

### Option A: The GitHub Web Interface (Quick Fixes)
1. Navigate to any file (e.g., `_config.yml` or `_data/socials.yml`).
2. Click the **Pencil icon** (✏️) in the top right corner to edit.
3. Make your changes in plain text.
4. Scroll to the bottom and click the green **Commit changes...** button.
5. GitHub will rebuild your website in approximately 60 seconds!

### Option B: The Full Web Editor (Press `.` on Any Repo)
1. Open your repository on GitHub.
2. Press the period key (**`.`**) on your keyboard.
3. A full VS Code editor will launch in your browser instantly! You can edit files, create new folders, and upload images.
4. Click the Source Control tab on the left (the branch icon with a blue badge), type a short description (e.g., "Add Week 3 lecture"), and click **Commit & Push**.

### Option C: Local Development (For Advanced Users)
If you prefer working on your laptop:
```bash
git clone https://github.com/yourusername/yourusername.github.io.git
cd yourusername.github.io
bundle install
bundle exec jekyll serve
# Open http://localhost:4000 in your browser
```

---

## 4. Step 3: Personalize Your Academic Profile & Socials

### A. Your Site Identity (`_config.yml`)
Open `_config.yml` and personalize the top block:

```yaml
title: "Prof. Dr. Jane Doe"
author: "Jane Doe"
email: "jane.doe@university.edu"
institution: "Eastern Mediterranean University"
department: "Department of Computer Engineering"
url: "https://yourusername.github.io" # Your live URL
baseurl: "" # Leave empty if using yourusername.github.io
```

### B. Your Scholarly & Social Networks (`_data/socials.yml`)
Open `_data/socials.yml` and paste your scholarly identifiers:

```yaml
# Academic & Research Profiles
orcid: "0000-0002-1825-0097" # Your 16-digit ORCID ID
google_scholar: "https://scholar.google.com/citations?user=your_id"
researchgate: "https://www.researchgate.net/profile/your_name"
academia: "https://independent.academia.edu/your_name"

# Developer & Code
github: "https://github.com/your_username"

# Professional & Social Networks
linkedin: "https://www.linkedin.com/in/your_name"
x: "https://x.com/your_handle"
email: "jane.doe@university.edu"
```
> **Pro-Tip:** Any field you leave blank (`""`) will automatically hide its icon from your sidebar. Only platforms with your links will display.

### C. Your Profile Photo & Biography
- **Your Photo:** Place your portrait picture in `profile/avatar.png` (or `assets/img/avatar.jpg`).
- **Your Biography (Turkish):** Open `pages/tr/index.md` and edit your introductory biography, research interests, and office location.
- **Your Biography (English):** Open `pages/en/index.md` and write your English bio.

---

## 5. Step 4: Build Your Academic CV (Degrees, Awards, Appointments)

Academy uses modular **compact data items** to build your Curriculum Vitae. You never have to manually align HTML tables!

### A. Adding a Degree (`_educations/`)
To add an educational milestone, create a file in `_educations/en/` (e.g., `01-phd.md`):

```markdown
---
degree: "Doctor of Philosophy (Ph.D.)"
year: "2024"
field: "Computer Science"
institution: "Stanford University"
order: 1
---

### Doctor of Philosophy (Ph.D.) (2024)

- **Field:** Computer Science
- **Institution:** Stanford University
- **Dissertation Title:** Deep Learning in Natural Language Understanding
- **Advisor:** Prof. Dr. John Smith
```

### B. Adding an Academic Appointment (`_academic_positions/`)
Create a file in `_academic_positions/en/` (e.g., `01-assoc-prof.md`):

```markdown
---
title: "Associate Professor"
department: "Department of Computer Science"
institution: "Faculty of Engineering"
start_year: 2024
end_year: "Present"
order: 1
---
```

### C. Other CV Sections
You can similarly populate:
- `_awards/en/`: Academic honors, best paper awards, and fellowships.
- `_experiences/en/`: Industry, post-doc, and visiting researcher experiences.
- `_certificates/en/`: Professional certifications and clinical or pedagogical accreditations.
- `_memberships/en/`: ACM, IEEE, AAAS, or national academic society memberships.

> **Automatic CV Cleanup:** If a section has no entries in a given language, Academy will automatically hide that heading from your homepage. No ugly empty boxes!

---

## 6. Step 5: Publish Your Research (The Magic of Automated ORCID Sync)

Scholarly publications are the crown jewel of an academic website. Academy gives you two easy ways to manage them:

### Method 1: Zero-Config Automated ORCID Sync (Recommended)
Why type your papers manually when you already entered them on ORCID?

1. Ensure your 16-digit ORCID ID is set in `_data/socials.yml` (e.g., `orcid: "0000-0002-1825-0097"`).
2. Ensure your works on [ORCID.org](https://orcid.org) have their privacy set to **"Everyone"** (Public).
3. Run the automated sync script:
   ```bash
   python3 scripts/sync_orcid.py
   ```
4. The script queries Crossref and ORCID, extracts all metadata (DOIs, journal names, publication dates, volume, issues, abstracts), and creates formatted publication markdown files in `_publications/` automatically!

### Method 2: Manual Publication Entry
To add a paper manually, create a file in `_publications/en/` named `YYYY-slug.md` (e.g., `2026-graph-neural-networks.md`):

```markdown
---
title: "Graph Neural Networks for Scholarly Communication Analysis"
date: 2026-03-15
lang: "en"
ref: "pub-gnn-2026"
entryType: "article" # Options: article, inproceedings, book, chapter
authors: "Jane Doe, John Smith, Alice Brown"
journal: "Journal of Academic Informatics"
volume: "42"
issue: "3"
pages: "105-120"
doi: "10.1016/j.jinf.2026.01.005"
pdf: "https://arxiv.org/pdf/2601.00000.pdf"
code: "https://github.com/janedoe/gnn-scholarly"
abstract: "In this paper, we propose a graph neural network architecture to analyze scientific collaboration networks..."
---

### Overview & Research Contributions
Here you can write extended commentary, upload supplementary figures, embed presentation slides, or share data repository links in standard Markdown.
```

> **Instant BiBTeX & Google Scholar:** You do NOT need to write raw BiBTeX! Academy's rendering engine automatically converts your front-matter into a formatted BiBTeX citation box with a 1-click "Copy Citation" button and injects Google Scholar `<meta name="citation_...">` tags into the page header.

---

## 7. Step 6: Build Your Course & Syllabus (The Weekly Modular System)

Are you tired of monolithic syllabus files that are painful to update? Academy features a **Modular Courseware System** where each course lives in its own dedicated directory.

### Directory Structure of a Course
Inside `_lessons/en/`, create a folder for your course code (e.g., `_lessons/en/cs101/`):

```
_lessons/en/cs101/
├── cs101.md            <- Master course description & prerequisites
├── 01-outcomes.md       <- Learning outcomes & competencies
├── 02-policy.md         <- Grading policy, exams & academic integrity
├── week-01.md           <- Week 1: Introduction & Environment Setup
├── week-02.md           <- Week 2: Algorithms & Control Flow
├── practicals.md        <- Lab assignments & project guides
└── exams-grading.md     <- Midterm, final, and grading rubrics
```

### 1. The Master File (`cs101.md`)
```markdown
---
layout: "lesson/single"
title: "CS 101: Introduction to Computer Programming"
slug: "cs101"
code: "CS101"
term: "Fall 2026"
department: "Computer Engineering"
lang: "en"
ref: "lesson-cs101"
instructor: "Prof. Dr. Jane Doe"
credits: "3 Credits (ECTS: 6)"
office_hours: "Tuesdays & Thursdays 14:00 - 16:00"
classroom: "Engineering Building, Lab 3"
---

### Course Description
An introductory course in computational thinking, software design, and problem solving using modern programming languages.
```

### 2. Learning Outcomes (`01-outcomes.md`)
```markdown
---
title: "Learning Outcomes & Competencies"
order: 1
section_type: "outcomes"
---

1. Understand basic computational logic and algorithm development.
2. Implement functional programs utilizing arrays, loops, and conditional structures.
3. Apply structured debugging techniques to resolve runtime and logic errors.
```

### 3. Course Policy & Grading (`02-policy.md`)
```markdown
---
title: "Course Policies & Evaluation"
order: 2
section_type: "policy"
---

- **Attendance:** Minimum 70% attendance is strictly required by university regulations.
- **Grading Breakdown:**
  - Midterm Examination: 30%
  - Laboratory Assignments: 25%
  - Final Project: 15%
  - Final Examination: 30%
- **Academic Integrity:** Plagiarism or unauthorized AI assistance on individual assignments will result in an immediate disciplinary review.
```

### 4. Weekly Modules (`week-01.md`, `week-02.md`, ...)
Each week is its own bite-sized markdown file:

```markdown
---
title: "Week 1"
topic: "Introduction to Computational Thinking"
duty: "Complete Lab 0 setup and submit the environment verification screenshot."
order: 1
section_type: "week"
---

### Lecture Overview
This week we explore the foundations of computer science and algorithm design.

#### Required Readings
- Chapter 1: *Introduction to Algorithms* (Cormen et al.)

#### Lecture Slides & Materials
- [Download Slides (PDF)](/assets/docs/cs101-week01.pdf)
- [Starter Code Repository (GitHub)](https://github.com/janedoe/cs101-lab0)

#### Laboratory Task (Due: Friday 23:59)
1. Install Python 3.12 and VS Code.
2. Execute the verification script and submit your log output via the course portal.
```

### Why Academics Love This:
- Need to reschedule Week 4? Just edit `week-04.md`. You will never accidentally break other weeks or delete course policies!
- Students can browse syllabus weeks using interactive accordion cards and dynamic timetable pills.

---

## 8. Step 7: Publish Essays, Notes & Announcements

Share conference trip reports, field notes, pedagogical commentary, or class announcements using the blog engine (`_posts/`).

Create a file in `_posts/en/` named `YYYY-MM-DD-title.md` (e.g., `2026-10-12-welcoming-new-students.md`):

```markdown
---
layout: "post/single"
title: "Welcoming the Fall 2026 Research Cohort"
date: 2026-10-12
lang: "en"
ref: "post-fall-2026-welcome"
categories: ["Announcements", "Lab News"]
tags: ["Teaching", "Research"]
author: "Jane Doe"
summary: "An overview of our new computational research agenda and welcoming new doctoral candidates."
---

We are thrilled to welcome three new Ph.D. researchers to the Computational Informatics Group this semester...

### Research Focus for 2026/2027
Our lab will investigate three primary themes:
1. Responsible Artificial Intelligence in Higher Education
2. Open Science Metadata Federation
3. Longitudinal Analysis of Scholarly Citation Networks

$$E = mc^2 \quad \text{and} \quad \mathcal{L}_{\text{GNN}} = \sum_{v \in V} \ell(y_v, \hat{y}_v)$$
```
> **LaTeX Support:** You can write inline mathematical formulas using `$formula$` or display equations using `$$formula$$`. KaTeX renders equations instantly without slowing down page load!

---

## 9. Step 8: One-Click Academic Printing (US Academic CV & Course Syllabus)

Academics frequently need to export clean, formal paper documents or PDFs for tenure reviews, accreditation committees, grant applications, or university archives.

Academy has a built-in **Academic Print Engine** (`_sass/_print.scss`). You don't need any special PDF export software:

### 1. Printing Your US Academic CV
1. Open your live website's homepage (`https://yourusername.github.io/` or `/en/`).
2. Press **`Cmd + P`** (Mac) or **`Ctrl + P`** (Windows / Linux) in your browser.
3. **What happens automatically:**
   - Navbars, profile photos, flag switchers, social media buttons, and page footers vanish.
   - The document reformats into standard black-and-white academic serif typography (*Times New Roman*), complete with US Letter/A4 page margins, page numbering, and clean CV headings.
4. Save as PDF or print directly!

### 2. Printing an Official University Course Syllabus
1. Navigate to any course page (e.g., `/en/lessons/cs101/`).
2. Press **`Cmd + P`** or **`Ctrl + P`**.
3. **What happens automatically:**
   - Timetable buttons and navigation bars disappear.
   - All weekly accordion modules (`<details>`) automatically expand so the complete 14-week curriculum, readings, grading rubrics, and competencies print without truncation.
   - Clean tabular course headers (Instructor, Term, Office Hours, Credits) are generated at the top of the syllabus.

---

## 10. Step 9: Bilingual Content (Turkish & English)

Academy was engineered from the ground up for bilingual academic institutions.

### How Pages Are Paired
Every bilingual document pairs with its sibling using the `ref:` front-matter tag:

| Page Type | Turkish File | English File | Shared `ref` |
|:---|:---|:---|:---|
| **Homepage** | `pages/tr/index.md` | `pages/en/index.md` | `ref: "home"` |
| **Contact** | `pages/tr/iletisim.md` | `pages/en/contact.md` | `ref: "contact"` |
| **Publication** | `_publications/tr/2026-yazi.md` | `_publications/en/2026-paper.md`| `ref: "pub-2026-ml"` |
| **Course** | `_lessons/tr/bte311/bte311.md` | `_lessons/en/bte311/bte311.md` | `ref: "lesson-bte311"` |

### The 404 Safety Shield
What if you published a paper in English, but haven't translated it into Turkish yet?
**No problem!** The smart language switcher will never display a broken 404 page. If an exact Turkish translation doesn't exist, it gracefully directs the visitor to the Turkish Publications archive (`/yayinlar/`).

---

## 11. Step 10: Safety First — Checking Your Work with the Built-In Linter

Before announcing your website or pushing changes, you can verify that all your markdown files, dates, and course weeks are 100% error-free:

```bash
python3 scripts/verify_network.py
```

### What It Audits Automatically:
- Validates that every publication has a title, valid date, and recognized entry type.
- Ensures no duplicate DOIs exist across publications.
- Checks that course weeks are properly sequenced (Week 1, Week 2, Week 3...).
- Guarantees that parent courses define `layout: lesson/single`.

If you made a typo (e.g., forgetting a date or writing an invalid order number), the linter will print the exact file name and line number so you can fix it in seconds!

---

## 12. Frequently Asked Questions (FAQ) for Academics

### Q1: Do I have to pay anything to host this website?
**No.** GitHub Pages provides 100% free hosting with unlimited bandwidth, custom domain support, and SSL encryption for open-source repositories.

### Q2: Can I use my university web address (e.g., `janedoe.emu.edu.tr`)?
**Yes.** Go to your repository **Settings > Pages > Custom domain**, type your domain, and add a `CNAME` record in your university's DNS panel.

### Q3: What if I only want to publish in English (or only in Turkish)?
Academy supports single-language operation out of the box. Simply set `default_lang: "en"` (or `"tr"`) in `_config.yml` and keep your content files in that language folder.

### Q4: Can I embed lecture slides, YouTube videos, or PDF links?
**Yes!** Standard Markdown and HTML embeds work everywhere:
```markdown
# Direct PDF Link:
[Download Lecture 1 Slides (PDF)](/assets/docs/lecture01.pdf)

# Embedded YouTube Video:
<iframe width="100%" height="400" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
```

### Q5: How do students download course materials?
You can place PDFs, ZIP archives, or slides inside the `assets/docs/` or `assets/downloads/` folders and link to them directly in your weekly markdown files.

### Q6: Where do I get help if I get stuck?
- Read the troubleshooting playbook in [**`SUPPORT.md`**](./SUPPORT.md).
- Ask a question in the [**GitHub Discussions Forum**](https://github.com/BanaBirSebepVer/Academy/discussions).
- Check the technical blueprint in [**`ARCHITECTURE.md`**](./ARCHITECTURE.md).

---

*Welcome to the open-source academic web. Happy teaching and researching!*
