/* Approved Clear Callouts section. Events and DOM queries stay within #why-sites. */
(()=>{
const section=document.querySelector('#why-sites');
if(!section)return;
const byId=id=>section.querySelector('#'+CSS.escape(id));
'use strict';
const images={restaurant:'assets/clear-callouts/restaurant-ai.webp',salon:'assets/clear-callouts/salon-ai.webp',materials:'assets/clear-callouts/materials-ai.webp',qr:'assets/preview-menu-qr.svg'};
const paths={arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',chevron:'<path d="m9 5 7 7-7 7"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',check:'<path d="m5 12 4 4L19 6"/>',bag:'<path d="M5 7h14l1 14H4ZM9 8V6a3 3 0 0 1 6 0v2"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6"/>',truck:'<path d="M2 5h12v12H2Zm12 5h4l4 4v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',pin:'<path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',leaf:'<path d="M20 3c0 9-3 15-9 15a6 6 0 0 1-6-6C5 6 11 3 20 3ZM4 21 15 10"/>',box:'<path d="m12 2 9 5v10l-9 5-9-5V7Zm-9 5 9 5 9-5M12 12v10M7 4l10 5"/>'};
const icon=name=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]||paths.arrow}</svg>`;
const euro=value=>value.toLocaleString('bg-BG',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
const description={
restaurant:{kind:'Ресторант',title:'Сканират кода,<br>избират и поръчват.',copy:'Меню, цени и поръчки на едно място. От QR кода до любимата пица.',notes:[['qr','QR код<br>за меню'],['menu','Избор<br>по вкус'],['cart','Поръчки<br>за вкъщи']],try:'Добавете нещо вкусно в поръчката.'},
salon:{kind:'Фризьор',title:'Докато работите,<br>хората се записват.',copy:'Услугите и свободните часове са видими. Записването става без обаждания.',notes:[['service','Услуги<br>и цени'],['taken','Виждате<br>заетите<br>часове'],['booking','Запази<br>час']],try:'Изберете услуга, ден и час.'},
materials:{kind:'Магазин',title:'Целият ви склад —<br>на един екран.',copy:'Продукти, наличности и поръчки. Клиентите намират отговорите сами.',notes:[['specs','Детайли<br>за блока'],['cart','Поръчки<br>онлайн'],['faq','Чести<br>въпроси']],try:'Променете количеството и вижте цената.'}
};
const dishes={
pizza:[{id:'margherita',name:'Маргарита',desc:'Сан Марцано, фиор ди лате, пресен босилек',price:9.9,size:'32 см'},{id:'pepperoni',name:'Пеперони',desc:'Доматен сос, моцарела, пикантен салам',price:11.9,size:'32 см'},{id:'formaggi',name:'Четири сирена',desc:'Моцарела, горгонзола, пармезан, проволоне',price:12.9,size:'32 см'}],
salad:[{id:'caprese',name:'Капрезе',desc:'Зрели домати, прясна моцарела, песто',price:7.9,size:'300 г'},{id:'caesar',name:'Цезар',desc:'Романа, пиле, пармезан, хрупкави крутони',price:8.9,size:'350 г'},{id:'garden',name:'Зелена градина',desc:'Сезонни листа, авокадо, лимонов дресинг',price:7.5,size:'280 г'}],
drinks:[{id:'lemonade',name:'Домашна лимонада',desc:'Лимон, свежа мента и малко мед',price:3.9,size:'400 мл'},{id:'espresso',name:'Еспресо',desc:'Прясно смляно кафе, плътен вкус',price:2.2,size:'30 мл'},{id:'water',name:'Минерална вода',desc:'Натурална или газирана',price:2.5,size:'500 мл'}]
};
const dishIndex=Object.fromEntries(Object.values(dishes).flat().map(d=>[d.id,d]));
const services=[{name:'Подстригване и оформяне',short:'Подстригване',duration:45,price:27},{name:'Сешоар и стилизиране',short:'Сешоар',duration:30,price:18},{name:'Възстановяваща терапия',short:'Терапия',duration:60,price:42}];
const availability=[['09:00','10:00','11:30','13:00','14:00','16:00'],['09:30','11:00','12:00','14:00','16:00','17:00'],['09:00','10:30','11:30','13:00','15:30','16:30'],['09:00','10:00','11:00','13:00','14:30','16:00'],['09:00','10:00','11:30','12:30','16:30','17:30']];
const bookedTimes=[['11:30','16:00'],['12:00','17:00'],['11:30','16:30'],['11:00','16:00'],['11:30','17:30']];
const isTimeTaken=(day,time)=>bookedTimes[day].includes(time);
let food={category:'pizza',cart:{},open:false,completed:false};
let salon={service:0,day:2,time:'13:00',confirmed:false};
let materials={size:25,quantity:1,delivery:'delivery',open:false,completed:false};
function chrome(type){const title={restaurant:'Меню и поръчки',salon:'Запази час',materials:'Строителни материали'}[type];return `<div class="browser-bar"><i aria-hidden="true"></i><i aria-hidden="true"></i><i aria-hidden="true"></i><span>${title}</span></div>`}
function siteHeader(type){
 const brands={restaurant:{name:'Форно',category:'Пицария'},salon:{name:'Лиора',category:'Студио за коса'},materials:{name:'Терон',category:'Строителни материали'}};
 const brand=brands[type];
 return `<nav class="site-nav" aria-label="${brand.name} · ${brand.category}"><span class="site-wordmark">${brand.name}<em aria-hidden="true">.</em></span><span class="site-nav-caption">${brand.category}</span>${type==='restaurant'?`<button type="button" class="nav-cart" data-food-cart aria-label="Отвори кошницата">${icon('bag')}<span class="cart-badge" data-cart-count>0</span></button>`:''}</nav>`;
}
function notes(type){return description[type].notes.map(([key,text])=>`<div class="callout" data-target="${key}"><span>${text}</span></div>`).join('')+'<svg class="annotation-lines" aria-hidden="true"></svg>'}
function business(type,site){const d=description[type];return `<article class="business ${type}" data-business="${type}" aria-labelledby="${type}-title"><div class="business-intro"><span class="business-kind">${d.kind}</span><h3 id="${type}-title">${d.title}</h3><p>${d.copy}</p></div><div class="annotation-stage"><div class="paper-cut" aria-hidden="true"></div><div class="site-window ${type}-site" data-site="${type}">${chrome(type)}<div class="site-canvas">${site}</div></div>${notes(type)}</div><p class="try-note">${d.try}</p></article>`}
function restaurantSite(){return `${siteHeader('restaurant')}<div class="food-intro"><h3>Хубава пица.<em>Хубав ден.</em></h3><p>Бавно тесто.<br>Простички<br>съставки.</p></div><figure class="food-hero"><img src="${images.restaurant}" width="1536" height="1024" loading="lazy" decoding="async" alt="Прясна пица Маргарита с пухкав изпечен ръб, босилек и моцарела"><button type="button" class="qr-slip" data-food-qr data-point="qr" aria-label="Отвори менюто — илюстративен QR код"><img src="${images.qr}" width="57" height="57" alt="Илюстративен QR код"><span>Сканирай<br>за менюто</span></button></figure><div class="food-menu"><div class="menu-title"><h4>Какво ви се хапва?</h4></div><div class="menu-tabs" aria-label="Категории в менюто">${[['pizza','Пици'],['salad','Салати'],['drinks','Напитки']].map(([id,name],i)=>`<button type="button" data-category="${id}" aria-pressed="${i===0}">${name}</button>`).join('')}</div><div class="menu-items" data-point="menu" id="restaurant-menu"></div><button type="button" class="basket-bar" data-food-cart data-point="cart" disabled><span class="basket-label">${icon('bag')}<span data-basket-label>Добавете от менюто</span></span><span class="basket-total" data-basket-total>${euro(0)}</span></button><div class="order-panel" id="food-order" hidden></div><p class="site-status" id="food-live" role="status" aria-live="polite"></p></div><footer class="site-footer"><span class="footer-hours">${icon('clock')}11:00–23:00 · всеки ден</span><span>За вкъщи</span></footer>`}
function salonSite(){return `${siteHeader('salon')}<figure class="salon-hero"><img src="${images.salon}" width="1536" height="1024" loading="lazy" decoding="async" alt="Фризьор оформя естествени вълни в дълга кестенява коса"><figcaption>Салон за красота<em>Пловдив</em></figcaption></figure><div class="salon-note">${icon('leaf')}Лична грижа. Без бързане.</div><div class="booking-content"><div class="booking-heading"><h4>Запазете си време.</h4><span>Стилист Елена</span></div><div class="service-list" data-point="service" aria-label="Изберете услуга">${services.map((s,i)=>`<button type="button" class="service-choice" data-service="${i}" aria-pressed="${i===0}"><span class="radio-mark" aria-hidden="true"></span><span class="service-name">${s.name}<small>${s.duration} минути</small></span><span class="price">${euro(s.price)}</span></button>`).join('')}</div><div class="booking-calendar" data-point="slots"><div class="calendar-heading"><b>Изберете ден</b><small>Октомври 2026</small></div><div class="days" aria-label="Изберете ден за час">${['Пн','Вт','Ср','Чт','Пт'].map((x,i)=>`<button type="button" data-day="${i}" aria-pressed="${i===2}">${x}<b>${12+i}</b></button>`).join('')}</div><p class="time-label">Свободни часове</p><div class="times" aria-label="Изберете час"></div></div><div class="booking-total"><span data-booking-summary>Ср, 14 окт. · 13:00</span><b data-booking-price>${euro(27)}</b></div><button type="button" class="site-button" data-book data-point="booking"><span>Запази час</span>${icon('arrow')}</button><div class="booking-result" hidden></div></div><footer class="site-footer"><span>Потвърждение по SMS и имейл</span>${icon('check')}</footer>`}
function materialsSite(){return `${siteHeader('materials')}<div class="product-category">Зидария ${icon('chevron')} Керамични блокове</div><div class="product-heading"><h3>Керамичен<br>блок <span data-size-title>25</span><small>За вашия следващ проект.</small></h3><span class="stock-label">На склад</span></div><figure class="product-photo"><img src="${images.materials}" width="1536" height="1024" loading="lazy" decoding="async" alt="Теракотени кухи керамични строителни блокове върху бетонна основа"></figure><section class="product-specs" data-point="specs" aria-labelledby="product-details-title"><h4 id="product-details-title">Детайли за продукта</h4><div><span>Дебелина</span><b data-size-spec>25 см</b></div><div><span>Разфасовка</span><b>80 бр. / палет</b></div><div><span>Материал</span><b>Керамика</b></div></section><div class="purchase-content"><div class="product-options"><span>Изберете дебелина</span><div class="sizes" aria-label="Дебелина на блока"><button type="button" data-size="25" aria-pressed="true">25 см</button><button type="button" data-size="38" aria-pressed="false">38 см</button></div></div><div class="price-and-quantity" data-point="quantity"><p class="product-price"><span data-product-total>${euro(96)}</span><small><span data-unit-price>${euro(96)}</span> / палет</small></p><div class="quantity"><button type="button" data-quantity="-1" aria-label="Намали броя палети" disabled>${icon('minus')}</button><output aria-label="Брой палети">1</output><button type="button" data-quantity="1" aria-label="Увеличи броя палети">${icon('plus')}</button></div></div><div class="fulfilment" aria-label="Начин на получаване"><button type="button" data-delivery="delivery" aria-pressed="true">${icon('truck')}До обекта</button><button type="button" data-delivery="pickup" aria-pressed="false">${icon('pin')}От склада</button></div><button type="button" class="site-button" data-product-cart data-point="cart"><span>Добави в поръчката</span>${icon('bag')}</button><p class="delivery-detail">Доставката се уточнява според адреса и количеството.</p><div class="product-order" hidden></div><div class="product-faq" data-point="faq">${[['Как става доставката?','След заявката уточняваме адреса, количеството и удобно време за разтоварване.'],['Мога ли да взема само един палет?','Да. Можете да поръчате от един палет — 80 броя.'],['Мога ли да взема от склада?','Изберете „От склада“ преди добавяне в поръчката. Вземането се уточнява след заявката.']].map(([q,a])=>`<details><summary>${q}${icon('plus')}</summary><p>${a}</p></details>`).join('')}</div><p class="site-status" id="materials-live" role="status" aria-live="polite"></p></div><footer class="site-footer"><span class="footer-hours">${icon('clock')}Пн–Пт · 08:00–18:00</span>${icon('box')}</footer>`}
function renderAll(){byId('examples').innerHTML=business('restaurant',restaurantSite())+business('salon',salonSite())+business('materials',materialsSite());renderMenu();updateFood();updateSalon();updateMaterials();observeStages();section.querySelectorAll('.site-window img').forEach(img=>{if(!img.complete)img.addEventListener('load',scheduleArrows,{once:true})});document.fonts.ready.then(scheduleArrows)}
function renderMenu(){section.querySelector('.menu-items').innerHTML=dishes[food.category].map(d=>`<div class="menu-item"><div><h5>${d.name}</h5><p>${d.desc}</p><div class="menu-item-meta"><span class="price">${euro(d.price)}</span><span>· ${d.size}</span></div></div><button type="button" class="add-dish" data-add="${d.id}" aria-label="Добави ${d.name} в поръчката">${icon('plus')}</button></div>`).join('');section.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.category===food.category));scheduleArrows()}
function foodTotals(){return Object.entries(food.cart).reduce((a,[id,q])=>({count:a.count+q,total:a.total+dishIndex[id].price*q}),{count:0,total:0})}
function updateFood(message=''){const totals=foodTotals();section.querySelector('[data-cart-count]').textContent=totals.count;section.querySelector('[data-basket-label]').textContent=totals.count?`Виж поръчката (${totals.count})`:'Добавете от менюто';section.querySelector('[data-basket-total]').textContent=euro(totals.total);section.querySelector('.basket-bar').disabled=!totals.count;const panel=section.querySelector('#food-order');panel.hidden=!food.open||!totals.count;if(food.open&&totals.count){panel.innerHTML=`<h4>${food.completed?'Готово за поръчка.':'Вашата поръчка.'}</h4>${Object.entries(food.cart).map(([id,q])=>`<div class="order-line"><span class="line-name">${dishIndex[id].name}</span><div class="mini-quantity"><button type="button" data-adjust="${id}" data-change="-1" aria-label="Намали ${dishIndex[id].name}">${icon('minus')}</button><span>${q}</span><button type="button" data-adjust="${id}" data-change="1" aria-label="Добави още ${dishIndex[id].name}">${icon('plus')}</button></div><b class="price">${euro(dishIndex[id].price*q)}</b></div>`).join('')}<p class="order-summary"><span>Общо · за вземане</span><span>${euro(totals.total)}</span></p>${food.completed?'<p class="site-status" role="status">Това е примерен преглед. Поръчката не е изпратена.</p>':`<button type="button" class="site-button" data-food-checkout><span>Прегледай поръчката</span>${icon('arrow')}</button>`}`};if(message)section.querySelector('#food-live').textContent=message;scheduleArrows()}
function salonDate(){return ['Пн','Вт','Ср','Чт','Пт'][salon.day]+', '+(12+salon.day)+' окт. · '+salon.time}
function updateSalon(){const root=section.querySelector('[data-site="salon"]');root.querySelectorAll('[data-service]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.service===salon.service));root.querySelectorAll('[data-day]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.day===salon.day));if(isTimeTaken(salon.day,salon.time))salon.time=availability[salon.day].find(t=>!isTimeTaken(salon.day,t));root.querySelector('.times').innerHTML=availability[salon.day].map(t=>{const taken=isTimeTaken(salon.day,t);return `<button type="button" data-time="${t}" aria-pressed="${!taken&&t===salon.time}" aria-label="${t} — ${taken?'зает час':'свободен час'}" ${taken?'disabled data-point="taken"':''}><span>${t}</span>${taken?'<small>зает</small>':''}</button>`}).join('');root.querySelector('[data-booking-summary]').textContent=salonDate();root.querySelector('[data-booking-price]').textContent=euro(services[salon.service].price);const result=root.querySelector('.booking-result');result.hidden=!salon.confirmed;root.querySelector('[data-book]').querySelector('span').textContent=salon.confirmed?'Промени часа':'Запази час';if(salon.confirmed)result.innerHTML=`${icon('check')}<h4>Вашето време е избрано.</h4><p><b>${services[salon.service].name}</b><br>${salonDate()}<br>Стилист Елена · ${services[salon.service].duration} мин.<br><b>${euro(services[salon.service].price)}</b></p><p class="small-note" role="status">Демонстрация: не е направена реална резервация и не е изпратено съобщение.</p><button type="button" data-change-booking>Избери друг час</button>`;scheduleArrows()}
function materialUnitPrice(){return materials.size===25?96:128}
function updateMaterials(message=''){const root=section.querySelector('[data-site="materials"]');root.querySelectorAll('[data-size]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.size===materials.size));root.querySelector('[data-size-title]').textContent=materials.size;root.querySelector('[data-size-spec]').textContent=materials.size+' см';root.querySelector('[data-product-total]').textContent=euro(materialUnitPrice()*materials.quantity);root.querySelector('[data-unit-price]').textContent=euro(materialUnitPrice());root.querySelector('output').value=materials.quantity;root.querySelector('output').textContent=materials.quantity;root.querySelector('[data-quantity="-1"]').disabled=materials.quantity===1;root.querySelector('[data-quantity="1"]').disabled=materials.quantity>=50;root.querySelectorAll('[data-delivery]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.delivery===materials.delivery));root.querySelector('.delivery-detail').textContent=materials.delivery==='delivery'?'Доставката се уточнява според адреса и количеството.':'Вземане от склада след уточнение на ден и час.';const order=root.querySelector('.product-order');order.hidden=!materials.open;if(materials.open)order.innerHTML=`<h4>Вашата заявка</h4><p class="order-summary"><span>Керамичен блок ${materials.size}<br>${materials.quantity} палет${materials.quantity===1?'':'а'} · ${materials.quantity*80} броя</span><span>${euro(materialUnitPrice()*materials.quantity)}</span></p><p class="site-status">${materials.delivery==='delivery'?'Доставка до обекта — уточнява се отделно.':'Вземане от склада.'}</p>${materials.completed?'<p class="site-status" role="status">Заявката е подготвена като пример. Не е изпратена към магазин.</p>':`<button type="button" class="site-button secondary" data-product-confirm><span>Прегледай заявката</span>${icon('arrow')}</button>`}`;if(message)root.querySelector('#materials-live').textContent=message;scheduleArrows()}
let frame=0,arrowId=0;const stageObserver=new ResizeObserver(scheduleArrows);
function scheduleArrows(){cancelAnimationFrame(frame);frame=requestAnimationFrame(drawArrows)}
function observeStages(){stageObserver.disconnect();section.querySelectorAll('.annotation-stage').forEach(stage=>stageObserver.observe(stage))}
function drawArrows(){
 section.querySelectorAll('.annotation-stage').forEach(stage=>{
  const bounds=stage.getBoundingClientRect();if(!bounds.width||!bounds.height)return;
  const type=stage.closest('[data-business]').dataset.business;
  const offsets={restaurant:[-62,39,-46],salon:[-66,-47,24],materials:[-64,-52,45]}[type];
  const targetFor=label=>stage.querySelector(label.dataset.target==='menu'?'.menu-tabs':label.dataset.target==='slots'?'.days':`[data-point="${label.dataset.target}"]`);
  const labels=[...stage.querySelectorAll('.callout')];
  const points=labels.map((label,i)=>{
   const target=targetFor(label).getBoundingClientRect();
   const ey=target.top-bounds.top+target.height*.52;
   return {label,ex:target.right-bounds.left+3,ey,top:Math.max(36,Math.min(ey+offsets[i]-label.offsetHeight/2,bounds.height-label.offsetHeight-18))};
  });
  for(let i=1;i<points.length;i++)points[i].top=Math.max(points[i].top,points[i-1].top+points[i-1].label.offsetHeight+29);
  for(let i=points.length-1;i>=0;i--){const next=i<points.length-1?points[i+1].top-29:bounds.height-18;points[i].top=Math.min(points[i].top,next-points[i].label.offsetHeight);points[i].label.style.top=points[i].top+'px'}
  const svg=stage.querySelector('.annotation-lines'),id='arrowhead-'+(++arrowId);
  svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
  let markup=`<defs><marker id="${id}" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 8 4.5 1 8"/></marker></defs>`;
  points.forEach(({label,ex,ey},i)=>{
   const l=label.getBoundingClientRect(),left=l.left-bounds.left,top=l.top-bounds.top,bottom=l.bottom-bounds.top;
   let sx,sy,d;
   // Give the shop and salon callouts distinct, feature-specific routes.
   if(type==='materials'&&label.dataset.target==='cart'){
    sx=left+Math.min(23,l.width*.35);sy=bottom+5;
    d=`M ${sx} ${sy} C ${sx-2} ${sy+27}, ${ex+32} ${ey-6}, ${ex} ${ey}`;
   }else if(type==='materials'&&label.dataset.target==='faq'){
    sx=left-5;sy=top+l.height*.6;
    d=`M ${sx} ${sy} C ${sx-23} ${sy+11}, ${ex+5} ${sy-3}, ${ex+17} ${ey+22} Q ${ex+25} ${ey+9}, ${ex} ${ey}`;
   }else if(type==='salon'&&label.dataset.target==='taken'){
    sx=left+Math.min(36,l.width*.55);sy=bottom+5;
    d=`M ${sx} ${sy} C ${sx-12} ${sy+17}, ${ex+25} ${ey-11}, ${ex} ${ey}`;
   }else if(type==='salon'&&label.dataset.target==='booking'){
    sx=left+14;sy=bottom+5;
    d=`M ${sx} ${sy} C ${ex+4} ${sy+8}, ${Math.min(ex+28,left-8)} ${ey+8}, ${ex} ${ey}`;
   }else if(bottom<ey-8){
    sx=left+Math.min(23,l.width*.35);sy=bottom+5;
    d=i===0?`M ${sx} ${sy} C ${sx+12} ${sy+24}, ${ex+29} ${ey-13}, ${ex} ${ey}`:`M ${sx} ${sy} C ${sx-17} ${sy+7}, ${ex+30} ${ey-31}, ${ex+17} ${ey-18} Q ${ex+5} ${ey-7}, ${ex} ${ey}`;
   }else if(top>ey+5){
    sx=left+19;sy=top-6;
    d=`M ${sx} ${sy} C ${sx+6} ${sy-31}, ${ex+29} ${ey+4}, ${ex} ${ey}`;
   }else{
    sx=left-4;sy=top+l.height*.35;
    d=`M ${sx} ${sy} C ${sx-19} ${sy-35}, ${ex+8} ${ey-39}, ${ex+14} ${ey-20} Q ${ex+21} ${ey-2}, ${ex} ${ey}`;
   }
   markup+=`<path d="${d}" marker-end="url(#${id})"/>`;
  });
  svg.innerHTML=markup;
 });
}
function expand(type){section.classList.add('is-focused');section.querySelectorAll('.business').forEach(el=>el.classList.toggle('expanded',el.dataset.business===type));const back=section.querySelector('#back-to-all');back.hidden=false;back.focus({preventScroll:true});section.querySelector('#main').scrollIntoView({block:'start',behavior:'instant'});scheduleArrows()}
function collapse(){const opened=section.querySelector('.business.expanded')?.dataset.business;section.classList.remove('is-focused');section.querySelectorAll('.business').forEach(el=>el.classList.remove('expanded'));section.querySelector('#back-to-all').hidden=true;if(opened)section.querySelector(`[data-expand="${opened}"]`).focus({preventScroll:true});scheduleArrows()}
section.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;if(b.id==='notes-toggle'){const show=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',show);section.classList.toggle('hide-notes',!show);return}if(b.id==='reset'){food={category:'pizza',cart:{},open:false,completed:false};salon={service:0,day:2,time:'13:00',confirmed:false};materials={size:25,quantity:1,delivery:'delivery',open:false,completed:false};section.classList.remove('is-focused');section.querySelector('#back-to-all').hidden=true;renderAll();return}if(b.id==='back-to-all'){collapse();return}if(b.dataset.expand){expand(b.dataset.expand);return}
if(b.hasAttribute('data-food-qr')){const menu=section.querySelector('#restaurant-menu');menu.classList.add('target-flash');section.querySelector('[data-category="'+food.category+'"]').focus({preventScroll:true});menu.scrollIntoView({block:'nearest'});setTimeout(()=>menu.classList.remove('target-flash'),1800);section.querySelector('#food-live').textContent='Менюто е отворено. Изберете категория и добавете към поръчката.';return}
if(b.dataset.category){food.category=b.dataset.category;renderMenu();return}
if(b.dataset.add){food.cart[b.dataset.add]=Math.min(20,(food.cart[b.dataset.add]||0)+1);food.completed=false;updateFood(dishIndex[b.dataset.add].name+' е добавена в кошницата.');return}
if(b.dataset.adjust){const id=b.dataset.adjust,delta=+b.dataset.change;food.cart[id]=Math.max(0,Math.min(20,food.cart[id]+delta));if(!food.cart[id])delete food.cart[id];food.completed=false;updateFood('Примерната поръчка е обновена.');const next=section.querySelector(`[data-adjust="${id}"][data-change="${delta}"]`)||section.querySelector('.basket-bar');next.focus({preventScroll:true});return}
if(b.hasAttribute('data-food-cart')){if(!foodTotals().count){section.querySelector('#food-live').textContent='Добавете ястие от менюто, за да започнете.';return}food.open=!food.open;updateFood();b.setAttribute('aria-expanded',food.open);return}
if(b.hasAttribute('data-food-checkout')){food.completed=true;updateFood('Примерната поръчка е готова за преглед. Нищо не е изпратено.');section.querySelector('#food-order').setAttribute('tabindex','-1');section.querySelector('#food-order').focus({preventScroll:true});return}
if(b.dataset.service!==undefined){salon.service=+b.dataset.service;salon.confirmed=false;updateSalon();return}
if(b.dataset.day!==undefined){salon.day=+b.dataset.day;salon.time=availability[salon.day].find(t=>!isTimeTaken(salon.day,t));salon.confirmed=false;updateSalon();return}
if(b.dataset.time){if(b.disabled||isTimeTaken(salon.day,b.dataset.time))return;salon.time=b.dataset.time;salon.confirmed=false;updateSalon();section.querySelector(`[data-time="${salon.time}"]`).focus({preventScroll:true});return}
if(b.hasAttribute('data-book')){salon.confirmed=!salon.confirmed;updateSalon();return}
if(b.hasAttribute('data-change-booking')){salon.confirmed=false;updateSalon();section.querySelector('[data-day][aria-pressed="true"]').focus({preventScroll:true});return}
if(b.dataset.size){materials.size=+b.dataset.size;materials.completed=false;updateMaterials();return}
if(b.dataset.quantity){materials.quantity=Math.max(1,Math.min(50,materials.quantity+Number(b.dataset.quantity)));materials.completed=false;updateMaterials();return}
if(b.dataset.delivery){materials.delivery=b.dataset.delivery;materials.completed=false;updateMaterials();return}
if(b.hasAttribute('data-product-cart')){materials.open=true;materials.completed=false;updateMaterials('Продуктът е добавен в кошницата.');return}
if(b.hasAttribute('data-product-confirm')){materials.completed=true;updateMaterials('Примерната заявка е готова. Не е изпратена към магазин.');const order=section.querySelector('.product-order');order.setAttribute('tabindex','-1');order.focus({preventScroll:true});return}
});
section.addEventListener('toggle',event=>{if(event.target.matches('details'))scheduleArrows()},true);
window.addEventListener('resize',scheduleArrows);
section.addEventListener('keydown',event=>{if(event.key==='Escape'&&section.classList.contains('is-focused'))collapse()});
renderAll();

// Keep the demo interactions inside the fixed, compact showcase.
section.classList.add('compact');
// The three reasons beside the heading are written in index.html (.reasons-note); nothing to rebuild here.
section.querySelector('.page-footer').innerHTML='<p></p><span class="hand">Пробвайте сами.</span>';
section.querySelector('.product-heading h3').innerHTML='Керамичен блок <span data-size-title>25</span><small>За вашия следващ проект.</small>';
const mobileTabs=section.querySelector('.mobile-tabs')||document.createElement('nav');
mobileTabs.className='mobile-tabs';mobileTabs.setAttribute('aria-label','Изберете пример');
mobileTabs.innerHTML=Object.entries(description).map(([type,d],i)=>`<button type="button" data-mobile-business="${type}" aria-pressed="${i===0}">${d.kind}</button>`).join('');
section.querySelector('.example-grid').before(mobileTabs);
section.querySelector('[data-business="restaurant"]').classList.add('mobile-active');
// Phones and tablets show one example at a time. A handwritten hint above the tabs and a button under the example lead to the other two.
const mobileHint=section.querySelector('.mobile-hint')||document.createElement('p');
mobileHint.className='mobile-hint';mobileHint.innerHTML='<span>Три примера. Натиснете и вижте.</span><svg viewBox="0 0 44 40" fill="none" aria-hidden="true"><path d="M5 5c15 1 25 9 27 27m-9-8 9 10 8-12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
mobileTabs.before(mobileHint);
const mobileNext=section.querySelector('.mobile-next')||document.createElement('button');
mobileNext.type='button';mobileNext.className='mobile-next';
section.querySelector('.example-grid').after(mobileNext);
function showMobile(type){const types=Object.keys(description),next=types[(types.indexOf(type)+1)%types.length];
 section.querySelectorAll('[data-mobile-business]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.mobileBusiness===type));
 section.querySelectorAll('.business').forEach(x=>x.classList.toggle('mobile-active',x.dataset.business===type));
 mobileNext.dataset.mobileNext=next;
 mobileNext.innerHTML=`<span class="mobile-next-label"><span>Следващ пример:</span> <b>${description[next].kind}</b></span><svg viewBox="0 0 32 24" fill="none" aria-hidden="true"><path d="M2 12h27M19 3l10 9-10 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
 scheduleArrows()}
showMobile('restaurant');
const compactTimers=new WeakMap();
function compactNotice(root,text){let status=root.querySelector('.site-status');if(!status){status=document.createElement('p');status.className='site-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');root.querySelector('.site-canvas').append(status)}clearTimeout(compactTimers.get(status));status.textContent=text;compactTimers.set(status,setTimeout(()=>status.textContent='',3500))}
section.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;
 if(b.dataset.mobileBusiness){showMobile(b.dataset.mobileBusiness);return}
 if(b.dataset.mobileNext){showMobile(b.dataset.mobileNext);mobileHint.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});return}
 if(b.hasAttribute('data-food-cart')){event.stopImmediatePropagation();const t=foodTotals();compactNotice(b.closest('[data-site]'),t.count?`В кошницата: ${t.count} артикула · ${euro(t.total)}.`:'Добавете нещо от менюто.');return}
 if(b.hasAttribute('data-book')){event.stopImmediatePropagation();salon.confirmed=false;updateSalon();compactNotice(b.closest('[data-site]'),`Избран час: ${salonDate()}.`);return}
 if(b.hasAttribute('data-product-cart')){event.stopImmediatePropagation();compactNotice(b.closest('[data-site]'),`Избрано количество: ${materials.quantity} палет${materials.quantity===1?'':'а'} · ${euro(materialUnitPrice()*materials.quantity)}.`);return}
 if(b.dataset.add||b.hasAttribute('data-food-qr')){setTimeout(()=>{const status=section.querySelector('#food-live');if(status.textContent)compactNotice(b.closest('[data-site]'),status.textContent)},0)}
},true);
scheduleArrows();

})();
