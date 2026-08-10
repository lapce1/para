import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Black ground under bright, saturated inks. No gradients, no tints:
        // every colour is a solid plate at full strength.
        ground: "#0A0A0A", // true black, the page ground
        raised: "#1A1A1A", // raised panels, one step off the ground
        chalk: "#FFFFFF", // all primary type and rules (19.4:1 on ground)
        chalksoft: "#A6A09A", // secondary type, warm grey (7.8:1 on ground)
        chili: "#FF3B30", // bright red, carries whole sections
        jade: "#00E676", // bright green, buttons and marks
        gold: "#FFD400", // bright yellow, prices and small marks
      },
      fontFamily: {
        // Display: heavy expanded grotesque, the packaging voice.
        display: ["Archivo", "system-ui", "sans-serif"],
        // Text: workhorse grotesque with real character.
        body: ["Chivo", "system-ui", "sans-serif"],
        // Data: prices, weights, lot codes. Measurement, not costume.
        data: ["Chivo Mono", "ui-monospace", "monospace"],
        // The wordmark keeps its original face; the logo is unchanged brand.
        mark: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        stamp: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
