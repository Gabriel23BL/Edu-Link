import { Router } from 'express';
import { ControladorUsuario } from '../Controller/ControllerUsuario.js';
import { uploadFoto } from "../config/multer.js";

const rutas = Router();

/** Rutas API de Usuario */

// Validar si un correo ya existe
rutas.post('/api/validar-correo', ControladorUsuario.validarCorreo);

// Registrar un nuevo usuario
rutas.post('/api/registro-usuario', ControladorUsuario.crearUsuario);

// Cambiar clave
rutas.post('/cambiar-clave', ControladorUsuario.cambiarClave);

// Cargar foto de perfil
rutas.post('/cargar-foto', uploadFoto.single("foto"), ControladorUsuario.cargarFoto);



export default rutas;
