# Edu-Link
Proyecto de Sistemas de Informacion III. Enfocado en un Sistema de Servicios y Tramites Estudiantiles

MVC:
EduLink/

├── public/                  # Archivos estáticos accesibles desde el navegador

│   ├── css/                 # Estilos con Tailwind CSS

│   ├── js/                  # Scripts JS del lado cliente

│   └── img/                 # Imágenes públicas (logos, íconos, etc.)

│

├── src/                     # Código fuente principal

│   ├── views/               # Vistas EJS renderizadas por el servidor

│   │   ├── partials/        # Fragmentos reutilizables (header, footer, etc.)

│   │   └── pages/           # Vistas completas (dashboard, login, etc.)

│   │
│   ├── Controllers/         # Lógica de control (manejo de rutas y acciones)

│   ├── Model/               # Modelos de datos y consultas a SQLite

│   ├── router/              # Rutas agrupadas por entidad (estudiantes, trámites, etc.)

│   └── db/                  # Conexión y archivo de base de datos SQLite

│       └── edulink.sqlite   # Archivo de base de datos

│       └── db.js            # Configuración de conexión

│
├── server.js                # Punto de entrada del servidor Express

├── package.json             # Dependencias y scripts del proyecto

├── package-lock.json        # Control de versiones exactas de dependencias

└── README.md                # Documentación del proyecto (opcional pero recomendado)

