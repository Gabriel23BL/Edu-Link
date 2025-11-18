import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const conexion = async () => {
  try {
    const db = await open({
      filename: './src/db/eduLink.db',
      driver: sqlite3.Database
    });
    console.log(' Conexión a la base de datos establecida');

    // Crear tablas al iniciar conexión
    await db.exec(`
      CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL UNIQUE
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        correo TEXT NOT NULL UNIQUE,
        clave TEXT NOT NULL,
        id_usuario TEXT NOT NULL UNIQUE, -- cédula con prefijo V-/E-
        rol_id INTEGER NOT NULL,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (rol_id) REFERENCES roles(id)
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS sesiones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        token TEXT NOT NULL UNIQUE,
        creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
      );
    `);

    console.log(' Tablas verificadas/creadas correctamente');
    return db;
  } catch (error) {
    console.error(' Error al conectar o crear tablas:', error);
    throw error;
  }
};

export default conexion;
