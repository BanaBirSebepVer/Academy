/**
 * Academy Academic Engine - Unified JavaScript Bundle
 * Generated automatically by scripts/bundle_js.py
 * DO NOT EDIT DIRECTLY. Edit individual modules under assets/js/modules/
 */

// =============================================================================
// Module: navigation.js
// =============================================================================
(function () {
  /**
   * Navigation Module
   * Handles mobile drawer toggle, overlay dismiss, and submenu accordion behavior
   */

  function initNavigation() {
    const $ = window.jQuery || window.$;
    if (!$) return;

    const $sidebar = $('#sidebar');
    const $main = $('#main');
    const $overlay = $('#overlay');
    const $mobileToggle = $('a.mobilemenu');

    // Mobile menu drawer toggle
    $mobileToggle.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      $sidebar.toggleClass('sidebar-open');
      $main.toggleClass('sideIn');
      $overlay.toggleClass('active');
    });

    // Dismiss drawer when clicking on the dark backdrop
    $overlay.on('click', function () {
      $sidebar.removeClass('sidebar-open');
      $main.removeClass('sideIn');
      $overlay.removeClass('active');
    });

    // Submenu toggle for expandable menu items
    $('#navigation li.menu-item-has-children > span.submenu-trigger').on('click', function (e) {
      e.preventDefault();
      const $parent = $(this).parent();
      $parent.toggleClass('open');
      $parent.find('> ul.sub-menu').slideToggle(200);
    });

    // Ensure active submenu remains expanded on load
    $('#navigation li.menu-item-has-children.open > ul.sub-menu').show();

    // Close mobile drawer when clicking a link on mobile screens
    if ($(window).width() <= 991) {
      $('#navigation a').on('click', function () {
        if (!$(this).parent().hasClass('menu-item-has-children')) {
          $sidebar.removeClass('sidebar-open');
          $main.removeClass('sideIn');
          $overlay.removeClass('active');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();

// =============================================================================
// Module: scroll.js
// =============================================================================
(function () {
  /**
   * Smooth Scrolling Module
   * Handles smooth scrolling for in-page anchor navigation with offset calculation
   */

  function initSmoothScroll() {
    const $ = window.jQuery || window.$;
    if (!$) return;

    $('a[href*="#"]:not([href="#"]):not([href="#sidebar"])').on('click', function () {
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        const target = $(this.hash).length ? $(this.hash) : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate(
            {
              scrollTop: target.offset().top - 30
            },
            600
          );
          return false;
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
  } else {
    initSmoothScroll();
  }
})();

// =============================================================================
// Module: accordion.js
// =============================================================================
(function () {
  /**
   * Accordion Module
   * Handles conference presentations accordion toggle animation
   */

  function initAccordion() {
    const accordionHeadings = document.querySelectorAll('.cv-accordion .panel-heading');
    if (!accordionHeadings.length) return;

    accordionHeadings.forEach(function (heading) {
      heading.addEventListener('click', function () {
        const icon = this.querySelector('i.fa');
        const useEl = this.querySelector('svg.icon use');
        const collapse = this.nextElementSibling;
        if (!collapse) return;

        setTimeout(function () {
          const isOpen = collapse.classList.contains('in');
          if (useEl) {
            useEl.setAttribute('href', isOpen ? '#icon-chevron-up' : '#icon-chevron-down');
          }
          if (icon) {
            if (isOpen) {
              icon.classList.remove('fa-chevron-down');
              icon.classList.add('fa-chevron-up');
            } else {
              icon.classList.remove('fa-chevron-up');
              icon.classList.add('fa-chevron-down');
            }
          }
        }, 150);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    initAccordion();
  }
})();

// =============================================================================
// Module: timeline.js
// =============================================================================
(function () {
  /**
   * Timeline Module
   * Handles expand/collapse toggling for academic timeline entries
   */

  function initTimeline() {
    const $ = window.jQuery || window.$;
    if (!$) return;

    const $timeline = $('ul.timeline');
    if (!$timeline.length) return;

    // Open first item by default if none is open
    if (!$timeline.find('li.open').length) {
      $timeline.children().first().addClass('open').find('.text').slideDown(200);
    }

    // Toggle on subject click
    $timeline.on('click', 'li .data .subject', function (e) {
      e.preventDefault();
      const $item = $(this).closest('li');
      $item.toggleClass('open');
      $item.find('.text').slideToggle(250);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeline);
  } else {
    initTimeline();
  }
})();

// =============================================================================
// Module: citation/apa.js
// =============================================================================
(function () {
  /**
   * APA 7th Edition Citation Generator
   * Standard for Social Sciences (Psychology, Education, Media & Communication, Sociology, Economics)
   */

  function formatAuthorApa(name) {
    if (!name) return '';
    name = name.trim();
    if (!name) return '';

    // Already formatted as "Lastname, F." or "Lastname, F. M."
    if (name.includes(',')) return name;

    const parts = name.split(/\s+/);
    if (parts.length === 1) return parts[0];

    const lastName = parts.pop();
    const initials = parts.map(p => p[0].toUpperCase() + '.').join(' ');
    return `${lastName}, ${initials}`;
  }

  function formatAuthorsListApa(authors) {
    if (!authors) return '';
    let list = [];
    if (Array.isArray(authors)) {
      list = authors.map(formatAuthorApa).filter(Boolean);
    } else if (typeof authors === 'string') {
      // If separated by and, &, or comma
      const splitAuthors = authors.split(/\s+(?:and|&)\s+|;\s*/i);
      list = splitAuthors.map(formatAuthorApa).filter(Boolean);
    }

    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]}, & ${list[1]}`;
    return `${list.slice(0, -1).join(', ')}, & ${list[list.length - 1]}`;
  }

  function formatApa(meta) {
    const authorStr = formatAuthorsListApa(meta.authors || meta.author);
    const year = meta.year || (meta.date ? meta.date.split('-')[0] : '');
    const title = meta.title ? meta.title.trim().replace(/\.$/, '') : '';
    const type = (meta.publication_type || '').toLowerCase();

    const parts = [];

    // 1. Author and Year
    if (authorStr && year) {
      parts.push(`${authorStr} (${year}).`);
    } else if (authorStr) {
      parts.push(`${authorStr}.`);
    } else if (year) {
      parts.push(`(${year}).`);
    }

    // 2. Body based on Publication Type
    if (type.includes('tez') || type.includes('thesis') || type.includes('dissertation')) {
      // Thesis / Dissertation
      const degree = meta.degree || "Master's thesis";
      const inst = [meta.institution, meta.faculty, meta.publisher_place].filter(Boolean).join(', ');
      const instNote = inst ? ` (${degree}, ${inst})` : ` (${degree})`;
      let thesisBody = `${title}${instNote}.`;
      if (meta.publisher && meta.publisher !== meta.institution) {
        thesisBody += ` ${meta.publisher}.`;
      }
      parts.push(thesisBody);

    } else if (type.includes('bölüm') || type.includes('chapter') || (meta.book_title && meta.book_title !== meta.title)) {
      // Book Chapter or In-proceedings collection
      let chapterBody = `${title}.`;
      const ed = meta.editors ? `In ${meta.editors} (Ed.), ` : 'In ';
      const bookT = meta.book_title || '';
      const pp = meta.pages ? ` (pp. ${meta.pages.replace('-', '–')})` : '';
      const pub = meta.publisher ? `${meta.publisher}.` : '';

      chapterBody += ` ${ed}${bookT}${pp}.`;
      if (pub) chapterBody += ` ${pub}`;
      parts.push(chapterBody);

    } else if (type.includes('makale') || type.includes('journal') || type.includes('article') || meta.journal) {
      // Journal Article
      const journal = meta.journal || '';
      let jDetails = journal;
      if (meta.volume) {
        jDetails += `, ${meta.volume}`;
        if (meta.issue) jDetails += `(${meta.issue})`;
      } else if (meta.issue) {
        jDetails += `, (${meta.issue})`;
      }
      if (meta.pages) {
        jDetails += `, ${meta.pages.replace('-', '–')}`;
      } else if (meta.article_number) {
        jDetails += `, Article ${meta.article_number}`;
      }
      parts.push(`${title}. ${jDetails}.`);

    } else if (type.includes('bildiri') || type.includes('conference') || meta.conference_name) {
      // Conference Paper
      const confName = meta.conference_name || meta.book_title || '';
      const confLoc = meta.conference_location || '';
      let confDetails = `[Paper presentation]. ${confName}`;
      if (confLoc) confDetails += `, ${confLoc}`;
      parts.push(`${title} ${confDetails}.`);

    } else {
      // Generic Book / Report
      let bookBody = `${title}`;
      if (meta.edition) bookBody += ` (${meta.edition})`;
      bookBody += '.';
      if (meta.publisher) {
        bookBody += ` ${meta.publisher}.`;
      }
      parts.push(bookBody);
    }

    // 3. DOI or Link
    if (meta.doi) {
      const cleanDoi = meta.doi.replace(/^https?:\/\/doi\.org\//, '');
      parts.push(`https://doi.org/${cleanDoi}`);
    } else if (meta.link) {
      parts.push(meta.link);
    }

    return parts.join(' ').replace(/\s{2,}/g, ' ').trim();
  }

    // Global module bridge
    window.formatApa = formatApa;
})();

// =============================================================================
// Module: citation/ieee.js
// =============================================================================
(function () {
  /**
   * IEEE Citation Generator
   * Standard for Engineering, Computer Science, Technology, and Applied Sciences
   */

  function formatAuthorIeee(name) {
    if (!name) return '';
    name = name.trim();
    if (!name) return '';

    let parts;
    if (name.includes(',')) {
      // "Lastname, Firstname"
      const split = name.split(',').map(s => s.trim());
      const lastName = split[0];
      const firstNames = split[1] ? split[1].split(/\s+/) : [];
      const initials = firstNames.map(f => f[0].toUpperCase() + '.').join(' ');
      return initials ? `${initials} ${lastName}` : lastName;
    }

    parts = name.split(/\s+/);
    if (parts.length === 1) return parts[0];

    const lastName = parts.pop();
    const initials = parts.map(p => p[0].toUpperCase() + '.').join(' ');
    return `${initials} ${lastName}`;
  }

  function formatAuthorsListIeee(authors) {
    if (!authors) return '';
    let list = [];
    if (Array.isArray(authors)) {
      list = authors.map(formatAuthorIeee).filter(Boolean);
    } else if (typeof authors === 'string') {
      const splitAuthors = authors.split(/\s+(?:and|&)\s+|;\s*/i);
      list = splitAuthors.map(formatAuthorIeee).filter(Boolean);
    }

    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
  }

  function formatIeee(meta) {
    const authorStr = formatAuthorsListIeee(meta.authors || meta.author);
    const year = meta.year || (meta.date ? meta.date.split('-')[0] : '');
    const title = meta.title ? meta.title.trim().replace(/\.$/, '') : '';
    const type = (meta.publication_type || '').toLowerCase();

    const parts = [];
    if (authorStr) {
      parts.push(`${authorStr},`);
    }

    if (type.includes('tez') || type.includes('thesis') || type.includes('dissertation')) {
      // Thesis / Dissertation
      const degree = meta.degree ? (meta.degree.toLowerCase().includes('phd') || meta.degree.toLowerCase().includes('doktora') ? 'Ph.D. dissertation' : 'M.A. thesis') : 'thesis';
      const dept = meta.department ? `${meta.department}, ` : '';
      const inst = meta.institution || 'University';
      const place = meta.publisher_place ? `, ${meta.publisher_place}` : '';
      const yr = year ? `, ${year}` : '';
      parts.push(`"${title}," ${degree}, ${dept}${inst}${place}${yr}.`);

    } else if (type.includes('bölüm') || type.includes('chapter') || (meta.book_title && meta.book_title !== meta.title)) {
      // Book Chapter
      let body = `"${title}," in ${meta.book_title || 'Book'}`;
      if (meta.editors) body += `, ${meta.editors}, Ed.`;
      if (meta.publisher_place) body += `, ${meta.publisher_place}:`;
      if (meta.publisher) body += ` ${meta.publisher}`;
      if (year) body += `, ${year}`;
      if (meta.pages) body += `, pp. ${meta.pages.replace('-', '–')}`;
      body += '.';
      parts.push(body);

    } else if (type.includes('makale') || type.includes('journal') || type.includes('article') || meta.journal) {
      // Journal Article
      let body = `"${title}," ${meta.journal || 'Journal'}`;
      if (meta.volume) body += `, vol. ${meta.volume}`;
      if (meta.issue) body += `, no. ${meta.issue}`;
      if (meta.pages) body += `, pp. ${meta.pages.replace('-', '–')}`;
      if (year) body += `, ${year}`;
      body += '.';
      parts.push(body);

    } else if (type.includes('bildiri') || type.includes('conference') || meta.conference_name) {
      // Conference Paper
      let body = `"${title}," in ${meta.conference_name || meta.book_title || 'Conference'}`;
      if (meta.conference_location) body += `, ${meta.conference_location}`;
      if (year) body += `, ${year}`;
      if (meta.pages) body += `, pp. ${meta.pages.replace('-', '–')}`;
      body += '.';
      parts.push(body);

    } else {
      // Book
      let body = `${title}`;
      if (meta.publisher_place) body += `, ${meta.publisher_place}:`;
      if (meta.publisher) body += ` ${meta.publisher}`;
      if (year) body += `, ${year}`;
      body += '.';
      parts.push(body);
    }

    if (meta.doi) {
      const cleanDoi = meta.doi.replace(/^https?:\/\/doi\.org\//, '');
      parts.push(`doi: ${cleanDoi}.`);
    } else if (meta.link) {
      parts.push(`[Online]. Available: ${meta.link}`);
    }

    return parts.join(' ').replace(/\s{2,}/g, ' ').trim();
  }

    // Global module bridge
    window.formatIeee = formatIeee;
})();

// =============================================================================
// Module: citation/oxford.js
// =============================================================================
(function () {
  /**
   * Oxford Referencing Style Generator
   * Documentary-note referencing style widely used in Humanities and Law
   */

  function formatAuthorOxford(name) {
    if (!name) return '';
    name = name.trim();
    if (!name) return '';

    if (name.includes(',')) return name;

    const parts = name.split(/\s+/);
    if (parts.length === 1) return parts[0];

    const lastName = parts.pop();
    const firstNames = parts.join(' ');
    return `${lastName}, ${firstNames}`;
  }

  function formatAuthorsListOxford(authors) {
    if (!authors) return '';
    let list = [];
    if (Array.isArray(authors)) {
      list = authors.map(formatAuthorOxford).filter(Boolean);
    } else if (typeof authors === 'string') {
      const splitAuthors = authors.split(/\s+(?:and|&)\s+|;\s*/i);
      list = splitAuthors.map(formatAuthorOxford).filter(Boolean);
    }

    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    return `${list.slice(0, -1).join(', ')}, and ${list[list.length - 1]}`;
  }

  function formatOxford(meta) {
    const authorStr = formatAuthorsListOxford(meta.authors || meta.author);
    const year = meta.year || (meta.date ? meta.date.split('-')[0] : '');
    const title = meta.title ? meta.title.trim().replace(/\.$/, '') : '';
    const type = (meta.publication_type || '').toLowerCase();

    const parts = [];
    if (authorStr) {
      parts.push(`${authorStr},`);
    }

    if (type.includes('tez') || type.includes('thesis') || type.includes('dissertation')) {
      // Thesis
      const degree = meta.degree || "Master's thesis";
      const inst = meta.institution || 'University';
      const yr = year ? `, ${year}` : '';
      parts.push(`'${title}' (${degree}, ${inst}${yr}).`);

    } else if (type.includes('bölüm') || type.includes('chapter') || (meta.book_title && meta.book_title !== meta.title)) {
      // Book Chapter
      let body = `'${title}', in`;
      if (meta.editors) body += ` ${meta.editors} (ed.),`;
      body += ` ${meta.book_title || 'Book'}`;
      const pubDetails = [meta.publisher_place, meta.publisher].filter(Boolean).join(': ');
      const paren = [pubDetails, year].filter(Boolean).join(', ');
      if (paren) body += ` (${paren})`;
      if (meta.pages) body += `, pp. ${meta.pages.replace('-', '–')}`;
      body += '.';
      parts.push(body);

    } else if (type.includes('makale') || type.includes('journal') || type.includes('article') || meta.journal) {
      // Journal Article
      let body = `'${title}', ${meta.journal || 'Journal'}`;
      if (meta.volume && meta.issue) {
        body += `, ${meta.volume}/${meta.issue}`;
      } else if (meta.volume) {
        body += `, ${meta.volume}`;
      }
      if (year) body += ` (${year})`;
      if (meta.pages) body += `, ${meta.pages.replace('-', '–')}`;
      body += '.';
      parts.push(body);

    } else if (type.includes('bildiri') || type.includes('conference') || meta.conference_name) {
      // Conference
      let body = `'${title}', paper presented at ${meta.conference_name || 'Conference'}`;
      if (meta.conference_location) body += `, ${meta.conference_location}`;
      if (year) body += `, ${year}`;
      body += '.';
      parts.push(body);

    } else {
      // Book
      let body = `${title}`;
      const pubDetails = [meta.publisher_place, meta.publisher].filter(Boolean).join(': ');
      const paren = [pubDetails, year].filter(Boolean).join(', ');
      if (paren) body += ` (${paren})`;
      body += '.';
      parts.push(body);
    }

    if (meta.doi) {
      const cleanDoi = meta.doi.replace(/^https?:\/\/doi\.org\//, '');
      parts.push(`<https://doi.org/${cleanDoi}>`);
    } else if (meta.link) {
      parts.push(`<${meta.link}>`);
    }

    return parts.join(' ').replace(/\s{2,}/g, ' ').trim();
  }

    // Global module bridge
    window.formatOxford = formatOxford;
})();

// =============================================================================
// Module: citation/bibtex.js
// =============================================================================
(function () {
  /**
   * BiBTeX Citation Generator
   * Generates clean, standard BiBTeX format for academic papers, books, conferences, and theses.
   */

  function cleanAscii(str) {
    if (!str) return '';
    const trMap = {
      'ç': 'c', 'Ç': 'c',
      'ğ': 'g', 'Ğ': 'g',
      'ı': 'i', 'I': 'i', 'İ': 'i',
      'ö': 'o', 'Ö': 'o',
      'ş': 's', 'Ş': 's',
      'ü': 'u', 'Ü': 'u'
    };
    let result = str.replace(/[çÇğĞıIİöÖşŞüÜ]/g, c => trMap[c] || c);
    return result.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function cleanAuthorName(name) {
    if (!name) return '';
    name = name.trim();
    // Strip academic titles
    name = name.replace(/^(?:Prof\.?\s+Dr\.?|Doç\.?\s+Dr\.?|Dr\.?|Prof\.?|Assoc\.?\s+Prof\.?|Asst\.?\s+Prof\.?|Öğr\.?\s+Gör\.?)\s+/i, '');
    if (name.includes(',')) {
      return name.trim();
    }
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length <= 1) return parts[0] || '';
    const lastName = parts.pop();
    return `${lastName}, ${parts.join(' ')}`;
  }

  function formatAuthorsBibtex(authors) {
    if (!authors) return '';
    let list = [];
    if (Array.isArray(authors)) {
      list = authors.map(cleanAuthorName).filter(Boolean);
    } else if (typeof authors === 'string') {
      const rawList = authors.split(/\s+(?:and|&)\s+|;\s*/i);
      list = rawList.map(cleanAuthorName).filter(Boolean);
    }
    return list.join(' and ');
  }

  function generateCitationKey(pubData) {
    // 1. Author last name
    let firstAuthor = '';
    if (Array.isArray(pubData.authors) && pubData.authors.length > 0) {
      firstAuthor = pubData.authors[0];
    } else if (typeof pubData.authors === 'string' && pubData.authors.trim()) {
      firstAuthor = pubData.authors.split(/\s+(?:and|&)\s+|;\s*|,/i)[0];
    } else if (pubData.author) {
      firstAuthor = String(pubData.author).split(/\s+(?:and|&)\s+|;\s*|,/i)[0];
    }

    let authorPart = cleanAscii(cleanAuthorName(firstAuthor).split(',')[0]);
    if (!authorPart) authorPart = 'author';

    // 2. Year (4 digits)
    let yearPart = '';
    if (pubData.year) {
      const m = String(pubData.year).match(/\d{4}/);
      if (m) yearPart = m[0];
    }
    if (!yearPart && pubData.date) {
      const m = String(pubData.date).match(/\d{4}/);
      if (m) yearPart = m[0];
    }
    if (!yearPart) {
      yearPart = new Date().getFullYear().toString();
    }

    // 3. First significant word of title
    let wordPart = '';
    if (pubData.title) {
      const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'bir', 've', 'ile', 'de', 'da']);
      const words = String(pubData.title).split(/\s+/);
      for (const w of words) {
        const cleaned = cleanAscii(w);
        if (cleaned.length >= 3 && !stopWords.has(cleaned)) {
          wordPart = cleaned;
          break;
        }
      }
      if (!wordPart && words.length > 0) {
        wordPart = cleanAscii(words[0]);
      }
    }
    if (!wordPart) wordPart = 'paper';

    return `${authorPart}${yearPart}${wordPart}`;
  }

  function escapeBibValue(val) {
    if (val === undefined || val === null) return '';
    return String(val)
      .replace(/\\/g, '\\textbackslash ')
      .replace(/([&%$#_{}])/g, '\\$1')
      .trim();
  }

  /**
   * Generate a standard BiBTeX entry string from publication metadata
   * @param {object} pubData - Publication metadata object
   * @returns {string} Formatted BiBTeX string
   */
  function generateBibTeX(pubData) {
    if (!pubData || typeof pubData !== 'object') return '';

    const meta = Object.assign({}, pubData);

    // 1. Determine Entry Type
    let rawType = (meta.entryType || meta.entry_type || meta.publication_type || meta.pub_type || '').toLowerCase().trim();
    rawType = rawType.replace(/^@/, '');

    let entryType = 'misc';
    if (rawType.includes('article') || rawType.includes('makale') || meta.journal) {
      entryType = 'article';
    } else if (rawType.includes('inproceedings') || rawType.includes('conference') || rawType.includes('bildiri') || meta.conference || meta.conference_name) {
      entryType = 'inproceedings';
    } else if (rawType.includes('phd') || (rawType.includes('tez') && (meta.degree || '').toLowerCase().includes('phd'))) {
      entryType = 'phdthesis';
    } else if (rawType.includes('master') || rawType.includes('tez') || rawType.includes('thesis')) {
      entryType = 'mastersthesis';
    } else if (rawType.includes('chapter') || rawType.includes('bölüm') || (meta.book_title && meta.book_title !== meta.title)) {
      entryType = 'incollection';
    } else if (rawType.includes('book') || rawType.includes('kitap')) {
      entryType = 'book';
    } else if (rawType.includes('report') || rawType.includes('rapor')) {
      entryType = 'techreport';
    } else if (rawType) {
      entryType = rawType;
    }

    // 2. Citation Key
    const citationKey = generateCitationKey(meta);

    // 3. Collect BiBTeX fields
    const fields = [];

    // Title
    if (meta.title) {
      fields.push(`  title = {${escapeBibValue(meta.title)}}`);
    }

    // Author(s)
    const authorsStr = formatAuthorsBibtex(meta.authors || meta.author);
    if (authorsStr) {
      fields.push(`  author = {${escapeBibValue(authorsStr)}}`);
    }

    // Year
    let year = meta.year;
    if (!year && meta.date) {
      const ym = String(meta.date).match(/\d{4}/);
      if (ym) year = ym[0];
    }
    if (year) {
      fields.push(`  year = {${escapeBibValue(year)}}`);
    }

    // Journal (for @article)
    if (entryType === 'article') {
      const journal = meta.journal || meta.book_title || '';
      if (journal) fields.push(`  journal = {${escapeBibValue(journal)}}`);
    }

    // Booktitle (for @inproceedings, @incollection)
    if (entryType === 'inproceedings' || entryType === 'incollection') {
      const booktitle = meta.booktitle || meta.book_title || meta.conference || meta.conference_name || '';
      if (booktitle) fields.push(`  booktitle = {${escapeBibValue(booktitle)}}`);
    }

    // Volume & Issue/Number
    if (meta.volume) {
      fields.push(`  volume = {${escapeBibValue(meta.volume)}}`);
    }
    const issue = meta.issue || meta.number || '';
    if (issue) {
      fields.push(`  number = {${escapeBibValue(issue)}}`);
    }

    // Pages (replace single dash with double dash for LaTeX standard)
    if (meta.pages) {
      const formattedPages = String(meta.pages).replace(/[–—]/g, '-').replace(/-+/g, '--');
      fields.push(`  pages = {${escapeBibValue(formattedPages)}}`);
    }

    // Publisher / Institution
    if (entryType === 'phdthesis' || entryType === 'mastersthesis' || entryType === 'techreport') {
      const inst = meta.institution || meta.faculty || meta.publisher || '';
      if (inst) fields.push(`  school = {${escapeBibValue(inst)}}`);
    } else if (meta.publisher) {
      fields.push(`  publisher = {${escapeBibValue(meta.publisher)}}`);
    }

    // DOI
    if (meta.doi) {
      const cleanDoi = String(meta.doi).replace(/^https?:\/\/doi\.org\//i, '').trim();
      fields.push(`  doi = {${cleanDoi}}`);
    }

    // URL
    const url = meta.url || meta.link || '';
    if (url) {
      fields.push(`  url = {${url.trim()}}`);
    }

    return `@${entryType}{${citationKey},\n${fields.join(',\n')}\n}`;
  }

  // Global registry hook
  if (typeof window !== 'undefined') {
    window.CitationFormats = window.CitationFormats || {};
    window.CitationFormats.bibtex = generateBibTeX;
  }

    // Global module bridge
    window.generateBibTeX = generateBibTeX;
    window.CitationFormats = window.CitationFormats || {}; window.CitationFormats.bibtex = generateBibTeX;
})();

// =============================================================================
// Module: citation/index.js
// =============================================================================
(function () {
  const formatApa = window.formatApa;
  const formatIeee = window.formatIeee;
  const formatOxford = window.formatOxford;
  const generateBibTeX = window.generateBibTeX;

  /**
   * Citation Module Controller & Registry
   * Extensible modular citation manager supporting APA, IEEE, Oxford, and BiBTeX.
   * Renders citation buttons that show a preview tooltip on hover and copy to clipboard on click,
   * plus interactive BiBTeX copy and .bib export actions.
   */


  const citationRegistry = {
    apa: {
      id: 'apa',
      label: 'APA (7th)',
      subtitle: 'Sosyal Bilimler',
      subtitleEn: 'Social Sciences',
      formatter: formatApa
    },
    ieee: {
      id: 'ieee',
      label: 'IEEE',
      subtitle: 'Fen & Mühendislik',
      subtitleEn: 'Engineering & Science',
      formatter: formatIeee
    },
    oxford: {
      id: 'oxford',
      label: 'Oxford',
      subtitle: 'Beşeri Bilimler',
      subtitleEn: 'Humanities',
      formatter: formatOxford
    },
    bibtex: {
      id: 'bibtex',
      label: 'BiBTeX',
      subtitle: 'LaTeX & Kaynakça',
      subtitleEn: 'LaTeX & Bibliography',
      formatter: generateBibTeX
    }
  };

  /**
   * Register a new citation style dynamically
   * @param {string} id - Identifier key (e.g. 'harvard', 'chicago')
   * @param {object} config - Configuration object with label, subtitle, and formatter(meta)
   */
  function registerCitationStyle(id, config) {
    if (!id || typeof config.formatter !== 'function') {
      console.warn(`Invalid citation style configuration for "${id}"`);
      return;
    }
    citationRegistry[id] = {
      id,
      label: config.label || id.toUpperCase(),
      subtitle: config.subtitle || '',
      subtitleEn: config.subtitleEn || config.subtitle || '',
      formatter: config.formatter
    };
  }

  /**
   * Get formatted citation for a specific style
   * @param {string} styleId
   * @param {object} meta
   * @returns {string} Formatted citation string
   */
  function generateCitation(styleId, meta) {
    const style = citationRegistry[styleId];
    if (!style || typeof style.formatter !== 'function') {
      return meta.citation || meta.title || '';
    }
    return style.formatter(meta);
  }

  /**
   * Helper to copy arbitrary text to clipboard with fallback
   */
  function copyToClipboard(text, callback) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        if (callback) callback();
      }).catch(() => {
        fallbackCopy(text, callback);
      });
    } else {
      fallbackCopy(text, callback);
    }
  }

  function fallbackCopy(text, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      console.warn('Fallback copy failed', err);
    }
    document.body.removeChild(textarea);
  }

  /**
   * Extract publication metadata from a DOM element's data attributes and fallback JSON
   */
  function extractPubData(element, fallbackMeta) {
    const container = element.closest('.publication-citation-actions') ||
                      element.closest('[data-title]') ||
                      document.querySelector('.publication-citation-actions');
    const data = Object.assign({}, fallbackMeta || {});

    if (container) {
      if (container.getAttribute('data-title')) data.title = container.getAttribute('data-title');
      if (container.getAttribute('data-authors')) {
        const rawAuthors = container.getAttribute('data-authors');
        data.authors = rawAuthors.includes(' and ') ? rawAuthors.split(/\s+and\s+/) : rawAuthors;
      }
      if (container.getAttribute('data-year')) data.year = container.getAttribute('data-year');
      if (container.getAttribute('data-journal')) data.journal = container.getAttribute('data-journal');
      if (container.getAttribute('data-conference')) data.conference = container.getAttribute('data-conference');
      if (container.getAttribute('data-volume')) data.volume = container.getAttribute('data-volume');
      if (container.getAttribute('data-issue')) data.issue = container.getAttribute('data-issue');
      if (container.getAttribute('data-pages')) data.pages = container.getAttribute('data-pages');
      if (container.getAttribute('data-doi')) data.doi = container.getAttribute('data-doi');
      if (container.getAttribute('data-url')) data.url = container.getAttribute('data-url');
    }

    return data;
  }

  /**
   * Copy formatted BiBTeX string to clipboard with visual button feedback
   */
  function copyBibTeXAction(pubData, btnElement, feedbackText) {
    const bibStr = generateBibTeX(pubData);
    const feedback = feedbackText || (pubData.lang === 'tr' ? 'Kopyalandı!' : 'Copied!');

    copyToClipboard(bibStr, () => {
      if (btnElement) {
        const origHtml = btnElement.innerHTML;
        btnElement.classList.add('copied');
        btnElement.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg> <span>${feedback}</span>`;
        setTimeout(() => {
          btnElement.classList.remove('copied');
          btnElement.innerHTML = origHtml;
        }, 2000);
      }
    });
  }

  /**
   * Export and trigger download of .bib file
   */
  function exportBibTeXAction(pubData) {
    const bibStr = generateBibTeX(pubData);
    const keyMatch = bibStr.match(/^@[^{]+{([^,]+),/m);
    const citationKey = keyMatch ? keyMatch[1].trim() : 'citation';

    const blob = new Blob([bibStr], { type: 'application/x-bibtex;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${citationKey}.bib`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 150);
  }

  /**
   * Initialize citation buttons, tooltips, and BiBTeX action handlers
   */
  function initCitationModule() {
    const widget = document.getElementById('pubCitationWidget');
    const metaEl = document.getElementById('publicationMetadata');

    let metadata = {};
    if (metaEl) {
      try {
        metadata = JSON.parse(metaEl.textContent || '{}');
      } catch (err) {
        console.error('Failed to parse publication metadata for citation module', err);
      }
    }

    const isEn = (metadata.lang === 'en' || (document.documentElement && document.documentElement.lang === 'en'));
    const copiedLabel = (widget && widget.getAttribute('data-copied-text')) || (isEn ? 'Copied!' : 'Kopyalandı!');
    const hintLabel = (widget && widget.getAttribute('data-hint-text')) || (isEn ? 'Click button to copy citation' : 'Kopyalamak için butona tıklayın');

    // Generate citation buttons if widget exists
    if (widget) {
      // Shared Tooltip Element
      let tooltip = document.getElementById('pubGlobalCiteTooltip');
      if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'pubGlobalCiteTooltip';
        tooltip.className = 'pub-cite-tooltip';
        tooltip.innerHTML = `
          <div class="pub-tooltip-header">
            <span class="pub-tooltip-title"></span>
            <span class="pub-tooltip-badge"></span>
          </div>
          <div class="pub-tooltip-body"></div>
          <div class="pub-tooltip-hint">
            <svg class="icon" aria-hidden="true"><use href="#icon-mouse-pointer"></use></svg> <span class="pub-tooltip-hint-text">${hintLabel}</span>
          </div>
        `;
        document.body.appendChild(tooltip);
      }

      const tooltipTitle = tooltip.querySelector('.pub-tooltip-title');
      const tooltipBadge = tooltip.querySelector('.pub-tooltip-badge');
      const tooltipBody = tooltip.querySelector('.pub-tooltip-body');

      const container = document.getElementById('pubCiteButtonsGroup') || widget;
      container.innerHTML = '';

      Object.keys(citationRegistry).forEach(styleKey => {
        const style = citationRegistry[styleKey];
        const citationText = generateCitation(styleKey, metadata);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'pub-cite-btn';
        btn.setAttribute('data-style', style.id);
        btn.setAttribute('data-citation', citationText);

        const initialHtml = `
          <svg class="icon pub-cite-quote-icon" aria-hidden="true"><use href="#icon-quote-left"></use></svg>
          <span class="pub-cite-name">${style.label}</span>
          <span class="pub-cite-action-icon"><svg class="icon" aria-hidden="true"><use href="#icon-copy"></use></svg></span>
        `;
        btn.innerHTML = initialHtml;

        // Show Tooltip on Hover / Focus
        const showTooltip = () => {
          if (tooltipTitle) tooltipTitle.textContent = style.label;
          if (tooltipBadge) tooltipBadge.textContent = isEn ? style.subtitleEn : style.subtitle;
          if (tooltipBody) {
            // If bibtex, format preformatted code preview
            if (styleKey === 'bibtex') {
              tooltipBody.innerHTML = `<pre style="margin:0; font-family:monospace; font-size:11px; white-space:pre-wrap; max-height:160px; overflow-y:auto; color:inherit; background:transparent; border:none; padding:0;">${citationText.replace(/</g, '&lt;')}</pre>`;
            } else {
              tooltipBody.textContent = citationText;
            }
          }
          positionTooltip(btn, tooltip);
          tooltip.classList.add('visible');
        };

        const hideTooltip = () => {
          tooltip.classList.remove('visible');
        };

        btn.addEventListener('mouseenter', showTooltip);
        btn.addEventListener('mouseleave', hideTooltip);
        btn.addEventListener('focus', showTooltip);
        btn.addEventListener('blur', hideTooltip);

        // Copy to clipboard on click
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          copyToClipboard(citationText, () => {
            btn.classList.add('copied');
            btn.innerHTML = `
              <svg class="icon" aria-hidden="true"><use href="#icon-check"></use></svg>
              <span class="pub-cite-name">${copiedLabel}</span>
            `;
            setTimeout(() => {
              btn.classList.remove('copied');
              btn.innerHTML = initialHtml;
            }, 2200);
          });
        });

        container.appendChild(btn);
      });
    }

    // Wire interactive BiBTeX action buttons (.btn-copy-bibtex & .btn-export-bibtex)
    const copyBibtexBtns = document.querySelectorAll('.btn-copy-bibtex');
    copyBibtexBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const pubData = extractPubData(btn, metadata);
        copyBibTeXAction(pubData, btn, copiedLabel);
      });
    });

    const exportBibtexBtns = document.querySelectorAll('.btn-export-bibtex');
    exportBibtexBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const pubData = extractPubData(btn, metadata);
        exportBibTeXAction(pubData);
      });
    });

    function positionTooltip(targetEl, tooltipEl) {
      const rect = targetEl.getBoundingClientRect();
      const tooltipWidth = 380;
      const padding = 12;

      let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
      if (left < padding) left = padding;
      if (left + tooltipWidth > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth - padding;
      }

      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      tooltipEl.style.width = Math.min(tooltipWidth, window.innerWidth - 24) + 'px';
      tooltipEl.style.left = left + 'px';

      if (rect.top < 180) {
        tooltipEl.style.top = (rect.bottom + scrollY + 8) + 'px';
        tooltipEl.style.transform = 'none';
        tooltipEl.classList.add('arrow-top');
        tooltipEl.classList.remove('arrow-bottom');
      } else {
        tooltipEl.style.top = (rect.top + scrollY - 8) + 'px';
        tooltipEl.style.transform = 'translateY(-100%)';
        tooltipEl.classList.add('arrow-bottom');
        tooltipEl.classList.remove('arrow-top');
      }
    }
  }

  // Global exposure
  if (typeof window !== 'undefined') {
    window.CitationRegistry = citationRegistry;
    window.initCitationModule = initCitationModule;
    window.registerCitationStyle = registerCitationStyle;
    window.generateCitation = generateCitation;
    window.copyBibTeXAction = copyBibTeXAction;
    window.exportBibTeXAction = exportBibTeXAction;
  }

    // Global module bridge
    window.initCitationModule = initCitationModule;
    window.registerCitationStyle = registerCitationStyle;
    window.generateCitation = generateCitation;
    window.copyBibTeXAction = copyBibTeXAction;
    window.exportBibTeXAction = exportBibTeXAction;
})();

// =============================================================================
// Module: publications.js
// =============================================================================
(function () {
  const initCitationModule = window.initCitationModule;

  /**
   * Publications Module
   * Provides unified client-side search, publication-type filtering,
   * interactive keyword cloud filtering, and deep-linking via ?keyword= query param.
   */


  function initPublications() {
    const container = document.querySelector('.publication-archive-page');
    if (!container) return;

    const searchInput = document.getElementById('publicationSearchInput');
    const typeBtns = Array.from(document.querySelectorAll('.pub-filter-btn, .pub-cat-btn'));
    const cards = Array.from(document.querySelectorAll('.publication-card-wrapper'));
    const noMatchEl = document.getElementById('noPubsMatch');

    // Keyword Cloud controls
    const cloudItems = Array.from(document.querySelectorAll('.kw-cloud-item'));
    const cardKwBtns = Array.from(document.querySelectorAll('.pub-card-kw-btn'));
    const clearKwBtn = document.getElementById('clearKeywordFilterBtn');
    const resetKwInline = document.getElementById('resetKeywordInline');
    const activeKwBanner = document.getElementById('activeKeywordBanner');
    const activeKwText = document.getElementById('activeKeywordText');

    let activeType = 'all';
    let activeKeyword = '';

    function filterPublications() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      let totalVisible = 0;

      cards.forEach(card => {
        const cardType = (card.getAttribute('data-type') || '').toLowerCase();
        const cardTitle = (card.getAttribute('data-title') || '').toLowerCase();
        const cardAuthor = (card.getAttribute('data-author') || '').toLowerCase();
        const cardCite = (card.getAttribute('data-cite') || '').toLowerCase();
        const cardYear = (card.getAttribute('data-year') || '').toLowerCase();
        const cardKeywords = (card.getAttribute('data-keywords') || '').toLowerCase();

        // Check Type match
        const matchesType = (activeType === 'all' || cardType === activeType);

        // Check Keyword match
        let matchesKeyword = true;
        if (activeKeyword) {
          matchesKeyword = cardKeywords.includes(activeKeyword);
        }

        // Check Text Query match
        let matchesQuery = !query;
        if (query) {
          matchesQuery = (
            cardTitle.includes(query) ||
            cardAuthor.includes(query) ||
            cardCite.includes(query) ||
            cardYear.includes(query) ||
            cardKeywords.includes(query)
          );
        }

        const isMatch = matchesType && matchesKeyword && matchesQuery;
        card.style.display = isMatch ? '' : 'none';
        if (isMatch) totalVisible++;
      });

      if (noMatchEl) {
        noMatchEl.style.display = (totalVisible === 0) ? 'block' : 'none';
      }

      // Update keyword cloud active styling
      cloudItems.forEach(item => {
        const kw = (item.getAttribute('data-keyword') || '').toLowerCase().trim();
        if (activeKeyword && kw === activeKeyword) {
          item.classList.add('is-active');
        } else {
          item.classList.remove('is-active');
        }
      });

      // Update active keyword banner
      if (activeKeyword) {
        if (activeKwBanner) activeKwBanner.style.display = 'flex';
        if (activeKwText) activeKwText.textContent = '#' + activeKeyword;
        if (clearKwBtn) clearKwBtn.style.display = 'inline-block';
      } else {
        if (activeKwBanner) activeKwBanner.style.display = 'none';
        if (clearKwBtn) clearKwBtn.style.display = 'none';
      }
    }

    function setKeywordFilter(rawKeyword, updateUrl = true) {
      if (!rawKeyword || rawKeyword === 'all') {
        activeKeyword = '';
      } else {
        activeKeyword = rawKeyword.replace(/^#/, '').toLowerCase().trim();
      }

      if (updateUrl && window.history && window.history.pushState) {
        const url = new URL(window.location.href);
        if (activeKeyword) {
          url.searchParams.set('keyword', activeKeyword);
        } else {
          url.searchParams.delete('keyword');
        }
        window.history.pushState(null, '', url.toString());
      }

      filterPublications();

      // Smooth scroll down to controls/cards if clicked
      const listEl = document.getElementById('publicationsList');
      if (listEl && activeKeyword) {
        listEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Type filter buttons
    typeBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        typeBtns.forEach(b => {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-default');
        });
        this.classList.remove('btn-default');
        this.classList.add('btn-primary', 'active');

        activeType = (this.getAttribute('data-type') || 'all').toLowerCase();
        filterPublications();
      });
    });

    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', filterPublications);
    }

    // Keyword Cloud tag buttons
    cloudItems.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const kw = this.getAttribute('data-keyword');
        if (activeKeyword && kw && activeKeyword === kw.toLowerCase().trim()) {
          // Toggle off if clicking the already active keyword
          setKeywordFilter('');
        } else {
          setKeywordFilter(kw);
        }
      });
    });

    // Card keyword tags
    cardKwBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const kw = this.getAttribute('data-keyword');
        setKeywordFilter(kw);
      });
    });

    // Clear Keyword Filter Buttons
    if (clearKwBtn) {
      clearKwBtn.addEventListener('click', function (e) {
        e.preventDefault();
        setKeywordFilter('');
      });
    }

    if (resetKwInline) {
      resetKwInline.addEventListener('click', function (e) {
        e.preventDefault();
        setKeywordFilter('');
      });
    }

    // Listen to browser popstate (back/forward navigation)
    window.addEventListener('popstate', function () {
      const params = new URLSearchParams(window.location.search);
      const kwParam = params.get('keyword');
      setKeywordFilter(kwParam || '', false);
    });

    // Check URL query param on initial page load (e.g. ?keyword=siyasal-iletisim)
    const initialParams = new URLSearchParams(window.location.search);
    const initialKw = initialParams.get('keyword');
    if (initialKw) {
      setKeywordFilter(initialKw, false);
    } else {
      filterPublications();
    }
  }

  function initAll() {
    initPublications();
    initCitationModule();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

    // Global module bridge
    window.initPublications = initPublications;
})();

// =============================================================================
// Module: archive.js
// =============================================================================
(function () {
  /**
   * Standard Archive Module
   * Unified client-side search, category filtering, and empty-state handling
   * for all archive areas: Lessons, Projects, Posts, Publications, Academic, and Diving.
   */

  function createArchiveFilter(config) {
    const searchInput = document.getElementById(config.searchInputId);
    const filterBtns = document.querySelectorAll(config.filterBtnClass);
    const cards = document.querySelectorAll(config.cardClass);
    const groupBlocks = config.groupBlockClass ? document.querySelectorAll(config.groupBlockClass) : [];
    const noMatchEl = document.getElementById(config.noMatchId);

    if (!searchInput && filterBtns.length === 0 && cards.length === 0 && groupBlocks.length === 0) {
      return;
    }

    let activeCategory = 'all';

    const categoryAttrs = config.itemCatAttrs || ['data-category', 'data-categories', 'data-type', 'data-cat'];
    const searchAttrs = config.searchAttrs || ['data-title', 'data-code', 'data-author', 'data-year', 'data-cite', 'data-tags'];

    function itemMatches(el, inheritedCat) {
      const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      // Check query match across search attributes and element text
      let matchesQuery = !query;
      if (query) {
        for (let i = 0; i < searchAttrs.length; i++) {
          const val = el.getAttribute(searchAttrs[i]);
          if (val && val.toLowerCase().includes(query)) {
            matchesQuery = true;
            break;
          }
        }
        if (!matchesQuery && el.textContent && el.textContent.toLowerCase().includes(query)) {
          matchesQuery = true;
        }
      }

      // Check category match
      let matchesCat = (activeCategory === 'all');
      if (!matchesCat) {
        const catList = [];
        if (inheritedCat) {
          inheritedCat.toLowerCase().split(/[\s,]+/).forEach(function (c) {
            if (c) catList.push(c);
          });
        }
        for (let i = 0; i < categoryAttrs.length; i++) {
          const val = el.getAttribute(categoryAttrs[i]);
          if (val) {
            val.toLowerCase().split(/[\s,]+/).forEach(function (c) {
              if (c) catList.push(c);
            });
          }
        }
        matchesCat = catList.includes(activeCategory);
      }

      return matchesQuery && matchesCat;
    }

    function filterArchive() {
      let totalVisible = 0;

      if (groupBlocks.length > 0) {
        groupBlocks.forEach(function (block) {
          const blockCat = block.getAttribute('data-category') || '';
          const blockCards = block.querySelectorAll(config.cardClass);
          let blockVisible = 0;

          blockCards.forEach(function (card) {
            const visible = itemMatches(card, blockCat);
            card.style.display = visible ? '' : 'none';
            if (visible) {
              blockVisible++;
              totalVisible++;
            }
          });

          block.style.display = (blockVisible === 0) ? 'none' : '';
        });
      } else {
        cards.forEach(function (card) {
          const visible = itemMatches(card);
          card.style.display = visible ? '' : 'none';
          if (visible) {
            totalVisible++;
          }
        });
      }

      if (noMatchEl) {
        noMatchEl.style.display = (totalVisible === 0) ? 'block' : 'none';
      }

      if (typeof config.onFilter === 'function') {
        config.onFilter();
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterArchive);
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        if (btn.tagName === 'A' || btn.getAttribute('href')) {
          e.preventDefault();
        }
        filterBtns.forEach(function (b) {
          b.classList.remove('btn-primary', 'active');
          b.classList.add('btn-default');
        });
        this.classList.remove('btn-default');
        this.classList.add('btn-primary', 'active');

        activeCategory = (
          this.getAttribute('data-category') ||
          this.getAttribute('data-cat') ||
          this.getAttribute('data-type') ||
          'all'
        ).toLowerCase();

        filterArchive();
      });
    });
  }

  /**
   * Flex Masonry Layout Helper
   * Organizes cards without vertical empty spaces using CSS flexbox column wrap,
   * dynamic order distribution, and container height synchronization.
   * Supports single selector, multiple selectors, or elements list.
   */
  function initFlexMasonry(selector) {
    const grids = (typeof selector === 'string')
      ? Array.from(document.querySelectorAll(selector))
      : (selector instanceof NodeList || Array.isArray(selector))
        ? Array.from(selector)
        : (selector ? [selector] : []);

    if (grids.length === 0) return null;

    const layoutFns = grids.map(function (grid) {
      let breakEl = grid.querySelector('.flex-masonry-break');
      if (!breakEl) {
        breakEl = document.createElement('div');
        breakEl.className = 'flex-masonry-break';
        grid.appendChild(breakEl);
      }

      function layout() {
        if (window.innerWidth < 768) {
          grid.classList.remove('flex-masonry-active');
          grid.style.removeProperty('height');
          const items = grid.querySelectorAll('.flex-masonry-item');
          items.forEach(function (item) {
            item.style.removeProperty('order');
          });
          return;
        }

        grid.classList.add('flex-masonry-active');

        const allItems = Array.from(grid.querySelectorAll('.flex-masonry-item'));
        const visibleItems = allItems.filter(function (item) {
          return item.style.display !== 'none';
        });

        if (visibleItems.length === 0) {
          grid.style.removeProperty('height');
          return;
        }

        let col1Height = 0;
        let col2Height = 0;

        visibleItems.forEach(function (item) {
          const col = (col1Height <= col2Height) ? 1 : 2;
          item.style.order = col;

          let itemH = item.offsetHeight;
          if (!itemH) {
            const cardInner = item.querySelector('.archive-card');
            itemH = cardInner ? cardInner.offsetHeight : 280;
          }
          const totalH = itemH + 24;

          if (col === 1) {
            col1Height += totalH;
          } else {
            col2Height += totalH;
          }
        });

        breakEl.style.order = '1';

        const maxHeight = Math.max(col1Height, col2Height);
        grid.style.height = (maxHeight + 12) + 'px';
      }

      // Initial layout
      layout();

      // Layout when window loads or images finish loading
      window.addEventListener('load', layout);
      const images = grid.querySelectorAll('img');
      images.forEach(function (img) {
        if (!img.complete) {
          img.addEventListener('load', layout);
        }
      });

      return layout;
    });

    function layoutAll() {
      layoutFns.forEach(function (fn) {
        fn();
      });
    }

    // Layout on resize with debounce
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layoutAll, 100);
    });

    return layoutAll;
  }

  function initArchive() {
    // 1. Lessons Archive with Flex Masonry
    const lessonMasonryLayout = initFlexMasonry('.category-group-block .flex-masonry-grid');

    createArchiveFilter({
      searchInputId: 'lessonSearchInput',
      filterBtnClass: '.lesson-cat-btn',
      groupBlockClass: '.category-group-block',
      cardClass: '.lesson-card-wrapper',
      noMatchId: 'noLessonsMatch',
      onFilter: function () {
        if (lessonMasonryLayout) {
          lessonMasonryLayout();
        }
      }
    });

    // 2. Projects Archive with Flex Masonry
    const projectMasonryLayout = initFlexMasonry('#projectsGrid');

    createArchiveFilter({
      searchInputId: 'projectSearchInput',
      filterBtnClass: '.project-cat-btn',
      cardClass: '.project-card-item',
      noMatchId: 'noProjectsMatch',
      onFilter: function () {
        if (projectMasonryLayout) {
          projectMasonryLayout();
        }
      }
    });

    // 3. Posts (Blog) Archive with Flex Masonry
    const postMasonryLayout = initFlexMasonry('#postsGrid');

    createArchiveFilter({
      searchInputId: 'postSearchInput',
      filterBtnClass: '.cat-btn',
      cardClass: '.post-card-item',
      noMatchId: 'noPostsMatch',
      onFilter: function () {
        if (postMasonryLayout) {
          postMasonryLayout();
        }
      }
    });

    // 4. Publications Archive
    createArchiveFilter({
      searchInputId: 'publicationSearchInput',
      filterBtnClass: '.pub-filter-btn, .pub-cat-btn',
      cardClass: '.publication-card-wrapper',
      noMatchId: 'noPubsMatch'
    });

    // 5. Diving Archive & Generic Folder Pages
    const divingMasonryLayout = initFlexMasonry('#divingGrid, .folder-masonry-grid');

    createArchiveFilter({
      searchInputId: 'divingSearchInput',
      filterBtnClass: '.diving-cat-btn, .folder-cat-btn',
      cardClass: '.diving-card-item, .folder-card-item',
      noMatchId: 'noDivingMatch',
      onFilter: function () {
        if (divingMasonryLayout) {
          divingMasonryLayout();
        }
      }
    });

    // 6. Academic Archive with Flex Masonry
    const academicMasonryLayout = initFlexMasonry('#academicGrid');

    createArchiveFilter({
      searchInputId: 'academicSearchInput',
      filterBtnClass: '.academic-cat-btn',
      cardClass: '.academic-card-item',
      noMatchId: 'noAcademicMatch',
      onFilter: function () {
        if (academicMasonryLayout) {
          academicMasonryLayout();
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initArchive);
  } else {
    initArchive();
  }
})();

// =============================================================================
// Module: network.js
// =============================================================================
(function () {
  /**
   * Academic Network Live Directory & Filter Module
   * -------------------------------------------------------------------
   * Dynamically loads verified academic sites from the central database API,
   * renders member cards with fully-qualified avatars, and provides instant
   * live search & multi-dimensional dropdown filtering for:
   *   - Countries
   *   - Universities / Institutions
   *   - Academic Fields
   *   - Keywords
   */

  const CACHE_KEY = 'academy_network_cache_v2';
  const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

  function initNetwork() {
    const networkContainer = document.querySelector('.network-page');
    if (!networkContainer) return;

    const endpoint = networkContainer.getAttribute('data-endpoint') || 'https://academy.banabirsebepver.com/api/network.php';
    const gridEl = document.getElementById('networkGrid');
    const loadingEl = document.getElementById('networkLoading');
    const searchInput = document.getElementById('networkSearchInput');
    const selectCountry = document.getElementById('networkFilterCountry');
    const selectInstitution = document.getElementById('networkFilterInstitution');
    const selectField = document.getElementById('networkFilterField');
    const selectKeyword = document.getElementById('networkFilterKeyword');
    const resetBtns = document.querySelectorAll('.network-reset-btn');
    const currentCountEl = document.getElementById('networkCurrentCount');
    const totalCountEl = document.getElementById('networkTotalCount');
    const noResultsEl = document.getElementById('networkNoResults');

    function getCachedMembers() {
      try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (Date.now() - data.timestamp < CACHE_TTL_MS && Array.isArray(data.members)) {
          return data.members;
        }
      } catch (e) {}
      return null;
    }

    function setCachedMembers(members) {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          members: members
        }));
      } catch (e) {}
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function normalizeKeywords(kws) {
      if (!kws) return [];
      if (Array.isArray(kws)) return kws.map(k => String(k).trim()).filter(Boolean);
      if (typeof kws === 'string') {
        try {
          const parsed = JSON.parse(kws);
          if (Array.isArray(parsed)) return parsed.map(k => String(k).trim()).filter(Boolean);
        } catch (e) {}
        return kws.split(',').map(k => k.trim()).filter(Boolean);
      }
      return [];
    }

    function renderMembers(members) {
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }

      if (!Array.isArray(members) || members.length === 0) {
        if (gridEl) gridEl.innerHTML = '';
        if (currentCountEl) currentCountEl.textContent = '0';
        if (totalCountEl) totalCountEl.textContent = '0';
        if (noResultsEl) noResultsEl.style.display = 'block';
        return;
      }

      const defaultAvatar = '/assets/images/default-avatar.svg';
      let html = '';

      members.forEach(item => {
        const name = item.name || item.author || item.title || item.institution || 'Scholar';
        const inst = item.institution || '';
        const faculty = item.faculty || item.department || '';
        const fields = item.fields || '';
        const country = item.country || '';
        const url = item.site_url || item.url || '#';
        const avatar = item.avatar || defaultAvatar;
        const keywords = normalizeKeywords(item.keywords);
        const keywordsJoined = keywords.join(', ');

        const searchHaystack = [
          name,
          inst,
          faculty,
          fields,
          keywordsJoined,
          country,
          url.replace(/^https?:\/\//, '')
        ].join(' ').toLowerCase();

        html += `
          <div class="col-md-4 col-sm-6 col-xs-12 network-card-col"
               data-country="${escapeHtml(country.toLowerCase())}"
               data-country-raw="${escapeHtml(country)}"
               data-institution="${escapeHtml(inst.toLowerCase())}"
               data-institution-raw="${escapeHtml(inst)}"
               data-fields="${escapeHtml(fields.toLowerCase())}"
               data-fields-raw="${escapeHtml(fields)}"
               data-keywords="${escapeHtml(keywords.join(',').toLowerCase())}"
               data-keywords-raw="${escapeHtml(keywordsJoined)}"
               data-search="${escapeHtml(searchHaystack)}">
            <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="network-compact-card" itemscope itemtype="https://schema.org/Person">
              <div class="network-compact-avatar">
                <img src="${escapeHtml(avatar)}" onerror="this.onerror=null;this.src='${defaultAvatar}';" alt="${escapeHtml(name)}" itemprop="image">
              </div>
              <div class="network-compact-info">
                <h4 class="network-compact-name" itemprop="name">${escapeHtml(name)}</h4>
                <p class="network-compact-inst" itemprop="worksFor">${escapeHtml(inst)}</p>
              </div>
              <div class="network-hidden-seo">
                ${faculty ? `<span itemprop="department">${escapeHtml(faculty)}</span>` : ''}
                ${fields ? `<span itemprop="knowsAbout">${escapeHtml(fields)}</span>` : ''}
                ${country ? `<span itemprop="addressCountry">${escapeHtml(country)}</span>` : ''}
                ${keywordsJoined ? `<span itemprop="keywords">${escapeHtml(keywordsJoined)}</span>` : ''}
                <link itemprop="url" href="${escapeHtml(url)}">
              </div>
            </a>
          </div>
        `;
      });

      if (gridEl) {
        gridEl.innerHTML = html;
      }

      setupFiltering();
    }

    function setupFiltering() {
      const cards = Array.from(document.querySelectorAll('.network-card-col'));

      if (totalCountEl) totalCountEl.textContent = cards.length;
      if (currentCountEl) currentCountEl.textContent = cards.length;

      // Build unique sets
      const countries = new Set();
      const institutions = new Set();
      const fields = new Set();
      const keywords = new Set();

      cards.forEach(card => {
        const c = card.getAttribute('data-country-raw');
        const i = card.getAttribute('data-institution-raw');
        const f = card.getAttribute('data-fields-raw');
        const k = card.getAttribute('data-keywords-raw');

        if (c && c.trim()) countries.add(c.trim());
        if (i && i.trim()) institutions.add(i.trim());
        if (f && f.trim()) fields.add(f.trim());
        if (k && k.trim()) {
          k.split(',').forEach(item => {
            const trimmed = item.trim();
            if (trimmed) keywords.add(trimmed);
          });
        }
      });

      function populateSelect(selectEl, setValues) {
        if (!selectEl) return;
        const firstOpt = selectEl.options[0];
        const defaultText = firstOpt ? firstOpt.textContent : 'All';
        selectEl.innerHTML = '';
        const def = document.createElement('option');
        def.value = 'all';
        def.textContent = defaultText;
        selectEl.appendChild(def);

        Array.from(setValues).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).forEach(val => {
          const opt = document.createElement('option');
          opt.value = val.toLowerCase().trim();
          opt.textContent = val.trim();
          selectEl.appendChild(opt);
        });
      }

      populateSelect(selectCountry, countries);
      populateSelect(selectInstitution, institutions);
      populateSelect(selectField, fields);
      populateSelect(selectKeyword, keywords);

      function applyFilter() {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
        const selCountry = selectCountry ? selectCountry.value.toLowerCase().trim() : 'all';
        const selInst = selectInstitution ? selectInstitution.value.toLowerCase().trim() : 'all';
        const selField = selectField ? selectField.value.toLowerCase().trim() : 'all';
        const selKeyword = selectKeyword ? selectKeyword.value.toLowerCase().trim() : 'all';

        [selectCountry, selectInstitution, selectField, selectKeyword].forEach(sel => {
          if (sel) {
            if (sel.value !== 'all') {
              sel.classList.add('is-active');
            } else {
              sel.classList.remove('is-active');
            }
          }
        });

        let visible = 0;
        cards.forEach(card => {
          const cardCountry = (card.getAttribute('data-country') || '').trim();
          const cardInst = (card.getAttribute('data-institution') || '').trim();
          const cardField = (card.getAttribute('data-fields') || '').trim();
          const cardKeywords = (card.getAttribute('data-keywords') || '').split(',').map(x => x.trim());
          const cardSearch = (card.getAttribute('data-search') || '');

          const matchesCountry = selCountry === 'all' || cardCountry === selCountry;
          const matchesInst = selInst === 'all' || cardInst === selInst;
          const matchesField = selField === 'all' || cardField === selField;
          const matchesKeyword = selKeyword === 'all' || cardKeywords.includes(selKeyword);
          const matchesQuery = !query || cardSearch.includes(query);

          if (matchesCountry && matchesInst && matchesField && matchesKeyword && matchesQuery) {
            card.style.display = '';
            visible++;
          } else {
            card.style.display = 'none';
          }
        });

        if (currentCountEl) currentCountEl.textContent = visible;
        if (noResultsEl) noResultsEl.style.display = visible === 0 ? 'block' : 'none';
      }

      function resetAll(e) {
        if (e && e.preventDefault) e.preventDefault();
        if (searchInput) searchInput.value = '';
        if (selectCountry) selectCountry.value = 'all';
        if (selectInstitution) selectInstitution.value = 'all';
        if (selectField) selectField.value = 'all';
        if (selectKeyword) selectKeyword.value = 'all';
        applyFilter();
        if (searchInput) searchInput.focus();
      }

      if (searchInput) searchInput.addEventListener('input', applyFilter);
      if (selectCountry) selectCountry.addEventListener('change', applyFilter);
      if (selectInstitution) selectInstitution.addEventListener('change', applyFilter);
      if (selectField) selectField.addEventListener('change', applyFilter);
      if (selectKeyword) selectKeyword.addEventListener('change', applyFilter);
      resetBtns.forEach(btn => btn.addEventListener('click', resetAll));

      applyFilter();
    }

    function checkEngineVersion() {
      const card = document.getElementById('versionStatusCard');
      if (!card || card.getAttribute('data-version-checked') === 'true') return;
      card.setAttribute('data-version-checked', 'true');

      const localVer = card.getAttribute('data-local-version') || 'v0.1.1';
      const localDateStr = card.getAttribute('data-local-date') || '';
      const upstreamUrl = card.getAttribute('data-upstream-url') || 'https://raw.githubusercontent.com/BanaBirSebepVer/Academy/main/_data/version.yml';

      const msgPillUptodate = card.getAttribute('data-msg-pill-uptodate') || 'Up to date';
      const msgPillUpdate   = card.getAttribute('data-msg-pill-update') || 'Update';
      const msgPillCritical = card.getAttribute('data-msg-pill-critical') || 'Critical';
      const msgUptodate     = card.getAttribute('data-msg-uptodate') || 'Up to date';
      const msgNewRelease   = card.getAttribute('data-msg-new-release') || 'New release: %s';
      const msgPatch        = card.getAttribute('data-msg-patch-available') || 'New build available';
      const msgCritical     = card.getAttribute('data-msg-critical') || 'Critical: %s';

      const pill = document.getElementById('versionStatusPill');
      const statusText = document.getElementById('versionStatusText');

      function parseYaml(str) {
        const res = {};
        const lines = str.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const m = lines[i].match(/^\s*([a-zA-Z0-9_-]+)\s*:\s*["']?(.*?)["']?\s*$/);
          if (m) res[m[1]] = m[2].trim();
        }
        return res;
      }

      function parseSemVer(v) {
        return (v || '').replace(/^v/i, '').split('.').map(n => parseInt(n, 10) || 0);
      }

      function compareSemVer(v1, v2) {
        const p1 = parseSemVer(v1);
        const p2 = parseSemVer(v2);
        const len = Math.max(p1.length, p2.length);
        for (let i = 0; i < len; i++) {
          const n1 = p1[i] || 0;
          const n2 = p2[i] || 0;
          if (n1 > n2) return 1;
          if (n1 < n2) return -1;
        }
        return 0;
      }

      function parseDateMs(d) {
        if (!d) return 0;
        const ms = Date.parse(d);
        if (!isNaN(ms)) return ms;
        const m = d.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (m) return new Date(m[1], m[2] - 1, m[3]).getTime();
        return 0;
      }

      function setStatus(type, pillLabel, textHtml) {
        card.classList.remove('version-status-ok', 'version-status-warn', 'version-status-danger');
        card.classList.add('version-status-' + type);
        if (pill) pill.textContent = pillLabel;
        if (statusText) statusText.innerHTML = textHtml;
      }

      fetch(upstreamUrl, { cache: 'no-cache' })
        .then(res => {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.text();
        })
        .then(yamlText => {
          const upstream = parseYaml(yamlText);
          const upstreamVer = upstream.tag || upstream.version || '';
          const upstreamDateStr = upstream.build_date || '';

          if (!upstreamVer && !upstreamDateStr) return;

          const vDiff = compareSemVer(upstreamVer, localVer);
          const localDate = parseDateMs(localDateStr);
          const upstreamDate = parseDateMs(upstreamDateStr);

          const repoUrl = 'https://github.com/BanaBirSebepVer/Academy';

          if (vDiff > 0) {
            const pUp = parseSemVer(upstreamVer);
            const pLoc = parseSemVer(localVer);
            if ((pUp[0] || 0) > (pLoc[0] || 0)) {
              const text = msgCritical.replace('%s', upstreamVer);
              setStatus('danger', msgPillCritical, `<svg class="icon" aria-hidden="true"><use href="#icon-exclamation-circle"></use></svg> <a href="${repoUrl}/releases" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">${escapeHtml(text)}</a>`);
            } else {
              const text = msgNewRelease.replace('%s', upstreamVer);
              setStatus('warn', msgPillUpdate, `<svg class="icon" aria-hidden="true"><use href="#icon-arrow-circle-up"></use></svg> <a href="${repoUrl}/releases" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">${escapeHtml(text)}</a>`);
            }
          } else if (vDiff === 0 && upstreamDate > (localDate + (3600 * 1000))) {
            setStatus('warn', msgPillUpdate, `<svg class="icon" aria-hidden="true"><use href="#icon-arrow-circle-up"></use></svg> <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">${escapeHtml(msgPatch)}</a>`);
          } else {
            setStatus('ok', msgPillUptodate, `<svg class="icon" aria-hidden="true"><use href="#icon-check-circle"></use></svg> <span>${escapeHtml(msgUptodate)}</span>`);
          }
        })
        .catch(err => {
          console.warn('[Academy Version] Could not check upstream version.yml:', err);
        });
    }

    // 1. Check version status against upstream version.yml
    checkEngineVersion();

    // 2. Check local session cache first for instant render
    const cached = getCachedMembers();
    if (cached) {
      renderMembers(cached);
    }

    // 2. Fetch fresh members from database API
    fetch(endpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('Network API HTTP ' + res.status);
        return res.json();
      })
      .then(data => {
        const list = Array.isArray(data) ? data : (data.sites || data.members || []);
        setCachedMembers(list);
        renderMembers(list);
      })
      .catch(err => {
        console.warn('[Academy Network] Failed to load from central database API:', err);
        // If we already rendered from cache, keep it; otherwise show empty state
        if (!cached) {
          if (loadingEl) loadingEl.style.display = 'none';
          if (noResultsEl) noResultsEl.style.display = 'block';
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNetwork);
  } else {
    initNetwork();
  }

    // Global module bridge
    window.initNetwork = initNetwork;
})();

// =============================================================================
// Module: lesson.js
// =============================================================================
(function () {
  /**
   * Lesson Module
   * Handles syllabus timetable navigation, dynamic heading links, smooth scrolling,
   * interactive syllabus table with expandable weekly tabs, and grading card decoration.
   */

  // Helper for Turkish character normalization
  function normalizeStr(str) {
    return (str || '')
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, ' ')
      .trim();
  }

  function slugify(str) {
    return (str || '')
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  }

  function getHeadingIcon(title) {
    const norm = normalizeStr(title);
    if (/haftal|program|schedule|timetable|takvim|plan/.test(norm)) return 'clock';
    if (/notlandirma|not|sinav|grade|grading|exam|puan|degerlendirme|proje/.test(norm)) return 'pie-chart';
    if (/tamamla|bitir|kosul|gereksinim|requirement|terms|criteria/.test(norm)) return 'check-square';
    if (/cikti|outcome|hedef|kazanim|goal/.test(norm)) return 'graduation-cap';
    if (/onemli|notlar|politika|policy|important|rules|kural/.test(norm)) return 'exclamation-triangle';
    if (/okuma|reading|kitap|book|literatur|kaynak/.test(norm)) return 'book';
    if (/baglanti|link|useful|arac/.test(norm)) return 'external-link';
    if (/sunum|presentation|is akisi|workflow/.test(norm)) return 'tasks';
    if (/icerik|content|tanim|description|hakkinda|format|about/.test(norm)) return 'info-circle';
    return 'bookmark';
  }

  function scrollToTarget(el, targetId) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    window.scrollTo({
      top: Math.max(0, rect.top + scrollTop - 70),
      behavior: 'smooth'
    });
    if (history.pushState) {
      history.pushState(null, null, '#' + targetId);
    }
  }

  function initSingleLesson() {
    const markdownContainer = document.querySelector('.lesson-markdown');
    if (!markdownContainer) return;

    // 1. Decorate side-by-side grading cards & verify total percentage
    function decorateCard(card) {
      const elements = card.querySelectorAll('h4, p, strong');
      elements.forEach(function (el) {
        const text = el.textContent.trim();
        if (/^%?\d+(\.\d+)?%?$/.test(text) || /^%\d+/.test(text) || /\d+%\s*$/.test(text)) {
          if (el.tagName === 'H4' || (el.tagName === 'P' && text.length <= 6)) {
            el.classList.add('grading-percent');
          }
        }
      });
    }

    const explicitCards = markdownContainer.querySelectorAll('.grading-card');
    if (explicitCards.length > 0) {
      let currentGrid = null;
      let calculatedTotal = 0;

      explicitCards.forEach(function (card) {
        if (!currentGrid || card.previousElementSibling !== currentGrid) {
          if (!card.parentElement.classList.contains('grading-grid')) {
            currentGrid = document.createElement('div');
            currentGrid.className = 'grading-grid';
            card.parentNode.insertBefore(currentGrid, card);
          } else {
            currentGrid = card.parentElement;
          }
        }
        if (card.parentElement !== currentGrid) {
          currentGrid.appendChild(card);
        }
        decorateCard(card);

        const pctAttr = card.getAttribute('data-percentage');
        if (pctAttr) {
          calculatedTotal += parseFloat(pctAttr) || 0;
        } else {
          const pctEl = card.querySelector('.grading-percent');
          if (pctEl) {
            const m = pctEl.textContent.match(/(\d+(?:\.\d+)?)/);
            if (m) calculatedTotal += parseFloat(m[1]) || 0;
          }
        }
      });

      // Check if total is not 100% and warning is not already generated by Liquid
      if (calculatedTotal > 0 && calculatedTotal !== 100 && !markdownContainer.querySelector('.grading-warning')) {
        const warnBox = document.createElement('blockquote');
        warnBox.className = 'lesson-warning grading-warning';
        const isTr = document.documentElement.lang === 'tr';
        if (calculatedTotal < 100) {
          warnBox.innerHTML = isTr
            ? `<p>⚠️ <strong>Uyarı: Notlandırma Dağılımı Eksik!</strong> Toplam ağırlık <strong>%${calculatedTotal}</strong> olarak hesaplandı (Eksik: %${100 - calculatedTotal}). Toplam %100 olmalıdır.</p>`
            : `<p>⚠️ <strong>Warning: Incomplete Grading Weight!</strong> Total assessment weight is <strong>${calculatedTotal}%</strong> (short by ${100 - calculatedTotal}%). Total must equal 100%.</p>`;
        } else {
          warnBox.innerHTML = isTr
            ? `<p>⚠️ <strong>Uyarı: Notlandırma %100'ü Aşıyor!</strong> Toplam ağırlık <strong>%${calculatedTotal}</strong> olarak hesaplandı. Toplam %100 olmalıdır.</p>`
            : `<p>⚠️ <strong>Warning: Grading Weight Exceeds 100%!</strong> Total assessment weight is <strong>${calculatedTotal}%</strong>. Total must equal 100%.</p>`;
        }
        if (currentGrid) {
          currentGrid.parentNode.insertBefore(warnBox, currentGrid);
        }
      }
    }

    // 2. Interactive Weekly Syllabus Table with Expandable Accordion Drawers
    const syllabusTables = markdownContainer.querySelectorAll('table');
    syllabusTables.forEach(function (table) {
      const rows = Array.from(table.querySelectorAll('tbody tr'));
      const weekRows = rows.filter(function (row) {
        const firstCell = row.querySelector('td:first-child');
        if (!firstCell) return false;
        const numMatch = firstCell.textContent.trim().match(/^\**(\d+)\**/);
        return !!numMatch;
      });

      if (weekRows.length === 0) return;

      weekRows.forEach(function (row) {
        const firstCell = row.querySelector('td:first-child');
        const numMatch = firstCell.textContent.trim().match(/^\**(\d+)\**/);
        const weekNum = parseInt(numMatch[1], 10);

        row.classList.add('lesson-week-row');
        row.setAttribute('data-week-num', weekNum);

        // Append subtle toggle indicator arrow to the last cell
        const lastCell = row.querySelector('td:last-child');
        if (lastCell && !lastCell.querySelector('.week-toggle-arrow')) {
          const arrow = document.createElement('span');
          arrow.className = 'week-toggle-arrow';
          arrow.innerHTML = '&#9662;';
          lastCell.appendChild(arrow);
        }

        // Check if detail row already exists
        let detailRow = row.nextElementSibling;
        if (!detailRow || !detailRow.classList.contains('lesson-week-detail-row')) {
          detailRow = document.createElement('tr');
          detailRow.className = 'lesson-week-detail-row';
          detailRow.style.display = 'none';

          const detailCell = document.createElement('td');
          detailCell.colSpan = row.cells.length || 4;
          detailCell.className = 'lesson-week-detail-cell';

          const drawer = document.createElement('div');
          drawer.className = 'lesson-week-detail-drawer markdown-body';

          // Retrieve pre-rendered content from store
          const storedContent = document.getElementById('week-content-' + weekNum);
          if (storedContent && storedContent.innerHTML.trim() !== '') {
            drawer.innerHTML = storedContent.innerHTML;
          } else {
            // Fallback to topic + duty summary
            const topicCell = row.cells[1] ? row.cells[1].textContent.trim() : '';
            const dutyText = lastCell ? lastCell.textContent.replace('▾', '').replace('▿', '').trim() : '';
            drawer.innerHTML = `<h4>${topicCell}</h4><p>${dutyText}</p>`;
          }

          detailCell.appendChild(drawer);
          detailRow.appendChild(detailCell);
          row.parentNode.insertBefore(detailRow, row.nextSibling);
        }

        // Bind click handler: each time one week should show content otherwise they should be tr line
        row.addEventListener('click', function (e) {
          if (e.target.tagName === 'A') return;

          const isCurrentlyActive = row.classList.contains('active');

          // Close all other week rows and detail rows in this table
          table.querySelectorAll('tr.lesson-week-row.active').forEach(function (otherRow) {
            otherRow.classList.remove('active');
          });
          table.querySelectorAll('tr.lesson-week-detail-row').forEach(function (otherDetail) {
            otherDetail.style.display = 'none';
          });

          // Toggle this row
          if (!isCurrentlyActive) {
            row.classList.add('active');
            detailRow.style.display = 'table-row';
          }
        });
      });
    });

    // 3. Dynamic Timetable / Syllabus Navigation Bar
    const timetableBar = document.querySelector('.lesson-timetable-bar');
    if (!timetableBar) return;

    let linksContainer = timetableBar.querySelector('.lesson-timetable-links');

    // Find direct top-level syllabus headings in lesson markdown
    const directHeadings = Array.from(markdownContainer.children).filter(function (child) {
      if (!/^H[1-4]$/i.test(child.tagName)) return false;
      if (child.closest('.grading-card, blockquote, table, .modal, .lesson-week-detail-row')) return false;
      const text = child.textContent.trim();
      if (!text || /^%?\d+(\.\d+)?%?$/.test(text)) return false;
      return true;
    });

    // If server-rendered links container is missing or empty, generate buttons dynamically
    if (!linksContainer || linksContainer.children.length === 0) {
      if (!linksContainer) {
        linksContainer = document.createElement('div');
        linksContainer.className = 'lesson-timetable-links';
        const cta = timetableBar.querySelector('.lesson-timetable-cta');
        if (cta) {
          timetableBar.insertBefore(linksContainer, cta);
        } else {
          timetableBar.appendChild(linksContainer);
        }
      }

      if (directHeadings.length === 0) {
        const cta = timetableBar.querySelector('.lesson-timetable-cta');
        if (!cta) {
          timetableBar.style.display = 'none';
        } else {
          const titleSpan = timetableBar.querySelector('.lesson-timetable-title');
          if (titleSpan) titleSpan.style.display = 'none';
        }
      } else {
        directHeadings.forEach(function (heading) {
          if (!heading.id) {
            heading.id = slugify(heading.textContent);
          }
          const a = document.createElement('a');
          a.href = '#' + heading.id;
          a.className = 'btn btn-xs btn-default';
          const iconName = getHeadingIcon(heading.textContent);
          a.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#icon-${iconName}"></use></svg> ` + heading.textContent.trim();
          linksContainer.appendChild(a);
        });
      }
    }

    // 4. Bind smooth scrolling & ensure exact anchor target matching
    const timetableLinks = timetableBar.querySelectorAll('.lesson-timetable-links a[href^="#"], a[href^="#"].btn');

    timetableLinks.forEach(function (link) {
      const tid = link.getAttribute('href').substring(1);
      if (!tid) return;

      let targetEl = document.getElementById(tid);
      if (!targetEl) {
        const linkTextNorm = normalizeStr(link.textContent);
        for (let i = 0; i < directHeadings.length; i++) {
          const h = directHeadings[i];
          const hTextNorm = normalizeStr(h.textContent);
          if (hTextNorm === linkTextNorm || hTextNorm.indexOf(linkTextNorm) !== -1 || linkTextNorm.indexOf(hTextNorm) !== -1) {
            targetEl = h;
            break;
          }
        }
      }

      link.addEventListener('click', function (e) {
        e.preventDefault();
        if (targetEl) {
          scrollToTarget(targetEl, tid);
        } else {
          const fallback = document.getElementById(tid);
          if (fallback) scrollToTarget(fallback, tid);
        }
      });
    });

    // 5. Scroll spy for active timetable link
    if (directHeadings.length > 0 && timetableLinks.length > 0) {
      function onScrollSpy() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        let activeHeading = null;

        for (let i = 0; i < directHeadings.length; i++) {
          const h = directHeadings[i];
          const rect = h.getBoundingClientRect();
          const top = rect.top + scrollPos;
          if (top - 120 <= scrollPos) {
            activeHeading = h;
          } else {
            break;
          }
        }

        if (activeHeading) {
          const activeId = activeHeading.id;
          timetableLinks.forEach(function (l) {
            const href = l.getAttribute('href');
            if (href === '#' + activeId) {
              l.classList.add('active');
            } else {
              l.classList.remove('active');
            }
          });
        }
      }

      window.addEventListener('scroll', onScrollSpy, { passive: true });
      onScrollSpy();
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSingleLesson);
  } else {
    initSingleLesson();
  }

  window.initSingleLesson = initSingleLesson;
})();

// =============================================================================
// Module: contact/clipboard.js
// =============================================================================
(function () {
  /**
   * Contact Clipboard Helper
   * Module: assets/js/modules/contact/clipboard.js
   */

  function setupClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    if (!copyButtons || copyButtons.length === 0) return;

    copyButtons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(textToCopy);
          } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = textToCopy;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }

          // Show feedback with checkmark icon
          const originalHtml = btn.innerHTML;
          const feedbackText = btn.getAttribute('data-copied-text') || 'Copied!';
          btn.innerHTML = `<svg class="icon" style="color: var(--primary);" aria-hidden="true"><use href="#icon-check"></use></svg> ${feedbackText}`;
          btn.classList.add('copied');

          setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy to clipboard:', err);
        }
      });
    });
  }

    // Global module bridge
    window.setupClipboard = setupClipboard;
})();

// =============================================================================
// Module: contact/index.js
// =============================================================================
(function () {
  const setupClipboard = window.setupClipboard;

  /**
   * Contact Module (Aggregator & Initializer)
   * Module: assets/js/modules/contact/index.js
   */


  function initContact() {
    const contactPage = document.querySelector('.contact-page');
    if (!contactPage) return;

    // 1. Initialize copy to clipboard interactions
    setupClipboard();

    // 2. Prevent accidental iframe capturing on scroll until clicked
    const mapWrapper = document.querySelector('.contact-map-container, .contact-map-frame-wrapper');
    if (mapWrapper) {
      const iframe = mapWrapper.querySelector('iframe');
      if (iframe) {
        iframe.style.pointerEvents = 'none';
        mapWrapper.addEventListener('click', () => {
          iframe.style.pointerEvents = 'auto';
        });
        mapWrapper.addEventListener('mouseleave', () => {
          iframe.style.pointerEvents = 'none';
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContact);
  } else {
    initContact();
  }

    // Global module bridge
    window.initContact = initContact;
})();

// =============================================================================
// Module: schema.js
// =============================================================================
(function () {
  /**
   * Schema.org Semantic SEO Auto-Generator & Enricher Module
   * 
   * Ensures that academicians never have to manually write or format schema.org markup.
   * Inspects the page and DOM, detects page type (ScholarlyArticle, Course, Person,
   * BlogPosting, CollectionPage, etc.), validates server-rendered JSON-LD, and
   * automatically generates or enriches Schema.org structured data in document.head.
   */

  function initSchema() {
    try {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      let existingData = null;

      if (scriptTag) {
        try {
          existingData = JSON.parse(scriptTag.textContent.trim());
        } catch (e) {
          console.warn('[Schema.org] Existing JSON-LD was invalid, regenerating from DOM.', e);
          existingData = null;
        }
      }

      // If schema is missing or invalid, synthesize from page DOM automatically
      if (!existingData) {
        const generatedSchema = generateSchemaFromDOM();
        if (generatedSchema) {
          scriptTag = document.createElement('script');
          scriptTag.type = 'application/ld+json';
          scriptTag.textContent = JSON.stringify(generatedSchema, null, 2);
          document.head.appendChild(scriptTag);
          console.info(`[Schema.org] Auto-generated semantic schema: ${generatedSchema['@type'] || 'Graph'}`);
        }
        return;
      }

      // If schema already exists (from Jekyll), enrich with client-side dynamic values
      enrichSchema(existingData, scriptTag);
    } catch (err) {
      console.warn('[Schema.org] Automated schema engine encountered a non-fatal error:', err);
    }
  }

  /**
   * Automatically inspects DOM elements and generates a valid Schema.org structure
   */
  function generateSchemaFromDOM() {
    const url = window.location.href.split('#')[0];
    const title = (document.querySelector('h1')?.textContent || document.title || '').trim();
    const description = (
      document.querySelector('meta[name="description"]')?.getAttribute('content') ||
      document.querySelector('.article-body p, .pagecontents p, .entry-content p')?.textContent ||
      ''
    ).trim();

    // 1. Single Publication Detection
    const pubMetaEl = document.getElementById('publicationMetadata');
    if (pubMetaEl || document.querySelector('.single-publication-page')) {
      let meta = {};
      if (pubMetaEl) {
        try { meta = JSON.parse(pubMetaEl.textContent.trim()); } catch (e) {}
      }

      const pubType = meta.publication_type || '';
      let schemaType = 'ScholarlyArticle';
      if (/kitap bölümü|chapter/i.test(pubType)) schemaType = 'Chapter';
      else if (/kitap|book/i.test(pubType)) schemaType = 'Book';
      else if (/tez|thesis|dissertation/i.test(pubType)) schemaType = 'Thesis';

      return {
        '@context': 'https://schema.org',
        '@type': schemaType,
        'headline': meta.title || title,
        'name': meta.title || title,
        'url': url,
        'description': description,
        'inLanguage': meta.lang || document.documentElement.lang || 'tr',
        'datePublished': meta.year || meta.date || undefined,
        'author': meta.authors
          ? (Array.isArray(meta.authors) ? meta.authors : [meta.authors]).map(a => ({ '@type': 'Person', 'name': a }))
          : [{ '@type': 'Person', 'name': meta.author || 'Academician' }],
        'publisher': meta.publisher ? { '@type': 'Organization', 'name': meta.publisher } : undefined,
        'keywords': meta.keywords ? (Array.isArray(meta.keywords) ? meta.keywords.join(', ') : meta.keywords) : undefined
      };
    }

    // 2. Lesson / Course Detection
    if (document.querySelector('.single-lesson-page, .lesson-hero, .lesson-breadcrumb')) {
      const code = document.querySelector('.archive-badge-primary, .lesson-code')?.textContent?.trim() || '';
      const instName = document.querySelector('.lesson-inst-text, .lesson-institution')?.textContent?.trim() || 'University';

      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        'name': title,
        'courseCode': code,
        'description': description,
        'url': url,
        'provider': {
          '@type': 'EducationalOrganization',
          'name': instName
        }
      };
    }

    // 3. Homepage / CV Detection
    if (document.querySelector('.cv-homepage, .cv-hero')) {
      const name = document.querySelector('.cv-hero-name')?.textContent?.trim() || title;
      return {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        'url': url,
        'name': name,
        'description': description,
        'mainEntity': {
          '@type': 'Person',
          'name': name,
          'url': url,
          'description': description
        }
      };
    }

    // 4. Fallback Default WebPage
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': title,
      'description': description,
      'url': url
    };
  }

  /**
   * Enriches existing server-rendered schema with any client-side dynamic values
   */
  function enrichSchema(data, scriptTag) {
    let modified = false;

    // Enrich single publication with runtime DOI / link / keywords
    if (data['@type'] === 'ScholarlyArticle' || data['@type'] === 'Book' || data['@type'] === 'Chapter' || data['@type'] === 'Thesis') {
      const kwElements = Array.from(document.querySelectorAll('.pub-keyword-tag, .pub-card-kw-btn'));
      if (kwElements.length > 0 && !data.keywords) {
        data.keywords = kwElements.map(el => el.textContent.replace(/^#/, '').trim()).filter(Boolean).join(', ');
        modified = true;
      }
    }

    // Enrich Course schema with dynamic department or code if missing
    if (data['@type'] === 'Course' && !data.courseCode) {
      const codeEl = document.querySelector('.archive-badge-primary');
      if (codeEl) {
        data.courseCode = codeEl.textContent.trim();
        modified = true;
      }
    }

    if (modified && scriptTag) {
      scriptTag.textContent = JSON.stringify(data, null, 2);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchema);
  } else {
    initSchema();
  }
})();

// =============================================================================
// Module: analytics.js
// =============================================================================
(function () {
  /**
   * Community Open Analytics & Directory Registration Module
   * (academy.banabirsebepver.com)
   * -------------------------------------------------------------
   * 1. Automatically submits complete profile & network metadata on first visit
   *    and upon every site rebuild / settings update.
   * 2. Uses build-aware signature caching to guarantee data is refreshed when
   *    settings or builds change, while keeping routine pageviews lightweight.
   * 3. Self-heals: if the central database ever misses profile data for this site,
   *    it detects the server signal and immediately submits full registration.
   * 4. Resolves fully-qualified avatar and canonical URLs across all hosting providers.
   * 5. Automatically ignores local development/testing environments.
   */

  function computeSignature(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return 'build_sig_' + Math.abs(hash);
  }

  function resolveFullUrl(urlStr, baseUrl) {
    if (!urlStr) return '';
    if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
      // If referencing template demo on an adopter domain, correct it
      if (urlStr.toLowerCase().includes('banabirsebepver.github.io') && !window.location.hostname.toLowerCase().includes('banabirsebepver')) {
        try {
          const u = new URL(urlStr);
          return window.location.origin + u.pathname;
        } catch (e) {}
      }
      return urlStr;
    }
    try {
      return new URL(urlStr, baseUrl || window.location.href).href;
    } catch (e) {
      return urlStr;
    }
  }

  function initAnalytics() {
    const meta = document.querySelector('meta[name="academy-analytics"]');
    if (!meta) {
      return;
    }

    const hostname = window.location.hostname;

    // Automatically ignore local testing environments
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.local') ||
      hostname === ''
    ) {
      return;
    }

    const endpoint = meta.getAttribute('data-endpoint') || 'https://academy.banabirsebepver.com';
    const trackerPath = meta.getAttribute('data-tracker') || '/api/event.php';
    const registerPath = meta.getAttribute('data-register') || '/api/register.php';
    const metaBaseurl = (meta.getAttribute('data-baseurl') || '').trim();
    const metaSiteUrl = (meta.getAttribute('data-site-url') || '').trim();
    const metaBuildId = (meta.getAttribute('data-build-id') || '').trim();
    const metaBuildDate = (meta.getAttribute('data-build-date') || '').trim();

    // Compute unique per-site storage key so different repos never block each other
    let detectedSubpath = '';
    if (metaBaseurl) {
      detectedSubpath = metaBaseurl.replace(/^\/+|\/+$/g, '');
    } else if (hostname.endsWith('.github.io')) {
      const parts = window.location.pathname.split('/').filter(Boolean);
      if (parts.length > 0 && !['tr', 'en', 'yazilar', 'lessons', 'posts'].includes(parts[0]) && !parts[0].includes('.')) {
        detectedSubpath = parts[0];
      }
    }

    // Canonical site URL: auto-correct if _config.yml still points to template repository
    let canonicalSiteUrl = metaSiteUrl;
    if (!canonicalSiteUrl || !canonicalSiteUrl.toLowerCase().includes(hostname.toLowerCase())) {
      canonicalSiteUrl = window.location.origin + (detectedSubpath ? '/' + detectedSubpath : '');
    }

    const siteKey = hostname + (detectedSubpath ? '_' + detectedSubpath : '');
    const storageKey = 'academy_build_' + siteKey;

    // Check registration script and signature
    const regScript = document.getElementById('academy-registration-data');
    const rawContent = regScript ? regScript.textContent.trim() : '';
    const currentSig = rawContent ? computeSignature(rawContent) : ('fallback_' + siteKey + '_' + (metaBuildId || 'v1'));
    const isUpToDate = Boolean(localStorage.getItem(storageKey) === currentSig);

    // Construct standard pageview payload
    const payload = {
      hostname: hostname,
      site_url: canonicalSiteUrl,
      path: window.location.pathname + window.location.search,
      referrer: document.referrer || '',
      title: document.title || '',
      timestamp: new Date().toISOString()
    };

    // If not yet registered or if site has been rebuilt / settings changed, attach full profile
    let profile = null;
    let indexData = null;
    let buildId = metaBuildId;
    let buildTime = metaBuildDate || '';

    if (rawContent) {
      try {
        const parsed = JSON.parse(rawContent);
        profile = parsed.profile || {};
        indexData = parsed.index_data || {};
        buildId = parsed.build_id || metaBuildId;
        buildTime = parsed.build_time || metaBuildDate;
      } catch (e) {
        console.warn('[Academy Analytics] Could not parse registration JSON', e);
      }
    }

    if (!profile || !profile.author) {
      profile = {
        author: document.querySelector('meta[name="author"]')?.getAttribute('content') || document.title,
        title: document.title,
        site_url: canonicalSiteUrl,
        avatar: resolveFullUrl('/assets/images/default-avatar.svg', canonicalSiteUrl)
      };
    } else {
      // If site_url in profile points to template on an adopter site, update it
      if (!profile.site_url || !profile.site_url.toLowerCase().includes(hostname.toLowerCase())) {
        profile.site_url = canonicalSiteUrl;
      }
      // Ensure avatar is a fully-qualified URL
      profile.avatar = resolveFullUrl(profile.avatar || '/assets/images/default-avatar.svg', canonicalSiteUrl);
    }

    function sendFullRegistration() {
      const regUrl = endpoint + registerPath;
      const regPayload = {
        hostname: hostname,
        site_url: canonicalSiteUrl,
        build_id: buildId,
        build_time: buildTime,
        registered_at: new Date().toISOString(),
        profile: profile,
        index_data: indexData || {}
      };

      if (window.fetch) {
        fetch(regUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regPayload),
          keepalive: true
        }).then(function(res) {
          if (res.ok) {
            localStorage.setItem(storageKey, currentSig);
            console.info('[Academy Analytics] Site metadata synced via directory registrar.');
          }
        }).catch(function(err) {
          console.warn('[Academy Analytics] Register request failed:', err);
        });
      }
    }

    if (!isUpToDate) {
      payload.profile = profile;
      payload.index_data = indexData || {};
      payload.build_id = buildId;
      payload.build_time = buildTime;
      payload.needs_registration = true;
      console.info('[Academy Analytics] Submitting updated site metadata for:', (profile.author || hostname), '(' + canonicalSiteUrl + ')');
    }

    // 1. Send to event tracker (which also auto-registers/updates profile if attached)
    const trackerUrl = endpoint + trackerPath;
    if (window.fetch) {
      fetch(trackerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).then(function(res) {
        if (res.ok) {
          return res.json().catch(function() { return {}; });
        }
        return {};
      }).then(function(data) {
        if (data && data.needs_profile) {
          console.info('[Academy Analytics] Central directory requested profile sync, self-healing...');
          localStorage.removeItem(storageKey);
          sendFullRegistration();
        } else if (payload.needs_registration) {
          localStorage.setItem(storageKey, currentSig);
          console.info('[Academy Analytics] Site metadata synced via event collector.');
        }
      }).catch(function(err) {
        console.warn('[Academy Analytics] Event tracking failed:', err);
      });
    } else if (navigator.sendBeacon) {
      try {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        if (navigator.sendBeacon(trackerUrl, blob) && payload.needs_registration) {
          localStorage.setItem(storageKey, currentSig);
        }
      } catch (e) {}
    }

    // 2. Also send dedicated registration/sync ping if rebuilt or settings changed
    if (!isUpToDate) {
      sendFullRegistration();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
  } else {
    initAnalytics();
  }

    // Global module bridge
    window.initAnalytics = initAnalytics;
})();
