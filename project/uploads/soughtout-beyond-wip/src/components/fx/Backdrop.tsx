"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * A full-bleed cinematic image behind a section: it drifts slowly (a "Ken Burns"
 * zoom), scrolls a little slower than the page (parallax), and sits under a
 * dark gradient so text on top stays readable. Twinkling stars float above it.
 */
export function Backdrop({
  src,
  children,
  className = "",
  shade = "linear-gradient(180deg,#17160fcc 0%,#17160f99 45%,#17160fee 100%)",
  position = "center",
  stars = true,
  credit,
  id,
  label,
}: {
  id?: string;
  label?: string;
  src: string;
  children: ReactNode;
  className?: string;
  shade?: string;
  position?: string;
  stars?: boolean;
  credit?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <section ref={ref} id={id} aria-label={label} className={`relative isolate overflow-hidden bg-ink ${className}`}>
      <motion.div aria-hidden="true" className="absolute -inset-y-[10%] inset-x-0 -z-20" style={{ y }}>
        <div
          className={`size-full bg-cover bg-no-repeat ${reduce ? "" : "kenburns"}`}
          style={{ backgroundImage: `url(${src})`, backgroundPosition: position }}
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10" style={{ background: shade }} />
      {stars && <div aria-hidden="true" className="stars absolute inset-0 -z-10" />}
      {children}
      {credit && (
        <span className="absolute right-3 bottom-2 z-10 font-mono text-[10px] text-paper/45">{credit}</span>
      )}
    </section>
  );
}
