# Writes idea1.html … idea5.html: five looks for the page shown at a wrong address (404).
# Run from anywhere; then shots.py takes the pictures for index.html.
import pathlib

HERE = pathlib.Path(__file__).resolve().parent
ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>'
TEXT = ('<p class="nf-text">Адресът може да е сгрешен или страницата вече да не съществува. '
        'Всичко за Lumina е на началната страница.</p>')
ACTIONS = (f'<div><a class="nf-btn" href="/">Към началната страница {ARROW}</a>'
           '<a class="nf-link" href="/#contact">Заявете безплатно демо</a></div>')
EN = '<p class="nf-en" lang="en">This page doesn’t exist. <a href="/">Go to the home page</a>.</p>'
HEAD = '''<!doctype html>
<html lang="bg">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Страницата не е намерена — Lumina</title>
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/fonts/fonts.css?v=2">
<link rel="stylesheet" href="/previews/not-found/base.css">
<style>{css}</style>
</head>
<body>
<header class="nf-top"><a href="/" aria-label="Lumina — начало"><img src="/assets/images/lumina-logo.png?v=2" width="264" height="68" alt="LUMINA."></a><a class="nf-call" href="tel:+359877776563">0877 776 563</a></header>
<main class="nf-main">{body}</main>
{script}</body>
</html>
'''

IDEAS = {
# 1. Big yellow cut-paper note with 404, text on the left.
1: ('''
.i1{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;width:100%}
.i1 h1{font-size:clamp(46px,6vw,84px)}
.i1-note{position:relative;justify-self:center;width:min(440px,90%);aspect-ratio:1/.92;display:grid;place-items:center;transform:rotate(-6deg)}
.i1-note:before{content:"";position:absolute;inset:0;background:var(--yellow);clip-path:polygon(28% 0,72% 13%,78% 32%,88% 38%,100% 71%,89% 92%,21% 100%,0 40%);filter:drop-shadow(0 14px 18px #0001)}
.i1-note b{position:relative;font-size:clamp(90px,12vw,170px);font-weight:800;letter-spacing:-.07em;line-height:.8}
.i1-note span{position:absolute;bottom:17%;left:22%;font-size:clamp(26px,3vw,36px);transform:rotate(3deg)}
.i1-marks{position:absolute;left:-6%;top:6%;width:60px;height:60px}
.i1-marks i{position:absolute;width:30px;height:5px;border-radius:4px;background:var(--ink)}
.i1-marks i:nth-child(1){left:0;top:34px;transform:rotate(-12deg)}.i1-marks i:nth-child(2){left:8px;top:14px;transform:rotate(-48deg)}.i1-marks i:nth-child(3){left:28px;top:2px;transform:rotate(-84deg)}
@media(max-width:800px){.i1{grid-template-columns:1fr;gap:20px}.i1-note{order:-1;width:min(300px,78%)}}
''', '''<div class="i1"><div><h1>Тази страница я&nbsp;няма.</h1>{TEXT}{ACTIONS}{EN}</div>
<div class="i1-note" aria-hidden="true"><span class="i1-marks"><i></i><i></i><i></i></span><b>404</b><span class="nf-hand">грешен адрес</span></div></div>'''),

# 2. Blue paper with an empty browser window and a pink handwritten note.
2: ('''
.i2{display:grid;grid-template-columns:1.15fr .95fr;gap:40px;align-items:center;width:100%}
.i2 h1{font-size:clamp(46px,6vw,84px)}
.i2-art{position:relative;aspect-ratio:1.25;width:100%}
.i2-art .blue{position:absolute;inset:0 4% 6% 8%;background:var(--blue);clip-path:polygon(9% 10%,51% 0,91% 11%,100% 47%,88% 79%,61% 100%,10% 85%,0 41%)}
.i2-win{position:absolute;left:14%;top:20%;width:70%;aspect-ratio:1.45;background:var(--warm);border-radius:10px 10px 2px 2px;box-shadow:1px 13px 19px #11111129;overflow:hidden;transform:rotate(-1.5deg)}
.i2-bar{height:26px;background:#e6e3dc;display:flex;align-items:center;gap:6px;padding:0 10px}
.i2-bar i{width:8px;height:8px;border-radius:50%;background:var(--pink)}.i2-bar i:nth-child(2){background:var(--yellow)}.i2-bar i:nth-child(3){background:var(--blue)}
.i2-bar span{margin-left:10px;flex:1;height:14px;border-radius:7px;background:#fffefa;font-size:9px;line-height:14px;padding:0 8px;color:#6a6860;overflow:hidden;white-space:nowrap}
.i2-win b{display:grid;place-items:center;height:calc(100% - 26px);font-size:clamp(54px,7vw,104px);font-weight:800;letter-spacing:-.07em;color:#d9d5cc}
.i2-pink{position:absolute;right:2%;bottom:6%;width:34%;aspect-ratio:1;background:var(--pink);clip-path:polygon(9% 4%,80% 0,100% 24%,94% 84%,27% 100%,0 48%);transform:rotate(-7deg);display:grid;place-items:center;text-align:center;font-size:clamp(22px,2.4vw,32px);line-height:.95;padding:12%}
@media(max-width:800px){.i2{grid-template-columns:1fr;gap:16px}.i2-art{order:-1;width:100%;max-width:420px}.i2-pink{width:38%;font-size:clamp(16px,4.6vw,24px);padding:11% 9% 13%}}
''', '''<div class="i2"><div><h1>Тази страница я&nbsp;няма.</h1>{TEXT}{ACTIONS}{EN}</div>
<div class="i2-art" aria-hidden="true"><div class="blue"></div><div class="i2-win"><div class="i2-bar"><i></i><i></i><i></i><span class="i2-url">luminastudio.bg/…</span></div><b>404</b></div><div class="i2-pink nf-hand">Тук няма нищо. Върнете се в началото.</div></div></div>'''),

# 3. The three digits on separate paper slips, centred.
3: ('''
.i3{width:100%;text-align:center;display:flex;flex-direction:column;align-items:center}
.i3-digits{display:flex;gap:clamp(8px,1.6vw,22px);margin-bottom:34px}
.i3-digits b{display:grid;place-items:center;width:clamp(86px,11vw,150px);aspect-ratio:.82;font-size:clamp(70px,9vw,128px);font-weight:800;letter-spacing:-.06em;clip-path:polygon(3% 5%,97% 0,100% 95%,0 100%)}
.i3-digits b:nth-child(1){background:var(--yellow);transform:rotate(-5deg)}
.i3-digits b:nth-child(2){background:var(--pink);transform:rotate(3deg) translateY(10px)}
.i3-digits b:nth-child(3){background:var(--blue);transform:rotate(-2deg)}
.i3 h1{font-size:clamp(38px,4.6vw,64px)}
.i3 .nf-text{margin-left:auto;margin-right:auto}
.i3-hand{font-size:clamp(24px,2.4vw,30px);margin:-8px 0 26px;transform:rotate(-2deg)}
''', '''<div class="i3"><div class="i3-digits" aria-hidden="true"><b>4</b><b>0</b><b>4</b></div>
<p class="i3-hand nf-hand" aria-hidden="true">Страницата не е намерена</p><h1>Тази страница я&nbsp;няма.</h1>{TEXT}{ACTIONS}{EN}</div>'''),

# 4. A postcard sent back: the wrong address written on it, "address unknown" stamp.
4: ('''
.i4{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;width:100%}
.i4 h1{font-size:clamp(46px,6vw,84px)}
.i4-wrap{position:relative;padding:22px}
.i4-wrap:before{content:"";position:absolute;inset:0;background:var(--blue);transform:rotate(4deg)}
.i4-card{position:relative;background:#fffdf8;padding:28px 30px 34px;box-shadow:0 18px 30px #0b3a4d26;transform:rotate(-2.5deg)}
.i4-card .to{font-size:12px;color:var(--muted);border-bottom:1px solid #d9d5cc;padding-bottom:8px;width:70%}
.i4-card .addr{font-size:clamp(28px,3vw,40px);margin:18px 0 6px;line-height:1.05;word-break:break-all}
.i4-card .note{font-size:clamp(22px,2.2vw,28px);color:var(--muted)}
.i4-stamp{position:absolute;right:22px;top:20px;width:108px;height:108px;border:3px solid #c0392b;border-radius:50%;display:grid;place-items:center;text-align:center;color:#c0392b;font-weight:800;font-size:11px;letter-spacing:.06em;line-height:1.25;transform:rotate(14deg);opacity:.85}
.i4-stamp span{display:block;font-size:26px;letter-spacing:-.04em}
@media(max-width:800px){.i4{grid-template-columns:1fr;gap:26px}.i4-wrap{order:-1;max-width:420px;padding:16px}.i4-card{padding:96px 22px 26px}.i4-card .addr{font-size:26px}.i4-stamp{top:14px;right:16px;width:76px;height:76px;font-size:8px}.i4-stamp span{font-size:18px}}
''', '''<div class="i4"><div><h1>Тази страница я&nbsp;няма.</h1>{TEXT}{ACTIONS}{EN}</div>
<div class="i4-wrap" aria-hidden="true"><div class="i4-card"><p class="to">До:</p><p class="addr nf-hand">luminastudio.bg<span class="i4-path">/…</span></p><p class="note nf-hand">Върнато: такъв адрес няма.</p><div class="i4-stamp"><div><span>404</span>АДРЕСЪТ НЕ<br>Е НАМЕРЕН</div></div></div></div></div>'''),

# 5. Helpful: the main parts of the site on paper slips, like the phone menu.
5: ('''
.i5{display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center;width:100%}
.i5 h1{font-size:clamp(46px,6vw,84px)}
.i5-hand{font-size:clamp(26px,2.6vw,32px);margin:0 0 14px;transform:rotate(-2deg)}
.i5-slips{display:flex;flex-direction:column;gap:10px}
.i5-slips a{position:relative;isolation:isolate;display:flex;justify-content:space-between;align-items:center;padding:15px 20px;font-size:21px;font-weight:800;letter-spacing:-.03em;text-decoration:none}
.i5-slips a:before{content:"";position:absolute;inset:0;z-index:-1;background:var(--yellow);clip-path:polygon(1% 7%,99% 0,100% 92%,0 100%);transition:transform .25s var(--ease)}
.i5-slips a:hover:before{transform:scale(1.02)}
.i5-slips a:nth-child(1){transform:rotate(-1deg)}
.i5-slips a:nth-child(2){transform:rotate(.8deg)}.i5-slips a:nth-child(2):before{background:var(--pink)}
.i5-slips a:nth-child(3){transform:rotate(-.6deg)}.i5-slips a:nth-child(3):before{background:var(--pale-blue)}
.i5-slips a:nth-child(4){transform:rotate(1deg)}.i5-slips a:nth-child(4):before{background:var(--blue)}
.i5-slips svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2;transform:rotate(90deg)}
.i5-slips a:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
@media(max-width:800px){.i5{grid-template-columns:1fr;gap:30px}.i5-slips a{font-size:19px}}
''', '''<div class="i5"><div><h1>Тази страница я&nbsp;няма.</h1>{TEXT}{ACTIONS}{EN}</div>
<nav aria-label="Части на сайта"><p class="i5-hand nf-hand">Може би търсите:</p><div class="i5-slips">
<a href="/#why-sites">Защо ви е сайт? {ARROW}</a><a href="/#services">Нашите услуги {ARROW}</a><a href="/#portfolio">Портфолио {ARROW}</a><a href="/#contact">Контакт {ARROW}</a></div></nav></div>'''),
}

# Ideas 2 and 4 show the address the visitor actually typed.
SHOW_PATH = '''<script>
document.querySelectorAll('.i2-url,.i4-path').forEach(el => {
  const path = decodeURIComponent(location.pathname).replace(/^\\/previews\\/not-found\\/idea\\d\\.html$/, '/ceni-2025');
  el.textContent = el.classList.contains('i2-url') ? 'luminastudio.bg' + path : path;
});
</script>
'''

for n, (css, body) in IDEAS.items():
    body = body.replace('{TEXT}', TEXT).replace('{ACTIONS}', ACTIONS).replace('{EN}', EN).replace('{ARROW}', ARROW)
    page = HEAD.replace('{css}', css).replace('{body}', body).replace('{script}', SHOW_PATH if n in (2, 4) else '')
    (HERE / f'idea{n}.html').write_text(page, encoding='utf-8')
print('built 5 ideas')
