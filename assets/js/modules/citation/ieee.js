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

export function formatIeee(meta) {
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

export default formatIeee;
