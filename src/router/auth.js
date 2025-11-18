const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario'); // tu modelo de usuario

// GET login (vista)
router.get('/login', (req, res) => {
  res.render('auth/login'); // renderiza login.ejs
});

// POST login (procesa credenciales)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ status: "error", message: "Usuario no encontrado" });
    }

    // Comparar contraseña
    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({ status: "error", message: "Contraseña incorrecta" });
    }

    // Si todo va bien
    res.json({ status: "success", message: "Login exitoso", data: usuario });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ status: "error", message: "Error interno en login" });
  }
});

module.exports = router;
