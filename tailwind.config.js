/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // si vas a usar daisyui
  daisyui: {
    themes: ["claro", "forest"], // personaliza si deseas
  },
};
