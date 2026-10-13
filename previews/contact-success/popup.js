// Preview only: shows the thank-you popup in the look named by <html data-ty-preview="N">,
// once on load and again each time the form's button is pressed.
(() => {
  const look = document.documentElement.dataset.tyPreview || '1';
  const show = () => {
    document.querySelector('.ty-overlay')?.remove();
    const overlay = document.createElement('div');
    overlay.className = 'ty-overlay';
    overlay.dataset.ty = look;
    overlay.innerHTML = `
      <div class="ty-card" role="dialog" aria-modal="true" aria-labelledby="ty-title">
        <i class="ty-back"></i>
        <svg class="ty-marks" viewBox="0 0 70 70" fill="none" stroke="#0b0c0e" stroke-width="5" stroke-linecap="round" aria-hidden="true"><path d="M12 40 30 50M30 12l10 22M54 6l-4 22"/></svg>
        <div class="ty-stamp" aria-hidden="true"><b>0 €</b><span>демо</span></div>
        <div class="ty-main">
          <svg class="ty-tick" viewBox="0 0 92 92" fill="none" stroke="#0b0c0e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M46 6c24-2 41 15 40 39S68 87 45 86 5 69 6 45 22 8 46 6Z"/><path d="M27 48l13 13 26-30"/></svg>
          <h2 id="ty-title">Благодарим!</h2>
          <p>Получихме заявката ви и ще се свържем с вас до 24 часа.</p>
          <button class="ty-ok" type="button">Добре</button>
        </div>
        <div class="ty-lines" aria-hidden="true"><span>От: Lumina Studio</span><span>До: вас</span><span>&nbsp;</span></div>
        <div class="ty-note" aria-hidden="true">до 24 часа</div>
        <button class="ty-x" type="button" aria-label="Затвори">×</button>
      </div>`;
    const close = () => overlay.remove();
    overlay.addEventListener('click', event => { if (event.target === overlay || event.target.closest('.ty-ok,.ty-x')) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); }, {once: true});
    document.body.append(overlay);
    overlay.querySelector(look === '5' ? '.ty-x' : '.ty-ok').focus({preventScroll: true});
  };
  addEventListener('load', () => {
    document.querySelector('#contact')?.scrollIntoView();
    setTimeout(show, 400);
    document.querySelector('#contact form')?.addEventListener('submit', event => { event.stopImmediatePropagation(); event.preventDefault(); show(); }, true);
  });
})();
