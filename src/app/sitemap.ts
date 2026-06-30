import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Static export: emit a real /sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/meni`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/pho`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/poruci`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
