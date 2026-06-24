import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StarBorder } from "@/components/anim/StarBorder";
import { ShinyText } from "@/components/anim/ShinyText";
import { DecryptedText } from "@/components/reactbits/DecryptedText";
import { Particles } from "@/components/reactbits/Particles";
import { hero } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <Particles />
      </div>
      <Container className="relative grid min-h-[80vh] items-center py-20">
        <div className="max-w-2xl">
          <Badge>{hero.eyebrow}</Badge>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
            <DecryptedText text={hero.headline} />
          </h1>
          <p className="mt-4 font-mono text-lg">
            <ShinyText text={hero.tagline} />
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted">{hero.body}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/contact">Request a quote</Button>
            <StarBorder href="/product">See how it works</StarBorder>
          </div>
        </div>
      </Container>
    </section>
  );
}
