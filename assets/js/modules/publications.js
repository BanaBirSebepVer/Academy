/**
 * Publications Module
 * Delegates to the unified Archive module for publication filtering.
 */

import { createArchiveFilter } from './archive.js';

function initPublications() {
  createArchiveFilter({
    searchInputId: 'publicationSearchInput',
    filterBtnClass: '.pub-filter-btn, .pub-cat-btn',
    cardClass: '.publication-card-wrapper',
    noMatchId: 'noPubsMatch'
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPublications);
} else {
  initPublications();
}

export default initPublications;
