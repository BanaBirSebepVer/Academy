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
      const useEl = this.querySelector('svg.icon use');
      const collapse = this.nextElementSibling;
      if (!collapse) return;

      setTimeout(function () {
        const isOpen = collapse.classList.contains('in');
        if (useEl) {
          useEl.setAttribute('href', isOpen ? '#icon-chevron-up' : '#icon-chevron-down');
        }
        if (icon) {
          if (isOpen) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
          } else {
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
