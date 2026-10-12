// BG | EN switch in the header. Bulgarian is the source language: every script keeps writing Bulgarian,
// and this file swaps the visible text (and labels such as aria-label and placeholder) for English while
// EN is chosen. Text that is not in the dictionary stays Bulgarian, so new copy needs an entry here.
// Left in Bulgarian on purpose: the four client sites, the Google searches and their result titles.
(() => {
  'use strict';
  const T = {
    // Page, header, menu
    'Lumina — Сайт за вашия бизнес, изцяло от нас': 'Lumina — A website for your business, all made by us',
    'Lumina — уеб дизайн, разработка, SEO и поддръжка. Уебсайтове за по-силно присъствие.': 'Lumina — web design, development, SEO and maintenance. Websites for a stronger presence.',
    'Към съдържанието': 'Skip to content',
    'Lumina — начало': 'Lumina — home',
    'Основна навигация': 'Main navigation',
    'Разгънато меню': 'Expanded menu',
    'Отвори менюто': 'Open the menu',
    'Затвори менюто': 'Close the menu',
    'Начало': 'Home',
    'Защо ви е сайт?': 'Why a website?',
    'Нашите услуги': 'Our services',
    'Портфолио': 'Portfolio',
    'Контакт': 'Contact',
    'Безплатно демо': 'Free demo',
    'Добрите идеи заслужават добри сайтове.': 'Good ideas deserve good websites.',

    // Hero
    'Сайт за вашия': 'A website for',
    'бизнес, изцяло': 'your business,',
    'от нас.': 'all made by us.',
    'ПРОФЕСИОНАЛНИ': 'PROFESSIONAL',
    'САЙТОВЕ': 'WEBSITES',
    'ОТ ИДЕЯ ДО ПУСКАНЕ': 'FROM IDEA TO LAUNCH',
    'Правим сайта ви от първата идея до пускането — и оставаме след това. Домейн, хостинг и SEO са наша грижа.': 'We build your website from the first idea to launch — and we stay afterwards. Domain, hosting and SEO are our job.',
    'Заяви безплатно демо': 'Request a free demo',
    'Заяви': 'Request',
    'безплатно': 'a free',
    'демо': 'demo',
    'Примерен уебсайт SOLA за интериорен дизайн, показан на компютър и телефон. Безплатно демо до 24 часа.': 'Sample SOLA interior design website shown on a computer and a phone. Free demo within 24 hours.',
    'Студиото': 'Studio',
    'Проекти': 'Projects',
    'ИНТЕРИОРИ С ХАРАКТЕР': 'INTERIORS WITH CHARACTER',
    'Място': 'A place',
    'за хубавите': 'for the good',
    'моменти.': 'moments.',
    'Място за': 'A place for',
    'хубавите': 'the good',
    'Място за хубавите моменти.': 'A place for the good moments.',
    'Естествени материали.': 'Natural materials.',
    'Обмислени детайли.': 'Considered details.',
    'Пространство за вас.': 'Space for you.',
    'Нашите проекти': 'Our projects',
    'Създадено с внимание.': 'Made with care.',
    'Клиентите': 'Clients are',
    'ви търсят.': 'looking for you.',
    'Нека ви': 'Let them',
    'намерят.': 'find you.',
    'Безплатно': 'Free',
    'демо до': 'demo within',
    '24 часа': '24 hours',
    'Идеите': 'Ideas',
    'оживяват': 'come to life',
    'онлайн': 'online',
    'до 24 часа.': 'within 24 hours.',

    // Service strip
    'Уебсайтове,': 'Websites',
    'които работят.': 'that work.',
    'Сайтове, които ви намират': 'Websites that find you',
    'нови клиенти.': 'new clients.',
    'Вижте проектите': 'See the projects',
    'Дизайн &': 'Design &',
    'Разработка': 'Development',
    'Персонализирани, бързи уебсайтове за вашите цели.': 'Custom, fast websites built for your goals.',
    'Научете повече': 'Learn more',
    'Растеж': 'Growth',
    'Повече видимост, повече трафик, повече резултати.': 'More visibility, more traffic, more results.',
    'Хостинг &': 'Hosting &',
    'Домейни': 'Domains',
    'Бързо, сигурно и напълно управлявано.': 'Fast, secure and fully managed.',
    'Поддръжка': 'Maintenance',
    'Поддържаме сайта ви защитен, актуален и работещ гладко.': 'We keep your website secure, up to date and running smoothly.',
    'Надолу: защо ви е сайт': 'Down: why you need a website',
    'Лаптоп, чаша кафе и зелено растение върху розово бюро': 'A laptop, a cup of coffee and a green plant on a pink desk',

    // Why a website
    'Вижте сами.': 'See for yourself.',
    'Клиентите ви търсят в Google и там виждат и конкурентите ви. Сайтът ви дава място до тях и причина да изберат вас: показва какво предлагате, с цени и снимки, и работи и когато сте затворени. Хората разглеждат менюто, запазват час или поръчват, без да ви звънят. А подреденият сайт показва, че зад него стои сериозен бизнес, на който може да се вярва.': 'Your clients search on Google, and there they see your competitors too. A website puts you beside them and gives people a reason to choose you: it shows what you offer, with prices and photos, and it works even when you are closed. People browse the menu, book a slot or order without calling you. And a tidy site shows there is a serious business behind it, one they can trust.',
    'Повече хора ви намират': 'More people find you',
    'Работи вместо вас': 'It works for you',
    'Вдъхва доверие': 'It builds trust',
    'Струва малко, а ви носи много.': 'It costs little and brings you a lot.',
    'Повече хора ви намират.': 'More people find you.',
    'В Google и Google Maps.': 'On Google and Google Maps.',
    'Работи вместо вас.': 'It works for you.',
    'Меню, поръчки и записване онлайн.': 'Menu, orders and booking online.',
    'Вдъхва доверие.': 'It builds trust.',
    'Бизнесът ви изглежда завършен.': 'Your business looks complete.',
    'Пробвайте сами.': 'Try it yourself.',
    'Изберете пример': 'Choose an example',
    'Ресторант': 'Restaurant',
    'Фризьор': 'Hairdresser',
    'Магазин': 'Shop',

    // Example restaurant
    'Сканират кода,': 'They scan the code,',
    'избират и поръчват.': 'choose and order.',
    'Меню, цени и поръчки на едно място. От QR кода до любимата пица.': 'Menu, prices and orders in one place. From the QR code to their favourite pizza.',
    'Форно': 'Forno',
    'Пицария': 'Pizzeria',
    'Форно · Пицария': 'Forno · Pizzeria',
    'Отвори кошницата': 'Open the basket',
    'Меню и поръчки': 'Menu and orders',
    'Хубава пица.': 'Good pizza.',
    'Хубав ден.': 'Good day.',
    'Бавно тесто.': 'Slow dough.',
    'Простички': 'Simple',
    'съставки.': 'ingredients.',
    'Сканирай': 'Scan',
    'за менюто': 'for the menu',
    'Отвори менюто — илюстративен QR код': 'Open the menu — illustrative QR code',
    'Илюстративен QR код': 'Illustrative QR code',
    'Прясна пица Маргарита с пухкав изпечен ръб, босилек и моцарела': 'Fresh Margherita pizza with a puffy baked crust, basil and mozzarella',
    'Какво ви се хапва?': 'What do you feel like eating?',
    'Категории в менюто': 'Menu categories',
    'Пици': 'Pizzas',
    'Салати': 'Salads',
    'Напитки': 'Drinks',
    'Маргарита': 'Margherita',
    'Сан Марцано, фиор ди лате, пресен босилек': 'San Marzano, fior di latte, fresh basil',
    'Пеперони': 'Pepperoni',
    'Доматен сос, моцарела, пикантен салам': 'Tomato sauce, mozzarella, spicy salami',
    'Четири сирена': 'Four cheeses',
    'Моцарела, горгонзола, пармезан, проволоне': 'Mozzarella, gorgonzola, parmesan, provolone',
    'Капрезе': 'Caprese',
    'Зрели домати, прясна моцарела, песто': 'Ripe tomatoes, fresh mozzarella, pesto',
    'Цезар': 'Caesar',
    'Романа, пиле, пармезан, хрупкави крутони': 'Romaine, chicken, parmesan, crunchy croutons',
    'Зелена градина': 'Green garden',
    'Сезонни листа, авокадо, лимонов дресинг': 'Seasonal leaves, avocado, lemon dressing',
    'Домашна лимонада': 'Homemade lemonade',
    'Лимон, свежа мента и малко мед': 'Lemon, fresh mint and a little honey',
    'Еспресо': 'Espresso',
    'Прясно смляно кафе, плътен вкус': 'Freshly ground coffee, full flavour',
    'Минерална вода': 'Mineral water',
    'Натурална или газирана': 'Still or sparkling',
    'Добавете от менюто': 'Add from the menu',
    'Добавете нещо вкусно в поръчката.': 'Add something tasty to the order.',
    'Добавете нещо от менюто.': 'Add something from the menu.',
    'Менюто е отворено. Изберете категория и добавете към поръчката.': 'The menu is open. Choose a category and add to the order.',
    'Добавете ястие от менюто, за да започнете.': 'Add a dish from the menu to begin.',
    'Готово за поръчка.': 'Ready to order.',
    'Вашата поръчка.': 'Your order.',
    'Общо · за вземане': 'Total · for collection',
    'Това е примерен преглед. Поръчката не е изпратена.': 'This is a sample preview. The order was not sent.',
    'Прегледай поръчката': 'Review the order',
    'Примерната поръчка е обновена.': 'The sample order was updated.',
    'Примерната поръчка е готова за преглед. Нищо не е изпратено.': 'The sample order is ready to review. Nothing was sent.',
    '11:00–23:00 · всеки ден': '11:00–23:00 · every day',
    'За вкъщи': 'Takeaway',
    'QR код': 'QR code',
    'за меню': 'menu',
    'Избор': 'Choice',
    'по вкус': 'to taste',
    'Поръчки': 'Orders',
    'за вкъщи': 'to go',

    // Example salon
    'Докато работите,': 'While you work,',
    'хората се записват.': 'people book.',
    'Услугите и свободните часове са видими. Записването става без обаждания.': 'Services and free slots are visible. Booking happens without phone calls.',
    'Лиора': 'Liora',
    'Студио за коса': 'Hair studio',
    'Лиора · Студио за коса': 'Liora · Hair studio',
    'Запази час': 'Book a slot',
    'Промени часа': 'Change the slot',
    'Салон за красота': 'Beauty salon',
    'Пловдив': 'Plovdiv',
    'Лична грижа. Без бързане.': 'Personal care. No rush.',
    'Фризьор оформя естествени вълни в дълга кестенява коса': 'A hairdresser styling natural waves in long chestnut hair',
    'Запазете си време.': 'Book your time.',
    'Стилист Елена': 'Stylist Elena',
    'Изберете услуга': 'Choose a service',
    'Подстригване и оформяне': 'Cut and styling',
    'Сешоар и стилизиране': 'Blow-dry and styling',
    'Възстановяваща терапия': 'Restoring treatment',
    'Подстригване': 'Cut',
    'Сешоар': 'Blow-dry',
    'Терапия': 'Treatment',
    'Изберете ден': 'Choose a day',
    'Изберете ден за час': 'Choose a day',
    'Изберете час': 'Choose a time',
    'Октомври 2026': 'October 2026',
    'Пн': 'Mon', 'Вт': 'Tue', 'Ср': 'Wed', 'Чт': 'Thu', 'Пт': 'Fri',
    'Свободни часове': 'Free slots',
    'зает': 'taken',
    'Изберете услуга, ден и час.': 'Choose a service, day and time.',
    'Вашето време е избрано.': 'Your time is chosen.',
    'Демонстрация: не е направена реална резервация и не е изпратено съобщение.': 'Demonstration: no real booking was made and no message was sent.',
    'Избери друг час': 'Choose another slot',
    'Потвърждение по SMS и имейл': 'Confirmation by SMS and email',
    'Услуги': 'Services',
    'и цени': 'and prices',
    'Виждате': 'You see',
    'заетите': 'the taken',
    'часове': 'slots',
    'Запази': 'Book',
    'час': 'a slot',

    // Example shop
    'Целият ви склад —': 'Your whole warehouse —',
    'на един екран.': 'on one screen.',
    'Продукти, наличности и поръчки. Клиентите намират отговорите сами.': 'Products, stock and orders. Clients find the answers themselves.',
    'Терон': 'Teron',
    'Строителни материали': 'Building materials',
    'Терон · Строителни материали': 'Teron · Building materials',
    'Зидария': 'Masonry',
    'Керамични блокове': 'Ceramic blocks',
    'Керамичен блок': 'Ceramic block',
    'Керамичен': 'Ceramic',
    'блок': 'block',
    'За вашия следващ проект.': 'For your next project.',
    'На склад': 'In stock',
    'Теракотени кухи керамични строителни блокове върху бетонна основа': 'Terracotta hollow ceramic building blocks on a concrete base',
    'Детайли за продукта': 'Product details',
    'Дебелина': 'Thickness',
    'Дебелина на блока': 'Block thickness',
    'Разфасовка': 'Packaging',
    '80 бр. / палет': '80 pcs / pallet',
    'Материал': 'Material',
    'Керамика': 'Ceramic',
    'Изберете дебелина': 'Choose thickness',
    '/ палет': '/ pallet',
    'Намали броя палети': 'Fewer pallets',
    'Брой палети': 'Number of pallets',
    'Увеличи броя палети': 'More pallets',
    'Начин на получаване': 'How to receive it',
    'До обекта': 'To the site',
    'От склада': 'From the warehouse',
    'Добави в поръчката': 'Add to order',
    'Доставката се уточнява според адреса и количеството.': 'Delivery is arranged according to the address and quantity.',
    'Вземане от склада след уточнение на ден и час.': 'Collection from the warehouse once a day and time are agreed.',
    'Как става доставката?': 'How does delivery work?',
    'След заявката уточняваме адреса, количеството и удобно време за разтоварване.': 'After your request we confirm the address, the quantity and a convenient time for unloading.',
    'Мога ли да взема само един палет?': 'Can I take just one pallet?',
    'Да. Можете да поръчате от един палет — 80 броя.': 'Yes. You can order from one pallet — 80 pieces.',
    'Мога ли да взема от склада?': 'Can I collect from the warehouse?',
    'Изберете „От склада“ преди добавяне в поръчката. Вземането се уточнява след заявката.': 'Choose “From the warehouse” before adding to the order. Collection is arranged after the request.',
    'Променете количеството и вижте цената.': 'Change the quantity and see the price.',
    'Вашата заявка': 'Your request',
    'Доставка до обекта — уточнява се отделно.': 'Delivery to the site — arranged separately.',
    'Вземане от склада.': 'Collection from the warehouse.',
    'Заявката е подготвена като пример. Не е изпратена към магазин.': 'The request was prepared as an example. It was not sent to a shop.',
    'Прегледай заявката': 'Review the request',
    'Продуктът е добавен в кошницата.': 'The product was added to the basket.',
    'Примерната заявка е готова. Не е изпратена към магазин.': 'The sample request is ready. It was not sent to a shop.',
    'Пн–Пт · 08:00–18:00': 'Mon–Fri · 08:00–18:00',
    'Детайли': 'Details',
    'за блока': 'of the block',
    'Чести': 'Common',
    'въпроси': 'questions',

    // Services
    'Какво правим?': 'What do we do?',
    'Всичко!': 'Everything!',
    'Всяка услуга решава конкретна задача. Вижте какво включваме и как то помага на бизнеса ви.': 'Each service solves a specific task. See what we include and how it helps your business.',
    'Дизайн': 'Design',
    'Разпознаваема визия.': 'A recognisable look.',
    'Разпознаваема визия': 'A recognisable look',
    'Клиентите разбират кои сте и какво предлагате.': 'Clients understand who you are and what you offer.',
    'Цветове и шрифтове за вашия бранд': 'Colours and fonts for your brand',
    'Ясно меню и подредба на съдържанието': 'A clear menu and content layout',
    'Визия за телефон и компютър': 'A look for phone and computer',
    'Изработка на сайт': 'Website development',
    'Удобно преживяване.': 'A comfortable experience.',
    'Удобно преживяване': 'A comfortable experience',
    'От първия интерес до следващото действие.': 'From first interest to the next action.',
    'Адаптация за различни екрани': 'Adapted for different screens',
    'Форми за контакт и запитвания': 'Contact and enquiry forms',
    'Меню, каталог или записвания според бизнеса': 'Menu, catalogue or bookings, depending on the business',
    'Домейн': 'Domain',
    'Вашият адрес онлайн.': 'Your address online.',
    'Вашият адрес онлайн': 'Your address online',
    'Един ясен адрес за визитките, профилите и клиентите ви.': 'One clear address for your business cards, profiles and clients.',
    'Избор на подходящо име': 'Choosing a suitable name',
    'Регистрация на нов домейн': 'Registering a new domain',
    'Свързване на нов или съществуващ адрес': 'Connecting a new or existing address',
    'Хостинг': 'Hosting',
    'Сайт, готов за работа.': 'A website ready for work.',
    'Сайт, готов за работа': 'A website ready for work',
    'Техническата част има кой да я поеме.': 'Someone takes care of the technical side.',
    'Настройка и публикуване на сайта': 'Setting up and publishing the website',
    'Защитена връзка за посетителите': 'A secure connection for visitors',
    'Проследяване на работата на сайта': 'Monitoring how the website runs',
    'Основа за откриваемост.': 'A foundation for being found.',
    'Основа за откриваемост': 'A foundation for being found',
    'Стабилна основа за присъствието ви в Google.': 'A solid foundation for your presence on Google.',
    'Ясна структура на страниците': 'A clear page structure',
    'Подходящи заглавия и описания': 'Suitable titles and descriptions',
    'Подготовка на сайта за търсачките': 'Preparing the website for search engines',
    'Маркетинг': 'Marketing',
    'Посока към нови клиенти.': 'A path to new clients.',
    'Посока към нови клиенти': 'A path to new clients',
    'Вниманието има посока — към вашия бизнес.': 'Attention has a direction — towards your business.',
    'Послания за вашата аудитория': 'Messages for your audience',
    'Страници за кампании и предложения': 'Pages for campaigns and offers',
    'Проследяване на запитванията': 'Tracking enquiries',
    'След пускането': 'After launch',
    'оставаме до вас.': 'we stay by your side.',
    'Поддръжка.': 'Maintenance.',
    'Грижата продължава.': 'The care continues.',
    'Сайтът ви остава обновен и защитен, а съдържанието му — винаги актуално.': 'Your website stays updated and secure, and its content is always current.',
    'Обновявания и сигурност': 'Updates and security',
    'Промени по текстове и снимки': 'Changes to text and photos',
    'Съдействие при въпроси': 'Help with questions',
    'Да поговорим за вашия сайт': "Let's talk about your website",
    'Имате чуждестранни клиенти?': 'Have foreign clients?',
    'Правим сайта и на английски.': 'We make the site in English too.',
    'Преводачите ни говорят свободно английски и български. Без машинен превод и без изкуствен интелект. Не вярвате? Обадете ни се и ще поговорим на езика, който изберете.': 'Our translators speak fluent English and Bulgarian. No machine or AI translation. Don’t believe us? Call us and let’s chat in the language of your choosing.',
    'Визия с вашия характер.': 'A look with your character.',
    'Подреждаме историята, услугите и силните ви страни в дизайн, който хората разбират още от първия поглед.': 'We arrange your story, services and strengths into a design people understand at first glance.',
    'Да ви забележат.': 'So you get noticed.',
    'Красивият дизайн оживява.': 'Beautiful design comes to life.',
    'Превръщаме визията в удобен сайт. Всеки бутон, страница и форма има ясна задача — да улесни вашите клиенти.': 'We turn the design into a convenient website. Every button, page and form has a clear job — to make things easier for your clients.',
    'Да действат лесно.': 'So they can act easily.',
    'Вашето място има адрес.': 'Your place has an address.',
    'Помагаме да изберете лесно за запомняне име и свързваме адреса с новия ви сайт. Имате домейн? Работим с него.': 'We help you choose an easy-to-remember name and connect the address to your new website. Already have a domain? We work with it.',
    'Да ви запомнят.': 'So you are remembered.',
    'Добра основа за всеки ден.': 'A good foundation for every day.',
    'Осигуряваме мястото, където живее сайтът, и поемаме техническите настройки, за да се занимавате с бизнеса си.': 'We provide the place where the website lives and handle the technical setup, so you can get on with your business.',
    'Да ви намират онлайн.': 'So you are found online.',
    'По-лесно откриваем бизнес.': 'A business that is easier to find.',
    'Подреждаме съдържанието и страниците така, че хората и търсачките да разбират какво предлагате.': 'We arrange the content and pages so that people and search engines understand what you offer.',
    'Да ви откриват.': 'So you get discovered.',
    'Сайтът стига до хората.': 'The website reaches people.',
    'Свързваме сайта с вашето представяне онлайн. Ясното послание води правилната аудитория към следващата стъпка.': 'We connect the website with your online presence. A clear message leads the right audience to the next step.',
    'Да изберат вас.': 'So they choose you.',

    // Portfolio
    'Нашите': 'Our',
    'клиенти.': 'clients.',
    'Всеки от тези сайтове е направен по мярка за бизнеса си.': 'Each of these websites is tailor-made for its business.',
    'Това е истинският сайт.': 'This is the real website.',
    'Натиснете го.': 'Click it.',
    'Изберете проект': 'Choose a project',
    'Отворете сайта': 'Open the website',
    'Плувен комплекс': 'Swimming complex',
    'Мъжки фризьорски салон': "Men's hair salon",
    'Покриви и фасадни панели': 'Roofs and facade panels',
    'График': 'Schedule',
    'Цени': 'Prices',
    'Чести въпроси': 'FAQ',
    'Онлайн записване': 'Online booking',
    'Имейл потвърждения': 'Email confirmations',
    'Галерия': 'Gallery',
    'Новини': 'News',
    'Услуги и цени': 'Services and prices',
    'Работно време': 'Opening hours',
    'Контакти': 'Contacts',
    'Преглед на заетите часове': 'Booked hours view',
    'Директно обаждане': 'Direct call',
    'SEO оптимизация ·': 'SEO optimisation ·',
    '№1 в Google': '#1 on Google',
    'Първо място': 'First place',
    'Първи в Google.': 'First on Google.',
    'Направен, за да го намират.': 'Built to be found.',
    'SEO оптимизация': 'SEO optimisation',
    'Визуализация · примерни търсения.': 'Illustration · example searches.',
    'Сайтът е подготвен за търсения като „керемиди Пазарджик“ и „термопанели Пловдив“.': 'The site is prepared for searches like “керемиди Пазарджик” and “термопанели Пловдив”.',
    'Сайтът е подготвен за търсения като „пица Пещера“ и „доставка на храна Пещера“.': 'The site is prepared for searches like “пица Пещера” and “доставка на храна Пещера”.',
    'Визуализация · позиция по данни на Lumina.': "Illustration · ranking according to Lumina's data.",
    'Когато търсят плуване, плувни уроци или плуване за деца в Пловдив, намират ВСИ.': 'When people search for swimming, swimming lessons or swimming for children in Plovdiv, they find VSI.',
    'Когато търсят бръснар, мъжки фризьор или бръснарница в Стамболийски, намират Razor.': "When people search for a barber, a men's hairdresser or a barbershop in Stamboliyski, they find Razor.",
    'Отвори търсенето': 'Open the search',
    'За бизнеса': 'About the business',
    'Какво направихме': 'What we did',
    'Плувен комплекс с тренировки за деца и възрастни.': 'A swimming complex with training for children and adults.',
    'График на тренировките': 'Training schedule',
    'Треньори и цени': 'Coaches and prices',
    'Удобен на телефон': 'Easy to use on a phone',
    'VSI Swimming при търсене на „плуване Пловдив“.': 'VSI Swimming for the search “плуване Пловдив”.',
    'Мъжки салон в Стамболийски с ясна визия и лично отношение.': "A men's salon in Stamboliyski with a clear look and a personal touch.",
    'Едно натискане до салона.': 'One tap to reach the salon.',
    'Бутонът за обаждане е още на първия екран.': 'The call button is right on the first screen.',
    'Покривни системи и фасадни панели за дома и бизнеса.': 'Roofing systems and facade panels for homes and businesses.',
    'Продуктов каталог': 'Product catalogue',
    'Галерия с обекти': 'Gallery of completed projects',
    'Запитване за оферта': 'Quote request',
    'Снимки и видео': 'Photos and video',
    'Карта и упътване': 'Map and directions',
    'От продукта до офертата.': 'From product to quote.',
    'Каталогът и контактите водят клиента към следващата стъпка.': 'The catalogue and contacts lead the client to the next step.',
    'Пицария с меню, което се разглежда удобно отвсякъде.': 'A pizzeria with a menu that is easy to browse from anywhere.',
    'Меню по категории': 'Menu by category',
    'Търсене и филтри': 'Search and filters',
    'Мобилна версия': 'Mobile version',
    'Онлайн поръчки с доставка': 'Online delivery orders',
    'Меню в джоба.': 'A menu in your pocket.',
    'Категории и филтри, удобни и на малък екран.': 'Categories and filters that work well on a small screen too.',
    'Смяна на проектите': 'Project switching',
    'Предишен проект': 'Previous project',
    'Следващ проект': 'Next project',
    'Спри превъртането на сайта': 'Stop the website scrolling',
    'Пусни превъртането на сайта': 'Start the website scrolling',
    'Спри автоматичната смяна': 'Stop automatic switching',
    'Пусни автоматичната смяна': 'Start automatic switching',
    'ВСИ': 'VSI',

    // Site viewer
    'Затвори прегледа': 'Close the preview',
    'Изглед на сайта': 'Website view',
    'Компютър': 'Computer',
    'Телефон': 'Phone',
    'Таблет': 'Tablet',
    'Автоматично превъртане': 'Automatic scrolling',
    'Пусни отначало': 'Play from the start',
    'Спри превъртането': 'Stop scrolling',
    'Пусни превъртането': 'Start scrolling',
    'Зареждане на сайта…': 'Loading the website…',
    'Сайтът не се зареди. Опитайте отново или го отворете отделно.': 'The website did not load. Try again or open it separately.',
    'Отвори сайта': 'Open the website',
    'Опитай отново': 'Try again',
    'Натиснете екран за преглед': 'Click a screen to preview',
    'Това е преглед на сайта. За актуални свободни часове и записване отворете сайта на ВСИ.': 'This is a preview of the website. For current free slots and booking, open the VSI website.',
    'Запази час в сайта на ВСИ': 'Book a slot on the VSI website',

    // Contact
    'Всичко започва': 'It all starts',
    'с една идея.': 'with one idea.',
    'Разкажете ни за бизнеса си. Ще създадем безплатно демо на вашия сайт до 24 часа след заявката.': 'Tell us about your business. We will create a free demo of your website within 24 hours of your request.',
    'До 24 часа': 'Within 24 hours',
    'безплатно демо': 'free demo',
    'Първи дизайн,': 'A first design,',
    'с идея за вашия бизнес.': 'with an idea for your business.',
    'Вие давате идеята,': 'You bring the idea,',
    'а ние правим първия дизайн.': 'and we make the first design.',
    'до 24 ч.': 'in 24 h',
    'Заявка за безплатно демо': 'Free demo request',
    'До: Lumina Studio': 'To: Lumina Studio',
    'Здравейте, Lumina.': 'Hello, Lumina.',
    'Имам бизнес и искам да го видя онлайн.': 'I have a business and I want to see it online.',
    'Вашето име': 'Your name',
    'Как да се обръщаме към вас?': 'What should we call you?',
    'Вашият бизнес': 'Your business',
    'Име или сфера на дейност': 'Name or line of business',
    'Имейл или телефон': 'Email or phone',
    'Как да се свържем с вас?': 'How can we reach you?',
    'Какъв сайт си представяте?': 'What kind of website do you have in mind?',
    'по желание': 'optional',
    'Какво предлагате и как сайтът да ви помогне?': 'What do you offer, and how should the website help you?',
    'Моля, попълнете това поле.': 'Please fill in this field.',
    'Въведете валиден имейл или телефон.': 'Enter a valid email or phone number.',
    'Или направо:': 'Or directly:',
    'Това е преглед на формата. Заявката не е изпратена.': 'This is a preview of the form. The request was not sent.',

    // Footer and cookie notice
    'ВСИЧКО Е ПОЕТО ОТ НАС.': 'WE TAKE CARE OF EVERYTHING.',
    'Вие се фокусирате върху бизнеса си.': 'You focus on your business.',
    'Ние се грижим за сайта, SEO, хостинга, домейна, маркетинга и поддръжката.': 'We take care of the website, SEO, hosting, domain, marketing and maintenance.',
    'Бисквитки': 'Cookies',
    'Приемам': 'Accept',
    'Отказвам': 'Decline',
    'Използваме бисквитки за правилната работа на сайта и за анонимна статистика на посещенията (Google Analytics). Може да промените избора си по всяко време от „Бисквитки“ в долния край на страницата.': 'We use cookies for the website to work properly and for anonymous visit statistics (Google Analytics). You can change your choice at any time from “Cookies” at the bottom of the page.',

    // Extra panels (studio, journal, SOLA concept)
    'Обратно към началото': 'Back to top',
    'Вие движите бизнеса.': 'You run the business.',
    'Ние — сайта.': 'We run the website.',
    'Lumina е уеб дизайн студио. Събираме стратегия, дизайн, разработка и грижа за сайта в един цялостен процес. За да имате повече време за това, което правите най-добре.': 'Lumina is a web design studio. We bring strategy, design, development and website care together in one complete process, so you have more time for what you do best.',
    'Как можем да помогнем': 'How we can help',
    'Идеи за по-добро': 'Ideas for a better',
    'онлайн присъствие.': 'online presence.',
    'Какво прави един сайт полезен?': 'What makes a website useful?',
    'Ясно послание, лесна навигация и разбираема следваща стъпка. Посетителят трябва бързо да разбере какво предлагате и как да се свърже с вас.': 'A clear message, easy navigation and an obvious next step. A visitor should quickly understand what you offer and how to contact you.',
    'Защо да мислим първо за телефона?': 'Why think about the phone first?',
    'На малък екран всяко решение се усеща. Четим текст, удобни бутони и внимателно подредено съдържание правят сайта по-лесен за използване навсякъде.': 'On a small screen every decision is felt. Readable text, comfortable buttons and carefully arranged content make a website easier to use everywhere.',
    'Добрата идея.': 'A good idea.',
    'В добър сайт.': 'In a good website.',
    'SOLA — примерна визуална концепция за студио за интериорен дизайн. Спокойна типография, естествени цветове и място за работата да говори сама.': 'SOLA — a sample visual concept for an interior design studio. Calm typography, natural colours and room for the work to speak for itself.',
    'Демонстрационен проект, създаден за този дизайн.': 'A demonstration project created for this design.',
    'И вашият сайт може да е тук': 'Your website could be here too',
    'Светъл интериор с естествени материали и растения': 'A bright interior with natural materials and plants'
  };

  // Sentences the scripts build from pieces. Captured parts go through the dictionary again.
  const units = { 'см': 'cm', 'г': 'g', 'мл': 'ml' };
  const date = (m, tr) => `${tr(m[1])}, ${m[2]} Oct · ${m[3]}`;
  const DATE = '(Пн|Вт|Ср|Чт|Пт), (\\d+) окт\\. · (\\d\\d:\\d\\d)';
  const pallets = n => `${n} pallet${n === '1' ? '' : 's'}`;
  const P = [
    [/^· (\d+) (см|г|мл)$/, m => `· ${m[1]} ${units[m[2]]}`],
    [/^(\d+) (см|г|мл)$/, m => `${m[1]} ${units[m[2]]}`],
    [/^(\d+) минути$/, m => `${m[1]} minutes`],
    [/^Стилист Елена · (\d+) мин\.$/, m => `Stylist Elena · ${m[1]} min`],
    [new RegExp(`^${DATE}$`), date],
    [new RegExp(`^Избран час: ${DATE}\\.$`), (m, tr) => `Selected slot: ${date(m, tr)}.`],
    [/^(\d\d:\d\d) — свободен час$/, m => `${m[1]} — free slot`],
    [/^(\d\d:\d\d) — зает час$/, m => `${m[1]} — taken slot`],
    [/^Добави още (.+)$/, (m, tr) => `Add one more ${tr(m[1])}`],
    [/^Добави (.+) в поръчката$/, (m, tr) => `Add ${tr(m[1])} to the order`],
    [/^Намали (.+)$/, (m, tr) => `One less ${tr(m[1])}`],
    [/^Виж поръчката \((\d+)\)$/, m => `View order (${m[1]})`],
    [/^(.+) е добавена в кошницата\.$/, (m, tr) => `${tr(m[1])} was added to the basket.`],
    [/^В кошницата: (\d+) артикула · (.+)\.$/, m => `In the basket: ${m[1]} item${m[1] === '1' ? '' : 's'} · ${m[2]}.`],
    [/^Керамичен блок (\d+)$/, m => `Ceramic block ${m[1]}`],
    [/^(\d+) палета? · (\d+) броя$/, m => `${pallets(m[1])} · ${m[2]} pieces`],
    [/^Избрано количество: (\d+) палета? · (.+)\.$/, m => `Selected quantity: ${pallets(m[1])} · ${m[2]}.`],
    [/^Търсене в Google: (.+)$/, m => `Google search: ${m[1]}`],
    [/^Видимост на (.+) в Google$/, (m, tr) => `${tr(m[1])} visibility on Google`],
    [/^Какво направихме за (.+)$/, (m, tr) => `What we did for ${tr(m[1])}`],
    [/^Покажете (.+)$/, m => `Show ${m[1]}`],
    [/^Отворете (.+) в нов раздел$/, m => `Open ${m[1]} in a new tab`],
    [/^Отвори (.+) в нов раздел$/, m => `Open ${m[1]} in a new tab`],
    [/^(.+) — (Компютър|Телефон|Таблет), отвори преглед$/, (m, tr) => `${m[1]} — ${tr(m[2])}, open the preview`],
    [/^(.+) — (Компютър|Телефон|Таблет)$/, (m, tr) => `${m[1]} — ${tr(m[2])}`],
    [/^(.+) — отвори сайта от екрана$/, m => `${m[1]} — open the website from the screen`],
    [/^(.+) — отвори преглед$/, m => `${m[1]} — open the preview`],
    [/^(.+) — преглед на сайта$/, m => `${m[1]} — website preview`]
  ];

  const KEY = 'lumina_lang', ATTRS = ['aria-label', 'placeholder', 'alt', 'title'], CYR = /[\u0400-\u04FF]/;
  const SKIP = 'script,style,noscript,.ps-google-typed,.lang-switch';
  const clean = s => s.replace(/\s+/g, ' ').trim();
  function tr(text) {
    if (Object.prototype.hasOwnProperty.call(T, text)) return T[text];
    for (const [pattern, build] of P) { const m = pattern.exec(text); if (m) return build(m, tr); }
    return text;
  }

  let lang = 'bg', observer = null;
  const texts = new Map(), attrs = new Map();   // what each translated node or attribute said in Bulgarian

  function textNode(node) {
    const value = node.nodeValue;
    if (!CYR.test(value)) return;
    const parent = node.parentElement;
    if (!parent || parent.closest(SKIP)) return;
    const source = clean(value), english = tr(source);
    if (english === source) return;
    const lead = /^\s*/.exec(value)[0], tail = /\s*$/.exec(value)[0], next = lead + english + tail;
    texts.set(node, { bg: value, en: next });
    node.nodeValue = next;
  }
  function attribute(el, name) {
    const value = el.getAttribute(name);
    if (!value || !CYR.test(value) || el.closest(SKIP)) return;
    const english = tr(clean(value));
    if (english === clean(value)) return;
    let saved = attrs.get(el);
    if (!saved) attrs.set(el, saved = {});
    saved[name] = { bg: value, en: english };
    el.setAttribute(name, english);
  }
  function translate(root) {
    if (root.nodeType === 3) { textNode(root); return; }
    if (root.nodeType !== 1) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const found = [];
    while (walker.nextNode()) found.push(walker.currentNode);
    found.forEach(textNode);
    [root, ...root.querySelectorAll('[aria-label],[placeholder],[alt],[title]')].forEach(el => ATTRS.forEach(name => attribute(el, name)));
  }
  function restore() {
    texts.forEach((saved, node) => { if (node.isConnected && node.nodeValue === saved.en) node.nodeValue = saved.bg; });
    attrs.forEach((saved, el) => Object.keys(saved).forEach(name => { if (el.getAttribute(name) === saved[name].en) el.setAttribute(name, saved[name].bg); }));
    texts.clear(); attrs.clear();
  }
  function forget() {   // nodes the page has since thrown away
    texts.forEach((saved, node) => { if (!node.isConnected) texts.delete(node); });
    attrs.forEach((saved, el) => { if (!el.isConnected) attrs.delete(el); });
  }

  const head = { title: document.title, description: document.querySelector('meta[name="description"]')?.content };
  function setHead() {
    document.documentElement.lang = lang;
    document.title = lang === 'en' ? tr(head.title) : head.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && head.description) meta.content = lang === 'en' ? tr(head.description) : head.description;
  }
  function watch() {
    observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === 'childList') record.addedNodes.forEach(translate);
        else if (record.type === 'characterData') {
          const saved = texts.get(record.target);
          if (!saved || record.target.nodeValue !== saved.en) textNode(record.target);
        } else {
          const saved = attrs.get(record.target)?.[record.attributeName];
          if (!saved || record.target.getAttribute(record.attributeName) !== saved.en) attribute(record.target, record.attributeName);
        }
      });
      if (texts.size > 4000) forget();
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }
  function apply(next, remember) {
    if (next !== 'en') next = 'bg';
    if (remember) { try { localStorage.setItem(KEY, next); } catch { /* the choice just will not be remembered */ } }
    const changed = next !== lang;
    lang = next;
    document.querySelectorAll('.lang-switch [data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    if (!changed) return;
    if (lang === 'en') { translate(document.body); watch(); }
    else { observer?.disconnect(); observer = null; restore(); }
    setHead();
    // Handwritten arrows and the live previews are measured from the text, so let them re-measure.
    requestAnimationFrame(() => dispatchEvent(new Event('resize')));
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.lang-switch [data-lang]');
    if (button) apply(button.dataset.lang, true);
  });
  let saved = null;
  try { saved = new URLSearchParams(location.search).get('lang') || localStorage.getItem(KEY); } catch { /* storage blocked */ }
  apply(saved === 'en' ? 'en' : 'bg', false);
})();
