/**
 * Citation Module Controller & Registry
 * Extensible modular citation manager supporting APA, IEEE, Oxford, and future styles.
 * Renders citation buttons that show a preview tooltip on hover and copy to clipboard on click.
 */

import formatApa from './apa.js';
import formatIeee from './ieee.js';
import formatOxford from './oxford.js';

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
 * Initialize citation buttons and hover tooltips on the single publication page
 */
export function initCitationModule() {
  const widget = document.getElementById('pubCitationWidget');
  const metaEl = document.getElementById('publicationMetadata');
  if (!widget || !metaEl) return;

  let metadata = {};
  try {
    metadata = JSON.parse(metaEl.textContent || '{}');
  } catch (err) {
    console.error('Failed to parse publication metadata for citation module', err);
    return;
  }

  const container = document.getElementById('pubCiteButtonsGroup') || widget;
  container.innerHTML = '';

  const isEn = (metadata.lang === 'en' || document.documentElement.lang === 'en');
  const copiedLabel = widget.getAttribute('data-copied-text') || (isEn ? 'Copied!' : 'Kopyalandı!');
  const hintLabel = widget.getAttribute('data-hint-text') || (isEn ? 'Click button to copy citation' : 'Kopyalamak için butona tıklayın');

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
        <i class="fa fa-mouse-pointer"></i> <span class="pub-tooltip-hint-text">${hintLabel}</span>
      </div>
    `;
    document.body.appendChild(tooltip);
  }

  const tooltipTitle = tooltip.querySelector('.pub-tooltip-title');
  const tooltipBadge = tooltip.querySelector('.pub-tooltip-badge');
  const tooltipBody = tooltip.querySelector('.pub-tooltip-body');

  // Generate a button for each registered style
  Object.keys(citationRegistry).forEach(styleKey => {
    const style = citationRegistry[styleKey];
    const citationText = generateCitation(styleKey, metadata);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pub-cite-btn';
    btn.setAttribute('data-style', style.id);
    btn.setAttribute('data-citation', citationText);

    const initialHtml = `
      <i class="fa fa-quote-left"></i>
      <span class="pub-cite-name">${style.label}</span>
      <span class="pub-cite-action-icon"><i class="fa fa-copy"></i></span>
    `;
    btn.innerHTML = initialHtml;

    // Show Tooltip on Hover
    btn.addEventListener('mouseenter', function (e) {
      if (tooltipTitle) tooltipTitle.textContent = style.label;
      if (tooltipBadge) tooltipBadge.textContent = isEn ? style.subtitleEn : style.subtitle;
      if (tooltipBody) tooltipBody.textContent = citationText;

      positionTooltip(btn, tooltip);
      tooltip.classList.add('visible');
    });

    btn.addEventListener('mouseleave', function () {
      tooltip.classList.remove('visible');
    });

    btn.addEventListener('focus', function () {
      if (tooltipTitle) tooltipTitle.textContent = style.label;
      if (tooltipBadge) tooltipBadge.textContent = isEn ? style.subtitleEn : style.subtitle;
      if (tooltipBody) tooltipBody.textContent = citationText;
      positionTooltip(btn, tooltip);
      tooltip.classList.add('visible');
    });

    btn.addEventListener('blur', function () {
      tooltip.classList.remove('visible');
    });

    // Copy to clipboard on click
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      copyToClipboard(citationText, () => {
        btn.classList.add('copied');
        btn.innerHTML = `
          <i class="fa fa-check"></i>
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

  function positionTooltip(targetEl, tooltipEl) {
    const rect = targetEl.getBoundingClientRect();
    const tooltipWidth = 360;
    const padding = 12;

    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
    if (left < padding) left = padding;
    if (left + tooltipWidth > window.innerWidth - padding) {
      left = window.innerWidth - tooltipWidth - padding;
    }

    let top = rect.top - 10;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // If there is enough room on top, place above; otherwise place below
    tooltipEl.style.width = Math.min(tooltipWidth, window.innerWidth - 24) + 'px';
    tooltipEl.style.left = left + 'px';

    // Position above target by default
    tooltipEl.style.top = (rect.top + scrollY - 8) + 'px';
    tooltipEl.style.transform = 'translateY(-100%)';

    // Check if overflowing above viewport
    if (rect.top < 150) {
      // Place below
      tooltipEl.style.top = (rect.bottom + scrollY + 8) + 'px';
      tooltipEl.style.transform = 'none';
      tooltipEl.classList.add('arrow-top');
      tooltipEl.classList.remove('arrow-bottom');
    } else {
      tooltipEl.classList.add('arrow-bottom');
      tooltipEl.classList.remove('arrow-top');
    }
  }

  function copyToClipboard(text, callback) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(callback).catch(() => {
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
}

export default initCitationModule;
