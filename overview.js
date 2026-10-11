(() => {
  'use strict';
  // The three example sites respond to clicks, and swipe as a carousel on phones.
  const grid = document.querySelector('.overview-grid');
  if (!grid) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const all = (selector, root) => [...root.querySelectorAll(selector)];
  function live(element, action) {
    element.classList.add('is-live');
    element.tabIndex = 0;
    element.setAttribute('role', 'button');
    element.addEventListener('click', action);
    element.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); action(); }
    });
  }
  const pick = (list, chosen) => list.forEach(item => item.classList.toggle('selected', item === chosen));
  function pop(element) {
    element.classList.remove('pop');
    void element.offsetWidth;
    element.classList.add('pop');
  }
  function flash(button, text) {
    const label = button.querySelector('span');
    const original = label.dataset.original || (label.dataset.original = label.textContent);
    label.textContent = text;
    clearTimeout(button.flashTimer);
    button.flashTimer = setTimeout(() => { label.textContent = original; }, 1800);
  }

  // Pizzeria: menu categories.
  const pizza = grid.querySelector('.pizza-preview');
  const filters = all('.preview-filters > span', pizza);
  const menu = pizza.querySelector('.preview-menu');
  const menus = {
    'Пици': [['Маргарита', 'Домати, моцарела, босилек', '9,90 €'], ['Пеперони', 'Доматен сос, моцарела, пеперони', '11,90 €'], ['Четири сирена', 'Моцарела, горгонзола, пармезан', '12,90 €']],
    'Салати': [['Капрезе', 'Домати, моцарела, песто', '7,90 €'], ['Цезар', 'Айсберг, пиле, пармезан', '8,90 €'], ['Гръцка', 'Домати, краставици, сирене', '7,50 €']],
    'Напитки': [['Домашна лимонада', 'Лимон, мента, мед', '3,90 €'], ['Еспресо', 'Късо или дълго', '2,20 €'], ['Чаша вино', 'Бяло или червено', '4,50 €']]
  };
  filters.forEach(filter => live(filter, () => {
    pick(filters, filter);
    menu.innerHTML = menus[filter.textContent.trim()].map(item => `<div><p><strong>${item[0]}</strong><small>${item[1]}</small></p><b>${item[2]}</b></div>`).join('');
    menu.classList.remove('menu-rows');
    void menu.offsetWidth;
    menu.classList.add('menu-rows');
  }));
  const pizzaAction = pizza.querySelector('.preview-action');
  live(pizzaAction, () => flash(pizzaAction, 'Поръчката е приета'));

  // Salon: day, hour and confirmation.
  const salon = grid.querySelector('.salon-preview');
  const days = all('.preview-days > span', salon);
  const times = all('.preview-times > span', salon);
  const widget = salon.querySelector('.booking-widget');
  const status = widget.querySelector('strong');
  const when = widget.querySelector('small');
  const dayNames = { 'Пн': 'Понеделник', 'Вт': 'Вторник', 'Ср': 'Сряда', 'Чт': 'Четвъртък', 'Пт': 'Петък' };
  let touched = false;
  function syncBooking(confirmed) {
    const day = days.find(item => item.classList.contains('selected'));
    const time = times.find(item => item.classList.contains('selected'));
    when.textContent = `${dayNames[day.firstChild.textContent.trim()]}, ${day.querySelector('strong').textContent}-и · ${time.textContent}`;
    status.textContent = confirmed ? 'Часът е потвърден' : 'Избрахте час';
    if (confirmed) pop(widget);
  }
  days.forEach(day => live(day, () => { touched = true; pick(days, day); syncBooking(false); }));
  times.forEach(time => live(time, () => { touched = true; pick(times, time); syncBooking(false); }));
  live(salon.querySelector('.preview-action'), () => { touched = true; syncBooking(true); });
  // Book one slot by itself the first time the salon scrolls into view, so people notice it works.
  if (!reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      setTimeout(() => { if (!touched) { pick(times, times[2]); syncBooking(false); } }, 900);
      setTimeout(() => { if (!touched) syncBooking(true); }, 1700);
    }, { threshold: .5 });
    observer.observe(salon);
  }

  // Building materials: quantity and questions.
  const brick = grid.querySelector('.brick-preview');
  const quantity = brick.querySelector('.preview-quantity');
  const price = brick.querySelector('.preview-product strong');
  const unit = brick.querySelector('.preview-product small');
  quantity.innerHTML = '<button type="button" aria-label="По-малко">−</button><b>1</b><button type="button" aria-label="Повече">+</button>';
  let count = 1;
  function setCount(next) {
    count = Math.min(9, Math.max(1, next));
    quantity.querySelector('b').textContent = count;
    price.textContent = `${(96 * count).toFixed(2).replace('.', ',')} €`;
    unit.textContent = `${count} ${count === 1 ? 'палет' : 'палета'} · ${80 * count} броя`;
    pop(price);
  }
  const [less, more] = quantity.querySelectorAll('button');
  less.addEventListener('click', () => setCount(count - 1));
  more.addEventListener('click', () => setCount(count + 1));
  const brickAction = brick.querySelector('.preview-action');
  live(brickAction, () => flash(brickAction, 'Добавено в поръчката'));
  const answers = ['Да, с наш транспорт до адреса.', 'Да, няма минимално количество.', 'Да, от 9:00 до 14:00.'];
  all('.preview-faq > div:not(.preview-note)', brick).forEach((row, index) => {
    row.tabIndex = 0;
    row.setAttribute('role', 'button');
    row.setAttribute('aria-expanded', 'false');
    const toggle = () => {
      const open = row.getAttribute('aria-expanded') !== 'true';
      row.setAttribute('aria-expanded', String(open));
      row.querySelector('p')?.remove();
      if (open) { const answer = document.createElement('p'); answer.textContent = answers[index]; row.append(answer); }
    };
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); }
    });
  });

  // Phones: mark which example is centred in the swipe row.
  const cards = [...grid.children];
  const dots = [...document.querySelectorAll('.overview-dots i')];
  const centre = card => card.offsetLeft + card.offsetWidth / 2;
  grid.addEventListener('scroll', () => {
    const middle = grid.scrollLeft + grid.clientWidth / 2;
    const nearest = cards.reduce((best, card, index) => Math.abs(centre(card) - middle) < Math.abs(centre(cards[best]) - middle) ? index : best, 0);
    dots.forEach((dot, index) => dot.classList.toggle('on', index === nearest));
    tabs.forEach((tab, index) => tab.setAttribute('aria-pressed', String(index === nearest)));
  }, { passive: true });

  // Phones: the three examples are named above the row, so it is plain there is more than one; a tap switches.
  const tabRow = document.createElement('div');
  tabRow.className = 'overview-tabs';
  tabRow.setAttribute('role', 'group');
  tabRow.setAttribute('aria-label', 'Примерни сайтове');
  const tabs = cards.map((card, index) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.textContent = card.querySelector('.preview-kind').textContent;
    tab.setAttribute('aria-pressed', String(index === 0));
    tab.addEventListener('click', () => grid.scrollTo({ left: centre(card) - grid.clientWidth / 2, behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
    tabRow.append(tab);
    return tab;
  });
  grid.before(tabRow);
  // The first time the row comes into view it slides aside for a moment and shows the edge of the next example.
  if (!reducedMotion.matches) {
    const nudge = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      nudge.disconnect();
      if (!matchMedia('(max-width: 600px)').matches || grid.scrollLeft > 4) return;
      grid.classList.add('is-nudging');
      setTimeout(() => grid.classList.remove('is-nudging'), 1400);
    }, { threshold: .45 });
    nudge.observe(grid);
  }
})();
