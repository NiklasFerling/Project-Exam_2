/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    dropShadow: {
      "2xl": "0 4px 20px rgba(0, 0, 0, .1)",
    },
    extend: {
      dropShadow: {
        "3xl": "0 4px 20px hsla(110, 100%, 20%, 0.15)",
        "4xl": [
          "0 -4px 16px rgba(220, 252, 231, 1)",
          "0 -4px 16px rgba(220, 252, 231, 1)",
        ],
      },
    },
  },
  plugins: [],
};
