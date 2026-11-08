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

export { initSchema };
export default initSchema;
