"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SCOUT_SHEET } from "@/data/archive/backdrops";

/**
 * Scout leads the way: a small guide in the corner whose speech bubble follows
 * the section you're reading, with a button that takes you to the next one.
 */
interface Step {
  id: string;
  say: string;
  next: { label: string; to: string };
}

const HOME: Step[] = [
  { id: "about", say: "Hi, I’m Scout! I go looking for machines people left behind. Our name comes from this verse.", next: { label: "Let’s go", to: "#begin" } },
  { id: "begin", say: "We left robots on other worlds. That orange number is how many days Opportunity has been silent.", next: { label: "Meet them", to: "#catalog" } },
  { id: "catalog", say: "Tap any card and that machine tells you its own story. Try the Moon, Mars and Deep space filters too!", next: { label: "How stories work", to: "#chapters" } },
  { id: "chapters", say: "Every story has five chapters, then a 3-question quiz. Can you get 3 out of 3?", next: { label: "Their working lives", to: "#lifespans" } },
  { id: "lifespans", say: "Each bar runs from landing to last signal. See the one that reaches today? The laser mirror still works!", next: { label: "Where it comes from", to: "#data" } },
  { id: "data", say: "Everything here comes from real NASA data: mission pages, photos and maps. Teachers can print any story as a worksheet!", next: { label: "Keep going", to: "#drifting" } },
  { id: "drifting", say: "Some machines never landed anywhere. Pioneer 10 is still drifting out of the solar system.", next: { label: "Who am I?", to: "#scout" } },
  { id: "scout", say: "That’s me! Every part of me comes from a real machine. Can you spot them all?", next: { label: "Almost done", to: "#how" } },
  { id: "how", say: "Every fact here is checked against NASA pages. Now let’s see where they all rest.", next: { label: "Open the map", to: "/resting-places/" } },
];

const MAP: Step[] = [
  { id: "rest", say: "This is where each machine stopped for good. Every dot is a real landing site.", next: { label: "See the maps", to: "#maps" } },
  { id: "maps", say: "Tap a dot to hear that machine’s story. Two Apollo machines share a spot on the Moon!", next: { label: "Off the map", to: "#offmap" } },
  { id: "offmap", say: "These four aren’t on the Moon or Mars. They’re out in deep space, or resting on an asteroid.", next: { label: "Back to the machines", to: "/#catalog" } },
];

const KEY = "soughtout.guide";

/** Restarts the guide's steps on each page. */
export function ScoutGuide() {
  const pathname = usePathname();
  return <Guide key={pathname} pathname={pathname} />;
}

function Guide({ pathname }: { pathname: string | null }) {
  const reduce = useReducedMotion();
  const steps = pathname?.startsWith("/resting-places") ? MAP : HOME;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(true);
  const [ready, setReady] = useState(false);

  // Remember whether the reader tucked Scout away.
  useEffect(() => {
    let saved = true;
    try {
      saved = localStorage.getItem(KEY) !== "closed";
    } catch {
      /* storage blocked */
    }
    // Arrive a moment after the page so Scout doesn't compete with the intro.
    const t = setTimeout(() => {
      setOpen(saved);
      setReady(true);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  // The step is whichever section crosses the middle of the screen.
  useEffect(() => {
    const els = steps.map((s) => document.getElementById(s.id));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = els.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    try {
      localStorage.setItem(KEY, next ? "open" : "closed");
    } catch {
      /* storage blocked */
    }
  };

  const step = steps[Math.min(active, steps.length - 1)];
  const goNext = (e: React.MouseEvent) => {
    if (!step.next.to.startsWith("#")) return; // other page: let the Link navigate
    e.preventDefault();
    const el = document.getElementById(step.next.to.slice(1));
    if (!el) return;
    // Short sections are centred so they reach the middle of the screen, where Scout reads from.
    const short = el.offsetHeight < innerHeight * 0.9;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: short ? "center" : "start" });
  };

  if (!ready) return null;

  return (
    <div className="no-print pointer-events-none fixed right-3 bottom-3 z-[15] flex items-end gap-2 sm:right-5 sm:bottom-5">
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key={step.id}
            role="status"
            aria-live="polite"
            initial={reduce ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.97, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative mb-3 flex w-[min(300px,calc(100vw-96px))] origin-bottom-right flex-col gap-2 border border-ink bg-paper p-3 sm:gap-3 sm:p-4 shadow-[4px_4px_0_#17160f]"
          >
            <div className="flex items-baseline justify-between gap-2 font-mono text-[11px] text-muted">
              <span>
                Scout · {Math.min(active, steps.length - 1) + 1}/{steps.length}
              </span>
              <button
                type="button"
                onClick={toggle}
                aria-label="Hide Scout’s tips"
                className="focus-ring -m-1 cursor-pointer p-1 text-ink hover:text-accent"
              >
                ✕
              </button>
            </div>
            <p className="m-0 text-sm leading-[1.4] text-ink sm:text-[15px] sm:leading-[1.45]">{step.say}</p>
            <Link
              href={step.next.to}
              onClick={goNext}
              className="group focus-ring self-start bg-ink px-3 py-2 font-mono text-xs text-paper transition-colors duration-200 hover:bg-accent hover:text-paper"
            >
              {step.next.label}{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            {/* Little tail pointing at Scout */}
            <span
              aria-hidden="true"
              className="absolute -right-[7px] bottom-5 size-3 rotate-45 border-t border-r border-ink bg-paper"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        aria-label={open ? "Hide Scout’s tips (Scout is an AI-generated image)" : "Ask Scout for a tip (Scout is an AI-generated image)"}
        aria-expanded={open}
        initial={reduce ? false : { opacity: 0, y: 40, rotate: -12 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="focus-ring pointer-events-auto relative size-16 flex-none cursor-pointer rounded-full border-2 border-ink bg-[#8a8a88] shadow-[3px_3px_0_#17160f] sm:size-[88px]"
      >
        {/* Front view, cropped from the left third of Scout's turnaround sheet. */}
        <span
          className={`absolute inset-0 overflow-hidden rounded-full ${reduce ? "" : "scout-bob"}`}
          style={{ backgroundImage: `url(${SCOUT_SHEET})`, backgroundSize: "300% auto", backgroundPosition: "0% 45%" }}
        />
        {/* Visible AI watermark on Scout's face. */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-sm border border-ink bg-paper px-1 font-mono text-[9px] leading-[14px] text-ink"
        >
          AI
        </span>
        {!open && (
          <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-ink bg-accent-bright font-mono text-xs font-medium text-ink">
            ?
          </span>
        )}
      </motion.button>
    </div>
  );
}
