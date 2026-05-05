/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        'bg-light': '#e9e9e9',
        'text-dark': '#333',
      }
    },
  },
  plugins: [],
}