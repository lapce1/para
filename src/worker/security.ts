/**
 * Security headers applied to every response the Worker emits — both the API and
 * the static site served through the ASSETS binding.
 *
 * CSP notes: the static Next.js export ships inline hydration scripts and the menu
 * cards use inline style attributes for their gradients, so 'unsafe-inline' is
 * required for script/style in a static (nonce-less) export. Everything else is
 * locked down: no framing, no plugins, self-only connections/forms, and only the
 * Google Fonts origins the layout actually loads.
 */

const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

function apply(h: Headers): void {
  h.set("Content-Security-Policy", CSP);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("X-Frame-Options", "DENY");
  h.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  h.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), browsing-topics=()");
  h.set("Cross-Origin-Opener-Policy", "same-origin");
}

/** Return a copy of `res` with the security headers merged in. */
export function withSecurityHeaders(res: Response): Response {
  const headers = new Headers(res.headers);
  apply(headers);
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
}
