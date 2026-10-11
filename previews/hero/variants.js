// Preview-only: small markup touches the phone hero layouts need.
(() => {
  'use strict';
  const variant = document.body.dataset.hero;
  if (!variant || variant === '0') return;
  // "Заяви / безплатно / демо" on one line inside the strip.
  if (variant !== '2') document.querySelectorAll('.demo-note .demo-words br').forEach(node => node.replaceWith(' '));
  // The label under the heading: two lines instead of three.
  document.querySelector('.hero-caption br')?.replaceWith(' ');
  if (variant === '2') {
    // Keep the bottom bar up from the first screen; it still steps aside at the contact form.
    const bar = document.querySelector('.sticky-demo'), contact = document.querySelector('#contact');
    const sync = () => bar.classList.toggle('hero-always', contact.getBoundingClientRect().top > innerHeight * .75);
    addEventListener('scroll', sync, { passive: true });
    addEventListener('resize', sync);
    sync();
  }
})();
