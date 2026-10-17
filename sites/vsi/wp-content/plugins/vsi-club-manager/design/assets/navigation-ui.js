const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const mobileNav = window.matchMedia('(max-width: 1000px)');
function fitMenu() {
  if (!menu || !navigation || menu.getAttribute('aria-expanded') !== 'true') return;
  const viewportHeight = navigation.ownerDocument.documentElement.clientHeight;
  const available = viewportHeight - navigation.getBoundingClientRect().top - 12;
  navigation.style.maxHeight = Math.max(0, available) + 'px';
}
function setMenu(open, returnFocus = false) {
  if (!menu || !navigation) return;
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
  document.body.classList.toggle('mobile-menu-open', open);
  if (open) fitMenu();
  else navigation.style.removeProperty('max-height');
  if (returnFocus) menu.focus();
}
menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('pointerdown', event => {
  if (menu?.getAttribute('aria-expanded') === 'true' && !menu.contains(event.target) && !navigation.contains(event.target)) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('focusin', event => {
  if (menu?.getAttribute('aria-expanded') === 'true' && !menu.contains(event.target) && !navigation.contains(event.target)) setMenu(false);
});
mobileNav.addEventListener('change', () => setMenu(false));
window.addEventListener('resize', fitMenu);
window.addEventListener('scroll', fitMenu, { passive: true });

// Lumina portfolio only (the page is inside a frame there): the preview draws this page scaled down while it
// auto-scrolls, and Chrome redraws a sticky header a pixel up or down on many scroll steps, so the menu and the
// „Контакти“ button flickered. A fixed header holds still. It is fixed only once the top bar has scrolled away,
// where sticky would pin it at the same place, and a spacer keeps its room in the page, so nothing looks different.
if (window.self !== window.top) {
  const header = document.querySelector('header.site-header');
  const topbar = document.querySelector('.topbar');
  if (header) {
    const style = document.createElement('style');
    style.textContent = 'html.lumina-pinned header.site-header{position:fixed;top:0;left:0;right:0}';
    document.head.append(style);
    const spacer = document.createElement('div');
    spacer.hidden = true;
    spacer.setAttribute('aria-hidden', 'true');
    header.after(spacer);
    const root = document.documentElement;
    const pin = (resized = false) => {
      const pinned = window.scrollY >= (topbar ? topbar.offsetHeight : 0);
      if (pinned === root.classList.contains('lumina-pinned') && !resized) return;
      if (pinned) spacer.style.height = header.offsetHeight + 'px';
      spacer.hidden = !pinned;
      root.classList.toggle('lumina-pinned', pinned);
    };
    pin();
    window.addEventListener('scroll', () => pin(), { passive: true });
    window.addEventListener('resize', () => pin(true));
  }
}
