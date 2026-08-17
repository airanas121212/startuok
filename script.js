clearTimeout(window.__startuokRevealFallback);
document.documentElement.classList.remove('reveal-fallback');
(() => {
  'use strict';
  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  // EmailJS: one service, one "owner" template. The owner template's Auto-Reply
  // (configured in the EmailJS dashboard) sends the client-facing confirmation —
  // sending() below only ever calls the owner template directly.
  const EMAILJS_PUBLIC_KEY = 'pBvtjfxx2nfJ3EDbX';
  const EMAILJS_SERVICE_ID = 'service_wecyxbs';
  const EMAILJS_TEMPLATE_OWNER = 'template_a23adxe';
  let emailJsPromise = null;
  let emailJsInitialised = false;
  const initialiseEmailJs = () => {
    if (!window.emailjs || emailJsInitialised) return;
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    emailJsInitialised = true;
  };
  const loadEmailJs = () => {
    if (window.emailjs) {
      initialiseEmailJs();
      return Promise.resolve(window.emailjs);
    }
    if (emailJsPromise) return emailJsPromise;
    emailJsPromise = new Promise((resolve, reject) => {
      const script = doc.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.async = true;
      script.onload = () => { initialiseEmailJs(); resolve(window.emailjs); };
      script.onerror = () => { emailJsPromise = null; reject(new Error('EmailJS failed to load')); };
      doc.head.appendChild(script);
    });
    return emailJsPromise;
  };

  const analyticsConsentGranted = () => {
    try { return localStorage.getItem('startuok_consent') === 'granted'; }
    catch (_) { return false; }
  };
  const trackEvent = (name, parameters = {}) => {
    if (!analyticsConsentGranted() || typeof window.gtag !== 'function') return;
    window.gtag('event', name, {
      page_path: `${location.pathname}${location.hash}`,
      ...parameters
    });
  };

  doc.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('[data-track]');
    if (!link) return;
    trackEvent(link.dataset.track, {
      link_text: link.textContent.trim().replace(/\s+/g, ' '),
      cta_location: link.dataset.trackLocation || 'page',
      service: link.dataset.service || undefined
    });
  });

  requestAnimationFrame(() => requestAnimationFrame(() => doc.body.classList.add('is-ready')));

  const currentYear = new Date().getFullYear();
  doc.querySelectorAll('[data-current-year]').forEach((year) => {
    year.textContent = currentYear;
  });
  doc.querySelectorAll('.copyright').forEach((copyright) => {
    copyright.setAttribute('aria-label', `© ${currentYear} Startuok`);
  });

  // Header and menu.
  const header = doc.querySelector('.site-header');
  const menuButton = doc.querySelector('.menu-toggle');
  const nav = doc.querySelector('.nav');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = (returnFocus = false) => {
    if (!menuButton || !nav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Atidaryti meniu');
    nav.classList.remove('open');
    doc.body.classList.remove('nav-open');
    if (returnFocus) menuButton.focus();
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'Atidaryti meniu' : 'Uždaryti meniu');
      nav.classList.toggle('open', !open);
      doc.body.classList.toggle('nav-open', !open);
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
    doc.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(true); });
    doc.addEventListener('click', (event) => {
      if (!nav.classList.contains('open') || nav.contains(event.target) || menuButton.contains(event.target)) return;
      closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && nav.classList.contains('open')) closeMenu();
    }, { passive: true });
  }

  // Scroll reveal: one calm entrance per element.
  const revealItems = [...doc.querySelectorAll('.reveal')];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -5% 0px' });
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) item.classList.add('visible');
      else revealObserver.observe(item);
    });
  } else revealItems.forEach((item) => item.classList.add('visible'));

  // Active homepage navigation section.
  const sectionLinks = [...doc.querySelectorAll('.nav a[href*="#"]')];
  const observedSections = sectionLinks.map((link) => {
    const hash = link.getAttribute('href')?.split('#')[1];
    return hash ? { link, section: doc.getElementById(hash) } : null;
  }).filter((item) => item?.section);
  if (observedSections.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach((link) => link.classList.remove('is-active'));
      observedSections.find((item) => item.section === visible.target)?.link.classList.add('is-active');
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0,.2,.6] });
    observedSections.forEach((item) => navObserver.observe(item.section));
  }

  // Subtle pointer spotlight on premium cards.
  if (finePointer && !reduceMotion) {
    doc.querySelectorAll('.interactive-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  // Hero showcase: deliberate manual controls, swipe and subtle 3D response.
  const carousel = doc.querySelector('.portfolio-browser');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.project-slide')];
    const dots = [...carousel.querySelectorAll('.portfolio-dots button')];
    const url = doc.getElementById('project-url');
    let index = 0;
    let touchStartX = 0;
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });
      if (url) url.textContent = slides[index]?.dataset.url || '';
    };
    carousel.querySelector('.portfolio-next')?.addEventListener('click', () => show(index + 1));
    carousel.querySelector('.portfolio-prev')?.addEventListener('click', () => show(index - 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
    carousel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0]?.clientX || 0; }, { passive: true });
    carousel.addEventListener('touchend', (event) => {
      const distance = (event.changedTouches[0]?.clientX || 0) - touchStartX;
      if (Math.abs(distance) > 45) show(index + (distance < 0 ? 1 : -1));
    }, { passive: true });
    if (finePointer && !reduceMotion) {
      carousel.addEventListener('pointermove', (event) => {
        const rect = carousel.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
        carousel.style.setProperty('--tilt-y', `${x * 1.5}deg`);
        carousel.style.setProperty('--tilt-x', `${y * -1.25}deg`);
      }, { passive: true });
      carousel.addEventListener('pointerleave', () => {
        carousel.style.setProperty('--tilt-y', '0deg');
        carousel.style.setProperty('--tilt-x', '0deg');
      });
    }
    show(0);
  }

  // Timeline emphasis as each real step enters the reading area.
  doc.querySelectorAll('.animated-timeline').forEach((timeline) => {
    const items = [...timeline.querySelectorAll(':scope > li')];
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-active')); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
    }, { rootMargin: '-32% 0px -48% 0px', threshold: .15 });
    items.forEach((item) => observer.observe(item));
  });

  // Accessible accordion: only one open; animate content height when motion is allowed.
  doc.querySelectorAll('.accordion').forEach((accordion) => {
    const items = [...accordion.querySelectorAll(':scope > details')];
    items.forEach((item) => {
      const summary = item.querySelector(':scope > summary');
      const contentNodes = [...item.children].filter((node) => node !== summary);
      if (!summary || !contentNodes.length) return;
      const wrapper = doc.createElement('div');
      wrapper.className = 'details-content';
      contentNodes.forEach((node) => wrapper.appendChild(node));
      item.appendChild(wrapper);
      item.addEventListener('toggle', () => {
        if (item.open) items.forEach((other) => { if (other !== item && other.open) other.open = false; });
      });
      if (!reduceMotion) {
        summary.addEventListener('click', (event) => {
          event.preventDefault();
          const opening = !item.open;
          const start = item.offsetHeight;
          if (opening) item.open = true;
          const end = summary.offsetHeight + (opening ? wrapper.scrollHeight : 0);
          const animation = item.animate({ height: [`${start}px`, `${end}px`] }, { duration: 280, easing: 'cubic-bezier(.22,1,.36,1)' });
          animation.onfinish = () => { if (!opening) item.open = false; item.style.height = ''; };
        });
      }
    });
  });

  // Contextual pricing: one accessible panel is reused by all service cards and
  // service pages. Desktop receives a right-side drawer; phones receive a
  // full-height bottom sheet through CSS, without duplicating the price copy.
  const pricingCatalog = {
    build: {
      eyebrow: 'Kūrimo kainoraštis',
      title: 'Shopify parduotuvės kūrimas',
      lead: 'Bazinis projektas apima veikiančios parduotuvės pagrindą. Žemiau pateikiama orientacinė darbų sudėtis ir dažniausi papildomi darbai.',
      baseLabel: 'Bazinis projektas nuo',
      basePrice: '1 490 €',
      baseNote: 'Vienai rinkai, iki 50 tvarkingai paruoštų produktų, naudojant patikimą Shopify temą ir paruoštą turinį.',
      compositionTitle: 'Bazinio projekto darbų sudėtis',
      compositionNote: 'Šios dalys planuojamos kaip vienas projektas, o ne užsakomos atskirai.',
      composition: [
        { name: 'Struktūra ir baziniai nustatymai', price: 'nuo 250 €', note: 'Navigacija, kolekcijos, puslapiai ir projekto ribos.' },
        { name: 'Shopify temos pritaikymas', price: 'nuo 490 €', note: 'Spalvos, tipografija ir pagrindiniai temos blokai.' },
        { name: 'Katalogas ir pirkimo puslapiai', price: 'nuo 350 €', note: 'Iki 50 produktų, kolekcijos, produkto puslapis, krepšelis ir svarbiausi vaizdai telefone.' },
        { name: 'Mokėjimai ir pristatymas', price: 'nuo 200 €', note: 'Vienas mokėjimų ir vienas siuntų tiekėjas, tarifai ir bandomas užsakymas.' },
        { name: 'Testai, paleidimas ir mokymas', price: 'nuo 200 €', note: 'Domenas, pagrindinės patikros, perdavimas ir mokymas.' }
      ],
      extrasTitle: 'Dažniausi papildomi darbai',
      extras: [
        { name: 'Individuali temos sekcija', price: 'nuo 160 €/vnt.', note: 'Naujas administruojamas blokas, kurio nėra pasirinktoje temoje.' },
        { name: 'Papildomas puslapio šablonas', price: 'nuo 180 €/vnt.', note: 'Atskiras turinio, kolekcijos ar produkto išdėstymas.' },
        { name: 'Papildomų produktų importas', price: 'nuo 120 € / 100 produktų', note: 'Kai duomenys pateikti sutartu, tvarkingu formatu.' },
        { name: 'Papildoma rinka arba kalba', price: 'nuo 280 €', note: 'Rinkos nustatymai, domeno logika ir pagrindinės patikros.' },
        { name: 'Trečiosios šalies programėlės nustatymas', price: 'nuo 120 €', note: 'Vienos programėlės įdiegimas, nustatymas ir patikra.' }
      ],
      boundary: 'Į kainą neįskaičiuota: Shopify planas, mokama tema, programėlių mokesčiai, fotografija, tekstų rašymas ir didelės apimties duomenų tvarkymas. Ar taikomas PVM, aiškiai nurodome pasiūlyme.',
      service: 'kurimas',
      formValue: 'Shopify parduotuvės kūrimas',
      detailPath: 'shopify-parduotuviu-kurimas/index.html'
    },
    migration: {
      eyebrow: 'Migracijos kainoraštis',
      title: 'Migracija į Shopify',
      lead: 'Kainą lemia ne tik produktų skaičius. Vertiname duomenų kokybę, atkuriamas funkcijas, istoriją, puslapių adresus ir galutinio perjungimo riziką.',
      baseLabel: 'Bazinis projektas nuo',
      basePrice: '1 900 €',
      baseNote: 'Vienai parduotuvei ir iki 1 000 produktų, kai duomenys prieinami eksportu ir nereikia atkurti sudėtingų individualių funkcijų.',
      compositionTitle: 'Bazinio projekto darbų sudėtis',
      compositionNote: 'Galutinė apimtis patvirtinama tik peržiūrėjus senos platformos duomenų pavyzdį.',
      composition: [
        { name: 'Duomenų ir funkcijų peržiūra', price: 'nuo 300 €', note: 'Perkeliamų duomenų, funkcijų, puslapių adresų ir rizikų sąrašas.' },
        { name: 'Shopify parduotuvės pagrindo atkūrimas', price: 'nuo 590 €', note: 'Reikalinga pirkimo patirtis atkuriama Shopify temoje.' },
        { name: 'Bandomas importas ir sutikrinimas', price: 'nuo 420 €', note: 'Laukų susiejimas, importo bandymas ir neatitikimų sąrašas.' },
        { name: 'Puslapių adresų ir paieškos sistemų paruošimas', price: 'nuo 250 €', note: 'Svarbiausių adresų susiejimas ir nuolatiniai nukreipimai.' },
        { name: 'Galutinis importas ir perjungimas', price: 'nuo 340 €', note: 'Paskutinis atnaujinimas, domenas, patikra ir perdavimas.' }
      ],
      extrasTitle: 'Dažniausi papildomi darbai',
      extras: [
        { name: 'Papildomų produktų importas', price: 'nuo 180 € / 1 000 produktų', note: 'Kai šaltinio duomenys tvarkingi ir vienodos struktūros.' },
        { name: 'Klientų arba užsakymų istorijos importas', price: 'nuo 250 € už duomenų tipą', note: 'Apimtis priklauso nuo laukų, kiekio ir šaltinio ribojimų.' },
        { name: 'Duomenų valymas ir transformacijos', price: 'nuo 180 €', note: 'Dublikatai, trūkstamos reikšmės ir nevienodi formatai.' },
        { name: 'Papildoma rinka arba kalba', price: 'nuo 280 €', note: 'Rinkos struktūra, domenai ir pagrindinės patikros.' },
        { name: 'Papildomas duomenų perdavimas', price: 'nuo 650 €', note: 'Apskaitos, sandėlio ar kita išorinė sistema.' }
      ],
      boundary: 'Į kainą neįskaičiuota: išorinių sistemų mokesčiai, rankinis trūkstamų duomenų atkūrimas ir individualių senos platformos funkcijų perprogramavimas. Ar taikomas PVM, aiškiai nurodome pasiūlyme.',
      service: 'migracija',
      formValue: 'Migracija į Shopify',
      detailPath: 'migracija-i-shopify/index.html'
    },
    integration: {
      eyebrow: 'Integracijų kainoraštis',
      title: 'Shopify integracijos',
      lead: '650 € orientyras taikomas paprastam automatiniam duomenų perdavimui viena kryptimi. Esamos programėlės nustatymas ir individualiai kuriama jungtis yra skirtingos apimties darbai.',
      baseLabel: 'Paprasta automatizacija nuo',
      basePrice: '650 €',
      baseNote: 'Vienas aiškus duomenų perdavimas, viena kryptis ir įprastos klaidų situacijos.',
      compositionTitle: 'Paprastos automatizacijos sudėtis',
      compositionNote: 'Pavyzdžiui, perduoti apmokėtą Shopify užsakymą į vieną išorinę sistemą.',
      composition: [
        { name: 'Proceso ir duomenų taisyklės', price: 'nuo 150 €', note: 'Šaltinis, gavėjas, laukai, būsenos ir išimtys.' },
        { name: 'Sprendimo nustatymas', price: 'nuo 250 €', note: 'Programėlė arba automatizavimo įrankis pagal sutartą eigą.' },
        { name: 'Testai ir klaidų situacijos', price: 'nuo 150 €', note: 'Įprasta eiga, neteisingi duomenys ir pakartojimas.' },
        { name: 'Naudojimo aprašas ir perdavimas', price: 'nuo 100 €', note: 'Nustatymų, atsakomybių ir veiksmų sutrikus suvestinė.' }
      ],
      extrasTitle: 'Sprendimo lygiai ir papildomi darbai',
      extras: [
        { name: 'Esamos Shopify programėlės nustatymas', price: 'nuo 250 €', note: 'Kai patikima programėlė jau atlieka reikalingą darbą.' },
        { name: 'Automatinis perdavimas viena kryptimi', price: 'nuo 650 €', note: 'Vienas apibrėžtas duomenų perdavimas per automatizavimo įrankį.' },
        { name: 'Individuali jungtis viena kryptimi', price: 'nuo 1 900 €', note: 'Kai standartinės programėlės ar automatizavimo nepakanka.' },
        { name: 'Duomenų perdavimas abiem kryptimis', price: 'nuo 2 900 €', note: 'Su neatitikimų, pasikartojančių įrašų ir pagrindinės sistemos taisyklėmis.' },
        { name: 'Stebėjimas ir įspėjimai', price: 'nuo 220 €', note: 'Klaidų įrašai, pranešimai ir pakartojimo veiksmai.' }
      ],
      boundary: 'Į kainą neįskaičiuotos programėlių, automatizavimo įrankių ir išorinių sistemų licencijos. Sistemų sujungimo galimybes ir tiekėjų ribojimus įvertiname prieš pateikdami pasiūlymą. Ar taikomas PVM, aiškiai nurodome pasiūlyme.',
      service: 'integracijos',
      formValue: 'Shopify integracijos',
      detailPath: 'shopify-integracijos/index.html'
    }
  };

  function initPricingPanels() {
    const triggers = [...doc.querySelectorAll('[data-pricing-open]')];
    if (!triggers.length || typeof HTMLDialogElement === 'undefined') return;

    const nestedPage = /\/(migracija-i-shopify|shopify-integracijos|shopify-parduotuviu-kurimas|paslaugos-ir-kainos)\//.test(location.pathname);
    const prefix = nestedPage ? '../' : '';
    const dialog = doc.createElement('dialog');
    dialog.className = 'pricing-dialog';
    dialog.setAttribute('aria-labelledby', 'pricing-dialog-title');
    dialog.innerHTML = `
      <article class="pricing-panel">
        <header class="pricing-panel-head">
          <div><span class="eyebrow" data-pricing-eyebrow></span><h2 id="pricing-dialog-title" data-pricing-title></h2></div>
          <button aria-label="Uždaryti kainoraštį" class="pricing-close" type="button">×</button>
        </header>
        <div class="pricing-panel-scroll">
          <p class="pricing-lead" data-pricing-lead></p>
          <section class="pricing-summary" aria-label="Kainos pradžia">
            <div><small data-pricing-base-label></small><strong data-pricing-base-price></strong></div>
            <p data-pricing-base-note></p>
          </section>
          <section class="pricing-group">
            <div class="pricing-group-head"><h3 data-pricing-composition-title></h3><p data-pricing-composition-note></p></div>
            <div class="pricing-lines" data-pricing-composition></div>
          </section>
          <section class="pricing-group">
            <div class="pricing-group-head"><h3 data-pricing-extras-title></h3></div>
            <div class="pricing-lines" data-pricing-extras></div>
          </section>
          <p class="pricing-boundary-note" data-pricing-boundary></p>
          <a class="pricing-detail-link" data-pricing-detail href="#">Visa paslaugos apimtis <span>→</span></a>
        </div>
        <footer class="pricing-panel-footer">
          <div><strong>Tiksli kaina po trumpo aptarimo</strong><span>Rezervuokite 20 min. pokalbį — techninio plano nereikia.</span></div>
          <a class="button" data-pricing-contact data-track="booking_cta_click" data-track-location="pricing_panel" href="https://cal.com/startuok/shopify-projekto-aptarimas">Rezervuoti pokalbį</a>
        </footer>
      </article>`;
    doc.body.appendChild(dialog);

    const rowMarkup = (items) => items.map((item) => `
      <div class="pricing-line">
        <div><strong>${item.name}</strong><span>${item.note}</span></div>
        <b>${item.price}</b>
      </div>`).join('');
    let activeData = null;
    let lastTrigger = null;
    let closeTimer = null;

    const render = (data) => {
      dialog.querySelector('[data-pricing-eyebrow]').textContent = data.eyebrow;
      dialog.querySelector('[data-pricing-title]').textContent = data.title;
      dialog.querySelector('[data-pricing-lead]').textContent = data.lead;
      dialog.querySelector('[data-pricing-base-label]').textContent = data.baseLabel;
      dialog.querySelector('[data-pricing-base-price]').textContent = data.basePrice;
      dialog.querySelector('[data-pricing-base-note]').textContent = data.baseNote;
      dialog.querySelector('[data-pricing-composition-title]').textContent = data.compositionTitle;
      dialog.querySelector('[data-pricing-composition-note]').textContent = data.compositionNote;
      dialog.querySelector('[data-pricing-composition]').innerHTML = rowMarkup(data.composition);
      dialog.querySelector('[data-pricing-extras-title]').textContent = data.extrasTitle;
      dialog.querySelector('[data-pricing-extras]').innerHTML = rowMarkup(data.extras);
      dialog.querySelector('[data-pricing-boundary]').textContent = data.boundary;
      const detailLink = dialog.querySelector('[data-pricing-detail]');
      const servicePath = `/${data.detailPath.replace('index.html', '')}`;
      const currentServicePage = nestedPage && location.pathname.endsWith(servicePath);
      detailLink.href = currentServicePage ? '#apimtis' : `${prefix}${data.detailPath}`;
      detailLink.dataset.scrollTarget = currentServicePage ? 'apimtis' : '';
      detailLink.innerHTML = currentServicePage ? 'Peržiūrėti darbų apimtį <span>↓</span>' : 'Visa paslaugos apimtis <span>→</span>';
      dialog.querySelector('[data-pricing-contact]').href = 'https://cal.com/startuok/shopify-projekto-aptarimas';
      dialog.querySelector('[data-pricing-contact]').dataset.service = data.service;
      dialog.querySelector('.pricing-panel-scroll').scrollTop = 0;
    };

    const finishClose = (returnFocus = true) => {
      clearTimeout(closeTimer);
      if (dialog.open) dialog.close();
      dialog.classList.remove('is-open', 'is-closing');
      doc.body.classList.remove('pricing-open');
      if (returnFocus && lastTrigger?.isConnected) lastTrigger.focus();
    };
    const closePanel = (returnFocus = true) => {
      if (!dialog.open || dialog.classList.contains('is-closing')) return;
      dialog.classList.remove('is-open');
      dialog.classList.add('is-closing');
      if (reduceMotion) finishClose(returnFocus);
      else closeTimer = setTimeout(() => finishClose(returnFocus), 240);
    };
    const openPanel = (trigger, key) => {
      const data = pricingCatalog[key];
      if (!data) return;
      activeData = data;
      lastTrigger = trigger;
      render(data);
      dialog.classList.remove('is-closing');
      if (!dialog.open) dialog.showModal();
      doc.body.classList.add('pricing-open');
      requestAnimationFrame(() => {
        dialog.classList.add('is-open');
        dialog.querySelector('.pricing-close')?.focus({ preventScroll: true });
      });
      trackEvent('pricing_panel_open', { service: data.service });
    };

    triggers.forEach((trigger) => trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openPanel(trigger, trigger.dataset.pricingOpen);
    }));
    dialog.querySelector('.pricing-close').addEventListener('click', () => closePanel());
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); closePanel(); });
    doc.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !dialog.open) return;
      event.preventDefault();
      closePanel();
    });
    dialog.addEventListener('click', (event) => { if (event.target === dialog) closePanel(); });
    dialog.querySelector('[data-pricing-detail]').addEventListener('click', (event) => {
      const target = doc.getElementById(event.currentTarget.dataset.scrollTarget || '');
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', '#apimtis');
      closePanel(false);
      setTimeout(() => target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }), reduceMotion ? 0 : 250);
    });
  }

  initPricingPanels();

  const quizForm = doc.querySelector('#quiz-form');
  if (quizForm) initQuiz(quizForm);
  const leadForm = doc.querySelector('#lead-form');
  if (leadForm) initLeadForm(leadForm);
  initConsentBanner();

  function initQuiz(form) {
    // One continuous flow: the seven question steps and the closing review +
    // contact panel are all steps inside the same card, driven by one showStep()
    // and one primary button. The card keeps a constant height on desktop, so
    // nothing resizes or jumps between the questions and the summary.
    const questions = [...form.querySelectorAll('fieldset.quiz-step')];
    const finalStep = form.querySelector('.quiz-final');
    const stepsWrap = form.querySelector('.quiz-steps');
    const steps = finalStep ? [...questions, finalStep] : questions;
    const finalIndex = finalStep ? steps.length - 1 : -1;
    const next = form.querySelector('.quiz-next');
    const back = form.querySelector('.quiz-back');
    const navRow = form.querySelector('.quiz-nav');
    const error = form.querySelector('.quiz-error');
    const card = form.closest('.quiz-card') || form;
    const progress = doc.querySelector('.quiz-progress span');
    const progressText = doc.querySelector('#quiz-progress-text');
    const progressPrefix = doc.querySelector('#quiz-progress-prefix');
    const context = doc.querySelector('#quiz-context');
    const review = doc.querySelector('#quiz-review');
    const direction = doc.querySelector('#quiz-direction');
    const note = doc.querySelector('#quiz-note');
    const contactName = doc.querySelector('#quiz-name');
    const contactEmail = doc.querySelector('#quiz-email');
    const contactPhone = doc.querySelector('#quiz-phone');
    const contactHp = form.querySelector('input[name="quiz_hp"]');
    const contexts = [
      ['💡','Suprasti dabartinę situaciją','Tinkamas sprendimas priklauso nuo dabartinės jūsų situacijos.'],
      ['🛍️','Apibrėžti pardavimo modelį','Nuo pardavimo modelio priklauso produkto puslapis, mokėjimas ir pristatymas.'],
      ['🗂️','Įvertinti katalogo mastą','Produktų ir variantų kiekis lemia importo būdą, filtrus ir kasdienį valdymą.'],
      ['🌍','Suprasti rinkas','Kalbos, valiutos, mokesčiai ir pristatymas turi būti suplanuoti kartu.'],
      ['🧩','Atskirti tikruosius poreikius','Pažymėkite tik tai, kas turi veikti pirmoje versijoje.'],
      ['✅','Patikrinti pasiruošimą','Turinys ir duomenys dažnai lemia grafiką labiau nei programavimas.'],
      ['🚀','Suderinti realų startą','Terminas tikrinamas pagal darbų apimtį, prieigas ir tai, ar turite reikalingą turinį bei sprendimus.'],
      ['📩','Peržiūrėti ir išsiųsti','Atsakymus galite pakeisti čia pat — grįžti atgal nereikia.']
    ];
    const sentContext = ['✅','Užklausa gauta','Netrukus atsakysime jūsų nurodytu kontaktu.'];
    let current = 0;
    let serviceName = '';
    let sending = false;
    let submitted = false;
    let quizStarted = false;
    form.addEventListener('change', () => {
      if (quizStarted) return;
      quizStarted = true;
      trackEvent('quiz_start');
    });

    const onFinal = () => current === finalIndex;

    // Read the questions straight out of the markup, so the review list can never
    // drift out of sync with the steps above it.
    const schema = questions.map((step) => {
      const legend = step.querySelector('legend');
      const emoji = legend?.querySelector('.step-emoji')?.textContent || '•';
      const title = [...(legend?.childNodes || [])]
        .filter((n) => n.nodeType === 3 || !n.classList?.contains('step-emoji'))
        .map((n) => n.textContent).join('').trim();
      const inputs = [...step.querySelectorAll('input')];
      return {
        step, emoji, title,
        name: inputs[0]?.name || '',
        multiple: inputs[0]?.type === 'checkbox',
        options: inputs.map((input) => ({
          input,
          value: input.value,
          label: input.closest('label')?.querySelector('b')?.textContent?.trim() || input.value,
          icon: input.closest('label')?.querySelector('.quiz-emoji')?.textContent || ''
        }))
      };
    });

    const chosen = (entry) => entry.options.filter((option) => option.input.checked);
    const answerText = (entry) => chosen(entry).map((option) => option.label).join(', ');

    const recommend = () => {
      const stage = schema.find((entry) => entry.name === 'stage');
      const needsEntry = schema.find((entry) => entry.name === 'needs');
      const stageValue = chosen(stage || { options: [] })[0]?.value || '';
      const needs = chosen(needsEntry || { options: [] }).map((option) => option.value);
      if (stageValue === 'Noriu persikelti į Shopify' || needs.includes('Duomenų perkėlimo')) return 'Migracija į Shopify';
      if (needs.some((item) => item.includes('integracij'))) return 'Shopify integracijos';
      return 'Shopify parduotuvės kūrimas';
    };

    const brief = () => {
      const lines = ['Shopify projekto klausimyno santrauka', ''];
      schema.forEach((entry) => lines.push(`${entry.title} ${answerText(entry)}`));
      lines.push('', `Rekomenduojama paslaugos kryptis: ${serviceName}`);
      const extra = (note?.value || '').trim();
      if (extra) lines.push('', 'Papildoma informacija:', extra);
      return lines.join('\n');
    };

    const syncDirection = () => {
      serviceName = recommend();
      if (direction) direction.textContent = serviceName;
      try { sessionStorage.setItem('startuokBrief', brief()); } catch (_) {}
    };

    // Review list. Every answer is a row that opens its own options in place —
    // editing never sends the visitor back through the earlier steps.
    const closePanels = (except) => {
      review?.querySelectorAll('.review-item.is-open').forEach((item) => {
        if (item === except) return;
        item.classList.remove('is-open');
        item.querySelector('.review-head')?.setAttribute('aria-expanded', 'false');
        item.querySelector('.review-options')?.setAttribute('hidden', '');
      });
    };

    const buildReview = () => {
      if (!review) return;
      review.textContent = '';
      schema.forEach((entry, index) => {
        const item = doc.createElement('div');
        item.className = 'review-item';

        const head = doc.createElement('button');
        head.type = 'button';
        head.className = 'review-head';
        head.setAttribute('aria-expanded', 'false');
        head.innerHTML = `<span aria-hidden="true" class="review-icon"></span><span class="review-text"><small></small><strong></strong></span><span aria-hidden="true" class="review-action">Keisti</span>`;
        head.querySelector('.review-icon').textContent = entry.emoji;
        head.querySelector('small').textContent = entry.title;

        const panel = doc.createElement('div');
        panel.className = 'review-options';
        panel.hidden = true;
        entry.options.forEach((option) => {
          const chip = doc.createElement('button');
          chip.type = 'button';
          chip.className = 'review-chip';
          chip.innerHTML = '<span aria-hidden="true"></span><b></b>';
          chip.firstChild.textContent = option.icon;
          chip.querySelector('b').textContent = option.label;
          chip.addEventListener('click', () => {
            if (entry.multiple) {
              if (option.input.checked && chosen(entry).length === 1) return;
              option.input.checked = !option.input.checked;
            } else {
              entry.options.forEach((other) => { other.input.checked = false; });
              option.input.checked = true;
            }
            paintRow(index);
            syncDirection();
            if (!entry.multiple) closePanels();
          });
          panel.appendChild(chip);
        });

        head.addEventListener('click', () => {
          const open = item.classList.contains('is-open');
          closePanels(item);
          item.classList.toggle('is-open', !open);
          head.setAttribute('aria-expanded', String(!open));
          panel.hidden = open;
        });

        item.append(head, panel);
        review.appendChild(item);
      });
      schema.forEach((_, index) => paintRow(index));
    };

    function paintRow(index) {
      const item = review?.children[index];
      if (!item) return;
      const entry = schema[index];
      item.querySelector('.review-text strong').textContent = answerText(entry) || '—';
      const selected = new Set(chosen(entry).map((option) => option.value));
      [...item.querySelectorAll('.review-chip')].forEach((chip, i) => {
        chip.classList.toggle('is-active', selected.has(entry.options[i].value));
        chip.setAttribute('aria-pressed', String(selected.has(entry.options[i].value)));
      });
    }

    const updateContext = () => {
      if (!context) return;
      const entry = submitted ? sentContext : contexts[current];
      if (!entry) return;
      const [icon, title, text] = entry;
      const iconEl = context.querySelector('.quiz-context-icon');
      const strong = context.querySelector('strong');
      const p = context.querySelector('p');
      if (iconEl) iconEl.textContent = icon;
      if (strong) strong.textContent = title;
      if (p) p.textContent = text;
    };

    const updateProgress = () => {
      const last = onFinal();
      if (progress) progress.style.width = last ? '100%' : `${((current + 1) / questions.length) * 100}%`;
      if (progressPrefix) progressPrefix.hidden = last;
      if (progressText) progressText.textContent = last ? (submitted ? 'Užklausa išsiųsta' : 'Paskutinis žingsnis') : `${current + 1} iš ${questions.length}`;
    };

    // Keep question steps equally tall without sizing every question to the much
    // larger final review. The review may grow naturally and the page can scroll.
    // On phones every step uses its own content height.
    const equalise = () => {
      if (!stepsWrap) return;
      stepsWrap.style.minHeight = '';
      if (window.innerWidth <= 680) return;
      closePanels();
      let tallest = 0;
      questions.forEach((step) => {
        const active = step.classList.contains('active');
        if (!active) step.style.cssText = 'display:block;position:absolute;visibility:hidden;left:0;right:0;top:0';
        tallest = Math.max(tallest, step.offsetHeight);
        if (!active) step.style.cssText = '';
      });
      if (tallest) stepsWrap.style.minHeight = `${tallest}px`;
    };

    // Keep the card anchored under the header instead of jumping the page:
    // scroll only when the top of the card has drifted out of view.
    const keepInView = () => {
      const top = card.getBoundingClientRect().top;
      const offset = (header?.offsetHeight || 0) + 18;
      if (top >= offset - 1) return;
      window.scrollTo({ top: Math.max(window.scrollY + top - offset, 0), behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    const showStep = (index, options = {}) => {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, i) => step.classList.toggle('active', i === current));
      back.hidden = current === 0 || submitted;
      next.textContent = onFinal() ? 'Siųsti užklausą' : (current === questions.length - 1 ? 'Peržiūrėti santrauką →' : 'Toliau →');
      error.textContent = '';
      updateProgress();
      updateContext();
      if (options.scroll) keepInView();
      if (options.focus === false) return;
      if (onFinal()) { finalStep.focus({ preventScroll: true }); return; }
      const checked = steps[current].querySelector('input:checked');
      (checked || steps[current].querySelector('input'))?.focus({ preventScroll: true });
    };

    const validStep = () => {
      if (steps[current].querySelectorAll('input:checked').length) return true;
      error.textContent = 'Pasirinkite bent vieną atsakymą.';
      steps[current].animate?.([{ transform: 'translateX(0)' }, { transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 220 });
      return false;
    };

    const markSent = () => {
      submitted = true;
      error.textContent = '';
      finalStep.classList.add('is-sent');
      const sent = doc.querySelector('#quiz-sent');
      if (sent) sent.hidden = false;
      if (navRow) navRow.hidden = true;
      if (stepsWrap) stepsWrap.style.minHeight = '';
      const emoji = doc.querySelector('#quiz-final-emoji');
      const eyebrow = doc.querySelector('#quiz-final-eyebrow');
      const title = doc.querySelector('#quiz-final-title');
      if (emoji) emoji.textContent = '📬';
      if (eyebrow) eyebrow.textContent = 'Baigta';
      if (title) title.textContent = 'Ačiū — užklausa išsiųsta';
      doc.querySelector('.quiz-meta')?.classList.add('is-sent');
      updateProgress();
      updateContext();
      if (sent) sent.focus?.({ preventScroll: true });
    };

    const send = async () => {
      if (sending || submitted) return;
      const name = (contactName?.value || '').trim();
      const email = (contactEmail?.value || '').trim();
      const phone = (contactPhone?.value || '').trim();
      error.textContent = '';
      if (!name) { error.textContent = 'Įveskite vardą.'; contactName?.focus(); return; }
      if (!email && !phone) { error.textContent = 'Nurodykite el. paštą arba telefoną.'; contactEmail?.focus(); return; }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { error.textContent = 'Patikrinkite el. pašto adresą.'; contactEmail?.focus(); return; }
      if (contactHp && contactHp.value) { markSent(); return; }
      sending = true;
      next.disabled = true;
      next.textContent = 'Siunčiama…';
      try {
        await loadEmailJs();
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_OWNER, {
          source: 'Klausimynas',
          name, email, phone,
          company: '',
          service: serviceName,
          budget: '',
          timing: '',
          message: brief(),
          submitted_at: new Date().toLocaleString('lt-LT')
        });
        trackEvent('quiz_complete', { service: serviceName });
        markSent();
      } catch (_) {
        error.textContent = 'Nepavyko išsiųsti. Pabandykite dar kartą arba parašykite adresu labas@startuok.online.';
        next.textContent = 'Siųsti užklausą';
      } finally {
        sending = false;
        next.disabled = submitted;
      }
    };

    const advance = () => {
      if (submitted) return;
      if (onFinal()) return send();
      if (!validStep()) return;
      if (current === questions.length - 1) { schema.forEach((_, i) => paintRow(i)); syncDirection(); }
      showStep(current + 1, { scroll: true });
    };

    next.addEventListener('click', advance);
    back.addEventListener('click', () => { closePanels(); showStep(current - 1, { scroll: true }); });

    // The contact fields live inside the quiz form, so keep Enter useful instead
    // of letting it reload the page.
    form.addEventListener('submit', (event) => { event.preventDefault(); advance(); });
    form.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.shiftKey) return;
      const target = event.target;
      if (!target || target.tagName === 'TEXTAREA' || target.tagName === 'BUTTON') return;
      event.preventDefault();
      advance();
    });
    note?.addEventListener('input', () => { try { sessionStorage.setItem('startuokBrief', brief()); } catch (_) {} });

    buildReview();
    syncDirection();
    showStep(0, { focus: false });
    requestAnimationFrame(equalise);
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(equalise, 160);
    }, { passive: true });
  }

  function initLeadForm(form) {
    const status = form.querySelector('.form-status');
    const submit = form.querySelector('[type="submit"]');
    const success = form.querySelector('.form-success');
    const messageField = form.elements.message;
    const serviceField = form.elements.service;
    const honeypot = form.elements.lead_hp;
    const prefillNote = form.querySelector('.prefill-note');
    const params = new URLSearchParams(window.location.search);
    const serviceMap = {
      kurimas: 'Shopify parduotuvės kūrimas',
      migracija: 'Migracija į Shopify',
      integracijos: 'Shopify integracijos',
      kita: 'Kita situacija'
    };
    const requestedService = params.get('service');
    if (requestedService && serviceMap[requestedService]) {
      serviceField.value = serviceMap[requestedService];
    }
    if (params.get('from') === 'klausimynas') {
      try {
        const brief = sessionStorage.getItem('startuokBrief');
        if (brief && !messageField.value) {
          messageField.value = brief;
          prefillNote?.classList.add('active');
        }
      } catch (_) {}
    }

    let sending = false;
    const showSuccess = () => {
      form.classList.add('is-sent');
      if (success) {
        success.hidden = false;
        success.focus({ preventScroll: true });
      }
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (sending || form.classList.contains('is-sent')) return;
      status.classList.remove('is-error');
      status.textContent = '';
      if (!form.checkValidity()) {
        form.reportValidity();
        status.classList.add('is-error');
        status.textContent = 'Patikrinkite privalomus laukus.';
        return;
      }
      if (honeypot?.value) {
        showSuccess();
        return;
      }

      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const company = String(data.get('company') || '').trim();
      const service = String(data.get('service') || '').trim();
      const budget = String(data.get('budget') || '').trim();
      const timing = String(data.get('timing') || '').trim();
      const message = String(data.get('message') || '').trim();

      sending = true;
      submit.disabled = true;
      submit.textContent = 'Siunčiama…';
      try {
        await loadEmailJs();
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_OWNER, {
          source: 'Projekto forma',
          name,
          email,
          phone: '',
          company,
          service,
          budget,
          timing,
          message,
          submitted_at: new Date().toLocaleString('lt-LT')
        });
        trackEvent('project_form_submit', { service });
        showSuccess();
      } catch (_) {
        status.classList.add('is-error');
        status.textContent = 'Užklausos išsiųsti nepavyko. Pabandykite dar kartą.';
        submit.disabled = false;
        submit.textContent = 'Siųsti užklausą';
      } finally {
        sending = false;
      }
    });
  }

  // Cookie / analytics consent banner. GA4 is loaded with Consent Mode v2 defaults
  // set to "denied" in each page's <head>; this banner is the only thing that can
  // flip analytics_storage etc. to "granted" (see privatumas.html for details).
  function initConsentBanner() {
    const STORAGE_KEY = 'startuok_consent';
    const subfolderPattern = /\/(klausimynas|kontaktai|aptarti-projekta|migracija-i-shopify|shopify-integracijos|shopify-parduotuviu-kurimas)\//;
    const prefix = subfolderPattern.test(location.pathname) ? '../' : '';
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (_) {}

    const banner = doc.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Slapukų nustatymai');
    banner.innerHTML = `
      <div class="consent-banner-text">
        <strong>Naudojame analitikos slapukus.</strong>
        <p>Tai padeda suprasti, kaip lankytojai naudojasi svetaine. Įjungiami tik gavus jūsų sutikimą. <a href="${prefix}privatumas.html">Privatumo informacija</a></p>
      </div>
      <div class="consent-banner-actions">
        <button type="button" class="consent-secondary" data-consent="reject">Tik būtini slapukai</button>
        <button type="button" class="button button-small" data-consent="accept">Sutinku</button>
      </div>`;
    doc.body.appendChild(banner);

    const applyConsent = (value) => {
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          ad_storage: value,
          ad_user_data: value,
          ad_personalization: value,
          analytics_storage: value
        });
      }
      try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
    };
    const show = () => { banner.classList.add('visible'); doc.body.classList.add('consent-open'); };
    const hide = () => { banner.classList.remove('visible'); doc.body.classList.remove('consent-open'); };

    banner.querySelector('[data-consent="accept"]').addEventListener('click', () => { applyConsent('granted'); hide(); });
    banner.querySelector('[data-consent="reject"]').addEventListener('click', () => { applyConsent('denied'); hide(); });

    if (!stored) requestAnimationFrame(() => requestAnimationFrame(show));

    // Let visitors reopen their choice later from the footer, on any page.
    const footerInfo = doc.querySelector('.footer-links > div:last-child');
    if (footerInfo) {
      const manage = doc.createElement('a');
      manage.href = '#';
      manage.textContent = 'Slapukų nustatymai';
      manage.addEventListener('click', (event) => { event.preventDefault(); show(); });
      const copyrightEl = footerInfo.querySelector('.copyright');
      if (copyrightEl) footerInfo.insertBefore(manage, copyrightEl);
      else footerInfo.appendChild(manage);
    }
  }
})();
