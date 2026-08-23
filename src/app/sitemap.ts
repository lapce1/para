import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Static export: emit a real /sitemap.xml at build time.
export const dynamic = "force-static";

// Evergreen content pages carry the date their copy last actually changed,
// bump these when you edit the page. Stamping `now` on everything told crawlers
// the whole site changed on every deploy, which devalues the signal.
const PHO_UPDATED = new Date("2026-08-10"); // dine-in pivot copy
const PHO_RAMEN_UPDATED = new Date("2026-08-10"); // dine-in pivot copy
const PORUCI_UPDATED = new Date("2026-08-10"); // waitlist copy: lokal + dostava
const LEGAL_UPDATED = new Date("2026-08-23"); // terms + privacy pages added

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();
  return [
    { url: `${site.url}/`, lastModified: buildDate, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/meni`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/pho`, lastModified: PHO_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.url}/pho/pho-ili-ramen`, lastModified: PHO_RAMEN_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}/poruci`, lastModified: PORUCI_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/uslovi-koriscenja`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/politika-privatnosti`, lastModified: LEGAL_UPDATED, changeFrequency: "yearly", priority: 0.2 },
  ];
}
