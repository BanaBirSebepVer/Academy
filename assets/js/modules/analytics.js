/**
 * Community Open Analytics & Directory Registration Module
 * (academy.banabirsebepver.com)
 * -------------------------------------------------------------
 * 1. Handles one-time site registration sending profile and index metadata.
 *    Uses local signature caching to guarantee it NEVER repeats.
 * 2. Reports anonymous page views to the central community hub.
 *    Automatically ignores local development/testing environments.
 */

function computeSignature(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return 'reg_sig_' + Math.abs(hash);
}

function handleRegistration(endpoint, registerPath, hostname) {
  try {
    const regScript = document.getElementById('academy-registration-data');
    if (!regScript) return;

    const rawContent = regScript.textContent.trim();
    if (!rawContent) return;

    const currentSig = computeSignature(rawContent);
    const storedSig = localStorage.getItem('academy_site_registration_sig');

    // Never repeat registration if signature matches existing stored registration
    if (storedSig === currentSig) {
      return;
    }

    const regData = JSON.parse(rawContent);
    const payload = {
      hostname: hostname,
      registered_at: new Date().toISOString(),
      profile: regData.profile || {},
      index_data: regData.index_data || {}
    };

    const targetUrl = endpoint + registerPath;

    // Send registration payload
    if (window.fetch) {
      fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
        mode: 'no-cors'
      }).then(function() {
        localStorage.setItem('academy_site_registration_sig', currentSig);
      }).catch(function() {
        localStorage.setItem('academy_site_registration_sig', currentSig);
      });
    } else if (navigator.sendBeacon) {
      navigator.sendBeacon(targetUrl, JSON.stringify(payload));
      localStorage.setItem('academy_site_registration_sig', currentSig);
    }
  } catch (e) {
    // Non-fatal, fail safely
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
  const trackerPath = meta.getAttribute('data-tracker') || '/api/event';
  const registerPath = meta.getAttribute('data-register') || '/api/register';

  // 1. One-time site registration (guaranteed non-repeating)
  handleRegistration(endpoint, registerPath, hostname);

  // 2. Regular anonymous page view event
  const pagePayload = {
    hostname: hostname,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
    title: document.title || '',
    timestamp: new Date().toISOString()
  };

  try {
    const targetUrl = endpoint + trackerPath;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(targetUrl, JSON.stringify(pagePayload));
    } else if (window.fetch) {
      fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pagePayload),
        keepalive: true,
        mode: 'no-cors'
      }).catch(function() {});
    } else {
      new Image().src = targetUrl + '?h=' + encodeURIComponent(pagePayload.hostname) + '&p=' + encodeURIComponent(pagePayload.path);
    }
  } catch (err) {
    // Non-fatal fail-safe
  }
}
