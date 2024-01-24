/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/*.{html,gohtml}'],
  theme: {
    fontFamily: {
      mono: ['DM Mono', 'monospace'],
      sans: ['IBM Plex Sans', 'sans-serif'],
      cursive: ['Agbalumo'],
    },
    extend: {
      colors: {
        primary: '#FFE066',
        light: '#FAF9F9',
        dark: '#070707',
      },
    },
  },
  plugins: [],
};
