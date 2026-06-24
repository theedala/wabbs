import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { TeamCard } from "@/components/ui/TeamCard";
import { team } from "@/lib/content";

export function Team() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="MANAGEMENT TEAM" title="The people behind ATW." />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <TeamCard member={m} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
