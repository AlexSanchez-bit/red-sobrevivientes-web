/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      _colors: {
        brick: "var(--primary-color-brick)",
        sea: "#ffffff",
        grass: "#be995b",
        wood: "#be995b",
        darkblue: "var(--secondary-color-blue)",
        pink: "var(--secondary-color-pink)",
        salmon: "#ffffff",
        cyan: "var(--secondary-color-cyan)",
      },
      colors: {
        coreanblue: "#449ca8",
        brick: "var(--primary-color-brick)",
        sea: "var(--primary-color-sea)",
        grass: "var(--primary-color-grass)",
        wood: "#ffffff",
        darkblue: "#ffffff",
        pink: "var(--secondary-color-pink)",
        salmon: "var(--secondary-color-salmon)",
        cyan: "var(--secondary-color-cyan)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
