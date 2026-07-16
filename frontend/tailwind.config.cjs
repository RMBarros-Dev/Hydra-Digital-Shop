/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hydra: {
          DEFAULT: '#6d28d9',
          cyan: '#06b6d4'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
};
