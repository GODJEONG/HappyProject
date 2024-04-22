/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bg1: "url('@/assets/background1.jpg')",
        bg2: "url('@/assets/background2.jpg')"
      },
    },
  },

  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'selector',
}

