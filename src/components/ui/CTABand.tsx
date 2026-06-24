import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CTABand({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <section className="py-24">
      <Container>
        <div
          className="rounded-3xl border border-border p-12 text-center"
          style={{ backgroundImage: "linear-gradient(90deg, rgba(34,211,238,0.12), rgba(37,99,235,0.12))" }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
          <div className="mt-8 flex justify-center">
            <Button href={href}>{cta}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
