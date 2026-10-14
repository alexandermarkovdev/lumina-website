# Saves the four share cards as JPEGs (card1.jpg … card6.jpg), plus the middle square Instagram shows (cardN-square.jpg).
#   python -I previews/share-card-2/shots.py
import pathlib
from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
with sync_playwright() as pw:
    b = pw.chromium.launch()
    page = b.new_page(viewport={'width': 1200, 'height': 630})
    for n in (1, 2, 3, 4, 5, 6):
        page.goto((HERE / 'card.html').as_uri() + '?v=%d' % n, wait_until='load')
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(600)
        page.screenshot(path=str(HERE / ('card%d.jpg' % n)), type='jpeg', quality=90)
        page.screenshot(path=str(HERE / ('card%d-square.jpg' % n)), type='jpeg', quality=90, clip={'x': 285, 'y': 0, 'width': 630, 'height': 630})
    b.close()
print('shots done')
