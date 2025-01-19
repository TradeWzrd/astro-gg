/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6d28d9',
          light: '#a78bfa'
        },
        secondary: {
          DEFAULT: '#1E0038',
          light: '#332BA3'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(12px)'
      }
    }
  },
  plugins: []
}
