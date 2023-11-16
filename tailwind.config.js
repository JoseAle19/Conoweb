/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT(
  
  {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        // Color de letras
        textColor:{
          'primary': "#4C3534"
        },
        // Tipos de letras
        fontFamily: {
          // 'poppins': ['Poppins', 'sans-serif'],
          'alfa': ['Alfa Slab One', 'cursive']
          
        },
  // animaciones
        keyframes: {
          enterLogo: {
            "0%": {
              opacity: 0,
            },
            "50%": {
              opacity: 0.5,
            },
            "100%": {
              opacity: 1,
            },
          },
          fadeInNav: {
            "0%": {
              opacity: 0,
            },
            "50%": {
              opacity: 0.5,
            },
            "100%": {
              opacity: 1,
            },
          },
          fadeOut: {
            "0%": {
              opacity: 1,
            },
            "50%": {
              opacity: 0.5,
            },
            "100%": {
              opacity: 0,
            },
          },
        },
        animation: {
          fadeIn: "enterLogo 1s linear",
          fadeInNav: "fadeInNav .5s linear",
          fadeOut: "fadeOut 1s linear",
        },
      },
    },
    plugins: [],
  },
)
