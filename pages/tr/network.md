---
ref: network
lang: tr
layout: page
title: "Akademik Ağ"
nav_title: "Akademik Ağ"
nav_order: 8
permalink: /ag/
redirect_from:
  - /akademik-ag/
  - /network/
active_nav: network
---

{% assign current_lang = page.lang | default: "tr" %}
{% assign locale = site.data.locales[current_lang] %}
{% assign network_api = site.analytics.endpoint | default: 'https://academy.banabirsebepver.com' | append: '/api/network.php' %}

<div class="fac-page network-page" data-endpoint="{{ network_api }}" data-lang="{{ current_lang }}">
  <div class="archive-page-container">
    <div class="container-fluid">

      <!-- Header Section -->
      <div class="archive-header network-header text-center">
        <h1><i class="fa fa-network-wired"></i> {{ locale.ui.network_title }}</h1>
        <p class="lead">
          {{ locale.ui.network_subtitle }}
        </p>
      </div>

      {% assign version = site.data.version %}
      {% assign behind = version.behind_count | default: 0 %}

      {% assign status_class = "version-status-ok" %}
      {% if behind >= 10 %}
        {% assign status_class = "version-status-danger" %}
      {% elsif behind > 0 %}
        {% assign status_class = "version-status-warn" %}
      {% endif %}

      <!-- Top Row: Call To Action (10/12) on Left & Version Status (2/12) on Right -->
      <div class="network-top-row">
        <!-- Call To Action Card (10/12) -->
        <div class="network-card network-cta-card">
          <div class="network-cta-content">
            <h3 class="network-cta-title">
              <i class="fa fa-code-fork"></i> {{ locale.ui.join_network_title | default: locale.ui.network_cta_title }}
            </h3>
            <p class="network-cta-desc">
              {{ locale.ui.join_network_desc | default: locale.ui.network_cta_desc }}
            </p>
          </div>
          <div class="network-cta-action">
            <a href="https://github.com/BanaBirSebepVer/Academy" target="_blank" rel="noopener noreferrer" class="btn btn-success network-cta-btn">
              <i class="fa fa-github"></i> {{ locale.ui.submit_site_button | default: locale.ui.network_cta_btn }}
            </a>
          </div>
        </div>

        <!-- Version Information Card (2/12) -->
        <div class="network-card version-card {{ status_class }}">
          <div class="version-header">
            <h4 class="version-title">
              <i class="fa fa-code-fork"></i> {{ locale.ui.version_title | default: "Sistem Versiyonu" }}
            </h4>
            <span class="version-status-pill">
              {% if behind >= 10 %}
                Kritik
              {% elsif behind > 0 %}
                Güncelle
              {% else %}
                Güncel
              {% endif %}
            </span>
          </div>
          <div class="version-meta">
            <div class="version-meta-row">
              <span class="version-meta-label">{{ locale.ui.version_release | default: "Sürüm" }}:</span>
              <span class="version-badge-val">{{ version.tag | default: version.latest }}</span>
            </div>
            <div class="version-meta-row">
              <span class="version-meta-label">{{ locale.ui.version_commit | default: "İşleme" }}:</span>
              <code class="version-commit-val">{{ version.commit }}</code>
            </div>
          </div>
          <div class="version-status-text">
            {% if behind >= 10 %}
              <i class="fa fa-exclamation-circle"></i> {{ behind }} geride
            {% elsif behind > 0 %}
              <i class="fa fa-arrow-circle-up"></i> {{ behind }} bekliyor
            {% else %}
              <i class="fa fa-check-circle"></i> Güncel
            {% endif %}
          </div>
        </div>
      </div>

      <!-- Filter & Search Controls Card -->
      <div class="network-controls-card">
        <!-- Live Search Input -->
        <div class="network-search-wrap">
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-search"></i>
            </span>
            <input type="text" id="networkSearchInput" class="form-control network-search-input" placeholder="{{ locale.ui.search_network_placeholder | default: 'İsim, üniversite, alan veya anahtar kelime ile ara...' }}">
          </div>
        </div>

        <!-- 4-Column Dropdown Select Filters -->
        <div class="row network-dropdowns-row">
          <!-- 1. Country Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterCountry" class="network-filter-label">
              <i class="fa fa-globe"></i> {{ locale.ui.filter_by_country | default: 'Ülke' }}
            </label>
            <select id="networkFilterCountry" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_countries | default: 'Tüm Ülkeler' }}</option>
            </select>
          </div>

          <!-- 2. University / Institution Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterInstitution" class="network-filter-label">
              <i class="fa fa-university"></i> {{ locale.ui.filter_by_university | default: 'Üniversite' }}
            </label>
            <select id="networkFilterInstitution" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_universities | default: 'Tüm Üniversiteler' }}</option>
            </select>
          </div>

          <!-- 3. Academic Field Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterField" class="network-filter-label">
              <i class="fa fa-graduation-cap"></i> {{ locale.ui.filter_by_field | default: 'Alan' }}
            </label>
            <select id="networkFilterField" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_fields | default: 'Tüm Alanlar' }}</option>
            </select>
          </div>

          <!-- 4. Keywords Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterKeyword" class="network-filter-label">
              <i class="fa fa-tags"></i> {{ locale.ui.filter_by_keyword | default: 'Anahtar Kelime' }}
            </label>
            <select id="networkFilterKeyword" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_keywords | default: 'Tüm Anahtar Kelimeler' }}</option>
            </select>
          </div>
        </div>

        <!-- Meta Bar: Live Counter & Reset Button -->
        <div class="network-meta-bar">
          <div class="network-counter-wrap">
            <span class="network-counter-badge">
              <span id="networkCurrentCount">0</span> / <span id="networkTotalCount">0</span>
            </span>
            <span>{{ locale.ui.members_count_suffix | default: 'kayıt gösteriliyor' }}</span>
          </div>

          <button id="networkResetFilters" class="btn btn-default network-reset-btn" type="button">
            <i class="fa fa-refresh"></i> {{ locale.ui.reset_filters | default: 'Temizle' }}
          </button>
        </div>
      </div>

      <!-- No Results State -->
      <div id="networkNoResults" class="network-no-results" style="display: none;">
        <div class="network-no-results-panel">
          <i class="fa fa-search-minus icon-empty"></i>
          <h4>{{ locale.ui.no_network_found | default: 'Aramanızla eşleşen kurum veya araştırmacı bulunamadı.' }}</h4>
          <p>{{ locale.ui.no_network_found_sub | default: 'Lütfen farklı bir arama terimi deneyin veya filtreleri temizleyin.' }}</p>
          <button class="btn btn-primary btn-sm network-reset-btn" type="button">
            <i class="fa fa-refresh"></i> {{ locale.ui.clear_filters | default: 'Filtreleri Temizle' }}
          </button>
        </div>
      </div>

      <!-- Network Cards Grid (Dynamically Populated from Database API) -->
      <div class="row network-grid" id="networkGrid">
        <div id="networkLoading" class="network-loading-state text-center" style="padding: 50px 15px; width: 100%;">
          <i class="fa fa-spinner fa-spin fa-2x" style="color: #2563eb; margin-bottom: 12px; display: inline-block;"></i>
          <p class="text-muted" style="margin-bottom: 0;">Akademik ağ üyeleri yükleniyor...</p>
        </div>
      </div>

    </div>
  </div>
</div>
