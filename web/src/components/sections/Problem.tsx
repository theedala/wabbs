import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { CountUp } from "@/components/anim/CountUp";
import { problemStats } from "@/lib/content";

export function Problem() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="THE PROBLEM" title="Cyber fraud is rising in Harare." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {problemStats.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-8">
                <p className="text-gradient font-mono text-5xl font-bold sm:text-6xl">
                  <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-4 text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
