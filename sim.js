/* ════════════════════════════════════════════════════════════
   SWARM SIM — interactive UAV swarm over the hero.
   Boids flocking · cursor avoidance · click-to-spawn (live, no
   restart) · GPS-loss → return-to-home sequence, mirroring the
   AIAA SciTech 2026 decision-making framework.
════════════════════════════════════════════════════════════ */
(() => {
  'use strict';

  const wrap   = document.getElementById('top');
  const canvas = document.getElementById('swarm-canvas');
  if (!wrap || !canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elCount  = document.getElementById('sim-count');
  const elMode   = document.getElementById('sim-mode');
  const btnSpawn = document.getElementById('sim-spawn');
  const btnGps   = document.getElementById('sim-gps');

  // ── Tuning ────────────────────────────────────────────────
  const START_DRONES = 9;
  const MAX_DRONES   = 16;
  const PATROL_SPEED = 78;
  const RTH_SPEED    = 135;
  const TRAIL_LEN    = 22;
  const WARN         = '#C4552A';

  // ── Theme colors (live-read from CSS custom properties) ──
  const colors = {};
  function readTheme() {
    const s = getComputedStyle(document.documentElement);
    colors.accent = s.getPropertyValue('--accent').trim() || '#3A6E55';
    colors.ink    = s.getPropertyValue('--ink').trim()    || '#1B1A17';
    colors.muted  = s.getPropertyValue('--muted').trim()  || '#6E6A62';
  }
  readTheme();
  new MutationObserver(() => { readTheme(); if (reduceMotion) drawFrame(0); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ── World ─────────────────────────────────────────────────
  let W = 0, H = 0;
  const home  = { x: 0, y: 0, r: 18 };
  const mouse = { x: 0, y: 0, active: false };
  const drones = [];
  let phase = 'nominal'; // nominal | denied | rth | landed | launch
  let phaseT = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = wrap.clientWidth;
    H = wrap.clientHeight;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    home.x = W - 96;
    home.y = H - 78;
    drones.forEach((d) => {
      d.x = Math.min(Math.max(d.x, 10), W - 10);
      d.y = Math.min(Math.max(d.y, 10), H - 10);
    });
    if (reduceMotion) drawFrame(0);
  }

  function makeDrone(x, y) {
    const a = Math.random() * Math.PI * 2;
    return {
      x, y,
      vx: Math.cos(a) * PATROL_SPEED * 0.6,
      vy: Math.sin(a) * PATROL_SPEED * 0.6,
      wander: Math.random() * Math.PI * 2,
      spin:   Math.random() * Math.PI * 2,
      trail:  [],
      state:  'patrol',   // patrol | denied | rth | landing | landed | launch
      t: 0,               // time in current state
      stagger: 0,         // per-drone GPS-loss detection delay
      driftA:  0,         // drift heading while GPS-denied
      unc: 0,             // position-uncertainty radius (px)
      scale: 0,           // pop-in / landing scale
      slot: 0,            // landing slot index around the pad
    };
  }

  function spawn(x, y) {
    if (drones.length >= MAX_DRONES || phase !== 'nominal') return;
    drones.push(makeDrone(x, y));
    updateHud();
  }

  function slotPos(d) {
    const n = Math.max(drones.length, 1);
    const a = (d.slot / n) * Math.PI * 2 - Math.PI / 2;
    const r = home.r + 14 + (d.slot % 2) * 13;
    return { x: home.x + Math.cos(a) * r, y: home.y + Math.sin(a) * r };
  }

  // ── HUD ───────────────────────────────────────────────────
  const MODE_LABEL = {
    nominal: 'PATROL',
    denied:  'GPS DENIED',
    rth:     'RTH ENGAGED',
    landed:  'LANDED',
    launch:  'RELAUNCH',
  };
  let hudMode = '';
  function updateHud() {
    if (elCount) elCount.textContent = String(drones.length).padStart(2, '0');
    const label = MODE_LABEL[phase];
    if (elMode && label !== hudMode) {
      hudMode = label;
      elMode.textContent = label;
      elMode.classList.toggle('is-warn', phase === 'denied');
    }
    const locked = phase !== 'nominal';
    if (btnGps)   btnGps.disabled   = locked;
    if (btnSpawn) btnSpawn.disabled = locked || drones.length >= MAX_DRONES;
  }

  function killGps() {
    if (phase !== 'nominal' || !drones.length) return;
    phase = 'denied';
    phaseT = 0;
    drones.forEach((d, i) => {
      d.state = 'denied';
      d.t = 0;
      d.stagger = Math.random() * 1.1;
      d.driftA = Math.random() * Math.PI * 2;
      d.slot = i;
    });
    updateHud();
  }

  // ── Physics ───────────────────────────────────────────────
  function updateDrone(d, dt) {
    d.t += dt;
    d.spin += dt * (d.state === 'landed' ? 3 : 26);
    d.scale += (targetScale(d) - d.scale) * Math.min(1, dt * 6);

    let fx = 0, fy = 0;

    if (d.state === 'patrol' || d.state === 'denied' || d.state === 'launch') {
      // Boids: separation / alignment / cohesion
      let sx = 0, sy = 0, ax = 0, ay = 0, cx = 0, cy = 0, na = 0, nc = 0;
      for (const o of drones) {
        if (o === d) continue;
        const dx = d.x - o.x, dy = d.y - o.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        if (dist < 36) { sx += dx / dist / dist; sy += dy / dist / dist; }
        if (dist < 72) { ax += o.vx; ay += o.vy; na++; }
        if (dist < 100) { cx += o.x; cy += o.y; nc++; }
      }
      fx += sx * 2600; fy += sy * 2600;
      if (na) { fx += (ax / na - d.vx) * 0.9; fy += (ay / na - d.vy) * 0.9; }
      if (nc) { fx += (cx / nc - d.x) * 0.5;  fy += (cy / nc - d.y) * 0.5; }

      // Wander
      d.wander += (Math.random() - 0.5) * 4 * dt * 10;
      fx += Math.cos(d.wander) * 42;
      fy += Math.sin(d.wander) * 42;

      // Soft world bounds
      const M = 56;
      if (d.x < M)     fx += (M - d.x) * 5;
      if (d.x > W - M) fx -= (d.x - (W - M)) * 5;
      if (d.y < M)     fy += (M - d.y) * 5;
      if (d.y > H - M) fy -= (d.y - (H - M)) * 5;

      // Cursor avoidance
      if (mouse.active) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        if (dist < 130) {
          const f = ((130 - dist) / 130) * 520;
          fx += (dx / dist) * f;
          fy += (dy / dist) * f;
        }
      }
    }

    switch (d.state) {
      case 'patrol':
        d.unc = Math.max(0, d.unc - dt * 30);
        break;

      case 'denied': {
        // Dead-reckoning drift: uncertainty balloons, heading wanders hard
        d.unc = Math.min(30, d.unc + dt * 14);
        d.driftA += (Math.random() - 0.5) * 1.6 * dt * 8;
        fx += Math.cos(d.driftA) * 130;
        fy += Math.sin(d.driftA) * 130;
        if (d.t > 2.1 + d.stagger) { d.state = 'rth'; d.t = 0; }
        break;
      }

      case 'rth': {
        d.unc = Math.max(0, d.unc - dt * 10);
        const s = slotPos(d);
        const dx = s.x - d.x, dy = s.y - d.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        // Arrival: ramp speed down on final approach so drones don't orbit the pad
        const speed = RTH_SPEED * Math.min(1, dist / 70);
        fx += ((dx / dist) * speed - d.vx) * 4;
        fy += ((dy / dist) * speed - d.vy) * 4;
        // Light separation en route only — off near the pad, where slots are tight
        if (dist > 34) {
          for (const o of drones) {
            if (o === d) continue;
            const ox = d.x - o.x, oy = d.y - o.y;
            const od = Math.hypot(ox, oy) || 0.01;
            if (od < 22) { fx += (ox / od) * 160; fy += (oy / od) * 160; }
          }
        }
        if (dist < 16) { d.state = 'landing'; d.t = 0; }
        break;
      }

      case 'landing': {
        const s = slotPos(d);
        d.x += (s.x - d.x) * Math.min(1, dt * 8);
        d.y += (s.y - d.y) * Math.min(1, dt * 8);
        d.vx *= 0.8; d.vy *= 0.8;
        d.unc = 0;
        if (d.t > 0.9) { d.state = 'landed'; d.t = 0; }
        break;
      }

      case 'landed':
        d.vx = 0; d.vy = 0;
        break;

      case 'launch':
        if (d.t > 0.7) { d.state = 'patrol'; d.t = 0; }
        break;
    }

    if (d.state !== 'landing' && d.state !== 'landed') {
      d.vx += fx * dt;
      d.vy += fy * dt;
      const sp = Math.hypot(d.vx, d.vy) || 0.01;
      const maxSp = d.state === 'rth' ? RTH_SPEED : PATROL_SPEED * (d.state === 'denied' ? 1.25 : 1);
      if (sp > maxSp) { d.vx = (d.vx / sp) * maxSp; d.vy = (d.vy / sp) * maxSp; }
      if (sp < 26 && d.state === 'patrol') { d.vx = (d.vx / sp) * 26; d.vy = (d.vy / sp) * 26; }
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.x = Math.min(Math.max(d.x, 4), W - 4);
      d.y = Math.min(Math.max(d.y, 4), H - 4);
    }

    // Trail bookkeeping
    if (d.state === 'landed' || d.state === 'landing') {
      if (d.trail.length) d.trail.splice(0, 2);
    } else {
      d.trail.push(d.x, d.y);
      if (d.trail.length > TRAIL_LEN * 2) d.trail.splice(0, 2);
    }
  }

  function targetScale(d) {
    if (d.state === 'landing' || d.state === 'landed') return 0.55;
    return 1;
  }

  // ── Global mission sequencer ──────────────────────────────
  function updatePhase(dt) {
    phaseT += dt;
    if (phase === 'denied' && drones.every((d) => d.state !== 'denied')) {
      phase = 'rth'; phaseT = 0;
    } else if (phase === 'rth' && drones.every((d) => d.state === 'landed')) {
      phase = 'landed'; phaseT = 0;
    } else if (phase === 'landed' && phaseT > 1.5) {
      phase = 'launch'; phaseT = 0;
      drones.forEach((d) => {
        const s = slotPos(d);
        const a = Math.atan2(s.y - home.y, s.x - home.x) + (Math.random() - 0.5) * 0.8;
        const v = 70 + Math.random() * 70;
        d.state = 'launch'; d.t = 0;
        d.vx = Math.cos(a) * v;
        d.vy = Math.sin(a) * v;
      });
    } else if (phase === 'launch' && drones.every((d) => d.state === 'patrol')) {
      phase = 'nominal'; phaseT = 0;
    }
    updateHud();
  }

  // ── Rendering ─────────────────────────────────────────────
  function drawGrid() {
    ctx.strokeStyle = colors.ink;
    ctx.globalAlpha = 0.07;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let gx = 45; gx < W; gx += 90) {
      for (let gy = 45; gy < H; gy += 90) {
        ctx.moveTo(gx - 3, gy); ctx.lineTo(gx + 3, gy);
        ctx.moveTo(gx, gy - 3); ctx.lineTo(gx, gy + 3);
      }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawHome() {
    ctx.save();
    ctx.translate(home.x, home.y);
    ctx.strokeStyle = colors.muted;
    ctx.fillStyle = colors.muted;
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(0, 0, home.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = "600 10px 'JetBrains Mono', monospace";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('H', 0, 0.5);
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.globalAlpha = 0.5;
    ctx.fillText('RTH PAD', 0, home.r + 12);
    ctx.restore();
  }

  function droneColor(d) {
    if (d.state === 'denied') return WARN;
    if (d.state === 'landed') return colors.muted;
    return colors.accent;
  }

  function drawDrone(d) {
    const col = droneColor(d);

    // Trail
    if (d.trail.length >= 4) {
      ctx.strokeStyle = col;
      ctx.lineWidth = 1;
      const n = d.trail.length / 2;
      for (let i = 1; i < n; i++) {
        ctx.globalAlpha = (i / n) * 0.22;
        ctx.beginPath();
        ctx.moveTo(d.trail[(i - 1) * 2], d.trail[(i - 1) * 2 + 1]);
        ctx.lineTo(d.trail[i * 2], d.trail[i * 2 + 1]);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // Dashed guidance line home while RTH is engaged
    if (d.state === 'rth') {
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.18;
      ctx.setLineDash([3, 6]);
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(home.x, home.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // Position-uncertainty ring while GPS-denied
    if (d.unc > 3) {
      ctx.strokeStyle = WARN;
      ctx.globalAlpha = 0.35;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.unc, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }

    // Airframe (jittered while position estimate is degraded)
    const jx = d.state === 'denied' ? (Math.random() - 0.5) * 2.4 : 0;
    const jy = d.state === 'denied' ? (Math.random() - 0.5) * 2.4 : 0;
    const s = 7 * d.scale;
    ctx.save();
    ctx.translate(d.x + jx, d.y + jy);
    ctx.rotate(Math.atan2(d.vy, d.vx) + Math.PI / 4);
    ctx.strokeStyle = col;
    ctx.fillStyle = col;
    ctx.lineWidth = 1.3;
    ctx.globalAlpha = 0.92;
    ctx.beginPath();
    ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
    ctx.moveTo(0, -s); ctx.lineTo(0, s);
    ctx.stroke();
    const tips = [[-s, 0], [s, 0], [0, -s], [0, s]];
    for (let i = 0; i < 4; i++) {
      const dir = i % 2 ? 1 : -1; // counter-rotating pairs
      ctx.beginPath();
      ctx.arc(tips[i][0], tips[i][1], 3 * d.scale, d.spin * dir, d.spin * dir + Math.PI * 1.5);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(0, 0, 1.9 * d.scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function drawFrame(dt) {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawHome();
    for (const d of drones) drawDrone(d);
  }

  // ── Main loop (paused when hero is offscreen or tab hidden) ─
  let visible = true;
  let last = performance.now();

  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min((now - last) / 1000, 0.033);
    last = now;
    if (!visible || document.hidden) return;
    for (const d of drones) updateDrone(d, dt);
    updatePhase(dt);
    drawFrame(dt);
  }

  // ── Input ─────────────────────────────────────────────────
  wrap.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
    mouse.active = true;
  });
  wrap.addEventListener('pointerleave', () => { mouse.active = false; });

  canvas.addEventListener('click', (e) => {
    const r = canvas.getBoundingClientRect();
    spawn(e.clientX - r.left, e.clientY - r.top);
    if (reduceMotion) drawFrame(0);
  });

  if (btnSpawn) btnSpawn.addEventListener('click', () => {
    spawn(60 + Math.random() * (W - 120), 60 + Math.random() * (H - 120));
    if (reduceMotion) drawFrame(0);
  });
  if (btnGps) btnGps.addEventListener('click', killGps);

  // ── Boot ──────────────────────────────────────────────────
  resize();
  window.addEventListener('resize', resize);
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
  }, { threshold: 0.02 }).observe(wrap);

  for (let i = 0; i < START_DRONES; i++) {
    spawn(60 + Math.random() * (W - 120), 60 + Math.random() * (H - 120));
  }
  updateHud();

  if (reduceMotion) {
    // Static render only — no animation, no GPS-loss sequence
    drones.forEach((d) => { d.scale = 1; });
    if (btnGps) btnGps.style.display = 'none';
    drawFrame(0);
  } else {
    requestAnimationFrame(loop);
  }
})();
