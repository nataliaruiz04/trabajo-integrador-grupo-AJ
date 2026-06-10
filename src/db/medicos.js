import { pool } from './conexion.js';

export default class Medicos {

    buscarTodos = async () => {
        const sql = `
            SELECT m.id_medico, m.id_usuario, u.apellido, u.nombres, u.email, u.foto_path,
                   m.id_especialidad, e.nombre AS especialidad, m.matricula, m.descripcion, m.valor_consulta
            FROM medicos m
            JOIN usuarios u ON m.id_usuario = u.id_usuario
            JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE u.activo = 1
        `;
        const [medicos] = await pool.query(sql);
        return medicos;
    }

    buscarPorId = async (id) => {
        const sql = `
            SELECT m.id_medico, m.id_usuario, u.apellido, u.nombres, u.email, u.foto_path,
                   m.id_especialidad, e.nombre AS especialidad, m.matricula, m.descripcion, m.valor_consulta
            FROM medicos m
            JOIN usuarios u ON m.id_usuario = u.id_usuario
            JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE m.id_medico = ? AND u.activo = 1
        `;
        const [medicos] = await pool.query(sql, [id]);
        return medicos[0] || null;
    }

    buscarPorEspecialidad = async (id_especialidad) => {
        const sql = `
            SELECT m.id_medico, m.id_usuario, u.apellido, u.nombres, u.email, u.foto_path,
                   m.id_especialidad, e.nombre AS especialidad, m.matricula, m.descripcion, m.valor_consulta
            FROM medicos m
            JOIN usuarios u ON m.id_usuario = u.id_usuario
            JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE m.id_especialidad = ? AND u.activo = 1
        `;
        const [medicos] = await pool.query(sql, [id_especialidad]);
        return medicos;
    }

    crear = async ({ id_usuario, id_especialidad, matricula, descripcion, valor_consulta }) => {
        const sql = `
            INSERT INTO medicos (id_usuario, id_especialidad, matricula, descripcion, valor_consulta)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [resultado] = await pool.query(sql, [id_usuario, id_especialidad, matricula, descripcion || '', valor_consulta]);
        return resultado.insertId;
    }

    modificar = async (id, { id_especialidad, matricula, descripcion, valor_consulta }) => {
        const sql = `
            UPDATE medicos
            SET id_especialidad = ?, matricula = ?, descripcion = ?, valor_consulta = ?
            WHERE id_medico = ?
        `;
        const [resultado] = await pool.query(sql, [id_especialidad, matricula, descripcion || '', valor_consulta, id]);
        return resultado.affectedRows;
    }

    borrar = async (id) => {
        // Soft delete a través del usuario asociado
        const sql = `
            UPDATE usuarios u
            JOIN medicos m ON u.id_usuario = m.id_usuario
            SET u.activo = 0
            WHERE m.id_medico = ?
        `;
        const [resultado] = await pool.query(sql, [id]);
        return resultado.affectedRows;
    }
}
