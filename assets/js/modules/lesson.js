/**
 * Lesson Module
 * Handles syllabus timetable navigation, dynamic heading links, smooth scrolling,
 * and grading card decoration for single lesson pages.
 */

// Helper for Turkish character normalization
function normalizeStr(str) {
  return (str || '')
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, ' ')
    .trim();
}

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function getHeadingIcon(title) {
  const norm = normalizeStr(title);
  if (/haftal|program|schedule|timetable|takvim|plan/.test(norm)) return 'fa-clock-o';
  if (/notlandirma|not|sinav|grade|grading|exam|puan|degerlendirme|proje/.test(norm)) return 'fa-pie-chart';
  if (/tamamla|bitir|kosul|gereksinim|requirement|terms|criteria/.test(norm)) return 'fa-check-square-o';
  if (/cikti|outcome|hedef|kazanim|goal/.test(norm)) return 'fa-graduation-cap';
  if (/onemli|notlar|politika|policy|important|rules|kural/.test(norm)) return 'fa-exclamation-triangle';
  if (/okuma|reading|kitap|book|literatur|kaynak/.test(norm)) return 'fa-book';
  if (/baglanti|link|useful|arac/.test(norm)) return 'fa-external-link';
  if (/sunum|presentation|is akisi|workflow/.test(norm)) return 'fa-tasks';
  if (/icerik|content|tanim|description|hakkinda|format|about/.test(norm)) return 'fa-info-circle';
  return 'fa-bookmark-o';
}

function scrollToTarget(el, targetId) {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  window.scrollTo({
    top: Math.max(0, rect.top + scrollTop - 70),
    behavior: 'smooth'
  });
  if (history.pushState) {
    history.pushState(null, null, '#' + targetId);
  }
}

function initSingleLesson() {
  const markdownContainer = document.querySelector('.lesson-markdown');
  if (!markdownContainer) return;

  // 1. Decorate side-by-side grading cards
  function decorateCard(card) {
    const elements = card.querySelectorAll('h4, p, strong');
    elements.forEach(function (el) {
      const text = el.textContent.trim();
      if (/^%?\d+(\.\d+)?%?$/.test(text) || /^%\d+/.test(text) || /\d+%\s*$/.test(text)) {
        if (el.tagName === 'H4' || (el.tagName === 'P' && text.length <= 6)) {
          el.classList.add('grading-percent');
        }
      }
    });
  }

  const explicitCards = markdownContainer.querySelectorAll('.grading-card');
  if (explicitCards.length > 0) {
    let currentGrid = null;
    explicitCards.forEach(function (card) {
      if (!currentGrid || card.previousElementSibling !== currentGrid) {
        currentGrid = document.createElement('div');
        currentGrid.className = 'grading-grid';
        card.parentNode.insertBefore(currentGrid, card);
      }
      currentGrid.appendChild(card);
      decorateCard(card);
    });
  }

  // 2. Dynamic Timetable / Syllabus Navigation Bar
  const timetableBar = document.querySelector('.lesson-timetable-bar');
  if (!timetableBar) return;

  let linksContainer = timetableBar.querySelector('.lesson-timetable-links');

  // Find direct top-level syllabus headings in lesson markdown
  const directHeadings = Array.from(markdownContainer.children).filter(function (child) {
    if (!/^H[1-4]$/i.test(child.tagName)) return false;
    if (child.closest('.grading-card, blockquote, table, .modal')) return false;
    const text = child.textContent.trim();
    if (!text || /^%?\d+(\.\d+)?%?$/.test(text)) return false;
    return true;
  });

  // If server-rendered links container is missing or empty, generate buttons dynamically
  if (!linksContainer || linksContainer.children.length === 0) {
    if (!linksContainer) {
      linksContainer = document.createElement('div');
      linksContainer.className = 'lesson-timetable-links';
      const cta = timetableBar.querySelector('.lesson-timetable-cta');
      if (cta) {
        timetableBar.insertBefore(linksContainer, cta);
      } else {
        timetableBar.appendChild(linksContainer);
      }
    }

    if (directHeadings.length === 0) {
      const cta = timetableBar.querySelector('.lesson-timetable-cta');
      if (!cta) {
        timetableBar.style.display = 'none';
      } else {
        const titleSpan = timetableBar.querySelector('.lesson-timetable-title');
        if (titleSpan) titleSpan.style.display = 'none';
      }
    } else {
      directHeadings.forEach(function (heading) {
        if (!heading.id) {
          heading.id = slugify(heading.textContent);
        }
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.className = 'btn btn-xs btn-default';
        const iconClass = getHeadingIcon(heading.textContent);
        a.innerHTML = '<i class="fa ' + iconClass + '"></i> ' + heading.textContent.trim();
        linksContainer.appendChild(a);
      });
    }
  }

  // 3. Bind smooth scrolling & ensure exact anchor target matching
  const timetableLinks = timetableBar.querySelectorAll('.lesson-timetable-links a[href^="#"], a[href^="#"].btn');

  timetableLinks.forEach(function (link) {
    const tid = link.getAttribute('href').substring(1);
    if (!tid) return;

    // Verify target element exists in DOM; if not, match against direct headings
    let targetEl = document.getElementById(tid);
    if (!targetEl) {
      const linkTextNorm = normalizeStr(link.textContent);
      for (let i = 0; i < directHeadings.length; i++) {
        const h = directHeadings[i];
        const hTextNorm = normalizeStr(h.textContent);
        const hIdNorm = normalizeStr(h.id);
        if (hIdNorm === normalizeStr(tid) || hTextNorm === linkTextNorm || hTextNorm.indexOf(linkTextNorm) !== -1 || linkTextNorm.indexOf(hTextNorm) !== -1) {
          targetEl = h;
          if (!h.id) {
            h.id = tid;
          }
          break;
        }
      }
    }

    link.addEventListener('click', function (e) {
      const currentTarget = document.getElementById(tid) || targetEl;
      if (currentTarget) {
        e.preventDefault();
        scrollToTarget(currentTarget, tid);
      }
    });
  });

  // 4. ScrollSpy: Highlight active navigation button as user scrolls
  if (timetableLinks.length > 0) {
    function updateActiveButton() {
      const scrollPos = (window.pageYOffset || document.documentElement.scrollTop) + 120;
      let activeBtn = null;

      timetableLinks.forEach(function (btn) {
        const tid = btn.getAttribute('href').substring(1);
        const el = document.getElementById(tid);
        if (el && el.offsetTop <= scrollPos) {
          activeBtn = btn;
        }
      });

      timetableLinks.forEach(function (btn) {
        if (btn === activeBtn) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', updateActiveButton, { passive: true });
    updateActiveButton();
  }

  // 5. Handle direct hash navigation in URL
  if (window.location.hash) {
    const initialHash = window.location.hash.substring(1);
    setTimeout(function () {
      const initialEl = document.getElementById(initialHash);
      if (initialEl) {
        scrollToTarget(initialEl, initialHash);
      }
    }, 200);
  }
}

function initLesson() {
  initSingleLesson();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLesson);
} else {
  initLesson();
}

export default initLesson;
