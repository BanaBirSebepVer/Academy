# Academic Publication Frontmatter Template & Referencing Guide

Bu şablon, **Sosyal Bilimler için APA 7. Baskı (APA 7th Edition)**, **Fen/Mühendislik için IEEE** ve **Oxford** atıf standartları ile tam uyumludur.

Tüm referans alanları tekil yayın sayfasında dinamik olarak görüntülenir, **atıf dizgileri (APA, IEEE, Oxford)** sistem tarafından otomatik olarak oluşturulur ve HTML `<head>` alanında **Google Scholar, Zotero, Mendeley ve Crossref** indeksleyicilerine meta etiketleri olarak sunulur.

> **Önemli Kural:**
> 1. Bir yayında ilgili bilgi mevcut değilse (örneğin sayfa numarası veya DOI yoksa), alanı silmek yerine `pages: ""` veya `doi: ""` şeklinde boş bırakabilirsiniz. Sistem boş alanları otomatik olarak tespit eder ve temiz bir şekilde gizler.
> 2. **Atıf Dizgileri ve BibTeX:** Akademisyenin manuel atıf dizgisi veya BibTeX kodu yazmasına gerek yoktur. Sistem, girilen meta verilerden (yazar, başlık, dergi, yıl, doi vb.) doğrudan dinamik olarak APA, IEEE ve Oxford formatlarında atıf üretir; kopyalama ve önizleme butonlarını otomatik olarak sunar.

---

## 1. Dergi Makalesi Şablonu (Journal Article)

```yaml
---
ref: "2024-ornek-makale"
lang: "tr" # tr veya en
layout: "publication/single"
title: "Makalenin Tam Başlığı: Alt Başlık Varsa İki Noktadan Sonra"
publication_type: "Makale" # veya "Journal Article"
type_label: "Hakemli Makale"

# Yazar(lar)
author: "Can Bekcan"
authors:
  - "Can Bekcan"
  - "İkinci Yazar"

# Dergi Bilgileri
journal: "İletişim Çalışmaları Dergisi"
volume: "12"
issue: "3"
article_number: "" # e10293 gibi makale numarası varsa
pages: "45-68"
issn: "1303-0000"

# Kitap / Konferans / Tez Alanları (Makale için boş bırakılır)
book_title: ""
editors: ""
edition: ""
isbn: ""
conference_name: ""
conference_location: ""
conference_date: ""
degree: ""
institution: ""
faculty: ""
department: ""
advisor: ""

# Yayıncı & Tarih
year: 2024
date: "2024-05-15"
publisher: "Dergi Yayınevi Adı"
publisher_place: "İstanbul"

# Tanımlayıcılar & Erişim
doi: "10.1234/ornek.2024.01"
link: "https://dergipark.org.tr/tr/pub/..."
pdf: "/assets/publications/ornek-makale.pdf"

# Anahtar Kelimeler
keywords:
  - "Dijital Medya"
  - "Yapay Zeka"
  - "Kamuoyu Araştırmaları"

# Görsel & Sıralama
image: "https://.../kapak-gorseli.jpg"
order: 1
---

### Özet / Abstract
Makalenin özet metni buraya yazılır.
```

---

## 2. Kitap Bölümü Şablonu (Book Chapter)

```yaml
---
ref: "2023-ornek-kitap-bolumu"
lang: "tr"
layout: "publication/single"
title: "Kitap Bölümünün Başlığı"
publication_type: "Kitap Bölümü"
type_label: "Kitap Bölümü"

author: "Can Bekcan"
authors:
  - "Can Bekcan"
editors: "Editör Adı Soyadı (Ed.)"

journal: ""
volume: ""
issue: ""
article_number: ""
issn: ""

book_title: "Bölümün Yer Aldığı Kitabın Başlığı"
edition: "1. Baskı"
isbn: "978-605-000-00-0"

conference_name: ""
conference_location: ""
conference_date: ""
degree: ""
institution: ""
faculty: ""
department: ""
advisor: ""

year: 2023
date: "2023-11-20"
publisher: "Akademik Yayınevi"
publisher_place: "Ankara"
pages: "105-132"

doi: ""
link: "https://..."
pdf: ""

keywords:
  - "Siyasal İletişim"
  - "Medya Etiği"

image: "https://..."
order: 2
---
```

---

## 3. Tez Şablonu (Master's Thesis / PhD Dissertation)

```yaml
---
ref: "2017-ethical-issues-in-political-news-coverage"
lang: "tr"
layout: "publication/single"
title: "Tezin Tam Başlığı"
publication_type: "Tez"
type_label: "MA Tez" # veya "Doktora Tezi / PhD"

author: "Can Bekcan"
authors:
  - "Can Bekcan"
editors: ""

journal: ""
volume: ""
issue: ""
article_number: ""
issn: ""

book_title: ""
edition: ""
isbn: ""

conference_name: ""
conference_location: ""
conference_date: ""

degree: "Yüksek Lisans Tezi (Master of Arts - MA)" # veya "Doktora Tezi (PhD)"
institution: "Doğu Akdeniz Üniversitesi"
faculty: "İletişim Fakültesi"
department: "Yeni Medya ve Gazetecilik Lisansüstü Programı"
advisor: "Doç. Dr. Metin Ersoy"

year: 2017
date: "2017-09-01"
publisher: "EMU Press"
publisher_place: "Famagusta"
pages: "1-150"

doi: ""
link: "http://..."
pdf: ""

keywords:
  - "Medya Etiği"
  - "Siyasal İletişim"
  - "Haber Temsili"

image: "https://..."
order: 3
---
```

---

## 4. Konferans Bildirisi Şablonu (Conference Paper / Proceedings)

```yaml
---
ref: "2023-konferans-bildirisi"
lang: "tr"
layout: "publication/single"
title: "Konferansta Sunulan Bildirinin Başlığı"
publication_type: "Bildiri"
type_label: "Uluslararası Bildiri"

author: "Can Bekcan"
authors:
  - "Can Bekcan"
editors: "Konferans Kitabı Editörleri"

journal: ""
volume: ""
issue: ""
article_number: ""
issn: ""

book_title: "Bildiriler Kitabı Adı"
edition: ""
isbn: ""

conference_name: "7. Uluslararası Medya ve Barış Konferansı"
conference_location: "Lefkoşa, KKTC"
conference_date: "12-14 Ekim 2023"

degree: ""
institution: ""
faculty: ""
department: ""
advisor: ""

year: 2023
date: "2023-10-14"
publisher: "Üniversite Basımevi"
publisher_place: "Lefkoşa"
pages: "55-62"

doi: "10.xxxx/..."
link: "https://..."
pdf: ""

keywords:
  - "Barış Gazeteciliği"
  - "Söylem Analizi"

image: "https://..."
order: 4
---
```
