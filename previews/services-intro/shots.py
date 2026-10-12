# Takes the before/after pictures for index.html. Run from the repo root after build.py.
import os, time, pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
os.makedirs(HERE / 'shots', exist_ok=True)
pages = [('now', ROOT / 'index.html')] + [('idea%d' % n, HERE / ('idea%d.html' % n)) for n in (1, 2, 3, 4)]
with sync_playwright() as pw:
    b = pw.firefox.launch()
    for name, path in pages:
        for size, w, h, clip_h in (('desktop', 1920, 947, 560), ('phone', 390, 800, 560)):
            page = b.new_page(viewport={'width': w, 'height': h})
            page.goto(path.as_uri(), wait_until='load')
            time.sleep(1)
            page.add_style_tag(content='[class*=cookie],.sticky-demo{display:none!important}html{scroll-behavior:auto!important}.site-header{position:static!important}')
            y = page.evaluate("document.querySelector('#services .si-heading').getBoundingClientRect().top+scrollY")
            page.evaluate('scrollTo(0,%d)' % (y - 40))
            time.sleep(1.5)
            page.screenshot(path=str(HERE / 'shots' / ('%s-%s.png' % (name, size))), clip={'x': 0, 'y': 0, 'width': w, 'height': clip_h})
            page.close()
    b.close()
print('shots done')
