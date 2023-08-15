import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f97316",
          secondary: "#5eead4",
          accent: "#1f2937",
          neutral: "#1d283a",
          "base-100": "#ffffff",
          info: "#0ca6e9",
          success: "#2bd4bd",
          warning: "#f4c152",
          error: "#fb6f84"
        }
      }
    ]
  },
  plugins: [require("daisyui")]
};
export default config;
