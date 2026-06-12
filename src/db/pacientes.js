import { pool } from './conexion.js';

export default class Pacientes {

    buscarTodos = async () => {
        const sql = `
            SELECT p.id_paciente, p.id_usuario, u.apellido, u.nombres, u.email, 
                   u.foto_path, p.id_obra_social, os.nombre AS obra_social
            FROM pacientes p
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social
            WHERE u.activo = 1
        `;
        const [pacientes] = await pool.query(sql);
        return pacientes;
    }

    buscarPorId = async (id_paciente) => {
        const sql = `
            SELECT p.id_paciente, p.id_usuario, u.apellido, u.nombres, u.email,
                   u.foto_path, p.id_obra_social, os.nombre AS obra_social
            FROM pacientes p
            JOIN usuarios u ON p.id_usuario = u.id_usuario
            JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social
            WHERE p.id_paciente = ? AND u.activo = 1
        `;
        const [pacientes] = await pool.query(sql, [id_paciente]);
        return pacientes[0] || null;
    }

    crear = async ({ id_usuario, id_obra_social }) => {
        const sql = `INSERT INTO pacientes (id_usuario, id_obra_social) VALUES (?, ?)`;
        const [resultado] = await pool.query(sql, [id_usuario, id_obra_social]);
        return resultado.insertId;
    }

    modificar = async (id, { id_obra_social }) => {
        const sql = `UPDATE pacientes SET id_obra_social = ? WHERE id_paciente = ?`;
        const [resultado] = await pool.query(sql, [id_obra_social, id]);
        return resultado.affectedRows;
    }

    borrar = async (id) => {
        const sql = `
            UPDATE usuarios u
            JOIN pacientes p ON u.id_usuario = p.id_usuario
            SET u.activo = 0
            WHERE p.id_paciente = ?
        `;
        const [resultado] = await pool.query(sql, [id]);
        return resultado.affectedRows;
    }
}