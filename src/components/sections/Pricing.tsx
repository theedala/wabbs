import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/anim/Reveal";
import { pricing } from "@/lib/content";

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border bg-bg-subtle py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Clear pricing, <SerifAccent>no</SerifAccent> surprises.
              </>
            }
            className="max-w-2xl"
          />
          <p className="mt-4 max-w-xl text-muted">
            Significant discounts for schools, universities, and healthcare institutions in remote
            and under-resourced areas.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-8 transition-all ${
                  tier.highlight
                    ? "border-accent bg-bg shadow-[0_20px_50px_-30px_rgba(79,70,229,0.6)]"
                    : "border-border bg-bg"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink">{tier.name}</h3>
                  {tier.highlight && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-accent-ink">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-5 font-mono text-3xl font-bold tracking-tight text-ink">
                  {tier.price}
                </p>
                <p className="mt-3 text-sm text-muted">{tier.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-ink">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[0.6rem] text-accent">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  href="/contact"
                  variant={tier.highlight ? "primary" : "ghost"}
                  arrow
                  className="mt-8 w-full"
                >
                  {tier.price === "Contact for quote" ? "Request a quote" : "Get started"}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
