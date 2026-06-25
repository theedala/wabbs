"use client";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SerifAccent } from "@/components/ui/SerifAccent";

const lines = [
  { t: "$ atw monitor --live", tone: "prompt" },
  { t: "[ok]    engine online · 4 sensors · 1 site", tone: "ok" },
  { t: "[alert] 41.220.18.7 — IP fragmentation attack", tone: "alert" },
  { t: "[block] 41.220.18.7 — connection dropped", tone: "block" },
  { t: "[alert] 196.27.0.142 — credential stuffing (x812)", tone: "alert" },
  { t: "[block] 196.27.0.142 — source banned 24h", tone: "block" },
  { t: "[ok]    no further threats · posture nominal", tone: "ok" },
] as const;

const toneClass: Record<string, string> = {
  prompt: "text-emerald-300",
  ok: "text-slate-400",
  alert: "text-rose-300",
  block: "text-amber-300",
};

export function Terminal() {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        if (reduce) {
          setVisible(lines.length);
          return;
        }
        let i = 0;
        const id = setInterval(() => {
          i += 1;
          setVisible(i);
          if (i >= lines.length) clearInterval(id);
        }, 480);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="max-w-lg">
          <MonoLabel className="text-accent">See it work</MonoLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Every threat, <SerifAccent>logged</SerifAccent> and stopped.
          </h2>
          <p className="mt-5 text-lg text-muted">
            ATW watches your network in real time, blocks intrusions automatically, and keeps a
            forensic trail of everything it sees.
          </p>
        </div>
        <div
          ref={ref}
          className="overflow-hidden rounded-xl border border-border bg-[#0a0e1a] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="ml-3 font-mono text-xs text-slate-500">atw — monitor</span>
          </div>
          <div className="min-h-[15rem] space-y-1.5 p-5 font-mono text-xs sm:text-sm">
            {lines.slice(0, visible).map((l, i) => (
              <p key={i} className={toneClass[l.tone]}>
                {l.t}
              </p>
            ))}
            {visible < lines.length && (
              <span className="inline-block h-4 w-2 bg-emerald-300 align-middle [animation:caret_1s_step-end_infinite]" />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
