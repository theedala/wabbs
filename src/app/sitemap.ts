import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://atwtechnologies.example";
  return ["", "/product", "/services", "/news", "/contact"].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }));
}
