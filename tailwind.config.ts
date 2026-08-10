import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Printed-label world: uncoated board stock + flat process inks.
        // No gradients, no glow — every colour is a solid plate.
        paper: "#EDE2CE", // oat board, the ground
        board: "#E2D4BB", // deeper board, alternating panels
        ink: "#241B14", // espresso brown-black, all type (never pure #000)
        inksoft: "#5B4B3C", // secondary type on paper — tinted from ink, not grey
        paprika: "#A8371F", // committed field colour; paper text on it = 5.07:1
        paprikabright: "#C0442A", // brighter plate: illustration + misregistration shift
        lime: "#C9F23F", // the sharp accent — acid, not herbal
        amber: "#E8A33C", // broth tone, illustration only — never UI chrome
      },
      fontFamily: {
        // Display: heavy expanded grotesque, the packaging voice.
        display: ["Archivo", "system-ui", "sans-serif"],
        // Text: workhorse grotesque with real character.
        body: ["Chivo", "system-ui", "sans-serif"],
        // Data: prices, weights, lot codes — measurement, not costume.
        data: ["Chivo Mono", "ui-monospace", "monospace"],
        // The wordmark keeps its original face; the logo is unchanged brand.
        mark: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        stamp: "0.18em",
      },
      boxShadow: {
        // Depth comes from print: offset + blur, ink-tinted, never a halo.
        panel: "0 14px 30px -18px rgba(36,27,20,0.55)",
        lift: "0 22px 44px -24px rgba(36,27,20,0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
