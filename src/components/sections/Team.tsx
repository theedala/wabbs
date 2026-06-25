import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { Reveal } from "@/components/anim/Reveal";
import { team } from "@/lib/content";

export function Team() {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Leadership"
            title={
              <>
                Meet the <SerifAccent>founder</SerifAccent>.
              </>
            }
            className="max-w-2xl"
          />
        </Reveal>
        <div className="mt-12 flex flex-wrap gap-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <div className="flex max-w-md items-center gap-5 rounded-2xl border border-border bg-bg p-6">
                <Image
                  src={m.photo}
                  alt={m.name}
                  width={88}
                  height={88}
                  className="h-22 w-22 shrink-0 rounded-xl border border-border object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{m.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
                    {m.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
