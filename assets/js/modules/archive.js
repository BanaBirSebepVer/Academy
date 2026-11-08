/**
 * Standard Archive Module
 * Unified client-side search, category filtering, and empty-state handling
 * for all archive areas: Lessons, Projects, Posts, Publications, Academic, and Diving.
 */

function createArchiveFilter(config) {
  const searchInput = document.getElementById(config.searchInputId);
  const filterBtns = document.querySelectorAll(config.filterBtnClass);
  const cards = document.querySelectorAll(config.cardClass);
  const groupBlocks = config.groupBlockClass ? document.querySelectorAll(config.groupBlockClass) : [];
  const noMatchEl = document.getElementById(config.noMatchId);

  if (!searchInput && filterBtns.length === 0 && cards.length === 0 && groupBlocks.length === 0) {
    return;
  }

  let activeCategory = 'all';

  const categoryAttrs = config.itemCatAttrs || ['data-category', 'data-categories', 'data-type', 'data-cat'];
  const searchAttrs = config.searchAttrs || ['data-title', 'data-code', 'data-author', 'data-year', 'data-cite', 'data-tags'];

  function itemMatches(el, inheritedCat) {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Check query match across search attributes and element text
    let matchesQuery = !query;
    if (query) {
      for (let i = 0; i < searchAttrs.length; i++) {
        const val = el.getAttribute(searchAttrs[i]);
        if (val && val.toLowerCase().includes(query)) {
          matchesQuery = true;
          break;
        }
      }
      if (!matchesQuery && el.textContent && el.textContent.toLowerCase().includes(query)) {
        matchesQuery = true;
      }
    }

    // Check category match
    let matchesCat = (activeCategory === 'all');
    if (!matchesCat) {
      const catList = [];
      if (inheritedCat) {
        inheritedCat.toLowerCase().split(/[\s,]+/).forEach(function (c) {
          if (c) catList.push(c);
        });
      }
      for (let i = 0; i < categoryAttrs.length; i++) {
        const val = el.getAttribute(categoryAttrs[i]);
        if (val) {
          val.toLowerCase().split(/[\s,]+/).forEach(function (c) {
            if (c) catList.push(c);
          });
        }
      }
      matchesCat = catList.includes(activeCategory);
    }

    return matchesQuery && matchesCat;
  }

  function filterArchive() {
    let totalVisible = 0;

    if (groupBlocks.length > 0) {
      groupBlocks.forEach(function (block) {
        const blockCat = block.getAttribute('data-category') || '';
        const blockCards = block.querySelectorAll(config.cardClass);
        let blockVisible = 0;

        blockCards.forEach(function (card) {
          const visible = itemMatches(card, blockCat);
          card.style.display = visible ? '' : 'none';
          if (visible) {
            blockVisible++;
            totalVisible++;
          }
        });

        block.style.display = (blockVisible === 0) ? 'none' : '';
      });
    } else {
      cards.forEach(function (card) {
        const visible = itemMatches(card);
        card.style.display = visible ? '' : 'none';
        if (visible) {
          totalVisible++;
        }
      });
    }

    if (noMatchEl) {
      noMatchEl.style.display = (totalVisible === 0) ? 'block' : 'none';
    }

    if (typeof config.onFilter === 'function') {
      config.onFilter();
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterArchive);
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (btn.tagName === 'A' || btn.getAttribute('href')) {
        e.preventDefault();
      }
      filterBtns.forEach(function (b) {
        b.classList.remove('btn-primary', 'active');
        b.classList.add('btn-default');
      });
      this.classList.remove('btn-default');
      this.classList.add('btn-primary', 'active');

      activeCategory = (
        this.getAttribute('data-category') ||
        this.getAttribute('data-cat') ||
        this.getAttribute('data-type') ||
        'all'
      ).toLowerCase();

      filterArchive();
    });
  });
}

/**
 * Flex Masonry Layout Helper
 * Organizes cards without vertical empty spaces using CSS flexbox column wrap,
 * dynamic order distribution, and container height synchronization.
 * Supports single selector, multiple selectors, or elements list.
 */
function initFlexMasonry(selector) {
  const grids = (typeof selector === 'string')
    ? Array.from(document.querySelectorAll(selector))
    : (selector instanceof NodeList || Array.isArray(selector))
      ? Array.from(selector)
      : (selector ? [selector] : []);

  if (grids.length === 0) return null;

  const layoutFns = grids.map(function (grid) {
    let breakEl = grid.querySelector('.flex-masonry-break');
    if (!breakEl) {
      breakEl = document.createElement('div');
      breakEl.className = 'flex-masonry-break';
      grid.appendChild(breakEl);
    }

    function layout() {
      if (window.innerWidth < 768) {
        grid.classList.remove('flex-masonry-active');
        grid.style.removeProperty('height');
        const items = grid.querySelectorAll('.flex-masonry-item');
        items.forEach(function (item) {
          item.style.removeProperty('order');
        });
        return;
      }

      grid.classList.add('flex-masonry-active');

      const allItems = Array.from(grid.querySelectorAll('.flex-masonry-item'));
      const visibleItems = allItems.filter(function (item) {
        return item.style.display !== 'none';
      });

      if (visibleItems.length === 0) {
        grid.style.removeProperty('height');
        return;
      }

      let col1Height = 0;
      let col2Height = 0;

      visibleItems.forEach(function (item) {
        const col = (col1Height <= col2Height) ? 1 : 2;
        item.style.order = col;

        let itemH = item.offsetHeight;
        if (!itemH) {
          const cardInner = item.querySelector('.archive-card');
          itemH = cardInner ? cardInner.offsetHeight : 280;
        }
        const totalH = itemH + 24;

        if (col === 1) {
          col1Height += totalH;
        } else {
          col2Height += totalH;
        }
      });

      breakEl.style.order = '1';

      const maxHeight = Math.max(col1Height, col2Height);
      grid.style.height = (maxHeight + 12) + 'px';
    }

    // Initial layout
    layout();

    // Layout when window loads or images finish loading
    window.addEventListener('load', layout);
    const images = grid.querySelectorAll('img');
    images.forEach(function (img) {
      if (!img.complete) {
        img.addEventListener('load', layout);
      }
    });

    return layout;
  });

  function layoutAll() {
    layoutFns.forEach(function (fn) {
      fn();
    });
  }

  // Layout on resize with debounce
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutAll, 100);
  });

  return layoutAll;
}

function initArchive() {
  // 1. Lessons Archive with Flex Masonry
  const lessonMasonryLayout = initFlexMasonry('.category-group-block .flex-masonry-grid');

  createArchiveFilter({
    searchInputId: 'lessonSearchInput',
    filterBtnClass: '.lesson-cat-btn',
    groupBlockClass: '.category-group-block',
    cardClass: '.lesson-card-wrapper',
    noMatchId: 'noLessonsMatch',
    onFilter: function () {
      if (lessonMasonryLayout) {
        lessonMasonryLayout();
      }
    }
  });

  // 2. Projects Archive with Flex Masonry
  const projectMasonryLayout = initFlexMasonry('#projectsGrid');

  createArchiveFilter({
    searchInputId: 'projectSearchInput',
    filterBtnClass: '.project-cat-btn',
    cardClass: '.project-card-item',
    noMatchId: 'noProjectsMatch',
    onFilter: function () {
      if (projectMasonryLayout) {
        projectMasonryLayout();
      }
    }
  });

  // 3. Posts (Blog) Archive with Flex Masonry
  const postMasonryLayout = initFlexMasonry('#postsGrid');

  createArchiveFilter({
    searchInputId: 'postSearchInput',
    filterBtnClass: '.cat-btn',
    cardClass: '.post-card-item',
    noMatchId: 'noPostsMatch',
    onFilter: function () {
      if (postMasonryLayout) {
        postMasonryLayout();
      }
    }
  });

  // 4. Publications Archive
  createArchiveFilter({
    searchInputId: 'publicationSearchInput',
    filterBtnClass: '.pub-filter-btn, .pub-cat-btn',
    cardClass: '.publication-card-wrapper',
    noMatchId: 'noPubsMatch'
  });

  // 5. Diving Archive & Generic Folder Pages
  const divingMasonryLayout = initFlexMasonry('#divingGrid, .folder-masonry-grid');

  createArchiveFilter({
    searchInputId: 'divingSearchInput',
    filterBtnClass: '.diving-cat-btn, .folder-cat-btn',
    cardClass: '.diving-card-item, .folder-card-item',
    noMatchId: 'noDivingMatch',
    onFilter: function () {
      if (divingMasonryLayout) {
        divingMasonryLayout();
      }
    }
  });

  // 6. Academic Archive with Flex Masonry
  const academicMasonryLayout = initFlexMasonry('#academicGrid');

  createArchiveFilter({
    searchInputId: 'academicSearchInput',
    filterBtnClass: '.academic-cat-btn',
    cardClass: '.academic-card-item',
    noMatchId: 'noAcademicMatch',
    onFilter: function () {
      if (academicMasonryLayout) {
        academicMasonryLayout();
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initArchive);
} else {
  initArchive();
}

export { createArchiveFilter, initFlexMasonry };
export default initArchive;
