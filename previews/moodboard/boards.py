# Saves each board of index.html as a PNG (board-1.png … board-5.png). Needs the site served from the repo root:
#   python -m http.server 8771 --bind 127.0.0.1   then   python previews/moodboard/boards.py 8771
import pathlib, sys
from playwright.sync_api import sync_playwright
HERE = pathlib.Path(__file__).resolve().parent
PORT = sys.argv[1] if len(sys.argv) > 1 else '8765'
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1900, 'height': 1200}, device_scale_factor=1.5)
    pg.goto(f'http://127.0.0.1:{PORT}/previews/moodboard/index.html', wait_until='networkidle')
    pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(1000)
    for n in range(1, 6):
        pg.locator(f'#b{n}').screenshot(path=str(HERE / f'board-{n}.png'))
        print('board', n)
    b.close()
