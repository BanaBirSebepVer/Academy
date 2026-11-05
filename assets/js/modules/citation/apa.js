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

export function formatApa(meta) {
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

export default formatApa;
