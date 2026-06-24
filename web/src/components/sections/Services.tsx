import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="WHAT WE DO" title="Cybersecurity, end to end." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
