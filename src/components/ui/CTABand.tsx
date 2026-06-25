import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MonoLabel } from "@/components/ui/MonoLabel";

export function CTABand({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-bg-subtle px-8 py-16 text-center sm:px-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent)",
            }}
          />
          <div className="relative">
            <MonoLabel className="text-accent">Get protected</MonoLabel>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            <div className="mt-8 flex justify-center">
              <Button href={href} arrow>
                {cta}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
