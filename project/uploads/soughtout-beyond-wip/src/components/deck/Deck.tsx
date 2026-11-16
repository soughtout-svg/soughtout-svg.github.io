"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { LOC } from "@/data/archive/machines";
import { SOURCES } from "@/data/archive/sources";
import STORIES from "@/data/archive/stories";

/**
 * The 7-slide project demo, laid out like the Submission Guide asks:
 * team and challenge, what inspired us, an image of the project, the user
 * experience, more of the project, the NASA data behind it, and the future.
 * It mirrors the Claude Slides version of the deck.
 */
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

// Screenshots of the site, served from public/deck-img (relative so it works under /beyond).
const IMG = (name: string) => `../deck-img/${name}.png`;

// Colours: bright blue instead of black, white and yellow on blue.
const BLUE = "bg-[#1E3FA8] text-[#FFFDF7]";
const YELLOW = "text-[#FFD54A]";
const RUST = "text-[#9E3A10]";

/** One 16:9 slide on a 1920-wide canvas; 1cqw = 19.2px, so every size scales with the window. */
function Slide({ n, children, dark = false, className = "" }: { n: number; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <section
      data-slide={n}
      className={`deck-slide @container relative mx-auto aspect-[16/9] w-[min(100vw,calc(100svh*16/9))] overflow-hidden ${dark ? BLUE : "bg-paper text-ink"} ${className}`}
    >
      <div className="flex h-full flex-col gap-[2.1cqw] px-[6.67cqw] pt-[6.67cqw] pb-[8.33cqw]">{children}</div>
      <span className={`absolute bottom-[3.33cqw] left-[6.67cqw] font-mono text-[1.46cqw] ${dark ? "text-[#E3E9FF]" : "text-[#45423A]"}`}>
        SoughtOut Beyond · {n}/7
      </span>
    </section>
  );
}

const Kicker = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span className={`font-mono text-[2cqw] font-medium ${dark ? YELLOW : RUST}`}>{children}</span>
);
const H = ({ children, size = 5 }: { children: ReactNode; size?: number }) => (
  <h2 className="m-0 leading-[1.05] font-medium tracking-[-.1cqw]" style={{ fontSize: `${size}cqw` }}>
    {children}
  </h2>
);
const Lead = ({ children, dark = false, size = 2.3 }: { children: ReactNode; dark?: boolean; size?: number }) => (
  <p className={`m-0 leading-[1.45] ${dark ? "text-[#FFFDF7]" : "text-[#22211A]"}`} style={{ fontSize: `${size}cqw` }}>
    {children}
  </p>
);
const Shot = ({ name, alt, className = "", style }: { name: string; alt: string; className?: string; style?: React.CSSProperties }) => (
  <div
    role="img"
    aria-label={alt}
    className={`bg-contain bg-center bg-no-repeat ${className}`}
    style={{ backgroundImage: `url(${IMG(name)})`, ...style }}
  />
);

export function Deck() {
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

  return (
    <div ref={ref} className="deck flex flex-col items-center gap-[3vh] bg-[#0F1F55] py-[3vh]">
      {/* 1 · Title: project, tagline, team, member, challenge */}
      <Slide n={1} dark>
        <svg aria-hidden="true" viewBox="0 0 560 560" className="absolute top-[26.7cqw] left-[70.4cqw] w-[22.9cqw]">
          <circle cx="280" cy="280" r="250" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2" strokeDasharray="6 10" />
          <circle cx="280" cy="280" r="170" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" />
          <circle cx="280" cy="280" r="90" fill="#E9E6DE" />
          <path d="M280 190 A90 90 0 0 1 280 370 A60 90 0 0 0 280 190 Z" fill="#C9C4B8" />
          <circle cx="476" cy="125" r="14" fill="#FFD54A" />
          <circle cx="118" cy="398" r="9" fill="#FF8A3D" />
        </svg>
        <div className="relative flex h-full flex-col justify-between">
          <Kicker dark>NASA Space Apps Challenge 2026 · {TEAM.challenge}</Kicker>
          <div className="flex flex-col gap-[1.4cqw]">
            <h1 className="m-0 text-[9.4cqw] leading-none font-medium tracking-[-.26cqw]">SoughtOut Beyond</h1>
            <Lead dark>
              <span className="block max-w-[57cqw]">Stories of the machines we left on the Moon, Mars and in deep space, told in their own words.</span>
            </Lead>
          </div>
          <div className="flex flex-col gap-[.6cqw] font-mono">
            <span className="text-[2.1cqw] text-white">Team: {TEAM.team}</span>
            <span className="text-[1.8cqw] text-[#EEF2FF]">{TEAM.members}</span>
          </div>
        </div>
      </Slide>

      {/* 2 · Lead us in: the challenge and what inspired us */}
      <Slide n={2}>
        <div className="grid h-full grid-cols-2 gap-[4.2cqw]">
          <div className="flex flex-col justify-center gap-[1.7cqw]">
            <Kicker>The challenge we chose</Kicker>
            <H>Abandoned but not Forgotten</H>
            <Lead>
              Tell school-age space fans the stories of the hardware NASA left on the Moon and Mars, and the science each one made possible.
            </Lead>
          </div>
          <div className={`flex flex-col justify-center gap-[1.5cqw] p-[2.5cqw] ${BLUE}`}>
            <Kicker dark>What inspired us</Kicker>
            <Lead dark size={2.5}>
              “…and thou shalt be called, <span className={YELLOW}>Sought out</span>, A city not forsaken.”
            </Lead>
            <span className="font-mono text-[1.56cqw] text-[#EEF2FF]">Isaiah 62:12</span>
            <Lead dark>These machines were left behind, but they are not forsaken. So we went looking for them.</Lead>
          </div>
        </div>
      </Slide>

      {/* 3 · An image of the project */}
      <Slide n={3}>
        <Kicker>Our project · SoughtOut Beyond</Kicker>
        <H size={4.2}>16 machines tell their own stories.</H>
        <Shot
          name="project-home"
          alt="The SoughtOut Beyond home page: the headline “We left robots on other worlds. Here’s what they found.” beside a live counter of days since Opportunity’s last signal"
          className="mx-auto h-[29.9cqw] w-[67.7cqw] border-2 border-ink bg-paper"
        />
        <span className="absolute right-[6.67cqw] bottom-[3.33cqw] font-mono text-[1.46cqw] text-[#45423A]">Live site: {SITE}</span>
      </Slide>

      {/* 4 · The user experience */}
      <Slide n={4}>
        <Kicker>How it works</Kicker>
        <H>Read the story. Take the quiz.</H>
        <div className="flex gap-[1.7cqw]">
          <div className="flex flex-col gap-[.6cqw]">
            <Shot name="project-story" alt="A story open on Opportunity: five chapter tabs, with Chapter 3, The Discovery, selected and a Read aloud button" className="h-[20cqw] w-[48.4cqw] border-2 border-ink bg-paper" />
            <span className="font-mono text-[1.56cqw] text-[#45423A]">Five short chapters, with read-aloud</span>
          </div>
          <div className="flex flex-col gap-[.6cqw]">
            <Shot name="project-quiz" alt="Opportunity’s 3-question quiz with two correct answers shown in green, and its NASA sources listed below" className="h-[20cqw] w-[35.7cqw] border-2 border-ink bg-paper" />
            <span className="font-mono text-[1.56cqw] text-[#45423A]">A 3-question quiz, then its NASA sources</span>
          </div>
        </div>
        <Lead size={2}>Larger text, high contrast and a printable worksheet for every story.</Lead>
      </Slide>

      {/* 5 · More of the project: Scout in 3D and the map */}
      <Slide n={5} dark>
        <div className="grid h-full grid-cols-[6fr_5fr] items-center gap-[3.3cqw]">
          <Shot
            name="project-scout"
            alt="Scout, the 3D robot guide, taken apart: each part has a label naming the real machine it comes from, such as camera eyes from Opportunity and a dish antenna from Pioneer 10"
            className="h-[32.7cqw] w-[43.3cqw] border-2 border-[#FFFDF7] bg-[#8A8A87]"
            style={{ transform: "translate(1.35cqw,-2.45cqw) rotate(5deg)" }}
          />
          <div className="flex flex-col gap-[1.7cqw]">
            <Kicker dark>Explore</Kicker>
            <H size={4.2}>Meet Scout, our 3D guide.</H>
            <Lead dark>Take Scout apart. Every part comes from a real machine.</Lead>
            <Lead dark>A map shows where each one rests on NASA’s Moon and Mars maps.</Lead>
          </div>
        </div>
      </Slide>

      {/* 6 · How NASA data makes it possible */}
      <Slide n={6}>
        <Kicker>Built on NASA data</Kicker>
        <H>NASA data powers every story.</H>
        <div className="grid grid-cols-4 border-2 border-ink">
          {[
            [PAGES, "NASA, JPL & NSSDCA pages checked"],
            [16, "NASA images, one per machine"],
            [SITES, "locations on NASA maps"],
            [QUESTIONS, "quiz questions, answered in the stories"],
          ].map(([n, l], i) => (
            <div key={l} className={`flex flex-col gap-[1cqw] p-[1.9cqw] ${i ? "border-l-2 border-ink" : ""}`}>
              <span className="font-mono text-[7.3cqw] leading-none font-medium tracking-[-.2cqw] text-[#A63C12]">{n}</span>
              <span className="text-[1.77cqw] leading-[1.35] text-[#22211A]">{l}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-[3.3cqw]">
          <div className="flex flex-col gap-[.6cqw]">
            <span className="font-mono text-[1.56cqw] text-[#45423A]">NASA data used</span>
            <Lead size={2}>Mission pages · NSSDCA records · NASA photos · LRO and Viking maps</Lead>
          </div>
          <div className="flex flex-col gap-[.6cqw]">
            <span className="font-mono text-[1.56cqw] text-[#45423A]">Built with · AI use</span>
            <Lead size={2}>Next.js, React, three.js. AI images marked; code written with help from Claude.</Lead>
          </div>
        </div>
      </Slide>

      {/* 7 · Look into the future */}
      <Slide n={7} dark>
        <div className="flex h-full flex-col justify-between">
          <Kicker dark>Looking ahead</Kicker>
          <div className="flex max-w-[73cqw] flex-col gap-[1.7cqw]">
            <h2 className="m-0 text-[5.8cqw] leading-[1.05] font-medium tracking-[-.16cqw]">
              Left behind, but <span className={YELLOW}>not forgotten.</span>
            </h2>
            <ul className="m-0 flex list-disc flex-col gap-[.5cqw] pl-[2.4cqw] text-[2.3cqw] leading-[1.45]">
              <li>Any student, anywhere, can meet these machines for free in a browser</li>
              <li>Next: more machines, like Voyager 1 and 2, and more languages</li>
              <li>Classroom packs, so teachers can use every story as a lesson</li>
            </ul>
          </div>
          <div className="flex flex-col gap-[.6cqw] font-mono">
            <span className="text-[2cqw] text-white">
              Try it: <span className={YELLOW}>{SITE}</span>
            </span>
            <span className="text-[1.56cqw] text-[#EEF2FF]">
              Team {TEAM.team} · {TEAM.challenge}
            </span>
          </div>
        </div>
      </Slide>

      {/* On-screen controls (hidden when printing) */}
      <div className="no-print fixed right-4 bottom-4 z-10 flex items-center gap-2 font-mono text-[13px] opacity-40 transition-opacity duration-300 focus-within:opacity-100 hover:opacity-100">
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
