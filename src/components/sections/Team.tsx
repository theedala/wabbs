import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/anim/Reveal";
import { TeamCard } from "@/components/ui/TeamCard";
import { team } from "@/lib/content";

export function Team() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading eyebrow="LEADERSHIP" title="Meet the founder." />
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="w-full max-w-xs">
                <TeamCard member={m} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
