# Lumina website

Landing page for Lumina, a small Bulgarian web-design studio selling websites to local businesses (restaurants, hairdressers, shops). One static page, no build step, no framework. Visitor-facing copy is written in Bulgarian, with an English version switched on from the header (`i18n.js`); the owner writes to Claude in English, often with typos and Bulgarian in Latin letters.

Live: https://alexandermarkovdev.github.io/lumina-website/ (GitHub Pages serves `main` from the repo root, so every push to `main` is published within a couple of minutes).

## How the owner likes to work

- Wants options before changes: for anything visual, offer several variants as before/after previews, let them pick, then build the pick into the site.
- For copy, give a numbered list of about 10 options with an English gloss and a recommendation; they answer with a number.
- Keep the existing look: cut-paper shapes, yellow/pink/blue paper colours, heavy Manrope headings, Caveat handwriting, hand-drawn arrows.
- Do not change the four service cards under the hero (`.service-strip`) without being asked. They want them straight, with the hover lift and icon nod only.
- Plain language in replies; they are not a developer.

## Layout of the page (`index.html`)

Header (sticky on desktop, hamburger under 850px) → hero → service strip with the down arrow → `#why-sites` (three reasons + three clickable example sites) → `#services` (six services on a scroll-filled centre line) → `#portfolio` (live previews of four real client sites) → `#contact` (postcard form) → footer line.

| File | What it holds |
|---|---|
| `styles.css` | Base, header, hero, service strip, footer. Later blocks override earlier ones; new work is appended with a comment. |
| `overview-clear-callouts.css` / `.js` | The "why a site" section: three interactive example businesses (Форно pizza, Лиора salon, Терон building materials) with handwritten feature arrows and phone tabs. Scoped to `#why-sites`. Photos in `assets/clear-callouts/*.webp`. Right of the heading sits a short paragraph with three colour tags (`.reasons-note`, in `index.html`), chosen from `previews/why-reasons/`. |
| `assets/teron-shop.js` / `.css` | The approved Терон roofing shop replaces the materials example after `overview-clear-callouts.js` runs. Three products, six specifications each, with ridge tiles first by default. Keeps the same window size and title → photo order as the other examples. Bulgarian and English are paired in this file; `i18n.js` skips `.shop-variant`. Photos are `assets/clear-callouts/roof-*.png`. |
| `services-refined.css` / `services-ideas.js` | Services section; the JS builds the markup. After the six services comes a pink strip offering English versions of clients' sites (`.sr-english`); the owner chose it from `previews/english-note/` on 2026-10-11. Its text promises "no machine or AI translation" and says "call us", so the site's own English must be human-checked and a phone number is still missing. |
| `portfolio-story.css` / `.js` | Portfolio layout: live preview, project picker on the right, caption, and for some projects service labels plus the Google search animation. `portfolio.css` still supplies the browser-frame styling. |
| `assets/project-stories.js` | Portfolio copy per project. A `proof` entry turns on the labels and the search animation; a project with only `deliverables` gets the labels and a plain summary in the same space, so the preview keeps one size. All four have a proof. JTN and MyPizza are not first on Google, so theirs carries `"ranked": false`: same searches, but no #1 badge, the heading „Направен, за да го намират.“ and a plain „SEO оптимизация“ label (owner's choice, 2026-10-11). MyPizza has no live address, so its result shows no domain. With a proof: it types each query in `queries` in turn, shows the site as #1 after each, and loops while the block is on screen. Rankings are the owner's claims, not verified. |
| `assets/projects.js` | Registry of the four portfolio sites (viewport sizes, posters, captions). VSI is first. |
| `assets/site-preview.js` / `.css` | Engine that loads the sites in iframes, auto-scrolls them and opens the desktop/phone viewer (which keeps scrolling until the visitor clicks, scrolls or presses a key, has play/pause and restart buttons, and keeps the same section in view when switching between desktop and phone). Adapted from `archive/preview-engine-original/`; read `Lumina-embedded-tech-guide.md` before changing it. |
| `contact-postcard.css` / `.js` | Contact form (blue postcard); the JS builds the markup. `contact.css` stays loaded because it also styles the header and portfolio. |
| `demo-cta.css` | The yellow demo note's entrance and periodic jiggle. |
| `cookies.css` / `cookies.js` | Cookie notice and the „Бисквитки“ link in the footer that reopens it. Google Analytics loads only after „Приемам“, and only once `GA_ID` at the top of `cookies.js` is filled in (it was empty when this was written). |
| `i18n.js` | The BG \| EN switch in the header. Bulgarian stays the source: all scripts write Bulgarian and this file swaps visible text and labels for English from one dictionary (plus patterns for sentences built from pieces) while EN is chosen, watching the page for new text. Anything missing from the dictionary simply stays Bulgarian, so **new or changed Bulgarian copy needs its English entry here**. The client sites, the Google searches and their result titles stay Bulgarian on purpose. The choice is kept in `localStorage` (`lumina_lang`); `?lang=en` forces it. One note is written by CSS (`.reasons:after`) and is translated at the end of `styles.css`, next to the header spacing rules that make room for the switch. |
| `sites/` | Static copies of the four client sites (razor, vsi, jtn, mypizza). `sites/razor` has a demo booking form added (`booking-demo.js/.css`) that says clearly it makes no real booking. |

Added 2026-10-12, all phone/tablet helpers: the demo bar at the bottom (`.sticky-demo`) has three ink marks and the same periodic nudge as the desktop note (`demo-cta.css`); where the why-section shows one example at a time (up to 1100px) a handwritten hint sits above the tabs and a "Следващ пример" button under the example opens the next one (`showMobile` in `overview-clear-callouts.js`); the viewer shows a yellow note by the pause button for 7 seconds when it opens (`.lp-tip` in `assets/site-preview.js`); the contact message box grows with the text. The yellow „Безплатно демо до 24 часа“ note on the phone hero picture (`.pink-note`, up to 600px) also drops in, nudges every few seconds and has three ink marks (`.note-marks`, a sibling because the note is clipped); rules at the end of `demo-cta.css`.

Projects in the portfolio change only when the visitor picks one (`data-auto-advance="false"` on `#portfolio`); the preview inside keeps scrolling.

`overview.css/js`, `portfolio.js` and `contact.js` are the previous versions of these sections; they are kept but no longer loaded. The new sections were designed in a separate Codex copy of the project and merged in on 2026-10-11; its standalone variation pages were deliberately not brought over.

Two scrolling traps, both fixed 2026-10-11 and easy to reintroduce: (1) a client site inside a preview frame that calls a plain `focus()` (the VSI cookie bar did) makes Firefox scroll the whole Lumina page to it, so menu links land hundreds of pixels too low; use `focus({ preventScroll: true })` in the site copies. (2) The sticky header shrinks from 105px to 70px; `.is-scrolled .site-header` carries a matching `margin-bottom` so the page does not shift mid-scroll. The owner browses in Firefox, so check scrolling there, not only in Chrome.

Several CSS files still contain rules for layout variants that were discarded long ago; they are dead, not load-bearing.

## Search and link previews

Added 2026-10-12. The `<head>` of `index.html` has the description, canonical address, Open Graph and Twitter tags, and a JSON-LD block describing the studio (phone, email, Bulgaria). The picture shown when the link is pasted in a chat is `assets/share-card.jpg` (1200×630), a screenshot of the real desktop hero with the menu, cookie bar and service strip hidden; retake it when the hero changes. Icons: `assets/favicon.svg` is the source, with `favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-192.png` / `icon-512.png` and `site.webmanifest` made from it. `robots.txt` keeps `archive/`, `previews/` and `sites/` out of search and points to `sitemap.xml`. **All full addresses in these tags and files use the GitHub Pages address; when the site moves to luminastudio.bg they must all be changed**, and `robots.txt` only takes effect there (on GitHub Pages it is not at the domain root). Chats cache the preview picture, so after changing it add a `?v=` to its address in the tags.

## Running it

The portfolio previews need http(s): opened from `file://` they show still posters only. Locally run `start-site.cmd` (Python server on port 8765), or just use the live address.

## The archive folder

`archive/` holds things the live page does not use (moved there 2026-10-11 at the owner's request). Nothing in it is loaded by `index.html`.

- `archive/ideas-gallery/`: the old proposals gallery (`ideas.html`, `ideas-preview.html`, `ideas/`). It showed ideas as before/after frames of the real page, each idea in `ideas/data.js` being a CSS/JS patch on top of `ideas-preview.html` (a copy of `index.html` with `ideas/data.js`, `ideas/preview.js` and a `noindex` meta added before `</head>`). Its paths assume the repo root, so to use it again move the three items back and regenerate `ideas-preview.html` from the current `index.html`.
- `archive/preview-engine-original/`: the untouched preview engine.
- `archive/unused-assets/`: `sources.json`, `why-image-prompts.json`, `vendor/qrcode.js`. Next to them, `archive/START-HERE.txt` is an outdated readme.
- `archive/backup-before-ideas/`: local safety copy, in `.gitignore`, on this computer only.

## Known open items

- The contact form posts to `send.php`, which emails the request to info@luminastudio.bg (address set at the top of `send.php`; written 2026-10-12, not yet tested on the server). It needs PHP, so on the local Python server or GitHub Pages the form shows its "not sent" message. Under the form is a row with the phone (0877 776 563), a Viber link and the email, set in `CONTACT` at the top of `contact-postcard.js`. The Viber link opens a chat with the owner's Viber number, +44 7842 833363 (set by the owner 2026-10-11; a different number from the phone shown).
- Hosting is moving to SiteGround shared hosting on luminastudio.bg (domain registered at jump.bg, pointed by nameservers, not transferred).
- Fonts are seven TTF files (about 1 MB); converting to WOFF2 would halve page weight.
- A design review is saved in `.impeccable/critique/`. The owner chose to act only on removing the "demo form" note for now.
