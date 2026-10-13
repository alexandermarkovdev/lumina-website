// Preview only: adds the "what's included" toggle under each service (it shows on phones).
addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sr-benefit-grid > li').forEach((item, index) => {
    const list = item.querySelector('.si-includes');
    if (!list) return;
    list.id = 'sr-includes-' + index;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sr-more';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', list.id);
    button.innerHTML = 'Какво включва<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M10 3v14M3 10h14"/></svg>';
    button.addEventListener('click', () => button.setAttribute('aria-expanded', String(item.classList.toggle('is-open'))));
    list.before(button);
  });
  if (new URLSearchParams(location.search).has('at')) addEventListener('load', () => document.querySelector('#services').scrollIntoView());
});
