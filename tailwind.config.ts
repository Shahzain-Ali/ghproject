import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        customsm: {min: '200px', max: '440px'},
        smm: {min: '440px', max: '640px'},
        sm: {min: '640px', max: '768px'},
        md: {min: '768px',max : '1024px' },
        lg: {min: '1024px',max : '1280px' },
      },
      fontFamily: {
        sans: ["Josefin Sans", ...fontFamily.sans], // Custom font add
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
