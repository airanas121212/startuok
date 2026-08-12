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
  if (window.emailjs) emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

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
  initConsentBanner();

  const mobileCta = doc.querySelector('.mobile-cta');
  if (mobileCta) {
    const update = () => doc.body.classList.toggle('mobile-cta-visible', window.scrollY > 620);
    update(); window.addEventListener('scroll', update, { passive: true });
  }

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
      ['🚀','Suderinti realų startą','Terminas tikrinamas pagal darbų apimtį, prieigas ir jūsų verslo pasiruošimą.'],
      ['📩','Peržiūrėti ir išsiųsti','Atsakymus galite pakeisti čia pat — grįžti atgal nereikia.']
    ];
    const sentContext = ['✅','Užklausa gauta','Netrukus atsakysime jūsų nurodytu kontaktu.'];
    let current = 0;
    let serviceName = '';
    let sending = false;
    let submitted = false;

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

    // Equal height for every step, so the card never grows or shrinks as the
    // visitor moves through it. Skipped on phones, where the closing step is a
    // single column and the page scrolls anyway.
    const equalise = () => {
      if (!stepsWrap) return;
      stepsWrap.style.minHeight = '';
      if (window.innerWidth <= 680) return;
      closePanels();
      let tallest = 0;
      steps.forEach((step) => {
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
      steps[current].animate?.([{ transform: 'translateX(0)' }, { transform: 'translateX(-7px)' }, { transform: 'translateX(7px)' }, { transform: 'translateX(0)' }], { duration: 260 });
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
      if (!window.emailjs) {
        error.textContent = 'Nepavyko prisijungti prie siuntimo paslaugos. Parašykite mums adresu labas@startuok.online.';
        return;
      }
      sending = true;
      next.disabled = true;
      next.textContent = 'Siunčiama…';
      try {
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
    const copyButton = form.querySelector('.copy-message');
    const submitButton = form.querySelector('button[type="submit"]');
    const messageField = form.elements.message;
    const serviceField = form.elements.service;
    const hpField = form.elements.lead_hp;
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
      const phone = String(data.get('phone') || '').trim();
      const company = String(data.get('company') || '').trim();
      const service = String(data.get('service') || '').trim();
      const budget = String(data.get('budget') || '').trim();
      const timing = String(data.get('timing') || '').trim();
      const message = String(data.get('message') || '').trim();
      const body = [`Vardas: ${name}`,`El. paštas: ${email}`,phone ? `Telefonas: ${phone}` : '',company ? `Įmonė / svetainė: ${company}` : '',`Paslauga: ${service}`,budget ? `Biudžeto orientyras: ${budget}` : '',timing ? `Pageidaujama paleidimo data: ${timing}` : '','','Projekto situacija:',message].filter(Boolean).join('\n');
      return { name, email, phone, company, service, budget, timing, message, body };
    };
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); status.textContent='Patikrinkite privalomus laukus.'; return; }
      const mail = compose();
      if (hpField && hpField.value) {
        status.textContent = 'Užklausa išsiųsta. Netrukus atsakysime.';
        return;
      }
      if (!window.emailjs) {
        status.textContent = 'Nepavyko prisijungti prie siuntimo paslaugos. Nukopijuokite užklausą ir atsiųskite ją tiesiogiai.';
        copyButton.hidden = false;
        return;
      }
      submitButton.disabled = true;
      status.textContent = 'Siunčiama…';
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_OWNER, {
          source: 'Aptarti projektą',
          name: mail.name, email: mail.email, phone: mail.phone, company: mail.company,
          service: mail.service, budget: mail.budget, timing: mail.timing, message: mail.message,
          submitted_at: new Date().toLocaleString('lt-LT')
        });
        status.textContent = 'Užklausa išsiųsta. Netrukus atsakysime.';
        copyButton.hidden = true;
      } catch (_) {
        submitButton.disabled = false;
        status.textContent = 'Nepavyko išsiųsti. Pabandykite dar kartą arba nukopijuokite užklausą ir atsiųskite ją tiesiogiai.';
        copyButton.hidden = false;
      }
    });
    copyButton.addEventListener('click', async () => {
      const mail = compose();
      try { await navigator.clipboard.writeText(mail.body); copyButton.textContent = 'Užklausa nukopijuota'; }
      catch (_) { const helper=doc.createElement('textarea'); helper.value=mail.body; helper.style.cssText='position:fixed;opacity:0'; doc.body.appendChild(helper); helper.select(); doc.execCommand('copy'); helper.remove(); copyButton.textContent='Užklausa nukopijuota'; }
    });
  }

  // Cookie / analytics consent banner. GA4 is loaded with Consent Mode v2 defaults
  // set to "denied" in each page's <head>; this banner is the only thing that can
  // flip analytics_storage etc. to "granted" (see privatumas.html for details).
  function initConsentBanner() {
    const STORAGE_KEY = 'startuok_consent';
    const subfolderPattern = /\/(klausimynas|aptarti-projekta|migracija-i-shopify|shopify-integracijos|shopify-parduotuviu-kurimas)\//;
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
        <button type="button" class="button button-outline button-small" data-consent="reject">Tik būtini</button>
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
