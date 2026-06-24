import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { solution } from "@/lib/content";

export function Solution() {
  return (
    <section className="border-y border-border bg-surface py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={solution.eyebrow} title={solution.title} />
          <p className="mt-6 max-w-2xl text-lg text-muted">{solution.body}</p>
        </Reveal>
      </Container>
    </section>
  );
}
