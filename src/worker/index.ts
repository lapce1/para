/**
 * PARA Worker — payments API in front of the static Next.js export.
 *
 * Routes:
 *   POST /api/checkout              -> price cart, create order, AllSecure debit, return { redirectUrl }
 *   GET  /api/order/:mtx/status     -> { status } for the success page to poll
 *   POST /api/allsecure/callback    -> verify signature, settle order, fiscalize, email receipt
 *   everything else                 -> env.ASSETS (the built site in ./out)
 *
 * Every response (API + static assets) is passed through withSecurityHeaders().
 */

import {
  createDebit,
  verifyPostbackSignature,
  isPostbackSuccessful,
  type AllSecureConfig,
  type PostbackNotification,
} from "./allsecure";
import { priceCart, type CartLine } from "./menu";
import { CURRENCY, toGatewayAmount } from "./money";
import {
  createOrder,
  attachGatewayRefs,
  getOrder,
  markStatus,
  claimReceiptIssuance,
  attachReceipt,
} from "./orders";
import { getFiscalizationProvider } from "./fiscalization";
import { sendReceiptEmail, receiptEmailHtml } from "./email";
import { withSecurityHeaders } from "./security";

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  // secrets
  ALLSECURE_API_KEY: string;
  ALLSECURE_API_USER: string;
  ALLSECURE_API_PASSWORD: string;
  ALLSECURE_SHARED_SECRET: string;
  ALLSECURE_SIGN_OUTGOING?: string; // "true" to sign outgoing debit calls
  RESEND_API_KEY: string;
  RECEIPT_FROM?: string;
  FISCAL_API_BASE?: string;
  FISCAL_API_KEY?: string;
  // config
  PUBLIC_BASE_URL: string; // e.g. https://para.rs
}

/** Largest checkout body we'll read (defensive cap against abuse). */
const MAX_BODY_BYTES = 16 * 1024;
/** Largest number of distinct cart lines a single order may contain. */
const MAX_CART_LINES = 100;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

function allsecureConfig(env: Env): AllSecureConfig {
  return {
    apiKey: env.ALLSECURE_API_KEY,
    apiUser: env.ALLSECURE_API_USER,
    apiPassword: env.ALLSECURE_API_PASSWORD,
    sharedSecret: env.ALLSECURE_SHARED_SECRET,
    signOutgoing: env.ALLSECURE_SIGN_OUTGOING === "true",
  };
}

/** A short, unique, human-traceable order id. */
function newMerchantTxId(): string {
  const d = new Date();
  const stamp = d.toISOString().slice(0, 10).replace(/-/g, "");
  return `para-${stamp}-${crypto.randomUUID().slice(0, 8)}`;
}

/**
 * Reject cross-site POSTs to the mutating/charging endpoints. There is no session
 * to ride, but this stops a random origin from driving order creation + live debit
 * calls against the gateway. Same-origin browser requests and server-side callers
 * (no Origin header) are allowed.
 */
function sameOriginOk(request: Request, env: Env, selfOrigin: string): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return true; // not a browser cross-site request
  const allowed = new Set([selfOrigin]);
  try {
    allowed.add(new URL(env.PUBLIC_BASE_URL).origin);
  } catch {
    /* ignore malformed config */
  }
  return allowed.has(origin);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return withSecurityHeaders(await route(request, env, ctx));
  },
} satisfies ExportedHandler<Env>;

async function route(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const { pathname } = url;

  try {
    if (pathname === "/api/checkout" && request.method === "POST") {
      return await handleCheckout(request, env, url.origin);
    }
    if (pathname.startsWith("/api/order/") && pathname.endsWith("/status") && request.method === "GET") {
      const mtx = pathname.slice("/api/order/".length, -"/status".length);
      return await handleStatus(env, mtx);
    }
    if (pathname === "/api/allsecure/callback" && request.method === "POST") {
      return await handleCallback(request, env, ctx);
    }
    if (pathname.startsWith("/api/")) {
      return json({ error: "not_found" }, 404);
    }
  } catch (err) {
    console.error("api error", pathname, err);
    return json({ error: "internal_error" }, 500);
  }

  // Next emits the OG image as an extensionless file (out/opengraph-image); force a
  // PNG content-type so social scrapers (which require image/*) accept the card.
  if (pathname === "/opengraph-image") {
    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    headers.set("Content-Type", "image/png");
    headers.set("Cache-Control", "public, max-age=3600");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  }

  // Not an API route -> serve the static site.
  return env.ASSETS.fetch(request);
}

/* ----------------------------------------------------------- POST /checkout */

async function handleCheckout(request: Request, env: Env, selfOrigin: string): Promise<Response> {
  if (!sameOriginOk(request, env, selfOrigin)) {
    return json({ error: "forbidden" }, 403);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return json({ error: "payload_too_large" }, 413);
  }

  const input = (() => {
    try {
      return JSON.parse(raw) as {
        items?: CartLine[];
        customer?: { email?: string; firstName?: string; lastName?: string };
      };
    } catch {
      return null;
    }
  })();

  if (!input?.items || !Array.isArray(input.items) || !input.customer?.email) {
    return json({ error: "missing_fields" }, 400);
  }
  if (input.items.length > MAX_CART_LINES) {
    return json({ error: "too_many_items" }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.customer.email)) {
    return json({ error: "invalid_email" }, 400);
  }

  // Authoritative price — the client's total is never trusted.
  let priced;
  try {
    priced = priceCart(input.items);
  } catch (e) {
    return json({ error: "invalid_cart", detail: (e as Error).message }, 400);
  }

  const merchantTxId = newMerchantTxId();
  const base = env.PUBLIC_BASE_URL.replace(/\/$/, "");

  await createOrder(env.DB, {
    merchantTxId,
    amount: priced.total,
    currency: CURRENCY,
    email: input.customer.email,
    itemsJson: JSON.stringify(priced.lines),
  });

  const debit = await createDebit(allsecureConfig(env), {
    merchantTransactionId: merchantTxId,
    amount: toGatewayAmount(priced.total),
    currency: CURRENCY,
    description: `PARA porudžbina ${merchantTxId}`,
    successUrl: `${base}/placanje/uspesno?mtx=${merchantTxId}`,
    cancelUrl: `${base}/placanje/otkazano?mtx=${merchantTxId}`,
    errorUrl: `${base}/placanje/greska?mtx=${merchantTxId}`,
    callbackUrl: `${base}/api/allsecure/callback`,
    customer: {
      identification: merchantTxId,
      email: input.customer.email,
      firstName: input.customer.firstName,
      lastName: input.customer.lastName,
      billingCountry: "RS",
      ipAddress: request.headers.get("CF-Connecting-IP") ?? undefined,
    },
    threeDSecure: "MANDATORY",
    language: "sr",
  });

  if (!debit.success || debit.returnType !== "REDIRECT" || !debit.redirectUrl) {
    console.error("debit failed", merchantTxId, debit.errors);
    await markStatus(env.DB, merchantTxId, "FAILED");
    return json({ error: "payment_init_failed" }, 502);
  }

  await attachGatewayRefs(env.DB, merchantTxId, debit.uuid, debit.purchaseId);
  return json({ merchantTxId, redirectUrl: debit.redirectUrl });
}

/* ------------------------------------------------------- GET /order/:mtx/status */

async function handleStatus(env: Env, mtx: string): Promise<Response> {
  const order = await getOrder(env.DB, decodeURIComponent(mtx));
  if (!order) return json({ error: "not_found" }, 404);
  return json({ status: order.status, receiptUrl: order.fiscal_receipt_url });
}

/* ------------------------------------------------ POST /allsecure/callback */

async function handleCallback(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const rawBody = await request.text();
  const signature = request.headers.get("X-Signature") ?? "";
  const date = request.headers.get("Date") ?? "";
  const contentType = request.headers.get("Content-Type") ?? "application/json; charset=utf-8";

  const valid = await verifyPostbackSignature({
    sharedSecret: env.ALLSECURE_SHARED_SECRET,
    method: "POST",
    rawBody,
    contentType,
    date,
    requestUri: new URL(request.url).pathname,
    providedSignature: signature,
  });

  // Reject unverifiable postbacks. (200 "OK" is only for genuine, verified ones;
  // returning non-200 makes the gateway retry, which is correct if our secret/clock
  // is momentarily off, but a forged call should never be trusted.)
  if (!valid) {
    console.error("postback signature invalid");
    return new Response("INVALID SIGNATURE", { status: 401 });
  }

  let note: PostbackNotification;
  try {
    note = JSON.parse(rawBody) as PostbackNotification;
  } catch {
    return new Response("BAD REQUEST", { status: 400 });
  }
  const mtx = note.merchantTransactionId;
  const order = await getOrder(env.DB, mtx);
  if (!order) {
    console.error("postback for unknown order", mtx);
    return new Response("OK"); // ack so the gateway stops retrying a ghost
  }

  if (!isPostbackSuccessful(note)) {
    await markStatus(env.DB, mtx, "FAILED");
    return new Response("OK");
  }

  // Optional but recommended: assert the captured amount equals what we expected.
  if (note.amount && note.amount !== toGatewayAmount(order.amount)) {
    console.error("amount mismatch", mtx, note.amount, order.amount);
    // Don't fiscalize a mismatched amount; flag for manual review.
    return new Response("OK");
  }

  await markStatus(env.DB, mtx, "PAID");

  // Fiscalize + email exactly once. Do the slow work after acking the gateway.
  const claimed = await claimReceiptIssuance(env.DB, mtx);
  if (claimed) {
    ctx.waitUntil(issueReceiptAndEmail(env, mtx).catch((e) => console.error("post-pay error", mtx, e)));
  }

  return new Response("OK");
}

async function issueReceiptAndEmail(env: Env, mtx: string): Promise<void> {
  const order = await getOrder(env.DB, mtx);
  if (!order) return;

  const priced = { lines: JSON.parse(order.items_json), total: order.amount };
  const provider = getFiscalizationProvider(env);

  let receipt;
  try {
    receipt = await provider.issueReceipt({
      merchantTxId: mtx,
      order: priced,
      paymentType: "Card",
      buyerEmail: order.customer_email,
    });
  } catch (e) {
    // Fiscalization not configured yet, or a transient vendor error. The payment
    // is still captured; release the claim so a retry/cron can fiscalize later.
    console.error("fiscalization pending for", mtx, (e as Error).message);
    await env.DB.prepare(`UPDATE orders SET receipt_issued = 0 WHERE merchant_tx_id = ?`).bind(mtx).run();
    return;
  }

  await attachReceipt(env.DB, mtx, receipt.verificationUrl);
  await sendReceiptEmail(
    env,
    order.customer_email,
    "PARA — fiskalni račun za vašu porudžbinu",
    receiptEmailHtml({
      merchantTxId: mtx,
      amountText: toGatewayAmount(order.amount),
      verificationUrl: receipt.verificationUrl,
      invoiceNumber: receipt.invoiceNumber,
    }),
  );
}
