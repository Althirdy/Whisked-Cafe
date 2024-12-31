/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","./node_modules/@headlessui/react/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          100: "#F5E6E0",
          600: "#8B4513",
          700: "#693610",
          800: "#472408",
          900: "#2C1810",
        },
      },
    },
  },
  plugins: [],
};
