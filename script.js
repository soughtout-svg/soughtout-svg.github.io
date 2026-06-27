// ── Theme toggle (persisted) ───────────────────────────────
const root = document.documentElement;
const themeBtn = document.getElementById('theme-btn');
const SUN = '☼';   // ☼  shown while dark  → tap to go light
const MOON = '☾';  // ☾  shown while light → tap to go dark

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? SUN : MOON;
}

const saved = localStorage.getItem('theme');
applyTheme(saved === 'dark' || saved === 'light' ? saved : 'light');

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

// ── Brand → scroll to top ──────────────────────────────────
document.getElementById('brand').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Scroll-spy: highlight the active nav link ──────────────
const sectionIds = ['focus', 'research', 'publications', 'projects', 'recognition', 'skills', 'contact'];
const navLinks = new Map(
  Array.from(document.querySelectorAll('.nav-link')).map((a) => [a.getAttribute('href').slice(1), a])
);

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.remove('is-active'));
      const link = navLinks.get(entry.target.id);
      if (link) link.classList.add('is-active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) spy.observe(el);
});

// ── Mouse-reactive 3D tilt on project cards ────────────────
const MAX = 7; // degrees
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fine && !reduceMotion) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${px * MAX}deg) rotateX(${-py * MAX}deg) translateZ(8px)`;
      card.style.boxShadow = '0 18px 40px -18px rgba(0,0,0,0.4)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}
