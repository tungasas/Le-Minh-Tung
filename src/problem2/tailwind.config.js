/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#a9a9a9',
        disabled: '#707070',
        error: '#c06060',
        button: '#31cb9e',
      },
      backgroundColor: {
        primary: '#0f0f0f',
        button: '#31cb9e4d',
        'button-hover': '#2ebf944d',
      },
    },
  },
  plugins: [],
};
