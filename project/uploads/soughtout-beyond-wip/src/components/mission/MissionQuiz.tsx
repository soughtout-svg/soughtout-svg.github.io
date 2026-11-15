"use client";

import Link from "next/link";
import { useState } from "react";
import type { QuizQuestion } from "@/types/mission";

const RANKS = [
  { min: 0, title: "Cadet", note: "Every explorer starts somewhere. Scroll back up and try again!" },
  { min: 1, title: "Flight Controller", note: "Nice work. You caught some of the big moments." },
  { min: 2, title: "Mission Specialist", note: "Great job. You really followed this machine's story." },
  { min: 3, title: "Mission Commander", note: "Perfect score. You know this machine inside and out." },
];

/** Short, friendly quiz shown at the end of each story. One question at a time. */
export function MissionQuiz({
  questions,
  hardwareName,
  accent,
  next,
}: {
  questions: QuizQuestion[];
  hardwareName: string;
  accent: "moon" | "mars";
  next: { id: string; hardwareName: string };
}) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const done = step >= questions.length;
  const q = questions[step];
  const ring = accent === "mars" ? "border-mars-400 bg-mars-500/10" : "border-moon-400 bg-moon-500/10";

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  }

  function advance() {
    setPicked(null);
    setStep((s) => s + 1);
  }

  function reset() {
    setStep(0);
    setPicked(null);
    setScore(0);
  }

  if (done) {
    const rank = [...RANKS].reverse().find((r) => score >= r.min)!;
    return (
      <div className="rounded-3xl border border-white/10 bg-space-900/70 p-8 text-center sm:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal">Mission complete</p>
        <p className="mt-4 font-display text-7xl tabular-nums">
          {score}/{questions.length}
        </p>
        <p className="mt-2 font-display text-3xl italic text-silver-200">{rank.title}</p>
        <p className="mx-auto mt-3 max-w-md text-silver-400">{rank.note}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={`/mission/${next.id}`}
            className="rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-space-950"
          >
            Next machine: {next.hardwareName} →
          </Link>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-white/15 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-silver-50 hover:bg-white/5"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-space-900/70 p-6 sm:p-10">
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-silver-400">
        <span>How well do you know {hardwareName}?</span>
        <span>
          {step + 1} / {questions.length}
        </span>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
        <div className="h-full bg-signal transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }} />
      </div>

      <fieldset className="mt-8">
        <legend className="font-display text-3xl leading-tight sm:text-4xl">{q.prompt}</legend>
        <div className="mt-6 grid gap-3">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answerIndex;
            const isPicked = i === picked;
            const state =
              picked === null
                ? "border-white/10 hover:border-white/30 hover:bg-white/5"
                : isAnswer
                  ? ring
                  : isPicked
                    ? "border-white/20 bg-white/5 opacity-70"
                    : "border-white/5 opacity-40";
            return (
              <button
                key={opt}
                type="button"
                onClick={() => choose(i)}
                disabled={picked !== null}
                aria-pressed={isPicked}
                className={`flex items-center gap-4 rounded-xl border px-5 py-4 text-left text-lg transition-colors ${state}`}
              >
                <span className="font-mono text-xs text-silver-400">{String.fromCharCode(65 + i)}</span>
                <span className="flex-1">{opt}</span>
                {picked !== null && isAnswer && <span className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Correct</span>}
              </button>
            );
          })}
        </div>
      </fieldset>

      {picked !== null && (
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
          <p className="text-silver-200">
            <span className="mr-2 font-semibold text-silver-50">{picked === q.answerIndex ? "Nailed it." : "Not quite."}</span>
            {q.explanation}
          </p>
          <button
            type="button"
            onClick={advance}
            className="shrink-0 rounded-full bg-signal px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-space-950"
          >
            {step + 1 === questions.length ? "See my score" : "Next question →"}
          </button>
        </div>
      )}
    </div>
  );
}
