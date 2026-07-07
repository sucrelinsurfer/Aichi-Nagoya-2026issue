import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts}",
  ],
  safelist: [
    "bg-red-500",
    "bg-emerald-500",
    "bg-amber",
    "bg-slate-400",
    "bg-sky-500",
    "bg-wave",
    "bg-coral",
    "bg-emerald-500",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b1f33",
        wave: "#0e7c86",
        foam: "#e8f4f4",
        amber: "#f5a524",
        coral: "#e8543f",
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
