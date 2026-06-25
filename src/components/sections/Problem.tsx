import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { Reveal } from "@/components/anim/Reveal";
import { CountUp } from "@/components/anim/CountUp";
import { problemStats } from "@/lib/content";

export function Problem() {
  return (
    <section className="border-b border-border bg-bg-subtle py-20 sm:py-24">
      <Container>
        <Reveal>
          <MonoLabel className="text-accent">The problem</MonoLabel>
          <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Cyber fraud is rising — and most breaches start from the inside.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {problemStats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="h-full bg-bg p-8 sm:p-10">
                <p className="font-mono text-5xl font-bold tracking-tight text-ink sm:text-6xl">
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-4 max-w-md text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
