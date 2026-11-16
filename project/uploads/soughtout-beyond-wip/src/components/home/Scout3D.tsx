"use client";

import type * as T from "three";
import { useEffect, useRef, useState } from "react";
import { SCOUT_SHEET } from "@/data/archive/backdrops";
import { MACHINES } from "@/data/archive/machines";
import { SCOUT_PARTS } from "@/data/archive/scoutParts";

/**
 * Scout in 3D, built from simple shapes in code (no AI image).
 * Drag the background to spin it, grab any part to pull it off, take it all
 * apart or put it back together. Labels show which real machine each part
 * comes from; clicking one opens that machine's story.
 */

const nameOf = (code: string) => MACHINES.find((m) => m.code === code)?.name ?? code;

type V3 = [number, number, number];
interface PartSpec {
  id: string; // matches SCOUT_PARTS
  home: V3;
  apart: V3; // offset when taken apart
  anchor: V3; // where the label points, relative to the part
}

const SPECS: PartSpec[] = [
  { id: "eyes", home: [0, 0.45, 0.6], apart: [0, -0.1, 1.4], anchor: [0.4, 0.1, 0.2] },
  { id: "prisms", home: [0, 0.86, 0.58], apart: [0, 0.6, 1.0], anchor: [0, 0.12, 0.05] },
  { id: "foil", home: [-0.81, 0.45, 0.02], apart: [-1.25, 0, 0.2], anchor: [0, 0.3, 0] },
  { id: "foil", home: [0.81, 0.45, 0.02], apart: [1.25, 0, 0.2], anchor: [0, 0.3, 0] },
  { id: "dish", home: [-0.35, 1.02, -0.12], apart: [-0.75, 0.85, -0.2], anchor: [0, 0.45, 0] },
  { id: "whip", home: [0.55, 1.02, -0.22], apart: [0.95, 0.55, -0.2], anchor: [0, 0.95, 0] },
  { id: "solar", home: [0, 0.5, -0.6], apart: [0, 0.1, -1.5], anchor: [0, 0.5, 0] },
  { id: "mast", home: [0, 0, 0], apart: [0, -0.35, 1.1], anchor: [0.12, -0.7, 0] },
];

export function Scout3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<number, HTMLAnchorElement | null>>({});
  const api = useRef<{ setApart: (v: boolean) => void; resetView: () => void } | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [apart, setApart] = useState(false);
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { OrbitControls } = await import("three/addons/controls/OrbitControls.js");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      const { RoundedBoxGeometry } = await import("three/addons/geometries/RoundedBoxGeometry.js");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        setFailed(true);
        return;
      }
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const canvas = renderer.domElement;
      canvas.className = "absolute inset-0 size-full cursor-grab outline-none";
      canvas.setAttribute("aria-hidden", "true");
      wrap.prepend(canvas);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      const key = new THREE.DirectionalLight(0xfff1e0, 1.6);
      key.position.set(3, 5, 4);
      scene.add(key, new THREE.HemisphereLight(0xdfe8ff, 0x3a2a20, 0.6));

      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
      const camHome = new THREE.Vector3(3.4, 1.5, 5.2);
      camera.position.copy(camHome);
      const controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0.15, 0);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.minDistance = 3.6;
      controls.maxDistance = 11;
      controls.autoRotate = !reduce;
      controls.autoRotateSpeed = 1.4;
      controls.addEventListener("start", () => (controls.autoRotate = false));

      // ---------- Materials & builders ----------
      const std = (color: number, metalness = 0.1, roughness = 0.5) =>
        new THREE.MeshStandardMaterial({ color, metalness, roughness });
      const mesh = (g: T.BufferGeometry<T.NormalBufferAttributes>, m: T.Material, p: V3 = [0, 0, 0]) => {
        const o = new THREE.Mesh(g, m);
        o.position.set(...p);
        return o;
      };

      // Head: the fixed body everything attaches to, with a dusting of Mars dust at the chin.
      const head = new THREE.Group();
      head.add(mesh(new RoundedBoxGeometry(1.6, 1.05, 1.15, 4, 0.12), std(0xe9e5dc, 0.05, 0.55), [0, 0.5, 0]));
      head.add(mesh(new RoundedBoxGeometry(1.62, 0.18, 1.17, 3, 0.06), std(0xc98a5a, 0.05, 0.85), [0, 0.04, 0]));
      scene.add(head);

      const build: Record<string, (side: number) => InstanceType<typeof THREE.Group>> = {
        eyes: () => {
          const g = new THREE.Group();
          for (const x of [-0.4, 0.4]) {
            const housing = mesh(new THREE.CylinderGeometry(0.25, 0.27, 0.3, 40), std(0x3b3f45, 0.6, 0.35), [x, 0, 0]);
            housing.rotation.x = Math.PI / 2;
            const lens = mesh(
              new THREE.SphereGeometry(0.2, 40, 20),
              new THREE.MeshPhysicalMaterial({ color: 0x0b1a2e, metalness: 0.2, roughness: 0.04, clearcoat: 1 }),
              [x, 0, 0.15],
            );
            lens.scale.z = 0.45;
            const ring = mesh(new THREE.TorusGeometry(0.205, 0.028, 12, 48), std(0xc9ccd1, 1, 0.25), [x, 0, 0.16]);
            g.add(housing, lens, ring);
          }
          return g;
        },
        prisms: () => {
          const g = new THREE.Group();
          g.add(mesh(new THREE.BoxGeometry(0.95, 0.27, 0.05), std(0x2f3237, 0.4, 0.5)));
          const prism = std(0xeef4fa, 1, 0.04);
          for (let r = 0; r < 2; r++)
            for (let c = 0; c < 7; c++) {
              const p = mesh(new THREE.ConeGeometry(0.06, 0.07, 3), prism, [-0.39 + c * 0.13, -0.06 + r * 0.12, 0.05]);
              p.rotation.x = Math.PI / 2;
              g.add(p);
            }
          return g;
        },
        foil: (side) => {
          const geo = new THREE.PlaneGeometry(0.95, 0.72, 16, 12);
          const pos = geo.attributes.position;
          for (let i = 0; i < pos.count; i++) pos.setZ(i, (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0.03);
          geo.computeVertexNormals();
          const m = new THREE.MeshStandardMaterial({ color: 0xd9a838, metalness: 1, roughness: 0.32, side: THREE.DoubleSide });
          const g = new THREE.Group();
          const f = mesh(geo, m);
          f.rotation.y = side * (Math.PI / 2);
          g.add(f);
          return g;
        },
        dish: () => {
          const g = new THREE.Group();
          g.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.32, 12), std(0x9ea3a9, 0.8, 0.3), [0, 0.16, 0]));
          const pts = Array.from({ length: 14 }, (_, i) => {
            const r = (i / 13) * 0.44;
            return new THREE.Vector2(r, r * r * 0.9);
          });
          const dish = mesh(new THREE.LatheGeometry(pts, 48), new THREE.MeshStandardMaterial({ color: 0xf3f1ec, roughness: 0.45, side: THREE.DoubleSide }), [0, 0.34, 0]);
          dish.rotation.x = -0.55;
          const feed = mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.26, 8), std(0x6b6f75, 0.8, 0.3), [0, 0.13, 0]);
          dish.add(feed);
          g.add(dish);
          return g;
        },
        whip: () => {
          const g = new THREE.Group();
          g.add(mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.08, 16), std(0x3b3f45, 0.6, 0.4), [0, 0.04, 0]));
          g.add(mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.95, 8), std(0x2a2c30, 0.7, 0.35), [0, 0.55, 0]));
          g.add(mesh(new THREE.SphereGeometry(0.035, 16, 12), std(0xe8622c, 0.2, 0.4), [0, 1.03, 0]));
          return g;
        },
        solar: () => {
          const g = new THREE.Group();
          const frame = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.03, 10), std(0xc8a04a, 0.9, 0.35));
          const cells = mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.035, 10), std(0x1e3c78, 0.55, 0.22), [0, 0, 0]);
          for (const o of [frame, cells]) o.rotation.x = Math.PI / 2;
          cells.position.z = -0.006;
          g.add(frame, cells);
          // Cell grid lines
          const line = std(0x8fa6cf, 0.6, 0.3);
          for (let i = -2; i <= 2; i++) {
            g.add(mesh(new THREE.BoxGeometry(0.9, 0.008, 0.005), line, [0, i * 0.15, -0.026]));
            g.add(mesh(new THREE.BoxGeometry(0.008, 0.9, 0.005), line, [i * 0.15, 0, -0.026]));
          }
          return g;
        },
        mast: () => {
          const g = new THREE.Group();
          const metal = std(0xb8bcc2, 0.85, 0.3);
          g.add(mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 32), std(0x3b3f45, 0.6, 0.35), [0, -0.1, 0]));
          g.add(mesh(new THREE.CylinderGeometry(0.1, 0.11, 1.1, 24), metal, [0, -0.72, 0]));
          g.add(mesh(new THREE.TorusGeometry(0.13, 0.03, 10, 32), metal, [0, -0.45, 0]).rotateX(Math.PI / 2));
          g.add(mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.09, 40), std(0x2a2c30, 0.5, 0.45), [0, -1.3, 0]));
          // Bundled cables in orange, black and gray running up the back of the mast
          [0xe26a2c, 0x1d1e20, 0x8d9096].forEach((c, k) => {
            const curve = new THREE.CatmullRomCurve3([
              new THREE.Vector3(0.16 + k * 0.03, -1.25, -0.05),
              new THREE.Vector3(0.2 + k * 0.03, -0.9, -0.12),
              new THREE.Vector3(0.14 + k * 0.03, -0.5, -0.14),
              new THREE.Vector3(0.18 + k * 0.03, -0.12, -0.3),
            ]);
            g.add(mesh(new THREE.TubeGeometry(curve, 40, 0.022, 8), std(c, 0.1, 0.6)));
          });
          return g;
        },
      };

      // ---------- Parts ----------
      const sideCount: Record<string, number> = {};
      const parts = SPECS.map((spec) => {
        const n = (sideCount[spec.id] = (sideCount[spec.id] ?? 0) + 1);
        const side = spec.id === "foil" ? (n === 1 ? -1 : 1) : 1;
        const group = build[spec.id](side);
        const home = new THREE.Vector3(...spec.home);
        group.position.copy(home);
        group.traverse((o) => (o.userData.part = group));
        scene.add(group);
        const mats: InstanceType<typeof THREE.MeshStandardMaterial>[] = [];
        group.traverse((o) => {
          const m = (o as InstanceType<typeof THREE.Mesh>).material as InstanceType<typeof THREE.MeshStandardMaterial> | undefined;
          if (m && "emissive" in m && !mats.includes(m)) mats.push(m);
        });
        return { spec, group, home, target: home.clone(), mats, anchor: new THREE.Vector3(...spec.anchor) };
      });
      const meshes: InstanceType<typeof THREE.Object3D>[] = [];
      parts.forEach((p) => p.group.traverse((o) => (o as InstanceType<typeof THREE.Mesh>).isMesh && meshes.push(o)));

      // Turntable disc
      const disc = mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.04, 64), std(0x3a3935, 0.2, 0.8), [0, -1.37, 0]);
      scene.add(disc);

      // ---------- Dragging parts ----------
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const plane = new THREE.Plane();
      const hitPt = new THREE.Vector3();
      const grabOffset = new THREE.Vector3();
      let dragging: (typeof parts)[number] | null = null;
      let hovered: (typeof parts)[number] | null = null;

      const pick = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        const hit = ray.intersectObjects(meshes, false)[0];
        return hit ? { part: parts.find((p) => p.group === hit.object.userData.part)!, point: hit.point } : null;
      };
      const onDown = (e: PointerEvent) => {
        const h = pick(e);
        if (!h) return;
        controls.enabled = false; // checked by OrbitControls, which listens after us
        controls.autoRotate = false;
        dragging = h.part;
        plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()).negate(), h.part.group.position);
        ray.ray.intersectPlane(plane, hitPt);
        grabOffset.copy(h.part.group.position).sub(hitPt);
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = "grabbing";
      };
      const onMove = (e: PointerEvent) => {
        if (dragging) {
          pick(e);
          if (ray.ray.intersectPlane(plane, hitPt)) {
            dragging.group.position.copy(hitPt.add(grabOffset));
            dragging.target.copy(dragging.group.position);
          }
          return;
        }
        const h = pick(e);
        hovered = h?.part ?? null;
        canvas.style.cursor = hovered ? "grab" : "grab";
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = null;
        controls.enabled = true;
        canvas.style.cursor = "grab";
      };
      canvas.addEventListener("pointerdown", onDown, { capture: true });
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerup", onUp);
      canvas.addEventListener("pointercancel", onUp);
      canvas.addEventListener("pointerleave", () => (hovered = null));

      let zoomTo: number | null = null; // camera distance to ease toward
      api.current = {
        setApart: (v) => {
          controls.autoRotate = false; // hold still so the labels are easy to tap
          zoomTo = v ? 8.6 : camHome.distanceTo(new THREE.Vector3(0, 0.15, 0));
          parts.forEach((p) => p.target.copy(p.home).add(v ? new THREE.Vector3(...p.spec.apart) : new THREE.Vector3()));
          if (reduce) parts.forEach((p) => p.group.position.copy(p.target));
        },
        resetView: () => {
          zoomTo = null;
          camera.position.copy(camHome);
          controls.target.set(0, 0.15, 0);
        },
      };

      // ---------- Size, visibility, loop ----------
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = wrap;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Pull back on narrow screens so the whole model fits.
        camera.fov = w / h < 1 ? 44 : 34;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(wrap);
      resize();

      let visible = true;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
      io.observe(wrap);

      const tmp = new THREE.Vector3();
      const glow = new THREE.Color(0xff7a2e);
      const black = new THREE.Color(0x000000);
      let last = performance.now();
      let wasMoved = false;
      let raf = 0;
      const tick = (now: number) => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const k = 1 - Math.exp(-dt * 7);
        let anyMoved = false;
        parts.forEach((p, i) => {
          if (p !== dragging) p.group.position.lerp(p.target, k);
          const away = p.group.position.distanceTo(p.home);
          if (away > 0.2) anyMoved = true;
          const lit = p === hovered || p === dragging;
          p.mats.forEach((m) => {
            m.emissive.copy(lit ? glow : black);
            m.emissiveIntensity = lit ? 0.35 : 0;
          });
          // Labels follow their part; they appear once the part is pulled away.
          const el = labelRefs.current[i];
          if (el) {
            tmp.copy(p.group.position).add(p.anchor).project(camera);
            const x = (tmp.x * 0.5 + 0.5) * wrap.clientWidth;
            const y = (-tmp.y * 0.5 + 0.5) * wrap.clientHeight;
            const show = away > 0.35 || lit;
            const W = wrap.clientWidth, H = wrap.clientHeight, lw = el.offsetWidth, lh = el.offsetHeight;
            const cx = Math.min(Math.max(x, lw / 2 + 4), W - lw / 2 - 4);
            const cy = Math.min(Math.max(y, lh + 12), H - 4);
            el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -100%)`;
            el.style.opacity = show ? "1" : "0";
            el.style.pointerEvents = show ? "auto" : "none";
            el.tabIndex = show ? 0 : -1;
          }
        });
        if (anyMoved !== wasMoved) {
          wasMoved = anyMoved;
          setMoved(anyMoved);
        }
        if (zoomTo != null) {
          tmp.copy(camera.position).sub(controls.target);
          const d = tmp.length();
          const nd = d + (zoomTo - d) * k;
          camera.position.copy(controls.target).add(tmp.setLength(nd));
          if (Math.abs(zoomTo - d) < 0.02) zoomTo = null;
        }
        controls.update();
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        controls.dispose();
        canvas.removeEventListener("pointerdown", onDown, { capture: true });
        scene.traverse((o) => {
          const m = o as InstanceType<typeof THREE.Mesh>;
          if (m.isMesh) {
            m.geometry.dispose();
            (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => x.dispose());
          }
        });
        pmrem.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const toggle = () => {
    const next = !(apart || moved);
    setApart(next);
    api.current?.setApart(next);
  };

  if (failed) {
    return (
      <div className="relative aspect-[16/9] w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${SCOUT_SHEET})` }} role="img" aria-label="Scout the robot mascot, front, side and back">
        <span className="absolute right-2 bottom-2 bg-ink/75 px-2 py-1 font-mono text-[10px] text-paper">AI-generated image · Higgsfield</span>
      </div>
    );
  }

  const together = !(apart || moved);
  return (
    <div className="flex w-full flex-col gap-3">
      <div
        ref={wrapRef}
        role="img"
        aria-label="A 3D model of Scout the robot. Drag to spin it, drag a part to pull it off, or use the buttons below to take it apart and put it back together."
        className="relative aspect-[4/5] w-full touch-none overflow-hidden sm:aspect-[4/3] bg-[radial-gradient(circle_at_50%_40%,#a3a39f_0%,#6d6d69_75%)]"
      >
        {!ready && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-paper/80">Building Scout…</span>
        )}
        {SPECS.map((s, i) => {
          const part = SCOUT_PARTS.find((p) => p.id === s.id)!;
          // Only one label per part (the gold foil has two pieces).
          if (SPECS.findIndex((x) => x.id === s.id) !== i) return null;
          return (
            <a
              key={i}
              ref={(el) => {
                labelRefs.current[i] = el;
              }}
              href={`#m=${part.from}`}
              tabIndex={-1}
              className="absolute top-0 left-0 z-10 -mt-2 flex flex-col border border-ink bg-paper/95 px-1.5 py-0.5 sm:px-2 sm:py-1 text-ink no-underline opacity-0 shadow-[2px_2px_0_#17160f] transition-opacity duration-300 hover:bg-accent-bright hover:text-ink"
            >
              <span className="text-[11px] leading-tight font-medium whitespace-nowrap sm:text-[12px]">{part.name}</span>
              <span className="font-mono text-[9px] whitespace-nowrap text-ink-2 sm:text-[10px]">from {nameOf(part.from).replace(/ (Lander|Rover|Descent Stage|Retroreflector|Helicopter)$/, "")} →</span>
            </a>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center gap-2 font-mono text-[13px]">
        <button
          type="button"
          onClick={toggle}
          disabled={!ready}
          className={`focus-ring box-border flex min-h-11 cursor-pointer items-center px-4 transition-colors duration-200 disabled:opacity-50 ${together ? "bg-ink text-paper hover:bg-accent" : "bg-accent-bright text-ink hover:bg-ink hover:text-paper"}`}
        >
          {together ? "Take Scout apart ✦" : "Put Scout back together ↺"}
        </button>
        <button
          type="button"
          onClick={() => api.current?.resetView()}
          disabled={!ready}
          className="focus-ring box-border flex min-h-11 cursor-pointer items-center border border-ink px-4 hover:bg-paper-3 disabled:opacity-50"
        >
          Reset view
        </button>
        <span className="text-xs text-muted">Drag to spin · grab a part to pull it off</span>
      </div>
    </div>
  );
}
