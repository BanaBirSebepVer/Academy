---
ref: academic
lang: en
layout: page
title: "Academic Curriculum Vitae"
nav_title: "Academic"
nav_order: 2
permalink: /en/academic/
redirect_from:
  - /academic/
active_nav: academic
---

<div class="fac-page academic-archive-page">
  <div class="archive-page-container">
    <div class="container-fluid">

      <!-- Header Section -->
      <div class="archive-header">
        <h1>Academic Portfolio & Research</h1>
        <p>Archive of research areas, ongoing and completed scientific projects, international conference proceedings, and course curricula.</p>
      </div>

      <!-- Search & Category Filter Controls -->
      <div class="archive-controls">
        <div class="archive-search-box">
          <div class="input-group">
            <span class="input-group-addon" style="background: #fff; border-right: none;">
              <i class="fa fa-search" style="color: #888;"></i>
            </span>
            <input type="text" id="academicSearchInput" class="form-control" placeholder="Search research, conferences, or topics (e.g. Political Economy, CRCP, Artificial Intelligence)..." style="border-left: none;">
          </div>
        </div>

        <div class="archive-filter-pills" id="academicFilterButtons">
          <button class="btn btn-sm btn-primary active archive-filter-btn academic-cat-btn" data-category="all">
            All Academic Archive
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="area">
            <i class="fa fa-compass"></i> Research Areas
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="research">
            <i class="fa fa-microscope"></i> Research Projects
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="conference">
            <i class="fa fa-scroll"></i> Conferences
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="hub">
            <i class="fa fa-graduation-cap"></i> Courses & Publications
          </button>
        </div>
      </div>

      <!-- Quick Research Areas Pills -->
      <div class="row" style="margin-bottom: 30px;">
        <div class="col-xs-12">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 24px;">
            <h4 style="margin: 0 0 12px; font-size: 15px; font-weight: 700; color: #2d3748; text-transform: uppercase; letter-spacing: 0.5px;">
              <i class="fa fa-tags" style="color: #03cc85; margin-right: 6px;"></i> Core Research Focus:
            </h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Political Economy of Communication</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Media & Politics</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Media Effects & Perception Management</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Journalism Ethics</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Alternative & New Media</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Computational Communication & Data Mining</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Artificial Intelligence & Communication Education</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Academic Archive Cards Grid (Flex Masonry) -->
      <div class="row flex-masonry-grid" id="academicGrid">

        <!-- 1. Hub Card: Lessons Archive -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="hub" data-title="courses lessons curriculum syllabus undergraduate graduate" data-tags="courses lessons curriculum syllabus higher education">
          <div class="archive-card" style="border-top: 4px solid #03cc85;">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-success" style="background-color: #03cc85;">Courses Portal</span>
                <span class="status-badge status-active">Active Semester</span>
              </div>
              <h3 class="archive-card-title">
                <a href="{{ '/en/lessons/' | relative_url }}">Taught Courses & Academic Syllabi</a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-graduation-cap" style="color: #03cc85;"></i> Undergraduate & Graduate Course Curricula
              </div>
              <p class="archive-card-desc">
                Weekly syllabi, lecture notes, and evaluation requirements for courses taught at Eastern Mediterranean University and other institutions, including Data Journalism, Social Media Data Mining, Video Production, and Communication Theories.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Weekly Syllabi</span>
                <span class="archive-card-tag">Lecture Notes</span>
                <span class="archive-card-tag">Grading Criteria</span>
              </div>
              <div class="archive-card-footer">
                <a href="{{ '/en/lessons/' | relative_url }}" class="btn btn-sm btn-success" style="background-color: #03cc85; border-color: #03cc85; font-weight: 600;">
                  Explore All Courses &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Hub Card: Publications Archive -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="hub" data-title="publications academic thesis book chapters journal articles" data-tags="publications articles thesis books emu press">
          <div class="archive-card" style="border-top: 4px solid #3182ce;">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-info" style="background-color: #3182ce;">Publications Archive</span>
                <span class="status-badge status-active">Scientific Research</span>
              </div>
              <h3 class="archive-card-title">
                <a href="{{ '/en/publications/' | relative_url }}">Scientific Publications & Theses</a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-book" style="color: #3182ce;"></i> Book Chapters, Master's Theses, and Articles
              </div>
              <p class="archive-card-desc">
                Full-text articles published in peer-reviewed journals, master's theses, book chapters, and scientific research reports, complete with citations, abstracts, and direct download links.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">MA Thesis</span>
                <span class="archive-card-tag">Book Chapter</span>
                <span class="archive-card-tag">Peer-Reviewed Article</span>
                <span class="archive-card-tag">BibTeX & APA</span>
              </div>
              <div class="archive-card-footer">
                <a href="{{ '/en/publications/' | relative_url }}" class="btn btn-sm btn-primary" style="font-weight: 600;">
                  Go to Publications Archive &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Conference: CRCP 2018 -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="conference" data-title="crcp 2018 5th international conference in communication and media studies civil disobedience spain bbc trt catalan autonomy" data-tags="international conference crcp 2018 bbc trt catalonia">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-primary" style="background-color: #805ad5;">International Conference</span>
                <span class="status-badge status-completed">2018 &bull; Famagusta</span>
              </div>
              <h3 class="archive-card-title">
                <a href="https://crcp.emu.edu.tr/en/conferences/crcp-2018" target="_blank" rel="noopener noreferrer">
                  Civil Disobedience in Spain: Comparison of BBC’s and TRT’s Representation of Catalan Autonomy
                </a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-scroll" style="color: #03cc85;"></i> 5th International Conference in Communication and Media Studies (CRCP)
              </div>
              <p class="archive-card-desc">
                A comparative discourse analysis of how BBC and TRT framed civil disobedience protests and citizen mobilization during the Catalan autonomy referendum.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Framing Theory</span>
                <span class="archive-card-tag">Discourse Analysis</span>
                <span class="archive-card-tag">BBC vs TRT</span>
                <span class="archive-card-tag">Catalonia</span>
              </div>
              <div class="archive-card-footer">
                <a href="https://crcp.emu.edu.tr/en/conferences/crcp-2018" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-default" style="font-weight: 600;">
                  Conference Details <i class="fa fa-external-link"></i>
                </a>
                <a href="{{ '/en/publications/2019-civil-disobedience-in-spain/' | relative_url }}" class="btn btn-xs btn-success" style="background-color: #03cc85; border-color: #03cc85; font-weight: 600;">
                  Read Paper &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Research Project: Press Ownership Structure -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="research" data-title="media ownership structure north cyprus press political economy capital networks" data-tags="ongoing research north cyprus press ownership capital networks">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-warning" style="background-color: #dd6b20;">Scientific Research</span>
                <span class="status-badge status-active"><i class="fa fa-spinner fa-spin" style="font-size: 10px;"></i> Ongoing</span>
              </div>
              <h3 class="archive-card-title">
                <a href="https://example.edu/research/media-ownership" target="_blank" rel="noopener noreferrer">
                  Media Ownership Structure in North Cyprus
                </a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-sitemap" style="color: #03cc85;"></i> Political Economy of Communication Research Group
              </div>
              <p class="archive-card-desc">
                An investigation into capital concentration in the Turkish Cypriot press, commercial interlocks of media owners, and their direct influence on news production processes and journalistic autonomy.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Cyprus Press</span>
                <span class="archive-card-tag">Political Economy</span>
                <span class="archive-card-tag">Media Autonomy</span>
                <span class="archive-card-tag">Ownership Structure</span>
              </div>
              <div class="archive-card-footer">
                <a href="https://example.edu/research/media-ownership" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-default" style="font-weight: 600;">
                  Explore Research Report &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Research Project: MA Thesis -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="research" data-title="ethical issues in political news coverage 2015 general elections turkey political journalism ethics" data-tags="masters thesis journalism ethics 2015 elections emu press">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-success" style="background-color: #03cc85;">Master's Thesis</span>
                <span class="status-badge status-completed">2017 &bull; EMU Press</span>
              </div>
              <h3 class="archive-card-title">
                <a href="{{ '/en/publications/2017-ethical-issues-in-political-news-coverage/' | relative_url }}">
                  Ethical Issues in Political News Coverage: A Case Study of 2015 General Elections in Turkey
                </a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-graduation-cap" style="color: #03cc85;"></i> Supervised at Eastern Mediterranean University Faculty of Communication
              </div>
              <p class="archive-card-desc">
                A comprehensive case study examining ethical violations, impartiality, accuracy, and hate speech across Turkish national daily newspapers during the 2015 General Elections.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Journalism Ethics</span>
                <span class="archive-card-tag">Election Coverage</span>
                <span class="archive-card-tag">Content Analysis</span>
                <span class="archive-card-tag">EMU Press</span>
              </div>
              <div class="archive-card-footer">
                <a href="{{ '/en/publications/2017-ethical-issues-in-political-news-coverage/' | relative_url }}" class="btn btn-xs btn-success" style="background-color: #03cc85; border-color: #03cc85; font-weight: 600;">
                  View Thesis Page &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Research Area: AI & Computational Journalism -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="area" data-title="computational journalism artificial intelligence big data social media data mining algorithms" data-tags="computational journalism artificial intelligence data mining algorithm">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-info" style="background-color: #319795;">Research Area</span>
                <span class="status-badge status-active">Active Field</span>
              </div>
              <h3 class="archive-card-title">
                Computational Journalism & Algorithmic Ethics
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-laptop-code" style="color: #03cc85;"></i> New Media & Artificial Intelligence Integration
              </div>
              <p class="archive-card-desc">
                Investigating the adoption of generative AI models (LLMs) in contemporary newsrooms and higher education, the impact of platform algorithms on public discourse, and ethical frameworks for algorithmic accountability.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Generative AI</span>
                <span class="archive-card-tag">Data Journalism</span>
                <span class="archive-card-tag">Algorithmic Bias</span>
                <span class="archive-card-tag">Prompt Engineering</span>
              </div>
              <div class="archive-card-footer">
                <a href="mailto:academician@example.edu" class="btn btn-xs btn-default" style="font-weight: 600;">
                  Collaborate via Email <i class="fa fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- No Matches Alert -->
      <div id="noAcademicMatch" class="archive-no-match">
        <i class="fa fa-university"></i>
        <h4>No academic content matched your search.</h4>
        <p>Please try another search term or clear the active filters.</p>
      </div>

    </div>
  </div>
</div>
