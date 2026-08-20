/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: "#00D29F",
          "teal-hover": "#00B88B",
          "teal-light": "#E6FBF5",
          navy: "#1A2045",
          "navy-light": "#242C5B",
          "navy-dark": "#121631",
          slate: "#2D3748",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(26, 32, 69, 0.08)",
        "card-hover": "0 12px 30px -4px rgba(26, 32, 69, 0.15)",
        teal: "0 4px 20px rgba(0, 210, 159, 0.35)",
      },
    },
  },
  plugins: [],
};
