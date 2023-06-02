/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js"
  ],
  theme: {
    extend: {},
  },
  fontFamily: {
    inter: ['Inter', 'sans-serif']
  },
  plugins: [
    import('@tailwindcss/forms'),
  ],
}

