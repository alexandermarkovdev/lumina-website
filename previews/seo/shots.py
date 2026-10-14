# Footer pictures for the before/after page. Serve the old copy on 8782 and the new one on 8781, then:
#   python -I previews/seo/shots.py
import pathlib
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).resolve().parent
with sync_playwright() as p:
    b = p.chromium.launch()
    for tag, port in (('before', 8782), ('after', 8781)):
        for w in (1440, 390):
            pg = b.new_page(viewport={'width': w, 'height': 900}, device_scale_factor=2)
            pg.add_init_script("try{localStorage.setItem('lumina_cookie_choice','declined');localStorage.setItem('lumina_cookies','declined')}catch(e){}")
            pg.goto(f'http://127.0.0.1:{port}/index.html', wait_until='networkidle'); pg.wait_for_timeout(600)
            pg.evaluate("document.querySelectorAll('.cookie-notice,.cookie-banner,[class*=cookie-bar]').forEach(e=>e.remove());document.querySelector('.sticky-demo')?.remove()")
            f = pg.locator('footer.bottom-line'); f.scroll_into_view_if_needed(); pg.wait_for_timeout(300)
            f.screenshot(path=str(HERE / f'footer-{tag}-{"desktop" if w > 800 else "phone"}.png'))
            pg.close()
    b.close()
