/**
 * Smooth Scrolling Module
 * Handles smooth scrolling for in-page anchor navigation with offset calculation
 */

function initSmoothScroll() {
  const $ = window.jQuery || window.$;
  if (!$) return;

  $('a[href*="#"]:not([href="#"]):not([href="#sidebar"])').on('click', function () {
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
      location.hostname === this.hostname
    ) {
      const target = $(this.hash).length ? $(this.hash) : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate(
          {
            scrollTop: target.offset().top - 30
          },
          600
        );
        return false;
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSmoothScroll);
} else {
  initSmoothScroll();
}

export default initSmoothScroll;
