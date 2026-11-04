---
ref: academic
lang: tr
layout: page
title: "Akademik Özgeçmiş"
nav_title: "Akademik"
nav_order: 2
permalink: /akademik/
redirect_from:
  - /tr/akademik/
  - /tr/academic/
active_nav: academic
---

<div class="fac-page academic-archive-page">
  <div class="archive-page-container">
    <div class="container-fluid">

      <!-- Header Section -->
      <div class="archive-header">
        <h1>Academic Portfolio & Research</h1>
        <p>Araştırma alanları, devam eden ve tamamlanan bilimsel projeler, uluslararası konferans bildirileri ve ders müfredatları arşivi.</p>
      </div>

      <!-- Search & Category Filter Controls -->
      <div class="archive-controls">
        <div class="archive-search-box">
          <div class="input-group">
            <span class="input-group-addon" style="background: #fff; border-right: none;">
              <i class="fa fa-search" style="color: #888;"></i>
            </span>
            <input type="text" id="academicSearchInput" class="form-control" placeholder="Araştırma, konferans veya konu ara (örn: Ekonomi Politik, CRCP, Yapay Zeka)..." style="border-left: none;">
          </div>
        </div>

        <div class="archive-filter-pills" id="academicFilterButtons">
          <button class="btn btn-sm btn-primary active archive-filter-btn academic-cat-btn" data-category="all">
            Tüm Akademik Arşiv
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="area">
            <i class="fa fa-compass"></i> Araştırma Alanları
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="research">
            <i class="fa fa-microscope"></i> Araştırma Projeleri
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="conference">
            <i class="fa fa-scroll"></i> Konferanslar
          </button>
          <button class="btn btn-sm btn-default archive-filter-btn academic-cat-btn" data-category="hub">
            <i class="fa fa-graduation-cap"></i> Dersler & Yayınlar
          </button>
        </div>
      </div>

      <!-- Quick Research Areas Pills -->
      <div class="row" style="margin-bottom: 30px;">
        <div class="col-xs-12">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 24px;">
            <h4 style="margin: 0 0 12px; font-size: 15px; font-weight: 700; color: #2d3748; text-transform: uppercase; letter-spacing: 0.5px;">
              <i class="fa fa-tags" style="color: #03cc85; margin-right: 6px;"></i> Temel Araştırma Odakları:
            </h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">İletişimin Ekonomi Politiği</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Medya ve Siyaset</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Medya Etkisi & Algı Yönetimi</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Gazetecilik Etiği</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Alternatif Medya & Yeni Medya</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Hesaplamalı İletişim & Veri Madenciliği</span>
              <span class="label label-default" style="background-color: #fff; color: #333; border: 1px solid #cbd5e0; font-size: 13px; padding: 6px 12px; font-weight: 500;">Yapay Zeka & İletişim Eğitimi</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Academic Archive Cards Grid (Flex Masonry) -->
      <div class="row flex-masonry-grid" id="academicGrid">

        <!-- 1. Hub Card: Lessons Archive -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="hub" data-title="dersler müfredat lisans lisansüstü ders izlenceleri" data-tags="dersler müfredat eğitim izlence ders programı">
          <div class="archive-card" style="border-top: 4px solid #03cc85;">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-success" style="background-color: #03cc85;">Ders Portalı</span>
                <span class="status-badge status-active">Aktif Dönem</span>
              </div>
              <h3 class="archive-card-title">
                <a href="{{ '/lessons/' | relative_url }}">Dersler & Akademik Müfredat</a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-graduation-cap" style="color: #03cc85;"></i> Lisans ve Lisansüstü Ders Programları
              </div>
              <p class="archive-card-desc">
                Doğu Akdeniz Üniversitesi ve diğer kurumlarda verdiğim Veri Gazeteciliği, Sosyal Medya Veri Madenciliği, Video Prodüksiyon ve İletişim Teorileri gibi tüm derslerin haftalık izlenceleri, notları ve proje isterleri.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Haftalık İzlenceler</span>
                <span class="archive-card-tag">Ders Notları</span>
                <span class="archive-card-tag">Notlandırma Kriterleri</span>
              </div>
              <div class="archive-card-footer">
                <a href="{{ '/lessons/' | relative_url }}" class="btn btn-sm btn-success" style="background-color: #03cc85; border-color: #03cc85; font-weight: 600;">
                  Tüm Dersleri İncele &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Hub Card: Publications Archive -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="hub" data-title="yayınlar akademik tez kitap bölümleri makaleler" data-tags="yayınlar makale tez kitap emu press">
          <div class="archive-card" style="border-top: 4px solid #3182ce;">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-info" style="background-color: #3182ce;">Yayın Arşivi</span>
                <span class="status-badge status-active">Bilimsel Yayınlar</span>
              </div>
              <h3 class="archive-card-title">
                <a href="{{ '/publications/' | relative_url }}">Bilimsel Yayınlar & Tezler</a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-book" style="color: #3182ce;"></i> Kitap Bölümleri, Tezler ve Makaleler
              </div>
              <p class="archive-card-desc">
                Hakemli dergilerde yayınlanan makaleler, akademik yüksek lisans tezi, kitap bölümleri ve bilimsel araştırma raporlarının tam metinleri, atıf bilgileri ve PDF dosyaları.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">MA Tez</span>
                <span class="archive-card-tag">Kitap Bölümü</span>
                <span class="archive-card-tag">Hakemli Makale</span>
                <span class="archive-card-tag">BibTeX & APA</span>
              </div>
              <div class="archive-card-footer">
                <a href="{{ '/publications/' | relative_url }}" class="btn btn-sm btn-primary" style="font-weight: 600;">
                  Yayınlar Arşivine Git &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Conference: CRCP 2018 -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="conference" data-title="crcp 2018 5. uluslararası iletişim ve medya çalışmaları konferansı civil disobedience spain bbc trt" data-tags="uluslararası konferans crcp 2018 bbc trt katalonya">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-primary" style="background-color: #805ad5;">Uluslararası Konferans</span>
                <span class="status-badge status-completed">2018 &bull; Gazimağusa</span>
              </div>
              <h3 class="archive-card-title">
                <a href="https://crcp.emu.edu.tr/en/conferences/crcp-2018" target="_blank" rel="noopener noreferrer">
                  Civil Disobedience in Spain: Comparison of BBC’s and TRT’s Representation of Catalan Autonomy
                </a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-scroll" style="color: #03cc85;"></i> 5. Uluslararası İletişim ve Medya Çalışmaları Konferansı (CRCP)
              </div>
              <p class="archive-card-desc">
                Katalonya bağımsızlık referandumu sürecinde BBC ve TRT'nin sivil itaatsizlik eylemlerini nasıl çerçevelediğinin karşılaştırmalı söylem analizi.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Çerçeveleme Kuramı</span>
                <span class="archive-card-tag">Söylem Analizi</span>
                <span class="archive-card-tag">BBC vs TRT</span>
                <span class="archive-card-tag">Katalonya</span>
              </div>
              <div class="archive-card-footer">
                <a href="https://crcp.emu.edu.tr/en/conferences/crcp-2018" target="_blank" rel="noopener noreferrer" class="btn btn-xs btn-default" style="font-weight: 600;">
                  Konferans Detayları <i class="fa fa-external-link"></i>
                </a>
                <a href="{{ '/publications/2019-civil-disobedience-in-spain/' | relative_url }}" class="btn btn-xs btn-success" style="background-color: #03cc85; border-color: #03cc85; font-weight: 600;">
                  Bildiriyi Oku &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Research Project: KKTC Basın Sahiplik Yapısı -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="research" data-title="kktc basın sahiplik yapısı kıbrıs medyası mülkiyet sermaye" data-tags="devam eden araştırma kktc basın sahipliği sermaye ağları">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-warning" style="background-color: #dd6b20;">Bilimsel Araştırma</span>
                <span class="status-badge status-active"><i class="fa fa-spinner fa-spin" style="font-size: 10px;"></i> Devam Ediyor</span>
              </div>
              <h3 class="archive-card-title">
                <a href="{{ '/post/2022/01/02/kuzey-kibris-basinindaki-sahiplik-yapisinin-sorunsal-durumu/' | relative_url }}">
                  Kuzey Kıbrıs Basınındaki Sahiplik Yapısının Sorunsal Durumu
                </a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-sitemap" style="color: #03cc85;"></i> İletişimin Ekonomi Politiği Araştırma Grubu
              </div>
              <p class="archive-card-desc">
                Kıbrıs Türk basınındaki sermaye yoğunlaşması, medya sahiplerinin diğer sektörlerle çıkar ilişkileri ve bunun haber üretim süreçleri ile gazetecilik bağımsızlığı üzerindeki etkilerinin analizi.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Kıbrıs Basını</span>
                <span class="archive-card-tag">Ekonomi Politik</span>
                <span class="archive-card-tag">Medya Bağımsızlığı</span>
                <span class="archive-card-tag">Sahiplik Yapısı</span>
              </div>
              <div class="archive-card-footer">
                <a href="{{ '/post/2022/01/02/kuzey-kibris-basinindaki-sahiplik-yapisinin-sorunsal-durumu/' | relative_url }}" class="btn btn-xs btn-default" style="font-weight: 600;">
                  Araştırma Raporunu İncele &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Research Project: MA Thesis -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="research" data-title="ethical issues in political news coverage 2015 general elections turkey politik haberlerde etik" data-tags="yüksek lisans tezi gazetecilik etiği 2015 seçimleri emu press">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-success" style="background-color: #03cc85;">Yüksek Lisans Tezi</span>
                <span class="status-badge status-completed">2017 &bull; EMU Press</span>
              </div>
              <h3 class="archive-card-title">
                <a href="{{ '/publications/2017-ethical-issues-in-political-news-coverage/' | relative_url }}">
                  Ethical Issues in Political News Coverage: A Case Study of 2015 General Elections in Turkey
                </a>
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-graduation-cap" style="color: #03cc85;"></i> Danışman: Doğu Akdeniz Üniversitesi İletişim Fakültesi
              </div>
              <p class="archive-card-desc">
                2015 Türkiye Genel Seçimleri sürecinde ulusal gazetelerin siyasi haber kapsamalarındaki etik ihlalleri, tarafsızlık, doğruluk ve nefret söylemi kriterleri üzerinden inceleyen kapsamlı durum çalışması.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Gazetecilik Etiği</span>
                <span class="archive-card-tag">Seçim Haberciliği</span>
                <span class="archive-card-tag">İçerik Analizi</span>
                <span class="archive-card-tag">EMU Press</span>
              </div>
              <div class="archive-card-footer">
                <a href="{{ '/publications/2017-ethical-issues-in-political-news-coverage/' | relative_url }}" class="btn btn-xs btn-success" style="background-color: #03cc85; border-color: #03cc85; font-weight: 600;">
                  Tez Sayfasını Görüntüle &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. Research Area: AI & Computational Journalism -->
        <div class="col-md-6 col-sm-12 archive-card-col academic-card-item flex-masonry-item" data-category="area" data-title="hesaplamalı gazetecilik yapay zeka büyük veri sosyal medya madenciliği" data-tags="hesaplamalı gazetecilik yapay zeka veri madenciliği algoritma">
          <div class="archive-card">
            <div class="archive-card-body">
              <div class="archive-card-meta">
                <span class="label label-info" style="background-color: #319795;">Araştırma Alanı</span>
                <span class="status-badge status-active">Aktif Alan</span>
              </div>
              <h3 class="archive-card-title">
                Hesaplamalı Gazetecilik & Algoritmik Etik
              </h3>
              <div class="archive-card-subtitle">
                <i class="fa fa-laptop-code" style="color: #03cc85;"></i> Yeni Medya & Yapay Zeka Entegrasyonu
              </div>
              <p class="archive-card-desc">
                Üretken yapay zeka modellerinin (LLM), haber odalarında ve iletişim eğitimindeki rolü, sosyal medya algoritmalarının kamuoyu oluşumuna etkisi ve algoritmik şeffaflık ilkeleri.
              </p>
              <div class="archive-card-tags">
                <span class="archive-card-tag">Üretken Yapay Zeka</span>
                <span class="archive-card-tag">Veri Gazeteciliği</span>
                <span class="archive-card-tag">Algoritmik Önyargı</span>
                <span class="archive-card-tag">Prompt Mühendisliği</span>
              </div>
              <div class="archive-card-footer">
                <a href="mailto:can@canbekcan.com" class="btn btn-xs btn-default" style="font-weight: 600;">
                  İş Birliği İletişimi <i class="fa fa-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- No Matches Alert -->
      <div id="noAcademicMatch" class="archive-no-match">
        <i class="fa fa-university"></i>
        <h4>Aramanıza uygun akademik içerik bulunamadı.</h4>
        <p>Lütfen farklı bir arama terimi deneyin veya filtreleri temizleyin.</p>
      </div>

    </div>
  </div>
</div>
