/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      screens: {
        
        'xs': '300px',
        'sm': '500px',
        'md': '768px',
        'lg': '1024px',
      },
      animation: {
        rotate: 'rotate 4s linear infinite',
      }
    ,
      
    },
  },
  plugins: [
   
    // ...
  ],
}