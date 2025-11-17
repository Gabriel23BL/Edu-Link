import { ModelUsuario } from "../Model/ModelUsuario.js";

export class ControladorUsuario {
  static async crearUsuario(req, res) {
    try {
      const { nombre, correo, clave } = req.body;
      console.log(nombre, correo, clave);

      const usuarioCreado = await ModelUsuario.crearUsuario(nombre, correo, clave);

      if (!usuarioCreado) {
        return res.status(400).json({
          status: 'error',
          message: 'Error, no se pudo crear el usuario'
        });
      }

      return res.status(201).json({
        status: 'ok',
        message: 'Usuario creado exitosamente...'
      });

    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor'
      });
    }
  }
}
