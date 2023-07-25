/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxSizing: ['border-box'],
    },
    corePlugins: {
      boxSizing: false,
    },
    plugins: [],
  }
}