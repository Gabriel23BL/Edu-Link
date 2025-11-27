import { Router } from 'express';

const rutas = Router();

// Middleware de autenticación para estudiantes
function ensureAuthenticated(req, res, next) {
  if (req.session?.user && req.session.user.rol === 'estudiante') {
    return next();
  }
  res.redirect('/auth/login'); 
}

// Panel principal del estudiante
rutas.get('/panel', ensureAuthenticated, (req, res) => {
  res.render('estudiante/panel', { title: 'Panel del Estudiante', user: req.session.user });
});

// Inscripción
rutas.get('/inscripcion', ensureAuthenticated, (req, res) => {
  res.render('estudiante/inscripcion', { title: 'Solicitud de Inscripción', user: req.session.user });
});

// Adición y Retiro
rutas.get('/adicion-retiro', ensureAuthenticated, (req, res) => {
  res.render('estudiante/adicionRetiro', { title: 'Adición y Retiro de Materias', user: req.session.user });
});

// Acta Especial
rutas.get('/acta-especial', ensureAuthenticated, (req, res) => {
  res.render('estudiante/actaEspecial', { title: 'Solicitud de Acta Especial', user: req.session.user });
});

// Encuestas
rutas.get('/encuestas', ensureAuthenticated, (req, res) => {
  res.render('estudiante/encuestas', { title: 'Encuestas', user: req.session.user });
});

// Perfil del Estudiante
rutas.get('/perfil', ensureAuthenticated, (req, res) => {
  res.render('estudiante/perfil', { title: 'Perfil del Estudiante', user: req.session.user });
});

export default rutas;
