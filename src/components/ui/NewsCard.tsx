import { ArrowUpRight } from "lucide-react";
import type { NewsItem } from "@/lib/news";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-border bg-bg p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="mono-label text-accent">{item.source}</span>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-ink" />
      </div>
      <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-ink">
        {item.title}
      </h3>
      {item.summary && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.summary}</p>
      )}
      {item.date && (
        <span className="mt-auto pt-4 font-mono text-xs text-muted">{item.date}</span>
      )}
    </a>
  );
}
