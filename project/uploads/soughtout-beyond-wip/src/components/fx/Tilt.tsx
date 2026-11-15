"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Tilts its child slightly toward the mouse in 3D and moves a soft glare with it.
 * Only reacts to a real mouse (not touch) and does nothing with reduced motion,
 * since the CSS that animates it is switched off there.
 */
export function Tilt({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--rx", `${(0.5 - py) * 7}deg`);
    ref.current.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
    ref.current.style.setProperty("--gx", `${px * 100}%`);
    ref.current.style.setProperty("--gy", `${py * 100}%`);
    ref.current.dataset.tilt = "on";
  };
  const leave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
    ref.current.dataset.tilt = "off";
  };

  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt ${className}`}>
      {children}
    </div>
  );
}
