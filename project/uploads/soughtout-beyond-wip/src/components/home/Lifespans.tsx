"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MACHINES, STATUS } from "@/data/archive/machines";
import { decimalYear, useToday } from "@/lib/today";

const Y0 = 1965;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Lifespans() {
  const today = useToday();
  const reduce = useReducedMotion();
  // Before the client knows today's date, fall back to the last arrival year.
  const nowY = today == null ? 2026 : decimalYear(today);
  const span = nowY - Y0;
  const pct = (v: number) => `${(((v - Y0) / span) * 100).toFixed(2)}%`;
  const lives = [...MACHINES].sort((x, y) => x.a - y.a);

  return (
    <section id="lifespans" className="flex flex-col gap-7 border-b border-ink px-[clamp(20px,4vw,56px)] py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="m-0 text-[28px] font-medium tracking-[-.02em]">Working lives, 1965–today</h2>
        <span className="font-mono text-[13px] text-muted">Arrival → last signal</span>
      </div>
      <div className="flex flex-col">
        {lives.map((m, i) => {
          const end = m.e ?? nowY;
          return (
            <div
              key={m.code}
              className="grid grid-cols-[minmax(120px,220px)_minmax(0,1fr)] items-center gap-5 border-t border-ink/20 py-3"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-medium">{m.name}</span>
                <span className="font-mono text-xs text-muted">
                  {m.e ? `${Math.floor(m.a)}–${Math.floor(m.e)}` : `${Math.floor(m.a)}–today`}
                </span>
              </div>
              <div className="relative h-3.5 bg-[repeating-linear-gradient(90deg,#17160f1f_0_1px,transparent_1px_16.39%)]">
                <motion.div
                  className="absolute top-[3px] h-2 min-w-1 origin-left"
                  style={{ left: pct(m.a), width: `${(((end - m.a) / span) * 100).toFixed(2)}%`, background: STATUS[m.status][1] }}
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: reduce ? 0 : 0.1 + i * 0.04, ease: EASE }}
                />
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-[minmax(120px,220px)_minmax(0,1fr)] gap-5 border-t border-ink pt-2">
          <span />
          <div className="flex justify-between font-mono text-xs text-muted">
            <span>1965</span>
            <span className="max-sm:hidden">1975</span>
            <span>1985</span>
            <span className="max-sm:hidden">1995</span>
            <span>2005</span>
            <span className="max-sm:hidden">2015</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
