// Approved roofing shop. Bulgarian is the default; each text pair also includes English.
(()=>{'use strict';
const section=document.querySelector('#why-sites');
const article=section?.querySelector('[data-business=materials]'),site=article?.querySelector('.materials-site'),canvas=site?.querySelector('.site-canvas');
if(!canvas)return;
const group={
  "caption": [
    "Покривни материали",
    "Roofing materials"
  ],
  "products": [
    {
      "id": "roof-ridge",
      "short": [
        "Билна",
        "Ridge"
      ],
      "name": [
        "Билна керемида Теракота",
        "Terracotta ridge tile"
      ],
      "price": 5.9,
      "unit": [
        "бр.",
        "piece"
      ],
      "image": "roof-ridge.webp",
      "alt": [
        "Детайл на билни керамични керемиди",
        "Close-up of ceramic ridge tiles"
      ],
      "specs": [
        {
          "label": [
            "Материал",
            "Material"
          ],
          "value": [
            "Керамика",
            "Ceramic"
          ]
        },
        {
          "label": [
            "Размер",
            "Size"
          ],
          "value": [
            "42 × 22 см",
            "42 × 22 cm"
          ]
        },
        {
          "label": [
            "Покритие",
            "Finish"
          ],
          "value": [
            "Енгоба",
            "Engobe"
          ]
        },
        {
          "label": [
            "Цвят",
            "Colour"
          ],
          "value": [
            "Теракота",
            "Terracotta"
          ]
        },
        {
          "label": [
            "Профил",
            "Profile"
          ],
          "value": [
            "Полукръгъл",
            "Half-round"
          ]
        },
        {
          "label": [
            "Разфасовка",
            "Pack"
          ],
          "value": [
            "36 бр./палет",
            "36 / pallet"
          ]
        }
      ]
    },
    {
      "id": "roof-classic",
      "short": [
        "Класик",
        "Classic"
      ],
      "name": [
        "Керемида Класик",
        "Classic roof tile"
      ],
      "price": 2.4,
      "unit": [
        "бр.",
        "piece"
      ],
      "image": "roof-classic.webp",
      "alt": [
        "Покрив с теракотени керамични керемиди",
        "Roof covered with terracotta ceramic tiles"
      ],
      "specs": [
        {
          "label": [
            "Материал",
            "Material"
          ],
          "value": [
            "Керамика",
            "Ceramic"
          ]
        },
        {
          "label": [
            "Размер",
            "Size"
          ],
          "value": [
            "42 × 26 см",
            "42 × 26 cm"
          ]
        },
        {
          "label": [
            "Покритие",
            "Finish"
          ],
          "value": [
            "Енгоба",
            "Engobe"
          ]
        },
        {
          "label": [
            "Цвят",
            "Colour"
          ],
          "value": [
            "Теракота",
            "Terracotta"
          ]
        },
        {
          "label": [
            "Профил",
            "Profile"
          ],
          "value": [
            "Вълнообразен",
            "Curved"
          ]
        },
        {
          "label": [
            "Разфасовка",
            "Pack"
          ],
          "value": [
            "240 бр./палет",
            "240 / pallet"
          ]
        }
      ]
    },
    {
      "id": "roof-graphite",
      "short": [
        "Графит",
        "Graphite"
      ],
      "name": [
        "Плоска керемида Графит",
        "Graphite flat roof tile"
      ],
      "price": 3.2,
      "unit": [
        "бр.",
        "piece"
      ],
      "image": "roof-graphite.webp",
      "alt": [
        "Покрив с плоски графитени керемиди",
        "Roof covered with flat graphite tiles"
      ],
      "specs": [
        {
          "label": [
            "Материал",
            "Material"
          ],
          "value": [
            "Бетон",
            "Concrete"
          ]
        },
        {
          "label": [
            "Размер",
            "Size"
          ],
          "value": [
            "43 × 28 см",
            "43 × 28 cm"
          ]
        },
        {
          "label": [
            "Покритие",
            "Finish"
          ],
          "value": [
            "Матово",
            "Matt"
          ]
        },
        {
          "label": [
            "Цвят",
            "Colour"
          ],
          "value": [
            "Графит",
            "Graphite"
          ]
        },
        {
          "label": [
            "Профил",
            "Profile"
          ],
          "value": [
            "Плосък",
            "Flat"
          ]
        },
        {
          "label": [
            "Разфасовка",
            "Pack"
          ],
          "value": [
            "192 бр./палет",
            "192 / pallet"
          ]
        }
      ]
    }
  ]
};let selected=0,quantity=1;const lang=()=>document.documentElement.lang==='en'?1:0,t=(bg,en)=>lang()?en:bg,pair=p=>p[lang()],image=p=>'assets/clear-callouts/'+p.image;
const symbols={bag:'<path d="M5 7h14l1 14H4ZM9 8V6a3 3 0 0 1 6 0v2"/>',plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',box:'<path d="m12 2 9 5v10l-9 5-9-5V7Zm-9 5 9 5 9-5M12 12v10"/>'};const icon=n=>'<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">'+symbols[n]+'</svg>';const euro=n=>new Intl.NumberFormat(lang()?'en-GB':'bg-BG',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n)+' €';
site.classList.add('shop-variant');
function render(){const p=group.products[selected];site.querySelector('.browser-bar>span').textContent=pair(group.caption);
canvas.innerHTML=`<nav class="site-nav" aria-label="${t('Примерен магазин Терон','Teron example shop')}"><span class="site-wordmark">${t('Терон','Teron')}<em aria-hidden="true">.</em></span><span class="site-nav-caption">${pair(group.caption)}</span></nav><figure class="product-photo"><img src="${image(p)}" width="1200" height="800" alt="${pair(p.alt)}" decoding="async"></figure><div class="shop-scroll"><div class="shop-catalog" data-point="catalog" role="group" aria-label="${t('Изберете продукт','Choose a product')}">${group.products.map((item,i)=>`<button type="button" class="shop-product" data-shop-product="${i}" aria-pressed="${i===selected}"><img src="${image(item)}" width="29" height="25" alt=""><span>${pair(item.short)}</span></button>`).join('')}</div><div class="product-heading"><h3>${pair(p.name)}</h3><span class="stock-label">${t('На склад','In stock')}</span></div><div class="product-specs" data-point="specs" aria-label="${t('Характеристики','Specifications')}">${p.specs.map(s=>`<div><span>${pair(s.label)}</span><b>${pair(s.value)}</b></div>`).join('')}</div><div class="shop-purchase"><div class="price-and-quantity"><p class="product-price">${euro(p.price)}<small>${t('за','per')} ${pair(p.unit)}</small></p><div class="quantity"><button type="button" data-shop-quantity="-1" aria-label="${t('Намали количеството','Decrease quantity')}" ${quantity===1?'disabled':''}>${icon('minus')}</button><output aria-label="${t('Количество','Quantity')}">${quantity}</output><button type="button" data-shop-quantity="1" aria-label="${t('Увеличи количеството','Increase quantity')}">${icon('plus')}</button></div></div><button type="button" class="site-button" data-shop-cart data-point="cart"><span>${t('Добави в поръчката','Add to order')}</span>${icon('bag')}</button><p class="shop-feedback" role="status" aria-live="polite"></p><div class="product-faq" data-point="faq"><details><summary>${t('Как става доставката?','How does delivery work?')}${icon('plus')}</summary><p>${t('Уточняваме адреса и удобно време за доставка.','We confirm your address and agree a delivery time.')}</p></details><details><summary>${t('Мога ли да взема от склада?','Can I collect from the warehouse?')}${icon('plus')}</summary><p>${t('Да, след уточняване на количеството и наличността.','Yes, after we confirm your order quantity and check stock.')}</p></details></div></div></div><footer class="site-footer"><span class="footer-hours">${icon('clock')}${t('Пн–Пт · 08:00–18:00','Mon–Fri · 08:00–18:00')}</span>${icon('box')}</footer>`;
const labels=[...article.querySelectorAll('.callout')],notes=[['catalog',t('Избор на<br>продукт','Choose a<br>product')],['specs',t('Всички<br>детайли','All the<br>details')],['cart',t('Поръчки<br>онлайн','Order<br>online')]];labels.forEach((e,i)=>{e.dataset.target=notes[i][0];e.innerHTML='<span>'+notes[i][1]+'</span>'});
canvas.querySelector('.shop-scroll').addEventListener('scroll',()=>dispatchEvent(new Event('resize')),{passive:true});canvas.querySelectorAll('img').forEach(img=>{if(!img.complete)img.addEventListener('load',()=>dispatchEvent(new Event('resize')),{once:true})});requestAnimationFrame(()=>dispatchEvent(new Event('resize')));
}
site.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;if(b.hasAttribute('data-shop-product')){selected=Number(b.dataset.shopProduct);quantity=1;render();site.querySelector('[data-shop-product="'+selected+'"]').focus({preventScroll:true})}if(b.hasAttribute('data-shop-quantity')){quantity=Math.max(1,Math.min(99,quantity+Number(b.dataset.shopQuantity)));site.querySelector('output').textContent=quantity;site.querySelector('[data-shop-quantity="-1"]').disabled=quantity===1}if(b.hasAttribute('data-shop-cart')){site.querySelector('.shop-feedback').textContent=t('Примерна поръчка: ','Demo order: ')+quantity+' × '+pair(group.products[selected].short)+' · '+euro(quantity*group.products[selected].price)+t('. Не е изпратена.','. Nothing has been sent.');dispatchEvent(new Event('resize'))}});
new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
