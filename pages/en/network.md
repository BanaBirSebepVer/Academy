---
ref: network
lang: en
layout: page
title: "Academic Network"
nav_title: "Network"
nav_order: 8
permalink: /en/network/
redirect_from:
  - /network/
active_nav: network
---

{% assign current_lang = page.lang | default: "en" %}
{% assign locale = site.data.locales[current_lang] %}

{% assign countries_str = "" %}
{% assign institutions_str = "" %}
{% assign fields_str = "" %}
{% assign keywords_str = "" %}

{% for node in site.data.academic_network %}
  {% if node.country and node.country != "" %}
    {% assign countries_str = countries_str | append: node.country | append: "|||" %}
  {% endif %}
  {% if node.institution and node.institution != "" %}
    {% assign institutions_str = institutions_str | append: node.institution | append: "|||" %}
  {% endif %}
  {% if node.fields and node.fields != "" %}
    {% assign fields_str = fields_str | append: node.fields | append: "|||" %}
  {% endif %}
  {% if node.keywords %}
    {% for kw in node.keywords %}
      {% if kw and kw != "" %}
        {% assign keywords_str = keywords_str | append: kw | append: "|||" %}
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}

{% assign raw_countries = countries_str | split: "|||" | sort %}
{% assign unique_countries = "" | split: "" %}
{% for c in raw_countries %}
  {% if c != "" and unique_countries contains c %}{% else %}{% if c != "" %}{% assign unique_countries = unique_countries | push: c %}{% endif %}{% endif %}
{% endfor %}

{% assign raw_institutions = institutions_str | split: "|||" | sort %}
{% assign unique_institutions = "" | split: "" %}
{% for i in raw_institutions %}
  {% if i != "" and unique_institutions contains i %}{% else %}{% if i != "" %}{% assign unique_institutions = unique_institutions | push: i %}{% endif %}{% endif %}
{% endfor %}

{% assign raw_fields = fields_str | split: "|||" | sort %}
{% assign unique_fields = "" | split: "" %}
{% for f in raw_fields %}
  {% if f != "" and unique_fields contains f %}{% else %}{% if f != "" %}{% assign unique_fields = unique_fields | push: f %}{% endif %}{% endif %}
{% endfor %}

{% assign raw_keywords = keywords_str | split: "|||" | sort %}
{% assign unique_keywords = "" | split: "" %}
{% for k in raw_keywords %}
  {% if k != "" and unique_keywords contains k %}{% else %}{% if k != "" %}{% assign unique_keywords = unique_keywords | push: k %}{% endif %}{% endif %}
{% endfor %}

<div class="fac-page network-page">
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
            <a href="https://github.com/BanaBirSebepVer/Academy/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" class="btn btn-success network-cta-btn">
              <i class="fa fa-github"></i> {{ locale.ui.submit_site_button | default: locale.ui.network_cta_btn }}
            </a>
          </div>
        </div>

        <!-- Version Information Card (2/12) -->
        <div class="network-card version-card {{ status_class }}">
          <div class="version-header">
            <h4 class="version-title">
              <i class="fa fa-code-fork"></i> {{ locale.ui.version_title | default: "Engine Version" }}
            </h4>
            <span class="version-status-pill">
              {% if behind >= 10 %}
                Critical
              {% elsif behind > 0 %}
                Update
              {% else %}
                Up to date
              {% endif %}
            </span>
          </div>
          <div class="version-meta">
            <div class="version-meta-row">
              <span class="version-meta-label">{{ locale.ui.version_release | default: "Release" }}:</span>
              <span class="version-badge-val">{{ version.tag | default: version.commit }}</span>
            </div>
            <div class="version-meta-row">
              <span class="version-meta-label">{{ locale.ui.version_commit | default: "Commit" }}:</span>
              <code class="version-commit-val">{{ version.commit }}</code>
            </div>
          </div>
          <div class="version-status-text">
            {% if behind >= 10 %}
              <i class="fa fa-exclamation-circle"></i> {{ behind }} behind
            {% elsif behind > 0 %}
              <i class="fa fa-arrow-circle-up"></i> {{ behind }} pending
            {% else %}
              <i class="fa fa-check-circle"></i> Up to date
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
            <input type="text" id="networkSearchInput" class="form-control network-search-input" placeholder="{{ locale.ui.search_network_placeholder | default: 'Search by name, university, field, or keywords...' }}">
          </div>
        </div>

        <!-- 4-Column Dropdown Select Filters -->
        <div class="row network-dropdowns-row">
          <!-- 1. Country Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterCountry" class="network-filter-label">
              <i class="fa fa-globe"></i> {{ locale.ui.filter_by_country | default: 'Country' }}
            </label>
            <select id="networkFilterCountry" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_countries | default: 'All Countries' }}</option>
              {% for c in unique_countries %}
              <option value="{{ c | downcase | escape }}">{{ c }}</option>
              {% endfor %}
            </select>
          </div>

          <!-- 2. University / Institution Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterInstitution" class="network-filter-label">
              <i class="fa fa-university"></i> {{ locale.ui.filter_by_university | default: 'University' }}
            </label>
            <select id="networkFilterInstitution" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_universities | default: 'All Universities' }}</option>
              {% for inst in unique_institutions %}
              <option value="{{ inst | downcase | escape }}">{{ inst }}</option>
              {% endfor %}
            </select>
          </div>

          <!-- 3. Academic Field Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterField" class="network-filter-label">
              <i class="fa fa-graduation-cap"></i> {{ locale.ui.filter_by_field | default: 'Field' }}
            </label>
            <select id="networkFilterField" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_fields | default: 'All Fields' }}</option>
              {% for fld in unique_fields %}
              <option value="{{ fld | downcase | escape }}">{{ fld }}</option>
              {% endfor %}
            </select>
          </div>

          <!-- 4. Keywords Filter -->
          <div class="col-md-3 col-sm-6 col-xs-12 network-dropdown-col">
            <label for="networkFilterKeyword" class="network-filter-label">
              <i class="fa fa-tags"></i> {{ locale.ui.filter_by_keyword | default: 'Keyword' }}
            </label>
            <select id="networkFilterKeyword" class="form-control network-filter-select">
              <option value="all">{{ locale.ui.all_keywords | default: 'All Keywords' }}</option>
              {% for kw in unique_keywords %}
              <option value="{{ kw | downcase | escape }}">{{ kw }}</option>
              {% endfor %}
            </select>
          </div>
        </div>

        <!-- Meta Bar: Live Counter & Reset Button -->
        <div class="network-meta-bar">
          <div class="network-counter-wrap">
            <span class="network-counter-badge">
              <span id="networkCurrentCount">{{ site.data.academic_network.size }}</span> / <span id="networkTotalCount">{{ site.data.academic_network.size }}</span>
            </span>
            <span>{{ locale.ui.members_count_suffix | default: 'entries displayed' }}</span>
          </div>

          <button id="networkResetFilters" class="btn btn-default network-reset-btn" type="button">
            <i class="fa fa-refresh"></i> {{ locale.ui.reset_filters | default: 'Reset' }}
          </button>
        </div>
      </div>

      <!-- No Results State -->
      <div id="networkNoResults" class="network-no-results">
        <div class="network-no-results-panel">
          <i class="fa fa-search-minus icon-empty"></i>
          <h4>{{ locale.ui.no_network_found | default: 'No institutions or researchers matched your search.' }}</h4>
          <p>{{ locale.ui.no_network_found_sub | default: 'Please try another search keyword or reset the dropdown filters.' }}</p>
          <button class="btn btn-primary btn-sm network-reset-btn" type="button">
            <i class="fa fa-refresh"></i> {{ locale.ui.clear_filters | default: 'Clear Filters' }}
          </button>
        </div>
      </div>

      <!-- Network Cards Grid -->
      <div class="row network-grid">
        {% for item in site.data.academic_network %}
        {% assign node = item %}
        <div class="col-md-4 col-sm-6 col-xs-12 network-card-col"
             data-country="{{ item.country | downcase | escape }}"
             data-country-raw="{{ item.country | escape }}"
             data-institution="{{ item.institution | downcase | escape }}"
             data-institution-raw="{{ item.institution | escape }}"
             data-fields="{{ item.fields | downcase | escape }}"
             data-fields-raw="{{ item.fields | escape }}"
             data-keywords="{{ item.keywords | join: ',' | downcase | escape }}"
             data-keywords-raw="{{ item.keywords | join: ',' | escape }}"
             data-search="{{ item.name }} {{ item.institution }} {{ item.faculty }} {{ item.fields }} {{ item.keywords | join: ' ' }} {{ item.country }} {{ item.url | replace: 'https://', '' | replace: 'http://', '' }}">
          <a href="{{ item.url }}" target="_blank" rel="noopener noreferrer" class="network-compact-card" itemscope itemtype="https://schema.org/Person">
            <div class="network-compact-avatar">
              {% assign node_avatar = item.avatar %}
              {% if node_avatar == nil or node_avatar == "" %}
                {% assign node_avatar = "/assets/images/default-avatar.svg" | relative_url %}
              {% endif %}
              <img src="{{ node_avatar }}" onerror="this.onerror=null;this.src='{{ '/assets/images/default-avatar.svg' | relative_url }}';" alt="{{ item.name | default: item.institution }}" itemprop="image">
            </div>
            <div class="network-compact-info">
              <h4 class="network-compact-name" itemprop="name">{{ item.name | default: item.institution }}</h4>
              <p class="network-compact-inst" itemprop="worksFor">{{ item.institution }}</p>
            </div>

            <!-- Hidden for Visual UI, Preserved for SEO & Filters -->
            <div class="network-hidden-seo">
              {% if item.faculty %}<span itemprop="department">{{ item.faculty }}</span>{% endif %}
              {% if item.fields %}<span itemprop="knowsAbout">{{ item.fields }}</span>{% endif %}
              {% if item.country %}<span itemprop="addressCountry">{{ item.country }}</span>{% endif %}
              {% if item.keywords %}<span itemprop="keywords">{{ item.keywords | join: ", " }}</span>{% endif %}
              <link itemprop="url" href="{{ item.url }}">
            </div>
          </a>
        </div>
        {% endfor %}
      </div>

    </div>
  </div>
</div>
