/**
 * Academic Network Live Directory & Filter Module
 * -------------------------------------------------------------------
 * Dynamically loads verified academic sites from the central database API,
 * renders member cards with fully-qualified avatars, and provides instant
 * live search & multi-dimensional dropdown filtering for:
 *   - Countries
 *   - Universities / Institutions
 *   - Academic Fields
 *   - Keywords
 */

const CACHE_KEY = 'academy_network_cache_v2';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

export default function initNetwork() {
  const networkContainer = document.querySelector('.network-page');
  if (!networkContainer) return;

  const endpoint = networkContainer.getAttribute('data-endpoint') || 'https://academy.banabirsebepver.com/api/network.php';
  const gridEl = document.getElementById('networkGrid');
  const loadingEl = document.getElementById('networkLoading');
  const searchInput = document.getElementById('networkSearchInput');
  const selectCountry = document.getElementById('networkFilterCountry');
  const selectInstitution = document.getElementById('networkFilterInstitution');
  const selectField = document.getElementById('networkFilterField');
  const selectKeyword = document.getElementById('networkFilterKeyword');
  const resetBtns = document.querySelectorAll('.network-reset-btn');
  const currentCountEl = document.getElementById('networkCurrentCount');
  const totalCountEl = document.getElementById('networkTotalCount');
  const noResultsEl = document.getElementById('networkNoResults');

  function getCachedMembers() {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.timestamp < CACHE_TTL_MS && Array.isArray(data.members)) {
        return data.members;
      }
    } catch (e) {}
    return null;
  }

  function setCachedMembers(members) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        members: members
      }));
    } catch (e) {}
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalizeKeywords(kws) {
    if (!kws) return [];
    if (Array.isArray(kws)) return kws.map(k => String(k).trim()).filter(Boolean);
    if (typeof kws === 'string') {
      try {
        const parsed = JSON.parse(kws);
        if (Array.isArray(parsed)) return parsed.map(k => String(k).trim()).filter(Boolean);
      } catch (e) {}
      return kws.split(',').map(k => k.trim()).filter(Boolean);
    }
    return [];
  }

  function renderMembers(members) {
    if (loadingEl) {
      loadingEl.style.display = 'none';
    }

    if (!Array.isArray(members) || members.length === 0) {
      if (gridEl) gridEl.innerHTML = '';
      if (currentCountEl) currentCountEl.textContent = '0';
      if (totalCountEl) totalCountEl.textContent = '0';
      if (noResultsEl) noResultsEl.style.display = 'block';
      return;
    }

    const defaultAvatar = '/assets/images/default-avatar.svg';
    let html = '';

    members.forEach(item => {
      const name = item.name || item.author || item.title || item.institution || 'Scholar';
      const inst = item.institution || '';
      const faculty = item.faculty || item.department || '';
      const fields = item.fields || '';
      const country = item.country || '';
      const url = item.site_url || item.url || '#';
      const avatar = item.avatar || defaultAvatar;
      const keywords = normalizeKeywords(item.keywords);
      const keywordsJoined = keywords.join(', ');

      const searchHaystack = [
        name,
        inst,
        faculty,
        fields,
        keywordsJoined,
        country,
        url.replace(/^https?:\/\//, '')
      ].join(' ').toLowerCase();

      html += `
        <div class="col-md-4 col-sm-6 col-xs-12 network-card-col"
             data-country="${escapeHtml(country.toLowerCase())}"
             data-country-raw="${escapeHtml(country)}"
             data-institution="${escapeHtml(inst.toLowerCase())}"
             data-institution-raw="${escapeHtml(inst)}"
             data-fields="${escapeHtml(fields.toLowerCase())}"
             data-fields-raw="${escapeHtml(fields)}"
             data-keywords="${escapeHtml(keywords.join(',').toLowerCase())}"
             data-keywords-raw="${escapeHtml(keywordsJoined)}"
             data-search="${escapeHtml(searchHaystack)}">
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="network-compact-card" itemscope itemtype="https://schema.org/Person">
            <div class="network-compact-avatar">
              <img src="${escapeHtml(avatar)}" onerror="this.onerror=null;this.src='${defaultAvatar}';" alt="${escapeHtml(name)}" itemprop="image">
            </div>
            <div class="network-compact-info">
              <h4 class="network-compact-name" itemprop="name">${escapeHtml(name)}</h4>
              <p class="network-compact-inst" itemprop="worksFor">${escapeHtml(inst)}</p>
            </div>
            <div class="network-hidden-seo">
              ${faculty ? `<span itemprop="department">${escapeHtml(faculty)}</span>` : ''}
              ${fields ? `<span itemprop="knowsAbout">${escapeHtml(fields)}</span>` : ''}
              ${country ? `<span itemprop="addressCountry">${escapeHtml(country)}</span>` : ''}
              ${keywordsJoined ? `<span itemprop="keywords">${escapeHtml(keywordsJoined)}</span>` : ''}
              <link itemprop="url" href="${escapeHtml(url)}">
            </div>
          </a>
        </div>
      `;
    });

    if (gridEl) {
      gridEl.innerHTML = html;
    }

    setupFiltering();
  }

  function setupFiltering() {
    const cards = Array.from(document.querySelectorAll('.network-card-col'));

    if (totalCountEl) totalCountEl.textContent = cards.length;
    if (currentCountEl) currentCountEl.textContent = cards.length;

    // Build unique sets
    const countries = new Set();
    const institutions = new Set();
    const fields = new Set();
    const keywords = new Set();

    cards.forEach(card => {
      const c = card.getAttribute('data-country-raw');
      const i = card.getAttribute('data-institution-raw');
      const f = card.getAttribute('data-fields-raw');
      const k = card.getAttribute('data-keywords-raw');

      if (c && c.trim()) countries.add(c.trim());
      if (i && i.trim()) institutions.add(i.trim());
      if (f && f.trim()) fields.add(f.trim());
      if (k && k.trim()) {
        k.split(',').forEach(item => {
          const trimmed = item.trim();
          if (trimmed) keywords.add(trimmed);
        });
      }
    });

    function populateSelect(selectEl, setValues) {
      if (!selectEl) return;
      const firstOpt = selectEl.options[0];
      const defaultText = firstOpt ? firstOpt.textContent : 'All';
      selectEl.innerHTML = '';
      const def = document.createElement('option');
      def.value = 'all';
      def.textContent = defaultText;
      selectEl.appendChild(def);

      Array.from(setValues).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).forEach(val => {
        const opt = document.createElement('option');
        opt.value = val.toLowerCase().trim();
        opt.textContent = val.trim();
        selectEl.appendChild(opt);
      });
    }

    populateSelect(selectCountry, countries);
    populateSelect(selectInstitution, institutions);
    populateSelect(selectField, fields);
    populateSelect(selectKeyword, keywords);

    function applyFilter() {
      const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
      const selCountry = selectCountry ? selectCountry.value.toLowerCase().trim() : 'all';
      const selInst = selectInstitution ? selectInstitution.value.toLowerCase().trim() : 'all';
      const selField = selectField ? selectField.value.toLowerCase().trim() : 'all';
      const selKeyword = selectKeyword ? selectKeyword.value.toLowerCase().trim() : 'all';

      [selectCountry, selectInstitution, selectField, selectKeyword].forEach(sel => {
        if (sel) {
          if (sel.value !== 'all') {
            sel.classList.add('is-active');
          } else {
            sel.classList.remove('is-active');
          }
        }
      });

      let visible = 0;
      cards.forEach(card => {
        const cardCountry = (card.getAttribute('data-country') || '').trim();
        const cardInst = (card.getAttribute('data-institution') || '').trim();
        const cardField = (card.getAttribute('data-fields') || '').trim();
        const cardKeywords = (card.getAttribute('data-keywords') || '').split(',').map(x => x.trim());
        const cardSearch = (card.getAttribute('data-search') || '');

        const matchesCountry = selCountry === 'all' || cardCountry === selCountry;
        const matchesInst = selInst === 'all' || cardInst === selInst;
        const matchesField = selField === 'all' || cardField === selField;
        const matchesKeyword = selKeyword === 'all' || cardKeywords.includes(selKeyword);
        const matchesQuery = !query || cardSearch.includes(query);

        if (matchesCountry && matchesInst && matchesField && matchesKeyword && matchesQuery) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (currentCountEl) currentCountEl.textContent = visible;
      if (noResultsEl) noResultsEl.style.display = visible === 0 ? 'block' : 'none';
    }

    function resetAll(e) {
      if (e && e.preventDefault) e.preventDefault();
      if (searchInput) searchInput.value = '';
      if (selectCountry) selectCountry.value = 'all';
      if (selectInstitution) selectInstitution.value = 'all';
      if (selectField) selectField.value = 'all';
      if (selectKeyword) selectKeyword.value = 'all';
      applyFilter();
      if (searchInput) searchInput.focus();
    }

    if (searchInput) searchInput.addEventListener('input', applyFilter);
    if (selectCountry) selectCountry.addEventListener('change', applyFilter);
    if (selectInstitution) selectInstitution.addEventListener('change', applyFilter);
    if (selectField) selectField.addEventListener('change', applyFilter);
    if (selectKeyword) selectKeyword.addEventListener('change', applyFilter);
    resetBtns.forEach(btn => btn.addEventListener('click', resetAll));

    applyFilter();
  }

  // 1. Check local session cache first for instant render
  const cached = getCachedMembers();
  if (cached) {
    renderMembers(cached);
  }

  // 2. Fetch fresh members from database API
  fetch(endpoint, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  })
    .then(res => {
      if (!res.ok) throw new Error('Network API HTTP ' + res.status);
      return res.json();
    })
    .then(data => {
      const list = Array.isArray(data) ? data : (data.sites || data.members || []);
      setCachedMembers(list);
      renderMembers(list);
    })
    .catch(err => {
      console.warn('[Academy Network] Failed to load from central database API:', err);
      // If we already rendered from cache, keep it; otherwise show empty state
      if (!cached) {
        if (loadingEl) loadingEl.style.display = 'none';
        if (noResultsEl) noResultsEl.style.display = 'block';
      }
    });
}
