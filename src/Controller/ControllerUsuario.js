import bcrypt from "bcrypt";
import { ModelUsuario } from "../Model/ModelUsuario.js";

export class ControladorUsuario {
  // Crear usuario
  static async crearUsuario(req, res) {
    try {
      const { nombre, correo, clave, id_usuario, rol } = req.body;

      // Normalizar rol recibido (texto)
      let rolNormalizado = "estudiante";
      if (rol === "docente") rolNormalizado = "docente";
      else if (rol === "admin") rolNormalizado = "admin";

      // Encriptar clave antes de guardar
      const salt = await bcrypt.genSalt(10);
      const hashClave = await bcrypt.hash(clave, salt);

      // Crear usuario con el modelo
      const resultado = await ModelUsuario.crearUsuario({
        nombre,
        correo,
        clave: hashClave,
        id_usuario,
        rol: rolNormalizado,
      });

      if (resultado.status !== "ok") {
        return res.status(400).json({
          status: "error",
          message: resultado.message || "Error, no se pudo crear el usuario",
        });
      }

      return res.status(201).json({
        status: "ok",
        message: "Usuario creado exitosamente",
      });
    } catch (error) {
      console.error("Error en ControladorUsuario.crearUsuario:", error);
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
      });
    }
  }

  // Validar correo
  static async validarCorreo(req, res) {
    try {
      const { correo } = req.body;
      if (!correo) {
        return res.status(400).json({ existe: false, error: "Correo no proporcionado" });
      }

      const usuario = await ModelUsuario.buscarPorCorreo(correo);
      return res.json({ existe: !!usuario });
    } catch (error) {
      console.error("Error en validarCorreo:", error);
      return res.status(500).json({ existe: false, error: "Error interno" });
    }
  }

  // Cambiar clave
  static async cambiarClave(req, res) {
    try {
      const { claveActual, nuevaClave, confirmarClave } = req.body;

      if (!req.session?.user) return res.redirect("/login");

      if (nuevaClave !== confirmarClave) {
        return res.render("perfil", { 
          error: "La nueva clave y su confirmación no coinciden", 
          user: req.session.user 
        });
      }

      const usuario = await ModelUsuario.buscarPorCorreo(req.session.user.correo);
      if (!usuario) return res.redirect("/login");

      const match = await bcrypt.compare(claveActual, usuario.clave);
      if (!match) {
        return res.render("perfil", { 
          error: "La clave actual es incorrecta", 
          user: req.session.user 
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(nuevaClave, salt);

      await ModelUsuario.actualizarClave(usuario.id, hash);

      req.session.destroy(() => res.redirect("/login"));
    } catch (error) {
      console.error("Error en cambiarClave:", error);
      return res.render("perfil", { 
        error: "Error interno al cambiar clave", 
        user: req.session.user 
      });
    }
  }

  // Cargar foto de perfil
  static async cargarFoto(req, res) {
    try {
      if (!req.session?.user) return res.redirect("/login");

      if (!req.file) {
        return res.render("perfil", {
          error: "No se seleccionó ninguna imagen",
          user: req.session.user,
        });
      }

      const rutaFoto = `/uploads/${req.file.filename}`;
      await ModelUsuario.actualizarFoto(req.session.user.id, rutaFoto);

      req.session.user.foto = rutaFoto;
      return res.redirect("/estudiante/perfil");
    } catch (error) {
      console.error("Error en cargarFoto:", error);
      return res.render("perfil", {
        error: "Error interno al cargar foto",
        user: req.session.user,
      });
    }
  }
}
