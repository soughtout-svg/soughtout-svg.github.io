// ── Navbar scroll ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Active nav link ─────────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObs.observe(s));

// ── Hamburger ───────────────────────────────────────────────
const burger  = document.getElementById('burger');
const navMenu = document.querySelector('.nav-links');
burger.addEventListener('click', () => navMenu.classList.toggle('open'));
navLinks.forEach(l => l.addEventListener('click', () => navMenu.classList.remove('open')));

// ── Typed text ──────────────────────────────────────────────
const roles = [
  'ECE Student @ Baylor University',
  'Robotics & UAV Researcher',
  'Embedded Systems Engineer',
  'Published AIAA Author',
  'AI & Autonomy Enthusiast',
  'MIT BWSI Technical Mentor',
  'Founder of CTRL Decode',
];

const typedEl = document.getElementById('typed');
let ri = 0, ci = 0, deleting = false;

function type() {
  const cur = roles[ri];
  typedEl.textContent = deleting ? cur.slice(0, ci--) : cur.slice(0, ci++);

  if (!deleting && ci > cur.length) { deleting = true; setTimeout(type, 2000); return; }
  if (deleting && ci < 0)           { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 400); return; }

  setTimeout(type, deleting ? 40 : 70);
}
type();

// ── Footer year ─────────────────────────────────────────────
document.getElementById('yr').textContent = new Date().getFullYear();

// ── Reveal on scroll ────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Stagger siblings
document.querySelectorAll('.skills-categories .skill-group, .projects-grid .project-card, .honors-grid .honors-card, .pub-list .pub-card, .tl-item').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
});

revealEls.forEach(el => revObs.observe(el));

// ── Counter animation ────────────────────────────────────────
function countUp(el, target, duration = 1600) {
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        countUp(el, parseInt(el.dataset.count));
      });
      statObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsCol = document.querySelector('.about-stats-col');
if (statsCol) statObs.observe(statsCol);

// ── Contact form ─────────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = document.getElementById('form-msg');
  msg.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
  e.target.reset();
  setTimeout(() => msg.textContent = '', 6000);
});

// ── Subtle mouse parallax on hero orbs ──────────────────────
const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.4;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});
