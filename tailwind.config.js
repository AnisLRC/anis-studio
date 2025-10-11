// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pearl: '#F9F7FB',
        amethyst: '#6E44FF',
        lavender: '#BDA6FF',
        plum: '#2E2447',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: { lg: '1024px', xl: '1280px', '2xl': '1440px' },
      },
    },
  },
  plugins: [],
};
