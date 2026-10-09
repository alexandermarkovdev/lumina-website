(() => {
  'use strict';
  // The portfolio shows the registered sites (assets/projects.js) running live inside a browser-window card; clicking it opens a desktop / phone viewer.
  // This file builds the stage, tabs and caption; assets/site-preview.js loads, scrolls and opens the sites.
  const container = document.querySelector('#project-layout');
  const projects = window.LUMINA_PROJECTS || [];
  if (!container || !projects.length) return;
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';

  container.innerHTML = `<div class="gallery-layout"><div class="gallery-main">
      <div class="live-stage"></div>
      <div class="project-caption"><span><strong class="live-name"></strong><span class="live-kind"></span></span><a class="project-open-label live-link" target="_blank" rel="noopener noreferrer">Към истинския сайт ${arrow}</a></div>
      <p class="live-blurb"></p>
    </div>
    <div class="gallery-index">
      <div class="gallery-note">Натиснете сайта —<br>той е жив.<svg viewBox="0 0 100 90" aria-hidden="true"><path class="gallery-arrow-wide" d="M85 8C93 45 53 78 9 66m10-9L9 66l15 6"/><path class="gallery-arrow-stacked" d="M85 8C28 11 16 46 17 82m-9-11 9 11 11-10"/></svg></div>
      <div class="gallery-picks" role="group" aria-label="Избери проект">${projects.map(project => `<button type="button" class="gallery-pick" data-select="${project.id}" aria-pressed="false" aria-label="Покажи ${project.name}"><span class="gallery-pick-image"><img src="${project.modes.desktop.poster}" alt="" width="1440" height="900" loading="lazy" decoding="async"></span><span><strong>${project.name}</strong><span>${project.kind}</span></span>${arrow}</button>`).join('')}</div>
      <div class="live-controls"></div>
      <p>Сайтът се превърта сам. Натиснете го, за да го разгледате на цял екран — като на компютър или като на телефон.</p>
    </div></div>`;

  const stage = container.querySelector('.live-stage');
  const picks = [...container.querySelectorAll('[data-select]')];
  const name = container.querySelector('.live-name');
  const kind = container.querySelector('.live-kind');
  const blurb = container.querySelector('.live-blurb');
  const link = container.querySelector('.live-link');

  function show(id) {
    const project = projects.find(item => item.id === id);
    if (!project) return;
    stage.style.setProperty('--stage-paper', `var(--${project.paper || 'pale-blue'})`);
    picks.forEach(pick => pick.setAttribute('aria-pressed', String(pick.dataset.select === id)));
    name.textContent = project.name;
    kind.textContent = project.kind;
    blurb.textContent = project.blurb;
    link.hidden = !project.liveUrl;
    if (project.liveUrl) link.href = project.liveUrl;
  }
  // The engine announces every change, including its own automatic rotation.
  window.addEventListener('lumina:projectchange', event => show(event.detail.id));
  picks.forEach(pick => pick.addEventListener('click', () => window.LuminaPreview?.select(pick.dataset.select)));
  show(projects[0].id);
})();
