(() => {
  'use strict';
  const stage = document.querySelector('#contact-stage');
  if (!stage) return;

  stage.dataset.contactLayout = '5';
  stage.innerHTML = `
    <div class="cp-panel">
      <div class="cp-story">
        <h2 class="cp-headline" id="contact-title">Всичко започва<br>с една идея.</h2>
        <ol class="cp-steps"><li><i>1</i><span>Пишете ни.</span></li><li><i>2</i><span>Показваме ви демо на вашия сайт.</span></li><li><i>3</i><span>Харесва ли ви, уговаряме цена. Ако не, не дължите нищо.</span></li></ol>
        <div class="cp-offer"><strong>Безплатно<span>демо по заявка</span></strong><p>Първи дизайн,<br>с идея за вашия бизнес.</p></div>
        <p class="cp-signature">Вие давате идеята,<br>а ние правим първия дизайн.<svg viewBox="0 0 100 74" fill="none" aria-hidden="true"><path d="M5 9C12 47 53 59 90 43M76 38l16 3-8 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></p>
      </div>
      <form class="cp-letter" aria-label="Заявка за безплатно демо">
        <div class="cp-stamp" aria-hidden="true"><b>0 €</b><span>демо</span></div>
        <svg class="cp-postmark" viewBox="0 0 128 76" aria-hidden="true"><circle cx="34" cy="38" r="27"/><circle cx="34" cy="38" r="20"/><text x="34" y="36" text-anchor="middle">LUMINA</text><text x="34" y="47" text-anchor="middle">STUDIO</text><path d="M66 22c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 33c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 44c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 55c8-5 14 5 22 0s14 5 22 0 10 4 16 1"/></svg>
        <div class="cp-letter-head"><span class="cp-address">До: Lumina Studio</span><h3 class="cp-form-title">Здравейте, Lumina.</h3><p class="cp-form-lead">Имам бизнес и искам да го видя онлайн.</p></div>
        <div class="cp-field-pair">
          <label class="cp-field" for="demo-name"><span>Вашето име</span><input id="demo-name" name="name" type="text" autocomplete="name" maxlength="200" placeholder="Как да се обръщаме към вас?" required></label>
          <label class="cp-field" for="demo-business"><span>Вашият бизнес</span><input id="demo-business" name="business" type="text" autocomplete="organization" maxlength="200" placeholder="Име или сфера на дейност" required></label>
        </div>
        <label class="cp-field" for="demo-contact"><span>Имейл или телефон</span><input id="demo-contact" name="contact" type="text" autocomplete="on" maxlength="200" placeholder="Как да се свържем с вас?" required></label>
        <label class="cp-field" for="demo-message"><span>Какъв сайт си представяте? <small>по желание</small></span><textarea id="demo-message" name="message" rows="2" maxlength="2000" placeholder="Какво предлагате и как сайтът да ви помогне?"></textarea></label>
        <input class="cp-trap" name="website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="cp-submit" type="submit">Заяви безплатно демо <svg viewBox="0 0 32 24" fill="none" aria-hidden="true"><path d="M2 12h27M19 3l10 9-10 9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <p class="cp-privacy"><svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 6.500h8v6H3ZM4.800 6.500V4.300a2.200 2.200 0 0 1 4.400 0v2.200" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>Използваме контакта ви само за да ви отговорим.</p>
        <p class="cp-status" role="status" tabindex="-1" hidden></p>
      </form>
    </div>`;

  // Direct contacts under the postcard. Fill in or change them here; an empty value hides that item.
  // viber: opens a Viber chat with the owner's Viber number, the same as the phone shown (+359 877 776 563).
  // email: the form delivers to the same address, which is set separately at the top of send.php.
  const CONTACT = {
    phone: '0877 776 563',
    phoneLink: 'tel:+359877776563',
    instagram: 'https://www.instagram.com/luminastudiobg/',
    facebook: 'https://www.facebook.com/profile.php?id=61595560437967',
    viber: 'viber://chat?number=%2B359877776563',
    email: 'info@luminastudio.bg'
  };
  const phoneIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.6 3.5h3l1.5 4.2-2 1.5a12.4 12.4 0 0 0 5.7 5.7l1.5-2 4.2 1.5v3a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.6 5.700 2 2 0 0 1 6.600 3.500Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  // Brand glyphs: Simple Icons (CC0), https://github.com/simple-icons/simple-icons
  const instagramIcon = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077\"/></svg>";
  const facebookIcon = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z\"/></svg>";
  const viberIcon = "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M11.4 0C9.473.028 5.333.344 3.02 2.467 1.302 4.187.696 6.7.633 9.817.57 12.933.488 18.776 6.12 20.36h.003l-.004 2.416s-.037.977.61 1.177c.777.242 1.234-.5 1.98-1.302.407-.44.972-1.084 1.397-1.58 3.85.326 6.812-.416 7.15-.525.776-.252 5.176-.816 5.892-6.657.74-6.02-.36-9.83-2.34-11.546-.596-.55-3.006-2.3-8.375-2.323 0 0-.395-.025-1.037-.017zm.058 1.693c.545-.004.88.017.88.017 4.542.02 6.717 1.388 7.222 1.846 1.675 1.435 2.53 4.868 1.906 9.897v.002c-.604 4.878-4.174 5.184-4.832 5.395-.28.09-2.882.737-6.153.524 0 0-2.436 2.94-3.197 3.704-.12.12-.26.167-.352.144-.13-.033-.166-.188-.165-.414l.02-4.018c-4.762-1.32-4.485-6.292-4.43-8.895.054-2.604.543-4.738 1.996-6.173 1.96-1.773 5.474-2.018 7.11-2.03zm.38 2.602c-.167 0-.303.135-.304.302 0 .167.133.303.3.305 1.624.01 2.946.537 4.028 1.592 1.073 1.046 1.62 2.468 1.633 4.334.002.167.14.3.307.3.166-.002.3-.138.3-.304-.014-1.984-.618-3.596-1.816-4.764-1.19-1.16-2.692-1.753-4.447-1.765zm-3.96.695c-.19-.032-.4.005-.616.117l-.01.002c-.43.247-.816.562-1.146.932-.002.004-.006.004-.008.008-.267.323-.42.638-.46.948-.008.046-.01.093-.007.14 0 .136.022.27.065.4l.013.01c.135.48.473 1.276 1.205 2.604.42.768.903 1.5 1.446 2.186.27.344.56.673.87.984l.132.132c.31.308.64.6.984.87.686.543 1.418 1.027 2.186 1.447 1.328.733 2.126 1.07 2.604 1.206l.01.014c.13.042.265.064.402.063.046.002.092 0 .138-.008.31-.036.627-.19.948-.46.004 0 .003-.002.008-.005.37-.33.683-.72.93-1.148l.003-.01c.225-.432.15-.842-.18-1.12-.004 0-.698-.58-1.037-.83-.36-.255-.73-.492-1.113-.71-.51-.285-1.032-.106-1.248.174l-.447.564c-.23.283-.657.246-.657.246-3.12-.796-3.955-3.955-3.955-3.955s-.037-.426.248-.656l.563-.448c.277-.215.456-.737.17-1.248-.217-.383-.454-.756-.71-1.115-.25-.34-.826-1.033-.83-1.035-.137-.165-.31-.265-.502-.297zm4.49.88c-.158.002-.29.124-.3.282-.01.167.115.312.282.324 1.16.085 2.017.466 2.645 1.15.63.688.93 1.524.906 2.57-.002.168.13.306.3.31.166.003.305-.13.31-.297.025-1.175-.334-2.193-1.067-2.994-.74-.81-1.777-1.253-3.05-1.346h-.024zm.463 1.63c-.16.002-.29.127-.3.287-.008.167.12.31.288.32.523.028.875.175 1.113.422.24.245.388.62.416 1.164.01.167.15.295.318.287.167-.008.295-.15.287-.317-.03-.644-.215-1.178-.58-1.557-.367-.378-.893-.574-1.52-.607h-.018z\"/></svg>";
  const mailIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3.500 6h17v12h-17Zm0 .500 8.500 6.500 8.500-6.500" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  const direct = [
    CONTACT.phone && `<a class="cp-direct-phone" href="${CONTACT.phoneLink}">${phoneIcon}<span>${CONTACT.phone}</span></a>`,
    CONTACT.instagram && `<a class="cp-direct-tag" href="${CONTACT.instagram}" target="_blank" rel="noopener noreferrer">${instagramIcon}<span>Instagram</span></a>`,
    CONTACT.facebook && `<a class="cp-direct-tag" href="${CONTACT.facebook}" target="_blank" rel="noopener noreferrer">${facebookIcon}<span>Facebook</span></a>`,
    CONTACT.viber && `<a class="cp-direct-tag" href="${CONTACT.viber}">${viberIcon}<span>Viber</span></a>`,
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
  // Reflow existing text when a phone rotates or the form changes width.
  let noteWidth = 0;
  new ResizeObserver(([entry]) => {
    if (entry.contentRect.width === noteWidth) return;
    noteWidth = entry.contentRect.width;
    fitNote();
  }).observe(note);
  document.fonts?.ready.then(fitNote);
  form.addEventListener('reset', () => { note.style.height = ''; });
  form.addEventListener('input', event => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) return;
    event.target.setCustomValidity('');
    event.target.removeAttribute('aria-invalid');
    status.hidden = true;
  });
  const submit = form.querySelector('.cp-submit');
  const say = (text, problem = false) => {
    status.textContent = text;
    status.classList.toggle('is-error', problem);
    status.hidden = false;
    status.focus({preventScroll: true});
  };
  // The thank-you postcard shown over the page once the server has confirmed the request.
  const thank = () => {
    const overlay = document.createElement('div');
    overlay.className = 'ty-overlay';
    overlay.innerHTML = `
      <div class="ty-card" role="dialog" aria-modal="true" aria-labelledby="ty-title">
        <i class="ty-back"></i>
        <div class="ty-stamp" aria-hidden="true"><b>0 €</b><span>демо</span></div>
        <div><h2 id="ty-title">Благодарим!</h2><p>Получихме заявката ви. Ще се свържем с вас и ще ви покажем демо на вашия сайт.</p><button class="ty-ok" type="button">Добре</button></div>
        <div class="ty-lines" aria-hidden="true"><span>От: Lumina Studio</span><span>До: вас</span><span>&nbsp;</span></div>
        <button class="ty-x" type="button" aria-label="Затвори">×</button>
      </div>`;
    const buttons = overlay.querySelectorAll('button');
    const onKey = event => {
      if (event.key === 'Escape') close();
      if (event.key !== 'Tab') return;   // keep the keyboard inside the popup while it is open
      event.preventDefault();
      buttons[document.activeElement === buttons[0] ? 1 : 0].focus();
    };
    const close = () => {
      document.removeEventListener('keydown', onKey);
      overlay.remove();
      submit.focus({preventScroll: true});
    };
    overlay.addEventListener('click', event => { if (event.target === overlay || event.target.closest('button')) close(); });
    document.addEventListener('keydown', onKey);
    document.body.append(overlay);
    buttons[0].focus({preventScroll: true});
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled) return;
    for (const field of form.querySelectorAll('input, textarea')) {
      field.setCustomValidity('');
      const value = field.value.trim();
      if (field.required && !value) field.setCustomValidity(message('Моля, попълнете това поле.', 'Please fill in this field.'));
      if (field.name === 'contact' && value) {
        // As strict as the server (send.php): no double dots, no dot at either end, a real ending such as .bg.
        const email = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)*\.[a-z]{2,}$/i.test(value) && !/^\.|\.\.|\.@/.test(value);
        const digits = value.replace(/\D/g, '').length;
        const phone = /^[+()\d\s.-]+$/.test(value) && digits >= 7 && digits <= 15;
        if (!email && !phone) field.setCustomValidity(message('Въведете валиден имейл или телефон.', 'Enter a valid email or phone number.'));
      }
      field.removeAttribute('aria-invalid');
      if (!field.reportValidity()) {
        // The browser's own bubble fades after a few seconds, so the same words also stay under the button.
        field.setAttribute('aria-invalid', 'true');
        // Keep source copy Bulgarian so the language switch can translate and restore it.
        status.textContent = !value ? 'Моля, попълнете това поле.' : 'Въведете валиден имейл или телефон.';
        status.classList.add('is-error');
        status.hidden = false;
        return;
      }
    }
    // send.php emails the request. Say "received" only when the server confirms it; anything else is "not sent".
    submit.disabled = true;
    say('Изпращаме заявката…');
    let delivered = false, refused = false, timedOut = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 20000);
    try {
      const response = await fetch('send.php', {method: 'POST', body: new FormData(form), headers: {Accept: 'application/json'}, signal: controller.signal});
      refused = response.status === 422;
      delivered = response.ok && (await response.json()).ok === true;
    } catch {
      delivered = false;
    } finally {
      clearTimeout(timeout);
    }
    submit.disabled = false;
    if (timedOut) {
      // A delayed server may have accepted the request: do not claim it was never sent.
      say('Не успяхме да потвърдим изпращането навреме. Данните ви са запазени във формата. Моля, свържете се с нас на 0877 776 563 или info@luminastudio.bg, за да проверим заявката.', true);
      return;
    }
    if (refused) {
      // The server refuses only a request whose email or phone it cannot use: point at that field, not at "call us".
      const contact = form.elements.contact;
      contact.setAttribute('aria-invalid', 'true');
      say('Въведете валиден имейл или телефон.', true);
      contact.focus();
      return;
    }
    if (delivered) {
      form.reset();
      status.hidden = true;
      // Counted in Google Analytics as a lead; gtag exists only if the visitor accepted cookies.
      window.gtag?.('event', 'generate_lead');
      thank();
    } else {
      say('', true);
      status.innerHTML = `Заявката не беше изпратена. Моля, обадете ни се на <a href="${CONTACT.phoneLink}">${CONTACT.phone}</a> или пишете на <a href="mailto:${CONTACT.email}">${CONTACT.email}</a>.`;
    }
  });
})();
