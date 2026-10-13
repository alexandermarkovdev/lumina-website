# Builds now.html and idea1..5.html (copies of the current index.html, each with one look for the opened phone
# menu), plus index.html and try.html. Run from the repo root: python previews/menu-panel/build.py
import io, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))

IDEAS = {
    1: ('cut yellow paper with numbered links, no arrows', '''
.expanded-menu{background:none;box-shadow:none;filter:drop-shadow(0 18px 22px #0b0c0e30);padding:26px 26px 30px;counter-reset:item;isolation:isolate;transform:rotate(-1deg)}
.expanded-menu:before{content:"";position:absolute;inset:0;z-index:-1;background:var(--yellow);clip-path:polygon(0 2%,98.500% 0,100% 97%,1.500% 100%)}
.expanded-menu a{justify-content:flex-start;gap:16px;padding:13px 0;font-size:24px;border-bottom:1px dashed #0b0c0e55;counter-increment:item}
.expanded-menu a:before{content:"0" counter(item);font-size:12px;font-weight:800;letter-spacing:.04em;min-width:22px;align-self:flex-start;padding-top:9px}
.expanded-menu a .icon{display:none}
.expanded-menu a:last-of-type{border-bottom:0}
.menu-note{font:600 24px/1.1 Caveat,cursive;margin-top:14px;max-width:none;transform:rotate(-2deg)}
'''),
    2: ('dark sheet across the whole screen, big light links', '''
.expanded-menu{position:fixed;left:0;right:0;top:83px;bottom:0;width:auto;background:var(--ink);color:var(--paper);padding:26px 26px 40px;box-shadow:none;display:flex;flex-direction:column}
.expanded-menu[hidden]{display:none}
.expanded-menu a{padding:17px 0;font-size:31px;border-bottom:1px solid #fffefa2e}
.expanded-menu a .icon{color:var(--yellow)}
.expanded-menu a[aria-current="location"]{color:var(--yellow)}
.menu-note{font:600 27px/1.1 Caveat,cursive;color:var(--yellow);margin-top:auto;max-width:none;transform:rotate(-2deg)}
'''),
    3: ('each link on its own paper slip, in the paper colours', '''
.expanded-menu{background:var(--paper);padding:20px 20px 24px;box-shadow:0 20px 38px #1010102e;border:1.5px solid var(--ink)}
.expanded-menu a{position:relative;isolation:isolate;border:0;margin:0 0 9px;padding:13px 18px;font-size:22px}
.expanded-menu a:before{content:"";position:absolute;inset:0;z-index:-1;background:var(--yellow);clip-path:polygon(1% 7%,99% 0,100% 92%,0 100%)}
.expanded-menu a:nth-of-type(1){transform:rotate(-1deg)}
.expanded-menu a:nth-of-type(2){transform:rotate(.8deg)}.expanded-menu a:nth-of-type(2):before{background:var(--pink)}
.expanded-menu a:nth-of-type(3){transform:rotate(-.6deg)}.expanded-menu a:nth-of-type(3):before{background:var(--pale-blue)}
.expanded-menu a:nth-of-type(4){transform:rotate(1deg)}.expanded-menu a:nth-of-type(4):before{background:var(--blue)}
.expanded-menu a:nth-of-type(5){transform:rotate(-.8deg)}
.expanded-menu a .icon{width:20px;height:20px;transform:rotate(135deg)}
.menu-note{font:600 23px/1.1 Caveat,cursive;margin-top:14px;max-width:none}
'''),
    4: ('white paper with an ink frame, yellow marker on the section you are in', '''
.expanded-menu{background:var(--paper);border:1.5px solid var(--ink);box-shadow:6px 6px 0 var(--yellow);padding:14px 24px 22px}
.expanded-menu a{padding:14px 0;font-size:23px;border-bottom:1px solid #0b0c0e22}
.expanded-menu a .icon{width:19px;height:19px;transform:rotate(135deg)}
.expanded-menu a[aria-current="location"]{background:linear-gradient(transparent 58%,var(--yellow) 58% 90%,transparent 90%) no-repeat left/auto}
.expanded-menu a:last-of-type{margin-top:16px;padding:14px 18px;border:0;background:var(--yellow);clip-path:polygon(1% 6%,99% 0,100% 93%,0 100%);font-size:19px}
.menu-note{font:600 23px/1.1 Caveat,cursive;margin-top:16px;max-width:none;transform:rotate(-2deg)}
'''),
    5: ('compact yellow paper, smaller links, „Контакт“ as a dark button', '''
.expanded-menu{background:none;box-shadow:none;filter:drop-shadow(0 16px 20px #0b0c0e2e);padding:14px 24px 24px;isolation:isolate}
.expanded-menu:before{content:"";position:absolute;inset:0;z-index:-1;background:var(--yellow);clip-path:polygon(0 1.500%,99% 0,100% 98%,1% 100%)}
.expanded-menu a{padding:12px 0;font-size:20px;letter-spacing:-.02em;border-bottom:1px solid #0b0c0e30}
.expanded-menu a .icon{display:none}
.expanded-menu a:last-of-type{margin-top:16px;justify-content:center;padding:14px 18px;border:0;background:var(--ink);color:var(--paper);font-size:17px}
.menu-note{font:600 23px/1.1 Caveat,cursive;margin-top:14px;max-width:none;transform:rotate(-2deg)}
'''),
}

src = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
base = src.replace('<head>', '<head>\n  <base href="../../">\n  <meta name="robots" content="noindex">', 1)


def write(name, text):
    io.open(os.path.join(HERE, name), 'w', encoding='utf-8', newline='\n').write(text)


write('now.html', base)
for n, (text, css) in IDEAS.items():
    write('idea%d.html' % n, base.replace('</head>', '<style>/* opened phone menu, idea %d */\n@media(max-width:850px){%s}\n</style>\n</head>' % (n, css), 1))

rows = [['Now', 'now', 'flat yellow box, large links with arrows']] + [[str(n), 'idea%d' % n, t] for n, (t, _) in IDEAS.items()]
write('index.html', '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Lumina — opened phone menu</title>
<style>
  body{margin:0;background:#e9e6df;color:#0b0c0e;font-family:Arial,Helvetica,sans-serif}
  .wrap{max-width:1200px;margin:0 auto;padding:28px 16px 70px}
  h1{font-size:24px;margin:0 0 6px}
  .lead{margin:0 0 26px;font-size:14px;color:#35343c;line-height:1.5;max-width:75ch}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:34px 22px}
  h2{font-size:15px;margin:0 0 8px;display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;min-height:54px}
  h2 b{background:#0b0c0e;color:#fffefa;padding:3px 9px;border-radius:99px;font-size:13px}
  h2 span{font-weight:400;color:#35343c;font-size:13px;flex:1}
  h2 a{font-size:13px;color:#086697}
  img{display:block;width:100%;height:auto;border:1px solid #cfcabd}
</style>
</head>
<body>
<div class="wrap">
  <h1>Opened phone menu: five looks</h1>
  <p class="lead">What appears after tapping the menu button on a phone. „Try it“ opens that look in a phone-size window where you can open the menu and tap the links. Nothing on the real site has changed. Tell me a number.</p>
  <div class="grid" id="grid"></div>
  <script>
    const rows = ROWS;
    document.getElementById('grid').innerHTML = rows.map(([n, file, text]) => `
    <section>
      <h2><b>${n}</b><span>${text}</span><a href="try.html?p=${file}">Try it</a></h2>
      <img src="shots/${file}.png" alt="">
    </section>`).join('');
  </script>
</div>
</body>
</html>
'''.replace('ROWS', json.dumps(rows, ensure_ascii=False)))

write('try.html', '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<title>Lumina — try the phone menu</title>
<style>body{margin:0;background:#e9e6df;font-family:Arial,sans-serif;display:grid;justify-items:center;gap:12px;padding:20px}a{color:#086697;font-size:14px}iframe{width:390px;height:760px;border:10px solid #0b0c0e;border-radius:34px;background:#fffefa}</style>
</head>
<body>
<a href="index.html">Back to the five looks</a>
<iframe id="f" title="Phone preview"></iframe>
<script>const p = new URLSearchParams(location.search).get('p') || 'now'; if (/^(now|idea[1-5])$/.test(p)) document.getElementById('f').src = p + '.html';</script>
</body>
</html>
''')
print('built', len(IDEAS) + 1, 'pages')
