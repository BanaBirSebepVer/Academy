/**
 * Publications Module
 * Provides unified client-side search, publication-type filtering,
 * interactive keyword cloud filtering, and deep-linking via ?keyword= query param.
 */

import initCitationModule from './citation/index.js';

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

export { initPublications, initCitationModule };
export default initAll;
