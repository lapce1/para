import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        char: "#14100C",
        charsoft: "#1E1813",
        broth: "#E0A43B",
        ember: "#B5471F",
        herb: "#8CB33A",
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
