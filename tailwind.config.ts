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
        // Paleta oficial MoveAcademy (inspirada na Sui)
        "sui-blue": "#6AD7E5",
        "sui-cyan": "#4BE4C9",
        "sui-dark": "#0A1A2F",
        "move-navy": "#0F233E",
        "aqua-soft": "#122C4A",
        "move-green": "#3FFE95",
      },
      backgroundImage: {
        "gradient-sui-move": "linear-gradient(135deg, #6AD7E5 0%, #4BE4C9 100%)",
        "gradient-neon-glow": "radial-gradient(circle, #3FFE95 0%, rgba(63,254,149,0.05) 70%)",
        "gradient-deep-night": "radial-gradient(circle at top left, #122C4A 0%, #0A1A2F 70%)",
      },
    },
  },
  plugins: [],
};
export default config;

