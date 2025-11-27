import multer from "multer";
import path from "path";

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const userId = req.session?.user?.id || "anon";
    const nombreArchivo = `${userId}-${Date.now()}${ext}`;
    cb(null, nombreArchivo);
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = ["image/jpeg", "image/png", "image/jpg"];
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de archivo no permitido"), false);
  }
};

export const uploadFoto = multer({ storage, fileFilter });
