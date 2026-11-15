"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { MACHINES } from "@/data/archive/machines";
import { useToday } from "@/lib/today";
import { CountUp } from "./CountUp";

const OPP_LAST = Date.parse("2018-06-10");
const LRRR_SET = Date.parse("1969-07-21");
const HEADLINE = "We left robots on other worlds. Here’s what they found.".split(" ");

export function Hero() {
  const today = useToday();
  const reduce = useReducedMotion();
  const oppDays = today == null ? null : Math.floor((today - OPP_LAST) / 864e5);
  const llrYears = today == null ? null : Math.floor((today - LRRR_SET) / 3.15576e10);

  return (
    <section id="begin" className="flex scroll-mt-0 flex-wrap gap-px border-b border-ink bg-ink">
      <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-8 bg-paper px-[clamp(20px,4vw,56px)] pt-[clamp(40px,6vw,80px)] pb-12">
        <Reveal>
          <div className="font-mono text-[13px] text-muted">
            {MACHINES.length} machines · Moon, Mars, asteroids &amp; deep space · told in their own words
          </div>
        </Reveal>
        {/* The heading triggers the words: each word starts clipped out of sight, so it can't detect itself. */}
        <motion.h1
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          className="m-0 text-[clamp(48px,7vw,96px)] leading-[.98] font-medium tracking-[-.035em] text-balance"
        >
          {HEADLINE.map((w, i) => [
            i > 0 ? " " : null,
            <span key={i} className="inline-block overflow-hidden pb-[.08em] align-bottom">
              <motion.span
                className={`inline-block ${w === "found." ? "text-accent" : ""}`}
                variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
                transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>,
          ])}
        </motion.h1>
        <Reveal delay={0.16} className="flex flex-wrap items-end gap-8">
          <p className="m-0 max-w-[460px] text-lg leading-[1.55] text-pretty text-ink-2">
            Rovers, landers, a helicopter, a mirror and probes still drifting through space. Pick one and it will tell
            you why it was sent, how it got there, what it discovered, and how its mission ended.
          </p>
          <a
            href="#catalog"
            className="group focus-ring bg-ink px-5 py-3.5 font-mono text-sm whitespace-nowrap text-paper transition-colors duration-300 hover:bg-accent hover:text-paper"
          >
            Meet the machines{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>

      <div className="flex min-w-0 flex-[1_1_320px] flex-col bg-paper">
        <div className="flex justify-between gap-3 border-b border-ink px-7 py-5 font-mono text-[13px] whitespace-nowrap">
          <span>MRS-001 · Opportunity</span>
          <span className="text-accent">
            <span className="pulse-dot">●</span> Silent
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 border-b border-ink px-7 py-8">
          <div className="font-mono text-[13px] text-muted">Days without a signal</div>
          <div className="font-mono text-[clamp(64px,7vw,88px)] leading-none font-medium tracking-[-.04em] text-accent">
            <CountUp value={oppDays} />
          </div>
          <div className="mt-2.5 text-[15px] leading-normal text-ink-2">
            Last heard Jun 10, 2018, during a planet-wide dust storm.
          </div>
        </div>
        <div className="flex flex-col gap-1.5 px-7 py-6">
          <div className="font-mono text-[13px] text-muted">LUN-001 · Years reflecting lasers</div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[40px] font-medium tracking-[-.03em] text-alive">
              <CountUp value={llrYears} duration={1.2} />
            </span>
            <span className="text-[15px] text-ink-2">and still working</span>
          </div>
        </div>
      </div>
    </section>
  );
}
