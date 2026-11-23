// ── Theme toggle (persisted) ───────────────────────────────
const root = document.documentElement;
root.classList.add('js');
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
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

// ── Scroll reveal ──────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.section-head, .focus-grid, .exp, .pub, .proj-card, .award, .skill-group, .contact-row'
);
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('reveal', 'in'));
} else {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  // stagger siblings of the same kind (cards in a grid, awards in a list)
  const delays = Array.from(revealTargets, (el) => {
    const kind = el.classList[0];
    const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains(kind));
    return Math.min(sibs.indexOf(el), 5) * 0.07;
  });
  revealTargets.forEach((el, i) => {
    el.style.setProperty('--d', `${delays[i]}s`);
    el.classList.add('reveal');
    // hand transitions back to the element's own styles (e.g. card tilt) once revealed
    el.addEventListener('transitionend', function done(ev) {
      if (ev.target !== el || ev.propertyName !== 'opacity') return;
      el.classList.remove('reveal', 'in');
      el.removeEventListener('transitionend', done);
    });
    revealObs.observe(el);
  });
}

// ── Scroll progress bar ────────────────────────────────────
const progress = document.getElementById('progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// ── Local clock (Waco, TX) ─────────────────────────────────
const clock = document.getElementById('clock');
const clockFmt = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
});
function tick() { clock.textContent = clockFmt.format(new Date()); }
tick();
setInterval(tick, 1000);

// ── Stat count-up ──────────────────────────────────────────
const counters = document.querySelectorAll('[data-count]');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = Number(el.dataset.count);
      const start = performance.now();
      const dur = 1200;
      const step = (now) => {
        const t = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      // animation frames pause in hidden tabs; never leave a half-counted number on screen
      setTimeout(() => { el.textContent = end; }, dur + 150);
      countObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => { el.textContent = '0'; countObs.observe(el); });
}

// ── Hero drone swarm ───────────────────────────────────────
(() => {
  const canvas = document.getElementById('swarm');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const wrap = canvas.parentElement;
  const N = 9, TRAIL = 46, LINK = 170;
  let W = 0, H = 0, dpr = 1, running = false, visible = true;
  const mouse = { x: -9999, y: -9999, on: false };
  const rand = (a, b) => a + Math.random() * (b - a);
  const waypoint = () => ({ x: rand(W * 0.3, W * 0.96), y: rand(H * 0.08, H * 0.92) });

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = wrap.clientWidth; H = wrap.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  const drones = Array.from({ length: N }, (_, i) => {
    const p = waypoint();
    return { id: i + 1, x: p.x, y: p.y, vx: rand(-1, 1), vy: rand(-1, 1), wp: waypoint(), trail: [] };
  });

  function accent() { return getComputedStyle(root).getPropertyValue('--accent').trim() || '#3A6E55'; }
  function rgba(hex, a) {
    const n = parseInt(hex.replace('#', ''), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
  }

  function step() {
    for (const d of drones) {
      let ax = d.wp.x - d.x, ay = d.wp.y - d.y;
      const dist = Math.hypot(ax, ay);
      if (dist < 18) { d.wp = waypoint(); continue; }
      ax /= dist; ay /= dist;
      // separation from other drones
      for (const o of drones) {
        if (o === d) continue;
        const dx = d.x - o.x, dy = d.y - o.y, dd = Math.hypot(dx, dy);
        if (dd > 0 && dd < 46) { ax += (dx / dd) * 0.9; ay += (dy / dd) * 0.9; }
      }
      // avoid the cursor
      if (mouse.on) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y, dd = Math.hypot(dx, dy);
        if (dd > 0 && dd < 130) { const f = (130 - dd) / 130 * 3; ax += (dx / dd) * f; ay += (dy / dd) * f; }
      }
      d.vx = (d.vx + ax * 0.05) * 0.985;
      d.vy = (d.vy + ay * 0.05) * 0.985;
      const sp = Math.hypot(d.vx, d.vy), MAXS = 1.6;
      if (sp > MAXS) { d.vx *= MAXS / sp; d.vy *= MAXS / sp; }
      d.x += d.vx; d.y += d.vy;
      d.trail.push([d.x, d.y]);
      if (d.trail.length > TRAIL) d.trail.shift();
    }
  }

  function draw() {
    const c = accent();
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    // comms links
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = drones[i], b = drones[j], dd = Math.hypot(a.x - b.x, a.y - b.y);
      if (dd < LINK) {
        ctx.strokeStyle = rgba(c, 0.22 * (1 - dd / LINK));
        ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    ctx.setLineDash([]);
    for (const d of drones) {
      // trail
      for (let k = 1; k < d.trail.length; k++) {
        ctx.strokeStyle = rgba(c, 0.28 * (k / d.trail.length));
        ctx.beginPath(); ctx.moveTo(d.trail[k - 1][0], d.trail[k - 1][1]); ctx.lineTo(d.trail[k][0], d.trail[k][1]); ctx.stroke();
      }
      // waypoint marker
      ctx.strokeStyle = rgba(c, 0.25);
      ctx.beginPath();
      ctx.moveTo(d.wp.x - 4, d.wp.y); ctx.lineTo(d.wp.x + 4, d.wp.y);
      ctx.moveTo(d.wp.x, d.wp.y - 4); ctx.lineTo(d.wp.x, d.wp.y + 4);
      ctx.stroke();
      // drone: small quad-rotor glyph
      ctx.fillStyle = rgba(c, 0.85);
      ctx.fillRect(d.x - 2.5, d.y - 2.5, 5, 5);
      ctx.strokeStyle = rgba(c, 0.55);
      ctx.beginPath();
      for (const [ox, oy] of [[-5, -5], [5, -5], [-5, 5], [5, 5]]) { ctx.moveTo(d.x + ox + 2, d.y + oy); ctx.arc(d.x + ox, d.y + oy, 2, 0, Math.PI * 2); }
      ctx.stroke();
      ctx.fillStyle = rgba(c, 0.6);
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText(`UAV-0${d.id}`, d.x + 9, d.y - 7);
    }
    // cursor HUD
    if (mouse.on) {
      ctx.strokeStyle = rgba(c, 0.6);
      ctx.beginPath();
      ctx.moveTo(mouse.x - 14, mouse.y); ctx.lineTo(mouse.x - 5, mouse.y);
      ctx.moveTo(mouse.x + 5, mouse.y); ctx.lineTo(mouse.x + 14, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - 14); ctx.lineTo(mouse.x, mouse.y - 5);
      ctx.moveTo(mouse.x, mouse.y + 5); ctx.lineTo(mouse.x, mouse.y + 14);
      ctx.stroke();
      ctx.fillStyle = rgba(c, 0.75);
      ctx.fillText(`X ${String(Math.round(mouse.x)).padStart(4, '0')}  Y ${String(Math.round(mouse.y)).padStart(4, '0')}`, mouse.x + 16, mouse.y + 18);
    }
  }

  function loop() {
    if (!running) return;
    step(); draw();
    requestAnimationFrame(loop);
  }
  function setRunning() {
    const should = visible && !document.hidden && !reduceMotion;
    if (should && !running) { running = true; requestAnimationFrame(loop); }
    else if (!should) running = false;
  }

  if (reduceMotion) {
    for (let i = 0; i < 120; i++) step();
    draw();
  }
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; setRunning(); }).observe(wrap);
  document.addEventListener('visibilitychange', setRunning);
  let lastW = W;
  new ResizeObserver(() => {
    if (wrap.clientWidth === lastW) return; // ignore height-only changes (e.g. fonts loading)
    lastW = wrap.clientWidth;
    resize();
    // re-scatter so drones don't pile up at the edge after the hero changes size
    drones.forEach((d) => { const p = waypoint(); d.x = p.x; d.y = p.y; d.wp = waypoint(); d.trail = []; });
    if (reduceMotion) draw();
  }).observe(wrap);
  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true;
  });
  wrap.addEventListener('mouseleave', () => { mouse.on = false; });
  setRunning();
})();
