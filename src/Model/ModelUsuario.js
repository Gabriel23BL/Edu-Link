import conexion from '../db/conexion.js';
import bcrypt from 'bcrypt';

export class ModelUsuario {
  // Crear usuario (recibe clave ya encriptada desde el controlador)
  static async crearUsuario({ nombre, correo, clave, id_usuario, rol }) {
    const query = `
      INSERT INTO usuarios (nombre, correo, clave, id_usuario, rol, foto)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    try {
      const db = await conexion();
      // Al crear usuario, inicializamos foto como null
      await db.run(query, [nombre, correo, clave, id_usuario, rol, null]);
      await db.close();
      return { status: "ok", message: "Usuario creado correctamente" };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return { status: "error", message: "No se pudo crear el usuario" };
    }
  }

  // Buscar usuario por correo (incluye foto)
  static async buscarPorCorreo(correo) {
    try {
      const db = await conexion();
      const usuario = await db.get(
        `SELECT id, nombre, correo, rol, clave, foto, id_usuario 
         FROM usuarios WHERE correo = ?`,
        [correo]
      );
      await db.close();
      return usuario;
    } catch (error) {
      console.error('Error al buscar usuario:', error);
      return null;
    }
  }

  // Validar login (incluye foto)
  static async validarLogin(correo, clave) {
    try {
      const db = await conexion();
      const usuario = await db.get(
        `SELECT id, nombre, correo, rol, clave, foto, id_usuario 
         FROM usuarios WHERE correo = ?`,
        [correo]
      );
      await db.close();

      if (!usuario) return null;

      const match = await bcrypt.compare(clave, usuario.clave);
      return match ? usuario : null;
    } catch (error) {
      console.error('Error al validar login:', error);
      return null;
    }
  }

  // Actualizar clave
  static async actualizarClave(id, nuevaClaveHash) {
    const query = `UPDATE usuarios SET clave = ? WHERE id = ?`;
    try {
      const db = await conexion();
      await db.run(query, [nuevaClaveHash, id]);
      await db.close();
      return { status: "ok", message: "Clave actualizada correctamente" };
    } catch (error) {
      console.error('Error al actualizar clave:', error);
      return { status: "error", message: "No se pudo actualizar la clave" };
    }
  }

  // Actualizar foto de perfil
  static async actualizarFoto(id, rutaFoto) {
    const query = `UPDATE usuarios SET foto = ? WHERE id = ?`;
    try {
      const db = await conexion();
      await db.run(query, [rutaFoto, id]);
      await db.close();
      return { status: "ok", message: "Foto actualizada correctamente" };
    } catch (error) {
      console.error('Error al actualizar foto:', error);
      return { status: "error", message: "No se pudo actualizar la foto" };
    }
  }
}
