/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base terminal chrome — phosphor green CRT
        crt: {
          black: "#020803",
          bg: "#06120a",
          panel: "#0a1a0f",
          border: "#1f4d2e",
          green: "#33ff66",
          "green-dim": "#1a9e3f",
          "green-bright": "#7fffa0",
        },
        // The aristocracy palette — gold breaking through the green terminal
        cake: {
          gold: "#d4af37",
          "gold-bright": "#f4d35e",
          "gold-dim": "#8a6d1f",
          royal: "#6b1530",
          "royal-bright": "#9c1f44",
        },
        // Status severity colors
        status: {
          low: "#33ff66",
          moderate: "#c9d433",
          high: "#f4a533",
          extreme: "#f4602a",
          apocalyptic: "#ff2a3d",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        flicker: "flicker 4.2s infinite",
        blink: "blink 1s step-start infinite",
        scanline: "scanline 8s linear infinite",
        "flash-red": "flashRed 0.9s step-start infinite",
        glow: "glow 2.4s ease-in-out infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.94" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.96" },
          "97%": { opacity: "1" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flashRed: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0.35" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 4px currentColor, 0 0 12px currentColor" },
          "50%": { textShadow: "0 0 8px currentColor, 0 0 20px currentColor" },
        },
      },
      boxShadow: {
        crt: "0 0 0 2px #1f4d2e, 0 0 0 4px #06120a, inset 0 0 40px rgba(51,255,102,0.06)",
        terminal: "inset 0 0 60px rgba(0,0,0,0.6), 0 0 30px rgba(51,255,102,0.08)",
      },
    },
  },
  plugins: [],
};
