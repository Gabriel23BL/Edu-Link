import express from 'express';
import { ControladorUsuario } from '../Controller/ControllerUsuario.js';

const router = express.Router();

// Validar si un correo ya existe
router.post('/api/validar-correo', ControladorUsuario.validarCorreo);

// Registrar un nuevo usuario
router.post('/api/registro-usuario', ControladorUsuario.crearUsuario);

export default router;
