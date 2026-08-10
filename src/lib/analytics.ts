/**
 * Typed wrapper around the Meta Pixel. The closed union keeps us on standard
 * events only (custom events would silently miss Meta's optimization models).
 * Every call is a safe no-op until the pixel is configured (site.metaPixelId)
 * and its bootstrap has run, so call sites never need to guard.
 */

export type MetaEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"
  | "Lead";

export type MetaParams = Record<string, string | number>;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: unknown;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function track(event: MetaEvent, params?: MetaParams): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq("track", event, params);
}

/**
 * Standard fbevents bootstrap (the official snippet, in TS): installs a queueing
 * stub so events fired before the script arrives are not lost, then loads
 * fbevents.js and inits the pixel. Idempotent.
 */
export function loadMetaPixel(pixelId: string): void {
  if (typeof window === "undefined" || !pixelId || window.fbq) return;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      fbq.queue.push(args);
    }
  }) as Fbq;
  fbq.queue = [];
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", pixelId);
}
