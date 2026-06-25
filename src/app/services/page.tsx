import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/anim/Reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = { title: "Services — ATW Technologies & Forensics" };

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border py-20 text-center sm:py-24">
        <Container>
          <MonoLabel className="text-accent">Services</MonoLabel>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
            Security work, done <SerifAccent>properly</SerifAccent>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            From forensic investigations to training and custom software — practical services that
            keep your organization protected.
          </p>
        </Container>
      </section>

      <section className="border-b border-border py-20 sm:py-28">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-4 rounded-2xl border border-border bg-bg-subtle p-8">
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                Discounts for under-resourced institutions
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                Schools, universities, and healthcare institutions — especially those in remote and
                under-developed areas — qualify for significant discounts. Tell us about your
                organization and we&apos;ll tailor a quote.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CTABand title="Ready to protect your organization?" href="/contact" cta="Request a quote" />
    </>
  );
}
