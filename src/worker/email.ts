/**
 * Transactional email via an HTTP API (Resend shown; Postmark/SES are drop-in).
 * Cloudflare Email Routing is inbound-only, so outbound goes through a provider.
 * Verify your sending domain (para.rs) with the provider first.
 */

export interface EmailEnv {
  RESEND_API_KEY: string;
  RECEIPT_FROM?: string; // e.g. "PARA <racun@para.rs>"
}

/** Escape values before they land in the HTML email body. */
function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendReceiptEmail(
  env: EmailEnv,
  to: string,
  subject: string,
  html: string,
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.RECEIPT_FROM ?? "PARA <racun@para.rs>",
      to: [to],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    throw new Error(`email send failed: ${res.status} ${await res.text()}`);
  }
}

export function receiptEmailHtml(args: {
  merchantTxId: string;
  amountText: string;
  verificationUrl: string;
  invoiceNumber: string;
}): string {
  // Every interpolated value is escaped. verificationUrl additionally must be an
  // http(s) link — never inject an arbitrary scheme (javascript:, data:) into href.
  const safeUrl = /^https?:\/\//i.test(args.verificationUrl) ? esc(args.verificationUrl) : "#";
  return `<div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto">
  <h2 style="color:#D85A33">PARA — fiskalni račun</h2>
  <p>Hvala na porudžbini. Vaše plaćanje je uspešno primljeno.</p>
  <p><strong>Iznos:</strong> ${esc(args.amountText)} RSD<br>
     <strong>Broj računa:</strong> ${esc(args.invoiceNumber)}<br>
     <strong>Referenca:</strong> ${esc(args.merchantTxId)}</p>
  <p><a href="${safeUrl}"
        style="display:inline-block;background:#D85A33;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">
     Pogledaj fiskalni račun</a></p>
  <p style="color:#666;font-size:13px">Račun možete proveriti na portalu Poreske uprave preko gornjeg linka.</p>
</div>`;
}
