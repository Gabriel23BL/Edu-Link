import { Router } from 'express';
import { ControladorUsuario } from '../Controller/ControllerUsuario.js';

export const rutas = Router();

// Ruta de Raiz
rutas.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio - EduLink' });
});


/** Rutas Auth */
// Ruta de Registro de Usuario
rutas.get('/registro-usuario', (req, res) => {
  res.render('auth/registro', { titulo: 'Registro - EduLink' });
});

// Ruta de login 
rutas.get('/login', (req, res) => {
  res.render('auth/login', { titulo: 'Login - EduLink' });
});



/**  Rutas de vistas partials*/
// Header partial
rutas.get('/partials/header', (req, res) => {
  res.render('partials/header');
});

// layout partial
rutas.get('/partials/layout', (req, res) => {
  res.render('partials/layout');
});

// Footer partial
rutas.get('/partials/footer', (req, res) => {
  res.render('partials/footer');
});



// Ruta para manejar el registro de usuario
rutas.post("/api/registro-usuario", ControladorUsuario.crearUsuario);