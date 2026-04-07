import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        border: "var(--border)",
        muted: "var(--muted)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config; 