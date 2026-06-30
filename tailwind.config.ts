import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        char: "#0E0F12", // deepest neutral tone — nav, footer, insets
        charsoft: "#1E2024", // raised surface (neutral graphite, steps clearly above body)
        broth: "#E8B24A", // signature gold (≈ Pantone 142/143 C)
        brothlight: "#F6D488",
        ember: "#D85A33", // terracotta CTA (≈ Pantone 7416 C)
        emberdark: "#B5471F",
        herb: "#57C77B", // fresh jade-leaf green — clean accent, not olive
        herblight: "#86E0A3",
        lime: "#A7D84F", // bright lime — citrus garnish pop
        chili: "#E2533B", // chili red — heat / "ljuto" accent
        bone: "#F3E9D6",
        steam: "#FCF8F0",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(232,178,74,0.5)",
        lift: "0 18px 40px -20px rgba(0,0,0,0.7)",
      },
    },
  },
  plugins: [],
};

export default config;
