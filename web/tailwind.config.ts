import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
