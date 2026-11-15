"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin accent bar along the top of the window showing how far you've read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="no-print fixed inset-x-0 top-0 z-30 h-[3px] origin-left bg-accent-bright"
      style={{ scaleX }}
    />
  );
}
