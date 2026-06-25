import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MonoLabel } from "@/components/ui/MonoLabel";
import { SerifAccent } from "@/components/ui/SerifAccent";
import { NewsCard } from "@/components/ui/NewsCard";
import { getNews } from "@/lib/news";

export async function News() {
  const items = await getNews(6);
  if (items.length === 0) return null;

  return (
    <section className="border-b border-border py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <MonoLabel className="text-accent">From the field</MonoLabel>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Latest in <SerifAccent>cybersecurity</SerifAccent>.
            </h2>
            <p className="mt-3 text-muted">
              Headlines from trusted security sources, refreshed throughout the day.
            </p>
          </div>
          <Link
            href="/news"
            className="text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            View all news →
          </Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.link} item={item} />
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted">
          Headlines link to their original publishers. ATW is not affiliated with these sources.
        </p>
      </Container>
    </section>
  );
}
