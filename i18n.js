// BG | EN switch in the header. Bulgarian is the source language: every script keeps writing Bulgarian,
// and this file swaps the visible text (and labels such as aria-label and placeholder) for English while
// EN is chosen. Text that is not in the dictionary stays Bulgarian, so new copy needs an entry here.
// Left in Bulgarian on purpose: the four client sites, the Google searches and their result titles.
(() => {
  'use strict';
  const T = {
    // Rotating hero (assets/hero-demos.js); the screenshots themselves stay Bulgarian
    "Три примерни сайта на компютър и телефон: салон, пицария и хотел.": "Three example websites on a computer and phone: a salon, a pizzeria and a hotel.",
    "Лиора — фризьорски салон с колаж от снимки": "Liora, a hair salon with a photo collage",
    "Forno — пицария с меню и резервации": "Forno, a pizzeria with a menu and table booking",
    "Хотел край морето с онлайн резервации": "Seaside hotel with online booking",
    // Earlier static seaside hero
    "Запазете си няколко дни край морето.": "Book a few days by the sea.",
    "Стаи": "Rooms",
    "Резервации": "Booking",
    "Настаняване": "Arrival",
    "Напускане": "Departure",
    "Гости": "Guests",
    "2 гости": "2 guests",
    "Резервирайте": "Book your stay",
    "Къща за гости": "Guesthouse",
    "Тераса на къща за гости с гледка към морето": "Guesthouse terrace overlooking the sea",
    // Page, header, menu
    'Lumina — Сайт за вашия бизнес, изцяло от нас': "Lumina — A website for your business, built by us",
    'Lumina — уеб дизайн, разработка, SEO и поддръжка. Уебсайтове за по-силно присъствие.': "Lumina builds and looks after websites for businesses. Design, development, SEO and maintenance.",
    'Към съдържанието': 'Skip to content',
    'Lumina — начало': 'Lumina — home',
    'Основна навигация': 'Main navigation',
    'Разгънато меню': 'Expanded menu',
    'Отвори менюто': 'Open the menu',
    'Затвори менюто': 'Close the menu',
    'Начало': 'Home',
    'Защо ви е сайт?': 'Why have a website?',
    'Нашите услуги': 'Our services',
    'Портфолио': 'Portfolio',
    'Контакт': 'Contact',
    'Безплатно демо': 'Free demo',
    'Добрите идеи заслужават добри сайтове.': "Have an idea for a website? Let’s talk.",

    // Hero
    'Сайт за вашия': 'A website for',
    'бизнес, изцяло': 'your business,',
    'от нас.': "crafted by us.",
    'ВСИЧКО ЗА': 'EVERYTHING FOR',
    'САЙТА ВИ': 'YOUR WEBSITE',
    'НА ЕДНО МЯСТО': 'IN ONE PLACE',
    'Правим сайта ви от първата идея до пускането — и оставаме след това. Домейн, хостинг и SEO са наша грижа.': "We plan, build and launch your website, then look after it for you. We take care of the domain, hosting and SEO too.",
    'Заяви безплатно демо': 'Request a free demo',
    'Заяви': 'Request',
    'безплатно': 'a free',
    'демо': 'demo',
    'Примерен сайт на къща за гости край морето с резервации, показан на компютър и телефон.': "Example guesthouse website with booking, shown on a computer and phone.",
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
    'Клиентите': "Your",
    'ви търсят': 'customers',
    'онлайн.': 'are online.',
    'Бъдете там.': 'Are you?',
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
    'Сайтове, които ви намират': 'Websites that bring you',
    'нови клиенти.': 'new clients.',
    'Вижте проектите': 'See the projects',
    'Дизайн &': 'Design &',
    'Разработка': 'Development',
    'Персонализирани, бързи уебсайтове за вашите цели.': "Fast websites made for your business.",
    'Научете повече': 'Learn more',
    'Растеж': 'Growth',
    'Повече видимост, повече трафик, повече резултати.': "Help more people find and visit your site.",
    'Хостинг &': 'Hosting &',
    'Домейни': 'Domains',
    'Бързо, сигурно и напълно управлявано.': "Fast, secure hosting. We handle the setup and upkeep.",
    'Поддръжка': 'Maintenance',
    'Поддържаме сайта ви защитен, актуален и работещ гладко.': 'We keep your website secure, up to date and running smoothly.',
    'Надолу: защо ви е сайт': "See why you need a website",
    'Лаптоп, чаша кафе и зелено растение върху розово бюро': 'A laptop, a cup of coffee and a green plant on a pink desk',

    // Why a website
    'Вижте сами.': 'See for yourself.',
    'Днес хората очакват да ви намерят онлайн — дори когато са чули за вас от приятел. Ако ви потърсят в Google и не открият нищо, лесно ще изберат конкурент, за когото има повече информация.': "Today people expect to find you online, even when they heard about you from a friend. If they search for you on Google and find nothing, it is easy for them to pick a competitor with more information. You don’t want that to happen, and you can prevent it.",
    'Сайтът ви показва какво предлагате, колко струва и кога работите. Снимките и ясната информация помагат на хората да ви опознаят и да ви се доверят още преди първия разговор. А когато могат да разгледат менюто, да запазят час или да поръчат онлайн, без да се налага да звънят, е по-удобно и за тях, и за вас.': "Your website shows what you offer, what it costs and when you are open. Photos and clear information help people get to know you and trust you before the first conversation. And when they can browse the menu, book an appointment or order online without having to call, it is easier for them and for you.",
    'Повече хора ви намират': 'More people find you',
    'Работи вместо вас': 'It works for you',
    'Вдъхва доверие': 'It inspires confidence',
    'Малка инвестиция, която ви води клиенти.': "A small investment that brings in customers.",
    'Повече хора ви намират.': 'More people find you.',
    'В Google и Google Maps.': 'On Google and Google Maps.',
    'Работи вместо вас.': 'It works for you.',
    'Меню, поръчки и записване онлайн.': "View menus, order and book online.",
    'Вдъхва доверие.': 'It builds trust.',
    'Бизнесът ви изглежда завършен.': "Your business looks professional.",
    'Пробвайте сами.': 'Try it yourself.',
    'Изберете пример': 'Choose an example',
    'Натиснете пауза и разгледайте целия сайт сами.': 'Press pause and explore the whole site yourself.',
    'Три примера. Натиснете и вижте.': 'Three examples. Tap to see each one.',
    'Следващ пример:': 'Next example:',
    'Ресторант': 'Restaurant',
    'Фризьор': 'Hairdresser',
    'Магазин': 'Shop',

    // Example restaurant
    'Сканират кода,': 'They scan the code,',
    'избират и поръчват.': 'choose and order.',
    'Меню, цени и поръчки на едно място. От QR кода до любимата пица.': "Scan the QR code to see the menu, check prices and order a pizza.",
    'Форно': 'Forno',
    'Пицария': 'Pizzeria',
    'Форно · Пицария': 'Forno · Pizzeria',
    'Отвори кошницата': 'Open the basket',
    'Меню и поръчки': 'Menu and orders',
    'Хубава пица.': 'Good pizza.',
    'Хубав ден.': 'Good day.',
    'Бавно тесто.': "Slow-risen dough.",
    'Простички': 'Simple',
    'съставки.': 'ingredients.',
    'Сканирай': 'Scan',
    'за менюто': 'for the menu',
    'Отвори менюто — илюстративен QR код': "Open the menu — example QR code",
    'Илюстративен QR код': "Example QR code",
    'Прясна пица Маргарита с пухкав изпечен ръб, босилек и моцарела': "Margherita pizza with a raised crust, basil and mozzarella",
    'Какво ви се хапва?': 'What are you in the mood for?',
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
    'Добавете от менюто': "Choose from the menu",
    'Добавете нещо вкусно в поръчката.': "Choose something from the menu.",
    'Добавете нещо от менюто.': 'Add something from the menu.',
    'Менюто е отворено. Изберете категория и добавете към поръчката.': "Choose a category, then add an item to your order.",
    'Добавете ястие от менюто, за да започнете.': "Choose a dish to start your order.",
    'Готово за поръчка.': 'Ready to order.',
    'Вашата поръчка.': 'Your order.',
    'Общо · за вземане': "Total · collection",
    'Това е примерен преглед. Поръчката не е изпратена.': "This is a demo. Your order hasn't been sent.",
    'Прегледай поръчката': 'Review the order',
    'Примерната поръчка е обновена.': "Demo order updated.",
    'Примерната поръчка е готова за преглед. Нищо не е изпратено.': "Your demo order is ready to review. It hasn't been sent.",
    '11:00–23:00 · всеки ден': '11:00–23:00 · every day',
    'За вкъщи': 'Takeaway',
    'QR код': 'QR code',
    'за меню': 'menu',
    'Избор': "Choose",
    'по вкус': "your food",
    'Поръчки': 'Orders',
    'за вкъщи': 'to go',

    // Example salon
    'Докато работите,': 'Customers book',
    'хората се записват.': 'while you work.',
    'Услугите и свободните часове са видими. Записването става без обаждания.': "Customers can see your services and available times, then book without calling.",
    'Лиора': 'Liora',
    'Студио за коса': 'Hair studio',
    'Лиора · Салон за красота': 'Liora · Beauty salon',
    'Запази час': "Book a time",
    'Промени часа': "Change the time",
    'Салон за красота': 'Beauty salon',
    'Пловдив': 'Plovdiv',
    'Лична грижа. Без бързане.': "We take our time with your hair.",
    'Фризьор оформя естествени вълни в дълга кестенява коса': 'A hairdresser styling natural waves in long chestnut hair',
    'Запазете си време.': "Reserve your appointment.",
    'Стилист Елена': 'Stylist Elena',
    'Изберете услуга': 'Choose a service',
    'Подстригване и оформяне': 'Cut and styling',
    'Сешоар и стилизиране': 'Blow-dry and styling',
    'Възстановяваща терапия': "Restorative treatment",
    'Подстригване': 'Cut',
    'Сешоар': 'Blow-dry',
    'Терапия': 'Treatment',
    'Изберете ден': 'Choose a day',
    'Изберете ден за час': 'Choose a day',
    'Изберете час': 'Choose a time',
    'Октомври 2026': 'October 2026',
    'Пн': 'Mon', 'Вт': 'Tue', 'Ср': 'Wed', 'Чт': 'Thu', 'Пт': 'Fri',
    'Свободни часове': "Available times",
    'зает': "booked",
    'Изберете услуга, ден и час.': 'Choose a service, day and time.',
    'Вашето време е избрано.': "You've chosen a time.",
    'Демонстрация: не е направена реална резервация и не е изпратено съобщение.': "This is a demo. No appointment was booked and no message was sent.",
    'Избери друг час': "Choose another time",
    'Потвърждение по SMS и имейл': 'Confirmation by SMS and email',
    'Услуги': 'Services',
    'и цени': 'and prices',
    'Виждате': 'See which',
    'заетите': "times are",
    'часове': "taken",
    'Запази': 'Book',
    'час': "a time",

    // Example shop
    'Целият ви склад —': 'Your whole warehouse —',
    'на един екран.': 'on one screen.',
    'Продукти, наличности и поръчки. Клиентите намират отговорите сами.': "Customers can check products and stock, then place an order.",
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
    'Начин на получаване': "Delivery or collection",
    'До обекта': 'To the site',
    'От склада': 'From the warehouse',
    'Добави в поръчката': 'Add to order',
    'Доставката се уточнява според адреса и количеството.': "Delivery depends on your address and order size.",
    'Вземане от склада след уточнение на ден и час.': "We'll agree a day and time for you to collect from the warehouse.",
    'Как става доставката?': 'How does delivery work?',
    'След заявката уточняваме адреса, количеството и удобно време за разтоварване.': "After you order, we'll confirm the address, quantity and a time for unloading.",
    'Мога ли да взема само един палет?': "Can I order just one pallet?",
    'Да. Можете да поръчате от един палет — 80 броя.': "Yes. The minimum order is one pallet of 80 blocks.",
    'Мога ли да взема от склада?': 'Can I collect from the warehouse?',
    'Изберете „От склада“ преди добавяне в поръчката. Вземането се уточнява след заявката.': "Choose “From the warehouse” before adding the product to your order. We’ll then arrange a collection time.",
    'Променете количеството и вижте цената.': 'Change the quantity and see the price.',
    'Вашата заявка': "Your order",
    'Доставка до обекта — уточнява се отделно.': 'Delivery to the site — arranged separately.',
    'Вземане от склада.': 'Collection from the warehouse.',
    'Заявката е подготвена като пример. Не е изпратена към магазин.': "This is a demo order. It hasn't been sent to a shop.",
    'Прегледай заявката': "Review your order",
    'Продуктът е добавен в кошницата.': "Product added to your basket.",
    'Примерната заявка е готова. Не е изпратена към магазин.': "Your demo order is ready. It hasn't been sent to a shop.",
    'Пн–Пт · 08:00–18:00': 'Mon–Fri · 08:00–18:00',
    'Детайли': 'Details',
    'за блока': 'of the block',
    'Чести': 'Common',
    'въпроси': 'questions',

    // Services
    'Какво правим?': 'What do we do?',
    'Всичко!': 'Everything!',
    'Всяка услуга решава конкретна задача. Вижте какво включваме и как то помага на бизнеса ви.': "Here's what we do for your website and how it helps your business.",
    'Дизайн': 'Design',
    'Разпознаваема визия.': "A distinctive look people recognise.",
    'Разпознаваема визия': "A design people recognise",
    'Клиентите разбират кои сте и какво предлагате.': "Show customers who you are and what you offer.",
    'Цветове и шрифтове за вашия бранд': 'Colours and fonts for your brand',
    'Професионален и изчистен дизайн': 'Polished, refined design',
    'Проверен на всеки екран, от телефон до голям монитор': 'Checked on every screen, from phone to large monitor',
    'Изработка на сайт': 'Website development',
    'Бърз и стабилен сайт.': "A fast, stable site.",
    'Бърз и стабилен сайт': "A fast, stable site",
    'Зарежда се за секунди и работи без грешки.': "It loads in seconds and works without errors.",
    'Визия за телефон и компютър': "Design for phones and computers",
    'Форми за контакт и запитвания': 'Contact and enquiry forms',
    'Меню, каталог или записвания според бизнеса': "A menu, catalogue or booking system tailored to your business",
    'Домейн': 'Domain',
    'Вашият адрес онлайн.': 'Your address online.',
    'Вашият адрес онлайн': 'Your address online',
    'Един ясен адрес за визитките, профилите и клиентите ви.': "One web address to share with customers, on your business cards and profiles.",
    'Избор на подходящо име': "Help choosing a domain name",
    'Регистрация на нов домейн със SSL сертификат': "Domain registration with an SSL certificate",
    'Свързване на нов или съществуващ адрес': "Connect a new domain or use one you own",
    'Хостинг': 'Hosting',
    'Сайт, готов за работа.': "Your website up and running.",
    'Сайт, готов за работа': "Your website up and running",
    'Техническата част има кой да я поеме.': "We handle the technical setup.",
    'Настройка и публикуване на сайта': "Website setup and launch",
    'Защитена връзка за посетителите': 'A secure connection for visitors',
    'Проследяване на работата на сайта': "Checks to keep your site running",
    'Google ви показва.': "Show up on Google.",
    'Google ви показва': "Show up on Google",
    'Когато някой търси вашата услуга, вие излизате в резултатите.': "When someone searches for your service, you appear in the results.",
    'Ясна структура на страниците': 'A clear page structure',
    'Подходящи заглавия и описания': "Clear page titles and descriptions",
    'Подготовка на сайта за търсачките': 'Preparing the website for search engines',
    'Маркетинг': 'Marketing',
    'Посока към нови клиенти.': "Reach new customers.",
    'Посока към нови клиенти': "Reach new customers",
    'Вниманието има посока — към вашия бизнес.': "Help more people notice your business.",
    'Рекламни кампании в социалните мрежи': "Advertising campaigns on social media",
    'Страници за кампании и предложения': 'Pages for campaigns and offers',
    'Проследяване на резултатите': "Results tracking",
    'След пускането': 'After launch',
    'оставаме до вас.': "we keep helping.",
    'Поддръжка.': 'Aftercare.',
    'Грижата продължава.': "We keep it running.",
    'Сайтът ви остава обновен и защитен, а съдържанието му — винаги актуално.': "We keep your site secure and up to date, including its text and photos.",
    'Обновявания и сигурност': 'Updates and security',
    'Промени по текстове и снимки': 'Changes to text and photos',
    'Съдействие при въпроси': 'Help with questions',
    'Да поговорим за вашия сайт': "Let's talk about your website",
    'Имате чуждестранни клиенти?': "Do your customers speak English?",
    'Правим сайта и на английски.': "We can make your site in English too.",
    'Преводачите ни говорят свободно английски и български. Без машинен превод и без изкуствен интелект. Не вярвате? Обадете ни се и ще поговорим на езика, който изберете.': "Our translators speak fluent English and Bulgarian. We don’t use machine or AI translation. Don’t believe us? Just give us a call and find out for yourself.",
    'Визия с вашия характер.': "A design that fits your business.",
    'Подреждаме историята, услугите и силните ви страни в дизайн, който хората разбират още от първия поглед.': "We organise your story and services so visitors can quickly see what you offer.",
    'Да ви забележат.': 'So you get noticed.',
    'Красивият дизайн оживява.': "We build your website.",
    'Превръщаме визията в удобен сайт. Всеки бутон, страница и форма има ясна задача — да улесни вашите клиенти.': "We turn the design into a website that’s easy to use. Each page, button and form helps customers do what they came for.",
    'Да действат лесно.': "Easy for customers to use.",
    'Вашето място има адрес.': "A web address for your business.",
    'Помагаме да изберете лесно за запомняне име и свързваме адреса с новия ви сайт. Имате домейн? Работим с него.': "We help you choose a domain name people can remember and connect it to your site. If you already have one, we can use it.",
    'Да ви запомнят.': "Easy to remember.",
    'Добра основа за всеки ден.': "Hosting managed for you.",
    'Осигуряваме мястото, където живее сайтът, и поемаме техническите настройки, за да се занимавате с бизнеса си.': "We host your website and handle the technical setup, so you can focus on your business.",
    'Да ви намират онлайн.': "Help people find you online.",
    'По-лесно откриваем бизнес.': "Make your business easier to find.",
    'Подреждаме съдържанието и страниците така, че хората и търсачките да разбират какво предлагате.': "We organise your pages so people and search engines can understand what you offer.",
    'Да ви откриват.': "Help customers find you.",
    'Сайтът стига до хората.': "Get your website seen.",
    'Свързваме сайта с вашето представяне онлайн. Ясното послание води правилната аудитория към следващата стъпка.': "We connect your site with your other online pages. Clear copy helps customers see what you offer and how to contact you.",
    'Да изберат вас.': 'So they choose you.',

    // Portfolio
    'Нашите': 'Our',
    'клиенти.': 'clients.',
    'Всеки от тези сайтове е направен по мярка за бизнеса си.': "Each site is made to measure for the business.",
    'Това е истинският сайт.': 'This is the real website.',
    'Натиснете го.': 'Click it.',
    'Натиснете екрана и разгледайте сайта сами.': 'Tap the screen and explore the site yourself.',
    'Изберете проект': 'Choose a project',
    'Отворете сайта': 'Open the website',
    'Плувен комплекс': 'Swimming complex',
    'Мъжки фризьорски салон': "Barbershop",
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
    'Контакти': "Contact details",
    'Преглед на заетите часове': "See booked appointments",
    'Директно обаждане': "Tap to call",
    'SEO оптимизация ·': "SEO ·",
    '№1 в Google': '#1 on Google',
    'Първо място': 'First place',
    'Първи в Google.': 'First on Google.',
    'Направен, за да го намират.': 'Built to be found.',
    'SEO оптимизация': "SEO",
    'Визуализация · примерни търсения.': "Example searches.",
    'Сайтът е подготвен за търсения като „керемиди Пазарджик“ и „термопанели Пловдив“.': "We set up the site for searches such as “керемиди Пазарджик” and “термопанели Пловдив”.",
    'Сайтът е подготвен за търсения като „пица Пещера“ и „доставка на храна Пещера“.': "We set up the site for searches such as “пица Пещера” and “доставка на храна Пещера”.",
    'Визуализация · позиция по данни на Lumina.': "Example view. Ranking based on Lumina’s data.",
    'Когато търсят плуване, плувни уроци или плуване за деца в Пловдив, намират ВСИ.': 'When people search for swimming, swimming lessons or swimming for children in Plovdiv, they find VSI.',
    'Когато търсят бръснар, мъжки фризьор или бръснарница в Стамболийски, намират Razor.': "When people search for a barber, a men's hairdresser or a barbershop in Stamboliyski, they find Razor.",
    'Отвори търсенето': 'Open the search',
    'За бизнеса': 'About the business',
    'Какво направихме': 'What we did',
    'Плувен комплекс с тренировки за деца и възрастни.': "A swimming centre with lessons for children and adults.",
    'График на тренировките': 'Training schedule',
    'Треньори и цени': 'Coaches and prices',
    'Удобен на телефон': 'Easy to use on a phone',
    'VSI Swimming при търсене на „плуване Пловдив“.': 'VSI Swimming for the search “плуване Пловдив”.',
    'Мъжки салон в Стамболийски с ясна визия и лично отношение.': "A men’s hair salon in Stamboliyski with its own style and personal service.",
    'Едно натискане до салона.': 'One tap to reach the salon.',
    'Бутонът за обаждане е още на първия екран.': 'The call button is right on the first screen.',
    'Покривни системи и фасадни панели за дома и бизнеса.': 'Roofing systems and facade panels for homes and businesses.',
    'Продуктов каталог': 'Product catalogue',
    'Галерия с обекти': 'Gallery of completed projects',
    'Запитване за оферта': 'Quote request',
    'Снимки и видео': 'Photos and video',
    'Карта и упътване': 'Map and directions',
    'От продукта до офертата.': 'From product to quote.',
    'Каталогът и контактите водят клиента към следващата стъпка.': "Customers can browse the catalogue and get in touch for a quote.",
    'Пицария с меню, което се разглежда удобно отвсякъде.': 'A pizzeria with a menu that is easy to browse from anywhere.',
    'Меню по категории': 'Menu by category',
    'Търсене и филтри': 'Search and filters',
    'Мобилна версия': 'Mobile version',
    'Онлайн поръчки с доставка': "Order online for delivery",
    'Меню в джоба.': "View the menu on your phone.",
    'Категории и филтри, удобни и на малък екран.': 'Categories and filters that work well on a small screen too.',
    'Смяна на проектите': "Change project",
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
    'Пусни отначало': "Start again",
    'Спри превъртането': 'Stop scrolling',
    'Пусни превъртането': 'Start scrolling',
    'Зареждане на сайта…': 'Loading the website…',
    'Сайтът не се зареди. Опитайте отново или го отворете отделно.': 'The website did not load. Try again or open it separately.',
    'Отвори сайта': 'Open the website',
    'Опитай отново': 'Try again',
    'Натиснете екран за преглед': 'Click a screen to preview',
    'Това е преглед на сайта. За актуални свободни часове и записване отворете сайта на ВСИ.': "This is a preview. Open the VSI website to see available times and book.",
    'Запази час в сайта на ВСИ': "Book on the VSI website",

    // Contact
    'Всичко започва': "It all starts",
    'с една идея.': "with an idea.",
    'Разкажете ни за бизнеса си. Ще създадем безплатно демо на вашия сайт до 24 часа след заявката.': "Tell us about your business. We’ll make a free demo of your website within 24 hours of your request.",
    'До 24 часа': 'Within 24 hours',
    'безплатно демо': 'free demo',
    'Първи дизайн,': 'A first design,',
    'с идея за вашия бизнес.': "made for your business.",
    'Вие давате идеята,': 'You bring the idea,',
    'а ние правим първия дизайн.': 'and we make the first design.',
    'до 24 ч.': "within 24h",
    'Заявка за безплатно демо': 'Free demo request',
    'До: Lumina Studio': 'To: Lumina Studio',
    'Здравейте, Lumina.': 'Hello, Lumina.',
    'Имам бизнес и искам да го видя онлайн.': "I’d like a website for my business.",
    'Вашето име': 'Your name',
    'Как да се обръщаме към вас?': 'What should we call you?',
    'Вашият бизнес': 'Your business',
    'Име или сфера на дейност': "Business name or what you do",
    'Имейл или телефон': 'Email or phone',
    'Как да се свържем с вас?': 'How can we reach you?',
    'Какъв сайт си представяте?': 'What kind of website do you have in mind?',
    'по желание': 'optional',
    'Какво предлагате и как сайтът да ви помогне?': 'What do you offer, and how should the website help you?',
    'Моля, попълнете това поле.': 'Please fill in this field.',
    'Въведете валиден имейл или телефон.': 'Enter a valid email or phone number.',
    'Или направо:': "Or contact us here:",
    'Изпращаме заявката…': 'Sending your request…',
    'Какво включва': 'What’s included',
    'Пишете ни.': 'Write to us.',
    'До 24 часа виждате демо на вашия сайт.': 'Within 24 hours you see a demo of your website.',
    'Харесва ли ви, уговаряме цена. Ако не, не дължите нищо.': 'If you like it, we agree a price. If not, you owe nothing.',
    'Използваме контакта ви само за да ви отговорим.': 'We use your contact details only to reply to you.',
    'Благодарим!': 'Thank you!',
    'Получихме заявката ви. До 24 часа ще ви покажем демо на вашия сайт.': "We’ve received your request. Within 24 hours we’ll show you a demo of your website.",
    'Добре': 'OK',
    'От: Lumina Studio': 'From: Lumina Studio',
    'До: вас': 'To: you',
    'Затвори': 'Close',
    'Благодарим! Получихме заявката ви и ще се свържем с вас до 24 часа.': "Thank you! We’ve received your request and will get back to you within 24 hours.",
    'Заявката не беше изпратена. Моля, обадете ни се на': "Your request wasn’t sent. Please call us on",
    'или пишете на': 'or write to',

    // Footer and cookie notice
    'ВСИЧКО Е ПОЕТО ОТ НАС.': 'WE TAKE CARE OF EVERYTHING.',
    'Вие се фокусирате върху бизнеса си.': 'You focus on your business.',
    'Ние се грижим за сайта, SEO, хостинга, домейна, маркетинга и поддръжката.': 'We take care of the website, SEO, hosting, domain, marketing and maintenance.',
    'Бисквитки': 'Cookies',
    'Приемам': 'Accept',
    'Отказвам': 'Decline',
    'Използваме бисквитки за правилната работа на сайта и за анонимна статистика на посещенията (Google Analytics).': "We use cookies to run this site and collect anonymous visitor statistics with Google Analytics.",
    'Може да промените избора си по всяко време от „Бисквитки“ в долния край на страницата.': "You can change your choice at any time using “Cookies” at the bottom of the page.",

    // Extra panels (studio, journal, SOLA concept)
    'Обратно към началото': 'Back to top',
    'Вие движите бизнеса.': 'You run the business.',
    'Ние — сайта.': 'We run the website.',
    'Lumina е уеб дизайн студио. Събираме стратегия, дизайн, разработка и грижа за сайта в един цялостен процес. За да имате повече време за това, което правите най-добре.': "Lumina is a web design studio. We plan, design, build and look after your website, so you have more time for your business.",
    'Как можем да помогнем': 'How we can help',
    'Идеи за по-добро': "Ideas to improve",
    'онлайн присъствие.': "your website.",
    'Какво прави един сайт полезен?': 'What makes a website useful?',
    'Ясно послание, лесна навигация и разбираема следваща стъпка. Посетителят трябва бързо да разбере какво предлагате и как да се свърже с вас.': "Visitors should quickly see what you offer and how to contact you. Clear copy, menus and buttons help them do that.",
    'Защо да мислим първо за телефона?': "Why design for phones first?",
    'На малък екран всяко решение се усеща. Четим текст, удобни бутони и внимателно подредено съдържание правят сайта по-лесен за използване навсякъде.': "Small screens need clear text, buttons that are easy to tap and information in a sensible order. These things make the site easier to use on any device.",
    'Добрата идея.': 'A good idea.',
    'В добър сайт.': 'In a good website.',
    'SOLA — примерна визуална концепция за студио за интериорен дизайн. Спокойна типография, естествени цветове и място за работата да говори сама.': "SOLA is an example website for an interior design studio, with natural colours and large project photos.",
    'Демонстрационен проект, създаден за този дизайн.': "An example project made for this design.",
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
    [/^(\d+),(\d\d) €$/, m => `${m[1]}.${m[2]} €`],
    [/^(\d+) минути$/, m => `${m[1]} minutes`],
    [/^Стилист Елена · (\d+) мин\.$/, m => `Stylist Elena · ${m[1]} min`],
    [new RegExp(`^${DATE}$`), date],
    [new RegExp(`^Примерна резервация: ${DATE}\\. Не е изпратена\\.$`), (m, tr) => `Demo booking: ${date(m, tr)}. Nothing has been sent.`],
    [/^(\d\d:\d\d) — свободен час$/, m => `${m[1]} — available`],
    [/^(\d\d:\d\d) — зает час$/, m => `${m[1]} — booked`],
    [/^Добави още (.+)$/, (m, tr) => `Add one more ${tr(m[1])}`],
    [/^Добави (.+) в поръчката$/, (m, tr) => `Add ${tr(m[1])} to your order`],
    [/^Намали (.+)$/, (m, tr) => `One less ${tr(m[1])}`],
    [/^Виж поръчката \((\d+)\)$/, m => `View order (${m[1]})`],
    [/^(.+) е добавена в кошницата\.$/, (m, tr) => `${tr(m[1])} added to your basket.`],
    [/^Примерна поръчка: (\d+) артикула? · (.+)\. Не е изпратена\.$/, m => `Demo order: ${m[1]} item${m[1] === '1' ? '' : 's'} · ${m[2].replace(/(\d),(\d\d €)/, '$1.$2')}. Nothing has been sent.`],
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
  const SKIP = 'script,style,noscript,.ps-google-typed,.lang-switch,.shop-variant';
  const clean = s => s.replace(/\s+/g, ' ').trim();
  function tr(text) {
    if (Object.prototype.hasOwnProperty.call(T, text)) return T[text];
    for (const [pattern, build] of P) { const m = pattern.exec(text); if (m) return build(m, tr); }
    return text;
  }

  let lang = 'bg', observer = null;
  const texts = new Map(), attrs = new Map();   // what each translated node or attribute said in Bulgarian

  const PRICE = /^\s*\d+,\d\d €\s*$/;
  function textNode(node) {
    const value = node.nodeValue;
    if (!CYR.test(value) && !PRICE.test(value)) return;   // prices have no Cyrillic but take a decimal point in English
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
