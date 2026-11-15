"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { MACHINES, STATUS, when, type Dest } from "@/data/archive/machines";
import { useProgress } from "@/lib/progress";
import { MachineSheet } from "./MachineSheet";

type Filter = "all" | Dest;
const FILTERS: [Filter, string][] = [
  ["all", `All ${MACHINES.length}`],
  ["moon", "Moon"],
  ["mars", "Mars"],
  ["deep", "Deep space"],
];
const EASE = [0.22, 1, 0.36, 1] as const;
const HASH = /^#m=([A-Z]{3}-\d{3})$/;

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const { explored = {}, best = {} } = useProgress();
  const reduce = useReducedMotion();

  // A link like /#m=MRS-001 opens that machine's story straight away.
  useEffect(() => {
    const read = () => {
      const m = location.hash.match(HASH);
      if (m && MACHINES.some((x) => x.code === m[1])) setOpen(m[1]);
    };
    read();
    addEventListener("hashchange", read);
    return () => removeEventListener("hashchange", read);
  }, []);

  const items = MACHINES.filter((m) => filter === "all" || m.dest === filter);

  return (
    <section id="catalog" className="border-b border-ink">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-[clamp(20px,4vw,56px)] py-5">
        <div className="flex items-baseline gap-3.5">
          <h2 className="m-0 text-[28px] font-medium tracking-[-.02em]">The catalog</h2>
          <span className="font-mono text-[13px] text-muted" aria-live="polite">
            {items.length} object{items.length === 1 ? "" : "s"}
          </span>
        </div>
        <div role="group" aria-label="Filter by destination" className="relative flex border border-ink font-mono text-[13px]">
          {FILTERS.map(([k, label]) => {
            const on = filter === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                aria-pressed={on}
                className={`focus-ring relative cursor-pointer px-[18px] py-3 transition-colors duration-300 ${on ? "text-paper" : "text-ink hover:bg-paper-2"}`}
              >
                {on && (
                  <motion.span
                    layoutId="filter-pill"
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink"
                    transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="-mb-px grid grid-cols-[repeat(auto-fill,minmax(max(min(100%,340px),calc(33.34%-1px)),1fr))]">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((m, i) => {
            const [statusLabel, statusColor] = STATUS[m.status];
            const b = best[m.code];
            const cta = b != null ? `✓ Quiz ${b}/3 · Open →` : explored[m.code] ? "✓ Explored · Open →" : "Tell me about it →";
            return (
              <motion.a
                key={m.code}
                layout={!reduce}
                href={`#m=${m.code}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(m.code);
                }}
                aria-label={`${m.name}, ${statusLabel}. Read its story`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, delay: reduce ? 0 : (i % 3) * 0.07, ease: EASE }}
                className="group flex cursor-pointer flex-col gap-3.5 bg-paper p-6 text-ink shadow-[1px_0_0_#17160f,0_1px_0_#17160f] outline-offset-[-4px] transition-colors duration-300 hover:bg-paper-2 hover:text-ink focus-visible:outline-3 focus-visible:outline-ink"
              >
                <div className="flex justify-between font-mono text-xs">
                  <span>{m.code}</span>
                  <span className="whitespace-nowrap" style={{ color: statusColor }}>
                    <span className={m.status === "silent" || m.status === "still-working" ? "pulse-dot" : ""}>●</span>{" "}
                    {statusLabel}
                  </span>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-4">
                  <div
                    role="img"
                    aria-label={m.alt}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-flow group-hover:scale-[1.04]"
                    style={{ backgroundImage: m.img ? `url(${m.img})` : "none" }}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="text-2xl leading-[1.15] font-medium tracking-[-.02em]">{m.name}</div>
                  <div className="text-[15px] leading-normal text-pretty text-ink-2">{m.tagline}</div>
                </div>
                <div className="bg-paper-3 px-4 py-3.5 text-base leading-normal text-pretty">“{m.voice}”</div>
                <div className="mt-auto flex flex-col gap-1 border-t border-ink/20 pt-3">
                  <span className="font-mono text-xs text-muted">What it discovered</span>
                  <span className="text-[15px] leading-[1.45]">{m.found}</span>
                </div>
                <div className="flex justify-between gap-3 font-mono text-xs">
                  <span className="text-muted">
                    {m.mission} · {when(m)}
                  </span>
                  <span className="whitespace-nowrap transition-transform duration-300 group-hover:translate-x-1">{cta}</span>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && <MachineSheet code={open} onClose={() => setOpen(null)} onPick={setOpen} />}
      </AnimatePresence>
    </section>
  );
}
