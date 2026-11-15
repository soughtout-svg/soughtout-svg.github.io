"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useEffectEvent, useRef, useState, useSyncExternalStore } from "react";
import { CHAPTERS, LOC, MACHINES, STATUS, WORLDS, pos, when, type Machine } from "@/data/archive/machines";
import STORIES, { type Story } from "@/data/archive/stories";
import { markExplored, saveBest, useProgress } from "@/lib/progress";

const EASE = [0.22, 1, 0.36, 1] as const;
const btn = "focus-ring box-border flex min-h-11 cursor-pointer items-center font-mono text-[13px] transition-colors duration-200";

const fmt = (v: number, p: string, n: string) => `${Math.abs(v).toFixed(2)}° ${v >= 0 ? p : n}`;

function useNarrow() {
  return useSyncExternalStore(
    (cb) => {
      const mq = matchMedia("(max-width: 720px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => matchMedia("(max-width: 720px)").matches,
    () => false,
  );
}

interface Props {
  code: string;
  onClose: () => void;
  onPick: (code: string) => void;
}

export function MachineSheet({ code, onClose, onPick }: Props) {
  const reduce = useReducedMotion();
  const narrow = useNarrow();
  const dlgRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef<HTMLDivElement>(null);
  const { best } = useProgress();

  // Chapter and quiz answers reset whenever another machine is picked.
  const [shownCode, setShownCode] = useState(code);
  const [chap, setChap] = useState(0);
  const [ans, setAns] = useState<Record<number, number>>({});
  const [speaking, setSpeaking] = useState(false);
  if (shownCode !== code) {
    setShownCode(code);
    setChap(0);
    setAns({});
  }

  const raw = MACHINES.find((x) => x.code === code);
  const st: Story | undefined = STORIES[code];

  const stopSpeak = () => {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    setSpeaking(false);
  };
  const close = () => {
    stopSpeak();
    onClose();
  };

  // Mark explored, scroll back to the top and stop narration on each machine.
  useEffect(() => {
    markExplored(code);
    dlgRef.current?.scrollTo({ top: 0 });
    if ("speechSynthesis" in window) speechSynthesis.cancel();
  }, [code]);

  // Escape closes, the page behind stops scrolling, focus moves in and back.
  const onEscape = useEffectEvent(() => close());
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dlgRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    addEventListener("keydown", onKey);
    return () => {
      removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, []);

  if (!raw) return null;

  const [statusLabel, statusColor] = STATUS[raw.status];
  const [place, pts] = LOC[raw.code] ?? ["", null];
  const W = WORLDS[raw.dest];
  const coords = pts ? pts.map((p) => `${fmt(p[0], "N", "S")}, ${fmt(p[1], "E", "W")}`).join(" · ") : "Off the map";
  const bestScore = best?.[raw.code];

  // Every machine on the same world becomes a dot; the open one is larger and labelled.
  const selPos = (pts ?? []).map((p) => pos(p[0], p[1]));
  const dots: { key: string; x: string; y: string; xp: number; isSel: boolean; m: Machine; label: string }[] = [];
  MACHINES.filter((x) => x.dest === raw.dest && LOC[x.code]?.[1]).forEach((x) =>
    LOC[x.code][1]!.forEach((p, i) => {
      const q = pos(p[0], p[1]);
      const isSel = x.code === raw.code;
      if (!isSel && selPos.some((s) => s.x === q.x && s.y === q.y)) return;
      dots.push({ key: `${x.code}-${i}`, ...q, isSel, m: x, label: p[2] ?? x.name });
    }),
  );
  dots.sort((a, b) => Number(a.isSel) - Number(b.isSel));

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) return stopSpeak();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.onend = u.onerror = () => setSpeaking(false);
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    setSpeaking(true);
  };
  const goChap = (i: number) => {
    stopSpeak();
    setChap(i);
  };
  const answer = (qi: number, oi: number) => {
    if (!st || ans[qi] !== undefined) return;
    const next = { ...ans, [qi]: oi };
    setAns(next);
    if (Object.keys(next).length === st.quiz.length) {
      saveBest(code, st.quiz.filter((q, i) => next[i] === q[2]).length);
    }
  };

  const done = Object.keys(ans).length;
  const score = st ? st.quiz.filter((q, i) => ans[i] === q[2]).length : 0;
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;

  return (
    <motion.div
      onClick={close}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-20 flex items-center justify-center bg-ink/70"
      style={{ padding: narrow ? 0 : "clamp(12px,3vw,40px)" }}
    >
      <motion.div
        ref={dlgRef}
        role="dialog"
        aria-modal="true"
        aria-label={raw.name}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.2 } }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative flex max-h-full w-full flex-wrap content-start overflow-auto bg-paper font-sans text-ink outline-none"
        style={{
          border: narrow ? 0 : "1px solid #17160f",
          maxWidth: narrow ? "none" : 1040,
          height: narrow ? "100%" : "auto",
        }}
      >
        {/* Sticky top bar */}
        <div className="sticky top-0 z-[3] flex flex-[1_1_100%] items-center justify-between gap-3 border-b border-ink bg-paper py-2 pr-2 pl-[clamp(16px,3vw,28px)] font-mono text-[13px]">
          <div className="flex min-w-0 flex-wrap gap-x-3.5 gap-y-1.5">
            <span>{raw.code}</span>
            <span className="whitespace-nowrap" style={{ color: statusColor }}>
              ● {statusLabel}
            </span>
            {bestScore != null && <span className="text-muted">Best quiz: {bestScore}/3</span>}
          </div>
          <div className="flex flex-none gap-2">
            <button
              type="button"
              onClick={() => printStory(raw, statusLabel, place, coords, st)}
              className={`${btn} border border-ink px-3.5 whitespace-nowrap hover:bg-paper-3`}
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className={`${btn} size-11 justify-center border border-ink bg-ink text-lg text-paper hover:bg-accent`}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Picture and facts. Keyed so a jump to another machine cross-fades. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={raw.code}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-[1_1_100%] flex-wrap"
          >
            <div
              role="img"
              aria-label={raw.alt}
              className="flex-[1_1_360px] bg-paper-4 bg-cover bg-center bg-no-repeat"
              style={{ minHeight: narrow ? 220 : 300, backgroundImage: raw.img ? `url(${raw.img})` : "none" }}
            />
            <div className="flex min-w-0 flex-[1.3_1_420px] flex-col gap-[18px] p-[clamp(20px,3vw,40px)]">
              <div className="flex flex-col gap-2">
                <h2 className="m-0 text-[clamp(30px,3.6vw,44px)] leading-none font-medium tracking-[-.03em]">{raw.name}</h2>
                <span className="font-mono text-[13px] text-muted">
                  {raw.mission} · {when(raw)}
                </span>
              </div>
              <p className="m-0 text-[17px] leading-[1.55] text-pretty text-ink-2">{raw.tagline}</p>
              <p className="m-0 bg-paper-3 px-5 py-[18px] text-[clamp(19px,2vw,24px)] leading-[1.4] text-pretty">“{raw.voice}”</p>
              <div className="flex flex-col gap-1 border-t border-ink/20 pt-3.5">
                <span className="font-mono text-xs text-muted">What it discovered</span>
                <span className="text-base leading-normal">{raw.found}</span>
              </div>
              <div className="flex flex-col gap-2 border-t border-ink/20 pt-3.5">
                <div className="flex flex-wrap justify-between gap-2 font-mono text-xs">
                  <span className="text-muted">Where it rests · {W.name}</span>
                  <span>{coords}</span>
                </div>
                <span className="text-base leading-normal">{place}</span>
                {pts && W.map && (
                  <>
                    <div
                      className="relative aspect-[2/1] overflow-hidden border border-ink bg-[#2a2925] bg-[length:100%_100%] bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${W.map})` }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[length:8.333%_16.666%]"
                        style={{
                          backgroundImage:
                            "linear-gradient(#f2f0eb2b 1px,transparent 1px),linear-gradient(90deg,#f2f0eb2b 1px,transparent 1px)",
                        }}
                      />
                      <div aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-dashed border-paper/50" />
                      <div aria-hidden="true" className="absolute inset-y-0 left-1/2 border-l border-dashed border-paper/50" />
                      {dots.map((d) => {
                        const color = STATUS[d.m.status][1];
                        return (
                          <span key={d.key}>
                            <button
                              type="button"
                              onClick={() => !d.isSel && onPick(d.m.code)}
                              aria-label={d.isSel ? `${d.m.name} (showing now)` : `Open ${d.m.name}`}
                              aria-current={d.isSel ? "true" : undefined}
                              title={d.m.name}
                              className="group/dot absolute -mt-[22px] -ml-[22px] flex size-11 cursor-pointer items-center justify-center focus-visible:outline-3 focus-visible:-outline-offset-8 focus-visible:outline-paper"
                              style={{ left: d.x, top: d.y, zIndex: d.isSel ? 2 : 1 }}
                            >
                              {d.isSel && !reduce && (
                                <span
                                  aria-hidden="true"
                                  className="absolute size-[18px] animate-ping rounded-full opacity-60"
                                  style={{ background: color }}
                                />
                              )}
                              <span
                                className={`relative rounded-full shadow-[0_0_0_2px_#f2f0eb,0_0_0_3px_#17160f] transition-transform duration-200 ${d.isSel ? "size-[18px]" : "size-3 group-hover/dot:scale-150"}`}
                                style={{ background: color }}
                              />
                            </button>
                            {d.isSel && (
                              <span
                                className="pointer-events-none absolute z-[3] border border-ink bg-paper px-1.5 py-0.5 font-mono text-[11px] whitespace-nowrap"
                                style={{
                                  left: d.x,
                                  top: d.y,
                                  transform: d.xp > 60 ? "translate(calc(-100% - 16px),-50%)" : "translate(16px,-50%)",
                                }}
                              >
                                {d.label}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex justify-between font-mono text-[11px] text-muted">
                      <span>180° W</span>
                      <span>90° W</span>
                      <span>0°</span>
                      <span>90° E</span>
                      <span>180° E</span>
                    </div>
                    <span className="font-mono text-[11px] text-muted">Tap another dot to jump to that machine. {W.credit}</span>
                  </>
                )}
              </div>
              <a
                href={`/resting-places#m=${raw.code}`}
                className="self-start border border-ink px-5 py-3.5 font-mono text-sm text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                Open the full map
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {st && (
          <div className="flex flex-[1_1_100%] flex-col border-t border-ink">
            <div className="flex flex-wrap items-baseline justify-between gap-3 px-[clamp(20px,3vw,40px)] pt-5 pb-4">
              <h3 className="m-0 text-2xl font-medium tracking-[-.02em]">Its story in five chapters</h3>
              <span className="font-mono text-xs text-muted">Then a 3-question quiz</span>
            </div>

            <div role="tablist" className="flex flex-wrap gap-px border-y border-ink bg-ink">
              {CHAPTERS.map(([title, q], i) => {
                const on = i === chap;
                return (
                  <button
                    key={title}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => goChap(i)}
                    className={`relative box-border flex min-h-12 flex-[1_1_150px] cursor-pointer flex-col gap-1 px-4 py-3 text-left transition-colors duration-300 focus-visible:outline-3 focus-visible:-outline-offset-[3px] focus-visible:outline-accent ${on ? "text-paper" : "bg-paper text-ink hover:bg-paper-2"}`}
                  >
                    {on && (
                      <motion.span
                        layoutId="chapter-tab"
                        aria-hidden="true"
                        className="absolute inset-0 bg-ink"
                        transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                      />
                    )}
                    <span className="relative font-mono text-xs opacity-75">0{i + 1}</span>
                    <span className="relative text-base font-medium">{title}</span>
                    <span className="relative text-[13px] opacity-80">{q}</span>
                  </button>
                );
              })}
            </div>

            <div role="tabpanel" className="flex flex-col gap-4 px-[clamp(20px,3vw,40px)] py-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs text-muted">
                  Chapter 0{chap + 1} · {CHAPTERS[chap][0]}
                </span>
                {canSpeak && (
                  <button
                    type="button"
                    onClick={() => speak(`${CHAPTERS[chap][0]}. ${st.ch[chap]}`)}
                    aria-pressed={speaking}
                    className={`${btn} gap-2 border border-ink px-3.5 ${speaking ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-paper-3"}`}
                  >
                    {speaking ? "■ Stop reading" : "▶ Read aloud"}
                  </button>
                )}
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${code}-${chap}`}
                  initial={reduce ? false : { opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="m-0 max-w-[760px] text-[clamp(18px,1.8vw,21px)] leading-[1.55] text-pretty"
                >
                  {st.ch[chap]}
                </motion.p>
              </AnimatePresence>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goChap(Math.max(0, chap - 1))}
                  className={`${btn} border border-ink px-4 hover:bg-paper-3`}
                  style={{ opacity: chap === 0 ? 0.35 : 1 }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (chap < 4) return goChap(chap + 1);
                    const q = quizRef.current;
                    const g = dlgRef.current;
                    if (q && g) g.scrollTo({ top: q.offsetTop - 64, behavior: reduce ? "auto" : "smooth" });
                  }}
                  className={`${btn} bg-ink px-4 text-paper hover:bg-accent`}
                >
                  {chap === 4 ? "Take the quiz ↓" : "Next chapter →"}
                </button>
              </div>
            </div>

            <div ref={quizRef} className="flex flex-col gap-4 border-t border-ink px-[clamp(20px,3vw,40px)] pt-6 pb-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="m-0 text-2xl font-medium tracking-[-.02em]">Quiz: were you listening?</h3>
                <span className="font-mono text-[13px]" aria-live="polite">
                  {done === st.quiz.length ? `You got ${score} of ${st.quiz.length}` : `${done} of ${st.quiz.length} answered`}
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-px border border-ink bg-ink">
                {st.quiz.map(([q, opts, right, why], qi) => {
                  const a = ans[qi];
                  const answered = a !== undefined;
                  return (
                    <div key={`${code}-${qi}`} className="flex min-w-0 flex-col gap-3 bg-paper p-5">
                      <span className="font-mono text-xs text-muted">Question {qi + 1}</span>
                      <span className="text-[17px] leading-[1.35] font-medium">{q}</span>
                      <div className="flex flex-col gap-2">
                        {opts.map((label, oi) => {
                          const ok = answered && oi === right;
                          const bad = answered && oi === a && a !== right;
                          return (
                            <button
                              key={oi}
                              type="button"
                              onClick={() => answer(qi, oi)}
                              aria-pressed={a === oi}
                              className={`focus-ring box-border flex min-h-11 items-center justify-between gap-2.5 border border-ink px-3.5 py-2.5 text-left text-[15px] leading-[1.35] transition-colors duration-300 ${answered ? "cursor-default" : "cursor-pointer hover:bg-paper-3"} ${ok ? "bg-alive text-white" : bad ? "bg-accent text-white" : "text-ink"}`}
                            >
                              <span>{label}</span>
                              <span className="font-mono text-xs whitespace-nowrap">{ok ? "Correct" : bad ? "Not quite" : ""}</span>
                            </button>
                          );
                        })}
                      </div>
                      <AnimatePresence>
                        {answered && (
                          <motion.p
                            role="status"
                            initial={reduce ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="m-0 overflow-hidden border-t border-ink/20 pt-2.5 text-sm leading-normal text-ink-2"
                          >
                            {why}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setAns({})} className={`${btn} border border-ink px-4 hover:bg-paper-3`}>
                  Try again
                </button>
                <button type="button" onClick={close} className={`${btn} bg-ink px-4 text-paper hover:bg-accent`}>
                  Meet another machine →
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Opens a clean printable page for one machine in a hidden frame and prints it. */
function printStory(m: Machine, statusLabel: string, place: string, coords: string, st?: Story) {
  const esc = (s: unknown) =>
    String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const L = "abc";
  const chapters = st
    ? CHAPTERS.map(
        ([t, q], i) =>
          `<section><h2>0${i + 1} · ${esc(t)} <span class="m">${esc(q)}</span></h2><p>${esc(st.ch[i])}</p></section>`,
      ).join("")
    : "";
  const quiz = st
    ? `<section><h2>Quiz</h2><ol>${st.quiz
        .map(([q, o]) => `<li><b>${esc(q)}</b><br>${o.map((x, i) => `${L[i]}) ${esc(x)}`).join("&nbsp;&nbsp;&nbsp;")}</li>`)
        .join("")}</ol><p class="m">Answers: ${st.quiz.map(([, , r], i) => `${i + 1}${L[r]}`).join(" · ")}</p></section>`
    : "";
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(m.name)} · SoughtOut Beyond</title><style>@page{margin:16mm}body{font-family:'IBM Plex Sans',system-ui,sans-serif;color:#17160f;font-size:12pt;line-height:1.5;margin:0}h1{font-size:30pt;font-weight:500;letter-spacing:-.02em;margin:6pt 0 4pt;line-height:1.05}h2{font-size:14pt;font-weight:500;margin:16pt 0 4pt;border-top:1px solid #17160f;padding-top:8pt}.m{font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:9.5pt;color:#55524a;font-weight:400}.q{background:#ece9e1;padding:10pt 12pt;font-size:13pt;margin:10pt 0}img{width:100%;height:70mm;object-fit:cover;margin:8pt 0}section{break-inside:avoid}li{margin-bottom:8pt}</style></head><body>
<div class="m">SoughtOut Beyond · ${esc(m.code)} · ${esc(statusLabel)}</div><h1>${esc(m.name)}</h1><div class="m">${esc(m.mission)} · ${esc(when(m))}</div>
${m.img ? `<img src="${esc(m.img)}" alt="">` : ""}<p>${esc(m.tagline)}</p><div class="q">“${esc(m.voice)}”</div>
<p><b>What it discovered.</b> ${esc(m.found)}</p><p><b>Where it rests.</b> ${esc(place)} <span class="m">${esc(coords)}</span></p>
${chapters}${quiz}<p class="m" style="margin-top:18pt">Facts from NASA, JPL and NSSDCA mission pages. Images: NASA, public domain.</p></body></html>`;
  const f = document.createElement("iframe");
  f.setAttribute("aria-hidden", "true");
  f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
  f.onload = () =>
    setTimeout(() => {
      try {
        f.contentWindow?.focus();
        f.contentWindow?.print();
      } catch {
        /* printing blocked */
      }
      setTimeout(() => f.remove(), 60000);
    }, 600);
  f.srcdoc = html;
  document.body.appendChild(f);
}
