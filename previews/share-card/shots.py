# Takes the three share-card pictures, plus the middle square Instagram shows. Run from the repo root.
import pathlib, time
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
with sync_playwright() as pw:
    b = pw.firefox.launch()
    page = b.new_page(viewport={'width': 1200, 'height': 630})
    for n in (1, 2, 3):
        page.goto((HERE / 'card.html').as_uri() + '?v=%d' % n, wait_until='load')
        page.evaluate('document.fonts.ready')
        time.sleep(.8)
        page.screenshot(path=str(HERE / 'shots' / ('card%d.png' % n)))
        page.screenshot(path=str(HERE / 'shots' / ('card%d-square.png' % n)), clip={'x': 285, 'y': 0, 'width': 630, 'height': 630})
    b.close()
print('shots done')
