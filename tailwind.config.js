/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': {
          50: '#f0f7f4',
          100: '#d9ebe2',
          200: '#b5d7c7',
          300: '#89bca5',
          400: '#5f9d82',
          500: '#3d7d62',
          600: '#2d634d',
          700: '#1B4D3E',
          800: '#1a3f34',
          900: '#16352c',
        },
        'copper': {
          50: '#fdf6f0',
          100: '#f9e8d9',
          200: '#f2cdb2',
          300: '#e9ab82',
          400: '#de8450',
          500: '#B87333',
          600: '#a65a28',
          700: '#8a4623',
          800: '#703a22',
          900: '#5c311f',
        },
        'cream': '#FAF9F6',
        'dark-green': '#295156',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'display': ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
