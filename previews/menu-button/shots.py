# Takes the closed/open pictures for index.html. Run from the repo root after build.py.
import pathlib, time
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
(HERE / 'shots').mkdir(exist_ok=True)
with sync_playwright() as pw:
    b = pw.firefox.launch()
    for name in ['now'] + ['idea%d' % n for n in range(1, 6)]:
        page = b.new_page(viewport={'width': 390, 'height': 760}, device_scale_factor=2)
        page.goto((HERE / (name + '.html')).as_uri(), wait_until='load')
        time.sleep(1)
        page.add_style_tag(content='[class*=cookie]{display:none!important}')
        clip = {'x': 0, 'y': 0, 'width': 390, 'height': 230}
        page.screenshot(path=str(HERE / 'shots' / (name + '-closed.png')), clip=clip)
        page.click('.menu-toggle')
        time.sleep(.6)
        page.screenshot(path=str(HERE / 'shots' / (name + '-open.png')), clip=clip)
        size = page.evaluate("(() => {const r = document.querySelector('.menu-toggle').getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height), document.documentElement.scrollWidth > innerWidth]})()")
        print(name, 'button size, page overflow:', size)
        page.close()
    b.close()
