/**
 * Master JavaScript
 * Consolidates and imports all capability-specific modules
 */

import initNavigation from './modules/navigation.js';
import initSmoothScroll from './modules/scroll.js';
import initTimeline from './modules/timeline.js';
import initAccordion from './modules/accordion.js';
import initLesson from './modules/lesson.js';
import initPublications from './modules/publications.js';
import initArchive, { initFlexMasonry } from './modules/archive.js';
import initNetwork from './modules/network.js';
import initSchema from './modules/schema.js';
import initContact from './modules/contact/index.js';

function initAll() {
  if (typeof initNavigation === 'function') initNavigation();
  if (typeof initSmoothScroll === 'function') initSmoothScroll();
  if (typeof initTimeline === 'function') initTimeline();
  if (typeof initAccordion === 'function') initAccordion();
  if (typeof initLesson === 'function') initLesson();
  if (typeof initPublications === 'function') initPublications();
  if (typeof initArchive === 'function') initArchive();
  if (typeof initNetwork === 'function') initNetwork();
  if (typeof initSchema === 'function') initSchema();
  if (typeof initContact === 'function') initContact();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

export {
  initNavigation,
  initSmoothScroll,
  initTimeline,
  initAccordion,
  initLesson,
  initPublications,
  initArchive,
  initNetwork,
  initSchema,
  initContact,
  initFlexMasonry
};
