"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
const DAY = 864e5;

/**
 * Today's date (midnight, as a timestamp) on the client and null during
 * server rendering, so date-based numbers never cause a hydration mismatch.
 */
export function useToday(): number | null {
  return useSyncExternalStore(
    noop,
    () => Math.floor(Date.now() / DAY) * DAY,
    () => null,
  );
}

/** Decimal year for a timestamp, e.g. 2026.83. */
export function decimalYear(t: number) {
  const d = new Date(t);
  return d.getFullYear() + d.getMonth() / 12;
}
