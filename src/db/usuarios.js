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

    buscarPorId = async (id_usuario) => {
        const sql = `SELECT * FROM usuarios WHERE id_usuario = ?`;
        const [usuario] = await pool.execute(sql, [id_usuario]);
        return usuario[0];
    }

    buscar = async (email, contrasenia) => {
        const sql = `
            SELECT u.id_usuario, CONCAT(u.nombres, ' ', u.apellido) as usuario, u.rol
            FROM usuarios AS u
            WHERE u.email = ?
                AND u.contrasenia = SHA2(?, 256)
                AND u.activo = 1
        `;
        const [result] = await pool.execute(sql, [email, contrasenia]);
        return result[0];
    }

    crear = async ({ documento, apellido, nombres, email, contrasenia, foto_path, rol }) => {
        const sql = `
            INSERT INTO usuarios (documento, apellido, nombres, email, contrasenia, foto_path, rol)
            VALUES (?, ?, ?, ?, SHA2(?, 256), ?, ?)
        `;
        const [resultado] = await pool.query(sql, [documento, apellido, nombres, email, contrasenia, foto_path || '', rol]);
        return resultado.insertId;
    }

    modificar = async (id_usuario, datos) => {
        const sql = `UPDATE usuarios SET ? WHERE id_usuario = ?`;
        const [result] = await pool.query(sql, [datos, id_usuario]);
        if (result.affectedRows === 0) {
            return false;
        }
        return true;
    }

    borrar = async (id) => {
        const sql = 'UPDATE usuarios SET activo = 0 WHERE id_usuario = ? AND activo = 1';
        const [resultado] = await pool.query(sql, [id]);
        return resultado.affectedRows;
    }
}