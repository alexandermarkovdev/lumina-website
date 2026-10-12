(() => {
  'use strict';
  const stage = document.querySelector('#contact-stage');
  if (!stage) return;

  stage.dataset.contactLayout = '5';
  stage.innerHTML = `
    <div class="cp-panel">
      <div class="cp-story">
        <h2 class="cp-headline" id="contact-title">Всичко започва<br>с една идея.</h2>
        <p class="cp-description">Разкажете ни за бизнеса си. Ще създадем безплатно демо на вашия сайт до 24 часа след заявката.</p>
        <div class="cp-offer"><strong>До 24 часа<span>безплатно демо</span></strong><p>Първи дизайн,<br>с идея за вашия бизнес.</p></div>
        <p class="cp-signature">Вие давате идеята,<br>а ние правим първия дизайн.<svg viewBox="0 0 100 74" fill="none" aria-hidden="true"><path d="M5 9C12 47 53 59 90 43M76 38l16 3-8 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></p>
      </div>
      <form class="cp-letter" aria-label="Заявка за безплатно демо">
        <div class="cp-stamp" aria-hidden="true"><b>0 €</b><span>демо</span></div>
        <svg class="cp-postmark" viewBox="0 0 128 76" aria-hidden="true"><circle cx="34" cy="38" r="27"/><circle cx="34" cy="38" r="20"/><text x="34" y="36" text-anchor="middle">LUMINA</text><text x="34" y="47" text-anchor="middle">до 24 ч.</text><path d="M66 22c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 33c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 44c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 55c8-5 14 5 22 0s14 5 22 0 10 4 16 1"/></svg>
        <div class="cp-letter-head"><span class="cp-address">До: Lumina Studio</span><h3 class="cp-form-title">Здравейте, Lumina.</h3><p class="cp-form-lead">Имам бизнес и искам да го видя онлайн.</p></div>
        <div class="cp-field-pair">
          <label class="cp-field" for="demo-name"><span>Вашето име</span><input id="demo-name" name="name" type="text" autocomplete="name" maxlength="200" placeholder="Как да се обръщаме към вас?" required></label>
          <label class="cp-field" for="demo-business"><span>Вашият бизнес</span><input id="demo-business" name="business" type="text" autocomplete="organization" maxlength="200" placeholder="Име или сфера на дейност" required></label>
        </div>
        <label class="cp-field" for="demo-contact"><span>Имейл или телефон</span><input id="demo-contact" name="contact" type="text" autocomplete="on" maxlength="200" placeholder="Как да се свържем с вас?" required></label>
        <label class="cp-field" for="demo-message"><span>Какъв сайт си представяте? <small>по желание</small></span><textarea id="demo-message" name="message" rows="2" maxlength="2000" placeholder="Какво предлагате и как сайтът да ви помогне?"></textarea></label>
        <input class="cp-trap" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="cp-submit" type="submit">Заяви безплатно демо <svg viewBox="0 0 32 24" fill="none" aria-hidden="true"><path d="M2 12h27M19 3l10 9-10 9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <p class="cp-status" role="status" tabindex="-1" hidden></p>
      </form>
    </div>`;

  // Direct contacts under the postcard. Fill in or change them here; an empty value hides that item.
  // viber: opens a Viber chat with the owner's Viber number (+44 7842 833363), which is not the phone number shown.
  // email: the form delivers to the same address, which is set separately at the top of send.php.
  const CONTACT = {
    phone: '0877 776 563',
    phoneLink: 'tel:+359877776563',
    viber: 'viber://chat?number=%2B447842833363',
    email: 'info@luminastudio.bg'
  };
  const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 3.5h3l1.5 4.2-2 1.5a12.4 12.4 0 0 0 5.7 5.7l1.5-2 4.2 1.5v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.700 2 2 0 0 1 6.600 3.500Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const chatIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 5.500h16v10.500H10.500L6 20v-4H4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const mailIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.500 6h17v12h-17Zm0 .500 8.500 6.500 8.500-6.500" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const direct = [
    CONTACT.phone && `<a class="cp-direct-phone" href="${CONTACT.phoneLink}">${phoneIcon}<span>${CONTACT.phone}</span></a>`,
    CONTACT.viber && `<a class="cp-direct-tag" href="${CONTACT.viber}">${chatIcon}<span>Viber</span></a>`,
    CONTACT.email && `<a class="cp-direct-tag" href="mailto:${CONTACT.email}">${mailIcon}<span>${CONTACT.email}</span></a>`
  ].filter(Boolean);
  if (direct.length) stage.insertAdjacentHTML('beforeend', `<div class="cp-direct"><p>Или направо:</p>${direct.join('')}</div>`);

  const form = stage.querySelector('form');
  const status = form.querySelector('.cp-status');
  form.noValidate = true; // Use the page language for validation messages.
  const message = (bg, en) => document.documentElement.lang === 'en' ? en : bg;
  // The message box grows with the text, so the whole message stays visible while it is written.
  const note = form.querySelector('textarea');
  const fitNote = () => {
    note.style.height = '';   // back to the size from the stylesheet, which is the smallest it gets
    const rest = note.offsetHeight;
    note.style.height = 'auto';
    note.style.height = Math.max(rest, note.scrollHeight + 2) + 'px';
  };
  note.addEventListener('input', fitNote);
  form.addEventListener('reset', () => { note.style.height = ''; });
  form.addEventListener('input', event => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) return;
    event.target.setCustomValidity('');
    status.hidden = true;
  });
  const submit = form.querySelector('.cp-submit');
  const say = text => {
    status.textContent = text;
    status.hidden = false;
    status.focus({preventScroll: true});
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;
    for (const field of form.querySelectorAll('input, textarea')) {
      field.setCustomValidity('');
      const value = field.value.trim();
      if (field.required && !value) field.setCustomValidity(message('Моля, попълнете това поле.', 'Please fill in this field.'));
      if (field.name === 'contact' && value) {
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        const digits = value.replace(/\D/g, '').length;
        const phone = /^[+()\d\s.-]+$/.test(value) && digits >= 7 && digits <= 15;
        if (!email && !phone) field.setCustomValidity(message('Въведете валиден имейл или телефон.', 'Enter a valid email or phone number.'));
      }
      if (!field.reportValidity()) return;
    }
    // send.php emails the request. Say "received" only when the server confirms it; anything else is "not sent".
    submit.disabled = true;
    say('Изпращаме заявката…');
    let delivered = false;
    try {
      const response = await fetch('send.php', {method: 'POST', body: new FormData(form), headers: {Accept: 'application/json'}});
      delivered = response.ok && (await response.json()).ok === true;
    } catch {
      delivered = false;
    }
    submit.disabled = false;
    if (delivered) {
      form.reset();
      say('Благодарим! Получихме заявката ви и ще се свържем с вас до 24 часа.');
    } else {
      say('Заявката не беше изпратена. Моля, обадете ни се на 0877 776 563 или пишете на info@luminastudio.bg.');
    }
  });
})();
