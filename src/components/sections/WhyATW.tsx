import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { Reveal } from "@/components/anim/Reveal";
import { whyATW } from "@/lib/content";

export function WhyATW() {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={whyATW.eyebrow}
            title={
              <>
                Security built for how attacks <SerifAccent>really</SerifAccent> happen.
              </>
            }
            className="max-w-2xl"
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {whyATW.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <HairlineCard className="h-full">
                <h3 className="text-lg font-semibold tracking-tight text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
              </HairlineCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
