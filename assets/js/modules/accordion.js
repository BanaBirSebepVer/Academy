/**
 * Accordion Module
 * Handles conference presentations accordion toggle animation
 */

function initAccordion() {
  const accordionHeadings = document.querySelectorAll('.cv-accordion .panel-heading');
  if (!accordionHeadings.length) return;

  accordionHeadings.forEach(function (heading) {
    heading.addEventListener('click', function () {
      const icon = this.querySelector('i.fa');
      const collapse = this.nextElementSibling;
      if (!collapse) return;

      setTimeout(function () {
        if (collapse.classList.contains('in')) {
          if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          }
        } else {
          if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
          }
        }
      }, 150);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccordion);
} else {
  initAccordion();
}

export default initAccordion;
