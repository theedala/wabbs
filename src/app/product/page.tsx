import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/anim/Reveal";

export const metadata: Metadata = { title: "AI Intrusion Detection & Prevention — ATW" };

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
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="THE PRODUCT" title="AI Intrusion Detection & Prevention System." />
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Our flagship system uses artificial intelligence to continuously watch your network, detect suspicious
            activity, raise instant alerts, and actively prevent intrusions — not just log them after the fact.
          </p>
          <div className="mt-16">
            <h2 className="text-2xl font-bold">Evasion techniques it shuts down</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {stops.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.08}>
                  <FeatureItem title={s.title} body={s.body} />
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              { h: "Detect", p: "AI models flag anomalies in real time across your traffic and systems." },
              { h: "Alert", p: "Instant, prioritized alerts so your team knows what matters first." },
              { h: "Prevent", p: "Automated responses block intrusions before they cause damage." },
            ].map((c) => (
              <div key={c.h} className="rounded-2xl border border-border bg-surface p-8">
                <h3 className="font-mono text-accent-cyan">{c.h}</h3>
                <p className="mt-3 text-muted">{c.p}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CTABand title="See the system protect your network." href="/contact" cta="Request a demo" />
    </>
  );
}
