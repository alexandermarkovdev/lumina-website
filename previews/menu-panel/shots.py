# Takes the pictures of the opened menu for index.html. Run from the repo root after build.py.
import pathlib, time
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
(HERE / 'shots').mkdir(exist_ok=True)
with sync_playwright() as pw:
    b = pw.firefox.launch()
    for name in ['now'] + ['idea%d' % n for n in range(1, 6)]:
        page = b.new_page(viewport={'width': 390, 'height': 700}, device_scale_factor=2)
        page.goto((HERE / (name + '.html')).as_uri(), wait_until='load')
        time.sleep(1)
        page.add_style_tag(content='[class*=cookie]{display:none!important}')
        page.click('.menu-toggle')
        time.sleep(.6)
        page.screenshot(path=str(HERE / 'shots' / (name + '.png')))
        info = page.evaluate("(() => {const m = document.querySelector('.expanded-menu').getBoundingClientRect(); return [Math.round(m.height), [...document.querySelectorAll('.expanded-menu a')].map(a => Math.round(a.getBoundingClientRect().height)), document.documentElement.scrollWidth > innerWidth]})()")
        print(name, 'menu height, link heights, page overflow:', info)
        page.close()
    b.close()
