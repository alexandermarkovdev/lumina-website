(() => {
  'use strict';
  const section=document.querySelector('#portfolio'),container=section?.querySelector('#project-layout');
  const projects=window.LUMINA_PROJECTS||[],stories=window.LUMINA_STORIES||{};
  if(!container||!projects.length)return;
  const arrow='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19L19 5M5 5h14v14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const check='<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  container.innerHTML=`<div class="ps-layout"><div class="ps-main"><div class="live-stage"></div><div class="ps-caption"><div><h3 class="ps-name"></h3><p class="ps-kind"></p></div><a class="ps-open live-link" target="_blank" rel="noopener noreferrer">Отворете сайта ${arrow}</a></div><div class="ps-story"><div><h4>За бизнеса</h4><p class="ps-about"></p></div><div><h4>Какво направихме</h4><ul class="ps-features"></ul></div><div class="ps-highlight"><h4></h4><p></p></div></div></div><aside class="ps-index"><div class="ps-note">Това е истинският сайт.<br>Натиснете го.<svg viewBox="0 0 90 76" fill="none" aria-hidden="true"><path d="M80 6C90 40 60 63 9 56m11-10L8 56l14 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="ps-picks" role="group" aria-label="Изберете проект">${projects.map(p=>`<div class="ps-row" data-project="${p.id}" style="--pick-paper:var(--${p.paper})"><button class="ps-pick" type="button" data-select="${p.id}" aria-pressed="false" aria-label="Покажете ${p.name}"><img src="${p.modes.desktop.poster}" alt="" width="1440" height="900" loading="lazy"><span><strong>${p.name}</strong><span>${p.kind}</span></span></button><a class="ps-row-open" href="${p.liveUrl||p.url}" target="_blank" rel="noopener noreferrer" aria-label="Отворете ${p.name} в нов раздел">${arrow}</a></div>`).join('')}</div><div class="live-controls"></div></aside></div>`;
  // Service labels and the Google result illustration, filled per project from story.proof (supplied by the owner).
  container.querySelector('.ps-caption').insertAdjacentHTML('beforeend','<ul class="ps-deliverables" hidden></ul>');
  const deliverables=container.querySelector('.ps-deliverables');
  // A compact result illustration takes the existing story row for projects that have a proof.
  const storyRow=container.querySelector('.ps-story');
  storyRow.insertAdjacentHTML('afterend',`<div class="ps-google-proof" hidden>
    <div class="ps-google-search">
      <div class="ps-google-bar" role="img"><span class="ps-google-word">Google</span><span class="ps-google-query"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m12.5 12.5 4 4"/></svg><span class="ps-google-typed" aria-hidden="true"></span></span></div>
      <div class="ps-google-result"><span class="ps-google-rank" aria-label="Първо място">#1</span><a target="_blank" rel="noopener noreferrer"><strong></strong><span></span></a></div>
      <p class="ps-google-source">Визуализация · позиция по данни на Lumina.</p>
    </div>
    <div class="ps-google-note"><h4><span></span><svg viewBox="0 0 86 56" fill="none" aria-hidden="true"><path d="M80 7C76 45 37 55 7 32m3 16L6 31l17 3"/></svg></h4><p></p><a class="ps-google-link" target="_blank" rel="noopener noreferrer">Отвори търсенето ${arrow}</a></div>
  </div>`);
  const googleProof=container.querySelector('.ps-google-proof');
  // Projects with labels but no search proof get this block instead. Both sit in one cell (.ps-below),
  // so the preview above keeps the same size whichever project is chosen.
  const below=document.createElement('div');below.className='ps-below';
  googleProof.before(below);below.append(googleProof);
  below.insertAdjacentHTML('beforeend',`<div class="ps-google-proof ps-plain" hidden><div class="ps-plain-about"><h4>За бизнеса</h4><p></p></div><div class="ps-google-note"><h4><span></span><svg viewBox="0 0 86 56" fill="none" aria-hidden="true"><path d="M80 7C76 45 37 55 7 32m3 16L6 31l17 3"/></svg></h4><p></p></div></div>`);
  const plain=below.querySelector('.ps-plain');
  const googleBar=googleProof.querySelector('.ps-google-bar');
  const typedQuery=googleProof.querySelector('.ps-google-typed');
  const googleResult=googleProof.querySelector('.ps-google-result');
  const resultLink=googleResult.querySelector('a');
  const searchLink=googleProof.querySelector('.ps-google-link');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  // Projects whose first result has already been shown; from then on only the result line blinks between searches.
  const seen=new Set();
  let proof=null,proofId='',proofVisible=false,proofTimer,proofIndex=0,proofLooping=false,proofFresh=false;
  function setQuery(query,typed){
    typedQuery.textContent=typed;
    googleBar.setAttribute('aria-label',`Търсене в Google: ${query}`);
    searchLink.href=`https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
  // Stops the loop and leaves the current search fully typed with its result showing.
  function finishProof(){
    clearTimeout(proofTimer);proofLooping=false;
    if(!proof)return;
    const query=proof.queries[proofIndex];
    setQuery(query,query);
    googleProof.dataset.proofState='complete';
    googleResult.inert=false;
    seen.add(proofId);
  }
  // Types each search in turn, shows the result after every one, and starts over after the last.
  function playProof(){
    if(!proof||googleProof.hidden||!proofVisible||proofLooping||document.hidden)return;
    if(reducedMotion.matches){finishProof();return}
    proofLooping=true;
    const queries=proof.queries;
    let position=0;
    const interrupted=()=>googleProof.hidden||!proofVisible||document.hidden||reducedMotion.matches;
    function startQuery(){
      position=0;
      googleProof.dataset.proofState=seen.has(proofId)?'retyping':'typing';
      googleResult.inert=true;
      setQuery(queries[proofIndex],'');
      proofTimer=setTimeout(typeNext,220);
    }
    function typeNext(){
      if(interrupted()){finishProof();return}
      const query=queries[proofIndex];
      typedQuery.textContent=query.slice(0,++position);
      proofTimer=setTimeout(position<query.length?typeNext:showResult,position<query.length?90:280);
    }
    function showResult(){
      if(interrupted()){finishProof();return}
      seen.add(proofId);
      googleProof.dataset.proofState='shown';
      googleResult.inert=false;
      proofTimer=setTimeout(()=>{
        if(interrupted()){finishProof();return}
        proofIndex=(proofIndex+1)%queries.length;startQuery();
      },2600);
    }
    // Coming back to a search that is already on screen: hold it, then move to the next one.
    // A project that was just chosen types its first search from the start, even if it has played before.
    if(seen.has(proofId)&&!proofFresh)showResult();else startQuery();
    proofFresh=false;
  }
  function setProof(id,story,name){
    clearTimeout(proofTimer);proofLooping=false;
    proof=story.proof||null;proofId=id;proofIndex=0;
    const labels=proof?.deliverables||story.deliverables||null,on=Boolean(labels);
    storyRow.hidden=on;deliverables.hidden=!on;googleProof.hidden=!proof;plain.hidden=!on||Boolean(proof);
    container.querySelector('.ps-kind').hidden=on;section.classList.toggle('ps-has-deliverables',on);
    if(!on)return;
    deliverables.setAttribute('aria-label',`Какво направихме за ${proof?.label||name}`);
    deliverables.innerHTML=labels.map(item=>Array.isArray(item)?`<li class="ps-delivery-${item[1]}">${item[0]}</li>`:`<li>${item}</li>`).join('')+(proof?`<li class="ps-delivery-seo">${proof.ranked===false?'SEO оптимизация':'SEO оптимизация · <strong>№1 в Google</strong>'}</li>`:'');
    if(!proof){
      plain.querySelector('.ps-plain-about p').textContent=story.about;
      plain.querySelector('.ps-google-note h4 span').textContent=story.highlight;
      plain.querySelector('.ps-google-note p').textContent=story.highlightDetail;
      return;
    }
    googleProof.setAttribute('aria-label',`Видимост на ${proof.label} в Google`);
    resultLink.href=proof.url;resultLink.querySelector('strong').textContent=proof.title;resultLink.querySelector('span').textContent=proof.domain;
    googleProof.querySelector('.ps-google-note p').textContent=proof.note;
    // "ranked: false" keeps the searches but claims no position: no #1 badge, a different heading and source line.
    const ranked=proof.ranked!==false;
    googleProof.querySelector('.ps-google-rank').hidden=!ranked;
    googleProof.querySelector('.ps-google-note h4 span').textContent=ranked?'Първи в Google.':'Направен, за да го намират.';
    googleProof.querySelector('.ps-google-source').textContent=ranked?'Визуализация · позиция по данни на Lumina.':'Визуализация · примерни търсения.';
    if(reducedMotion.matches)finishProof();
    else{
      // Choosing a project always restarts its loop; one that has played before keeps its note showing meanwhile.
      proofFresh=true;
      googleProof.dataset.proofState=seen.has(id)?'retyping':'pending';
      setQuery(proof.queries[0],'');
      googleResult.inert=true;
    }
    playProof();
  }
  if('IntersectionObserver' in window){
    new IntersectionObserver(entries=>{
      proofVisible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.35;
      if(proofVisible)playProof();
      else if(proofLooping)finishProof();
    },{threshold:[0,.35]}).observe(googleProof);
  }else proofVisible=true;
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){if(proofLooping)finishProof()}
    else playProof();
  });
  reducedMotion.addEventListener?.('change',()=>{if(reducedMotion.matches)finishProof()});


  const stage=container.querySelector('.live-stage'),picks=[...container.querySelectorAll('[data-select]')];
  function show(id){
    const p=projects.find(p=>p.id===id),story=stories[id];if(!p||!story)return;
    setProof(id,story,p.name);
    section.style.setProperty('--story-paper',`var(--${p.paper})`);stage.style.setProperty('--stage-paper',`var(--${p.paper})`);
    picks.forEach(button=>{const active=button.dataset.select===id;button.setAttribute('aria-pressed',String(active));button.closest('.ps-row').dataset.selected=String(active)});
    container.querySelector('.ps-name').textContent=p.name;container.querySelector('.ps-kind').textContent=p.kind;
    const link=container.querySelector('.ps-open');link.href=p.liveUrl||p.url;link.setAttribute('aria-label',`Отворете ${p.name} в нов раздел`);
    container.querySelector('.ps-about').textContent=story.about;container.querySelector('.ps-features').innerHTML=story.features.map(f=>`<li>${check}<span>${f}</span></li>`).join('');
    container.querySelector('.ps-highlight h4').textContent=story.highlight;container.querySelector('.ps-highlight p').textContent=story.highlightDetail;
  }
  window.addEventListener('lumina:projectchange',event=>show(event.detail.id));
  picks.forEach(button=>button.addEventListener('click',()=>window.LuminaPreview?.select(button.dataset.select)));
  show(projects[0].id);
})();
