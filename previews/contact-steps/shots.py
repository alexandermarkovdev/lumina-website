# Takes the pictures for index.html. Run from the repo root after build.py.
import pathlib, time
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
(HERE / 'shots').mkdir(exist_ok=True)
pages = [('now', ROOT / 'index.html')] + [('idea%d' % n, HERE / ('idea%d.html' % n)) for n in (1, 2, 3)]
with sync_playwright() as pw:
    b = pw.firefox.launch()
    for name, path in pages:
        for size, w, h in (('desktop', 1600, 900), ('phone', 390, 800)):
            page = b.new_page(viewport={'width': w, 'height': h})
            page.goto(path.as_uri(), wait_until='load')
            page.add_style_tag(content='[class*=cookie],.sticky-demo{display:none!important}html{scroll-behavior:auto!important}.site-header{position:static!important}')
            time.sleep(1.5)
            page.locator('#contact').screenshot(path=str(HERE / 'shots' / ('%s-%s.png' % (name, size))))
            page.close()
    b.close()
print('shots done')
