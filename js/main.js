/* ═══════════════════════════════════════════════════════
   CLP Med Spa — main.js
   Vanilla JS, zero dependencies
═══════════════════════════════════════════════════════ */

'use strict';

/* ─── LANGUAGE TOGGLE ─────────────────────────────────── */
const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('clp-lang') || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('clp-lang', lang);

  document.documentElement.lang = lang;
  langToggle.textContent = lang === 'en' ? 'ES' : 'EN';
  langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Spanish' : 'Switch to English');

  document.querySelectorAll('[data-en]').forEach(el => {
    const key = lang === 'es' ? 'es' : 'en';
    const val = el.dataset[key];
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.textContent = val;
    }
  });
}

langToggle.addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'es' : 'en');
});

// Apply on load if stored
if (currentLang === 'es') applyLanguage('es');


/* ─── PROMO BANNER DISMISS ────────────────────────────── */
const promoBanner = document.getElementById('promo-banner');
const promoClose  = document.getElementById('promo-close');

if (sessionStorage.getItem('promo-dismissed')) {
  promoBanner.classList.add('hidden');
}
promoClose.addEventListener('click', () => {
  promoBanner.classList.add('hidden');
  sessionStorage.setItem('promo-dismissed', '1');
  // Adjust header top offset
  document.getElementById('site-header').style.top = '0';
});


/* ─── STICKY HEADER ───────────────────────────────────── */
const siteHeader = document.getElementById('site-header');

function updateHeaderTop() {
  const bannerH = promoBanner.classList.contains('hidden') ? 0 : promoBanner.offsetHeight;
  siteHeader.style.top = bannerH + 'px';
}
updateHeaderTop();
window.addEventListener('resize', updateHeaderTop);

window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ─── HAMBURGER / MOBILE MENU ─────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMenu(force) {
  const isOpen = typeof force === 'boolean' ? force : !hamburger.classList.contains('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.classList.toggle('open', isOpen);
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu());

// Close on nav link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// Close on outside click
document.addEventListener('click', e => {
  if (mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)) {
    toggleMenu(false);
  }
});


/* ─── SCROLL REVEAL ───────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
      let delay = 0;
      siblings.forEach(sib => {
        if (sib === entry.target) {
          entry.target.style.transitionDelay = delay + 'ms';
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
        delay += 80;
      });
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── ACTIVE NAV STATE ON SCROLL ──────────────────────── */
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.style.color = active ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));


/* ─── TREATMENT CARD TOGGLE ───────────────────────────── */
document.querySelectorAll('.tc-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.treatment-card');
    const isOpen = card.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));

    // Update button text (respecting current language)
    const openText  = currentLang === 'es' ? 'Cerrar' : 'Close';
    const closeText = (currentLang === 'es' ? btn.dataset.es : btn.dataset.en) || 'Learn More';
    btn.textContent = isOpen ? openText : closeText;

    // Close others
    document.querySelectorAll('.treatment-card.open').forEach(other => {
      if (other !== card) {
        other.classList.remove('open');
        const otherBtn = other.querySelector('.tc-toggle');
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.textContent = (currentLang === 'es' ? otherBtn.dataset.es : otherBtn.dataset.en) || 'Learn More';
      }
    });
  });
});


/* ─── TESTIMONIALS ROTATOR ────────────────────────────── */
const testimonials = document.querySelectorAll('.testimonial');
const dots         = document.querySelectorAll('.dot');
let   currentSlide = 0;
let   autoRotate;

function goToSlide(index) {
  testimonials[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  dots[currentSlide].setAttribute('aria-selected', 'false');

  currentSlide = (index + testimonials.length) % testimonials.length;

  testimonials[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  dots[currentSlide].setAttribute('aria-selected', 'true');
}

function startAutoRotate() {
  stopAutoRotate();
  autoRotate = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
function stopAutoRotate() {
  clearInterval(autoRotate);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToSlide(Number(dot.dataset.index));
    stopAutoRotate();
    startAutoRotate();
  });
});

// Pause on hover / focus
const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
if (testimonialsWrapper) {
  testimonialsWrapper.addEventListener('mouseenter', stopAutoRotate);
  testimonialsWrapper.addEventListener('mouseleave', startAutoRotate);
  testimonialsWrapper.addEventListener('focusin',    stopAutoRotate);
  testimonialsWrapper.addEventListener('focusout',   startAutoRotate);
}

startAutoRotate();


/* ─── GALLERY FILTER + COMPARISON SLIDER ─────────────── */
(function () {
  const filterBtns = document.querySelectorAll('.gf-btn');
  const cards      = document.querySelectorAll('.gi-card');

  /* ── Category filter ── */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle('hidden', card.dataset.category !== filter);
      });
    });
  });

  /* ── Comparison slider ── */
  function initCard(card) {
    const afterEl = card.querySelector('.gi-after');
    const lineEl  = card.querySelector('.gi-line');

    // Start position: 50 %
    let pct = 50;

    function setPosition(x) {
      const rect = card.getBoundingClientRect();
      pct = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));
      // clip-path: inset(top right bottom left)
      // We reveal "after" on the LEFT side: inset(0 (100-pct)% 0 0)
      afterEl.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      lineEl.style.left      = pct + '%';
    }

    /* Mouse */
    card.addEventListener('mousemove', e => setPosition(e.clientX), { passive: true });

    /* Touch */
    card.addEventListener('touchmove', e => {
      setPosition(e.touches[0].clientX);
    }, { passive: true });
  }

  cards.forEach(initCard);
})();


/* ─── FAQ ACCORDION ───────────────────────────────────── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer  = btn.nextElementSibling;
    const isOpen  = btn.getAttribute('aria-expanded') === 'true';

    // Collapse all others
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = '0';
      }
    });

    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = '0';
    } else {
      btn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


/* ─── POLICIES TOGGLE ─────────────────────────────────── */
const policiesBtn = document.querySelector('.policies-btn');
if (policiesBtn) {
  policiesBtn.addEventListener('click', () => {
    const content = policiesBtn.nextElementSibling;
    const isOpen  = policiesBtn.getAttribute('aria-expanded') === 'true';
    policiesBtn.setAttribute('aria-expanded', String(!isOpen));
    content.style.maxHeight = isOpen ? '0' : content.scrollHeight + 'px';
  });
}


/* ─── CONTACT FORM (placeholder handler) ──────────────── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = currentLang === 'es' ? 'Enviado ✓' : 'Sent ✓';
    btn.disabled = true;
    btn.style.background = 'var(--teal)';
    btn.style.borderColor = 'var(--teal)';
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      contactForm.reset();
    }, 3500);
  });
}


/* ─── SMOOTH SCROLL OFFSET (for sticky header) ────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = siteHeader.offsetHeight + promoBanner.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
