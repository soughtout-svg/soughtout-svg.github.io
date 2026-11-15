"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Counts up from zero to `value` the first time it scrolls into view. */
export function CountUp({ value, duration = 1.6 }: { value: number | null; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (value == null || !inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, inView, reduce, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {(reduce ? value : shown)?.toLocaleString("en-US") ?? "—"}
    </span>
  );
}
