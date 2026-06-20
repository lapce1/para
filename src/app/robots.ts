import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Static export: emit a real /robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Payment result pages carry an order ref in the URL; never index them.
        disallow: ["/placanje/", "/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
