import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "var(--background)",
        "foreground": "var(--foreground)",
        "card-bg": "var(--card-bg)",
        "card-border": "var(--card-border)",
        "text-secondary": "var(--text-secondary)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "surface-variant": "var(--surface-variant)",
        "primary": "var(--primary)",
        "on-primary": "var(--on-primary)",
        "arch-blue": "var(--primary)",
        "arch-dark": "var(--background)",
        "arch-darker": "var(--background)",
        "arch-border": "var(--card-border)",
        "arch-text": "var(--text-secondary)",
        "arch-white": "var(--foreground)",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
      },
      spacing: {
        "ma-unit": "1rem",
        "gutter": "2rem",
        "element-gap": "4rem",
        "margin-page": "5vw",
        "section-gap": "24rem",
      },
      fontFamily: {
        "headline-md": ["var(--font-newsreader)", "serif"],
        "body-md": ["var(--font-inter)", "sans-serif"],
        "headline-xl": ["var(--font-newsreader)", "serif"],
        "body-lg": ["var(--font-inter)", "sans-serif"],
        "headline-lg": ["var(--font-newsreader)", "serif"],
        "label-sm": ["var(--font-inter)", "sans-serif"],
        "jetbrains-mono": ["var(--font-jetbrains-mono)", "monospace"],
        "tech-header": ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "headline-md": ["32px", { lineHeight: "1.3", fontWeight: "400" }],
        "body-md": ["15px", { lineHeight: "1.8", fontWeight: "400" }],
        "headline-xl": ["84px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "300" }],
        "body-lg": ["18px", { lineHeight: "1.9", letterSpacing: "0.01em", fontWeight: "400" }],
        "headline-lg": ["48px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1", letterSpacing: "0.1em", fontWeight: "500" }],
        "tech-header-xl": ["6rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "800" }],
        "tech-header-lg": ["4rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "700" }],
        "tech-header-md": ["3rem", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
