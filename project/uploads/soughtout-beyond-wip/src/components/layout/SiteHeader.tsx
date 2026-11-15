"use client";

import Link from "next/link";
import { MACHINES } from "@/data/archive/machines";
import { resetProgress, toggleA11y, useA11y, useProgress } from "@/lib/progress";

const NAV = [
  ["/#catalog", "01 Moon"],
  ["/#catalog", "02 Mars"],
  ["/#catalog", "03 Deep space"],
  ["/resting-places/", "04 Map"],
  ["/#lifespans", "05 Timeline"],
  ["#sources", "06 Sources"],
] as const;

const toggleClass =
  "focus-ring box-border flex min-h-11 cursor-pointer items-center border border-ink px-3 transition-colors duration-200";

export function SiteHeader() {
  const { explored = {}, best = {} } = useProgress();
  const a11y = useA11y();
  const n = MACHINES.filter((m) => explored[m.code]).length;
  const q = MACHINES.filter((m) => best[m.code] != null).length;
  const all = n === MACHINES.length;
  const label = all
    ? `★ All ${MACHINES.length} explored`
    : `${n}/${MACHINES.length} explored${q ? ` · ${q} quiz${q === 1 ? "" : "zes"}` : ""}`;

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-[clamp(20px,4vw,56px)] py-5">
      <div className="flex flex-wrap items-baseline gap-3.5">
        <Link
          href="/#about"
          className="text-lg font-semibold tracking-[-.01em] underline decoration-1 underline-offset-4"
        >
          SoughtOut Beyond
        </Link>
        <span className="font-mono text-xs text-muted">Stories of the machines left on the Moon and Mars</span>
      </div>

      <nav aria-label="Main" className="flex flex-wrap gap-6 font-mono text-[13px]">
        {NAV.map(([href, text]) => (
          <Link key={text} href={href} className="whitespace-nowrap">
            {text}
          </Link>
        ))}
      </nav>

      <div className="flex flex-wrap items-center gap-2 font-mono text-[13px]">
        <div
          title="Machines you’ve explored"
          className={`box-border flex min-h-11 items-center gap-2.5 border border-ink px-3 transition-colors duration-500 ${
            all ? "bg-ink text-paper" : "bg-transparent text-ink"
          }`}
        >
          <span aria-hidden="true" className="grid grid-cols-[repeat(8,7px)] gap-0.5">
            {MACHINES.map((m) => (
              <span
                key={m.code}
                className="size-[7px] transition-colors duration-500"
                style={{
                  background: explored[m.code] ? (all ? "#f2f0eb" : "#17160f") : "transparent",
                  boxShadow: `inset 0 0 0 1px ${all ? "#f2f0eb" : "#17160f"}`,
                }}
              />
            ))}
          </span>
          <span className="whitespace-nowrap">{label}</span>
        </div>
        {(n > 0 || q > 0) && (
          <button
            type="button"
            onClick={() => {
              if (confirm("Start over? This clears the machines you've explored and your quiz scores.")) resetProgress();
            }}
            title="Clear your explored machines and quiz scores"
            className={`${toggleClass} bg-transparent text-ink hover:bg-paper-2`}
          >
            ↺ Reset
          </button>
        )}
        <button
          type="button"
          onClick={() => toggleA11y("big")}
          aria-pressed={a11y.big}
          aria-label="Larger text"
          className={`${toggleClass} min-w-11 justify-center ${a11y.big ? "bg-ink text-paper" : "bg-transparent text-ink"}`}
        >
          A+
        </button>
        <button
          type="button"
          onClick={() => toggleA11y("hc")}
          aria-pressed={a11y.hc}
          className={`${toggleClass} ${a11y.hc ? "bg-ink text-paper" : "bg-transparent text-ink"}`}
        >
          High contrast
        </button>
      </div>
    </header>
  );
}
