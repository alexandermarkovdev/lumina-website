// Preview-only script: rearranges the real "why a site" section into one of four proposals.
// Runs after overview.js, so the example sites stay clickable.
(() => {
  'use strict';
  const variant = document.body.dataset.variant;
  const section = document.querySelector('#why-sites');
  const grid = section?.querySelector('.overview-grid');
  if (!grid || !variant || variant === '0') return;
  const sites = { pizza: grid.querySelector('.pizza-preview'), salon: grid.querySelector('.salon-preview'), brick: grid.querySelector('.brick-preview') };
  const kinds = { pizza: 'Ресторант', salon: 'Фризьор', brick: 'Магазин' };
  const features = [
    { site: 'pizza', name: 'Онлайн меню', text: 'Клиентът разглежда ястията и цените от телефона си.', target: '.preview-filters, .preview-menu' },
    { site: 'pizza', name: 'QR код за масата', text: 'Сканира се с камерата и отваря менюто.', target: '.preview-qr' },
    { site: 'pizza', name: 'Поръчка за вкъщи', text: 'Поръчката стига до вас без телефонен разговор.', target: '.preview-action' },
    { site: 'pizza', name: 'Работно време', text: 'Вижда се веднага, без да ви търсят по телефона.', target: '.preview-widget' },
    { site: 'salon', name: 'Записване на час', text: 'Клиентът сам избира ден и свободен час.', target: '.preview-days, .preview-times' },
    { site: 'salon', name: 'Потвърждение по SMS и имейл', text: 'Клиентът получава потвърждение за часа си.', target: '.booking-widget' },
    { site: 'brick', name: 'Продукти с цени', text: 'Количеството и крайната цена се смятат сами.', target: '.preview-product' },
    { site: 'brick', name: 'Чести въпроси', text: 'Отговорите са на сайта, преди да ви се обадят.', target: '.preview-faq' },
    { site: 'brick', name: 'Карта до вас', text: 'Клиентът вижда къде се намирате.', target: '.preview-map' }
  ];
  const check = '<i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg></i>';
  const make = (tag, cls, html) => { const node = document.createElement(tag); if (cls) node.className = cls; if (html != null) node.innerHTML = html; return node; };

  function highlight(feature) {
    section.querySelectorAll('.hl').forEach(node => node.classList.remove('hl'));
    sites[feature.site].querySelectorAll(feature.target).forEach(node => node.classList.add('hl'));
  }
  function show(site) {
    Object.entries(sites).forEach(([key, article]) => article.classList.toggle('is-shown', key === site));
  }
  // A clickable list of one site's features; pressing one rings it on that site.
  function ticks(site) {
    const list = make('ul', 'v-ticks');
    features.filter(feature => feature.site === site).forEach(feature => {
      const item = make('li');
      const button = make('button', 'v-tick', `${check}<strong>${feature.name}</strong><small>${feature.text}</small>`);
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        section.querySelectorAll('.v-tick').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        highlight(feature);
      });
      item.append(button); list.append(item);
    });
    return list;
  }
  const calm = () => Object.values(sites).forEach(article => article.classList.add('v-calm'));
  // The intro lines are set wider here than in three narrow columns, so their forced breaks go.
  section.querySelectorAll(variant === '1' || variant === '3' ? '.preview-intro br' : '.preview-intro > p br').forEach(node => node.replaceWith(' '));

  if (variant === '1') {
    calm();
    const layout = make('div', 'v1-layout');
    const side = make('div');
    side.append(make('p', 'v1-hint', 'Изберете какво ви трябва и вижте как работи на примерен сайт.'));
    const list = make('div', 'v1-list');
    const description = make('p', 'v1-desc');
    const stage = make('div', 'v-stage');
    grid.before(layout);
    stage.append(grid);
    const buttons = features.map(feature => {
      const button = make('button', 'v-feature', `<i></i><strong>${feature.name}</strong><small>${feature.text}</small>`);
      button.type = 'button';
      button.dataset.site = feature.site;
      button.addEventListener('click', () => choose(feature, button));
      list.append(button);
      return button;
    });
    function choose(feature, button) {
      buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      description.textContent = feature.text;
      show(feature.site);
      highlight(feature);
      // Phones: the feature row scrolls sideways, so keep the chosen one in view.
      list.scrollTo({ left: button.offsetLeft - list.offsetLeft - (list.clientWidth - button.offsetWidth) / 2 });
    }
    side.append(list, description);
    layout.append(side, stage);
    choose(features[4], buttons[4]);
  }

  if (variant === '2') {
    calm();
    const tabs = make('div', 'v2-tabs');
    tabs.setAttribute('role', 'tablist');
    const stage = make('div', 'v-stage');
    grid.before(tabs, stage);
    stage.append(grid);
    const buttons = Object.keys(sites).map(site => {
      const article = sites[site];
      const side = make('div', 'v2-side');
      side.append(article.querySelector('.preview-intro'), ticks(site));
      article.append(side);
      const tab = make('button', 'v2-tab', kinds[site]);
      tab.type = 'button';
      tab.dataset.site = site;
      tab.setAttribute('role', 'tab');
      tab.addEventListener('click', () => {
        buttons.forEach(other => other.setAttribute('aria-selected', String(other === tab)));
        section.querySelectorAll('.hl').forEach(node => node.classList.remove('hl'));
        show(site);
      });
      tabs.append(tab);
      return tab;
    });
    buttons[1].click();
  }

  if (variant === '3') {
    calm();
    const reasons = [...section.querySelectorAll('.overview-lead li')].map(item => {
      const title = item.querySelector('strong').textContent.trim();
      return { title, text: item.textContent.replace(title, '').trim() };
    });
    Object.keys(sites).forEach((site, index) => {
      const article = sites[site];
      const text = make('div', 'v3-text');
      text.append(make('div', 'v3-number', String(index + 1)), make('h3', 'v3-reason', reasons[index].title), make('p', 'v3-why', reasons[index].text), article.querySelector('.preview-intro'));
      article.prepend(text);
    });
    // "More people find you": what a nearby search shows once the business has a site.
    sites.pizza.querySelector('.preview-stage').prepend(make('div', 'v3-search',
      '<div class="v3-q"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>пицария наблизо</div>' +
      '<strong>La Tavola</strong><small>latavola · примерен сайт</small><p>Отворено до 23:00</p><span><b>Към сайта</b><b>Упътване</b></span>'));
  }

  if (variant === '4') {
    calm();
    Object.keys(sites).forEach(site => sites[site].append(ticks(site)));
  }
})();
