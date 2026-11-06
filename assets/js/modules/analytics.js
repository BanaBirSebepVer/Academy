/**
 * Community Open Analytics & Directory Registration Module
 * (academy.banabirsebepver.com)
 * -------------------------------------------------------------
 * 1. Automatically attaches registration metadata on first visit.
 * 2. Uses local signature caching to guarantee profile data NEVER repeats.
 * 3. Reports anonymous page views to the central community hub.
 * 4. Automatically ignores local development/testing environments.
 */

function computeSignature(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return 'reg_sig_' + Math.abs(hash);
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
  if (!canonicalSiteUrl || !canonicalSiteUrl.includes(hostname)) {
    canonicalSiteUrl = window.location.origin + (detectedSubpath ? '/' + detectedSubpath : '');
  }

  const siteKey = hostname + (detectedSubpath ? '_' + detectedSubpath : '');
  const storageKey = 'academy_reg_' + siteKey;

  // Check registration script and signature
  const regScript = document.getElementById('academy-registration-data');
  const rawContent = regScript ? regScript.textContent.trim() : '';
  const currentSig = rawContent ? computeSignature(rawContent) : ('fallback_' + siteKey);
  const isRegistered = Boolean(localStorage.getItem(storageKey) === currentSig);

  // Construct page payload
  const payload = {
    hostname: hostname,
    site_url: canonicalSiteUrl,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
    title: document.title || '',
    timestamp: new Date().toISOString()
  };

  // If not yet registered, attach full profile and index metadata
  let profile = null;
  let indexData = null;

  if (rawContent) {
    try {
      const parsed = JSON.parse(rawContent);
      profile = parsed.profile || {};
      indexData = parsed.index_data || {};
    } catch (e) {
      console.warn('[Academy Analytics] Could not parse registration JSON, synthesizing from DOM', e);
    }
  }

  if (!profile || !profile.author) {
    profile = {
      author: document.querySelector('meta[name="author"]')?.getAttribute('content') || document.title,
      title: document.title,
      site_url: canonicalSiteUrl
    };
  } else {
    // If site_url in profile points to BanaBirSebepVer on an adopter site, update it
    if (!profile.site_url || !profile.site_url.includes(hostname)) {
      profile.site_url = canonicalSiteUrl;
    }
  }

  if (!isRegistered) {
    payload.profile = profile;
    payload.index_data = indexData || {};
    payload.needs_registration = true;
    console.info('[Academy Analytics] Registering site for: ' + (profile.author || hostname) + ' (' + canonicalSiteUrl + ')');
  }

  // 1. Send to event tracker (which now also auto-registers if profile is attached)
  const trackerUrl = endpoint + trackerPath;
  if (window.fetch) {
    fetch(trackerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).then(function(res) {
      if (res.ok && payload.needs_registration) {
        localStorage.setItem(storageKey, currentSig);
        console.info('[Academy Analytics] Registration confirmed by event handler.');
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

  // 2. Also send dedicated registration ping if not registered
  if (!isRegistered) {
    const regUrl = endpoint + registerPath;
    const regPayload = {
      hostname: hostname,
      site_url: canonicalSiteUrl,
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
          console.info('[Academy Analytics] Registration confirmed by register handler.');
        }
      }).catch(function(err) {
        console.warn('[Academy Analytics] Register request failed:', err);
      });
    }
  }
}
