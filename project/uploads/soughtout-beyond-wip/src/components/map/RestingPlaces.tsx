"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MachineSheet } from "@/components/home/MachineSheet";
import { LOC, MACHINES, STATUS, WORLDS, pos, type Dest } from "@/data/archive/machines";

const EASE = [0.22, 1, 0.36, 1] as const;
const HASH = /^#m=([A-Z]{3}-\d{3})$/;

/** Each status used on the Moon or Mars, for the legend. */
const LEGEND = [...new Set(MACHINES.filter((m) => m.dest !== "deep").map((m) => m.status))].map((k) => STATUS[k]);

function WorldMap({ world, open, onOpen, index }: { world: Exclude<Dest, "deep">; open: string | null; onOpen: (c: string) => void; index: number }) {
  const reduce = useReducedMotion();
  const W = WORLDS[world];
  const list = MACHINES.filter((m) => m.dest === world && LOC[m.code]?.[1]);
  const seen: Record<string, number> = {};
  const sites = list.flatMap((m) =>
    LOC[m.code][1]!.map((p, i) => {
      const q = pos(p[0], p[1]);
      const key = q.x + q.y;
      const dup = !!seen[key];
      seen[key] = (seen[key] ?? 0) + 1;
      return {
        key: `${m.code}-${i}`,
        ...q,
        m,
        dup,
        on: m.code === open,
        label: p[2] ?? m.name.replace(/ (Lander|Rover|Helicopter|Spacecraft)$/, ""),
      };
    }),
  );

  return (
    <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5 bg-paper px-[clamp(20px,3vw,40px)] pt-6 pb-8">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="m-0 text-[28px] font-medium tracking-[-.02em]">{W.name}</h2>
        <span className="font-mono text-xs text-muted">{list.length} machines</span>
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
        className="relative aspect-[2/1] overflow-hidden border border-ink bg-[#2a2925] bg-[length:100%_100%] bg-center bg-no-repeat"
        style={{ backgroundImage: W.map ? `url(${W.map})` : "none" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[length:8.333%_16.666%]"
          style={{
            backgroundImage: "linear-gradient(#f2f0eb2b 1px,transparent 1px),linear-gradient(90deg,#f2f0eb2b 1px,transparent 1px)",
          }}
        />
        <div aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-dashed border-paper/50" />
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2 border-l border-dashed border-paper/50" />
        {sites.map((s, i) => {
          const color = STATUS[s.m.status][1];
          return (
            <span key={s.key}>
              <motion.button
                type="button"
                onClick={() => onOpen(s.m.code)}
                aria-label={`${s.m.name}, ${LOC[s.m.code][0]}. Open its story`}
                title={s.m.name}
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.12 + i * 0.06, ease: EASE }}
                className="group/dot absolute -mt-[22px] -ml-[22px] flex size-11 cursor-pointer items-center justify-center focus-visible:outline-3 focus-visible:-outline-offset-8 focus-visible:outline-paper"
                style={{ left: s.x, top: s.y, zIndex: s.on ? 4 : s.dup ? 1 : 2 }}
              >
                <span
                  className={`rounded-full shadow-[0_0_0_2px_#f2f0eb,0_0_0_3px_#17160f] transition-transform duration-200 ${s.on ? "size-[18px]" : "size-3 group-hover/dot:scale-150"}`}
                  style={{ background: color }}
                />
              </motion.button>
              {!s.dup && (
                <span
                  className="pointer-events-none absolute z-[3] border border-ink bg-paper/90 px-[5px] py-px font-mono text-[11px] whitespace-nowrap"
                  style={{ left: s.x, top: s.y, transform: s.xp > 60 ? "translate(calc(-100% - 14px),-50%)" : "translate(14px,-50%)" }}
                >
                  {s.label}
                </span>
              )}
            </span>
          );
        })}
      </motion.div>
      <div className="flex justify-between font-mono text-[11px] text-muted">
        <span>180° W</span>
        <span className="max-sm:hidden">90° W</span>
        <span>0°</span>
        <span className="max-sm:hidden">90° E</span>
        <span>180° E</span>
      </div>
    </div>
  );
}

export function RestingPlaces() {
  const [open, setOpen] = useState<string | null>(null);

  // /resting-places/#m=MRS-001 opens that machine straight away.
  useEffect(() => {
    const read = () => {
      const m = location.hash.match(HASH);
      if (m && MACHINES.some((x) => x.code === m[1])) setOpen(m[1]);
    };
    read();
    addEventListener("hashchange", read);
    return () => removeEventListener("hashchange", read);
  }, []);

  const elsewhere = MACHINES.filter((m) => m.dest === "deep");

  return (
    <>
      <section className="flex flex-wrap items-end justify-between gap-6 border-b border-ink px-[clamp(20px,4vw,56px)] pt-[clamp(40px,5vw,72px)] pb-8">
        <div className="flex max-w-[640px] flex-col gap-4">
          <span className="font-mono text-[13px] text-muted">Map · where each machine stopped for good</span>
          <h1 className="m-0 text-[clamp(44px,6vw,80px)] leading-[.98] font-medium tracking-[-.035em] text-balance">
            Where they rest.
          </h1>
          <p className="m-0 text-lg leading-[1.55] text-pretty text-ink-2">
            Every dot is a real landing site on a real NASA map, plotted by latitude and longitude. Tap one to open its
            story.
          </p>
          <Link href="/#catalog" className="font-mono text-[13px] underline underline-offset-[3px]">
            ← All machines
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px]">
          {LEGEND.map(([label, color]) => (
            <span key={label} className="flex items-center gap-2">
              <span className="size-3 rounded-full shadow-[0_0_0_2px_#f2f0eb,0_0_0_3px_#17160f]" style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-px border-b border-ink bg-ink">
        <WorldMap world="moon" open={open} onOpen={setOpen} index={0} />
        <WorldMap world="mars" open={open} onOpen={setOpen} index={1} />
      </section>

      <section className="flex flex-col gap-5 px-[clamp(20px,4vw,56px)] pt-10 pb-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="m-0 text-[28px] font-medium tracking-[-.02em]">Off the map</h2>
          <span className="font-mono text-[13px] text-muted">Not on the Moon or Mars</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-px border border-ink bg-ink">
          {elsewhere.map((m) => (
            <button
              key={m.code}
              type="button"
              onClick={() => setOpen(m.code)}
              className="group box-border flex cursor-pointer flex-col gap-2 bg-paper p-5 text-left transition-colors duration-300 hover:bg-paper-2 focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-ink"
            >
              <span className="font-mono text-xs text-muted">{m.code}</span>
              <span className="text-[19px] font-medium tracking-[-.01em]">{m.name}</span>
              <span className="text-[15px] leading-[1.45] text-ink-2">{LOC[m.code][0]}</span>
              <span className="mt-1 font-mono text-xs transition-transform duration-300 group-hover:translate-x-1">
                Tell me about it →
              </span>
            </button>
          ))}
        </div>
      </section>

      <section id="credits" className="flex flex-col gap-2 border-t border-ink px-[clamp(20px,4vw,56px)] py-7 font-mono text-[13px] text-ink-2">
        <span>Coordinates from NASA and NSSDCA mission pages. Longitudes shown east-positive.</span>
        <span className="text-muted">{WORLDS.moon.credit}</span>
        <span className="text-muted">{WORLDS.mars.credit}</span>
      </section>

      <AnimatePresence>
        {open && <MachineSheet code={open} onClose={() => setOpen(null)} onPick={setOpen} onMapPage />}
      </AnimatePresence>
    </>
  );
}
