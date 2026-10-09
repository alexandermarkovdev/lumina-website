/* Every idea is a real patch (CSS + optional JS) applied on top of the untouched site.
   ideas.html shows them as before/after; ideas-preview.html?idea=<id>[,<id>] applies them live.
   Ideas that were chosen have been built into the site itself and removed from this file. */
(() => {
  'use strict';
  const ARROW_E = '<svg class="icon" aria-hidden="true"><use href="#arrow-e"/></svg>';
  const CONTACT_VIEW = { sel: '#contact', dy: -70, h: 780, x: 560, cw: 690 };
  const GALLERY_VIEW = { sel: '#project-layout', dy: -96, h: 660 };

  const LOGO_VIEW = { sel: 'body', dy: 0, h: 150, x: 0, cw: 800 };
  const LOGO_BEFORE = 'Before: the same as in the first logo card (176px wide image with a small tag beside it).';
  const wordmark = (h, cls, html) => {
    const img = h.$('.brand img'); const mark = document.createElement('b');
    mark.className = 'x-word ' + cls; mark.innerHTML = html; img.replaceWith(mark);
  };

  window.LUMINA_IDEAS = [
    /* ───────────── The Lumina logo ───────────── */
    {
      id: 'logo-220', page: 'logo', group: 'logo', kinds: ['Style'],
      title: 'Same logo, 25% bigger',
      why: 'The smallest step: the existing logo image at 220px instead of 176px. Everything else stays.',
      before: 'Now: the logo is 176px wide.',
      after: 'The same image at 220px.',
      view: LOGO_VIEW,
      css: `.brand img{width:220px}@media(max-width:600px){.brand img{width:160px}}`
    },
    {
      id: 'logo-264', page: 'logo', group: 'logo', noBefore: true, kinds: ['Style'],
      title: 'Same logo at its full size',
      why: 'The logo file is 264px wide, so this is the largest it can go and stay sharp. 50% bigger than now.',
      before: LOGO_BEFORE,
      after: 'The same image at 264px, its real size.',
      view: LOGO_VIEW,
      css: `.brand img{width:264px}@media(max-width:1180px){.brand img{width:220px}}@media(max-width:600px){.brand img{width:170px}}`
    },
    {
      id: 'logo-solo', page: 'logo', group: 'logo', noBefore: true, kinds: ['Style'],
      title: 'Full-size logo, no tag',
      why: 'With the logo this large, the small "WEB DESIGN STUDIO" tag beside it starts to crowd the menu. Dropping it lets the name stand alone; the caption under the headline already says what you do.',
      before: LOGO_BEFORE,
      after: 'The 264px logo by itself.',
      view: LOGO_VIEW,
      css: `.brand img{width:264px}.brand>span{display:none}@media(max-width:1180px){.brand img{width:230px}}@media(max-width:600px){.brand img{width:190px}}`
    },
    {
      id: 'logo-stacked', page: 'logo', group: 'logo', noBefore: true, kinds: ['Layout'],
      title: 'Big logo with the tag underneath',
      why: 'Stacking the tag under the name, like a proper lockup, gives the logo the full width without pushing the menu sideways.',
      before: LOGO_BEFORE,
      after: 'A 240px logo with "WEB DESIGN STUDIO" set beneath it.',
      view: LOGO_VIEW,
      css: `.brand{flex-direction:column;align-items:flex-start;gap:0}.brand img{width:240px}.brand>span{margin:-6px 0 0 30px;max-width:none!important}.is-scrolled .brand>span{display:none}@media(max-width:600px){.brand img{width:170px}.brand>span{margin-top:-4px}}`
    },
    {
      id: 'logo-light', page: 'logo', group: 'logo', noBefore: true, kinds: ['Style'],
      title: 'Redrawn as text: thin and wide',
      why: 'The logo is a picture, which is why it cannot grow past 264px and why it shows a faint box on some screens. Set as real text it is sharp at any size. This version keeps the thin, widely spaced look of the original with the yellow dot.',
      before: LOGO_BEFORE,
      after: 'LUMINA. as live text at 46px, light and spaced out.',
      note: 'The site only has the Manrope font, so this is close to the original lettering, not identical.',
      view: LOGO_VIEW,
      css: `.x-word{font-size:46px;line-height:1;font-weight:400;letter-spacing:.2em;white-space:nowrap}.x-word i{font-style:normal;color:#f5b301;font-weight:800;letter-spacing:0;margin-left:-.12em}@media(max-width:600px){.x-word{font-size:32px}}`,
      run(h) { wordmark(h, '', 'LUMINA<i>.</i>'); }
    },
    {
      id: 'logo-heavy', page: 'logo', group: 'logo', noBefore: true, kinds: ['Style'],
      title: 'Redrawn as text: heavy, like the headline',
      why: 'The headline, the section titles and the tiles are all in heavy tight lettering; the thin logo is the one thing that doesn\'t match. This makes the name part of the same family, and much louder.',
      before: LOGO_BEFORE,
      after: 'Lumina. in the same heavy lettering as "Вашият сайт.", 48px, with the yellow dot.',
      view: LOGO_VIEW,
      css: `.x-word{font-size:48px;line-height:1;font-weight:800;letter-spacing:-.055em;white-space:nowrap}.x-word i{font-style:normal;color:#f5b301}@media(max-width:600px){.x-word{font-size:36px}}`,
      run(h) { wordmark(h, '', 'Lumina<i>.</i>'); }
    },
    {
      id: 'logo-marker', page: 'logo', group: 'logo', noBefore: true, kinds: ['Style'],
      title: 'Heavy text with the yellow marker',
      why: 'The same heavy name, underlined with the marker swipe used on every section heading. The logo then carries the site\'s signature detail.',
      before: LOGO_BEFORE,
      after: 'Heavy Lumina with a yellow marker stroke behind its lower half.',
      view: LOGO_VIEW,
      css: `.x-word{position:relative;isolation:isolate;font-size:48px;line-height:1;font-weight:800;letter-spacing:-.055em;white-space:nowrap}.x-word:after{content:"";position:absolute;left:-5px;right:-8px;bottom:3px;height:15px;background:var(--yellow);z-index:-1;transform:rotate(-1.5deg)}@media(max-width:600px){.x-word{font-size:36px}.x-word:after{height:11px}}`,
      run(h) { wordmark(h, '', 'Lumina.'); }
    },
    {
      id: 'logo-hand', page: 'logo', group: 'logo', noBefore: true, kinds: ['Style'],
      title: 'Handwritten',
      why: 'The handwriting on the notes is the friendliest thing on the site. A signed name feels like a person rather than an agency, which suits a small studio.',
      before: LOGO_BEFORE,
      after: 'Lumina. written in the same hand as the notes, large and slightly tilted.',
      view: LOGO_VIEW,
      css: `.x-word{font:700 64px/.9 Caveat,cursive;transform:rotate(-4deg);white-space:nowrap;padding-right:6px}.x-word i{font-style:normal;color:#f5b301}@media(max-width:600px){.x-word{font-size:46px}}`,
      run(h) { wordmark(h, '', 'Lumina<i>.</i>'); }
    },
    {
      id: 'logo-paper', page: 'logo', group: 'logo', noBefore: true, kinds: ['Style'],
      title: 'On a piece of yellow paper',
      why: 'Everything important on the page sits on cut paper. Putting the name on its own yellow piece makes it the first paper object you see, and the biggest block of colour in the header.',
      before: LOGO_BEFORE,
      after: 'Heavy Lumina on a tilted yellow cut-paper tag. The demo button changes to pink so the two don\'t compete.',
      view: LOGO_VIEW,
      css: `.x-word{font-size:40px;line-height:1;font-weight:800;letter-spacing:-.05em;white-space:nowrap;background:var(--yellow);padding:11px 20px 14px;transform:rotate(-3deg);clip-path:polygon(2% 8%,98% 0,100% 90%,0 100%)}.header-cta{background:var(--pink)}@media(max-width:600px){.x-word{font-size:30px;padding:9px 15px 11px}}`,
      run(h) { wordmark(h, '', 'Lumina.'); }
    },
    {
      id: 'logo-shrink', page: 'logo', group: 'logo', noBefore: true, kinds: ['Motion'],
      title: 'Big at the top, small once you scroll',
      why: 'You get a large logo on arrival, where there is room for it, and it tucks back to today\'s size when the header slims down, so it never eats into the page while reading.',
      before: LOGO_BEFORE,
      after: 'A 264px logo at the top of the page that eases down to 170px when you scroll.',
      try: 'Scroll down and back up inside the frame.',
      view: LOGO_VIEW,
      css: `.brand img{width:264px;transition:width .35s var(--ease)}.is-scrolled .brand img{width:170px}@media(max-width:1180px){.brand img{width:220px}}@media(max-width:600px){.brand img{width:170px}}`
    },

    /* ───────────── Hero and tiles ───────────── */
    {
      id: 'hero-cycle', page: 'home', kinds: ['Motion', 'Text'],
      title: 'The headline counts through everything you do',
      why: '"Изцяло от нас" claims you do it all, but a claim is easy to skim past. Let the middle line flick through the actual jobs (Дизайн, Код, Домейн, Хостинг, SEO) and land on "Изцяло" with a marker swipe. It plays once on load and then stays still.',
      before: 'The line simply reads "Изцяло".',
      after: 'Дизайн → Код → Домейн → Хостинг → SEO → Изцяло, then the yellow marker underlines it.',
      try: 'Press Replay to watch it again.',
      view: { sel: 'body', dy: 0, h: 560, x: 0, cw: 760 },
      css: `
@media(prefers-reduced-motion:no-preference){
  h1 span.x-roll{animation:x-roll .34s var(--ease)}
  @keyframes x-roll{from{opacity:0;transform:translateY(.34em) rotate(-3deg)}}
}
h1 span.x-final{position:relative;isolation:isolate}
h1 span.x-final:after{content:"";position:absolute;left:-.04em;right:-.08em;bottom:.07em;height:.24em;background:var(--yellow);z-index:-1;transform:rotate(-1.2deg) scaleX(0);transform-origin:left;animation:x-final .55s .1s var(--ease) forwards}
@keyframes x-final{to{transform:rotate(-1.2deg) scaleX(1)}}
@media(prefers-reduced-motion:reduce){h1 span.x-final:after{transform:rotate(-1.2deg)}}`,
      run(h) {
        const line = h.$('h1 span:nth-child(2)');
        h.$('h1').setAttribute('aria-label', 'Вашият сайт. Изцяло от нас.');
        if (h.reduced) { line.classList.add('x-final'); return; }
        const words = ['Дизайн', 'Код', 'Домейн', 'Хостинг', 'SEO', 'Изцяло'];
        let i = 0;
        const step = () => {
          line.textContent = words[i];
          line.classList.remove('x-roll'); void line.offsetWidth; line.classList.add('x-roll');
          if (i === words.length - 1) { line.classList.add('x-final'); return; }
          i += 1; setTimeout(step, 520);
        };
        setTimeout(step, 1300);
      }
    },
    {
      id: 'hero-switch', page: 'home', kinds: ['Interaction'],
      title: 'Switch the site on the hero screen',
      why: 'The laptop and phone in the hero always show the same interior-design site. Three paper chips let a visitor flip it to a pizzeria or a salon, on both screens at once. It shows range in the first five seconds, before they have scrolled anywhere.',
      before: 'One fixed example: SOLA.',
      after: 'Chips above the screen: Интериор, Пицария, Салон. Each swaps the name, text, colours and photo on the laptop and the phone.',
      try: 'Click the three chips above the browser window.',
      view: { sel: 'body', dy: 0, h: 640, x: 640, cw: 640 },
      css: `
.x-sites{position:absolute;left:14%;top:60px;z-index:6;display:flex;gap:6px}
.x-sites button{border:0;background:var(--paper);font-size:12px;font-weight:700;line-height:1;padding:8px 12px 9px;clip-path:polygon(3% 8%,97% 0,100% 90%,0 100%);transition:background .2s,transform .25s var(--ease)}
.x-sites button:hover{background:var(--pink)}
.x-sites button[aria-pressed="true"]{background:var(--yellow);transform:rotate(-3deg) scale(1.08)}
@media(max-width:600px){.x-sites{top:7%;left:10%}.x-sites button{font-size:11px;padding:7px 9px}}
@media(prefers-reduced-motion:no-preference){
  .x-flip .sample-body,.x-flip.phone-screen>*{animation:x-flip .45s var(--ease)}
  @keyframes x-flip{from{opacity:0;transform:translateX(18px)}}
}`,
      run(h) {
        const show = h.$('.showcase'); show.removeAttribute('role'); show.removeAttribute('aria-label');
        const sites = {
          'Интериор': { logo: 'SOLA', cap: 'ИНТЕРИОРИ С ХАРАКТЕР', head: 'Място<br>за хубавите<br><em>моменти.</em>', desc: 'Естествени материали.<br>Обмислени детайли.<br>Пространство за вас.', cta: 'Нашите проекти', color: '#303b31', bg: '#f6f4ee', img: 'interior.jpg', pos: '66% 50%', pHead: 'Място за<br>хубавите<br><em>моменти.</em>', pDesc: 'Пространство за вас.<br>Създадено с внимание.' },
          'Пицария': { logo: 'FORNO', cap: 'ПИЦА ОТ ПЕЩ НА ДЪРВА', head: 'Пица<br>за добра<br><em>вечер.</em>', desc: 'Малко съставки.<br>Много характер.<br>Пица за споделяне.', cta: 'Вижте менюто', color: '#953627', bg: '#fff1cf', img: 'pizza.jpg', pos: '50% 55%', pHead: 'Пица<br>за добра<br><em>вечер.</em>', pDesc: 'Малко съставки.<br>Много характер.' },
          'Салон': { logo: 'ATELIER', cap: 'ФРИЗЬОРСКО СТУДИО', head: 'Време<br>само<br><em>за вас.</em>', desc: 'Малка промяна.<br>Ново усещане.<br>Запазете час онлайн.', cta: 'Запазете час', color: '#62423f', bg: '#efe8e3', img: 'salon.jpg', pos: '50% 60%', pHead: 'Време<br>само<br><em>за вас.</em>', pDesc: 'Малка промяна.<br>Ново усещане.' }
        };
        const site = h.$('.sample-website', show), phone = h.$('.phone-screen', show);
        const row = document.createElement('div'); row.className = 'x-sites'; row.setAttribute('role', 'group'); row.setAttribute('aria-label', 'Примерен сайт');
        row.innerHTML = Object.keys(sites).map((name, i) => '<button type="button" aria-pressed="' + (i === 0) + '">' + name + '</button>').join('');
        show.append(row);
        const buttons = [...row.children];
        buttons.forEach(button => button.addEventListener('click', () => {
          const v = sites[button.textContent];
          buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
          h.$$('.sample-logo', show).forEach(logo => { logo.firstChild.textContent = v.logo; });
          h.$('.sample-caption', show).textContent = v.cap;
          h.$('.sample-heading', show).innerHTML = v.head;
          h.$('.sample-description', show).innerHTML = v.desc;
          h.$('.phone-heading', show).innerHTML = v.pHead;
          h.$('.phone-description', show).innerHTML = v.pDesc;
          [h.$('.sample-cta', show), h.$('.phone-cta', show)].forEach(cta => { cta.firstChild.textContent = v.cta + ' '; cta.style.background = v.color; });
          const photo = h.$('.sample-photo', show); photo.src = 'assets/images/' + v.img; photo.style.objectPosition = v.pos;
          h.$('.phone-screen>img', show).src = 'assets/images/' + v.img;
          site.style.background = phone.style.background = v.bg;
          [site, phone].forEach(el => { el.classList.remove('x-flip'); void el.offsetWidth; el.classList.add('x-flip'); });
        }));
      }
    },
    {
      id: 'hero-depth', page: 'home', kinds: ['Motion', 'Interaction'],
      title: 'The paper layers shift with the cursor',
      why: 'The hero is built from overlapping cut paper, but it sits flat. If each layer moves a few pixels with the mouse (the blue sheet least, the notes most), the stack reads as real paper lying on a desk. It only reacts to the visitor, so nothing moves on its own.',
      before: 'A flat collage.',
      after: 'Blue backing, browser, phone and notes slide by different amounts as the pointer moves over the hero.',
      try: 'Move the mouse slowly across the After frame.',
      view: { sel: 'body', dy: 0, h: 640, x: 560, cw: 720 },
      css: `
@media(hover:hover) and (prefers-reduced-motion:no-preference){
  .hero .blue-paper,.hero .browser-mockup,.hero .phone-mockup,.hero .pink-note,.hero .process-note,.hero .demo-note{transition:translate .35s ease-out}
  .hero .blue-paper{translate:calc(var(--mx,0)*-9px) calc(var(--my,0)*-6px)}
  .hero .browser-mockup{translate:calc(var(--mx,0)*7px) calc(var(--my,0)*5px)}
  .hero .phone-mockup{translate:calc(var(--mx,0)*17px) calc(var(--my,0)*11px)}
  .hero .pink-note{translate:calc(var(--dx,0px) + var(--mx,0)*26px) calc(var(--dy,0px) + var(--my,0)*16px)}
  .hero .process-note{translate:calc(var(--dx,0px) + var(--mx,0)*22px) calc(var(--dy,0px) + var(--my,0)*14px)}
  .hero .demo-note{translate:calc(var(--mx,0)*-12px) calc(var(--my,0)*-8px)}
}`,
      run(h) {
        const hero = h.$('.hero');
        if (h.reduced) return;
        hero.addEventListener('pointermove', event => {
          const box = hero.getBoundingClientRect();
          hero.style.setProperty('--mx', ((event.clientX - box.left) / box.width * 2 - 1).toFixed(3));
          hero.style.setProperty('--my', ((event.clientY - box.top) / box.height * 2 - 1).toFixed(3));
        }, { passive: true });
        hero.addEventListener('pointerleave', () => { hero.style.setProperty('--mx', 0); hero.style.setProperty('--my', 0); });
      }
    },
    {
      id: 'hero-drag', page: 'home', kinds: ['Interaction'],
      title: 'Sticky notes you can pick up and move',
      why: 'The handwritten notes look like real sticky notes, so let them behave like it. A visitor who discovers they can drag one around has just been shown, without a word, that you build things that respond. Double-click puts a note back.',
      before: 'Notes are fixed pictures.',
      after: 'The pink note and the "Вашето демо. До 24 часа." note lift when grabbed and stay where they are dropped.',
      try: 'Drag the pink note and the white note. Double-click one to reset it.',
      view: { sel: 'body', dy: 0, h: 640, x: 640, cw: 640 },
      css: `
.x-drag{cursor:grab;touch-action:none;user-select:none;translate:calc(var(--dx,0px) + var(--mx,0)*24px) calc(var(--dy,0px) + var(--my,0)*15px);transition:scale .25s var(--ease),filter .25s}
.x-drag.x-held{cursor:grabbing;scale:1.1;z-index:9;transition:scale .25s var(--ease)!important;filter:drop-shadow(0 16px 14px #0b0c0e30)}`,
      run(h) {
        h.$$('.hero .pink-note,.hero .process-note,.hero .idea-note').forEach(note => {
          note.classList.add('x-drag');
          let startX = 0, startY = 0, baseX = 0, baseY = 0, held = false;
          note.addEventListener('pointerdown', event => {
            held = true; note.setPointerCapture(event.pointerId); note.classList.add('x-held');
            startX = event.clientX; startY = event.clientY;
            baseX = parseFloat(note.style.getPropertyValue('--dx')) || 0; baseY = parseFloat(note.style.getPropertyValue('--dy')) || 0;
          });
          note.addEventListener('pointermove', event => {
            if (!held) return;
            note.style.setProperty('--dx', baseX + event.clientX - startX + 'px'); note.style.setProperty('--dy', baseY + event.clientY - startY + 'px');
          });
          const drop = () => { held = false; note.classList.remove('x-held'); };
          note.addEventListener('pointerup', drop); note.addEventListener('pointercancel', drop);
          note.addEventListener('dblclick', () => { note.style.setProperty('--dx', '0px'); note.style.setProperty('--dy', '0px'); });
        });
      }
    },
    {
      id: 'tiles-unfold', page: 'home', kinds: ['Interaction', 'Motion'],
      title: 'Service tiles open to show what is inside',
      why: 'Each tile gives one vague sentence and "Научете повече". On hover a paper sheet can slide up over the tile with the three concrete things that service includes, so people learn something without leaving the first screen.',
      before: 'Hover lifts the tile and nods the icon.',
      after: 'A sheet slides up with three ticked items and a "Вижте услугата" link. It slides back when you leave.',
      try: 'Hover each coloured tile.',
      view: { sel: '.service-strip', dy: -96, h: 370 },
      css: `
.service-tile{overflow:hidden}
.x-inside{position:absolute;inset:7px;display:flex;flex-direction:column;background:var(--paper);padding:16px 14px 13px;transform:translateY(106%) rotate(2deg);transition:transform .5s var(--ease);clip-path:polygon(0 2%,98% 0,100% 98%,2% 100%)}
.service-tile:hover .x-inside,.service-tile:focus-visible .x-inside{transform:none}
.x-inside b{font-size:15px;font-weight:800;letter-spacing:-.03em;margin-bottom:10px}
.x-inside ul{list-style:none;padding:0;margin:0;display:grid;gap:8px}
.x-inside li{position:relative;padding-left:20px;font-size:13px;line-height:1.35}
.x-inside li:before{content:"";position:absolute;left:1px;top:5px;width:9px;height:5px;border-left:2px solid var(--ink);border-bottom:2px solid var(--ink);transform:rotate(-45deg)}
.x-inside i{margin-top:auto;font-style:normal;font-size:12px;font-weight:800;display:flex;justify-content:space-between;align-items:center}
.x-inside i .icon{width:15px;height:15px}`,
      run(h) {
        const inside = {
          'design-tile': ['Визия с вашия характер', 'Удобен и на телефон', 'Форми за запитвания'],
          'seo-tile': ['Ясна структура', 'Заглавия и описания', 'Готов за Google'],
          'hosting-tile': ['Избор на домейн', 'Защитена връзка', 'Публикуване на сайта'],
          'support-tile': ['Обновявания и сигурност', 'Промени по текстове', 'Съдействие при въпроси']
        };
        Object.keys(inside).forEach(name => {
          const sheet = document.createElement('span'); sheet.className = 'x-inside';
          sheet.innerHTML = '<b>Включва</b><ul>' + inside[name].map(item => '<li>' + item + '</li>').join('') + '</ul><i>Вижте услугата<svg class="icon" aria-hidden="true"><use href="#arrow-ne"/></svg></i>';
          h.$('.' + name).append(sheet);
        });
      }
    },

    /* ───────────── Why a site ───────────── */
    {
      id: 'why-picker', page: 'why', kinds: ['Interaction', 'Text'],
      title: 'Ask "what is your business?" and tailor the page',
      why: 'Three examples compete for attention when a visitor only cares about the one like theirs. One question lets them say which, and the page answers: their example stays lit, the button says "И вашият ресторант може така", and the demo form further down is already filled in with their kind of business.',
      before: 'All three examples shown equally; a generic button.',
      after: 'Chips: Ресторант, Салон, Магазин, Друго. Picking one dims the others, rewrites the button and pre-fills the contact form.',
      try: 'Click a chip, then look at the black button under the examples.',
      view: { sel: '#why-sites', dy: 170, h: 720 },
      css: `
.x-pick{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:0 0 22px 8px}
.x-pick>span{font:700 26px/1 Caveat,cursive;margin-right:8px;transform:rotate(-2deg)}
.x-pick button{border:0;background:var(--warm);font-size:14px;font-weight:700;line-height:1;padding:10px 15px 11px;clip-path:polygon(3% 8%,97% 0,100% 90%,0 100%);transition:background .2s,transform .25s var(--ease)}
.x-pick button:hover{background:var(--pale-blue)}
.x-pick button[aria-pressed="true"]{background:var(--yellow);transform:rotate(-2deg) scale(1.07)}
.overview-grid>.business-preview{transition:opacity .45s,filter .45s,transform .45s var(--ease)}
.overview-grid[data-focus="pizza"]>:not(.pizza-preview),.overview-grid[data-focus="salon"]>:not(.salon-preview),.overview-grid[data-focus="brick"]>:not(.brick-preview){opacity:.34;filter:grayscale(.7);transform:scale(.97)}`,
      run(h) {
        const grid = h.$('.overview-grid'), cta = h.$('.overview-cta');
        const kinds = [['pizza', 'Ресторант', 'ресторант'], ['salon', 'Салон', 'салон'], ['brick', 'Магазин', 'магазин'], ['', 'Друго', 'бизнес']];
        const row = document.createElement('div'); row.className = 'x-pick'; row.setAttribute('role', 'group');
        row.innerHTML = '<span>Какъв е вашият бизнес?</span>' + kinds.map(k => '<button type="button" aria-pressed="false">' + k[1] + '</button>').join('');
        grid.before(row);
        const buttons = h.$$('button', row);
        buttons.forEach((button, i) => button.addEventListener('click', () => {
          const on = button.getAttribute('aria-pressed') !== 'true', kind = on ? kinds[i] : ['', '', 'бизнес'];
          buttons.forEach(b => b.setAttribute('aria-pressed', String(on && b === button)));
          if (kind[0]) grid.dataset.focus = kind[0]; else delete grid.dataset.focus;
          if (cta) cta.firstChild.textContent = 'И вашият ' + (kind[2] === 'бизнес' ? 'сайт' : kind[2]) + ' може така';
          const field = h.$('#demo-business'), lead = h.$('.postcard-lead');
          if (field) field.value = on && kind[1] !== 'Друго' ? kind[1] : '';
          if (lead) lead.textContent = 'Имам ' + kind[2] + '. И искам да го видя онлайн.';
        }));
      }
    },
    {
      id: 'why-links', page: 'why', kinds: ['Interaction'],
      title: 'The reasons point at the examples',
      why: 'Reason 2 says a site "записва часове, показва менюто, приема поръчки", and directly below are three sites doing exactly those three things, but nothing connects them. Make each phrase a marker-highlighted link in its example\'s colour that lifts the matching site.',
      before: 'Plain sentence; examples sit separately underneath.',
      after: 'Hover "Записва часове" and the salon site lifts; "показва менюто" lifts the restaurant; "приема поръчки" lifts the shop. Clicking scrolls to it on a phone.',
      try: 'Hover the three highlighted phrases in reason 2.',
      view: { sel: '#why-sites', dy: -80, h: 760 },
      css: `
.x-ref{border:0;padding:0 3px;margin:0 -1px;font:inherit;color:var(--ink);cursor:pointer;background:linear-gradient(var(--c),var(--c)) no-repeat 0 88%/100% 42%;transition:background-size .25s var(--ease)}
.x-ref:hover,.x-ref:focus-visible{background-size:100% 100%}
.business-preview .preview-window,.business-preview .preview-kind{transition:transform .45s var(--ease),box-shadow .45s}
.business-preview.x-spot .preview-window{transform:translateY(-12px) rotate(-1deg) scale(1.03);box-shadow:0 24px 34px #18181533}
.business-preview.x-spot .preview-kind{transform:rotate(-6deg) scale(1.2)}`,
      run(h) {
        const item = h.$$('.overview-lead li')[1]; if (!item) return;
        item.innerHTML = '<strong>Работи вместо вас.</strong> <button type="button" class="x-ref" data-t="salon" style="--c:var(--pink)">Записва часове</button>, <button type="button" class="x-ref" data-t="pizza" style="--c:var(--pale-blue)">показва менюто</button>, <button type="button" class="x-ref" data-t="brick" style="--c:var(--yellow)">приема поръчки</button> — докато вие си вършите работата.';
        h.$$('.x-ref', item).forEach(ref => {
          const card = h.$('.' + ref.dataset.t + '-preview');
          const spot = on => card.classList.toggle('x-spot', on);
          ref.addEventListener('pointerenter', () => spot(true)); ref.addEventListener('pointerleave', () => spot(false));
          ref.addEventListener('focus', () => spot(true)); ref.addEventListener('blur', () => spot(false));
          ref.addEventListener('click', () => { card.scrollIntoView({ behavior: h.reduced ? 'instant' : 'smooth', block: 'center', inline: 'center' }); spot(true); setTimeout(() => spot(false), 1600); });
        });
      }
    },
    {
      id: 'why-search', page: 'why', kinds: ['Interaction', 'Style'],
      title: 'Show reason 1: a search, with and without a site',
      why: '"Повече хора ви намират" is the strongest of the three reasons and the only one with nothing to look at. A tiny search result with a switch makes it concrete: without a site the pizzeria is a grey line with no hours and no menu; with a site it has a photo, opening hours and two buttons.',
      before: 'Three reasons as text.',
      after: 'Under the reasons, a small "пицария близо до мен" result. Flip "Без сайт / Със сайт" and the listing fills in; the handwritten verdict changes from "Подминават ви." to "Избират вас."',
      try: 'Flip the switch between Без сайт and Със сайт.',
      note: 'This adds about 60px to the height of the section.',
      view: { sel: '#why-sites', dy: -80, h: 470, x: 600, cw: 680 },
      css: `
.x-search{margin-top:16px;background:var(--warm);padding:12px 14px 14px;clip-path:polygon(0 2%,99% 0,100% 98%,1% 100%)}
.x-search-bar{display:flex;align-items:center;gap:9px;font-size:13px;margin-bottom:10px}
.x-search-bar svg{width:16px;height:16px;fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round}
.x-search-bar>span{background:var(--paper);padding:6px 12px;border-radius:99px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.x-switch{display:flex;background:var(--paper);padding:3px;flex-shrink:0}
.x-switch button{border:0;background:none;font-size:12px;font-weight:700;line-height:1;padding:7px 10px}
.x-switch button[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.x-result{display:flex;align-items:center;gap:12px;background:var(--paper);padding:10px 12px;min-height:74px}
.x-thumb{width:54px;height:54px;flex-shrink:0;background:#dedbd2 center/cover;transition:background-color .3s}
.x-result p{font-size:15px;line-height:1.3;flex:1;min-width:0}
.x-result strong{font-weight:800}
.x-result small{display:block;font-size:12px;margin-top:3px;color:#7b776c}
.x-go{display:flex;gap:6px}
.x-go b{font-size:12px;font-weight:700;padding:8px 10px;background:var(--yellow)}
.x-verdict{font:700 24px/1 Caveat,cursive;transform:rotate(-4deg);flex-shrink:0;width:92px;text-align:center}
.x-search[data-on="0"] .x-go{display:none}
.x-search[data-on="0"] .x-result strong{color:#7b776c}
.x-search[data-on="1"] .x-thumb{background-image:url(assets/images/pizza.jpg)}
.x-search[data-on="1"] .x-result small{color:var(--ink)}
@media(prefers-reduced-motion:no-preference){.x-search.x-changed .x-result{animation:x-res .4s var(--ease)}@keyframes x-res{from{transform:translateY(6px);opacity:.3}}}
@media(max-width:600px){.x-verdict{display:none}.x-search-bar{flex-wrap:wrap}}`,
      run(h) {
        const lead = h.$('.overview-lead'); if (!lead) return;
        const box = document.createElement('div'); box.className = 'x-search'; box.dataset.on = '0';
        box.innerHTML = '<div class="x-search-bar"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>пицария близо до мен</span><div class="x-switch" role="group" aria-label="Със или без сайт"><button type="button" aria-pressed="true">Без сайт</button><button type="button" aria-pressed="false">Със сайт</button></div></div>'
          + '<div class="x-result"><div class="x-thumb"></div><p><strong>La Tavola</strong><small></small></p><span class="x-go"><b>Меню</b><b>Поръчай</b></span><span class="x-verdict"></span></div>';
        lead.append(box);
        const buttons = h.$$('.x-switch button', box), small = h.$('small', box), verdict = h.$('.x-verdict', box);
        const set = on => {
          box.dataset.on = on ? '1' : '0';
          buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(Boolean(i) === on)));
          small.textContent = on ? 'Пицария · Отворено до 23:00 · Меню онлайн' : 'Пицария · Няма сайт · Няма работно време';
          verdict.textContent = on ? 'Избират вас.' : 'Подминават ви.';
          box.classList.remove('x-changed'); void box.offsetWidth; box.classList.add('x-changed');
        };
        buttons.forEach((b, i) => b.addEventListener('click', () => set(Boolean(i))));
        set(false);
      }
    },

    /* ───────────── Services ───────────── */
    {
      id: 'svc-accordion', page: 'services', kinds: ['Interaction', 'Layout'],
      title: 'Services open one by one',
      why: 'All six services are fully written out, which makes the section about 1,100px tall. Closed, each one shows its name and the benefit; a click opens the description and the checklist. The section drops to roughly half the height, and the full description you already wrote for each service (currently unused) finally gets shown.',
      before: 'Everything open at once.',
      after: 'First service open, the rest closed with a +. Click a coloured header to open or close it. The home-page tiles open the matching one.',
      try: 'Click the coloured headers.',
      view: { sel: '#services', dy: 70, h: 760 },
      css: `
.sr-benefit-grid>li>header{cursor:pointer}
.sr-benefit-grid>li>header:focus-visible{outline:3px solid #1765a1;outline-offset:4px}
.x-plus{margin-left:auto;font-size:28px;font-weight:400;line-height:.8;transition:transform .35s var(--ease)}
.sr-benefit-grid>li.x-open .x-plus{transform:rotate(45deg)}
.x-more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s var(--ease)}
.x-more>div{overflow:hidden;min-height:0}
.sr-benefit-grid>li.x-open .x-more{grid-template-rows:1fr}
.x-desc{font-size:14px;line-height:1.7;margin:14px 0 0;max-width:54ch}
@media(min-width:701px){.sr-benefit-journey .sr-benefit-grid>li{margin-bottom:-30px}.sr-benefit-journey .sr-benefit-grid>li:last-child{margin-bottom:0}}`,
      run(h) {
        const items = h.$$('.sr-benefit-grid>li');
        const text = ['Подреждаме историята, услугите и силните ви страни в дизайн, който хората разбират още от първия поглед.', 'Превръщаме визията в удобен сайт. Всеки бутон, страница и форма има ясна задача — да улесни вашите клиенти.', 'Помагаме да изберете лесно за запомняне име и свързваме адреса с новия ви сайт. Имате домейн? Работим с него.', 'Осигуряваме мястото, където живее сайтът, и поемаме техническите настройки, за да се занимавате с бизнеса си.', 'Подреждаме съдържанието и страниците така, че хората и търсачките да разбират какво предлагате.', 'Свързваме сайта с вашето представяне онлайн. Ясното послание води правилната аудитория към следващата стъпка.'];
        const refresh = () => { dispatchEvent(new Event('resize')); setTimeout(() => dispatchEvent(new Event('resize')), 480); };
        const toggle = (li, open) => { li.classList.toggle('x-open', open); li.querySelector('header').setAttribute('aria-expanded', String(li.classList.contains('x-open'))); refresh(); };
        items.forEach((li, i) => {
          const head = li.querySelector('header'), copy = li.querySelector('.sr-benefit-copy');
          const more = document.createElement('div'), inner = document.createElement('div'), desc = document.createElement('p');
          more.className = 'x-more'; desc.className = 'x-desc'; desc.textContent = text[i];
          inner.append(desc, copy.querySelector('.si-includes')); more.append(inner); copy.append(more);
          head.insertAdjacentHTML('beforeend', '<span class="x-plus" aria-hidden="true">+</span>');
          head.tabIndex = 0; head.setAttribute('role', 'button'); head.setAttribute('aria-expanded', 'false');
          head.addEventListener('click', () => toggle(li));
          head.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(li); } });
        });
        toggle(items[0], true);
        document.addEventListener('click', e => {
          const link = e.target.closest('a[href^="#"]'); if (!link) return;
          const li = items.find(item => '#' + item.id === link.hash); if (li) toggle(li, true);
        }, true);
      }
    },
    {
      id: 'svc-package', page: 'services', kinds: ['Interaction'],
      title: 'Tick the services you want and carry them to the form',
      why: 'The services section is read-only: people look, then have to remember what they wanted and type it into the form later. Let them tick services as they read. A small yellow note keeps count, and its button jumps to the demo form with "Интересувам се от: Дизайн, SEO" already written.',
      before: 'Nothing to press in the whole section.',
      after: 'Each service has an "Искам това" button. A note in the corner lists the picks and sends them to the form.',
      try: 'Click "Искам това" on two services, then the button on the yellow note.',
      view: { sel: '#services', dy: 200, h: 700 },
      css: `
.x-want{margin-top:16px;border:0;background:var(--warm);font-size:13px;font-weight:700;line-height:1;padding:10px 14px 11px;clip-path:polygon(3% 8%,97% 0,100% 90%,0 100%);transition:background .2s,transform .25s var(--ease)}
.x-want:hover{background:var(--pale-blue)}
.x-want[aria-pressed="true"]{background:var(--yellow);transform:rotate(-2deg) scale(1.05)}
.x-pack{position:fixed;right:20px;bottom:20px;z-index:26;width:min(290px,calc(100vw - 40px));background:var(--yellow);padding:16px 18px 18px;transform:rotate(-1.5deg);box-shadow:0 14px 22px #0b0c0e2e}
.x-pack p{font-size:14px;line-height:1.45;font-weight:600;padding-right:22px}
.x-pack a{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:12px;background:var(--ink);color:var(--paper);font-size:13px;font-weight:700;padding:12px 14px}
.x-pack a:hover{background:#303b31}
.x-pack a .icon{width:20px;height:20px}
.x-pack>button{position:absolute;right:8px;top:6px;border:0;background:none;font-size:22px;line-height:1;padding:4px 6px}
@media(max-width:850px){.x-pack{bottom:86px}}
@media(prefers-reduced-motion:no-preference){.x-pack{animation:x-pack .45s var(--ease)}@keyframes x-pack{from{transform:translateY(40px) rotate(4deg);opacity:0}}}`,
      run(h) {
        const items = h.$$('.sr-benefit-grid>li'), chosen = new Set();
        const note = document.createElement('div'); note.className = 'x-pack'; note.hidden = true; note.setAttribute('role', 'status');
        note.innerHTML = '<p></p><a href="#contact">Заяви демо с тях' + ARROW_E + '</a><button type="button" aria-label="Изчисти избора">×</button>';
        document.body.append(note);
        const names = () => items.filter(li => chosen.has(li)).map(li => li.querySelector('h3').textContent);
        const render = () => {
          const list = names(); note.hidden = !list.length;
          note.querySelector('p').textContent = 'Избрахте ' + list.length + ': ' + list.join(', ') + '.';
          items.forEach(li => { const b = li.querySelector('.x-want'); const on = chosen.has(li); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Избрано ✓' : 'Искам това'; });
        };
        items.forEach(li => {
          const button = document.createElement('button'); button.type = 'button'; button.className = 'x-want';
          button.addEventListener('click', () => { chosen.has(li) ? chosen.delete(li) : chosen.add(li); render(); });
          li.querySelector('.sr-benefit-copy').append(button);
        });
        note.querySelector('button').addEventListener('click', () => { chosen.clear(); render(); });
        note.querySelector('a').addEventListener('click', () => {
          const message = h.$('#demo-message'); if (message && (!message.value || message.value.startsWith('Интересувам се от:'))) message.value = 'Интересувам се от: ' + names().join(', ') + '.';
          note.hidden = true;
        });
        render();
      }
    },

    /* ───────────── Portfolio ───────────── */
    {
      id: 'pf-peek', page: 'portfolio', kinds: ['Interaction'],
      title: 'Hover a project to see it',
      why: 'Seeing all four projects takes four clicks. If simply resting the pointer on a tab switches the big preview, people browse the whole set in one sweep of the mouse. Clicking still works, and touch screens are unaffected.',
      before: 'You must click each tab.',
      after: 'Hovering a tab for a moment switches the preview.',
      try: 'Run the mouse down the four tabs without clicking.',
      view: GALLERY_VIEW,
      run(h) {
        if (!matchMedia('(hover:hover)').matches) return;
        h.$$('.gallery-pick').forEach(pick => {
          let timer = 0;
          pick.addEventListener('pointerenter', () => { timer = setTimeout(() => { if (pick.getAttribute('aria-pressed') !== 'true') pick.click(); }, 140); });
          pick.addEventListener('pointerleave', () => clearTimeout(timer));
        });
      }
    },
    {
      id: 'pf-arrows', page: 'portfolio', kinds: ['Interaction'],
      title: 'Previous and next arrows on the preview',
      why: 'The only way to change project is the list at the side, which on a phone sits below the preview and out of sight. Two hand-drawn arrows on the preview itself make it obvious there is more, and the left and right keys work too.',
      before: 'No controls on the preview.',
      after: 'Paper arrow buttons on the left and right edges step through the four projects in a loop.',
      try: 'Click the arrows on the edges of the big preview.',
      view: GALLERY_VIEW,
      css: `
@media(min-width:851px){.gallery-layout>.gallery-main{grid-column:1;grid-row:1}.gallery-layout>.gallery-index{grid-column:2;grid-row:1}.x-nav{grid-column:1;grid-row:1}}
@media(max-width:850px){.x-nav{grid-column:1;grid-row:2}}
.x-nav{align-self:center;z-index:2;width:54px;height:54px;margin-top:-58px;border:0;display:grid;place-items:center;background:var(--paper);clip-path:polygon(8% 0,100% 6%,92% 100%,0 92%);transition:transform .3s var(--ease),background .2s}
.x-nav-prev{justify-self:start;margin-left:-8px}
.x-nav-next{justify-self:end;margin-right:-8px}
.x-nav:hover{background:var(--yellow);transform:scale(1.12) rotate(-5deg)}
.x-nav svg{width:30px;height:18px;fill:none;stroke:var(--ink);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}`,
      run(h) {
        const layout = h.$('.gallery-layout'), picks = h.$$('.gallery-pick'); if (!layout) return;
        const move = step => picks[(picks.findIndex(p => p.getAttribute('aria-pressed') === 'true') + step + picks.length) % picks.length].click();
        [[-1, 'prev', 'Предишен проект', 'M37 12C26 9 14 14 4 12M13 4 4 12l10 8'], [1, 'next', 'Следващ проект', 'M3 12c11-3 23 2 33 0M27 4l9 8-10 8']].forEach(a => {
          const button = document.createElement('button'); button.type = 'button'; button.className = 'x-nav x-nav-' + a[1]; button.setAttribute('aria-label', a[2]);
          button.innerHTML = '<svg viewBox="0 0 40 24" aria-hidden="true"><path d="' + a[3] + '"/></svg>';
          button.addEventListener('click', () => move(a[0])); layout.append(button);
        });
        layout.addEventListener('keydown', e => { if (e.key === 'ArrowRight') move(1); if (e.key === 'ArrowLeft') move(-1); });
      }
    },
    {
      id: 'pf-device', page: 'portfolio', kinds: ['Interaction'],
      title: 'Computer / phone switch on the preview',
      why: 'Most of your clients\' customers will open the site on a phone, and "удобен и на телефон" is one of the things you sell. A two-button switch that re-lays the same project inside a phone frame proves it on every project.',
      before: 'Projects are only shown as a desktop browser window.',
      after: 'A "Компютър / Телефон" switch in the corner of the preview. Phone mode shows the project stacked in a phone frame, and stays on as you change project.',
      try: 'Click Телефон, then switch project.',
      view: GALLERY_VIEW,
      css: `
@media(min-width:851px){.gallery-layout>.gallery-main{grid-column:1;grid-row:1}.gallery-layout>.gallery-index{grid-column:2;grid-row:1}.x-device{grid-column:1;grid-row:1}}
@media(max-width:850px){.x-device{grid-column:1;grid-row:2}}
.x-device{align-self:start;justify-self:end;z-index:2;margin:12px 14px 0 0;display:flex;background:var(--paper);padding:3px}
.x-device button{border:0;background:none;font-size:12px;font-weight:700;line-height:1;padding:8px 11px}
.x-device button[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.x-phone .gallery-main .project-browser{width:248px;border:7px solid #0a0b0b;border-radius:30px;background:#0a0b0b}
.x-phone .gallery-main .preview-chrome,.x-phone .gallery-main .sample-nav-copy,.x-phone .gallery-main .sample-site-foot{display:none}
.x-phone .gallery-main .sample-site{border-radius:23px;overflow:hidden}
.x-phone .gallery-main .sample-site-nav{padding:9cqw 7cqw 5cqw}
.x-phone .gallery-main .sample-wordmark{font-size:8cqw}
.x-phone .gallery-main .sample-menu-mark{width:7cqw;gap:2cqw;margin-left:auto}
.x-phone .gallery-main .sample-site-hero{grid-template-columns:1fr;min-height:0}
.x-phone .gallery-main .sample-site-copy{padding:8cqw 7cqw}
.x-phone .gallery-main .sample-site-copy h3{font-size:12cqw;margin-bottom:5cqw}
.x-phone .gallery-main .sample-site-copy p{font-size:5cqw;margin-bottom:6cqw;max-width:none}
.x-phone .gallery-main .sample-site-cta{font-size:4.4cqw;padding:4.5cqw 5cqw;min-width:100%;gap:3cqw}
.x-phone .gallery-main .sample-site-cta svg{width:6cqw;height:6cqw}
.x-phone .gallery-main .sample-site-hero>img{min-height:0;max-height:none;height:62cqw}`,
      run(h) {
        const layout = h.$('.gallery-layout'); if (!layout) return;
        const box = document.createElement('div'); box.className = 'x-device'; box.setAttribute('role', 'group'); box.setAttribute('aria-label', 'Изглед');
        box.innerHTML = '<button type="button" aria-pressed="true">Компютър</button><button type="button" aria-pressed="false">Телефон</button>';
        layout.append(box);
        const buttons = [...box.children];
        buttons.forEach((button, i) => button.addEventListener('click', () => {
          layout.classList.toggle('x-phone', i === 1);
          buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        }));
      }
    },
    {
      id: 'pf-cursor', page: 'portfolio', kinds: ['Interaction', 'Motion'],
      title: 'A paper tag follows the cursor over the preview',
      why: 'The big preview opens full screen when clicked, which is its best feature, and the only hint is a small corner arrow plus a handwritten note beside it. A yellow tag reading "Отвори на цял екран" that travels with the pointer makes the whole preview feel pressable.',
      before: 'Normal pointer; small corner icon.',
      after: 'A handwritten yellow tag trails the mouse anywhere over the preview and disappears when you leave.',
      try: 'Move the mouse over the big preview.',
      view: GALLERY_VIEW,
      css: `
.x-cursor{position:fixed;left:0;top:0;z-index:30;pointer-events:none;font:700 23px/1 Caveat,cursive;white-space:nowrap;background:var(--yellow);padding:7px 14px 10px;rotate:-4deg;clip-path:polygon(3% 6%,97% 0,100% 92%,0 100%);opacity:0;scale:.7;transition:opacity .2s,scale .3s var(--ease)}
.x-cursor.x-on{opacity:1;scale:1}`,
      run(h) {
        const main = h.$('.gallery-main'); if (!main || !matchMedia('(hover:hover)').matches) return;
        const tag = document.createElement('span'); tag.className = 'x-cursor'; tag.setAttribute('aria-hidden', 'true'); tag.textContent = 'Отвори на цял екран';
        document.body.append(tag);
        main.addEventListener('pointermove', event => {
          tag.classList.toggle('x-on', Boolean(event.target.closest('.project-stage')));
          tag.style.translate = event.clientX + 18 + 'px ' + (event.clientY + 20) + 'px';
        }, { passive: true });
        main.addEventListener('pointerleave', () => tag.classList.remove('x-on'));
        main.addEventListener('click', () => tag.classList.remove('x-on'));
      }
    },

    /* ───────────── Contact ───────────── */
    {
      id: 'ct-letter', page: 'contact', kinds: ['Interaction', 'Style'],
      title: 'The letter writes itself as you type',
      why: 'The form is dressed as a letter but behaves like any form. As the visitor types, let the letter fill in around them: today\'s date at the top, their business in the opening line, and their name signed in handwriting at the bottom. Filling it in becomes a small pleasure rather than a chore.',
      before: 'Fixed text: "Имам бизнес. И искам да го видя онлайн."',
      after: 'Dated letter. Type a business and the opening line names it; type a name and it appears as a handwritten signature above the button.',
      try: 'Type in "Вашето име" and "Вашият бизнес".',
      view: CONTACT_VIEW,
      css: `
.x-date{display:block;font-size:12px;color:#5a574f;margin:-22px 0 22px}
.x-sign{font:600 22px/1.15 Caveat,cursive;margin:0 0 18px;text-align:right;padding-right:8px}
.x-sign span{display:inline-block;min-width:130px;font-size:38px;font-weight:700;line-height:1;border-bottom:1.5px dotted #7d786c;transform:rotate(-3deg);transform-origin:right;text-align:center;padding:0 8px 2px}
.x-sign span:empty:before{content:"\\00a0"}`,
      run(h) {
        const form = h.$('.postcard-letter'), lead = h.$('.postcard-lead', form);
        const date = document.createElement('span'); date.className = 'x-date';
        date.textContent = new Date().toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' });
        h.$('.postcard-to', form).after(date);
        const sign = document.createElement('p'); sign.className = 'x-sign'; sign.innerHTML = 'Поздрави,<br><span></span>';
        h.$('.contact-submit', form).before(sign);
        const name = h.$('#demo-name', form), business = h.$('#demo-business', form);
        name.addEventListener('input', () => { sign.querySelector('span').textContent = name.value.trim(); });
        business.addEventListener('input', () => {
          const value = business.value.trim();
          lead.textContent = value ? 'Пиша ви за „' + value + '“. Искам да го видя онлайн.' : 'Имам бизнес. И искам да го видя онлайн.';
        });
      }
    },
    {
      id: 'ct-deadline', page: 'contact', kinds: ['Text', 'Interaction'],
      title: 'Say exactly when the demo will arrive',
      why: '"До 24 часа" is a promise; "до утре, 14:30" is an appointment. Working it out from the visitor\'s own clock, at the moment they are deciding, makes the offer feel real and immediate.',
      before: 'A general "24 часа" promise on the left.',
      after: 'A line above the button: "Заявите ли сега, демото е при вас до утре, 14:30." It uses the current time and updates every minute.',
      view: CONTACT_VIEW,
      css: `
.x-deadline{font-size:14px;line-height:1.5;margin:0 0 14px}
.x-deadline b{font-weight:800;background:linear-gradient(var(--yellow),var(--yellow)) no-repeat 0 88%/100% 45%;padding:0 3px;white-space:nowrap}`,
      run(h) {
        const line = document.createElement('p'); line.className = 'x-deadline';
        h.$('.postcard-letter .contact-submit').before(line);
        const update = () => {
          const now = new Date();
          line.innerHTML = 'Заявите ли сега, демото е при вас до <b>утре, ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + '</b>.';
        };
        update(); setInterval(update, 30000);
      }
    },
    {
      id: 'ct-starters', page: 'contact', kinds: ['Interaction', 'Text'],
      title: 'Starter sentences for the hard question',
      why: '"Какъв сайт си представяте?" is the field people abandon, because most owners have no idea how to describe a website. Four handwritten starters, matching the three examples above, let them answer with one tap and edit from there.',
      before: 'An empty box and a blinking cursor.',
      after: 'Four tappable lines above the box: online menu and orders, bookings, selling online, or "Още не знам — предложете ми". Tapping one writes it into the box.',
      try: 'Click one of the handwritten lines.',
      view: CONTACT_VIEW,
      css: `
.x-starters{display:flex;flex-wrap:wrap;gap:6px 8px;margin:-6px 0 12px}
.x-starters button{border:0;background:var(--warm);font:600 19px/1 Caveat,cursive;padding:7px 12px 9px;clip-path:polygon(2% 8%,98% 0,100% 90%,0 100%);transition:background .2s,transform .25s var(--ease)}
.x-starters button:hover{background:var(--pale-blue);transform:rotate(-2deg)}
.x-starters button[aria-pressed="true"]{background:var(--yellow)}`,
      run(h) {
        const field = h.$('.postcard-letter .contact-field:has(textarea)'), area = h.$('textarea', field);
        const lines = ['Искам онлайн меню и поръчки.', 'Искам клиентите да си записват час.', 'Искам да продавам онлайн.', 'Още не знам — предложете ми.'];
        const row = document.createElement('div'); row.className = 'x-starters';
        row.innerHTML = lines.map(text => '<button type="button" aria-pressed="false">' + text + '</button>').join('');
        field.before(row);
        const buttons = [...row.children];
        buttons.forEach(button => button.addEventListener('click', () => {
          buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
          area.value = button.textContent + ' '; area.focus();
        }));
      }
    },

    /* ───────────── Whole page and phone ───────────── */
    {
      id: 'scroll-progress', page: 'footer', kinds: ['Motion'],
      title: 'A marker line shows how far down the page you are',
      why: 'It is one long page, and the menu only tells you which section you are in, not how much is left. A yellow marker stroke along the very top that grows as you scroll answers that at a glance, in the site\'s own material.',
      before: 'No sense of progress.',
      after: 'A yellow line across the top edge fills from left to right as the page scrolls.',
      try: 'Scroll inside the After frame and watch the top edge.',
      view: { sel: '#services', dy: 120, h: 300 },
      css: `
.x-progress{position:fixed;left:0;top:0;z-index:35;width:100%;height:7px;background:var(--yellow);transform:scaleX(var(--p,0));transform-origin:left;clip-path:polygon(0 0,100% 0,100% 62%,0 100%);pointer-events:none}`,
      run() {
        const bar = document.createElement('i'); bar.className = 'x-progress'; bar.setAttribute('aria-hidden', 'true'); document.body.append(bar);
        const update = () => bar.style.setProperty('--p', Math.min(1, scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)).toFixed(4));
        addEventListener('scroll', update, { passive: true }); addEventListener('resize', update); update();
      }
    },
    {
      id: 'to-top', page: 'footer', kinds: ['Interaction'],
      title: 'A back-to-top arrow',
      why: 'From the portfolio or the form, the way back up is a long scroll. A small paper square with the arrow pointing up, the mirror of the big down arrow on the first screen, brings people back in one tap.',
      before: 'No shortcut back to the top.',
      after: 'A yellow paper button appears bottom-right once you are past the first screen. It sits above the demo bar on phones.',
      try: 'Click the yellow button in the bottom-right corner.',
      view: { sel: '#portfolio', dy: 140, h: 460 },
      css: `
.x-top{position:fixed;right:20px;bottom:20px;z-index:24;width:56px;height:56px;border:0;display:grid;place-items:center;background:var(--yellow);clip-path:polygon(8% 0,100% 6%,92% 100%,0 92%);transform:translateY(140%) rotate(8deg);transition:transform .5s var(--ease)}
.x-top.x-show{transform:rotate(-4deg)}
.x-top.x-show:hover{transform:rotate(0) translateY(-5px)}
.x-top svg{width:26px;height:26px;fill:none;stroke:var(--ink);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
@media(max-width:850px){.x-top{right:14px;bottom:86px;width:50px;height:50px}}`,
      run(h) {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'x-top'; button.setAttribute('aria-label', 'Към началото');
        button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V4M5 11l7-7 7 7"/></svg>';
        document.body.append(button);
        button.addEventListener('click', () => scrollTo({ top: 0, behavior: h.reduced ? 'instant' : 'smooth' }));
        const update = () => button.classList.toggle('x-show', scrollY > innerHeight);
        addEventListener('scroll', update, { passive: true }); update();
      }
    },
    {
      id: 'm-menu', page: 'footer', kinds: ['Layout', 'Motion'], mobile: true,
      title: 'On phones: the menu opens as a full yellow sheet',
      why: 'The phone menu is a small yellow box that drops over the corner of the page, with the page still scrolling behind it. A full-screen sheet with big links that arrive one after another, and the demo button at the bottom, feels deliberate and gives thumbs proper targets.',
      before: 'A compact dropdown over part of the page.',
      after: 'The whole screen turns yellow, links are large and stagger in, and "Заяви безплатно демо" sits at the bottom as a black button.',
      try: 'Tap the round menu button in both frames.',
      view: { w: 390, sel: 'body', dy: 0, h: 760 },
      css: `
@media(max-width:850px){
  html.x-menu-open{overflow:hidden}
  html.x-menu-open .sticky-demo{display:none}
  .menu-toggle,.brand{position:relative;z-index:21}
  .expanded-menu{position:fixed;inset:0;top:0;width:auto;display:flex;flex-direction:column;padding:104px 26px 28px;box-shadow:none;overflow:auto}
  .expanded-menu a{font-size:clamp(32px,10vw,44px);font-weight:800;letter-spacing:-.045em;padding:16px 0}
  .expanded-menu a .icon{width:30px;height:30px}
  .expanded-menu .menu-note{font:600 26px/1.05 Caveat,cursive;max-width:none;margin-top:26px;transform:rotate(-2deg)}
  .expanded-menu a.x-menu-cta{margin-top:auto;border:0;background:var(--ink);color:var(--paper);font-size:17px;letter-spacing:-.02em;padding:20px 22px}
  .expanded-menu a.x-menu-cta .icon{width:26px;height:26px}
}
@media(max-width:850px) and (prefers-reduced-motion:no-preference){
  .expanded-menu{animation:x-sheet .4s var(--ease)}
  @keyframes x-sheet{from{clip-path:circle(0 at calc(100% - 44px) 42px)}to{clip-path:circle(150% at calc(100% - 44px) 42px)}}
  .expanded-menu a,.expanded-menu .menu-note{animation:x-link .5s var(--ease) backwards}
  .expanded-menu a:nth-child(1){animation-delay:.1s}.expanded-menu a:nth-child(2){animation-delay:.15s}.expanded-menu a:nth-child(3){animation-delay:.2s}.expanded-menu a:nth-child(4){animation-delay:.25s}.expanded-menu a:nth-child(5){animation-delay:.3s}.expanded-menu .menu-note{animation-delay:.36s}.expanded-menu a.x-menu-cta{animation-delay:.42s}
  @keyframes x-link{from{opacity:0;transform:translateY(22px) rotate(-2deg)}}
}
@media(min-width:851px){.x-menu-cta{display:none}}`,
      run(h) {
        const menu = h.$('#expanded-menu'), toggle = h.$('.menu-toggle');
        const cta = document.createElement('a'); cta.className = 'x-menu-cta'; cta.href = '#contact'; cta.innerHTML = 'Заяви безплатно демо' + ARROW_E;
        menu.append(cta);
        new MutationObserver(() => document.documentElement.classList.toggle('x-menu-open', toggle.getAttribute('aria-expanded') === 'true')).observe(toggle, { attributes: true, attributeFilter: ['aria-expanded'] });
      }
    },

    /* ───────────── Still on offer from the first round ───────────── */
    {
      id: 'labels', page: 'earlier', kinds: ['Text', 'Style'],
      title: 'Small labels in a human voice',
      why: 'Tracked-out capitals ("WEB DESIGN STUDIO", "УЕБСАЙТОВЕ ЗА ПО-СИЛНО ПРИСЪСТВИЕ", four identical "НАУЧЕТЕ ПОВЕЧЕ") are the most template-looking thing on a page whose charm is handwriting and cut paper. Four links with the same words also tell nobody where they go.',
      before: 'All-caps tags; every tile says "Learn more".',
      after: 'Handwritten studio tag, a real sentence under the headline, and each tile link says what you will find.',
      view: { sel: 'body', dy: 0, h: 880, x: 0, cw: 700 },
      css: `
.brand>span{font:600 25px/1 Caveat,cursive!important;letter-spacing:0!important;transform:rotate(-4deg) translateY(3px);max-width:none!important}
.hero-caption{font-size:18px!important;font-weight:700;letter-spacing:-.02em!important;line-height:1.25}
.tile-link{text-transform:none;font-size:13px!important;letter-spacing:-.01em!important;font-weight:700}
.footer-label{font-size:18px!important;letter-spacing:-.02em!important;font-weight:800}
@media(max-width:600px){.brand>span{font-size:19px!important}.hero-caption{font-size:15px!important}}`,
      run(h) {
        h.$('.brand>span').textContent = 'уеб студио';
        h.$('.hero-caption').innerHTML = 'Уебсайтове за<br>по-силно присъствие.';
        const labels = { 'design-tile': 'Как го правим', 'seo-tile': 'Как ви намират', 'hosting-tile': 'Какво поемаме', 'support-tile': 'Как помагаме' };
        Object.keys(labels).forEach(c => { h.$('.' + c + ' .tile-link').firstChild.textContent = labels[c] + ' '; });
        h.$('.project-tile .tile-link').firstChild.textContent = 'Вижте проектите ';
        h.$('.footer-label').textContent = 'Всичко е поето от нас.';
      }
    },
    {
      id: 'svc-readable', page: 'earlier', kinds: ['Style'],
      title: 'Service cards you can read without leaning in',
      why: 'The benefit sentence is 13px and the checklist 12px in grey-ish ink, the smallest text on the page in the section that has to sell.',
      before: 'Benefit 13px, checklist 12px, hairline ticks.',
      after: 'Benefit 16px, checklist 14px as ruled rows with a heavier tick, bigger benefit heading and section intro.',
      view: { sel: '.sr-benefit-journey', dy: -100, h: 400, x: 90, cw: 640 },
      css: `
.si-heading>p{font-size:16px;line-height:1.65;max-width:36ch}
.sr-benefit-copy h4{font-size:26px}
.sr-benefit-copy>p{font-size:16px;line-height:1.6}
.sr-benefit-copy .si-includes{margin-top:18px;gap:0;border-top:1px solid #0b0c0e26}
.sr-benefit-copy .si-includes li{font-size:14px;line-height:1.5;padding:10px 0 10px 28px;border-bottom:1px solid #0b0c0e26}
.sr-benefit-copy .si-includes li:before{left:3px;top:15px;width:10px;height:5px;border-width:2px}`
    },
    {
      id: 'pf-copy', page: 'earlier', kinds: ['Text'],
      title: 'The portfolio footnote talks to visitors, not to you',
      why: '"Примерни имена и визии — тук ще бъдат вашите 4 завършени сайта." is a note to the site owner, but it is live text every visitor reads. Until real projects exist, say honestly that these are concepts, and use the line to invite the next client.',
      before: '"Примерни имена и визии — тук ще бъдат вашите 4 завършени сайта."',
      after: '"Това са концепции на Lumina за различни бизнеси. Следващият проект тук може да е вашият." with a link to the demo form.',
      view: { sel: '.portfolio-embedded>.demo-disclosure', dy: -130, h: 200, x: 0, cw: 760 },
      css: `.portfolio-embedded>.demo-disclosure{font-size:15px;color:var(--ink);max-width:60ch}.portfolio-embedded>.demo-disclosure a{font-weight:700;border-bottom:2px solid var(--ink);padding-bottom:1px;margin-left:6px;white-space:nowrap}.portfolio-embedded>.demo-disclosure a:hover{background:var(--yellow)}`,
      run(h) {
        h.$('.portfolio-embedded>.demo-disclosure').innerHTML = 'Това са концепции на Lumina за различни бизнеси. Следващият проект тук може да е вашият. <a href="#contact">Заявете безплатно демо</a>';
        const label = h.$('.viewer-label'); if (label) label.textContent = 'Концепция на Lumina';
      }
    },
    {
      id: 'ct-send', page: 'earlier', kinds: ['Motion', 'Interaction'],
      title: 'Fields that answer, and a letter that gets sent',
      why: 'Focus is currently a blue rectangle around an underlined field, and sending produces a line of small text. The moment someone asks for a demo is the one place on the site that deserves a reaction.',
      before: 'Blue focus box; pink button; a text message appears under the form.',
      after: 'The underline inks in and the label gets a marker swipe on focus. The button is ink with a sliding arrow. On send, the letter lifts off and a handwritten confirmation takes its place.',
      try: 'Click a field, then press the button (fields are pre-filled in this preview so you can just send).',
      note: 'The real form does not send anything yet. This is the behaviour to add once it is wired to email or a form service.',
      view: CONTACT_VIEW,
      css: `
.contact-field input,.contact-field textarea{background:linear-gradient(var(--ink),var(--ink)) no-repeat 0 100%/0 2px;transition:background-size .4s var(--ease)}
.contact-field input:focus,.contact-field textarea:focus{outline:0;border-bottom-color:#7d786c;background-size:100% 2px}
.contact-field>span{width:max-content;background:linear-gradient(var(--yellow),var(--yellow)) no-repeat 0 85%/0 45%;transition:background-size .35s var(--ease);padding:0 3px;margin-left:-3px}
.contact-field:focus-within>span{background-size:100% 45%}
.postcard-letter .contact-submit{background:var(--ink);color:var(--paper)}
.postcard-letter .contact-submit:hover{background:var(--yellow);color:var(--ink)}
.contact-submit svg{transition:transform .3s var(--ease)}
.contact-submit:hover svg{transform:translateX(7px)}
.postcard-letter .contact-preview-note,.postcard-letter .contact-form-status{display:none!important}
.x-letter-wrap{position:relative;min-width:0}
.x-sent{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:18px;text-align:center;padding:24px;opacity:0;visibility:hidden;transition:opacity .5s .55s,visibility 0s .55s}
.x-sent strong{font:700 clamp(40px,4.4vw,60px)/.92 Caveat,cursive;transform:rotate(-4deg);background:var(--yellow);padding:16px 28px 20px;clip-path:polygon(3% 5%,97% 0,100% 93%,1% 100%)}
.x-sent p{font-size:16px;line-height:1.6;max-width:28ch;color:#0c2837}
.x-sent button{background:none;border:0;font-size:13px;text-decoration:underline;text-underline-offset:5px;padding:10px}
.x-letter-wrap.x-is-sent .x-sent{opacity:1;visibility:visible}
.x-letter-wrap.x-is-sent .postcard-letter{pointer-events:none;opacity:0;transform:translateY(-120%) rotate(-9deg) scale(.7);transition:transform .8s cubic-bezier(.5,0,.75,0),opacity .25s .55s}`,
      run(h) {
        const form = h.$('.postcard-letter');
        const wrap = document.createElement('div'); wrap.className = 'x-letter-wrap'; form.before(wrap); wrap.append(form);
        wrap.insertAdjacentHTML('beforeend', '<div class="x-sent" role="status"><strong>Получихме го!</strong><p>До 24 часа ще ви изпратим първия дизайн на вашия сайт.</p><button type="button">Напишете ни още нещо</button></div>');
        const sample = { name: 'Мария', business: 'Пекарна „Жито“', email: 'maria@example.com' };
        Object.keys(sample).forEach(k => { const input = form.querySelector('#demo-' + k); if (input && !input.value) input.value = sample[k]; });
        form.addEventListener('submit', () => wrap.classList.add('x-is-sent'));
        wrap.querySelector('.x-sent button').addEventListener('click', () => { wrap.classList.remove('x-is-sent'); form.querySelector('textarea').focus(); });
      }
    },
    {
      id: 'ct-chips', page: 'earlier', kinds: ['Interaction', 'Text'],
      title: 'Tap your kind of business instead of typing it',
      why: 'The form asks a busy owner to describe their business in a blank field. Most visitors fall into a handful of types, the same ones the examples above show. One tap fills the field and makes the form feel shorter.',
      before: 'Empty "Вашият бизнес" text field.',
      after: 'A row of paper chips (Ресторант, Салон, Магазин, Услуги, Друго) that fill the field; typing still works.',
      try: 'Click a chip.',
      view: CONTACT_VIEW,
      css: `
.x-chips{display:flex;flex-wrap:wrap;gap:7px;margin:-4px 0 20px}
.x-chips button{border:0;background:var(--warm);font-size:13px;font-weight:600;line-height:1.3;padding:8px 14px;clip-path:polygon(3% 8%,97% 0,100% 90%,1% 100%);transition:background .2s,transform .25s var(--ease)}
.x-chips button:hover{background:var(--pale-blue)}
.x-chips button[aria-pressed="true"]{background:var(--yellow);transform:rotate(-2deg) scale(1.06)}`,
      run(h) {
        const form = h.$('.postcard-letter'), input = form.querySelector('#demo-business');
        const row = document.createElement('div'); row.className = 'x-chips'; row.setAttribute('role', 'group'); row.setAttribute('aria-label', 'Вид бизнес');
        row.innerHTML = ['Ресторант', 'Салон', 'Магазин', 'Услуги', 'Друго'].map(t => '<button type="button" aria-pressed="false">' + t + '</button>').join('');
        form.querySelector('.contact-field-pair').after(row);
        const buttons = [...row.children];
        buttons.forEach(b => b.addEventListener('click', () => {
          buttons.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          if (b.textContent === 'Друго') { input.value = ''; input.focus(); } else input.value = b.textContent;
        }));
        input.addEventListener('input', () => buttons.forEach(x => x.setAttribute('aria-pressed', String(x.textContent === input.value))));
      }
    },
    {
      id: 'ft-close', page: 'earlier', kinds: ['Layout', 'Style', 'Text'],
      title: 'A footer that ends the page',
      why: 'The page currently stops on one thin line of 12–14px text. There is no second chance at the navigation, no contact details, no closing statement. A studio site should finish as confidently as it starts.',
      before: 'A single hairline row: label, one sentence, one link.',
      after: 'A full-width ink sheet with a last big line, the yellow demo note, the navigation again, and room for email and copyright.',
      note: 'The email address shown is a placeholder. Send me the real contact details and I will put them in.',
      view: { sel: 'footer.bottom-line', dy: -180, h: 620 },
      css: `
footer.bottom-line{display:block;border:0;background:var(--ink);color:var(--paper);margin-top:76px;padding:76px 0 30px;min-height:0;box-shadow:0 0 0 100vmax var(--ink);clip-path:inset(0 -100vmax)}
.x-foot-top{display:flex;justify-content:space-between;align-items:center;gap:40px}
.x-foot-top h2{font-size:clamp(44px,6.6vw,104px);line-height:.98;font-weight:800;letter-spacing:-.055em}
.x-foot-cta{flex-shrink:0;display:grid;place-items:center;width:230px;height:200px;background:var(--yellow);color:var(--ink);font:700 39px/.92 Caveat,cursive;text-align:center;transform:rotate(-7deg);clip-path:polygon(24% 0,74% 9%,100% 38%,90% 92%,22% 100%,0 44%);transition:transform .4s var(--ease)}
.x-foot-cta:hover{transform:rotate(-2deg) scale(1.06)}
.x-foot-cols{display:grid;grid-template-columns:1.2fr 1fr auto;gap:40px;align-items:end;margin-top:64px;padding-top:26px;border-top:1px solid #fffefa33}
.x-foot-cols nav{display:flex;flex-wrap:wrap;gap:10px 28px;font-size:15px;font-weight:600}
.x-foot-cols nav a:hover,.x-foot-mail:hover{color:var(--yellow)}
.x-foot-cols p{font-size:14px;line-height:1.65;color:#fffefab3}
.x-foot-mail{font-size:20px;font-weight:700;letter-spacing:-.02em}
.x-foot-legal{font-size:12px;color:#fffefa80;margin-top:36px}
@media(max-width:850px){.x-foot-top{flex-direction:column;align-items:flex-start}.x-foot-cta{width:190px;height:166px;font-size:33px;align-self:flex-end}.x-foot-cols{grid-template-columns:1fr;gap:22px;margin-top:40px;align-items:start}footer.bottom-line{padding-top:50px;margin-top:50px}}`,
      run(h) {
        h.$('footer.bottom-line').innerHTML = '<div class="x-foot-top"><h2>Имате идея?<br>Да я пуснем онлайн.</h2><a class="x-foot-cta" href="#contact"><span>Заяви<br>безплатно<br>демо</span></a></div><div class="x-foot-cols"><nav aria-label="Долна навигация"><a href="#home">Начало</a><a href="#why-sites">Защо ви е сайт?</a><a href="#services">Нашите услуги</a><a href="#portfolio">Портфолио</a><a href="#contact">Контакт</a></nav><p>Сайт, SEO, хостинг, домейн и поддръжка.<br>Всичко е поето от нас.</p><a class="x-foot-mail" href="#contact">hello@lumina.example</a></div><p class="x-foot-legal">© 2026 Lumina. Уеб студио.</p>';
      }
    }
  ];

  // The portfolio now runs the real sites live, so the ideas written for the old placeholder gallery no longer apply.
  // The logo was enlarged by 25% on the site itself, so the ten logo options are closed too.
  const retired = ['pf-peek', 'pf-arrows', 'pf-device', 'pf-cursor', 'pf-copy',
    'logo-220', 'logo-264', 'logo-solo', 'logo-stacked', 'logo-light', 'logo-heavy', 'logo-marker', 'logo-hand', 'logo-paper', 'logo-shrink'];
  window.LUMINA_IDEAS = window.LUMINA_IDEAS.filter(idea => !retired.includes(idea.id));
})();
