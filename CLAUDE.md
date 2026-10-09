# Lumina website

Landing page for Lumina, a small Bulgarian web-design studio selling websites to local businesses (restaurants, hairdressers, shops). One static page, no build step, no framework. All visitor-facing copy is Bulgarian; the owner writes to Claude in English, often with typos and Bulgarian in Latin letters.

Live: https://alexandermarkovdev.github.io/lumina-website/ (GitHub Pages serves `main` from the repo root, so every push to `main` is published within a couple of minutes).

## How the owner likes to work

- Wants options before changes: for anything visual, offer several variants as before/after previews in `ideas.html`, let them pick, then build the pick into the site.
- For copy, give a numbered list of about 10 options with an English gloss and a recommendation; they answer with a number.
- Keep the existing look: cut-paper shapes, yellow/pink/blue paper colours, heavy Manrope headings, Caveat handwriting, hand-drawn arrows.
- Do not change the four service cards under the hero (`.service-strip`) without being asked. They want them straight, with the hover lift and icon nod only.
- Plain language in replies; they are not a developer.

## Layout of the page (`index.html`)

Header (sticky on desktop, hamburger under 850px) → hero → service strip with the down arrow → `#why-sites` (three reasons + three clickable example sites) → `#services` (six services on a scroll-filled centre line) → `#portfolio` (live previews of four real client sites) → `#contact` (postcard form) → footer line.

| File | What it holds |
|---|---|
| `styles.css` | Base, header, hero, service strip, footer. Later blocks override earlier ones; new work is appended with a comment. |
| `overview.css` / `overview.js` | The "why a site" section and its interactive example sites. |
| `services-refined.css` / `services-ideas.js` | Services section; the JS builds the markup. |
| `portfolio.css` / `portfolio.js` | Portfolio stage, tabs and caption. |
| `assets/projects.js` | Registry of the four portfolio sites (viewport sizes, posters, captions). |
| `assets/site-preview.js` / `.css` | Engine that loads the sites in iframes, auto-scrolls them and opens the desktop/phone viewer. Adapted from `preview-engine-original/`; read `Lumina-embedded-tech-guide.md` before changing it. |
| `contact.css` / `contact.js` | Contact form; the JS builds the markup. |
| `demo-cta.css` | The yellow demo note's entrance and periodic jiggle. |
| `sites/` | Static copies of the four client sites (razor, vsi, jtn, mypizza). `sites/razor` has a demo booking form added (`booking-demo.js/.css`) that says clearly it makes no real booking. |

Several CSS files still contain rules for layout variants that were discarded long ago; they are dead, not load-bearing.

## Running it

The portfolio previews need http(s): opened from `file://` they show still posters only. Locally run `start-site.cmd` (Python server on port 8765), or just use the live address.

## The ideas gallery

`ideas.html` + `ideas/` show proposals as before/after frames of the real page. Each idea in `ideas/data.js` is a CSS/JS patch applied on top of `ideas-preview.html`.

- `ideas-preview.html` is a copy of `index.html` with `ideas/data.js`, `ideas/preview.js` and a `noindex` meta added before `</head>`. Regenerate it after any change to `index.html`.
- When an idea is chosen, build it into the real files and remove it from `ideas/data.js`.

## Known open items

- The contact form does not send anything; it only shows a "not sent" message. There is no phone or email on the page. This blocks real use.
- Fonts are seven TTF files (about 1 MB); converting to WOFF2 would halve page weight.
- A design review is saved in `.impeccable/critique/`. The owner chose to act only on removing the "demo form" note for now.
