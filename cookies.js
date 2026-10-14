(() => {
  'use strict';
  // Cookie notice. Google Analytics is loaded only after the visitor accepts.
  // Put the measurement ID here (looks like G-XXXXXXXXXX); while it is empty no analytics load at all.
  const GA_ID = '';
  const KEY = 'lumina-cookies';
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const write = value => { try { localStorage.setItem(KEY, value); } catch {} };

  let analyticsLoaded = false;
  function startAnalytics() {
    if (!GA_ID) return;
    window['ga-disable-' + GA_ID] = false;
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_ID);
    document.head.append(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }
  function stopAnalytics() {
    if (!GA_ID) return;
    // Stops further measurement on this page and removes the cookies Analytics has set.
    window['ga-disable-' + GA_ID] = true;
    const expired = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    const domains = [location.hostname, '.' + location.hostname, '.' + location.hostname.split('.').slice(-2).join('.')];
    document.cookie.split(';').map(part => part.split('=')[0].trim()).filter(name => name.startsWith('_ga') || name === '_gid').forEach(name => {
      document.cookie = name + expired;
      domains.forEach(domain => { document.cookie = name + expired + '; domain=' + domain; });
    });
  }

  const bar = document.createElement('section');
  bar.className = 'cookie-bar';
  bar.setAttribute('aria-label', 'Бисквитки');
  bar.hidden = true;
  bar.innerHTML = '<div class="cookie-bar-inner">' +
    '<p>Използваме бисквитки за правилната работа на сайта и за анонимна статистика на посещенията (Google Analytics).<span class="cookie-more"> Може да промените избора си по всяко време от „Бисквитки“ в долния край на страницата.</span></p>' +
    '<div class="cookie-bar-actions"><button type="button" class="cookie-decline">Отказвам</button><button type="button" class="cookie-accept">Приемам</button></div>' +
    '</div>';
  // Right after the skip link, so keyboard and screen-reader users meet the notice first instead of last.
  (document.querySelector('.skip-link') || document.body.firstElementChild).after(bar);

  // While the notice is up, the page gets the same room at its foot, so the footer can scroll clear of it.
  const room = () => document.body.style.setProperty('padding-bottom', bar.hidden ? '' : bar.offsetHeight + 'px');
  new ResizeObserver(room).observe(bar);
  function show(on) { bar.hidden = !on; room(); }

  function choose(value) {
    write(value);
    show(false);
    if (value === 'yes') startAnalytics(); else stopAnalytics();
  }
  bar.querySelector('.cookie-accept').addEventListener('click', () => choose('yes'));
  bar.querySelector('.cookie-decline').addEventListener('click', () => choose('no'));
  // The footer link brings the notice back so the choice can be changed.
  document.querySelectorAll('.cookie-settings').forEach(link => link.addEventListener('click', () => {
    show(true);
    bar.querySelector(read() === 'yes' ? '.cookie-decline' : '.cookie-accept').focus();
  }));

  const choice = read();
  if (choice === 'yes') startAnalytics();
  else if (choice !== 'no') show(true);
})();
