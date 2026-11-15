"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const COORDS = [
  "0.67° N 23.47° E · Tranquility Base",
  "26.13° N 3.63° E · Hadley–Apennine",
  "1.95° S 5.53° W · Perseverance Valley",
  "18.44° N 77.45° E · Jezero",
  "68.22° N 125.75° W · Vastitas Borealis",
  "Ceres orbit · Dawn",
];

/** Fades a piece of the prologue in after `delay` seconds, optionally rising. */
function In({
  delay,
  rise = true,
  as = "span",
  children,
  className = "",
}: {
  delay: number;
  rise?: boolean;
  as?: "span" | "div";
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const Tag = as === "div" ? motion.div : motion.span;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: rise ? 14 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export function Prologue() {
  const reduce = useReducedMotion();
  return (
    <section
      id="about"
      aria-label="Prologue"
      className="prologue-grid flex min-h-[min(92vh,880px)] flex-col border-b border-ink bg-ink text-paper"
    >
      <In
        as="div"
        delay={0.1}
        rise={false}
        className="flex flex-wrap justify-between gap-3 border-b border-paper/20 px-[clamp(20px,4vw,56px)] py-5 font-mono text-[13px] text-muted-3"
      >
        <span>Prologue · Before the catalog</span>
        <span>Isaiah 62:12 · King James Version</span>
      </In>

      <div className="flex flex-1 flex-col justify-center gap-[clamp(28px,4vw,48px)] px-[clamp(20px,4vw,56px)] py-[clamp(48px,7vw,96px)]">
        <blockquote className="m-0 flex max-w-[1100px] flex-col gap-5">
          <p className="m-0 text-[clamp(30px,4.4vw,60px)] leading-[1.08] font-medium tracking-[-.03em] text-balance">
            <In delay={0.3} className="block">“And they shall call them, The holy people,</In>
            <In delay={0.8} className="block">The redeemed of the LORD:</In>
            <In delay={1.3} className="block">
              and thou shalt be called, <span className="text-accent-bright">Sought out</span>,
            </In>
            <In delay={1.8} className="block">A city not forsaken.”</In>
          </p>
          <In as="div" delay={2.3} rise={false}>
            <cite className="font-mono text-sm not-italic text-muted-3">— Isaiah 62:12</cite>
          </In>
        </blockquote>

        <In
          as="div"
          delay={2.7}
          className="flex flex-wrap items-end gap-[clamp(24px,4vw,64px)] border-t border-paper/20 pt-[clamp(24px,3vw,40px)]"
        >
          <div className="flex max-w-[640px] min-w-0 flex-[1_1_420px] flex-col gap-3">
            <span className="font-mono text-[13px] text-accent-bright">About the project</span>
            <h2 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.05] font-medium tracking-[-.03em]">
              Why SoughtOut Beyond?
            </h2>
            <p className="m-0 text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-pretty text-[#d9d5ca]">
              The name comes from this verse. To be sought out is to be looked for and not forgotten. These machines
              were left behind, but they are not forsaken. SoughtOut Beyond goes looking for them and tells their
              stories.
            </p>
          </div>
          <a
            href="#begin"
            className="group focus-ring bg-accent-bright px-[22px] py-4 font-mono text-sm font-medium whitespace-nowrap text-ink transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            Go looking{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </a>
        </In>
      </div>

      <In as="div" delay={3.1} rise={false} className="overflow-hidden border-t border-paper/20 py-4 font-mono text-xs text-muted-2">
        {/* Seamless loop: the list is doubled and slid left by exactly half. */}
        <div
          aria-hidden="true"
          className={reduce ? "flex flex-wrap gap-x-7 gap-y-2 px-[clamp(20px,4vw,56px)]" : "ticker flex w-max pl-[clamp(20px,4vw,56px)]"}
        >
          {(reduce ? COORDS : [...COORDS, ...COORDS]).map((c, i) => (
            <span key={i} className={reduce ? "whitespace-nowrap" : "mr-7 whitespace-nowrap"}>
              {c}
            </span>
          ))}
        </div>
      </In>
    </section>
  );
}
