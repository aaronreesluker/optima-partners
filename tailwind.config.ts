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
        "marker-orbit": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "marker-orbit": "marker-orbit 3.2s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
