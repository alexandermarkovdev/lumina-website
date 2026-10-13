// Preview only: adds the three "what happens next" steps and the privacy line to the contact section,
// placed according to <html data-cs="N">. Runs after contact-postcard.js has built the form.
addEventListener('DOMContentLoaded', () => {
  const look = document.documentElement.dataset.cs;
  const panel = document.querySelector('#contact .cp-panel');
  if (!panel) return;
  const steps = document.createElement('ol');
  steps.className = 'cs-steps';
  steps.innerHTML = `
    <li><i>1</i><span>Пишете ни.</span></li>
    <li><i>2</i><span>До 24 часа виждате демо на вашия сайт.</span></li>
    <li><i>3</i><span>Харесва ли ви, уговаряме цена. Ако не, не дължите нищо.</span></li>`;
  if (look === '1') panel.before(steps);
  if (look === '2') panel.querySelector('.cp-description').after(steps);
  if (look === '3') panel.append(steps);
  panel.querySelector('.cp-submit').insertAdjacentHTML('afterend',
    '<p class="cs-privacy"><svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true"><path d="M3 6.500h8v6H3ZM4.800 6.500V4.300a2.200 2.200 0 0 1 4.400 0v2.200"/></svg>Използваме контакта ви само за да ви отговорим.</p>');
  addEventListener('load', () => document.querySelector('#contact').scrollIntoView());
});
