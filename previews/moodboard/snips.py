# Cuts real snippets out of the site for the mood board. Needs the site served from the repo root:
#   python -m http.server 8771 --bind 127.0.0.1   then   python previews/moodboard/snips.py 8771
import pathlib, sys
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).resolve().parent; OUT = HERE / 'snips'; OUT.mkdir(exist_ok=True)
PORT = sys.argv[1] if len(sys.argv) > 1 else '8765'; URL = f'http://127.0.0.1:{PORT}/index.html'
CALM = '.cookie-bar,.sticky-demo{display:none!important} *{animation-play-state:paused!important}'
def shot(pg, sel, name, pad=0, clip_h=None):
    el = pg.locator(sel).first; el.scroll_into_view_if_needed(); pg.wait_for_timeout(500)
    b = el.bounding_box(); y = b['y']; h = clip_h or b['height']
    pg.screenshot(path=str(OUT / f'{name}.png'), clip={'x': max(0, b['x'] - pad), 'y': max(0, y - pad), 'width': b['width'] + 2 * pad, 'height': h + 2 * pad})
    print('ok', name)
with sync_playwright() as p:
    b = p.chromium.launch()
    c = b.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=2); pg = c.new_page()
    pg.route('**/send.php', lambda r: r.fulfill(status=200, content_type='application/json', body='{"ok":true}'))
    pg.goto(URL); pg.evaluate("localStorage.setItem('lumina-cookies','no')"); pg.reload(); pg.wait_for_timeout(3000)
    pg.add_style_tag(content='.cookie-bar,.sticky-demo{display:none!important}')
    shot(pg, '.hero', 'hero-desktop', pad=10)
    pg.add_style_tag(content='.site-header{position:static!important;margin-bottom:0!important}')
    shot(pg, '.demo-note', 'demo-note', pad=30)
    shot(pg, '.showcase .pink-note', 'pink-note', pad=20)
    shot(pg, '.process-note', 'process-note', pad=20)
    shot(pg, '.service-strip', 'service-strip', pad=10)
    shot(pg, '#why-sites', 'why-top', clip_h=560)
    shot(pg, '#why-sites article.business.restaurant', 'example-restaurant', pad=40)
    shot(pg, '#why-sites article.business.salon', 'example-salon', pad=40)
    shot(pg, '#services', 'services-top', clip_h=900)
    shot(pg, '.sr-english', 'english-strip', pad=20)
    shot(pg, '#portfolio', 'portfolio', clip_h=760)
    shot(pg, '#contact', 'contact')
    shot(pg, '.site-footer', 'footer', pad=10)
    # thank-you postcard
    pg.locator('#contact').scroll_into_view_if_needed()
    pg.fill('#contact [name=name]', 'Мария'); pg.fill('#contact [name=business]', 'Фризьорски салон'); pg.fill('#contact [name=contact]', '0888123456')
    pg.click('#contact .cp-submit'); pg.wait_for_timeout(1500); shot(pg, '.ty-card', 'thank-you-card', pad=40)
    c.close()
    # phone
    c = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=3, is_mobile=True, has_touch=True); pg = c.new_page()
    pg.goto(URL); pg.evaluate("localStorage.setItem('lumina-cookies','no')"); pg.reload(); pg.wait_for_timeout(3500)
    pg.screenshot(path=str(OUT / 'phone-hero.png')); print('ok phone-hero')
    pg.click('.menu-toggle'); pg.wait_for_timeout(700); pg.screenshot(path=str(OUT / 'phone-menu.png')); print('ok phone-menu'); pg.click('.menu-toggle')
    pg.evaluate('scrollTo(0, 1600)'); pg.wait_for_timeout(1500); pg.screenshot(path=str(OUT / 'phone-demo-bar.png')); print('ok phone-demo-bar')
    c.close()
    c = b.new_context(viewport={'width': 1440, 'height': 860}, device_scale_factor=2); pg = c.new_page()
    pg.goto(f'http://127.0.0.1:{PORT}/404.html'); pg.wait_for_timeout(1200); pg.screenshot(path=str(OUT / 'page-404.png')); print('ok 404')
    b.close()
