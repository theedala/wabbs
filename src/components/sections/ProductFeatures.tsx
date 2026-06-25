import { Radar, HardHat, ShieldAlert } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Reveal } from "@/components/anim/Reveal";
import { products, type ProductIcon } from "@/lib/content";

const icons: Record<ProductIcon, typeof Radar> = {
  radar: Radar,
  hardhat: HardHat,
  fraud: ShieldAlert,
};

export function ProductFeatures() {
  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container className="space-y-20 sm:space-y-28">
        {products.map((p, i) => {
          const Icon = icons[p.icon];
          const flipped = i % 2 === 1;
          return (
            <Reveal key={p.title}>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={flipped ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-bg-subtle text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <MonoLabel className="text-accent">Product 0{i + 1}</MonoLabel>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-lg text-muted">{p.blurb}</p>
                  <ul className="mt-6 space-y-3">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-ink">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-[0.6rem] text-accent">
                          ✓
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={flipped ? "lg:order-1" : ""}>
                  <BrowserFrame label={`atw — ${p.icon}`}>
                    <ProductMock icon={p.icon} />
                  </BrowserFrame>
                </div>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}

function ProductMock({ icon }: { icon: ProductIcon }) {
  const Icon = icons[icon];
  return (
    <div className="relative grid h-56 place-items-center overflow-hidden bg-bg-subtle">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-accent/20 to-transparent [animation:scanline_3.5s_linear_infinite]" />
      <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-border bg-bg text-accent shadow-sm">
        <Icon className="h-7 w-7" />
        <span className="absolute -inset-1 rounded-2xl border border-accent/30 [animation:pulse-ring_2.4s_ease-out_infinite]" />
      </div>
    </div>
  );
}
