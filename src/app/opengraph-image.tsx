import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Build-time OG image (1200×630). Generated as a static PNG during `next build`,
// so it works on the Cloudflare static export. Next injects the og:image meta
// (and Twitter falls back to it) automatically from this file.
export const alt = "PARA — vijetnamska pho kuhinja, Stražilovska 10, Novi Sad";
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
          background: "#EDE2CE",
          color: "#241B14",
        }}
      >
        {/* ink column: the wordmark and the claim */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "78px",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 800,
              letterSpacing: -6,
              lineHeight: 1,
            }}
          >
            PARA
          </div>
          <div style={{ display: "flex", height: 8, width: 300, background: "#A8371F", marginTop: 26 }} />
          <div style={{ display: "flex", fontSize: 52, marginTop: 30, fontWeight: 700, letterSpacing: -1 }}>
            Sest sati na kosti.
          </div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 18, color: "#5B4B3C" }}>
            Vijetnamska pho kuhinja · {site.address} · {site.city}
          </div>
        </div>

        {/* committed paprika field with the steam mark */}
        <div
          style={{
            display: "flex",
            width: 360,
            background: "#A8371F",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="200" height="272" viewBox="0 0 22 30" fill="none">
            <path d="M5 28 C2 22 8 20 5 14 C3 10 7 8 5 3" stroke="#EDE2CE" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 28 C8 21 14 19 11 12 C9 8 13 6 11 1" stroke="#C9F23F" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 28 C14 22 20 20 17 14 C15 10 19 8 17 4" stroke="#EDE2CE" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          </svg>
        </div>
      </div>
    ),
    { ...size },
  );
}
