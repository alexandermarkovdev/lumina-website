"""Regenerates the preview pages for the "why a site" proposals from the real index.html.

Run from anywhere:  python previews/why/build.py
Each page shows only that one section, with the site's real styles and example sites.
"""
import pathlib, re

here = pathlib.Path(__file__).resolve().parent
root = here.parent.parent
source = (root / 'index.html').read_text(encoding='utf-8')

sprite = re.search(r'<svg class="icon-library".*?</svg>', source, re.S).group(0)
section = re.search(r'<section class="why-overview".*?</section>', source, re.S).group(0)

names = ['Current', '1. Features first', '2. One business at a time', '3. One reason, one proof', '4. Tidy what is there']

for number, name in enumerate(names):
    links = ''.join(
        f'<a href="previews/why/v{i}.html"{" aria-current=\"page\"" if i == number else ""}>{label}</a>'
        for i, label in enumerate(names))
    page = f'''<!doctype html>
<html lang="bg" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <base href="../../">
  <title>Why section: {name}</title>
  <link rel="stylesheet" href="assets/fonts/fonts.css">
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="overview.css">
  <link rel="stylesheet" href="previews/why/variants.css">
  <script src="overview.js" defer></script>
  <script src="previews/why/variants.js" defer></script>
</head>
<body data-variant="{number}">
  {sprite}
  <nav class="var-switch" aria-label="Variants"><span>Section 2 proposals:</span>{links}</nav>
  <div class="page-shell">
    <main>
      {section}
    </main>
  </div>
</body>
</html>
'''
    (here / f'v{number}.html').write_text(page, encoding='utf-8', newline='\n')
print('built', len(names), 'pages in', here)
