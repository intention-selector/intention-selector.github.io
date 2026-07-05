// Experiments section: independent tab groups per .experiments-block.

(function () {
  function activate(block, tabId) {
    block.querySelectorAll('.experiments-tabs li').forEach(li => {
      li.classList.toggle('is-active', li.dataset.tab === tabId);
    });
    block.querySelectorAll(':scope > .experiments-panel').forEach(p => {
      p.classList.toggle('is-active', p.dataset.tab === tabId);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.experiments-block').forEach(block => {
      block.querySelectorAll('.experiments-tabs li').forEach(li => {
        li.addEventListener('click', () => activate(block, li.dataset.tab));
      });
    });

    const fallback = './static/experiments/placeholder.png';
    document.querySelectorAll('.experiments-panel img').forEach(img => {
      img.addEventListener('error', () => {
        if (!img.src.endsWith('placeholder.png')) img.src = fallback;
      });
    });
  });
})();

// VLA carousel
(function () {
  function setup(carousel) {
    const slides = Array.from(carousel.querySelectorAll('.vla-slide'));
    const dots   = Array.from(carousel.querySelectorAll('.vla-dot'));
    let current = 0;

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === current));
      dots.forEach((d, k) => d.classList.toggle('is-active', k === current));
      slides.forEach((s, k) => {
        s.querySelectorAll('video').forEach(v => {
          if (k === current) v.play().catch(() => {});
          else v.pause();
        });
      });
    }

    carousel.querySelector('.vla-prev')?.addEventListener('click', () => show(current - 1));
    carousel.querySelector('.vla-next')?.addEventListener('click', () => show(current + 1));
    dots.forEach((d, k) => d.addEventListener('click', () => show(k)));
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.vla-carousel').forEach(setup);
  });
})();
