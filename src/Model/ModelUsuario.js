import { conexion } from '../db/conexion.js';

export class ModelUsuario {
    static async crearUsuario(nombre, email, password) {
        const query = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
        try {
            const conexion = conexion();
            await conexion.execute(query, [nombre, email, password]);
            return true;
        } catch (error) {
            console.error('Error al crear usuario:', error);
            return false;
        }
    }
}