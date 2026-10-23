// Hero: shows the salon, the pizza place and Bloom Nails in turn, 4 seconds each, round and round.
// Browser and phone change together. No buttons and nothing to click (owner's request, 2026-10-14).
(() => {
  'use strict';
  const showcase = document.querySelector('.hero-showcase');
  if (!showcase) return;
  const slides = [...showcase.querySelectorAll('[data-slide]')];
  const count = new Set(slides.map(slide => slide.dataset.slide)).size;
  const cycle = 4000;
  let current = 0, cleanup = 0;

  function show(index) {
    clearTimeout(cleanup);
    const previous = current;
    current = index;
    slides.forEach(slide => {
      const n = Number(slide.dataset.slide);
      slide.classList.toggle('is-active', n === index);
      slide.classList.toggle('is-outgoing', n === previous);
      slide.classList.toggle('is-entering', n === index);
      slide.setAttribute('aria-hidden', String(n !== index));
    });
    cleanup = setTimeout(() => slides.forEach(slide => slide.classList.remove('is-entering', 'is-outgoing')), 1120);
  }
  // Waits while the tab is in the background, so the slides do not pile up.
  setInterval(() => { if (!document.hidden) show((current + 1) % count); }, cycle);
})();
