# Lumina: embedded previews, popups and animation guide

Documentation date: 8 October 2026. Based on the current original site in `Lumina-site-viewer/website`, not the discarded reading-layout demos.

This document covers the embedded-site technology and related interactions. It does not redesign the site. No website files were changed to produce this guide.

## 1. What the system does

Lumina imports local copies of four portfolio websites and renders them inside real browser iframes at desktop, tablet and phone viewport sizes. The visible devices are scaled presentations of those viewports. They are not videos. JPEG posters cover loading periods; the live iframe takes over when ready.

Only the active project is loaded. The desktop, tablet and phone previews advance through their own pages using one shared tour clock. Selecting a device opens an interactive modal. Closing it restores the surrounding page position and resumes the preview tour.

Technology: plain HTML, CSS and JavaScript; native `<dialog>`; `requestAnimationFrame`; Web Animations API; `ResizeObserver`; `IntersectionObserver`. No React, animation library or backend is required for this preview system.

## 2. Files and integration order

All paths below are relative to the website root (the folder containing `index.html`).

| File | Responsibility |
|---|---|
| `assets/projects.js` | Project registry, imported page paths, live URLs, viewport sizes and posters |
| `assets/site-preview.js` | Iframe lifecycle, tour clock, modal, scroll restoration, scene positioning, JTN demonstration |
| `assets/site-preview.css` | Device hardware, hit areas, clipping, modal and responsive presentation |
| `assets/interaction-variants.js` | Services/project tabs and business accordions; also contains legacy variant handlers |
| `assets/interaction-variants.css` | Styles for those content interactions |
| `assets/mobile-menu.js` | Instant-opening mobile navigation dialog |
| `assets/homepage.css` | Current page styling, mobile menu and scene overrides |
| `assets/lumina-shared.css` | Shared typography and base layout |
| `sites/<project>/` | Imported static websites and their local assets |
| `assets/previews/` | Desktop, tablet and mobile poster images |

Keep the current stylesheet order in `index.html`. The JavaScript order is:

```html
<script defer src="assets/projects.js?v=preview-core-27"></script>
<script defer src="assets/site-preview.js?v=preview-core-27"></script>
<script defer src="assets/interaction-variants.js?v=landing-clean-19"></script>
<script defer src="assets/mobile-menu.js?v=mobile-menu-instant-26"></script>
```

The query strings are cache versions, not different source files. Change the appropriate version after editing a published asset.

### Same-origin requirement

Serve the parent page and imported sites from the same origin: the same scheme, hostname and port. The controller reads `iframe.contentDocument`, measures the embedded page and calls `iframe.contentWindow.scrollTo()`.

Do not replace the local `url` with the public external website address. Cross-origin browser restrictions prevent the controller from reading and scrolling that document, and the other host may block embedding. `liveUrl` is a separate external link.

Use HTTP or HTTPS for testing, not a double-clicked `file://` page. GitHub Pages can serve this static structure. The controller is designed for trusted imported copies; its iframes are not a security sandbox for arbitrary third-party code. Imported contact/booking backends do not become functional merely because the static files are copied.

## 3. Registering a portfolio site

The following is an exact current registry entry:


```javascript
  {
    id: 'vsi',
    name: 'VSI Sports Complex',
    url: 'sites/vsi/index.html',
    liveUrl: 'https://vsiswimming.com/',
    readySelector: 'main',
    background: '#edf7fa',
    ink: '#10334b',
    colorScheme: 'light',
    hideInThumbnail: '.consent-bar',
    bookingSelector: '[data-nm-booking]',
    modes: {
      // Match the supplied full desktop composition: its side artwork scales
      // with the space outside the site's 1280px content column.
      desktop: { width: 1920, height: 1200, poster: 'assets/previews/vsi-desktop.jpg' },
      tablet: { width: 820, height: 1132, poster: 'assets/previews/vsi-tablet.jpg' },
      mobile: { width: 402, height: 778, poster: 'assets/previews/vsi-mobile.jpg' }
    }
  },
```

The excerpt is an array item in `window.LUMINA_PROJECTS`, not a standalone script. The trailing comma separates it from the next item.

To add a site:

1. Copy its deployable static files into `sites/new-project/`. Preserve relative paths and leave the original source project untouched.
2. Add its registry entry before `site-preview.js` runs. Give it a unique `id`, title, local `url`, a `readySelector`, and all three `modes` with positive viewport sizes and existing poster paths.
3. Set `liveUrl` only when there is a real public address. MyPizza currently has no public URL in the registry.
4. Add corresponding project text in `index.html`; the content-interaction script builds its project tabs from page content. Registering an iframe alone does not create the editorial project description.
5. Test internal links, assets and forms inside the copied site. The custom adapters are site-specific, not a general backend migration.

Current viewports:

| Project | Desktop | Tablet | Phone |
|---|---:|---:|---:|
| Razor | 1440 × 900 | 820 × 1132 | 402 × 778 |
| VSI | 1920 × 1200 | 820 × 1132 | 402 × 778 |
| JTN | 1440 × 900 | 820 × 1132 | 402 × 778 |
| MyPizza | 1440 × 900 | 820 × 1132 | 402 × 778 |

VSI intentionally uses a wider desktop viewport: its dolphin decoration depends on the margin outside its content column. Do not shrink that value just to fit the photographed monitor; the controller already scales the whole viewport into the screen.

## 4. Automatic scrolling and project rotation

The tour clock currently uses `interval: 15000` (15 seconds). Loading time comes before the tour: `beginTour()` waits until all three views exist and each is ready or failed, with no pending home-page reset.

- Normal opening hold: 1,800 ms.
- JTN opening hold: 4,800 ms, to show its curtain and cursor demonstration.
- Footer hold: 1,000 ms.
- Remaining time: scroll from the captured starting position to each document's bottom.
- A short easing ramp covers the first and last 6% of scrolling.

The three views share progress, not identical pixel positions: different responsive layouts have different page heights. A delayed frame advances the clock by at most 50 ms, favouring smoothness over a catch-up jump. Therefore 15 seconds is the nominal active tour duration; slow frames and pauses can make wall-clock time longer.

Exact current scrolling loop (`assets/site-preview.js`):


```javascript
  function tourFrame(now){
    rotation.frame=0;
    if(!canTour()){stopTour();return;}
    if(!rotation.started&&!beginTour()){document.body.dataset.previewTour='loading';return;}
    // A delayed frame should slow the camera briefly, not jump over content.
    if(rotation.last)rotation.elapsed+=Math.min(now-rotation.last,50);
    rotation.last=now;
    const hold=registry.get(active).presentation==='jtn-doors'?4800:1800;
    const progress=Math.max(0,Math.min(1,(rotation.elapsed-hold)/(rotation.interval-hold-1000)));
    // A short acceleration/deceleration around an otherwise steady pan.
    const ramp=.06,p=progress<ramp?progress*progress/(2*ramp*(1-ramp)):progress>1-ramp?1-(1-progress)**2/(2*ramp*(1-ramp)):(progress-ramp/2)/(1-ramp);
    const phase=rotation.elapsed<hold?'intro':progress<1?'scrolling':'footer';
    if(document.body.dataset.previewTour!==phase)document.body.dataset.previewTour=phase;
    const scrolls=[];
    screens.forEach(s=>{
      if(s.project.id!==active||!s.ready)return;
      try{
        const win=s.frame.contentWindow,geometry=s.tourGeometry;
        if(!geometry)return;
        if(geometry.dirty){
          geometry.end=Math.max(0,win.document.scrollingElement.scrollHeight-s.view.height);
          geometry.dirty=false;
        }
        const end=geometry.end,start=Math.min(s.tourStart||0,end);
        const top=Math.round(start+(end-start)*p);
        // No redundant scroll events during the intro/footer holds.
        if(top!==geometry.lastTop)scrolls.push({win,top,geometry});
      }catch{}
    });
    // Finish layout reads in every document before moving any viewport.
    scrolls.forEach(({win,top,geometry})=>{win.scrollTo({left:0,top,behavior:'instant'});geometry.lastTop=top;});
    if(rotation.elapsed>=rotation.interval){advance(1,true);return;}
    rotation.frame=requestAnimationFrame(tourFrame);
  }
```

### Changing duration safely

Change `rotation.interval` in the controller's initial rotation object. Update the hard-coded “15-second preview” control titles in `scheduleRotation()` too. If changing the JTN intro length, update both its animation schedule and its opening hold. Keep the interval greater than the opening hold plus the footer hold.

Do not add `behavior: 'smooth'` to each frame's `scrollTo()`. That starts competing browser scroll animations. The shared clock already supplies the motion.

## 5. Mobile performance safeguards — preserve these

The compact path is selected by `innerWidth <= 1000 || matchMedia('(pointer: coarse)').matches`, not just the visual CSS breakpoint.

- Only the active project's three frames run in the scene, rather than twelve frames for four projects.
- In an open viewer, only the selected device frame is wanted.
- Offscreen or hidden-page previews can release their browsing contexts.
- Release old frames before loading replacements, avoiding a temporary memory spike.
- On compact devices, load one embedded document at a time. All three participate once ready; this is not a permanent one-device-only mobile mode.
- Cache scroll extent. `ResizeObserver`, image loads and font readiness invalidate it; do not measure every page's `scrollHeight` on every frame.
- Batch geometry reads before scroll writes and skip identical rounded scroll positions.
- Do not attach expensive layout measurement or pause/restart cycles to every parent-page scroll event.
- Passive previews disable embedded `backdrop-filter` and MyPizza's heavy pizza filter. The interactive page is distinguished by its thumbnail attribute.
- Compact viewer closing retires the expanded frame, waits 250 ms, then recreates the smaller views sequentially.

Exact lifecycle scheduling:


```javascript
  function syncScreens() {
    const show=dialog.open||(!document.hidden&&!rotation.holds.has('offscreen')&&!rotation.holds.has('viewer-return'));
    const wanted=new Set();
    if(show){
      const modes=dialog.open?[state.mode]:MODES;
      modes.forEach(mode=>wanted.add(getScreen(registry.get(active),mode)));
    }
    const changed=[...screens.values()].some(s=>!!s.frame!==wanted.has(s));
    if(changed&&!dialog.open){
      // Keep the tour's position while its frames are released or re-created.
      if(rotation.started){rotation.keepView=true;rotation.resuming=true;}
      stopTour();rotation.started=false;
    }
    // Release first, then load: switching never temporarily doubles memory.
    screens.forEach(s=>{if(!wanted.has(s))releaseScreen(s);});
    if(compactPreview()){
      // Decode one document at a time to avoid three simultaneous GPU/image allocations.
      const waiting=[...wanted].some(s=>s.frame&&!s.ready&&!s.failed);
      if(!waiting){const next=[...wanted].find(s=>!s.frame);if(next)loadScreen(next);}
    }else wanted.forEach(s=>{if(!s.frame)loadScreen(s);});
    devices.forEach(d=>d.box.classList.toggle('is-live',!!screens.get(active+'/'+d.mode)?.ready));
  }
```

Exact geometry invalidation inside `prepareDocument()` (uses the surrounding function's `screen` and `doc`):


```javascript
    screen.pageSize?.disconnect();
    screen.tourGeometry={dirty:true,end:0,lastTop:null};
    const invalidate=()=>{screen.tourGeometry.dirty=true;};
    // Scroll extents change when content resizes, not on every camera frame.
    screen.pageSize=new ResizeObserver(invalidate);
    screen.pageSize.observe(doc.documentElement);
    if(doc.body)screen.pageSize.observe(doc.body);
    doc.addEventListener('load',invalidate,{capture:true,signal:screen.inside.signal});
    doc.fonts?.ready.then(()=>{if(screen.frame?.contentDocument===doc)invalidate();});
```

`releaseScreen()` must also abort listeners, disconnect the observer, cancel timers and remove the iframe. Saving the scroll position comes before removal.

## 6. Click-to-open previews and modal animation

Passive frames are inert, removed from tab navigation and inaccessible to pointer scrolling. A transparent device button is the interactive hit target. Parent-page touch scrolling remains available over a closed screen. Do not enable pointer events on the passive iframe to make the preview “clickable”; use the button that calls `open()`.

The viewer is a native `<dialog>` with a backdrop, toolbar, mode selector and close button. `open()` saves the parent scroll/hash/overflow, stops the tour, calls `showModal()`, activates the selected frame and restores its embedded scroll position.

| Interaction | Current timing |
|---|---:|
| Desktop device expands into viewer | 600 ms |
| Desktop viewer returns to visible device | 380 ms |
| Compact open/close fade | 150 ms |
| Device-mode switch, normal motion | 280 ms |
| Compact rebuild delay after close | 250 ms |

Desktop animation uses position/scale interpolation between source and destination rectangles. Compact opening/closing uses fading to avoid scaling large live iframe layers. Reduced-motion mode suppresses the major spatial movement, although short fades remain in the current implementation.

Exact desktop interpolation helper:


```javascript
  function animateFrom(screen,from,to,duration) {
    const scale=from.width/to.width;
    return screen.el.animate([
      {transformOrigin:'0 0',transform:`translate(${from.left-to.left}px,${from.top-to.top}px) scale(${scale})`},
      {transformOrigin:'0 0',transform:'none'}
    ],{duration,easing:EASE});
  }
```

Close through the controller, including Escape and backdrop clicks. `close()` captures iframe scroll before animation and delegates restoration to `cleanup()`. Avoid removing the dialog or iframe directly from another handler.

## 7. Scroll restoration and resuming the loop

There are two distinct positions:

1. The parent Lumina page: `state.saved` stores x/y, URL hash and previous overflow style.
2. Each embedded page: `screen.scroll` stores x/y before a frame is hidden, replaced or released.

Exact helpers:


```javascript
  function rememberScroll(screen) {
    // display:none browsing contexts report zero, not their last real position.
    if(!screen.ready||!screen.frame?.getClientRects().length)return;
    try{const win=screen.frame.contentWindow;screen.scroll={x:win.scrollX,y:win.scrollY};}catch{}
  }
  function restoreScroll(screen) {
    try{const win=screen.frame.contentWindow;if(win.scrollX!==screen.scroll.x||win.scrollY!==screen.scroll.y)win.scrollTo({left:screen.scroll.x,top:screen.scroll.y,behavior:'instant'});}catch{}
  }
```

On close, `cleanup()` restores overflow and parent x/y, restores the original hash using `history.replaceState()`, and focuses the opener with `preventScroll: true`. It restarts the tour with `keepView: true`.

Desktop restoration includes two animation-frame passes because native dialog focus restoration and scroll anchoring finish asynchronously. Compact restoration uses the 250 ms release/rebuild path. Sequence guards prevent a stale close callback affecting a newly opened viewer.

This is in-memory preservation for the current page session. It is not persistent scroll storage across a browser reload or a new visit.

A new project tour can deliberately reset its embedded landing page to the top. `resetPreview()` also handles imported navigation, open menus/lightboxes and the MyPizza filter-reset button. Do not confuse that intentional reset with returning the parent page to the top.

## 8. Pause conditions and public API

The tour pauses for an open viewer, manual pause, hidden document, offscreen preview regions and certain keyboard-focus conditions. `IntersectionObserver` observes the landing/projects areas at a 0.05 threshold. Reduced-motion preference initially disables automatic rotation.

The public API is available after the deferred scripts initialise. These are usage examples, not additional startup code:

```javascript
// Read the registry state.
console.log(window.LuminaPreview.projects);
console.log(window.LuminaPreview.active);

// Select a registered project.
window.LuminaPreview.select('vsi');

// Open an interactive device view, keeping a focus-return target.
window.LuminaPreview.open('vsi', 'mobile', document.activeElement);

// Switch an already-open viewer.
window.LuminaPreview.setMode('desktop');

// Close through the normal cleanup path.
window.LuminaPreview.close();

// Pause for your own temporary UI; release the SAME reason afterwards.
window.LuminaPreview.hold('custom-panel', true);
window.LuminaPreview.hold('custom-panel', false);

// Move to the next registered project when the viewer is closed.
window.LuminaPreview.next();
```

A hold is not a global resume command: removing your hold does not override other holds or the user's pause choice. The API also exposes `register()`, but initial registry configuration is preferable for a complete project setup.

`lumina:projectchange` synchronises editorial project tabs with the preview engine. Embedded pages can listen for `lumina:reset`; the controller dispatches it on the iframe window when resetting a tour.

## 9. Photographic monitor alignment and the foreground ball

The projects monitor is perspective-mapped to the existing 1672 × 941 scene. The controller computes `scale = scene.clientWidth / 1672`, then applies a calibrated `matrix3d()` to the embedded viewport. The screen footprint is 849 × 523 source pixels. `assets/images/projects-sphere.png` is a separate foreground layer that covers the screen correctly where the ball overlaps it.

Exact transform:


```javascript
  function sceneTransform(view,scale){
    const perspective=-26/523;
    return `matrix3d(${849*(1+perspective)*scale/view.width},${-17*scale/view.width},0,${perspective/view.width},0,${497*scale/view.height},0,0,0,0,1,0,0,${17*scale},0,1)`;
  }
```

The values are measured for the current photo, not universal constants. Replacing or cropping that photo requires recalibrating the CSS device anchor, matrix and foreground placement together. Changing only the iframe width can expose square corners or make the screen stop incorrectly beside the ball.

## 10. JTN curtain and demonstration cursor

The registry selects `presentation: 'jtn-doors'`. `createPresentation()` looks for `#home.hero`, `.door-wall` and `.door-roof` in the imported page; without those elements it returns no presentation.

| Time from start | Action |
|---|---|
| 350–1,450 ms | Two curtain halves slide away; 1,100 ms animation |
| 1,500 ms | Remove curtain elements |
| 1,600 ms | Add cursor and move toward wall area |
| 1,950 ms | Set `data-lumina-side="wall"` |
| 2,800 ms | Move cursor toward roof over 500 ms |
| 3,300 ms | Set `data-lumina-side="roof"` |
| 4,550 ms | Clear the side state and fade the cursor |
| 4,800 ms | Stop and remove demonstration nodes |

This is a visual demonstration using attributes and an SVG cursor; it does not move the user's real pointer or submit anything. In the interactive popup, `run({cursor:false})` shows only the curtain. User input inside the open viewer stops the presentation. `pause()`, `resume()` and `stop()` coordinate timers and Web Animations objects with the tour lifecycle.

## 11. Per-site adapters

- **Razor:** `previewParam: 'lumina-preview'`, `smoothTour: true` and `sites/razor/preview-fixes.css` support its embedded presentation. Keep the local preview image substitutions and imported-page animation adjustments. The `smoothTour` flag does not replace the shared scrolling loop with a separate engine.
- **VSI:** hides `.consent-bar` only in passive thumbnails. Its booking adapter intercepts the configured form and opens the live VSI page rather than submitting to a copied backend.
- **JTN:** curtain and cursor sequence described above.
- **MyPizza:** `resetSelector: '#reset-filters'` clears active filters for a fresh tour. Passive mode removes the expensive hero-pizza filter. No live URL is currently configured.

Any imported selectors that change during a site redesign must also be updated in the registry/adapters.

## 12. Business accordion and mobile navigation

The current business list uses `businessExamples()` in `interaction-variants.js`, not the simpler legacy `accordion()` helper. Only one item opens at a time. Hidden, inert measurement copies establish the combined summary height plus the tallest expanded answer, reserving space so the photographic section does not jump or acquire an internal scrollbar.

The open/close animation measures the current panel height before cancelling an unfinished animation. This allows rapid reversals without jumping. Reduced-motion mode settles immediately.

Exact expansion handler (excerpt from its closure; not standalone):


```javascript
      function expand(next){
        if(next===expanded&&!animation&&item.open===next)return;
        if(next)rows.forEach(row=>{if(row!==expand)row(false);});
        // Measure the current frame before cancelling so rapid reversals do not
        // jump. Keep native details open until its closing movement finishes.
        const from=item.open?panel.getBoundingClientRect().height:0;
        const opacity=item.open?getComputedStyle(panel).opacity:'0';
        animation?.cancel();animation=null;expanded=next;reflect();
        if(reducedMotion.matches){settle();return;}
        panel.style.height=from+'px';panel.style.opacity=opacity;item.open=true;
        const to=expanded?content.getBoundingClientRect().height:0;
        const distance=Math.abs(to-from);
        if(distance<1){settle();return;}
        const current=panel.animate([{height:from+'px',opacity},{height:to+'px',opacity:expanded?1:0}],{
          duration:340,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'
        });
        animation=current;current.onfinish=()=>{if(animation===current)settle();};
      }
```

The mobile navigation uses a separate native dialog at `max-width:900px`, with a right-aligned panel. Opening and closing are intentionally immediate: do not reintroduce the sliding animation removed after mobile glitches. It locks root overflow while open, restores focus without scrolling, and closes before navigating to a section hash.

## 13. Testing after changes

Use a local HTTP server or deployed HTTPS build. Check desktop and a real phone; a desktop browser at phone width is useful but cannot establish iPhone/Android memory stability.

- All four projects rotate; each reaches its footer and starts again.
- All three embedded sizes appear and scroll together after loading.
- Opening a moving phone preview enables interaction; closing restores the same parent position and resumes the loop.
- Closed previews do not consume wheel/touch scrolling intended for the parent page.
- Repeated open/close, project changes and device-mode changes do not accumulate live frames.
- Leaving the preview sections stops unnecessary work; returning resumes.
- JTN shows its opening curtain and both product-side demonstrations.
- VSI desktop retains the intended dolphin proportions.
- The projects screen remains correctly clipped behind the foreground ball.
- Business accordions open one at a time without a scrollbar or background jump.
- Mobile menu appears instantly; Escape/backdrop/section links close it correctly.
- Reduced-motion preference disables autoplay and avoids large spatial transitions.

Useful read-only console checks:

```javascript
// Current tour state.
document.body.dataset.previewTour;     // loading / intro / scrolling / footer
 document.body.dataset.previewRotation; // running / paused

// Current active project.
window.LuminaPreview.active;

// Preview iframe count (not every unrelated iframe on the page).
document.querySelectorAll('.lp-viewer iframe').length;
```

During compact loading the count changes progressively. In steady operation expect three scene frames, one viewer frame, or zero when released; lifecycle transitions need not all show three.

## 14. Troubleshooting

| Symptom | First checks |
|---|---|
| Static poster never becomes live | Local imported URL, failed asset paths, ready selector, same-origin access and load failure state |
| Mobile stalls while scrolling | Per-frame layout reads, CSS smooth scrolling, heavyweight embedded filters/animations, excessive live frames |
| Crash after closing viewer | Release-before-load ordering, compact fade, 250 ms return hold, stale callbacks and iframe observers |
| Parent page jumps to top | Saved parent x/y/hash, focus with `preventScroll`, all exits using `cleanup()` |
| Loop does not resume | User pause, document visibility, remaining named holds, focus hold or offscreen observer |
| Dolphins or layout look wrong | The iframe's actual viewport dimensions, not just its displayed CSS width |
| Square screen corner/ball overlap | Scene anchor, perspective matrix, clip path and foreground layer must match the same image |
| Old appearance after upload | Upload matching HTML/CSS/JS/assets together; check cache-version queries and the actual extracted/uploaded folder |

## 15. Reusing the implementation

The snippets above explain the current implementation; most are extracts that depend on enclosing state and helper functions. Do not paste them as independent replacements for the controller.

For reuse, copy the complete controller, stylesheet, registry and imported sites, then adapt the host-page markup and device anchors. The controller depends on the landing/project DOM, not merely on a single iframe tag. Keep the public API as the integration boundary. Preserve the lifecycle, scroll-restoration and geometry-cache safeguards while adjusting the visual presentation.

### Source fingerprint

SHA-256 of `assets/site-preview.js` when this guide was generated:


`24830df09e1da2cf50bb93e22fd9012a944cf23338127394c16f434ced1c8688`
