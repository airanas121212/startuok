clearTimeout(window.__startuokRevealFallback);
document.documentElement.classList.remove('reveal-fallback');
(() => {
  'use strict';
  const doc = document;
  const root = doc.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

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
          const animation = item.animate({ height: [`${start}px`, `${end}px`] }, { duration: 330, easing: 'cubic-bezier(.22,1,.36,1)' });
          animation.onfinish = () => { if (!opening) item.open = false; item.style.height = ''; };
        });
      }
    });
  });

  const quizForm = doc.querySelector('#quiz-form');
  if (quizForm) initQuiz(quizForm);
  const leadForm = doc.querySelector('#lead-form');
  if (leadForm) initLeadForm(leadForm);

  const mobileCta = doc.querySelector('.mobile-cta');
  if (mobileCta) {
    const update = () => doc.body.classList.toggle('mobile-cta-visible', window.scrollY > 620);
    update(); window.addEventListener('scroll', update, { passive: true });
  }

  function initQuiz(form) {
    const steps = [...form.querySelectorAll('.quiz-step')];
    const next = form.querySelector('.quiz-next');
    const back = form.querySelector('.quiz-back');
    const error = form.querySelector('.quiz-error');
    const progress = doc.querySelector('.quiz-progress span');
    const progressText = doc.querySelector('#quiz-progress-text');
    const result = doc.querySelector('.quiz-result');
    const summary = doc.querySelector('#quiz-summary');
    const direction = doc.querySelector('#quiz-direction');
    const formLink = doc.querySelector('#quiz-form-link');
    const copy = doc.querySelector('#quiz-copy');
    const context = doc.querySelector('#quiz-context');
    const contexts = [
      ['💡','Suprasti dabartinę situaciją','Tinkamas sprendimas priklauso nuo dabartinės jūsų situacijos.'],
      ['🛍️','Apibrėžti pardavimo modelį','Nuo pardavimo modelio priklauso produkto puslapis, mokėjimas ir pristatymas.'],
      ['🗂️','Įvertinti katalogo mastą','Produktų ir variantų kiekis lemia importo būdą, filtrus ir kasdienį valdymą.'],
      ['🌍','Suprasti rinkas','Kalbos, valiutos, mokesčiai ir pristatymas turi būti suplanuoti kartu.'],
      ['🧩','Atskirti tikruosius poreikius','Pažymėkite tik tai, kas turi veikti pirmoje versijoje.'],
      ['✅','Patikrinti pasiruošimą','Turinys ir duomenys dažnai lemia grafiką labiau nei programavimas.'],
      ['🚀','Suderinti realų startą','Terminas tikrinamas pagal darbų apimtį, prieigas ir jūsų verslo pasiruošimą.']
    ];
    let current = 0;

    const updateContext = () => {
      if (!context) return;
      const [icon,title,text] = contexts[current];
      const iconEl=context.querySelector('.quiz-context-icon');
      const strong=context.querySelector('strong');
      const p=context.querySelector('p');
      if(iconEl) iconEl.textContent=icon;
      if(strong) strong.textContent=title;
      if(p) p.textContent=text;
    };
    const showStep = (index) => {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, i) => step.classList.toggle('active', i === current));
      back.hidden = current === 0;
      next.textContent = current === steps.length - 1 ? 'Rodyti santrauką →' : 'Toliau →';
      error.textContent = '';
      if (progress) progress.style.width = `${((current + 1) / steps.length) * 100}%`;
      if (progressText) progressText.textContent = `${current + 1} iš ${steps.length}`;
      updateContext();
      const checked = steps[current].querySelector('input:checked');
      const firstInput = checked || steps[current].querySelector('input');
      if (firstInput) firstInput.focus({ preventScroll: true });
    };
    const validStep = () => {
      if (steps[current].querySelectorAll('input:checked').length) return true;
      error.textContent = 'Pasirinkite bent vieną atsakymą.';
      steps[current].animate?.([{transform:'translateX(0)'},{transform:'translateX(-7px)'},{transform:'translateX(7px)'},{transform:'translateX(0)'}],{duration:260});
      return false;
    };
    next.addEventListener('click', () => {
      if (!validStep()) return;
      if (current < steps.length - 1) return showStep(current + 1);
      const data = new FormData(form);
      const needs = data.getAll('needs');
      let serviceCode = 'kurimas';
      let serviceName = 'Shopify parduotuvės kūrimas';
      if (data.get('stage') === 'Noriu persikelti į Shopify' || needs.includes('Duomenų perkėlimo')) {
        serviceCode = 'migracija'; serviceName = 'Migracija į Shopify';
      } else if (needs.some((item) => item.includes('integracij'))) {
        serviceCode = 'integracijos'; serviceName = 'Shopify integracijos';
      }
      const lines = ['Shopify projekto klausimyno santrauka','',`Dabartinė situacija: ${data.get('stage')}`,`Pardavimo modelis: ${data.get('product')}`,`Katalogas: ${data.get('catalog')}`,`Rinkos: ${data.get('market')}`,`Poreikiai: ${needs.join(', ')}`,`Turinio parengtis: ${data.get('readiness')}`,`Pageidaujama paleidimo data: ${data.get('timing')}`,'',`Rekomenduojama paslaugos kryptis: ${serviceName}`,'','Papildoma informacija:'];
      const text = lines.join('\n');
      try { sessionStorage.setItem('startuokBrief', text); } catch (_) {}
      summary.value = text; direction.textContent = serviceName;
      formLink.href = `../aptarti-projekta/index.html?from=klausimynas&service=${serviceCode}`;
      form.hidden = true; doc.querySelector('.quiz-meta').hidden = true; result.classList.add('active');
      result.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
    back.addEventListener('click', () => showStep(current - 1));
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(summary.value); copy.textContent = 'Nukopijuota'; }
      catch (_) { summary.select(); doc.execCommand('copy'); copy.textContent = 'Nukopijuota'; }
    });
    showStep(0);
  }

  function initLeadForm(form) {
    const status = form.querySelector('.form-status');
    const copyButton = form.querySelector('.copy-message');
    const messageField = form.elements.message;
    const serviceField = form.elements.service;
    const prefillNote = doc.querySelector('.prefill-note');
    const params = new URLSearchParams(window.location.search);
    const serviceMap = { kurimas:'Shopify parduotuvės kūrimas', migracija:'Migracija į Shopify', integracijos:'Shopify integracijos', kita:'Kita situacija' };
    const requestedService = params.get('service');
    if (requestedService && serviceMap[requestedService]) serviceField.value = serviceMap[requestedService];
    if (params.get('from') === 'klausimynas') {
      try { const brief = sessionStorage.getItem('startuokBrief'); if (brief && !messageField.value) { messageField.value = brief; prefillNote?.classList.add('active'); } } catch (_) {}
    }
    const compose = () => {
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const company = String(data.get('company') || '').trim();
      const service = String(data.get('service') || '').trim();
      const budget = String(data.get('budget') || '').trim();
      const timing = String(data.get('timing') || '').trim();
      const message = String(data.get('message') || '').trim();
      const body = [`Vardas: ${name}`,`El. paštas: ${email}`,company ? `Įmonė / svetainė: ${company}` : '',`Paslauga: ${service}`,budget ? `Biudžeto orientyras: ${budget}` : '',timing ? `Pageidaujama paleidimo data: ${timing}` : '','','Projekto situacija:',message].filter(Boolean).join('\n');
      return { name, service, body };
    };
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); status.textContent='Patikrinkite privalomus laukus.'; return; }
      const mail = compose(); const subject = `[Startuok] ${mail.service} – ${mail.name}`;
      status.textContent = 'Paruoštas laiškas. Jeigu el. pašto programa neatsidarė, nukopijuokite užklausą.';
      copyButton.hidden = false;
      window.location.href = `mailto:labas@startuok.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mail.body)}`;
    });
    copyButton.addEventListener('click', async () => {
      const mail = compose();
      try { await navigator.clipboard.writeText(mail.body); copyButton.textContent = 'Užklausa nukopijuota'; }
      catch (_) { const helper=doc.createElement('textarea'); helper.value=mail.body; helper.style.cssText='position:fixed;opacity:0'; doc.body.appendChild(helper); helper.select(); doc.execCommand('copy'); helper.remove(); copyButton.textContent='Užklausa nukopijuota'; }
    });
  }
})();
