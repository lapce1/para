import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Build-time OG image (1200×630). Generated as a static PNG during `next build`,
// so it works on the Cloudflare static export. Next injects the og:image meta
// (and Twitter falls back to it) automatically from this file.
export const alt = "PARA, vijetnamska pho kuhinja, Strazilovska 10, Novi Sad";
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
          background: "#0A0A0A",
          color: "#FFFFFF",
        }}
      >
        {/* type column: the wordmark and the claim */}
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
          <div style={{ display: "flex", height: 8, width: 300, background: "#FF3B30", marginTop: 26 }} />
          <div style={{ display: "flex", fontSize: 52, marginTop: 30, fontWeight: 700, letterSpacing: -1 }}>
            Goveda pho supa, kuvana sest sati.
          </div>
          <div style={{ display: "flex", fontSize: 30, marginTop: 18, color: "#A6A09A" }}>
            {site.address} · {site.city} · {site.hours}
          </div>
        </div>

        {/* the committed field with the steam mark */}
        <div
          style={{
            display: "flex",
            width: 360,
            background: "#FF3B30",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="200" height="272" viewBox="0 0 22 30" fill="none">
            <path d="M5 28 C2 22 8 20 5 14 C3 10 7 8 5 3" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 28 C8 21 14 19 11 12 C9 8 13 6 11 1" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 28 C14 22 20 20 17 14 C15 10 19 8 17 4" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
          </svg>
        </div>
      </div>
    ),
    { ...size },
  );
}
