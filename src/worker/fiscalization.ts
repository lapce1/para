/**
 * Serbian fiscalization (e-fiskalizacija) seam.
 *
 * A card sale on the site is a taxable retail turnover and must produce an
 * e-fiscal receipt issued through a CERTIFIED ESIR + PFR (local or virtual),
 * carrying a QR code + verification hyperlink, transmitted to Poreska uprava.
 * That receipt — not a plain confirmation email — is what you send the customer.
 *
 * You do NOT build this yourself. You pick a licensed ESIR/PFR vendor that exposes
 * an HTTP API and implement issueReceipt() against it below. Until then the stub
 * throws, and the callback handler degrades gracefully (payment still succeeds,
 * order flagged for manual fiscalization) so you can test the payment leg first.
 *
 * Typical vendor request maps from a PricedOrder:
 *   - invoiceType: "Normal", transactionType: "Sale"
 *   - payment: [{ amount, paymentType: "Card" }]
 *   - items: [{ name, quantity, unitPrice, totalAmount, labels: [VAT label] }]
 * Typical response:
 *   - invoiceNumber / sdcDateTime / journal
 *   - verificationUrl (suf.purs.gov.rs/v/?vl=...) and QR payload
 */

import type { PricedOrder } from "./menu";

export interface FiscalReceipt {
  invoiceNumber: string;
  sdcDateTime: string;
  verificationUrl: string; // the suf.purs.gov.rs link with the QR payload
  qrPayload?: string;
}

export interface FiscalizationProvider {
  issueReceipt(input: {
    merchantTxId: string;
    order: PricedOrder;
    paymentType: "Card";
    buyerEmail: string;
  }): Promise<FiscalReceipt>;
}

export interface FiscalEnv {
  FISCAL_API_BASE?: string;
  FISCAL_API_KEY?: string;
}

class StubProvider implements FiscalizationProvider {
  async issueReceipt(): Promise<FiscalReceipt> {
    throw new Error("FISCALIZATION_NOT_CONFIGURED");
  }
}

/**
 * Swap this for the real vendor implementation once selected. Example skeleton:
 *
 * class AcmeEsirProvider implements FiscalizationProvider {
 *   constructor(private base: string, private key: string) {}
 *   async issueReceipt({ order, paymentType, buyerEmail, merchantTxId }) {
 *     const res = await fetch(`${this.base}/invoices`, {
 *       method: "POST",
 *       headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.key}` },
 *       body: JSON.stringify({
 *         invoiceType: "Normal",
 *         transactionType: "Sale",
 *         payment: [{ amount: order.total, paymentType }],
 *         referentDocumentNumber: merchantTxId,
 *         items: order.lines.map((l) => ({
 *           name: l.name, quantity: l.qty, unitPrice: l.price,
 *           totalAmount: l.lineTotal, labels: [l.tax],
 *         })),
 *       }),
 *     });
 *     if (!res.ok) throw new Error(`fiscalization failed: ${res.status}`);
 *     const j = await res.json();
 *     return { invoiceNumber: j.invoiceNumber, sdcDateTime: j.sdcDateTime,
 *              verificationUrl: j.verificationUrl, qrPayload: j.qr };
 *   }
 * }
 */

export function getFiscalizationProvider(env: FiscalEnv): FiscalizationProvider {
  // if (env.FISCAL_API_BASE && env.FISCAL_API_KEY) return new AcmeEsirProvider(env.FISCAL_API_BASE, env.FISCAL_API_KEY);
  return new StubProvider();
}
