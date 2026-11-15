"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Backdrop } from "@/components/fx/Backdrop";
import { BACKDROP_CREDIT, BACKDROPS } from "@/data/archive/backdrops";

const EASE = [0.22, 1, 0.36, 1] as const;

/** A cinematic break between the timeline and "How it works". */
export function DriftingBanner() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <Backdrop
      src={BACKDROPS.deep}
      position="70% center"
      credit={BACKDROP_CREDIT}
      shade="linear-gradient(90deg,#17160ff2 0%,#17160fb3 45%,#17160f33 100%)"
      className="flex min-h-[min(80svh,720px)] items-center border-b border-ink text-paper"
    >
      <div className="flex max-w-[760px] flex-col gap-6 px-[clamp(20px,4vw,56px)] py-[clamp(64px,10vw,140px)]">
        <motion.span {...rise(0)} className="font-mono text-[13px] text-accent-bright">
          DSP-004 · Pioneer 10 · Drifting
        </motion.span>
        <motion.h2
          {...rise(0.1)}
          className="m-0 text-[clamp(40px,5.5vw,76px)] leading-[1] font-medium tracking-[-.035em] text-balance"
        >
          Some of them are still out there, <span className="shimmer text-accent-bright">drifting.</span>
        </motion.h2>
        <motion.p {...rise(0.2)} className="m-0 max-w-[560px] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-pretty text-[#d9d5ca]">
          Pioneer 10 was built for 21 months and lasted more than 30 years. Now it’s heading toward the star Aldebaran,
          carrying a map back to Earth on its plaque.
        </motion.p>
        <motion.div {...rise(0.3)} className="flex flex-wrap gap-3">
          <Link
            href="/resting-places/#m=DSP-004"
            className="group focus-ring bg-accent-bright px-5 py-3.5 font-mono text-sm font-medium whitespace-nowrap text-ink transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            See where they all rest{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </Backdrop>
  );
}
