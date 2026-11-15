"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Tilt } from "@/components/fx/Tilt";
import { SCOUT_SHEET } from "@/data/archive/backdrops";

const EASE = [0.22, 1, 0.36, 1] as const;

const PARTS = [
  ["Camera eyes", "Two round lenses side by side, like the cameras on a rover’s mast."],
  ["Prism forehead", "Small mirror prisms, like the 100 on the Apollo 11 laser reflector."],
  ["Gold foil", "Crinkled thermal foil, the kind spacecraft wear to handle heat and cold."],
  ["Mars dust", "A coat of rust-orange dust, like the dust that covered the rovers’ solar panels."],
];

/** The site mascot, built from pieces of the machines in the catalog. */
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
      <div className="flex min-w-0 flex-[1.6_1_560px] items-center bg-[#8a8a88] p-[clamp(16px,3vw,40px)]">
        <motion.div {...rise(0)} className="w-full">
          <Tilt>
            <div
              role="img"
              aria-label="Scout the robot mascot shown from the front, the side and the back: camera-lens eyes, a mirror-prism forehead, gold foil panels, a dish antenna and a camera-mast neck"
              className="aspect-[16/9] w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${SCOUT_SHEET})` }}
            />
            {/* Visible AI watermark, required by the Space Apps rules for generated images. */}
            <span className="absolute right-2 bottom-2 bg-ink/75 px-2 py-1 font-mono text-[10px] text-paper">
              AI-generated image · Higgsfield
            </span>
          </Tilt>
        </motion.div>
      </div>
      <div className="flex min-w-0 flex-[1_1_340px] flex-col justify-center gap-5 bg-paper px-[clamp(20px,4vw,56px)] py-[clamp(32px,4vw,56px)]">
        <motion.span {...rise(0.05)} className="font-mono text-[13px] text-accent">
          SO-B · Your guide
        </motion.span>
        <motion.h2 {...rise(0.1)} className="m-0 text-[clamp(32px,3.6vw,48px)] leading-[1.02] font-medium tracking-[-.03em]">
          Meet Scout.
        </motion.h2>
        <motion.p {...rise(0.15)} className="m-0 text-[17px] leading-[1.55] text-pretty text-ink-2">
          Scout is our made-up guide, built from pieces of the real machines in the catalog. Spot the parts, then go find
          the machines they came from.
        </motion.p>
        <ul className="m-0 flex list-none flex-col p-0">
          {PARTS.map(([name, text], i) => (
            <motion.li key={name} {...rise(0.2 + i * 0.06)} className="flex flex-col gap-1 border-t border-ink/20 py-3">
              <span className="font-mono text-xs text-muted">0{i + 1} · {name}</span>
              <span className="text-[15px] leading-[1.45]">{text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
