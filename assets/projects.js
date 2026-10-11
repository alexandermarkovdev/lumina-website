/* Add a site's static build under sites/<id>/, then register it here.
   Each width is a real CSS viewport, never a stretched desktop screenshot.
   kind, blurb and paper are used by portfolio.js for the tab, caption and stage colour. */
window.LUMINA_PROJECTS = [
  {
    id: 'razor',
    name: 'Razor Barbershop',
    kind: 'Бръснарница',
    blurb: 'Тъмна, уверена визия с услуги и цени, работно време и бутон за обаждане на първия екран.',
    paper: 'pale-blue',
    url: 'sites/razor/index.html',
    liveUrl: 'https://barbershoprazor.com/',
    previewParam: 'lumina-preview',
    smoothTour: true,
    readySelector: 'main',
    background: '#191c1e',
    modes: {
      desktop: { width: 1440, height: 900, poster: 'assets/previews/razor-desktop.jpg' },
      // Display 402 × 874; reserve 62px status area and 34px home area.
      mobile: { width: 402, height: 778, poster: 'assets/previews/razor-mobile.jpg', preserveViewOnClose: true }
    }
  },
  {
    id: 'vsi',
    name: 'VSI Sports Complex',
    kind: 'Плувен комплекс',
    blurb: 'График, треньори, цени и новини за спортен комплекс с два басейна — подредени така, че родителят да намери всичко за минута.',
    paper: 'yellow',
    url: 'sites/vsi/index.html',
    liveUrl: 'https://vsiswimming.com/',
    readySelector: 'main',
    background: '#edf7fa',
    ink: '#10334b',
    colorScheme: 'light',
    hideInThumbnail: '.consent-bar',
    bookingSelector: '[data-nm-booking]',
    modes: {
      // The dolphin artwork fills the margin outside the site's 1280px content column,
      // so it grows with the viewport: about 190px wide at 1536px (too small), 300px at
      // 1680px, 480px at 1920px (too large). Keep the 16:10 shape when changing this.
      desktop: { width: 1680, height: 1050, poster: 'assets/previews/vsi-desktop.jpg' },
      mobile: { width: 402, height: 778, poster: 'assets/previews/vsi-mobile.jpg' }
    }
  },
  {
    id: 'jtn',
    name: 'JTN Roof Systems',
    kind: 'Покриви и фасадни панели',
    blurb: 'Каталог с метални керемиди и сандвич панели, галерия с обекти и бърз път до оферта.',
    paper: 'pink',
    url: 'sites/jtn/index.html',
    liveUrl: 'https://jtnhouses.com/',
    readySelector: 'main',
    background: '#f3f3f0',
    ink: '#15202b',
    colorScheme: 'light',
    presentation: 'jtn-doors',
    modes: {
      desktop: { width: 1440, height: 900, poster: 'assets/previews/jtn-desktop.jpg' },
      mobile: { width: 402, height: 778, poster: 'assets/previews/jtn-mobile.jpg' }
    }
  },
  {
    id: 'mypizza',
    name: 'MyPizza',
    kind: 'Пицария',
    blurb: 'Меню с категории, търсене и филтри, което се разглежда удобно и с една ръка.',
    paper: 'blue',
    url: 'sites/mypizza/MyPizza-Red-Paper.html',
    // Public address is still a placeholder; show the working local preview.
    readySelector: 'main',
    resetSelector: '#reset-filters',
    background: '#b93024',
    ink: '#fff7e9',
    colorScheme: 'light',
    modes: {
      desktop: { width: 1440, height: 900, poster: 'assets/previews/mypizza-desktop.jpg' },
      mobile: { width: 402, height: 778, poster: 'assets/previews/mypizza-mobile.jpg' }
    }
  }
];
