# Takes the pictures for index.html. Run from the repo root after build.py.
import pathlib, time
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
(HERE / 'shots').mkdir(exist_ok=True)
with sync_playwright() as pw:
    b = pw.firefox.launch()
    for n in range(1, 6):
        for size, w, h in (('desktop', 1600, 860), ('phone', 390, 760)):
            page = b.new_page(viewport={'width': w, 'height': h})
            page.goto((HERE / ('idea%d.html' % n)).as_uri(), wait_until='load')
            page.add_style_tag(content='[class*=cookie]{display:none!important}')
            time.sleep(2)
            page.screenshot(path=str(HERE / 'shots' / ('idea%d-%s.png' % (n, size))))
            page.close()
    b.close()
print('shots done')
