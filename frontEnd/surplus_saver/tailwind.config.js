/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "900px",
        lg: "1164px",
      },
      colors: {
        // Add your custom colors here
        orange: "#ff7727",
        green: "#1db88e",
        pink: "#ff8f90",
        white: "#fffef8",
        blue: "#32d7f4",
        yellow: "#ffdd52",
        // Add more colors as needed
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["forest"],
  },
};