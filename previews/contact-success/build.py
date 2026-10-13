# Builds idea1..5.html: copies of the current index.html that show the thank-you popup in one of five looks.
# Run from the repo root: python previews/contact-success/build.py
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
src = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
for n in range(1, 6):
    html = src.replace('<html', '<html data-ty-preview="%d"' % n, 1)
    html = html.replace('<head>', '<head>\n  <base href="../../">\n  <meta name="robots" content="noindex">', 1)
    html = html.replace('</head>', '<link rel="stylesheet" href="previews/contact-success/popup.css">\n<script src="previews/contact-success/popup.js"></script>\n</head>', 1)
    assert 'data-ty-preview' in html and 'popup.js' in html
    io.open(os.path.join(HERE, 'idea%d.html' % n), 'w', encoding='utf-8', newline='\n').write(html)
    print('idea%d.html' % n)
