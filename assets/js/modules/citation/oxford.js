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

export function formatOxford(meta) {
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

export default formatOxford;
