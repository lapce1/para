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
        {/* Steam motif (the logo wisps, scaled up) anchors the brand even at
            small link-preview sizes. */}
        <svg
          width="330"
          height="450"
          viewBox="0 0 22 30"
          style={{ position: "absolute", right: 70, top: 90, opacity: 0.5 }}
        >
          <path
            d="M5 28 C2 22 8 20 5 14 C3 10 7 8 5 3"
            stroke="#E8B24A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M11 28 C8 21 14 19 11 12 C9 8 13 6 11 1"
            stroke="#E8B24A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          <path
            d="M17 28 C14 22 20 20 17 14 C15 10 19 8 17 4"
            stroke="#E8B24A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
        </svg>
        <div style={{ display: "flex", fontSize: 158, fontWeight: 800, color: "#FCF8F0", letterSpacing: -2 }}>
          PARA
        </div>
        <div style={{ display: "flex", fontSize: 46, color: "#E8B24A", marginTop: 6 }}>
          Vijetnamska pho kuhinja - Novi Sad
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 26, color: "#F3E9D6" }}>
          Krckana 6 sati - za stolom ili na dostavu, uvek vrela.
        </div>
      </div>
    ),
    { ...size },
  );
}
