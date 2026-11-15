"use client";

import { useSyncExternalStore } from "react";

/**
 * Reader progress (machines explored, best quiz scores) and the reading
 * settings (larger text, high contrast). Both live in localStorage so they
 * survive reloads, and every component that reads them updates together.
 */
export interface Progress {
  explored?: Record<string, boolean>;
  best?: Record<string, number>;
}
export interface A11y {
  big: boolean;
  hc: boolean;
}

const PROGRESS_KEY = "soughtout.progress";
const A11Y_KEY = "soughtout.a11y";
const EVENT = "soughtout-progress";

function read<T>(key: string, fallback: T): string {
  try {
    return localStorage.getItem(key) ?? JSON.stringify(fallback);
  } catch {
    return JSON.stringify(fallback);
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked: settings just won't persist */
  }
  dispatchEvent(new Event(EVENT));
}
function subscribe(cb: () => void) {
  addEventListener(EVENT, cb);
  addEventListener("storage", cb);
  return () => {
    removeEventListener(EVENT, cb);
    removeEventListener("storage", cb);
  };
}
function parse<T>(raw: string, fallback: T): T {
  try {
    return (JSON.parse(raw) as T) || fallback;
  } catch {
    return fallback;
  }
}

const EMPTY_PROGRESS = "{}";
const DEFAULT_A11Y = JSON.stringify({ big: false, hc: false });

export function useProgress(): Progress {
  const raw = useSyncExternalStore(subscribe, () => read(PROGRESS_KEY, {}), () => EMPTY_PROGRESS);
  return parse<Progress>(raw, {});
}

export function useA11y(): A11y {
  const raw = useSyncExternalStore(subscribe, () => read(A11Y_KEY, { big: false, hc: false }), () => DEFAULT_A11Y);
  return parse<A11y>(raw, { big: false, hc: false });
}

export function getProgress(): Progress {
  return parse<Progress>(read(PROGRESS_KEY, {}), {});
}

export function markExplored(code: string) {
  const p = getProgress();
  p.explored = p.explored || {};
  if (!p.explored[code]) {
    p.explored[code] = true;
    write(PROGRESS_KEY, p);
  }
}

export function saveBest(code: string, score: number) {
  const p = getProgress();
  p.best = p.best || {};
  p.best[code] = Math.max(score, p.best[code] ?? 0);
  write(PROGRESS_KEY, p);
}

export function applyA11y(a: A11y) {
  const r = document.documentElement.style;
  r.zoom = a.big ? "1.2" : "";
  r.filter = a.hc ? "contrast(1.4)" : "";
}

export function toggleA11y(key: keyof A11y) {
  const a = parse<A11y>(read(A11Y_KEY, { big: false, hc: false }), { big: false, hc: false });
  const next = { ...a, [key]: !a[key] };
  applyA11y(next);
  write(A11Y_KEY, next);
}
