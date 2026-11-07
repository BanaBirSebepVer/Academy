/**
 * Community Open Analytics & Directory Registration Module
 * (academy.banabirsebepver.com)
 * -------------------------------------------------------------
 * 1. Automatically submits complete profile & network metadata on first visit
 *    and upon every site rebuild / settings update.
 * 2. Uses build-aware signature caching to guarantee data is refreshed when
 *    settings or builds change, while keeping routine pageviews lightweight.
 * 3. Self-heals: if the central database ever misses profile data for this site,
 *    it detects the server signal and immediately submits full registration.
 * 4. Resolves fully-qualified avatar and canonical URLs across all hosting providers.
 * 5. Automatically ignores local development/testing environments.
 */

function computeSignature(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return 'build_sig_' + Math.abs(hash);
}

function resolveFullUrl(urlStr, baseUrl) {
  if (!urlStr) return '';
  if (urlStr.startsWith('http://') || urlStr.startsWith('https://')) {
    // If referencing template demo on an adopter domain, correct it
    if (urlStr.toLowerCase().includes('banabirsebepver.github.io') && !window.location.hostname.toLowerCase().includes('banabirsebepver')) {
      try {
        const u = new URL(urlStr);
        return window.location.origin + u.pathname;
      } catch (e) {}
    }
    return urlStr;
  }
  try {
    return new URL(urlStr, baseUrl || window.location.href).href;
  } catch (e) {
    return urlStr;
  }
}

export default function initAnalytics() {
  const meta = document.querySelector('meta[name="academy-analytics"]');
  if (!meta) {
    return;
  }

  const hostname = window.location.hostname;

  // Automatically ignore local testing environments
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local') ||
    hostname === ''
  ) {
    return;
  }

  const endpoint = meta.getAttribute('data-endpoint') || 'https://academy.banabirsebepver.com';
  const trackerPath = meta.getAttribute('data-tracker') || '/api/event.php';
  const registerPath = meta.getAttribute('data-register') || '/api/register.php';
  const metaBaseurl = (meta.getAttribute('data-baseurl') || '').trim();
  const metaSiteUrl = (meta.getAttribute('data-site-url') || '').trim();
  const metaBuildId = (meta.getAttribute('data-build-id') || '').trim();
  const metaBuildDate = (meta.getAttribute('data-build-date') || '').trim();

  // Compute unique per-site storage key so different repos never block each other
  let detectedSubpath = '';
  if (metaBaseurl) {
    detectedSubpath = metaBaseurl.replace(/^\/+|\/+$/g, '');
  } else if (hostname.endsWith('.github.io')) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length > 0 && !['tr', 'en', 'yazilar', 'lessons', 'posts'].includes(parts[0]) && !parts[0].includes('.')) {
      detectedSubpath = parts[0];
    }
  }

  // Canonical site URL: auto-correct if _config.yml still points to template repository
  let canonicalSiteUrl = metaSiteUrl;
  if (!canonicalSiteUrl || !canonicalSiteUrl.toLowerCase().includes(hostname.toLowerCase())) {
    canonicalSiteUrl = window.location.origin + (detectedSubpath ? '/' + detectedSubpath : '');
  }

  const siteKey = hostname + (detectedSubpath ? '_' + detectedSubpath : '');
  const storageKey = 'academy_build_' + siteKey;

  // Check registration script and signature
  const regScript = document.getElementById('academy-registration-data');
  const rawContent = regScript ? regScript.textContent.trim() : '';
  const currentSig = rawContent ? computeSignature(rawContent) : ('fallback_' + siteKey + '_' + (metaBuildId || 'v1'));
  const isUpToDate = Boolean(localStorage.getItem(storageKey) === currentSig);

  // Construct standard pageview payload
  const payload = {
    hostname: hostname,
    site_url: canonicalSiteUrl,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
    title: document.title || '',
    timestamp: new Date().toISOString()
  };

  // If not yet registered or if site has been rebuilt / settings changed, attach full profile
  let profile = null;
  let indexData = null;
  let buildId = metaBuildId;
  let buildTime = metaBuildDate || '';

  if (rawContent) {
    try {
      const parsed = JSON.parse(rawContent);
      profile = parsed.profile || {};
      indexData = parsed.index_data || {};
      buildId = parsed.build_id || metaBuildId;
      buildTime = parsed.build_time || metaBuildDate;
    } catch (e) {
      console.warn('[Academy Analytics] Could not parse registration JSON', e);
    }
  }

  if (!profile || !profile.author) {
    profile = {
      author: document.querySelector('meta[name="author"]')?.getAttribute('content') || document.title,
      title: document.title,
      site_url: canonicalSiteUrl,
      avatar: resolveFullUrl('/assets/images/default-avatar.svg', canonicalSiteUrl)
    };
  } else {
    // If site_url in profile points to template on an adopter site, update it
    if (!profile.site_url || !profile.site_url.toLowerCase().includes(hostname.toLowerCase())) {
      profile.site_url = canonicalSiteUrl;
    }
    // Ensure avatar is a fully-qualified URL
    profile.avatar = resolveFullUrl(profile.avatar || '/assets/images/default-avatar.svg', canonicalSiteUrl);
  }

  function sendFullRegistration() {
    const regUrl = endpoint + registerPath;
    const regPayload = {
      hostname: hostname,
      site_url: canonicalSiteUrl,
      build_id: buildId,
      build_time: buildTime,
      registered_at: new Date().toISOString(),
      profile: profile,
      index_data: indexData || {}
    };

    if (window.fetch) {
      fetch(regUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regPayload),
        keepalive: true
      }).then(function(res) {
        if (res.ok) {
          localStorage.setItem(storageKey, currentSig);
          console.info('[Academy Analytics] Site metadata synced via directory registrar.');
        }
      }).catch(function(err) {
        console.warn('[Academy Analytics] Register request failed:', err);
      });
    }
  }

  if (!isUpToDate) {
    payload.profile = profile;
    payload.index_data = indexData || {};
    payload.build_id = buildId;
    payload.build_time = buildTime;
    payload.needs_registration = true;
    console.info('[Academy Analytics] Submitting updated site metadata for:', (profile.author || hostname), '(' + canonicalSiteUrl + ')');
  }

  // 1. Send to event tracker (which also auto-registers/updates profile if attached)
  const trackerUrl = endpoint + trackerPath;
  if (window.fetch) {
    fetch(trackerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).then(function(res) {
      if (res.ok) {
        return res.json().catch(function() { return {}; });
      }
      return {};
    }).then(function(data) {
      if (data && data.needs_profile) {
        console.info('[Academy Analytics] Central directory requested profile sync, self-healing...');
        localStorage.removeItem(storageKey);
        sendFullRegistration();
      } else if (payload.needs_registration) {
        localStorage.setItem(storageKey, currentSig);
        console.info('[Academy Analytics] Site metadata synced via event collector.');
      }
    }).catch(function(err) {
      console.warn('[Academy Analytics] Event tracking failed:', err);
    });
  } else if (navigator.sendBeacon) {
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon(trackerUrl, blob) && payload.needs_registration) {
        localStorage.setItem(storageKey, currentSig);
      }
    } catch (e) {}
  }

  // 2. Also send dedicated registration/sync ping if rebuilt or settings changed
  if (!isUpToDate) {
    sendFullRegistration();
  }
}
