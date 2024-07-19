/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'font_rubin' : 'Rubik,sans-serif'
      },
      colors : {
        'Very_Dark_Gray': 'hsl(0, 0%, 17%)',
        'Dark_Gray': 'hsl(0, 0%, 59%)'
      }
    },
  },
  plugins: [],
}

