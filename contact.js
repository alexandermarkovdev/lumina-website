(() => {
  'use strict';
  const stage = document.querySelector('#contact-stage');
  if (!stage) return;
  const arrow = '<svg viewBox="0 0 32 24" aria-hidden="true"><path d="M2 12h27M19 3l10 9-10 9"/></svg>';
  const field = (key, label, placeholder, type = 'text', required = true) => `<label class="contact-field" for="demo-${key}"><span>${label}${required ? '' : ' <small>по желание</small>'}</span>${type === 'textarea' ? `<textarea id="demo-${key}" name="${key}" rows="3" placeholder="${placeholder}"${required ? ' required' : ''} maxlength="2000"></textarea>` : `<input id="demo-${key}" name="${key}" type="${type}" placeholder="${placeholder}"${required ? ' required' : ''} autocomplete="${key === 'name' ? 'name' : key === 'email' ? 'email' : 'organization'}" maxlength="200">`}</label>`;
  const name = () => field('name', 'Вашето име', 'Как да се обръщаме към вас?');
  const email = () => field('email', 'Имейл или телефон за връзка', 'name@example.com или 0888 123 456');
  const business = () => field('business', 'Вашият бизнес', 'Име или сфера на дейност');
  const message = () => field('message', 'Какъв сайт си представяте?', 'Какво предлагате и как искате сайтът да ви помогне?', 'textarea', false);
  const submit = () => `<button class="contact-submit" type="submit">Заяви безплатно демо ${arrow}</button>`;
  const notes = () => '<p class="contact-form-status" role="status" tabindex="-1" hidden></p>';
  const promise = () => '<div class="contact-promise"><strong>24<span>часа</span></strong><p>Безплатно демо.<br>С идея за вашия бизнес.</p></div>';
  const description = 'Разкажете ни за бизнеса си. Ще създадем безплатно демо на вашия сайт до 24 часа след заявката.';


  stage.dataset.contactLayout = '2';
  stage.innerHTML = `<div class="contact-postcard"><div class="contact-story"><h2 id="contact-title">Една идея.<br><span>Едно начало.</span></h2><p class="contact-description">${description}</p>${promise()}<p class="postcard-signature">От вас — идеята.<br>От нас — първият дизайн.</p></div><form class="demo-form postcard-letter" aria-label="Заявка за безплатно демо"><div class="postcard-stamp" aria-hidden="true"><b>0 €</b><span>демо</span></div><svg class="postcard-postmark" viewBox="0 0 128 76" aria-hidden="true"><circle cx="34" cy="38" r="27"/><circle cx="34" cy="38" r="20"/><text x="34" y="36" text-anchor="middle">LUMINA</text><text x="34" y="47" text-anchor="middle">до 24 ч.</text><path d="M66 22c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 33c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 44c8-5 14 5 22 0s14 5 22 0 10 4 16 1M66 55c8-5 14 5 22 0s14 5 22 0 10 4 16 1"/></svg><span class="postcard-to">До: Lumina Studio</span><h3>Здравейте, Lumina.</h3><p class="postcard-lead">Имам бизнес. И искам да го видя онлайн.</p><div class="contact-field-pair">${name()}${business()}</div>${email()}${message()}${submit()}${notes()}</form></div>`;
  const form = stage.querySelector('form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const status = form.querySelector('.contact-form-status');
    status.hidden = false;
    status.textContent = 'Това е преглед на формата. Заявката не е изпратена.';
    status.focus({preventScroll:true});
  });
})();
