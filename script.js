(() => {
  'use strict';
  document.documentElement.classList.remove('no-js');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#expanded-menu');
  const sections = [...document.querySelectorAll('.detail-section')];
  const toolbar = document.querySelector('.detail-toolbar');
  const closeButton = document.querySelector('.close-details');
  const serviceIds = ['design', 'development', 'domain', 'hosting', 'seo', 'marketing', 'support'];
  const scrollingIds = ['why-sites', 'services', 'portfolio', 'contact', ...serviceIds];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let returnFocus = null;

  menuButton.hidden = false;
  sections.forEach(section => { section.hidden = true; });

  function setMenu(open, restoreFocus = false) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Затвори менюто' : 'Отвори менюто');
    if (restoreFocus) menuButton.focus({ preventScroll: true });
  }

  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);
  });
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  menu.addEventListener('focusout', () => {
    requestAnimationFrame(() => {
      if (!menu.contains(document.activeElement) && document.activeElement !== menuButton) setMenu(false);
    });
  });

  // Scroll state: slim header, current nav link, and the small-screen demo button.
  const spyIds = ['home', 'why-sites', 'services', 'portfolio', 'contact'];
  const navLinks = [...document.querySelectorAll('.desktop-nav a, .expanded-menu a')];
  const stickyDemo = document.querySelector('.sticky-demo');
  const hero = document.querySelector('.hero');
  const contact = document.querySelector('#contact');
  let scrollFrame = 0;
  function updateScrollState() {
    document.documentElement.classList.toggle('is-scrolled', window.scrollY > 40);
    let current = 'home';
    spyIds.forEach(id => {
      if (document.getElementById(id).getBoundingClientRect().top < window.innerHeight * .4) current = id;
    });
    navLinks.forEach(link => {
      if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (stickyDemo) stickyDemo.classList.toggle('is-shown', hero.getBoundingClientRect().bottom < 0 && contact.getBoundingClientRect().top > window.innerHeight * .75);
  }
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(updateScrollState);
  }, { passive: true });
  updateScrollState();

  // Draw each section heading's marker swipe the first time it comes into view.
  const swipeObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in');
    swipeObserver.unobserve(entry.target);
  }), { threshold: .6 });
  document.querySelectorAll('.draw-swipe').forEach(heading => swipeObserver.observe(heading));

  // Keep the main scrolling sections visible; only extra detail panels toggle.
  if (!sections.length) return;

  function showSection(hash, scroll = true) {
    const id = hash.replace(/^#/, '');
    const sectionId = serviceIds.includes(id) ? 'services' : (id || 'home');
    const target = sections.find(section => section.id === sectionId);
    sections.forEach(section => { section.hidden = section !== target; });
    toolbar.hidden = !target;
    document.querySelectorAll('.desktop-nav a, .expanded-menu a').forEach(link => {
      if (link.hash === `#${sectionId}`) link.setAttribute('aria-current', 'location');
      else if (link.getAttribute('aria-current') !== 'page') link.removeAttribute('aria-current');
    });
    setMenu(false);
    if (target) {
      if (scroll) {
        target.focus({ preventScroll: true });
        document.getElementById(id).scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
      }
    } else if (scrollingIds.includes(id) && scroll) {
      const destination = document.getElementById(id);
      destination.focus({ preventScroll: true });
      destination.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start' });
    } else if (id === 'home' && scroll) {
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const id = link.hash.slice(1);
    if (!['home', ...scrollingIds, ...sections.map(section => section.id)].includes(id)) return;
    event.preventDefault();
    if (!link.closest('.detail-area')) returnFocus = link;
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    showSection(link.hash);
  });

  closeButton.addEventListener('click', () => {
    history.pushState(null, '', '#home');
    showSection('#home');
    if (returnFocus && returnFocus.getClientRects().length) returnFocus.focus({ preventScroll: true });
    else menuButton.focus({ preventScroll: true });
  });
  window.addEventListener('hashchange', () => showSection(location.hash));
  showSection(location.hash, Boolean(location.hash));
})();
