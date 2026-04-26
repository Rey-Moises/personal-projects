/* main.js — Cappy Works */

// ── Theme ───────────────────────────────────────────────
const html = document.documentElement;

function applyTheme(theme) {
  html.dataset.theme = theme;
  localStorage.setItem('cw-theme', theme);
}

function toggleTheme() {
  applyTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
}

// Restore saved or system theme
(function initTheme() {
  const saved = localStorage.getItem('cw-theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }
})();

// ── Mobile menu ─────────────────────────────────────────
const menuToggle  = document.getElementById('menu-toggle');
const mobileMenu  = document.getElementById('mobile-menu');
const menuIconOpen  = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  menuIconOpen.style.display  = isOpen ? 'none'  : 'block';
  menuIconClose.style.display = isOpen ? 'block' : 'none';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

// Close menu when a link is tapped
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuIconOpen.style.display  = 'block';
      menuIconClose.style.display = 'none';
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ───────────────────────────────────────
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target); // fire once
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el, i) => {
  // Stagger siblings in same parent
  el.style.transitionDelay = ((i % 4) * 80) + 'ms';
  revealObserver.observe(el);
});

// ── Nav shadow on scroll ────────────────────────────────
const nav = document.querySelector('.nav');
const scrollObserver = new IntersectionObserver(
  ([entry]) => {
    nav.style.boxShadow = entry.isIntersecting
      ? 'none'
      : '0 2px 20px rgba(42,26,14,.08)';
  },
  { threshold: 0 }
);
const sentinel = document.getElementById('nav-sentinel');
if (sentinel) scrollObserver.observe(sentinel);

// ── Smooth anchor offset (accounts for fixed nav) ───────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
