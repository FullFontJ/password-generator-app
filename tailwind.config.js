/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-body': '#0F0E14'
      },
      colors: {
        primary: '#0F0E14',
        secundary: '#24232B',
        customgray: '#82808F',
        customWhite: '#A4FFAF',
        customYellow: '#F8CE61'
      },
    },
  },
  plugins: [],
}

