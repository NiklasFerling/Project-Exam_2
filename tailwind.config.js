/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": "0 10px 8px rgba(220, 252, 231, .5)",
        "4xl": [
          "0 -4px 16px rgba(220, 252, 231, 1)",
          "0 -4px 16px rgba(220, 252, 231, 1)",
        ],
      },
    },
  },
  plugins: [],
};
