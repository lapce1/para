/**
 * Orders persisted in Cloudflare D1. Status lifecycle:
 *   PENDING  -> created, debit sent, awaiting postback
 *   PAID     -> successful postback verified
 *   FAILED   -> failed/cancelled postback
 *
 * Postbacks can arrive more than once and can flip FAILED -> PAID, so every write
 * is idempotent and receipt issuance is guarded by receipt_issued. PAID is terminal:
 * a late/duplicate FAILED postback can never downgrade an order that already paid
 * (and already had a fiscal receipt issued).
 */

export interface OrderRow {
  merchant_tx_id: string;
  amount: number; // integer dinars
  currency: string;
  status: "PENDING" | "PAID" | "FAILED";
  customer_email: string;
  items_json: string;
  allsecure_uuid: string | null;
  purchase_id: string | null;
  receipt_issued: number; // 0 | 1
  fiscal_receipt_url: string | null;
  created_at: string;
  updated_at: string;
}

export async function createOrder(
  db: D1Database,
  o: { merchantTxId: string; amount: number; currency: string; email: string; itemsJson: string },
): Promise<void> {
  const now = new Date().toISOString();
  await db
    .prepare(
      `INSERT INTO orders
        (merchant_tx_id, amount, currency, status, customer_email, items_json, receipt_issued, created_at, updated_at)
       VALUES (?, ?, ?, 'PENDING', ?, ?, 0, ?, ?)`,
    )
    .bind(o.merchantTxId, o.amount, o.currency, o.email, o.itemsJson, now, now)
    .run();
}

export async function attachGatewayRefs(
  db: D1Database,
  merchantTxId: string,
  uuid: string,
  purchaseId: string,
): Promise<void> {
  await db
    .prepare(`UPDATE orders SET allsecure_uuid = ?, purchase_id = ?, updated_at = ? WHERE merchant_tx_id = ?`)
    .bind(uuid, purchaseId, new Date().toISOString(), merchantTxId)
    .run();
}

export async function getOrder(db: D1Database, merchantTxId: string): Promise<OrderRow | null> {
  return await db.prepare(`SELECT * FROM orders WHERE merchant_tx_id = ?`).bind(merchantTxId).first<OrderRow>();
}

export async function markStatus(
  db: D1Database,
  merchantTxId: string,
  status: "PAID" | "FAILED",
): Promise<void> {
  // PAID is terminal: never let a stray/duplicate FAILED postback un-pay an order
  // that already settled and was fiscalized. PENDING/FAILED -> PAID is allowed.
  await db
    .prepare(`UPDATE orders SET status = ?, updated_at = ? WHERE merchant_tx_id = ? AND status != 'PAID'`)
    .bind(status, new Date().toISOString(), merchantTxId)
    .run();
}

/**
 * Atomically claim the right to issue the fiscal receipt. Returns true only for
 * the first caller; concurrent/duplicate postbacks get false and skip issuance.
 */
export async function claimReceiptIssuance(db: D1Database, merchantTxId: string): Promise<boolean> {
  const res = await db
    .prepare(`UPDATE orders SET receipt_issued = 1, updated_at = ? WHERE merchant_tx_id = ? AND receipt_issued = 0`)
    .bind(new Date().toISOString(), merchantTxId)
    .run();
  return (res.meta.changes ?? 0) > 0;
}

export async function attachReceipt(db: D1Database, merchantTxId: string, receiptUrl: string): Promise<void> {
  await db
    .prepare(`UPDATE orders SET fiscal_receipt_url = ?, updated_at = ? WHERE merchant_tx_id = ?`)
    .bind(receiptUrl, new Date().toISOString(), merchantTxId)
    .run();
}
