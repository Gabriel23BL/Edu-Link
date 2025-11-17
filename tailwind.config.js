/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.ejs",     // Todas tus vistas EJS
    "./public/js/**/*.js"       // Scripts públicos si usas clases dinámicas
  ],
  theme: {
    extend: {
      colors: {
        azulEduLink: {
          claro: "#3498db",      // Azul claro institucional
          oscuro: "#173f61",     // Azul oscuro institucional
        },
        grisEduLink: "#f3f4f6"    // Gris claro institucional
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}

module.exports = {
  content: ["./src/views/**/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [],
}

/**
 module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}; 
*/
