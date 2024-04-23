/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        
        'xs': '300px',
        'sm': '450px',
        'md': '768px',
        'lg': '1024px',
      },
    },
  },
  plugins: [],
}