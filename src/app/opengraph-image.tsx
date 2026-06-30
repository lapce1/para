import { ImageResponse } from "next/og";

// Build-time OG image (1200×630). Generated as a static PNG during `next build`,
// so it works on the Cloudflare static export. Next injects the og:image meta
// (and Twitter falls back to it) automatically from this file.
export const alt = "PARA — vijetnamska pho kuhinja, Novi Sad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Text is kept ASCII on purpose: Satori's fallback font may not carry Vietnamese
// diacritics, and the OG card must render reliably across social scrapers.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #1E2024 0%, #0C0D10 100%)",
          color: "#F3E9D6",
        }}
      >
        <div style={{ display: "flex", fontSize: 158, fontWeight: 800, color: "#FCF8F0", letterSpacing: -2 }}>
          PARA
        </div>
        <div style={{ display: "flex", fontSize: 46, color: "#E8B24A", marginTop: 6 }}>
          Vijetnamska pho kuhinja - Novi Sad
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 26, color: "#F3E9D6" }}>
          Supa koja putuje - krckana 6 sati, dostavljena vrela.
        </div>
      </div>
    ),
    { ...size },
  );
}
