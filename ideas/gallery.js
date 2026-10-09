/* Builds the before/after gallery from data.js. Each frame is ideas-preview.html (the real site) in an iframe. */
(() => {
  'use strict';
  const ideas = window.LUMINA_IDEAS || [];
  const pages = [
    { id: 'logo', name: 'The Lumina logo', color: 'yellow', text: 'Ten ways to make the name in the header bigger. They replace each other, so pick one. The first card shows how it looks now.' },
    { id: 'home', name: 'Hero and tiles', color: 'yellow', text: 'The first screen: the headline, the laptop and phone, the sticky notes and the four service tiles.' },
    { id: 'why', name: 'Why you need a site', color: 'pale-blue', text: 'The "Защо ви е сайт?" section: the three reasons and the three example businesses.' },
    { id: 'services', name: 'Our services', color: 'pink', text: 'Two ways to give the services section something to press.' },
    { id: 'portfolio', name: 'Portfolio', color: 'yellow', text: 'Four additions to the project gallery. They can all be combined.' },
    { id: 'contact', name: 'Contact', color: 'blue', text: 'The postcard form. These three can all be combined.' },
    { id: 'footer', name: 'Whole page and phone', color: 'pale-blue', text: 'Things that follow you down the page, and the phone menu.' },
    { id: 'earlier', name: 'Still on offer from the first round', color: 'pink', text: 'Six ideas you saw before and have not picked. They still work with the site as it is now.' }
  ].filter(page => ideas.some(idea => idea.page === page.id));
  const STORE = 'lumina-idea-picks';
  let picks = [];
  try { picks = JSON.parse(localStorage.getItem(STORE) || '[]').filter(id => ideas.some(idea => idea.id === id)); } catch (error) { picks = []; }
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(picks)); } catch (error) { /* picks just won't persist */ } };

  const escape = text => String(text).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const numberOf = idea => ideas.indexOf(idea) + 1;
  const source = (idea, withIdea) => {
    const v = idea.view;
    return 'ideas-preview.html?embed' + (withIdea ? '&idea=' + idea.id : '') + '&sel=' + encodeURIComponent(v.sel) + '&dy=' + (v.dy || 0);
  };
  const frame = (idea, after) => {
    const v = idea.view, w = v.w || 1280, cw = v.cw || w, x = v.x || 0;
    return '<figure class="frame' + (after ? ' is-after' : '') + '">'
      + '<figcaption><b>' + (after ? 'After' : 'Before') + '</b><span>' + escape(after ? idea.after : idea.before) + '</span>'
      + (after ? '<button class="replay" type="button">Replay</button>' : '') + '</figcaption>'
      + '<div class="viewport" style="aspect-ratio:' + cw + '/' + v.h + ';max-width:' + cw + 'px" data-w="' + w + '" data-h="' + v.h + '" data-cw="' + cw + '" data-x="' + x + '" data-src="' + source(idea, after) + '">'
      + '<iframe title="' + (after ? 'After: ' : 'Before: ') + escape(idea.title) + '" width="' + w + '" height="' + v.h + '" style="width:' + w + 'px;height:' + v.h + 'px"></iframe></div></figure>';
  };
  const card = idea => {
    const v = idea.view, phone = (v.w || 1280) < 600, side = !phone && (v.cw || 1280) <= 800;
    const kinds = idea.kinds.map(k => '<span>' + k + '</span>').join('')
      + (idea.mobile ? '<span class="is-phone">Phone</span>' : '') + (idea.group ? '<span class="is-alt">Pick one</span>' : '');
    return '<article class="idea" id="idea-' + idea.id + '">'
      + '<div class="idea-head"><span class="idea-number" aria-hidden="true">' + numberOf(idea) + '</span>'
      + '<div class="idea-title"><h3>' + escape(idea.title) + '</h3><div class="idea-kinds">' + kinds + '</div></div>'
      + '<div class="idea-actions"><label class="pick"><input type="checkbox" data-pick="' + idea.id + '"' + (picks.includes(idea.id) ? ' checked' : '') + '><i aria-hidden="true"></i>Pick idea ' + numberOf(idea) + '</label>'
      + '<a class="open-live" href="ideas-preview.html?idea=' + idea.id + '" target="_blank" rel="noopener">Open on the full site</a></div>'
      + '<p class="idea-why">' + escape(idea.why) + '</p>' + (idea.note ? '<p class="idea-note">' + escape(idea.note) + '</p>' : '') + '</div>'
      + (idea.noBefore ? '<p class="same-before">' + escape(idea.before) + '</p>' : '')
      + '<div class="frames' + (phone ? ' is-phone' : side ? ' is-side' : '') + '">' + (idea.noBefore ? '' : frame(idea, false)) + frame(idea, true) + '</div>'
      + (idea.try ? '<p class="try"><svg viewBox="0 0 44 26" aria-hidden="true"><path d="M3 22C10 8 24 4 40 9M30 3l10 6-7 10"/></svg>' + escape(idea.try) + '</p>' : '')
      + '</article>';
  };

  document.querySelector('#idea-count').textContent = ideas.filter(idea => idea.page !== 'earlier').length;
  document.querySelector('#ideas').innerHTML = pages.map(page => {
    const list = ideas.filter(idea => idea.page === page.id);
    return '<section class="page" id="page-' + page.id + '"><div class="page-head"><h2><span style="--c:var(--' + page.color + ')">' + page.name + '</span></h2><p>' + page.text + '</p></div>' + list.map(card).join('') + '</section>';
  }).join('');
  document.querySelector('#bar-links').innerHTML = pages.map(page => '<a href="#page-' + page.id + '">' + page.name + '<small>' + ideas.filter(idea => idea.page === page.id).length + '</small></a>').join('');

  /* Frames: scale the 1280px (or 390px) site to fit, crop to the area the idea is about, load only near the screen. */
  const viewports = [...document.querySelectorAll('.viewport')];
  const fit = el => {
    const iframe = el.firstElementChild, scale = el.clientWidth / Number(el.dataset.cw);
    iframe.style.transform = 'scale(' + scale + ') translateX(-' + el.dataset.x + 'px)';
  };
  const resize = new ResizeObserver(entries => entries.forEach(entry => fit(entry.target)));
  const load = new IntersectionObserver(entries => entries.forEach(entry => {
    const iframe = entry.target.firstElementChild;
    if (entry.isIntersecting && !iframe.getAttribute('src')) iframe.src = entry.target.dataset.src;
  }), { rootMargin: '350px 0px' });
  const unload = new IntersectionObserver(entries => entries.forEach(entry => {
    const iframe = entry.target.firstElementChild;
    if (!entry.isIntersecting && iframe.getAttribute('src')) iframe.removeAttribute('src');
  }), { rootMargin: '2600px 0px' });
  viewports.forEach(el => { fit(el); resize.observe(el); load.observe(el); unload.observe(el); });
  document.addEventListener('click', event => {
    const button = event.target.closest('.replay'); if (!button) return;
    const el = button.closest('.frame').querySelector('.viewport'), iframe = el.firstElementChild;
    iframe.removeAttribute('src'); requestAnimationFrame(() => { iframe.src = el.dataset.src; });
  });

  /* Picks */
  const count = document.querySelector('#pick-count'), preview = document.querySelector('#pick-preview'), copy = document.querySelector('#pick-copy');
  const ordered = () => ideas.filter(idea => picks.includes(idea.id));
  function renderPicks() {
    const list = ordered();
    count.textContent = list.length ? list.length + (list.length === 1 ? ' idea picked' : ' ideas picked') : 'Nothing picked yet';
    preview.hidden = copy.hidden = !list.length;
    preview.href = 'ideas-preview.html?idea=' + list.map(idea => idea.id).join(',');
    document.querySelectorAll('[data-pick]').forEach(box => { box.checked = picks.includes(box.dataset.pick); });
  }
  document.addEventListener('change', event => {
    const box = event.target.closest('[data-pick]'); if (!box) return;
    const idea = ideas.find(item => item.id === box.dataset.pick);
    if (box.checked) {
      if (idea.group) picks = picks.filter(id => { const other = ideas.find(item => item.id === id); return !other || other.group !== idea.group; });
      picks.push(idea.id);
    } else picks = picks.filter(id => id !== idea.id);
    save(); renderPicks();
  });
  const toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.append(toast);
  copy.addEventListener('click', () => {
    const text = 'Apply these Lumina ideas: ' + ordered().map(idea => '#' + numberOf(idea) + ' ' + idea.title + ' (' + idea.id + ')').join('; ');
    const done = ok => { toast.textContent = ok ? 'Copied. Paste it to Claude.' : text; toast.classList.add('is-on'); setTimeout(() => toast.classList.remove('is-on'), ok ? 2200 : 9000); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => done(true), () => done(false)); else done(false);
  });
  renderPicks();
})();
