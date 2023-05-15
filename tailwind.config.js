/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      'white': '#ffffff',
      'light-navy': '#1D267D',
      'dark-navy': '#0C134F',
    },
    boxShadow: {
      '1': '0px 0px 65px 0px rgba(255,255,255,0.4)'
    }
  },
  plugins: [],
}