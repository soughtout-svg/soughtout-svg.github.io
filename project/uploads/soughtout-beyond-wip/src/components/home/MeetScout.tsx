"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MACHINES } from "@/data/archive/machines";
import { SCOUT_PARTS } from "@/data/archive/scoutParts";
import { Scout3D } from "./Scout3D";

const EASE = [0.22, 1, 0.36, 1] as const;
const nameOf = (code: string) => MACHINES.find((m) => m.code === code)?.name ?? code;

/** The site mascot in 3D, built from pieces of the machines in the catalog. */
export function MeetScout() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section id="scout" className="flex flex-wrap gap-px border-b border-ink bg-ink">
      <div className="flex min-w-0 flex-[1.6_1_560px] items-center bg-[#8a8a88] p-[clamp(12px,2.5vw,32px)]">
        <motion.div {...rise(0)} className="w-full">
          <Scout3D />
        </motion.div>
      </div>
      <div className="flex min-w-0 flex-[1_1_340px] flex-col justify-center gap-5 bg-paper px-[clamp(20px,4vw,56px)] py-[clamp(32px,4vw,56px)]">
        <motion.span {...rise(0.05)} className="font-mono text-[13px] text-accent">
          SO-B · Your guide, in 3D
        </motion.span>
        <motion.h2 {...rise(0.1)} className="m-0 text-[clamp(32px,3.6vw,48px)] leading-[1.02] font-medium tracking-[-.03em]">
          Meet Scout.
        </motion.h2>
        <motion.p {...rise(0.15)} className="m-0 text-[17px] leading-[1.55] text-pretty text-ink-2">
          Scout is our made-up guide, built from pieces of the real machines in the catalog. Spin Scout around, pull the
          parts off, then tap a part to meet the machine it came from.
        </motion.p>
        <ul className="m-0 flex list-none flex-col p-0">
          {SCOUT_PARTS.map((p, i) => (
            <motion.li key={p.id} {...rise(0.2 + i * 0.05)} className="border-t border-ink/20">
              <a href={`#m=${p.from}`} className="group flex flex-col gap-0.5 py-2.5 text-ink hover:text-ink">
                <span className="flex flex-wrap items-baseline justify-between gap-x-3 font-mono text-xs text-muted">
                  <span>
                    0{i + 1} · {p.name}
                  </span>
                  <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
                    from {nameOf(p.from)} →
                  </span>
                </span>
                <span className="text-[15px] leading-[1.4]">{p.text}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
