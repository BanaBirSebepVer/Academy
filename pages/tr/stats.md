---
ref: stats
lang: tr
layout: default
title: "Site İstatistikleri"
nav_title: "İstatistik"
nav_order: 7
active_nav: stats
permalink: /istatistik/
redirect_from:
  - /stats/
  - /tr/stats/
  - /tr/istatistik/
description: "Şeffaf, açık kaynaklı ziyaretçi ve sayfa görüntüleme istatistikleri."
---

{% assign analytics_endpoint = site.analytics.endpoint | default: "https://academy.banabirsebepver.com" %}
{% assign analytics_dashboard = site.analytics.dashboard_url | default: analytics_endpoint %}

<div class="fac-page stats-page">
  <div class="archive-page-container">
    <div class="container-fluid" style="max-width: 1200px; margin: 0 auto; padding: 25px 15px;">

      {% if site.analytics.enabled == false %}
      <div class="alert alert-info" style="margin: 40px auto; max-width: 600px; padding: 30px; border-radius: 8px; text-align: center; background-color: #f8f9fa; border: 1px solid #d1d5db; color: #374151;">
        <i class="fa fa-info-circle fa-3x" style="margin-bottom: 15px; display: block; color: #2563eb;"></i>
        <h3 style="margin-top: 0; font-size: 20px; font-weight: 600; color: #111827;">Analytics are currently disabled for this site.</h3>
        <p style="margin-bottom: 0; font-size: 14px; color: #6b7280;">
          Bu web sitesi için ziyaretçi istatistikleri devre dışı bırakılmıştır.
        </p>
      </div>
      {% else %}
      <div class="page-header" style="border-bottom: 1px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 25px;">
        <h1 style="margin-top: 0; font-size: 28px; font-weight: 700; color: #111827;">
          <i class="fa fa-line-chart" style="color: #2563eb; margin-right: 8px;"></i>{{ page.title }}
        </h1>
        <p style="margin-bottom: 0; font-size: 14px; color: #6b7280;">
          <a href="{{ analytics_dashboard }}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">academy.banabirsebepver.com</a> tarafından sunulan şeffaf ve açık kaynaklı ziyaretçi istatistikleri.
        </p>
      </div>

      <div class="stats-embed-wrapper" style="position: relative; width: 100%; min-height: 800px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
        <iframe
          src="{{ analytics_dashboard }}"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
          loading="lazy"
          title="{{ page.title }}">
        </iframe>
      </div>
      {% endif %}

    </div>
  </div>
</div>
