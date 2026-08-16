import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151817",
        grey: "#6E7573",
        teal: "#123C44",
        mist: "#F6F7F7",
        line: "#E7E9E8",
        navy: "#212B5F",
        brand: { dark: "#0E4A44", DEFAULT: "#15805E", light: "#47C492" },
      },
      fontFamily: {
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "marker-pulse": {
          "0%": { transform: "scale(0.8)", opacity: "0.55" },
          "70%": { transform: "scale(2.4)", opacity: "0" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        "marker-pulse": "marker-pulse 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
