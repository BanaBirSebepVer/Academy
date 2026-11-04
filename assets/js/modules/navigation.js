/**
 * Navigation Module
 * Handles mobile drawer toggle, overlay dismiss, and submenu accordion behavior
 */

function initNavigation() {
  const $ = window.jQuery || window.$;
  if (!$) return;

  const $sidebar = $('#sidebar');
  const $main = $('#main');
  const $overlay = $('#overlay');
  const $mobileToggle = $('a.mobilemenu');

  // Mobile menu drawer toggle
  $mobileToggle.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $sidebar.toggleClass('sidebar-open');
    $main.toggleClass('sideIn');
    $overlay.toggleClass('active');
  });

  // Dismiss drawer when clicking on the dark backdrop
  $overlay.on('click', function () {
    $sidebar.removeClass('sidebar-open');
    $main.removeClass('sideIn');
    $overlay.removeClass('active');
  });

  // Submenu toggle for expandable menu items
  $('#navigation li.menu-item-has-children > span.submenu-trigger').on('click', function (e) {
    e.preventDefault();
    const $parent = $(this).parent();
    $parent.toggleClass('open');
    $parent.find('> ul.sub-menu').slideToggle(200);
  });

  // Ensure active submenu remains expanded on load
  $('#navigation li.menu-item-has-children.open > ul.sub-menu').show();

  // Close mobile drawer when clicking a link on mobile screens
  if ($(window).width() <= 991) {
    $('#navigation a').on('click', function () {
      if (!$(this).parent().hasClass('menu-item-has-children')) {
        $sidebar.removeClass('sidebar-open');
        $main.removeClass('sideIn');
        $overlay.removeClass('active');
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavigation);
} else {
  initNavigation();
}

export default initNavigation;
