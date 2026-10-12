# Builds idea1..4.html: copies of the current index.html with one small style patch each, for the
# intro line of the services section. Run from the repo root: python previews/services-intro/build.py
import io, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
src = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()

ARROW = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 70' fill='none' stroke='%230b0c0e' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 9c48-12 63 13 77 48M72 49l13 8 4-16'/%3E%3C/svg%3E\")"

IDEAS = {
    # 1: plain and close. The text sits straight under the heading, bigger and in full ink.
    1: '''
#services .si-heading{display:block}
#services .si-heading>p{font-size:18px;line-height:1.55;max-width:46ch;margin:22px 0 0;color:var(--ink);letter-spacing:-.01em}
@media(max-width:700px){#services .si-heading>p{font-size:16px;margin-top:16px}}
''',
    # 2: beside the heading, but close to it, with the ink rule the hero caption uses.
    2: '''
#services .si-heading{justify-content:flex-start;align-items:flex-end;gap:clamp(34px,5vw,84px)}
#services .si-heading>p{font-size:17px;line-height:1.55;max-width:34ch;margin:0 0 9px;padding-left:20px;border-left:2px solid var(--ink);color:var(--ink);letter-spacing:-.01em}
@media(max-width:1180px){#services .si-heading>p{font-size:15px;max-width:30ch}}
@media(max-width:700px){#services .si-heading>p{font-size:16px;max-width:none;margin:18px 0 0;padding-left:15px}}
''',
    # 3: a handwritten note with a hand-drawn arrow pointing down at the services.
    3: '''
#services .si-heading{justify-content:flex-start;align-items:flex-end;gap:clamp(40px,6vw,104px)}
#services .si-heading>p{position:relative;font:600 27px/1.12 Caveat,cursive;max-width:25ch;margin:0 0 4px;color:var(--ink);transform:rotate(-2.5deg);letter-spacing:0}
#services .si-heading>p:after{content:"";position:absolute;right:-84px;bottom:-34px;width:74px;height:52px;background:''' + ARROW + ''' center/contain no-repeat;transform:rotate(14deg)}
@media(max-width:1180px){#services .si-heading>p{font-size:24px;max-width:23ch}#services .si-heading>p:after{right:-66px;width:60px}}
@media(max-width:700px){#services .si-heading>p{font-size:24px;max-width:none;margin:20px 60px 6px 0;transform:rotate(-1.5deg)}#services .si-heading>p:after{right:-52px;bottom:-22px;width:50px;height:36px}}
''',
    # 4: a pale-blue cut-paper slip, like the tags and the pink strip elsewhere on the page.
    4: '''
#services .si-heading{justify-content:flex-start;align-items:flex-end;gap:clamp(34px,5vw,84px)}
#services .si-heading>p{font-size:16px;font-weight:600;line-height:1.5;max-width:36ch;margin:0 0 2px;padding:17px 24px 19px 22px;color:var(--ink);background:var(--pale-blue);clip-path:polygon(1.5% 7%,99% 0,100% 90%,0 100%);transform:rotate(-1.4deg);letter-spacing:-.01em}
@media(max-width:1180px){#services .si-heading>p{font-size:14px;max-width:32ch}}
@media(max-width:700px){#services .si-heading>p{font-size:15px;max-width:none;margin:22px 0 0;padding:15px 18px 17px}}
''',
}

for n, css in IDEAS.items():
    html = src.replace('<head>', '<head>\n  <base href="../../">\n  <meta name="robots" content="noindex">', 1)
    assert '<base href' in html
    html = html.replace('</head>', '<style>/* services intro, idea %d */%s</style>\n</head>' % (n, css), 1)
    # menu links must stay on this preview page, not jump to the site root
    html = html.replace('</body>', "<script>addEventListener('click',e=>{const a=e.target.closest('a[href^=\"#\"]');if(!a)return;const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView()}},true)</script>\n</body>", 1)
    io.open(os.path.join(HERE, 'idea%d.html' % n), 'w', encoding='utf-8', newline='\n').write(html)
    print('idea%d.html' % n)
