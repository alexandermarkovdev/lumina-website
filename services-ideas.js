(() => {
  'use strict';
  const stage = document.querySelector('#services-ideas-stage');
  if (!stage) return;
  const services = [
    {id:'design',name:'Дизайн',icon:'service-idea',color:'yellow',title:'Визия с вашия характер.',description:'Подреждаме историята, услугите и силните ви страни в дизайн, който хората разбират още от първия поглед.',items:['Цветове и шрифтове за вашия бранд','Ясно меню и подредба на съдържанието','Визия за телефон и компютър'],benefit:'Клиентите разбират кои сте и какво предлагате.',short:'Да ви забележат.'},
    {id:'development',name:'Изработка на сайт',icon:'service-build',color:'pink',title:'Красивият дизайн оживява.',description:'Превръщаме визията в удобен сайт. Всеки бутон, страница и форма има ясна задача — да улесни вашите клиенти.',items:['Адаптация за различни екрани','Форми за контакт и запитвания','Меню, каталог или записвания според бизнеса'],benefit:'От първия интерес до следващото действие.',short:'Да действат лесно.'},
    {id:'domain',name:'Домейн',icon:'service-domain',color:'pale-blue',title:'Вашето място има адрес.',description:'Помагаме да изберете лесно за запомняне име и свързваме адреса с новия ви сайт. Имате домейн? Работим с него.',items:['Избор на подходящо име','Регистрация на нов домейн','Свързване на нов или съществуващ адрес'],benefit:'Един ясен адрес за визитките, профилите и клиентите ви.',short:'Да ви запомнят.'},
    {id:'hosting',name:'Хостинг',icon:'service-host',color:'blue',title:'Добра основа за всеки ден.',description:'Осигуряваме мястото, където живее сайтът, и поемаме техническите настройки, за да се занимавате с бизнеса си.',items:['Настройка и публикуване на сайта','Защитена връзка за посетителите','Проследяване на работата на сайта'],benefit:'Техническата част има кой да я поеме.',short:'Да ви намират онлайн.'},
    {id:'seo',name:'SEO',icon:'growth',color:'yellow',title:'По-лесно откриваем бизнес.',description:'Подреждаме съдържанието и страниците така, че хората и търсачките да разбират какво предлагате.',items:['Ясна структура на страниците','Подходящи заглавия и описания','Подготовка на сайта за търсачките'],benefit:'Стабилна основа за присъствието ви в Google.',short:'Да ви откриват.'},
    {id:'marketing',name:'Маркетинг',icon:'service-market',color:'pink',title:'Сайтът стига до хората.',description:'Свързваме сайта с вашето представяне онлайн. Ясното послание води правилната аудитория към следващата стъпка.',items:['Послания за вашата аудитория','Страници за кампании и предложения','Проследяване на запитванията'],benefit:'Вниманието има посока — към вашия бизнес.',short:'Да изберат вас.'}
  ];
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#${name}"/></svg>`;
  const arrow = icon('arrow-e');
  const handArrow = '<svg viewBox="0 0 100 70" aria-hidden="true"><path d="M8 9c48-12 63 13 77 48M72 49l13 8 4-16"/></svg>';
  const list = service => `<ul class="si-includes">${service.items.map(item=>`<li>${item}</li>`).join('')}</ul>`;
  const art = service => `<span class="si-art si-${service.color}">${icon(service.icon)}</span>`;
  const number = index => String(index+1).padStart(2,'0');
  const heading = (title,text) => `<header class="si-heading draw-swipe"><h2 id="services-title">${title}</h2><p>${text}</p></header>`;
  const care = () => `<div class="si-care-bridge" aria-hidden="true"><span>Пускаме сайта.<br>Оставаме до вас.</span>${handArrow}</div><aside class="si-care" id="support" tabindex="-1" aria-labelledby="si-care-title"><div class="si-care-lead">${icon('gear')}<div><h3 id="si-care-title">Поддръжка.<br>Грижата продължава.</h3><p>Бизнесът се развива. Сайтът — с него.</p></div></div><ul><li>Обновявания и сигурност</li><li>Промени по текстове и снимки</li><li>Съдействие при въпроси</li></ul><a href="#contact">Да поговорим за вашия сайт ${arrow}</a></aside>`;

  const outcomes = ['Разпознаваема визия','Удобно преживяване','Вашият адрес онлайн','Сайт, готов за работа','Основа за откриваемост','Посока към нови клиенти'];
  stage.dataset.servicesVariant = '2';
  stage.innerHTML = heading('Какво правим?<br><span>Всичко!</span>','Всяка услуга решава конкретна задача. Вижте какво включваме и как то помага на бизнеса ви.')
    + '<div class="sr-journey sr-benefit-journey"><i class="sr-spine-fill" aria-hidden="true"></i>'
    + '<ol class="sr-benefit-grid" role="list">'
    + services.map((service,index) => '<li id="' + service.id + '" tabindex="-1"><header class="si-' + service.color + '"><span class="sr-number">' + number(index) + '</span>' + icon(service.icon) + '<h3>' + service.name + '</h3></header><div class="sr-benefit-copy"><h4>' + outcomes[index] + '.</h4><p>' + service.benefit + '</p>' + list(service) + '</div></li>').join('')
    + '</ol></div>' + care();

  // The central line fills as the section scrolls past; each step lights up when the ink reaches it.
  const journey = stage.querySelector('.sr-benefit-journey');
  const items = [...journey.querySelectorAll('.sr-benefit-grid > li')];
  const fill = journey.querySelector('.sr-spine-fill');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let spineFrame = 0;
  function updateSpine() {
    const bounds = journey.getBoundingClientRect();
    const progress = reducedMotion.matches ? 1 : Math.min(1, Math.max(0, (innerHeight * .6 - bounds.top) / bounds.height));
    fill.style.height = progress * bounds.height + 'px';
    items.forEach(item => item.classList.toggle('is-on', item.offsetTop + 30 <= progress * bounds.height));
  }
  function scheduleSpine() {
    cancelAnimationFrame(spineFrame);
    spineFrame = requestAnimationFrame(updateSpine);
  }
  window.addEventListener('scroll', scheduleSpine, {passive:true});
  window.addEventListener('resize', scheduleSpine);
  document.fonts.ready.then(scheduleSpine);
  updateSpine();
})();
