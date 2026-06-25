import { XMLParser } from "fast-xml-parser";

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  iso: string;
  date: string;
  summary: string;
};

export type NewsSource = { name: string; url: string };

// Free, reputable general cybersecurity news feeds (RSS 2.0).
export const NEWS_SOURCES: NewsSource[] = [
  { name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
  { name: "Krebs on Security", url: "https://krebsonsecurity.com/feed/" },
  { name: "Dark Reading", url: "https://www.darkreading.com/rss.xml" },
];

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

/** Coerce fast-xml-parser values (string | number | { "#text" } | CDATA) to text. */
function asText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "object" && "#text" in (v as Record<string, unknown>)) {
    return String((v as Record<string, unknown>)["#text"] ?? "");
  }
  return "";
}

export function stripHtml(input: string): string {
  return input
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#8217;/gi, "'")
    .replace(/&#8211;|&#8212;/gi, "-")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(input: string, max = 160): string {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function pickLink(item: Record<string, unknown>): string {
  const l = item.link;
  if (typeof l === "string") return l;
  if (Array.isArray(l)) {
    const alt =
      (l as Record<string, string>[]).find((x) => x?.["@_rel"] === "alternate") ?? l[0];
    return (alt as Record<string, string>)?.["@_href"] ?? "";
  }
  if (l && typeof l === "object") {
    return (l as Record<string, string>)["@_href"] ?? asText(l);
  }
  return item.id ? asText(item.id) : "";
}

function formatDate(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/** Parse one feed's XML into normalized items. Pure — safe to unit test. */
export function parseFeed(xml: string, source: string): NewsItem[] {
  let data: Record<string, unknown>;
  try {
    data = parser.parse(xml) as Record<string, unknown>;
  } catch {
    return [];
  }
  const rss = data.rss as Record<string, unknown> | undefined;
  const channel = (rss?.channel as Record<string, unknown>) ?? (data.feed as Record<string, unknown>);
  if (!channel) return [];

  const raw = (channel.item ?? channel.entry ?? []) as unknown;
  const items = (Array.isArray(raw) ? raw : [raw]) as Record<string, unknown>[];

  return items
    .map((it) => {
      const title = stripHtml(asText(it.title));
      const link = pickLink(it);
      const dateRaw = asText(
        it.pubDate ?? it.published ?? it.updated ?? it["dc:date"] ?? ""
      );
      const d = new Date(dateRaw);
      const valid = !Number.isNaN(d.getTime());
      const summary = truncate(
        stripHtml(asText(it.description ?? it.summary ?? it["content:encoded"] ?? it.content)),
        160
      );
      return {
        title,
        link,
        source,
        iso: valid ? d.toISOString() : "",
        date: valid ? formatDate(d) : "",
        summary,
      };
    })
    .filter((x) => x.title && x.link);
}

async function fetchSource(src: NewsSource): Promise<NewsItem[]> {
  try {
    const res = await fetch(src.url, {
      next: { revalidate: 3600 }, // refresh hourly
      headers: { "user-agent": "ATWTechnologiesBot/1.0 (+https://atwtechnologies)" },
      signal: AbortSignal.timeout(8000), // don't let a slow feed hang the build
    });
    if (!res.ok) return [];
    return parseFeed(await res.text(), src.name);
  } catch {
    return [];
  }
}

/** Fetch, merge, dedupe, and sort the latest items across all sources. */
export async function getNews(limit = 12): Promise<NewsItem[]> {
  const results = await Promise.allSettled(NEWS_SOURCES.map(fetchSource));
  const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));

  const seen = new Set<string>();
  const deduped = all.filter((x) => {
    if (seen.has(x.link)) return false;
    seen.add(x.link);
    return true;
  });

  deduped.sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));
  return deduped.slice(0, limit);
}
