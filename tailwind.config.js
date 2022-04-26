module.exports = {
  content: ['./src/{pages,components}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#262626',
        secondary: '#393939',
        'secondary-light': '#333333',
      },
      fontFamily: {
        'ibm-sans': ['IBM Plex Sans', 'sans-serif'],
        'ibm-mono': ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
