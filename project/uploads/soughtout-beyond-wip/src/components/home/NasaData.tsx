"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LOC, MACHINES, WORLDS } from "@/data/archive/machines";
import { SOURCES } from "@/data/archive/sources";
import STORIES from "@/data/archive/stories";
import { CountUp } from "./CountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

// Every number here is counted from the site's own data, so it stays true as machines are added.
const PAGES = new Set(Object.values(SOURCES).flatMap((list) => list.map((s) => s.url))).size;
const PHOTOS = MACHINES.filter((m) => m.img).length;
const SITES = Object.values(LOC).reduce((n, [, pts]) => n + (pts?.length ?? 0), 0);
const QUESTIONS = Object.values(STORIES).reduce((n, st) => n + st.quiz.length, 0);

const STATS: [number, string][] = [
  [PAGES, "NASA, JPL and NSSDCA pages every fact is checked against"],
  [PHOTOS, "NASA images, one per machine: real photos plus a few NASA artist’s illustrations"],
  [SITES, "machine locations plotted on NASA maps by latitude and longitude"],
  [QUESTIONS, "quiz questions, each answered in its story"],
];

const DATA = [
  ["NASA Science mission pages", "Why each machine was sent, what it found and how it ended.", "https://science.nasa.gov/"],
  ["NSSDCA spacecraft records", "Launch and landing dates, masses and samples from NASA’s space science archive.", "https://nssdc.gsfc.nasa.gov/"],
  ["LRO Moon mosaic", WORLDS.moon.credit.replace("Moon map: ", ""), "https://svs.gsfc.nasa.gov/4720"],
  ["Viking Mars mosaic", WORLDS.mars.credit.replace("Mars map: ", ""), "https://commons.wikimedia.org/wiki/File:Mars_Viking_MDIM21_ClrMosaic_1km.jpg"],
] as const;

/** Shows how much real NASA data the site is built on. */
export function NasaData() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: EASE },
  });

  return (
    <section id="data" className="flex flex-col gap-8 border-b border-ink px-[clamp(20px,4vw,56px)] py-12">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="m-0 text-[28px] font-medium tracking-[-.02em]">Built on NASA data</h2>
        <span className="font-mono text-[13px] text-muted">Every number below is counted from the site itself</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-px border border-ink bg-ink">
        {STATS.map(([n, label], i) => (
          <motion.div key={label} {...rise(i * 0.06)} className="flex flex-col gap-2 bg-paper p-6">
            <span className="font-mono text-[clamp(44px,5vw,64px)] leading-none font-medium tracking-[-.04em] text-accent">
              <CountUp value={n} duration={1.2} />
            </span>
            <span className="text-[15px] leading-[1.45] text-ink-2">{label}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-px border border-ink bg-ink">
        {DATA.map(([name, text, url], i) => (
          <motion.a
            key={name}
            {...rise(0.1 + i * 0.06)}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 flex-[1_1_240px] flex-col gap-1.5 bg-paper p-5 text-ink transition-colors duration-300 hover:bg-paper-2 hover:text-ink"
          >
            <span className="font-mono text-xs text-muted">0{i + 1} · NASA data</span>
            <span className="text-[17px] font-medium">
              {name} <span className="inline-block text-muted transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </span>
            <span className="text-sm leading-[1.45] text-ink-2">{text}</span>
          </motion.a>
        ))}
      </div>

      <motion.p {...rise(0.2)} className="m-0 max-w-[760px] bg-paper-3 px-5 py-4 text-[16px] leading-[1.5] text-pretty">
        <span className="font-mono text-xs text-accent">For teachers · </span>
        Every story prints as a worksheet with its five chapters, the quiz, the answers and its NASA sources. Open any
        machine and press “Print / Save PDF”.
      </motion.p>
    </section>
  );
}
