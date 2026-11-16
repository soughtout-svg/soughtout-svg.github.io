"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BACKDROPS } from "@/data/archive/backdrops";
import { LOC, MACHINES, STATUS, WORLDS, pos, when } from "@/data/archive/machines";
import { SOURCES } from "@/data/archive/sources";
import STORIES from "@/data/archive/stories";
import { useToday } from "@/lib/today";

/** Fill these in before submitting. They appear on slides 1 and 7. */
const TEAM = {
  team: "SoughtOut Beyond",
  members: "Soughtout Chijioke Joseph",
  challenge: "Abandoned but not Forgotten",
};
const SITE = "soughtout-svg.github.io/beyond";

// Counted from the site's own data, like the "Built on NASA data" section.
const PAGES = new Set(Object.values(SOURCES).flatMap((l) => l.map((s) => s.url))).size;
const SITES = Object.values(LOC).reduce((n, [, pts]) => n + (pts?.length ?? 0), 0);
const QUESTIONS = Object.values(STORIES).reduce((n, st) => n + st.quiz.length, 0);

const byCode = (c: string) => MACHINES.find((m) => m.code === c)!;
const OPP = byCode("MRS-001");

/** One 16:9 slide. Text sizes use cqw so the whole slide scales with the window. */
function Slide({ n, children, dark = false, className = "" }: { n: number; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <section
      data-slide={n}
      className={`deck-slide @container relative mx-auto aspect-[16/9] w-[min(100vw,calc(100svh*16/9))] overflow-hidden ${dark ? "bg-ink text-paper" : "bg-paper text-ink"} ${className}`}
    >
      {children}
      <span className={`absolute left-[5cqw] bottom-[2cqw] font-mono text-[1.1cqw] ${dark ? "text-paper/60" : "text-muted"}`}>
        SoughtOut Beyond · {n}/7
      </span>
    </section>
  );
}

const Kicker = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span className={`font-mono text-[1.3cqw] ${dark ? "text-accent-bright" : "text-accent"}`}>{children}</span>
);
const H = ({ children }: { children: ReactNode }) => (
  <h2 className="m-0 text-[4.4cqw] leading-[1] font-medium tracking-[-.035em] text-balance">{children}</h2>
);
const Photo = ({ src, alt, className = "" }: { src?: string; alt: string; className?: string }) => (
  <div role="img" aria-label={alt} className={`bg-paper-4 bg-cover bg-center ${className}`} style={{ backgroundImage: src ? `url(${src})` : "none" }} />
);

export function Deck() {
  const today = useToday();
  const oppDays = today == null ? "3,000+" : Math.floor((today - Date.parse("2018-06-10")) / 864e5).toLocaleString("en-US");
  const [cur, setCur] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const go = (n: number) => {
    const t = Math.max(1, Math.min(7, n));
    ref.current?.querySelector(`[data-slide="${t}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Track the slide on screen, and let arrow keys / space move between slides.
  useEffect(() => {
    const els = [...(ref.current?.querySelectorAll<HTMLElement>("[data-slide]") ?? [])];
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur(Number((e.target as HTMLElement).dataset.slide))),
      { threshold: 0.6 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const step = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key) ? 1 : ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key) ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      go(cur + step);
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  });

  const story = STORIES["MRS-001"];
  const marsSites = MACHINES.filter((m) => m.dest === "mars" && LOC[m.code]?.[1]).flatMap((m) =>
    LOC[m.code][1]!.map((p, i) => ({ key: `${m.code}${i}`, ...pos(p[0], p[1]), m, label: p[2] ?? m.name.replace(/ (Lander|Rover|Helicopter)$/, "") })),
  );

  return (
    <div ref={ref} className="deck flex flex-col items-center gap-[3vh] bg-[#0d0c09] py-[3vh]">
      {/* 1 · Title */}
      <Slide n={1} dark>
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${BACKDROPS.moon})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#17160ff2_0%,#17160fb3_55%,#17160f40_100%)]" />
        <div className="relative flex h-full flex-col justify-between p-[5cqw]">
          <Kicker dark>NASA Space Apps Challenge 2026 · {TEAM.challenge}</Kicker>
          <div className="flex flex-col gap-[1.6cqw]">
            <h1 className="m-0 text-[8cqw] leading-[.92] font-medium tracking-[-.04em]">SoughtOut Beyond</h1>
            <p className="m-0 max-w-[60cqw] text-[2.4cqw] leading-[1.3] text-[#d9d5ca]">
              Stories of the machines we left on the Moon, Mars and in deep space, told in their own words.
            </p>
          </div>
          <div className="flex flex-col gap-[.6cqw] font-mono text-[1.5cqw]">
            <span>Team: {TEAM.team}</span>
            <span className="text-[#d9d5ca]">{TEAM.members}</span>
          </div>
        </div>
        <span className="absolute top-[2.4cqw] right-[3cqw] bg-ink/75 px-[.8cqw] py-[.3cqw] font-mono text-[1cqw] text-paper/80">
          Background: AI-generated image · Higgsfield
        </span>
      </Slide>

      {/* 2 · The problem */}
      <Slide n={2}>
        <div className="grid h-full grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col justify-center gap-[2.4cqw] p-[5cqw]">
            <Kicker>The challenge · Abandoned but not Forgotten</Kicker>
            <H>NASA left hardware on the Moon and Mars. Most students don’t know it’s there.</H>
            <p className="m-0 text-[1.9cqw] leading-[1.45] text-ink-2">
              Rovers, landers, a helicopter, a mirror and probes are still out there. Their stories are scattered across
              hundreds of technical mission pages written for experts, not students.
            </p>
          </div>
          <div className="flex flex-col border-l border-ink">
            <Photo src={OPP.img} alt={OPP.alt} className="flex-1" />
            <div className="flex flex-col gap-[.6cqw] border-t border-ink p-[3cqw]">
              <span className="font-mono text-[1.2cqw] text-muted">MRS-001 · Opportunity · Days without a signal</span>
              <span className="font-mono text-[6cqw] leading-none font-medium tracking-[-.04em] text-accent">{oppDays}</span>
              <span className="text-[1.4cqw] text-ink-2">Last heard Jun 10, 2018, during a planet-wide dust storm.</span>
            </div>
          </div>
        </div>
      </Slide>

      {/* 3 · The solution */}
      <Slide n={3}>
        <div className="flex h-full flex-col gap-[2.4cqw] p-[5cqw]">
          <div className="flex flex-col gap-[1.2cqw]">
            <Kicker>Our solution</Kicker>
            <H>{MACHINES.length} machines tell their own stories.</H>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-px border border-ink bg-ink">
            {["LUN-001", "MRS-002", "DSP-004"].map((c) => {
              const m = byCode(c);
              const [label, color] = STATUS[m.status];
              return (
                <div key={c} className="flex min-h-0 flex-col gap-[1cqw] bg-paper p-[1.6cqw]">
                  <div className="flex justify-between font-mono text-[1cqw]">
                    <span>{m.code}</span>
                    <span style={{ color }}>● {label}</span>
                  </div>
                  <Photo src={m.img} alt={m.alt} className="aspect-[16/9] w-full" />
                  <span className="text-[1.9cqw] leading-[1.1] font-medium tracking-[-.02em]">{m.name}</span>
                  <span className="bg-paper-3 px-[1cqw] py-[.8cqw] text-[1.3cqw] leading-[1.4]">“{m.voice}”</span>
                </div>
              );
            })}
          </div>
          <p className="m-0 text-[1.6cqw] text-ink-2">
            First-person stories for students: Moon, Mars and deep space, filtered in one tap.
          </p>
        </div>
      </Slide>

      {/* 4 · User experience */}
      <Slide n={4}>
        <div className="grid h-full grid-cols-[1fr_1.35fr]">
          <div className="flex flex-col justify-center gap-[2cqw] border-r border-ink p-[4.4cqw]">
            <Kicker>How it works</Kicker>
            <H>Tap a machine. Five chapters, then a quiz.</H>
            <ol className="m-0 flex list-none flex-col gap-[.9cqw] p-0 text-[1.6cqw]">
              {["The Mission: why was it sent?", "The Journey: how did it get there?", "The Discovery: what did it find?", "The Final Signal: how did it end?", "The Legacy: why does it still matter?"].map((t, i) => (
                <li key={t} className="flex gap-[1cqw]">
                  <span className="font-mono text-muted">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <p className="m-0 font-mono text-[1.2cqw] text-muted">Read aloud · Larger text · High contrast · Print as a worksheet · A 3D Scout to take apart, each part labelled with the machine it came from</p>
          </div>
          <div className="flex flex-col gap-[1.4cqw] bg-paper-2 p-[3cqw]">
            <div className="flex gap-[1.6cqw]">
              <Photo src={OPP.img} alt={OPP.alt} className="aspect-[4/3] w-[16cqw] flex-none" />
              <div className="flex flex-col gap-[.6cqw]">
                <span className="text-[2.6cqw] leading-none font-medium tracking-[-.03em]">Opportunity</span>
                <span className="font-mono text-[1.1cqw] text-muted">
                  {OPP.mission} · {when(OPP)}
                </span>
                <span className="font-mono text-[1.1cqw] text-accent">Chapter 03 · The Discovery</span>
                <span className="text-[1.4cqw] leading-[1.45]">{story.ch[2]}</span>
              </div>
            </div>
            <div className="flex flex-col gap-[.8cqw] border border-ink bg-paper p-[1.6cqw]">
              <span className="font-mono text-[1.1cqw] text-muted">Quiz · Question 2</span>
              <span className="text-[1.6cqw] font-medium">{story.quiz[1][0]}</span>
              <div className="grid grid-cols-3 gap-[.8cqw]">
                {story.quiz[1][1].map((o, i) => (
                  <span
                    key={o}
                    className={`border border-ink px-[1cqw] py-[.7cqw] text-[1.3cqw] ${i === story.quiz[1][2] ? "bg-alive text-white" : ""}`}
                  >
                    {o} {i === story.quiz[1][2] ? "✓" : ""}
                  </span>
                ))}
              </div>
              <span className="text-[1.2cqw] text-ink-2">{story.quiz[1][3]} Every answer is in the story.</span>
            </div>
          </div>
        </div>
      </Slide>

      {/* 5 · The map */}
      <Slide n={5} dark>
        <div className="flex h-full flex-col gap-[2cqw] p-[4.4cqw]">
          <div className="flex items-end justify-between gap-[3cqw]">
            <div className="flex flex-col gap-[1.2cqw]">
              <Kicker dark>Where they rest</Kicker>
              <H>Every dot is a real landing site.</H>
            </div>
            <p className="m-0 max-w-[34cqw] text-[1.5cqw] leading-[1.45] text-[#d9d5ca]">
              {SITES} machine locations plotted by latitude and longitude on NASA Moon and Mars maps. Tap a dot to open
              that machine’s story.
            </p>
          </div>
          <div
            className="relative flex-1 border border-paper/40 bg-[#2a2925] bg-[length:100%_100%] bg-center"
            style={{ backgroundImage: `url(${WORLDS.mars.map})` }}
          >
            {marsSites.map((s) => (
              <span key={s.key}>
                <span
                  className="absolute -mt-[.7cqw] -ml-[.7cqw] size-[1.4cqw] rounded-full shadow-[0_0_0_2px_#f2f0eb,0_0_0_3px_#17160f]"
                  style={{ left: s.x, top: s.y, background: STATUS[s.m.status][1] }}
                />
                <span
                  className="absolute border border-ink bg-paper px-[.5cqw] font-mono text-[1cqw] whitespace-nowrap text-ink"
                  style={{ left: s.x, top: s.y, transform: s.xp > 60 ? "translate(calc(-100% - 1.2cqw),-50%)" : "translate(1.2cqw,-50%)" }}
                >
                  {s.label}
                </span>
              </span>
            ))}
            <span className="absolute bottom-[1cqw] left-[1cqw] font-mono text-[1cqw] text-paper/70">{WORLDS.mars.credit}</span>
          </div>
        </div>
      </Slide>

      {/* 6 · NASA data */}
      <Slide n={6}>
        <div className="flex h-full flex-col gap-[2.4cqw] p-[4.4cqw]">
          <div className="flex flex-col gap-[1.2cqw]">
            <Kicker>Built on NASA data</Kicker>
            <H>NASA open data makes every story possible.</H>
          </div>
          <div className="grid grid-cols-4 gap-px border border-ink bg-ink">
            {[
              [PAGES, "NASA, JPL & NSSDCA pages every fact is checked against"],
              [MACHINES.length, "NASA images, one per machine"],
              [SITES, "locations on NASA LRO & Viking maps"],
              [QUESTIONS, "quiz questions, each answered in its story"],
            ].map(([n, l]) => (
              <div key={l} className="flex flex-col gap-[.6cqw] bg-paper p-[1.8cqw]">
                <span className="font-mono text-[5cqw] leading-none font-medium tracking-[-.04em] text-accent">{n}</span>
                <span className="text-[1.3cqw] leading-[1.35] text-ink-2">{l}</span>
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-2 gap-[3cqw] text-[1.4cqw] leading-[1.45]">
            <div className="flex flex-col gap-[.8cqw]">
              <span className="font-mono text-[1.1cqw] text-muted">NASA data used</span>
              <span>NASA Science mission pages · NSSDCA spacecraft records · NASA mission photos and illustrations · LRO Moon mosaic · Viking Mars mosaic</span>
              <span className="text-ink-2">Every story ends with its sources, so teachers can check them.</span>
            </div>
            <div className="flex flex-col gap-[.8cqw]">
              <span className="font-mono text-[1.1cqw] text-muted">Built with</span>
              <span>Next.js · React · TypeScript · Tailwind CSS · Framer Motion · GitHub Pages</span>
              <span className="text-ink-2">
                AI use: background images and the Scout guide made with Higgsfield (watermarked); code written with
                help from Claude; text drafted with AI and checked against NASA pages.
              </span>
            </div>
          </div>
        </div>
      </Slide>

      {/* 7 · The future */}
      <Slide n={7} dark>
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${BACKDROPS.deep})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#17160ff2_0%,#17160fcc_55%,#17160f33_100%)]" />
        <div className="relative flex h-full flex-col justify-between p-[5cqw]">
          <Kicker dark>What’s next</Kicker>
          <div className="flex max-w-[62cqw] flex-col gap-[2cqw]">
            <H>
              Left behind, but <span className="text-accent-bright">not forgotten.</span>
            </H>
            <ul className="m-0 flex list-none flex-col gap-[.8cqw] p-0 text-[1.8cqw] text-[#d9d5ca]">
              <li>→ More machines: Voyager 1 and 2, the Apollo 16 and 17 rovers</li>
              <li>→ More languages, so every student can read them</li>
              <li>→ Classroom packs: printable worksheets and teacher guides</li>
            </ul>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-[2cqw] font-mono text-[1.5cqw]">
            <span>
              Try it: <span className="text-accent-bright">{SITE}</span>
            </span>
            <span className="text-paper/70">
              {TEAM.team} · {TEAM.challenge}
            </span>
          </div>
        </div>
        <span className="absolute top-[2.4cqw] right-[3cqw] bg-ink/75 px-[.8cqw] py-[.3cqw] font-mono text-[1cqw] text-paper/80">
          Background: AI-generated image · Higgsfield
        </span>
      </Slide>

      {/* On-screen controls (hidden when printing) */}
      <div className="no-print fixed right-4 bottom-4 z-10 flex items-center gap-2 font-mono text-[13px] opacity-40 transition-opacity duration-300 hover:opacity-100 focus-within:opacity-100">
        <button type="button" onClick={() => go(cur - 1)} aria-label="Previous slide" className="focus-ring size-10 cursor-pointer border border-paper/40 bg-ink text-paper hover:bg-accent">
          ←
        </button>
        <span className="min-w-12 bg-ink px-2 py-2 text-center text-paper">{cur}/7</span>
        <button type="button" onClick={() => go(cur + 1)} aria-label="Next slide" className="focus-ring size-10 cursor-pointer border border-paper/40 bg-ink text-paper hover:bg-accent">
          →
        </button>
        <button type="button" onClick={() => print()} className="focus-ring h-10 cursor-pointer border border-paper/40 bg-ink px-3 text-paper hover:bg-accent">
          Save as PDF
        </button>
      </div>
    </div>
  );
}
