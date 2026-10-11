/* Applies one or more ideas from data.js on top of the real site.
   ?idea=a,b  which ideas   ?sel=&dy=  where to scroll   ?embed  running inside ideas.html */
(() => {
  'use strict';
  const query = new URLSearchParams(location.search);
  const ids = (query.get('idea') || '').split(',').filter(Boolean);
  const embed = query.has('embed');
  const all = window.LUMINA_IDEAS || [];
  const active = ids.map(id => all.find(idea => idea.id === id)).filter(Boolean);

  const base = document.createElement('style');
  base.textContent = 'html.x-embed{scroll-behavior:auto!important;scrollbar-width:none}html.x-embed::-webkit-scrollbar{display:none}'
    + '.x-badge{position:fixed;left:14px;bottom:14px;z-index:40;display:flex;gap:14px;align-items:center;max-width:calc(100vw - 28px);background:#0b0c0e;color:#fffefa;font:500 12px/1.4 Manrope,Arial,sans-serif;padding:10px 14px}.x-badge a{color:#ffe74c;font-weight:700;white-space:nowrap}';
  document.head.append(base);
  if (embed) document.documentElement.classList.add('x-embed');

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const helpers = {
    $: (selector, root = document) => root.querySelector(selector),
    $$: (selector, root = document) => [...root.querySelectorAll(selector)],
    reduced,
    onView(element, callback, threshold = .3) {
      if (reduced) { callback(); return; }
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); callback(); }
      }, { threshold });
      observer.observe(element);
    }
  };

  active.forEach(idea => {
    if (idea.css) { const style = document.createElement('style'); style.dataset.idea = idea.id; style.textContent = idea.css; document.head.append(style); }
    try { if (idea.run) idea.run(helpers); } catch (error) { console.error('Idea ' + idea.id + ' failed', error); }
  });

  const first = active[0];
  const selector = query.get('sel') || (first && first.view.sel);
  const offset = query.has('dy') ? Number(query.get('dy')) : (first ? first.view.dy || 0 : 0);
  if (selector && (embed || active.length === 1 || query.has('sel'))) {
    let userMoved = false;
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(type => addEventListener(type, () => { userMoved = true; }, { passive: true, once: true }));
    const place = () => {
      if (userMoved) return;
      const target = document.querySelector(selector); if (!target) return;
      scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + scrollY + offset), behavior: 'instant' });
    };
    place(); requestAnimationFrame(place);
    addEventListener('load', place); document.fonts.ready.then(place);
    [250, 700, 1400].forEach(delay => setTimeout(place, delay));
  }

  if (!embed && active.length) {
    const badge = document.createElement('div'); badge.className = 'x-badge';
    badge.innerHTML = '<span>Previewing ' + active.length + (active.length === 1 ? ' idea: ' : ' ideas: ') + active.map(idea => idea.title).join(' + ') + '</span><a href="ideas.html">Back to ideas</a>';
    document.body.append(badge);
  }
})();
