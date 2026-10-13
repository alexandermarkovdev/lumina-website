# Builds now.html and idea1..5.html (copies of the current index.html, each with one look for the phone menu
# button), plus index.html and try.html. Run from the repo root: python previews/menu-button/build.py
import io, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))

IDEAS = {
    1: ('yellow paper tag with ink lines, like the „Безплатно демо“ button on a computer', '''
.menu-toggle{width:50px;height:44px;padding:13px;border-radius:0;background:var(--yellow);clip-path:polygon(4% 8%,97% 0,100% 90%,0 100%);transform:rotate(-2deg);gap:5px}
.menu-toggle span{height:2px;background:var(--ink)}
.menu-toggle:hover{background:var(--yellow)}
.menu-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.menu-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
'''),
    2: ('the word „Меню“ with lines, in a thin ink frame', '''
.menu-toggle{width:auto;height:44px;padding:0 13px 0 14px;border-radius:0;background:none;border:1.5px solid var(--ink);flex-direction:row;align-items:center;gap:0;position:relative}
.menu-toggle:before{content:"Меню";font:800 14px/1 Manrope,sans-serif;color:var(--ink);margin-right:30px;letter-spacing:-.01em}
html[lang=en] .menu-toggle:before{content:"Menu"}
.menu-toggle span{position:absolute;right:13px;width:18px;height:2px;background:var(--ink)}
.menu-toggle span:nth-child(1){top:14px}.menu-toggle span:nth-child(2){top:20px}.menu-toggle span:nth-child(3){top:26px}
.menu-toggle:hover,.menu-toggle[aria-expanded="true"]{background:var(--yellow)}
.menu-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(6px) rotate(45deg)}
.menu-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
'''),
    3: ('three hand-drawn ink lines, no background', '''
.menu-toggle{width:46px;height:44px;padding:11px 8px;border-radius:0;background:none;gap:6px;transform:rotate(-2deg)}
.menu-toggle:hover{background:none}
.menu-toggle span{height:2.6px;background:var(--ink);border-radius:3px}
.menu-toggle span:nth-child(1){width:100%;transform:rotate(-2deg)}
.menu-toggle span:nth-child(2){width:78%;transform:rotate(1.5deg)}
.menu-toggle span:nth-child(3){width:92%;transform:rotate(-1deg)}
.menu-toggle[aria-expanded="true"] span:nth-child(1){width:100%;transform:translateY(8.6px) rotate(45deg)}
.menu-toggle[aria-expanded="true"] span:nth-child(3){width:100%;transform:translateY(-8.6px) rotate(-45deg)}
'''),
    4: ('handwritten „меню“ with a yellow marker stroke, like the BG | EN switch', '''
.menu-toggle{width:auto;height:44px;padding:0 4px;border-radius:0;background:none;position:relative;isolation:isolate;flex-direction:row;align-items:center}
.menu-toggle:hover{background:none}
.menu-toggle:before{content:"меню";font:700 29px/1 Caveat,cursive;color:var(--ink);transform:rotate(-3deg)}
html[lang=en] .menu-toggle:before{content:"menu"}
.menu-toggle:after{content:"";position:absolute;left:-3px;right:-3px;bottom:9px;height:11px;background:var(--yellow);z-index:-1;transform:rotate(-2.5deg);clip-path:polygon(0 22%,99% 0,100% 74%,1% 100%)}
.menu-toggle span{display:none}
.menu-toggle[aria-expanded="true"]:before{content:"затвори"}
html[lang=en] .menu-toggle[aria-expanded="true"]:before{content:"close"}
'''),
    5: ('black cut-paper square, slightly tilted, with thicker lines (closest to now)', '''
.menu-toggle{width:46px;height:46px;padding:14px 12px;border-radius:0;background:var(--ink);clip-path:polygon(6% 3%,100% 0,95% 97%,0 100%);transform:rotate(3deg);gap:5px}
.menu-toggle span{height:2px}
.menu-toggle[aria-expanded="true"] span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.menu-toggle[aria-expanded="true"] span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
'''),
}

src = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
base = src.replace('<head>', '<head>\n  <base href="../../">\n  <meta name="robots" content="noindex">', 1)


def write(name, text):
    io.open(os.path.join(HERE, name), 'w', encoding='utf-8', newline='\n').write(text)


write('now.html', base)
for n, (text, css) in IDEAS.items():
    write('idea%d.html' % n, base.replace('</head>', '<style>/* menu button, idea %d */\n@media(max-width:850px){%s}\n</style>\n</head>' % (n, css), 1))

rows = [['Now', 'now', 'black circle with thin white lines']] + [[str(n), 'idea%d' % n, t] for n, (t, _) in IDEAS.items()]
write('index.html', '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Lumina — phone menu button</title>
<style>
  body{margin:0;background:#e9e6df;color:#0b0c0e;font-family:Arial,Helvetica,sans-serif}
  .wrap{max-width:1100px;margin:0 auto;padding:28px 16px 70px}
  h1{font-size:24px;margin:0 0 6px}
  .lead{margin:0 0 26px;font-size:14px;color:#35343c;line-height:1.5;max-width:75ch}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:30px 26px}
  h2{font-size:15px;margin:0 0 8px;display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}
  h2 b{background:#0b0c0e;color:#fffefa;padding:3px 9px;border-radius:99px;font-size:13px}
  h2 span{font-weight:400;color:#35343c;font-size:13px;flex:1}
  h2 a{font-size:13px;color:#086697}
  .pair{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .pair img{display:block;width:100%;height:auto;border:1px solid #cfcabd}
  .cap{font-size:11px;color:#6a6860;margin:5px 0 0;letter-spacing:.04em;text-transform:uppercase}
</style>
</head>
<body>
<div class="wrap">
  <h1>Phone menu button: five looks</h1>
  <p class="lead">The button at the top right of the phone header. Each card shows it closed and after a tap (menu open). „Try it“ opens that look in a phone-size window you can tap. Nothing on the real site has changed. Tell me a number.</p>
  <div class="grid" id="grid"></div>
  <script>
    const rows = ROWS;
    document.getElementById('grid').innerHTML = rows.map(([n, file, text]) => `
    <section>
      <h2><b>${n}</b><span>${text}</span><a href="try.html?p=${file}">Try it</a></h2>
      <div class="pair">
        <div><img src="shots/${file}-closed.png" alt=""><p class="cap">Closed</p></div>
        <div><img src="shots/${file}-open.png" alt=""><p class="cap">Open</p></div>
      </div>
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
<title>Lumina — try the menu button</title>
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
