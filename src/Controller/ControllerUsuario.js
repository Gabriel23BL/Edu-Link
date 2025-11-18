import { ModelUsuario } from "../Model/ModelUsuario.js";

export class ControladorUsuario {
  // Crear usuario
  static async crearUsuario(req, res) {
    try {
      const { nombre, correo, clave, id_usuario, rol } = req.body;
      console.log("Datos recibidos:", nombre, correo, clave, id_usuario, rol);

      // Asignar rol_id según el rol recibido
      let rol_id = 1; // por defecto estudiante
      if (rol === "docente") rol_id = 2;
      if (rol === "admin") rol_id = 3;

      // Crear usuario con el modelo
      const resultado = await ModelUsuario.crearUsuario({
        nombre,
        correo,
        clave,
        id_usuario,
        rol_id
      });

      if (resultado.status !== "ok") {
        return res.status(400).json({
          status: "error",
          message: resultado.message || "Error, no se pudo crear el usuario"
        });
      }

      return res.status(201).json({
        status: "ok",
        message: "Usuario creado exitosamente"
      });

    } catch (error) {
      console.error("Error en ControladorUsuario.crearUsuario:", error);
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor"
      });
    }
  }

  // Validar correo (para tu JS de registro)
  static async validarCorreo(req, res) {
    try {
      const { correo } = req.body;
      if (!correo) {
        return res.status(400).json({ existe: false, error: "Correo no proporcionado" });
      }

      const usuario = await ModelUsuario.buscarPorCorreo(correo);

      if (usuario) {
        return res.json({ existe: true });
      }
      return res.json({ existe: false });
    } catch (error) {
      console.error("Error en validarCorreo:", error);
      return res.status(500).json({ existe: false, error: "Error interno" });
    }
  }
}
