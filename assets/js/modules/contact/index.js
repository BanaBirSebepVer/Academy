/**
 * Contact Module (Aggregator & Initializer)
 * Module: assets/js/modules/contact/index.js
 */

import { setupClipboard } from './clipboard.js';

export default function initContact() {
  const contactPage = document.querySelector('.contact-page');
  if (!contactPage) return;

  // 1. Initialize copy to clipboard interactions
  setupClipboard();

  // 2. Prevent accidental iframe capturing on scroll until clicked
  const mapWrapper = document.querySelector('.contact-map-container, .contact-map-frame-wrapper');
  if (mapWrapper) {
    const iframe = mapWrapper.querySelector('iframe');
    if (iframe) {
      iframe.style.pointerEvents = 'none';
      mapWrapper.addEventListener('click', () => {
        iframe.style.pointerEvents = 'auto';
      });
      mapWrapper.addEventListener('mouseleave', () => {
        iframe.style.pointerEvents = 'none';
      });
    }
  }
}
