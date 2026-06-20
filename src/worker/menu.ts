/**
 * Server-authoritative pricing.
 *
 * The client cart sends only { id, qty }. The amount charged is ALWAYS recomputed
 * here — never from a total the browser sends — otherwise a user can edit the
 * request and pay 1 RSD for a 950 RSD order.
 *
 * Prices/items are imported directly from the real catalog (src/data/menu.ts) and
 * delivery rules from src/data/site.ts, so this can never drift from what the
 * customer sees. The only thing added here is the VAT label per line, which the
 * fiscal receipt needs and the catalog doesn't carry.
 */

import { menu, addons } from "../data/menu";
import { site } from "../data/site";

export interface CatalogItem {
  id: string;
  name: string; // human-readable line for the fiscal receipt
  price: number; // integer dinars
  tax: string; // VAT label, e.g. "Ђ" (10%) / "Е" (20%) / "А" (0%)
}

/**
 * VAT labels for the fiscal receipt. Prepared food/delivery is commonly the
 * reduced rate ("Ђ" = 10%), but CONFIRM per item with your knjigovođa — this
 * prints on the fiscal receipt and must be correct. Add per-id overrides here;
 * anything not listed uses DEFAULT_TAX.
 */
const DEFAULT_TAX = "Ђ";
const TAX_OVERRIDES: Record<string, string> = {
  // e.g. "ca-phe-sua-da": "Е",
};

const DELIVERY_ID = "delivery";

function buildCatalog(): Record<string, CatalogItem> {
  const entries: CatalogItem[] = [
    ...menu.map((m) => ({ id: m.id, name: m.vi, price: m.price, tax: TAX_OVERRIDES[m.id] ?? DEFAULT_TAX })),
    ...addons.map((a) => ({ id: a.id, name: a.name, price: a.price, tax: TAX_OVERRIDES[a.id] ?? DEFAULT_TAX })),
    { id: DELIVERY_ID, name: "Dostava", price: site.deliveryFee, tax: TAX_OVERRIDES[DELIVERY_ID] ?? DEFAULT_TAX },
  ];
  return Object.fromEntries(entries.map((e) => [e.id, e]));
}

export const CATALOG: Record<string, CatalogItem> = buildCatalog();

export interface CartLine {
  id: string;
  qty: number;
}

export interface PricedLine extends CatalogItem {
  qty: number;
  lineTotal: number;
}

export interface PricedOrder {
  lines: PricedLine[];
  total: number; // integer dinars
}

/** Validate + price a cart. Throws on unknown items or bad quantities. */
export function priceCart(cart: CartLine[]): PricedOrder {
  if (!Array.isArray(cart) || cart.length === 0) throw new Error("empty cart");

  const lines: PricedLine[] = [];
  let subtotal = 0;

  for (const line of cart) {
    if (line.id === DELIVERY_ID) continue; // delivery is computed below, not client-supplied
    const item = CATALOG[line.id];
    if (!item) throw new Error(`unknown item: ${line.id}`);
    const qty = Number(line.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > 50) throw new Error(`bad qty for ${line.id}`);
    const lineTotal = item.price * qty;
    subtotal += lineTotal;
    lines.push({ ...item, qty, lineTotal });
  }

  if (subtotal === 0) throw new Error("empty cart");

  // Mirror the front end: free delivery over the threshold, otherwise add the fee.
  if (subtotal < site.freeDeliveryOver) {
    const d = CATALOG[DELIVERY_ID];
    lines.push({ ...d, qty: 1, lineTotal: d.price });
  }

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  return { lines, total };
}
