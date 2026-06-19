/**
 * Money handling for RSD.
 *
 * AllSecure's docs use EUR examples with a 2-decimal string ("9.99"). RSD on the
 * card rails is conventionally minor-unit-aware, so we format whole dinars as
 * "950.00". CONFIRM with your AllSecure integration engineer / acquirer:
 *   - the exact currency code they expect ("RSD" vs ISO numeric "941")
 *   - whether amounts are sent as "950.00" or "950"
 * Both are isolated to this file, so a change is one-line.
 */

export const CURRENCY = "RSD";

/** Store amounts internally as integer dinars (no floats for money, ever). */
export function dinars(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new Error(`invalid dinar amount: ${n}`);
  return n;
}

/** Format integer dinars as the decimal string the gateway expects. */
export function toGatewayAmount(dinarAmount: number): string {
  return (dinarAmount).toFixed(2); // "950" -> "950.00"
}
