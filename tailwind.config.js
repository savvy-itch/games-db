/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    minWidth: {
      '2/5': '40%',
    },
    extend: {
      boxSizing: ['border-box'],
    },
    corePlugins: {
      boxSizing: false,
    },
    plugins: [],
  }
}