/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        arena: {
          50: '#f5f7ff',
          100: '#e6eeff',
          900: '#0b0f1a'
        }
      }
    }
  },
  plugins: []
};
