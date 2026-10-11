"""Regenerates the phone-hero preview pages (preview-hero-N.html in the site root) from index.html.

They sit in the root, not in this folder, so every link and script on the page keeps working.
Run:  python previews/hero/build.py
"""
import pathlib

here = pathlib.Path(__file__).resolve().parent
root = here.parent.parent
source = (root / 'index.html').read_text(encoding='utf-8')
names = ['Current', '1. Button strip', '2. No note, bar below', '3. Picture first']

for number, name in enumerate(names):
    links = ''.join(f'<a href="preview-hero-{i}.html"{" aria-current=\"page\"" if i == number else ""}>{label}</a>' for i, label in enumerate(names))
    page = source.replace('</head>', '  <meta name="robots" content="noindex">\n  <link rel="stylesheet" href="previews/hero/variants.css">\n  <script src="previews/hero/variants.js" defer></script>\n</head>', 1)
    page = page.replace('<body>', f'<body data-hero="{number}">\n  <nav class="var-switch" aria-label="Variants"><span>Phone top:</span>{links}</nav>', 1)
    assert 'data-hero' in page and 'variants.css' in page
    (root / f'preview-hero-{number}.html').write_text(page, encoding='utf-8', newline='\n')
print('built', len(names), 'pages')
