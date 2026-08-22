clearTimeout(window.__startuokRevealFallback);
document.documentElement.classList.remove('reveal-fallback');

// Give the browser one paint opportunity for the LCP logo before homepage
// enhancements read layout or append below-the-fold interface elements.
requestAnimationFrame(() => setTimeout(() => {
(() => {
  'use strict';

  const doc = document;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const siteRootUrl = new URL('.', doc.currentScript?.src || location.href);
  const sitePath = (relativePath) => new URL(relativePath, siteRootUrl).pathname;

  // Keep clean directory links usable when the homepage is previewed from disk.
  if (location.protocol === 'file:') {
    const rewriteFilePreviewLinks = (scope) => {
      const anchors = [];
      if (scope.matches?.('a[href]')) anchors.push(scope);
      if (scope.querySelectorAll) anchors.push(...scope.querySelectorAll('a[href]'));

      anchors.forEach((anchor) => {
        const href = anchor.getAttribute('href');
        if (!href) return;

        try {
          const target = href.startsWith('/') && !href.startsWith('//')
            ? new URL(href.replace(/^\/+/, ''), siteRootUrl)
            : new URL(href, location.href);
          if (target.protocol !== 'file:' || !target.pathname.endsWith('/')) return;
          target.pathname += 'index.html';
          anchor.href = target.href;
        } catch (_) {
          // Leave malformed or non-navigation values to the browser.
        }
      });
    };

    rewriteFilePreviewLinks(doc);
    new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === 'attributes') rewriteFilePreviewLinks(record.target);
        record.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) rewriteFilePreviewLinks(node);
        });
      });
    }).observe(doc.documentElement, {
      attributes: true,
      attributeFilter: ['href'],
      childList: true,
      subtree: true
    });
  }

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

  doc.body.classList.add('is-ready');

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

  // Scroll reveal.
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
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  // Active homepage navigation section.
  const sectionLinks = [...doc.querySelectorAll('.nav a[href*="#"]')];
  const observedSections = sectionLinks.map((link) => {
    const hash = link.getAttribute('href')?.split('#')[1];
    return hash ? { link, section: doc.getElementById(hash) } : null;
  }).filter((item) => item?.section);
  if (observedSections.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      sectionLinks.forEach((link) => link.classList.remove('is-active'));
      observedSections.find((item) => item.section === visible.target)?.link.classList.add('is-active');
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .2, .6] });
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

  // Hero showcase controls, swipe and subtle pointer response.
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
    carousel.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0]?.clientX || 0;
    }, { passive: true });
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

  function initConsentBanner() {
    const storageKey = 'startuok_consent';
    let stored = null;
    try { stored = localStorage.getItem(storageKey); } catch (_) {}

    const banner = doc.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Slapukų nustatymai');
    banner.innerHTML = `
      <div class="consent-banner-text">
        <p>Naudoju analitikos slapukus, kad matyčiau, kaip lankotės svetainėje. <a href="${sitePath('privatumas.html')}">Plačiau</a></p>
      </div>
      <div class="consent-banner-actions">
        <button type="button" class="consent-secondary" data-consent="reject">Tik būtini</button>
        <button type="button" class="button button-small" data-consent="accept">Sutinku</button>
      </div>`;
    doc.body.appendChild(banner);

    const applyConsent = (value) => {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: value,
          ad_user_data: value,
          ad_personalization: value,
          analytics_storage: value
        });
      }
      try { localStorage.setItem(storageKey, value); } catch (_) {}
    };
    const show = () => {
      banner.classList.add('visible');
      doc.body.classList.add('consent-open');
    };
    const hide = () => {
      banner.classList.remove('visible');
      doc.body.classList.remove('consent-open');
    };

    banner.querySelector('[data-consent="accept"]').addEventListener('click', () => {
      applyConsent('granted');
      hide();
    });
    banner.querySelector('[data-consent="reject"]').addEventListener('click', () => {
      applyConsent('denied');
      hide();
    });
    if (!stored) requestAnimationFrame(() => requestAnimationFrame(show));

    const footerInfo = doc.querySelector('.footer-links > div:last-child');
    if (footerInfo) {
      const manage = doc.createElement('a');
      manage.href = '#';
      manage.textContent = 'Slapukų nustatymai';
      manage.addEventListener('click', (event) => {
        event.preventDefault();
        show();
      });
      const copyrightEl = footerInfo.querySelector('.copyright');
      if (copyrightEl) footerInfo.insertBefore(manage, copyrightEl);
      else footerInfo.appendChild(manage);
    }
  }

  function initQuizWidget() {
    const widget = doc.createElement('div');
    widget.className = 'quiz-widget';
    widget.setAttribute('data-open', 'false');
    widget.innerHTML = `
      <div class="quiz-widget-panel" id="quiz-widget-panel" role="dialog" aria-label="Shopify projekto klausimynas">
        <button type="button" class="quiz-widget-close" aria-label="Uždaryti">×</button>
        <a class="quiz-widget-card" data-track="quiz_cta_click" data-track-location="floating_widget" href="${sitePath('klausimynas/')}">
          <span aria-hidden="true" class="quiz-widget-icon">🚀</span>
          <span>
            <small>Nežinote, nuo ko pradėti?</small>
            <strong>Atsakykite į 7 klausimus apie savo projektą</strong>
            <p>~2 min. · rekomenduojama kryptis ir paruošta užklausos santrauka</p>
          </span>
        </a>
      </div>
      <button type="button" class="quiz-widget-toggle" id="quiz-widget-toggle" aria-expanded="false" aria-controls="quiz-widget-panel" aria-label="Atidaryti Shopify projekto klausimyną">
        <span aria-hidden="true">?</span>
      </button>`;
    doc.body.appendChild(widget);

    const toggle = widget.querySelector('.quiz-widget-toggle');
    const closeButton = widget.querySelector('.quiz-widget-close');
    const setOpen = (open) => {
      widget.setAttribute('data-open', String(open));
      toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setOpen(widget.getAttribute('data-open') !== 'true'));
    closeButton.addEventListener('click', () => setOpen(false));
    doc.addEventListener('click', (event) => {
      if (widget.getAttribute('data-open') === 'true' && !widget.contains(event.target)) setOpen(false);
    });
    doc.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && widget.getAttribute('data-open') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  initConsentBanner();
  initQuizWidget();
})();
}));
