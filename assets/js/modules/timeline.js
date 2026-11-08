/**
 * Timeline Module
 * Handles expand/collapse toggling for academic timeline entries
 */

function initTimeline() {
  const $ = window.jQuery || window.$;
  if (!$) return;

  const $timeline = $('ul.timeline');
  if (!$timeline.length) return;

  // Open first item by default if none is open
  if (!$timeline.find('li.open').length) {
    $timeline.children().first().addClass('open').find('.text').slideDown(200);
  }

  // Toggle on subject click
  $timeline.on('click', 'li .data .subject', function (e) {
    e.preventDefault();
    const $item = $(this).closest('li');
    $item.toggleClass('open');
    $item.find('.text').slideToggle(250);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTimeline);
} else {
  initTimeline();
}

export default initTimeline;
