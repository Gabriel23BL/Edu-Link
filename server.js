import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { rutas } from './src/router/route.js';
import routeUsuario from './src/router/routeUsuario.js';
import { conexion } from './src/db/conexion.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1500;

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar motor de plantillas EJS con layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('layout', 'layout');
app.use(expressLayouts);

// Servir archivos estáticos
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use(rutas);
app.use(routeUsuario);

// Conexión a la base de datos
conexion();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
