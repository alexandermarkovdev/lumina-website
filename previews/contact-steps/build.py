# Builds idea1..3.html: copies of the current index.html with the "what happens next" steps by the contact form
# in one of three looks. Run from the repo root: python previews/contact-steps/build.py
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
src = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
for n in (1, 2, 3):
    html = src.replace('<html', '<html data-cs="%d"' % n, 1)
    html = html.replace('<head>', '<head>\n  <base href="../../">\n  <meta name="robots" content="noindex">', 1)
    html = html.replace('</head>', '<link rel="stylesheet" href="previews/contact-steps/steps.css">\n<script src="previews/contact-steps/steps.js" defer></script>\n</head>', 1)
    assert 'data-cs=' in html and 'steps.js' in html
    io.open(os.path.join(HERE, 'idea%d.html' % n), 'w', encoding='utf-8', newline='\n').write(html)
    print('idea%d.html' % n)
