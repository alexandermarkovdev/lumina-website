# Takes the pictures for index.html. Needs the site served from the repo root on port 8765 (start-site.cmd),
# because the 404 page uses addresses that start with /.
import pathlib, sys, time
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
PORT = sys.argv[1] if len(sys.argv) > 1 else '8765'
(HERE / 'shots').mkdir(exist_ok=True)
with sync_playwright() as pw:
    b = pw.firefox.launch()
    for n in range(1, 6):
        for size, w, h in (('desktop', 1600, 860), ('phone', 390, 760)):
            page = b.new_page(viewport={'width': w, 'height': h})
            page.goto(f'http://127.0.0.1:{PORT}/previews/not-found/idea{n}.html', wait_until='load')
            time.sleep(1)
            page.screenshot(path=str(HERE / 'shots' / f'idea{n}-{size}.png'), full_page=size == 'phone')
            page.close()
    b.close()
print('shots done')
