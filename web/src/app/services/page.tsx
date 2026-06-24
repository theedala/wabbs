import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/anim/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Services & Pricing — ATW Technologies & Forensics" };

export default function ServicesPage() {
  return (
    <>
      <section className="py-24">
        <Container>
          <SectionHeading eyebrow="SERVICES & PRICING" title="Transparent pricing, serious protection." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-border bg-surface p-8">
            <h2 className="text-xl font-bold">Discounts for under-resourced institutions</h2>
            <p className="mt-3 text-muted">
              Schools, universities, and healthcare institutions — especially those in remote and under-developed areas
              — qualify for significant discounts. Tell us about your organization and we&apos;ll tailor a quote.
            </p>
          </div>
        </Container>
      </section>
      <CTABand title="Ready to protect your organization?" href="/contact" cta="Request a quote" />
    </>
  );
}
