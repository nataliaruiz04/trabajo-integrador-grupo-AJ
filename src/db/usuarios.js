import { pool } from './conexion.js';

export default class Usuarios {

    buscarTodos = async () => {
        const sql = `
            SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo
            FROM usuarios
            WHERE activo = 1
        `;
        const [usuarios] = await pool.query(sql);
        return usuarios;
    }

    buscarPorId = async (id) => {
        const sql = `
            SELECT id_usuario, documento, apellido, nombres, email, foto_path, rol, activo
            FROM usuarios
            WHERE id_usuario = ? AND activo = 1
        `;
        const [usuarios] = await pool.query(sql, [id]);
        return usuarios[0] || null;
    }

    crear = async ({ documento, apellido, nombres, email, contrasenia, foto_path, rol }) => {
        const sql = `
            INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol)
            VALUES (?, ?, ?, ?, SHA2(?, 256), ?, ?)
        `;
        const [resultado] = await pool.query(sql, [documento, apellido, nombres, email, contrasenia, foto_path || '', rol]);
        return resultado.insertId;
    }

    modificar = async (id, { documento, apellido, nombres, email, foto_path, rol }) => {
        const sql = `
            UPDATE usuarios
            SET documento = ?, apellido = ?, nombres = ?, email = ?, foto_path = ?, rol = ?
            WHERE id_usuario = ? AND activo = 1
        `;
        const [resultado] = await pool.query(sql, [documento, apellido, nombres, email, foto_path || '', rol, id]);
        return resultado.affectedRows;
    }

    borrar = async (id) => {
        const sql = 'UPDATE usuarios SET activo = 0 WHERE id_usuario = ? AND activo = 1';
        const [resultado] = await pool.query(sql, [id]);
        return resultado.affectedRows;
    }
}
