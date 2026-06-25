import { describe, expect, test } from "vitest";
import { parseFeed, stripHtml, truncate } from "./news";

const RSS = `<?xml version="1.0"?>
<rss version="2.0"><channel>
  <title>Sample</title>
  <item>
    <title><![CDATA[Critical RCE patched in WidgetOS]]></title>
    <link>https://example.com/a</link>
    <pubDate>Tue, 24 Jun 2026 10:00:00 +0000</pubDate>
    <media:content url="https://cdn.example.com/a.jpg" medium="image"/>
    <description><![CDATA[<p>Admins should <b>update</b> now &amp; rotate keys.</p>]]></description>
  </item>
  <item>
    <title>Phishing campaign targets banks</title>
    <link>https://example.com/b</link>
    <pubDate>Mon, 23 Jun 2026 08:00:00 +0000</pubDate>
    <description><![CDATA[<img src="https://cdn.example.com/b.png"/> Short summary.]]></description>
  </item>
</channel></rss>`;

const ATOM = `<?xml version="1.0"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Atom Sample</title>
  <entry>
    <title>Advisory: VPN flaw</title>
    <link rel="alternate" href="https://example.com/atom-1"/>
    <updated>2026-06-22T12:00:00Z</updated>
    <summary>Patch available.</summary>
  </entry>
</feed>`;

describe("news parsing", () => {
  test("parses RSS items with CDATA and entities", () => {
    const items = parseFeed(RSS, "Sample");
    expect(items).toHaveLength(2);
    expect(items[0].title).toBe("Critical RCE patched in WidgetOS");
    expect(items[0].link).toBe("https://example.com/a");
    expect(items[0].summary).toBe("Admins should update now & rotate keys.");
    expect(items[0].iso).toMatch(/^2026-06-24T/);
    expect(items[0].date).toContain("2026");
  });

  test("extracts a thumbnail from media:content and from inline img", () => {
    const items = parseFeed(RSS, "Sample");
    expect(items[0].image).toBe("https://cdn.example.com/a.jpg");
    expect(items[1].image).toBe("https://cdn.example.com/b.png");
  });

  test("parses Atom entries and alternate link", () => {
    const items = parseFeed(ATOM, "Atom Sample");
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe("Advisory: VPN flaw");
    expect(items[0].link).toBe("https://example.com/atom-1");
  });

  test("returns nothing for junk input", () => {
    expect(parseFeed("not xml at all", "X")).toEqual([]);
  });

  test("stripHtml removes tags and decodes entities", () => {
    expect(stripHtml("<p>a &amp; b</p>")).toBe("a & b");
  });

  test("truncate cuts on a word boundary with ellipsis", () => {
    const out = truncate("one two three four five", 12);
    expect(out.endsWith("…")).toBe(true);
    expect(out.length).toBeLessThanOrEqual(13);
  });
});
