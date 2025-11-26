import express from 'express';
import session from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Importar routers
import rutas from './src/router/route.js';
import rutasUsuario from './src/router/routeUsuario.js';
import routerAuth from './src/router/routeAuth.js';


// rutas usuarios
import rutasEstudiante from './src/router/routeEstudiante.js';
//import rutasDocente from './src/router/routeDocente.js';
//import rutasAdmin from './src/router/routeAdmin.js'

// Importar conexión DB
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

// 🔑 Middleware de sesiones (debe ir antes de las rutas)
app.use(session({
  secret: 'clave-secreta-super-segura', // cámbiala por algo más robusto
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // en producción con HTTPS ponlo en true
}));

// 🔑 Middleware global para variables en las vistas
app.use((req, res, next) => {
  res.locals.user = req.session?.user || null; // usuario en sesión si existe
  next();
});

// Rutas
app.use('/', rutas);                // rutas generales
app.use('/usuario', rutasUsuario);  // rutas de usuario
app.use('/auth', routerAuth);       // rutas de autenticación
app.use('/estudiante', rutasEstudiante); // rutas de estudiante
app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));

//app.use('/docente', rutasDocente);
//app.use('/admin', rutasAdmin);

// Conexión a la base de datos
conexion();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
