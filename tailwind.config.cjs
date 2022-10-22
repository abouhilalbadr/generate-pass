/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      green: '#a3ffae',
      yellow: '#f8cb63',
      orange: '#fb7a56',
      red: '#f74b4b',
      gray: {
        dark: '#e7e6eb',
        darker: '#807c92',
      },
      mainBg: {
        dark: '#24232b',
        darker: '#131219',
      }
    },
    fontFamily: {
      'jetBrains': ['JetBrains Mono', 'monospace'],
    }
  },
  plugins: [],
}
