import conexion from '../db/conexion.js';
import bcrypt from 'bcrypt';

export class ModelUsuario {
  // Crear usuario
  static async crearUsuario({ nombre, correo, clave, id_usuario, rol_id }) {
    const query = `
      INSERT INTO usuarios (nombre, correo, clave, id_usuario, rol_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      const db = await conexion();

      // Encriptar la clave antes de guardar
      const hashedPassword = await bcrypt.hash(clave, 10);

      await db.run(query, [nombre, correo, hashedPassword, id_usuario, rol_id]);

      await db.close();
      return { status: "ok", message: "Usuario creado correctamente" };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return { status: "error", message: "No se pudo crear el usuario" };
    }
  }

  // Buscar usuario por correo
  static async buscarPorCorreo(correo) {
    try {
      const db = await conexion();
      const usuario = await db.get(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
      await db.close();
      return usuario;
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      return null;
    }
  }

  // Validar login
  static async validarLogin(correo, clave) {
    try {
      const db = await conexion();
      const usuario = await db.get(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
      await db.close();

      if (!usuario) return null;

      const match = await bcrypt.compare(clave, usuario.clave);
      return match ? usuario : null;
    } catch (error) {
      console.error('Error al validar login:', error);
      return null;
    }
  }
}
