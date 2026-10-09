// Timetable viewer: the timetable image opens in a popup instead of a new tab. On computers it is a dimmed
// overlay (wheel or double-click to zoom, drag to move, Esc or a click outside to close).
// On phones it is full-screen: while the phone is held
// upright the picture is turned 90° so the wide table fills the tall screen; pinch to zoom, drag to pan,
// double-tap to toggle zoom. Where the browser allows it (Android) the screen is locked to landscape instead.
(() => {
  const links = document.querySelectorAll('.timetable-image-link');
  if (!links.length) return;
  const phone = window.matchMedia('(max-width: 800px), ((pointer: coarse) and (max-height: 520px))'); // phones upright, or held sideways
  const portrait = window.matchMedia('(orientation: portrait)');
  const dialog = document.createElement('dialog');
  dialog.className = 'timetable-viewer';
  dialog.innerHTML = '<button type="button" class="timetable-viewer-close" aria-label="Затворете графика">✕</button>'
    + '<div class="timetable-stage"><img alt="График на треньорите" decoding="async"></div>'
    + '<p class="timetable-hint"></p>';
  document.body.appendChild(dialog);
  const stage = dialog.querySelector('.timetable-stage');
  const image = dialog.querySelector('img');
  const closeButton = dialog.querySelector('.timetable-viewer-close');
  const hint = dialog.querySelector('.timetable-hint');
  let scale = 1, tx = 0, ty = 0, rotated = false;

  function apply() {
    image.style.transform = 'translate(' + tx + 'px,' + ty + 'px) rotate(' + (rotated ? 90 : 0) + 'deg) scale(' + scale + ')';
  }
  function layout() {
    if (!dialog.open) return;
    const popup = !phone.matches; // computers and tablets: overlay with room around the picture
    rotated = !popup && portrait.matches;
    dialog.classList.toggle('rotated', rotated);
    dialog.classList.toggle('popup', popup);
    hint.textContent = popup ? 'Завъртете колелцето или кликнете два пъти за увеличение · Esc за затваряне' : 'Приближете с два пръста · докоснете два пъти за увеличение';
    const vw = dialog.clientWidth || window.innerWidth, vh = dialog.clientHeight || window.innerHeight;
    const iw = image.naturalWidth || 1200, ih = image.naturalHeight || 720;
    // leave a strip for the hint text: along the bottom, or along the left edge when the picture is turned
    const availableWidth = (rotated ? vh : vw) - (popup ? 96 : 24), availableHeight = (rotated ? vw : vh) - (popup ? 128 : 64);
    const fit = Math.min(availableWidth / iw, availableHeight / ih);
    image.style.width = Math.round(iw * fit) + 'px';
    image.style.height = Math.round(ih * fit) + 'px';
    scale = 1; tx = 0; ty = 0; apply();
  }
  function clamp() {
    // keep the picture from being dragged completely out of view
    const limitX = (stage.clientWidth / 2) * Math.max(1, scale), limitY = (stage.clientHeight / 2) * Math.max(1, scale);
    tx = Math.max(-limitX, Math.min(limitX, tx)); ty = Math.max(-limitY, Math.min(limitY, ty));
  }

  // pinch / pan with pointer events
  const pointers = new Map();
  let gesture = null, lastTap = 0;
  const distance = (a, b) => Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  const centre = (a, b) => ({ x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 });
  const snapshot = () => ({ points: [...pointers.values()].map(p => ({ clientX: p.clientX, clientY: p.clientY })), scale, tx, ty });
  stage.addEventListener('pointerdown', event => {
    if (event.target === closeButton) return;
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, event);
    gesture = snapshot();
    event.preventDefault();
  });
  stage.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId) || !gesture) return;
    pointers.set(event.pointerId, event);
    const current = [...pointers.values()], start = gesture.points;
    if (current.length >= 2 && start.length >= 2) {
      const ratio = distance(current[0], current[1]) / Math.max(1, distance(start[0], start[1]));
      scale = Math.min(5, Math.max(1, gesture.scale * ratio));
      const c0 = centre(start[0], start[1]), c1 = centre(current[0], current[1]);
      tx = gesture.tx + (c1.x - c0.x); ty = gesture.ty + (c1.y - c0.y);
    } else if (current.length === 1 && start.length >= 1) {
      tx = gesture.tx + (current[0].clientX - start[0].clientX); ty = gesture.ty + (current[0].clientY - start[0].clientY);
    }
    clamp(); apply();
  });
  const release = event => {
    if (!pointers.has(event.pointerId)) return;
    const moved = gesture && gesture.points.length === 1 && Math.hypot(tx - gesture.tx, ty - gesture.ty) > 8;
    pointers.delete(event.pointerId);
    gesture = pointers.size ? snapshot() : null;
    if (event.type === 'pointerup' && !moved && !pointers.size) {
      const box = image.getBoundingClientRect();
      const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
      if (outside && dialog.classList.contains('popup')) { close(); return; }
      const now = Date.now();
      if (now - lastTap < 320) { scale = scale > 1 ? 1 : 2.5; if (scale === 1) { tx = 0; ty = 0; } apply(); lastTap = 0; }
      else lastTap = now;
    }
    if (!pointers.size && scale === 1) { tx = 0; ty = 0; apply(); }
  };
  stage.addEventListener('wheel', event => {
    event.preventDefault();
    scale = Math.min(5, Math.max(1, scale * (event.deltaY < 0 ? 1.2 : 1 / 1.2)));
    if (scale === 1) { tx = 0; ty = 0; }
    clamp(); apply();
  }, { passive: false });
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  function open(link) {
    image.src = link.href;
    image.alt = (link.querySelector('img') || image).alt;
    dialog.showModal();
    document.body.classList.add('timetable-open');
    layout();
    if (!phone.matches) return;
    // Android: real landscape lock is only granted in full-screen mode; iPhone rejects both, so we keep the rotated view.
    const fullscreen = dialog.requestFullscreen ? dialog.requestFullscreen() : Promise.reject();
    fullscreen.then(() => screen.orientation && screen.orientation.lock ? screen.orientation.lock('landscape') : null).catch(() => {});
  }
  function close() { if (dialog.open) dialog.close(); }
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button) return; // deliberate „open in new tab“ still works
    event.preventDefault();
    open(link);
  }));
  closeButton.addEventListener('click', close);
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('timetable-open');
    try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (e) { /* not locked */ }
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && dialog.open) layout(); });
  image.addEventListener('load', layout);
  portrait.addEventListener('change', layout);
  window.addEventListener('resize', layout);
})();
