const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'jakarta':['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        'nunito':['Nunito', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [require("daisyui")],
}
