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

  // Check registration script and signature
  const regScript = document.getElementById('academy-registration-data');
  const rawContent = regScript ? regScript.textContent.trim() : '';
  const currentSig = rawContent ? computeSignature(rawContent) : '';
  const storageKey = 'academy_site_reg_v3';
  const isRegistered = Boolean(currentSig && localStorage.getItem(storageKey) === currentSig);

  // Construct payload
  const payload = {
    hostname: hostname,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
    title: document.title || '',
    timestamp: new Date().toISOString()
  };

  // If not yet registered, attach full profile and index metadata
  let regData = null;
  if (!isRegistered && rawContent) {
    try {
      regData = JSON.parse(rawContent);
      payload.profile = regData.profile || {};
      payload.index_data = regData.index_data || {};
      payload.needs_registration = true;
    } catch (e) {}
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
      }
    }).catch(function() {});
  } else if (navigator.sendBeacon) {
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon(trackerUrl, blob) && payload.needs_registration) {
        localStorage.setItem(storageKey, currentSig);
      }
    } catch (e) {}
  }

  // 2. Also send dedicated registration ping if not registered
  if (!isRegistered && regData) {
    const regUrl = endpoint + registerPath;
    const regPayload = {
      hostname: hostname,
      registered_at: new Date().toISOString(),
      profile: regData.profile || {},
      index_data: regData.index_data || {}
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
        }
      }).catch(function() {});
    }
  }
}
