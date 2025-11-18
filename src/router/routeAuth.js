import express from 'express';
import bcrypt from 'bcrypt';
import { ModelUsuario } from '../Model/ModelUsuario.js';

const router = express.Router();

// GET login (vista EJS)
router.get('/login', (req, res) => {
  res.render('auth/login', { titulo: 'Login - EduLink' });
});

// POST login (procesa credenciales)
router.post('/login', async (req, res) => {
  try {
    const { correo, clave } = req.body;

    // Buscar usuario por correo
    const usuario = await ModelUsuario.buscarPorCorreo(correo);
    if (!usuario) {
      return res.status(400).json({ status: "error", message: "Usuario no encontrado" });
    }

    // Comparar contraseña encriptada
    const match = await bcrypt.compare(clave, usuario.clave);
    if (!match) {
      return res.status(400).json({ status: "error", message: "Contraseña incorrecta" });
    }

    return res.json({
      status: "ok",
      message: "Login exitoso",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol_id: usuario.rol_id
      }
    });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ status: "error", message: "Error interno en login" });
  }
});

export default router;
