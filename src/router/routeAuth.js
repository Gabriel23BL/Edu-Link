import { Router } from 'express';
import bcrypt from 'bcrypt';
import { ModelUsuario } from '../Model/ModelUsuario.js';

const rutas = Router();

// GET login (vista EJS)
rutas.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Login - EduLink' });
});

// POST login (procesa credenciales)
rutas.post('/login', async (req, res) => {
  try {
    const { correo, clave } = req.body;

    // Buscar usuario en BD
    const usuario = await ModelUsuario.buscarPorCorreo(correo);
    if (!usuario) {
      return res.render('auth/login', { 
        title: 'Login - EduLink', 
        error: 'Usuario no encontrado' 
      });
    }

    // Validar clave
    const match = await bcrypt.compare(clave, usuario.clave);
    if (!match) {
      return res.render('auth/login', { 
        title: 'Login - EduLink', 
        error: 'Contraseña incorrecta' 
      });
    }

    // Guardar usuario en sesión
    req.session.user = {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol,
      foto: usuario.foto || null,
      id_usuario: usuario.id_usuario
    };

    // Redirigir según rol
    if (usuario.rol === 'estudiante') return res.redirect('/estudiante/panel');
    if (usuario.rol === 'docente') return res.redirect('/docente/panel');
    if (usuario.rol === 'admin') return res.redirect('/admin/panel');

    return res.redirect('/login');

  } catch (err) {
    console.error("Error en login:", err);
    return res.render('auth/login', { 
      title: 'Login - EduLink', 
      error: 'Error interno en login' 
    });
  }
});

// GET logout
rutas.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Error al cerrar sesión:', err);
    res.redirect('/login');
  });
});

export default rutas;
