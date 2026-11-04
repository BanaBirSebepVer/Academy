/**
 * Academic Network Live Search & Multi-Select Dropdown Filter Module
 * -------------------------------------------------------------------
 * Provides real-time instant text search across all attributes and
 * multi-dimensional dropdown filtering for:
 *   - Countries
 *   - Universities / Institutions
 *   - Academic Fields
 *   - Keywords
 *
 * Automatically updates match counters and handles empty states.
 */

export default function initNetwork() {
  const networkContainer = document.querySelector('.network-page');
  if (!networkContainer) return;

  const searchInput = document.getElementById('networkSearchInput');
  const selectCountry = document.getElementById('networkFilterCountry');
  const selectInstitution = document.getElementById('networkFilterInstitution');
  const selectField = document.getElementById('networkFilterField');
  const selectKeyword = document.getElementById('networkFilterKeyword');
  const resetBtns = document.querySelectorAll('.network-reset-btn');
  const currentCountEl = document.getElementById('networkCurrentCount');
  const totalCountEl = document.getElementById('networkTotalCount');
  const noResultsEl = document.getElementById('networkNoResults');
  const cards = Array.from(document.querySelectorAll('.network-card-col'));

  if (!cards.length) return;

  // Set total count baseline
  if (totalCountEl) {
    totalCountEl.textContent = cards.length;
  }

  /**
   * Helper to populate dropdown options dynamically if not already populated
   */
  function populateDropdownIfEmpty(selectEl, values, defaultLabel) {
    if (!selectEl) return;
    if (selectEl.options.length <= 1) {
      // Clear except first
      const firstText = selectEl.options.length > 0 ? selectEl.options[0].textContent : defaultLabel;
      selectEl.innerHTML = '';
      const defaultOption = document.createElement('option');
      defaultOption.value = 'all';
      defaultOption.textContent = firstText || defaultLabel;
      selectEl.appendChild(defaultOption);

      values.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).forEach(val => {
        if (!val) return;
        const opt = document.createElement('option');
        opt.value = val.toLowerCase().trim();
        opt.textContent = val.trim();
        selectEl.appendChild(opt);
      });
    }
  }

  // Extract unique lists from DOM cards dataset
  const uniqueCountries = new Set();
  const uniqueInstitutions = new Set();
  const uniqueFields = new Set();
  const uniqueKeywords = new Set();

  cards.forEach(card => {
    const c = card.getAttribute('data-country-raw');
    const inst = card.getAttribute('data-institution-raw');
    const fld = card.getAttribute('data-fields-raw');
    const kws = card.getAttribute('data-keywords-raw');

    if (c) uniqueCountries.add(c.trim());
    if (inst) uniqueInstitutions.add(inst.trim());
    if (fld) uniqueFields.add(fld.trim());
    if (kws) {
      kws.split(',').forEach(k => {
        const trimmed = k.trim();
        if (trimmed) uniqueKeywords.add(trimmed);
      });
    }
  });

  populateDropdownIfEmpty(selectCountry, Array.from(uniqueCountries), 'All Countries');
  populateDropdownIfEmpty(selectInstitution, Array.from(uniqueInstitutions), 'All Universities');
  populateDropdownIfEmpty(selectField, Array.from(uniqueFields), 'All Fields');
  populateDropdownIfEmpty(selectKeyword, Array.from(uniqueKeywords), 'All Keywords');

  /**
   * Main Filter Logic
   */
  function filterNetwork() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const selCountry = selectCountry ? selectCountry.value.toLowerCase().trim() : 'all';
    const selInst = selectInstitution ? selectInstitution.value.toLowerCase().trim() : 'all';
    const selField = selectField ? selectField.value.toLowerCase().trim() : 'all';
    const selKeyword = selectKeyword ? selectKeyword.value.toLowerCase().trim() : 'all';

    // Highlight active select filters
    [selectCountry, selectInstitution, selectField, selectKeyword].forEach(sel => {
      if (sel) {
        if (sel.value !== 'all') {
          sel.classList.add('is-active');
        } else {
          sel.classList.remove('is-active');
        }
      }
    });

    let visibleCount = 0;

    cards.forEach(card => {
      const cardCountry = (card.getAttribute('data-country') || '').toLowerCase().trim();
      const cardInstitution = (card.getAttribute('data-institution') || '').toLowerCase().trim();
      const cardField = (card.getAttribute('data-fields') || '').toLowerCase().trim();
      const cardKeywords = (card.getAttribute('data-keywords') || '')
        .toLowerCase()
        .split(',')
        .map(k => k.trim());
      const cardSearchText = (card.getAttribute('data-search') || '').toLowerCase();

      // Check matches
      const matchesCountry = selCountry === 'all' || cardCountry === selCountry;
      const matchesInstitution = selInst === 'all' || cardInstitution === selInst;
      const matchesField = selField === 'all' || cardField === selField;
      const matchesKeyword = selKeyword === 'all' || cardKeywords.includes(selKeyword);
      const matchesQuery = !query || cardSearchText.includes(query);

      const isMatch = matchesCountry && matchesInstitution && matchesField && matchesKeyword && matchesQuery;

      if (isMatch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update Counter
    if (currentCountEl) {
      currentCountEl.textContent = visibleCount;
    }

    // Toggle Empty State
    if (noResultsEl) {
      noResultsEl.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  /**
   * Reset All Filters
   */
  function resetFilters(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (searchInput) searchInput.value = '';
    if (selectCountry) selectCountry.value = 'all';
    if (selectInstitution) selectInstitution.value = 'all';
    if (selectField) selectField.value = 'all';
    if (selectKeyword) selectKeyword.value = 'all';
    filterNetwork();
    if (searchInput) searchInput.focus();
  }

  // Bind input and change events
  if (searchInput) {
    searchInput.addEventListener('input', filterNetwork);
  }
  if (selectCountry) {
    selectCountry.addEventListener('change', filterNetwork);
  }
  if (selectInstitution) {
    selectInstitution.addEventListener('change', filterNetwork);
  }
  if (selectField) {
    selectField.addEventListener('change', filterNetwork);
  }
  if (selectKeyword) {
    selectKeyword.addEventListener('change', filterNetwork);
  }

  resetBtns.forEach(btn => {
    btn.addEventListener('click', resetFilters);
  });

  // Interactive Keyword Badges: Clicking a keyword tag filters by that keyword
  document.querySelectorAll('.network-keyword-badge').forEach(badge => {
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', (e) => {
      e.preventDefault();
      const rawKeyword = badge.getAttribute('data-keyword') || badge.textContent.replace(/^#/, '').trim();
      if (selectKeyword && rawKeyword) {
        const targetVal = rawKeyword.toLowerCase().trim();
        let foundOption = false;
        Array.from(selectKeyword.options).forEach(opt => {
          if (opt.value === targetVal) {
            selectKeyword.value = opt.value;
            foundOption = true;
          }
        });
        if (foundOption) {
          filterNetwork();
          // Scroll smoothly to controls
          const controlsCard = document.querySelector('.network-controls-card');
          if (controlsCard) {
            controlsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }
    });
  });

  // Run initial filter to set baseline counters
  filterNetwork();
}
