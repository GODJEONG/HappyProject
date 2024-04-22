/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg1: "url('@/assets/background1.jpg')",
        bg2: "url('@/assets/background2.jpg')"
      },
    },
  },

  plugins: [],
  darkMode: 'selector',
}

