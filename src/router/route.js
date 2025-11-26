import { Router } from 'express';
import { ControladorUsuario } from '../Controller/ControllerUsuario.js';

const rutas = Router();

/** Rutas principales */
// Ruta de Raíz
rutas.get('/', (req, res) => {
  res.render('index', { title: 'Inicio - EduLink' });
});

/** Rutas Auth */
// Registro de Usuario
rutas.get('/registro-usuario', (req, res) => {
  res.render('auth/registro', { title: 'Registro - EduLink' });
});

// Login (vista)
rutas.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login - EduLink' });
});

// Registro de usuario (POST)
rutas.post('/registro-usuario', (req, res) => {
  ControladorUsuario.crearUsuario(req, res);
});

// Validar correo
rutas.post('/validar-correo', (req, res) => {
  ControladorUsuario.validarCorreo(req, res);
});

/** Rutas de vistas partials */
rutas.get('/partials/header', (req, res) => {
  res.render('partials/header');
});

rutas.get('/partials/layout', (req, res) => {
  res.render('partials/layout');
});

rutas.get('/partials/footer', (req, res) => {
  res.render('partials/footer');
});

/** Rutas Estudiante */
rutas.get('/panel', (req, res) => {
  res.render('estudiante/panel', { title: 'Panel del Estudiante' });
});

export default rutas;
