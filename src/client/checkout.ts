/**
 * Client-side glue for the existing PARA order tray (Next.js client component).
 * Same-origin calls — no CORS needed because the API and site share one Worker.
 */

export interface CartLine {
  id: string;
  qty: number;
}

/**
 * Call from your "Plati karticom" button handler. Sends the cart (ids + qty only;
 * the server prices it) and redirects the browser to AllSecure's hosted page.
 */
export async function startCardCheckout(
  items: CartLine[],
  customer: { email: string; firstName?: string; lastName?: string },
): Promise<void> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, customer }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "checkout_failed");
  }
  const { redirectUrl } = (await res.json()) as { redirectUrl: string };
  window.location.href = redirectUrl; // -> AllSecure hosted payment page (3DS)
}

/**
 * On /placanje/uspesno, poll until the verified postback flips the order to PAID
 * and the fiscal receipt link appears. The browser redirect alone is NOT proof of
 * payment — the callback is. Times out gracefully.
 */
export async function pollOrderStatus(
  merchantTxId: string,
  opts: { intervalMs?: number; timeoutMs?: number } = {},
): Promise<{ status: "PENDING" | "PAID" | "FAILED"; receiptUrl: string | null }> {
  const interval = opts.intervalMs ?? 2000;
  const deadline = Date.now() + (opts.timeoutMs ?? 30000);

  while (Date.now() < deadline) {
    const res = await fetch(`/api/order/${encodeURIComponent(merchantTxId)}/status`);
    if (res.ok) {
      const data = (await res.json()) as { status: "PENDING" | "PAID" | "FAILED"; receiptUrl: string | null };
      if (data.status !== "PENDING") return data;
    }
    await new Promise((r) => setTimeout(r, interval));
  }
  return { status: "PENDING", receiptUrl: null };
}
