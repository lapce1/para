"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadMetaPixel, track } from "@/lib/analytics";
import { site } from "@/data/site";

/**
 * Meta Pixel mount point (root layout). Fully inert while site.metaPixelId is
 * empty: no script injected, no network calls, track() no-ops.
 *
 * The App Router doesn't reload the document on navigation, so the pixel's
 * automatic PageView (fired once by init) misses client-side transitions, so
 * we fire PageView on every pathname change instead, and ViewContent on the
 * menu + phở content cluster.
 */
export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (!site.metaPixelId) return;
    loadMetaPixel(site.metaPixelId); // idempotent; queues until fbevents.js lands
    track("PageView");
    if (pathname === "/meni" || pathname.startsWith("/pho")) {
      track("ViewContent", { content_name: pathname });
    }
  }, [pathname]);

  return null;
}
