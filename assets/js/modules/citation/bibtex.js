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
export function generateBibTeX(pubData) {
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

export default generateBibTeX;
