/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
    container: {
      center: true,
      padding: '1.25rem',
    },
  },
  plugins: [],
}

