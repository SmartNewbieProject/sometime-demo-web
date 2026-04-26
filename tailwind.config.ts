import type { Config } from "tailwindcss";

/**
 * Tailwind v4 reads tokens from the `@theme` block in `src/app/globals.css`.
 * This file mirrors those tokens for tooling/IDE awareness and acts as the
 * single source of truth reference for brand palette, spacing and radii.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7E5BEF",
          deep: "#6240D4",
          soft: "#A98EF5",
          pale: "#E8E0FF",
          mist: "#F5F1FF",
        },
        pink: {
          soft: "#FFE4ED",
        },
        ink: {
          900: "#0A0A0F",
          800: "#18141F",
          700: "#2A2A35",
          500: "#6B6B7B",
          400: "#8B8B97",
          300: "#B5B5C0",
          100: "#E8E8EE",
        },
        line: {
          DEFAULT: "#EFECF5",
          subtle: "#F5F4F9",
        },
        status: {
          green: "#2DD4A8",
          red: "#FF4D6D",
        },
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "32px",
        8: "40px",
        9: "56px",
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
};

export default config;
