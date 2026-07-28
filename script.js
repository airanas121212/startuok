const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Uždaryti meniu' : 'Atidaryti meniu');
});

document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Atidaryti meniu');
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Atidaryti meniu');
    menuButton?.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!nav?.classList.contains('open') || nav.contains(event.target) || menuButton?.contains(event.target)) return;
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Atidaryti meniu');
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealItems.forEach((element) => observer.observe(element));
} else {
  revealItems.forEach((element) => element.classList.add('visible'));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Kainodaros mygtukai perkelia pasirinktą paketą į užklausą.
document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    const message = document.querySelector('#lead-form textarea[name="message"]');
    if (!message) return;
    const packageName = link.dataset.package;
    if (!message.value.trim()) {
      message.value = `Domina paketas „${packageName}“.\n\nTrumpai apie projektą: `;
    } else if (!message.value.includes(`„${packageName}“`)) {
      message.value = `Domina paketas „${packageName}“.\n\n${message.value}`;
    }
  });
});

// Statinė svetainė nieko nesiunčia automatiškai. Užpildžius formą,
// lankytojas aiškiai pasirenka: atidaryti el. pašto programą arba kopijuoti tekstą.
(() => {
  const form = document.getElementById('lead-form');
  const status = document.getElementById('form-status');
  const actions = document.getElementById('form-actions');
  const openEmailButton = document.getElementById('open-email');
  const copyButton = document.getElementById('copy-message');
  if (!form || !status || !actions || !openEmailButton || !copyButton) return;

  let lastMessage = '';
  let lastMailto = '';

  const buildMessage = () => {
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const project = String(data.get('message') || '').trim();
    return {
      name,
      email,
      project,
      subject: `Startuok projekto užklausa — ${name}`,
      body: `Vardas: ${name}\nEl. paštas: ${email}\n\nProjektas:\n${project}`
    };
  };

  const prepareMessage = () => {
    const message = buildMessage();
    lastMessage = message.body;
    lastMailto = `mailto:labas@startuok.online?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(message.body)}`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.classList.remove('error');

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = 'Užpildykite visus laukus ir patikrinkite el. pašto adresą.';
      status.classList.add('error');
      actions.hidden = true;
      return;
    }

    prepareMessage();
    actions.hidden = false;
    status.textContent = 'Laiškas paruoštas. Pasirinkite, ar atidaryti el. pašto programą, ar nukopijuoti tekstą.';
    openEmailButton.focus();
  });

  openEmailButton.addEventListener('click', () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    prepareMessage();
    status.textContent = 'Atidaroma jūsų el. pašto programa…';
    status.classList.remove('error');
    window.location.href = lastMailto;
  });

  copyButton.addEventListener('click', async () => {
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    prepareMessage();
    try {
      await navigator.clipboard.writeText(lastMessage);
      status.textContent = 'Užklausos tekstas nukopijuotas. Galite jį įklijuoti į bet kurią el. pašto programą.';
      status.classList.remove('error');
    } catch {
      status.textContent = 'Naršyklė neleido kopijuoti automatiškai. Atidarykite el. pašto programą arba nukopijuokite tekstą iš formos rankiniu būdu.';
      status.classList.add('error');
    }
  });
})();

// DUK skiltyje vienu metu paliekamas atvertas tik vienas atsakymas.
document.querySelectorAll('.accordion details').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.accordion details[open]').forEach((openItem) => {
      if (openItem !== item) openItem.removeAttribute('open');
    });
  });
});

// Interaktyvus projekto klausimynas. Viskas veikia naršyklėje ir nesiunčia duomenų į serverį.
(() => {
  const quiz = document.getElementById('project-quiz');
  const form = document.getElementById('quiz-form');
  if (!quiz || !form) return;

  const steps = [...form.querySelectorAll('.quiz-step')];
  const nextButton = form.querySelector('.quiz-next');
  const backButton = form.querySelector('.quiz-back');
  const counter = quiz.querySelector('.quiz-counter');
  const progress = quiz.querySelector('.quiz-progress span');
  const error = form.querySelector('.quiz-error');
  const result = quiz.querySelector('.quiz-result');
  const restartButton = quiz.querySelector('.quiz-restart');
  const useResultButton = document.getElementById('use-result');
  let currentStep = 0;

  const labels = {
    stage: 'Situacija', product: 'Pardavimo modelis', catalog: 'Katalogas',
    market: 'Rinka', needs: 'Reikalinga pagalba', readiness: 'Pasiruošimas', timing: 'Starto laikas'
  };

  function showStep(index) {
    currentStep = index;
    steps.forEach((step, stepIndex) => {
      const active = stepIndex === index;
      step.classList.toggle('active', active);
      step.setAttribute('aria-hidden', String(!active));
    });
    counter.textContent = `${index + 1} iš ${steps.length}`;
    progress.style.width = `${((index + 1) / steps.length) * 100}%`;
    backButton.hidden = index === 0;
    nextButton.textContent = index === steps.length - 1 ? 'Pamatyti kryptį →' : 'Toliau →';
    error.textContent = '';
  }

  function isStepValid(step) {
    return [...step.querySelectorAll('input')].some((control) => control.checked);
  }

  function collectAnswers() {
    const data = new FormData(form);
    return {
      stage: data.get('stage'), product: data.get('product'), catalog: data.get('catalog'),
      market: data.get('market'), needs: data.getAll('needs'), readiness: data.get('readiness'), timing: data.get('timing')
    };
  }

  function buildRecommendation(answers) {
    const complexCatalog = answers.catalog?.includes('500') || answers.catalog?.includes('Daugiau');
    const multiMarket = answers.market && answers.market !== 'Tik Lietuvoje';
    const migration = answers.stage?.includes('persikelti') || answers.needs.includes('Duomenų perkėlimo');
    let title = 'Pradėkite nuo aiškios Shopify projekto apimties.';
    let text = 'Pirmiausia verta susidėlioti parduotuvės struktūrą, būtiniausias integracijas ir turinį, kurio reikės realiam paleidimui.';

    if (migration) {
      title = 'Jums reikalingas suplanuotas perkėlimas į Shopify.';
      text = 'Svarbiausia būtų įvertinti duomenų kokybę, saugiai perkelti katalogą ir suplanuoti URL bei paleidimą taip, kad prekybos trikdis būtų kuo mažesnis.';
    } else if (complexCatalog || multiMarket) {
      title = 'Jums reikalinga individualiai suplanuota Shopify struktūra.';
      text = 'Didesniam katalogui ar kelioms rinkoms reikia iš anksto suplanuoti produktų logiką, kalbas, valiutas, pristatymą ir automatizavimo ribas.';
    } else if (answers.stage === 'Dar tik turiu idėją') {
      title = 'Jums tiktų nedidelis, augimui paruoštas startas.';
      text = 'Verta pradėti nuo svarbiausių produktų, aiškaus pasiūlymo ir paprasto pirkimo kelio, neapkraunant pirmos versijos funkcijomis, kurių dar nereikia.';
    }
    return { title, text };
  }

  function showResult() {
    const answers = collectAnswers();
    const recommendation = buildRecommendation(answers);
    form.hidden = true;
    result.hidden = false;
    counter.textContent = 'Baigta';
    progress.style.width = '100%';
    document.getElementById('result-title').textContent = recommendation.title;
    document.getElementById('result-text').textContent = recommendation.text;

    const summary = document.getElementById('result-summary');
    summary.replaceChildren();
    [answers.stage, answers.catalog, answers.market, answers.timing].filter(Boolean).forEach((value) => {
      const chip = document.createElement('span');
      chip.textContent = value;
      summary.append(chip);
    });

    quiz.dataset.answers = JSON.stringify(answers);
    quiz.dataset.recommendation = JSON.stringify(recommendation);
  }

  nextButton.addEventListener('click', () => {
    const step = steps[currentStep];
    if (!isStepValid(step)) {
      error.textContent = currentStep === 4
        ? 'Pasirinkite bent vieną jums aktualų punktą.'
        : 'Pasirinkite vieną atsakymą, kad galėtume tęsti.';
      return;
    }
    if (currentStep < steps.length - 1) showStep(currentStep + 1);
    else showResult();
  });

  backButton.addEventListener('click', () => {
    if (currentStep > 0) showStep(currentStep - 1);
  });

  steps.forEach((step, index) => {
    step.querySelectorAll('input[type="radio"]').forEach((input) => {
      input.addEventListener('change', () => {
        error.textContent = '';
        if (index < steps.length - 1) window.setTimeout(() => showStep(index + 1), 160);
        else window.setTimeout(showResult, 160);
      });
    });
    step.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.addEventListener('change', () => { error.textContent = ''; });
    });
  });

  restartButton.addEventListener('click', () => {
    form.reset();
    form.hidden = false;
    result.hidden = true;
    showStep(0);
  });

  useResultButton.addEventListener('click', () => {
    const answers = JSON.parse(quiz.dataset.answers || '{}');
    const recommendation = JSON.parse(quiz.dataset.recommendation || '{}');
    const message = document.querySelector('#lead-form textarea[name="message"]');
    if (message) {
      const lines = [
        'Užpildžiau projekto klausimyną.', '',
        `Rekomenduojama kryptis: ${recommendation.title || ''}`,
        ...Object.entries(answers).map(([key, value]) => `${labels[key] || key}: ${Array.isArray(value) ? value.join(', ') : value}`),
        '', 'Papildoma informacija: '
      ];
      message.value = lines.join('\n');
    }
    document.getElementById('kontaktai')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => document.querySelector('#lead-form input[name="name"]')?.focus(), 650);
  });

  showStep(0);
})();

// Hero koncepcijų karuselė.
(() => {
  const carousel = document.querySelector('.portfolio-browser');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.project-slide')];
  const dots = [...carousel.querySelectorAll('.portfolio-dots button')];
  const url = document.getElementById('project-url');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('active', active);
      dot.setAttribute('aria-current', active ? 'true' : 'false');
    });
    if (url) url.textContent = slides[index].dataset.url;
  };

  const stop = () => window.clearInterval(timer);
  const play = () => {
    stop();
    if (!reduceMotion && !document.hidden) timer = window.setInterval(() => show(index + 1), 6500);
  };

  carousel.querySelector('.portfolio-next')?.addEventListener('click', () => { show(index + 1); play(); });
  carousel.querySelector('.portfolio-prev')?.addEventListener('click', () => { show(index - 1); play(); });
  dots.forEach((dot, dotIndex) => dot.addEventListener('click', () => { show(dotIndex); play(); }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', play);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', play);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : play());

  show(0);
  play();
})();

// Mobilus CTA pasirodo tik nuslinkus už pagrindinio hero veiksmo, kad neuždengtų pirmo ekrano.
(() => {
  const mobileCta = document.querySelector('.mobile-cta');
  if (!mobileCta) return;
  const update = () => mobileCta.classList.toggle('visible', window.scrollY > 620);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();
