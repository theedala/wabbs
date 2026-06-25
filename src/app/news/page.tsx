import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { NewsCard } from "@/components/ui/NewsCard";
import { CTABand } from "@/components/ui/CTABand";
import { NEWS_SOURCES, getNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "Cybersecurity News — ATW Technologies & Forensics",
  description:
    "The latest cybersecurity headlines from trusted sources, curated by ATW Technologies & Forensics.",
};

// Refresh the static page hourly.
export const revalidate = 3600;

export default async function NewsPage() {
  const items = await getNews(24);

  return (
    <>
      <section className="border-b border-border py-20 text-center sm:py-24">
        <Container>
          <MonoLabel className="text-accent">Cybersecurity news</MonoLabel>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl">
            Stay <SerifAccent>ahead</SerifAccent> of the threat.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            A live roundup of headlines from leading security publishers — so you always know what
            attackers are doing.
          </p>
        </Container>
      </section>

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          {items.length === 0 ? (
            <p className="text-center text-muted">
              News is taking a break right now — please check back shortly.
            </p>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <NewsCard key={item.link} item={item} />
                ))}
              </div>
              <p className="mt-8 font-mono text-xs text-muted">
                Sources: {NEWS_SOURCES.map((s) => s.name).join(" · ")}. Headlines link to their
                original publishers; ATW is not affiliated with these sources.
              </p>
            </>
          )}
        </Container>
      </section>

      <CTABand title="Worried about what's in the headlines?" href="/contact" cta="Get protected" />
    </>
  );
}
