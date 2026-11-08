/**
 * Citation Module Controller & Registry
 * Extensible modular citation manager supporting APA, IEEE, Oxford, and BiBTeX.
 * Renders citation buttons that show a preview tooltip on hover and copy to clipboard on click,
 * plus interactive BiBTeX copy and .bib export actions.
 */

import formatApa from './apa.js';
import formatIeee from './ieee.js';
import formatOxford from './oxford.js';
import generateBibTeX from './bibtex.js';

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
export function registerCitationStyle(id, config) {
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
export function generateCitation(styleId, meta) {
  const style = citationRegistry[styleId];
  if (!style || typeof style.formatter !== 'function') {
    return meta.citation || meta.title || '';
  }
  return style.formatter(meta);
}

/**
 * Helper to copy arbitrary text to clipboard with fallback
 */
export function copyToClipboard(text, callback) {
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
export function extractPubData(element, fallbackMeta) {
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
export function copyBibTeXAction(pubData, btnElement, feedbackText) {
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
export function exportBibTeXAction(pubData) {
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
export function initCitationModule() {
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

export default initCitationModule;
