import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        char: "#0F150D", // deepest tone — nav, insets, pops of contrast
        charsoft: "#2A3823", // raised surface (green-charcoal, steps clearly above body)
        broth: "#E0A43B",
        brothlight: "#F4CE78",
        ember: "#B5471F",
        herb: "#8CB33A",
        herblight: "#9CC246",
        bone: "#F3E9D6",
        steam: "#FCF8F0",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(224,164,59,0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
