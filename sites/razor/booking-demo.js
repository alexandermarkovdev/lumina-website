(() => {
  'use strict';
  // Online booking demo for the portfolio copy of the site. Availability is sample data:
  // nothing is sent anywhere and no appointment is made. Rebuilt from the booking form of
  // the September design (razor-design-variants), restyled for the current page.
  // To make it real, replace getSlots() and submit() with calls to a booking backend.
  const form = document.getElementById('booking-form');
  if (!form) return;
  const SHOP = { timeZone: 'Europe/Sofia', closedDay: 2, opens: 600, closes: 1140, slotMinutes: 30, days: 10 };
  const WEEKDAYS = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const daysRow = form.querySelector('#booking-days');
  const slotsBox = form.querySelector('#booking-slots');
  const status = form.querySelector('#booking-status');
  const nameInput = form.querySelector('#customer-name');
  const phoneInput = form.querySelector('#customer-phone');
  const submit = form.querySelector('#booking-submit');
  const message = form.querySelector('#booking-message');
  let selectedDate = '';

  function shopNow(now = new Date()) {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: SHOP.timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(part => [part.type, part.value]));
    return { date: `${parts.year}-${parts.month}-${parts.day}`, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
  }
  const addDays = (iso, days) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10); };
  const weekday = iso => new Date(`${iso}T12:00:00Z`).getUTCDay();
  const formatDate = iso => new Intl.DateTimeFormat('bg-BG', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));

  function getSlots(iso, now = shopNow()) {
    if (iso < now.date || iso > addDays(now.date, SHOP.days - 1) || weekday(iso) === SHOP.closedDay) return [];
    const seed = Number(iso.slice(8));
    const result = [];
    for (let minute = SHOP.opens, index = 0; minute + SHOP.slotMinutes <= SHOP.closes; minute += SHOP.slotMinutes, index += 1) {
      const time = `${String(Math.floor(minute / 60)).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`;
      // A different handful of taken hours each day, so the calendar looks lived-in.
      const taken = (index * 7 + seed * 3) % 5 === 0 || (index + seed) % 6 === 0;
      result.push({ time, available: !taken && (iso !== now.date || minute > now.minutes) });
    }
    return result;
  }
  function showMessage(text = '', kind = '') {
    message.textContent = text;
    message.className = `bk-message${kind ? ' ' + kind : ''}`;
  }
  function renderSlots() {
    const slots = getSlots(selectedDate);
    slotsBox.replaceChildren(...slots.map(slot => {
      const label = document.createElement('label'); label.className = 'bk-slot';
      const input = document.createElement('input');
      input.type = 'radio'; input.name = 'time'; input.value = slot.time; input.disabled = !slot.available;
      input.setAttribute('aria-label', slot.available ? slot.time : `${slot.time} — зает`);
      const text = document.createElement('span'); text.textContent = slot.time;
      label.append(input, text); return label;
    }));
    const free = slots.filter(slot => slot.available).length;
    status.textContent = free ? `${free} свободни часа за ${formatDate(selectedDate)}. Зачеркнатите са заети.` : 'Няма свободни часове за този ден. Избери друг.';
    submit.disabled = true;
  }
  function selectDay(iso) {
    selectedDate = iso;
    daysRow.querySelectorAll('.bk-day').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.date === iso)));
    showMessage();
    renderSlots();
  }
  function renderDays() {
    const today = shopNow().date;
    let first = '';
    daysRow.replaceChildren(...Array.from({ length: SHOP.days }, (_, offset) => {
      const iso = addDays(today, offset);
      const open = getSlots(iso).some(slot => slot.available);
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'bk-day'; button.dataset.date = iso; button.disabled = !open;
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', formatDate(iso) + (open ? '' : ' — няма свободни часове'));
      button.innerHTML = `<span>${WEEKDAYS[weekday(iso)]}</span><strong>${Number(iso.slice(8))}</strong>`;
      button.addEventListener('click', () => selectDay(iso));
      if (open && !first) first = iso;
      return button;
    }));
    if (first) selectDay(first);
  }

  slotsBox.addEventListener('change', () => { submit.disabled = !form.querySelector('input[name=time]:checked'); showMessage(); });
  [nameInput, phoneInput].forEach(input => input.addEventListener('input', () => { input.removeAttribute('aria-invalid'); showMessage(); }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const chosen = form.querySelector('input[name=time]:checked');
    const fail = (text, field) => { showMessage(text, 'error'); if (field) { field.setAttribute('aria-invalid', 'true'); field.focus(); } };
    if (!chosen) { fail('Моля, избери свободен час.'); return; }
    if (nameInput.value.trim().length < 2) { fail('Моля, въведи името си (поне 2 символа).', nameInput); return; }
    const phone = phoneInput.value.trim(), digits = phone.replace(/\D/g, '');
    if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) { fail('Моля, въведи валиден телефонен номер.', phoneInput); return; }
    // Demo only: say so plainly, so nobody believes they hold a real appointment.
    showMessage(`Избра ${formatDate(selectedDate)}, ${chosen.value} ч. Това е демонстрация на записването — не е направена истинска резервация и данните ти не са изпратени. За реален час се обади на 089 696 8068.`, 'ok');
    nameInput.value = ''; phoneInput.value = '';
    message.focus();
  });
  // The Lumina preview resets the page for each new tour.
  window.addEventListener('lumina:reset', renderDays);
  renderDays();
})();
