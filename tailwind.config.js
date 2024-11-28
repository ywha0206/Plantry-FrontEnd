/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};