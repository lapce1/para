/**
 * AllSecure Exchange (asxgw.com) — v3 JSON adapter.
 *
 * This module is the ONLY place that knows the gateway's wire format. If AllSecure's
 * integration engineer hands you anything that differs from the public docs
 * (https://asxgw.com/documentation/gateway), change it here and nowhere else.
 *
 * Flow used: Hosted Payment Page.
 *   1. createDebit() -> POST /api/v3/transaction/{API_KEY}/debit -> { redirectUrl }
 *   2. You 302 the customer to redirectUrl.
 *   3. Gateway POSTs a signed postback to your callbackUrl == source of truth.
 *   4. verifyPostbackSignature() before trusting it.
 *
 * Credentials (all from Worker secrets, never in code):
 *   ALLSECURE_API_KEY        -> goes in the URL path
 *   ALLSECURE_API_USER       -> HTTP Basic user
 *   ALLSECURE_API_PASSWORD   -> HTTP Basic password
 *   ALLSECURE_SHARED_SECRET  -> HMAC key for the X-Signature
 */

const GATEWAY_BASE = "https://asxgw.com/api/v3/transaction";
const CONTENT_TYPE = "application/json; charset=utf-8";

export interface AllSecureConfig {
  apiKey: string;
  apiUser: string;
  apiPassword: string;
  sharedSecret: string;
  /**
   * Some merchant connectors require the outgoing request to be signed too
   * ("X-Signature ... may be necessary if required by your merchant configuration").
   * Leave false until your integration engineer says otherwise; flip to true if
   * you get error 1004 "Invalid signature" on the debit call.
   */
  signOutgoing?: boolean;
}

export interface DebitRequest {
  merchantTransactionId: string;
  /** Decimal string, e.g. "950.00". See note on RSD formatting in money.ts. */
  amount: string;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  errorUrl: string;
  callbackUrl: string;
  description: string;
  customer: {
    identification?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    billingCountry?: string;
    ipAddress?: string;
  };
  /** Card 3DS: MANDATORY is the safe default for e-commerce SCA. */
  threeDSecure?: "OFF" | "OPTIONAL" | "MANDATORY";
  language?: string;
}

export interface DebitResponse {
  success: boolean;
  uuid: string;
  purchaseId: string;
  returnType: "REDIRECT" | "FINISHED" | "PENDING" | "ERROR";
  redirectUrl?: string;
  paymentMethod?: string;
  errors?: Array<{ errorMessage: string; errorCode: number; adapterMessage?: string; adapterCode?: string }>;
}

/** Shape of the signed postback the gateway sends to callbackUrl. */
export interface PostbackNotification {
  result: string; // "OK" on success; failures carry an errors[] / non-OK result
  uuid: string;
  merchantTransactionId: string;
  purchaseId: string;
  transactionType: string; // "DEBIT"
  paymentMethod?: string;
  amount?: string;
  currency?: string;
  returnData?: Record<string, unknown>;
  errors?: Array<{ errorMessage: string; errorCode: number }>;
}

/* ------------------------------------------------------------------ crypto */

async function sha512Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(input));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSha512Base64(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  let bin = "";
  for (const b of new Uint8Array(sig)) bin += String.fromCharCode(b);
  return btoa(bin);
}

/**
 * Build the canonical message AllSecure signs. Lines joined by a single "\n"
 * (no carriage return), per the v3 spec:
 *   METHOD \n SHA512(body, hex) \n Content-Type \n Date \n RequestURI
 */
async function canonicalMessage(method: string, body: string, contentType: string, date: string, uri: string): Promise<string> {
  return [method, await sha512Hex(body), contentType, date, uri].join("\n");
}

export async function signMessage(secret: string, method: string, body: string, contentType: string, date: string, uri: string): Promise<string> {
  return hmacSha512Base64(secret, await canonicalMessage(method, body, contentType, date, uri));
}

/** Constant-time string comparison to avoid leaking via timing on signature checks. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/* ------------------------------------------------------------------- calls */

export async function createDebit(cfg: AllSecureConfig, req: DebitRequest): Promise<DebitResponse> {
  const path = `/api/v3/transaction/${cfg.apiKey}/debit`;
  const url = `${GATEWAY_BASE}/${cfg.apiKey}/debit`;

  const body = JSON.stringify({
    merchantTransactionId: req.merchantTransactionId,
    amount: req.amount,
    currency: req.currency,
    successUrl: req.successUrl,
    cancelUrl: req.cancelUrl,
    errorUrl: req.errorUrl,
    callbackUrl: req.callbackUrl,
    description: req.description,
    customer: req.customer,
    threeDSecureData: { "3dsecure": req.threeDSecure ?? "MANDATORY" },
    language: req.language ?? "sr",
  });

  const date = new Date().toUTCString();
  const headers: Record<string, string> = {
    "Content-Type": CONTENT_TYPE,
    Date: date,
    Authorization: "Basic " + btoa(`${cfg.apiUser}:${cfg.apiPassword}`),
  };
  if (cfg.signOutgoing) {
    headers["X-Signature"] = await signMessage(cfg.sharedSecret, "POST", body, CONTENT_TYPE, date, path);
  }

  const res = await fetch(url, { method: "POST", headers, body });
  const json = (await res.json()) as DebitResponse;
  return json;
}

/**
 * Verify an incoming postback. Pass the RAW body text exactly as received
 * (do not re-stringify a parsed object — the hash must match byte-for-byte),
 * plus the request's own headers and path.
 */
export async function verifyPostbackSignature(args: {
  sharedSecret: string;
  method: string; // "POST"
  rawBody: string;
  contentType: string; // verbatim from the Content-Type header
  date: string; // verbatim from the Date header
  requestUri: string; // pathname of your callback URL, e.g. /api/allsecure/callback
  providedSignature: string; // X-Signature header
}): Promise<boolean> {
  if (!args.providedSignature || !args.sharedSecret) return false;
  const expected = await signMessage(
    args.sharedSecret,
    args.method,
    args.rawBody,
    args.contentType,
    args.date,
    args.requestUri,
  );
  return timingSafeEqual(expected, args.providedSignature);
}

/** True if the postback represents a successfully captured payment. */
export function isPostbackSuccessful(n: PostbackNotification): boolean {
  // Confirm the exact success field with your integration engineer; per the v3
  // docs a final successful DEBIT carries result "OK" with no errors[].
  return n.result === "OK" && (!n.errors || n.errors.length === 0);
}
