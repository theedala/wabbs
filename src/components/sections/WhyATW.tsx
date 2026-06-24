import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { whyATW } from "@/lib/content";

export function WhyATW() {
  return (
    <section className="border-y border-border bg-surface py-24">
      <Container>
        <SectionHeading eyebrow={whyATW.eyebrow} title={whyATW.title} />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {whyATW.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <FeatureItem title={f.title} body={f.body} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
