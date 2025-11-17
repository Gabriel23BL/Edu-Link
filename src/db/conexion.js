import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const conexion = async () => {
    try {
        const db = await open({
            filename: './src/db/eduLink.db',
            driver: sqlite3.Database
        });
        console.log('Conexión a la base de datos establecida');
        return db; 
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error; 
    }
};

export default conexion;