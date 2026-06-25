import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { HairlineCard } from "@/components/ui/HairlineCard";
import { ProductFeatures } from "@/components/sections/ProductFeatures";
import { Pricing } from "@/components/sections/Pricing";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/anim/Reveal";

export const metadata: Metadata = { title: "Products — ATW Technologies & Forensics" };

const stops = [
  {
    title: "Obfuscation & encoding",
    body: "Detects payloads hidden behind encoding tricks meant to bypass signature-based tools.",
  },
  {
    title: "IP fragmentation",
    body: "Reassembles and inspects fragmented traffic attackers use to evade inspection.",
  },
  {
    title: "Denial of service",
    body: "Identifies and throttles abnormal traffic patterns before services go down.",
  },
  {
    title: "Application & account hijacking",
    body: "Flags suspicious session and credential behavior to stop takeovers early.",
  },
];

export default function ProductPage() {
  return (
    <>
      <section className="border-b border-border py-20 text-center sm:py-24">
        <Container>
          <MonoLabel className="text-accent">Our products</MonoLabel>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
            AI built to <SerifAccent>protect</SerifAccent> what matters.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Three AI systems that detect threats, keep people safe, and stop fraud — purpose-built
            for institutions across Zimbabwe.
          </p>
        </Container>
      </section>

      <ProductFeatures />

      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <Reveal>
            <MonoLabel className="text-accent">Evasion-resistant</MonoLabel>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Techniques our intrusion system shuts down.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {stops.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <HairlineCard className="h-full">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                </HairlineCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Pricing />
      <CTABand title="See the system protect your network." href="/contact" cta="Request a demo" />
    </>
  );
}
