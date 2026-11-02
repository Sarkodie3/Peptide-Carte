/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f0fc',
          100: '#ece3f8',
          200: '#dac7f2',
          300: '#c2a3e9',
          400: '#9b6bd9',
          500: '#7e46c7',
          600: '#6a36b3',
          700: '#582b97',
          800: '#4E2A84', // Primary imperial violet
          900: '#3D2066',
          950: '#220e3d',
        },
        gold: {
          50: '#fbf8f0',
          100: '#f6eedd',
          200: '#ecdcba',
          300: '#dfc38f',
          400: '#d1a764',
          500: '#C9A962', // Accent luxury gold
          600: '#b8944f',
          700: '#99763d',
          800: '#7d6035',
          900: '#664f2e',
        },
        night: {
          800: '#2d2d3a',
          900: '#1e1333',
          950: '#140c22',
        }
      },
      fontFamily: {
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 16px 36px rgba(78, 42, 132, 0.08)',
        'brand-lg': '0 20px 45px rgba(78, 42, 132, 0.14)',
        'gold': '0 10px 25px rgba(201, 169, 98, 0.25)',
      }
    },
  },
  plugins: [],
}
