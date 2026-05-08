import { pool } from './conexion.js';

export default class Especialidades {

    buscarTodas = async () => {
        const sql = 'SELECT * FROM especialidades WHERE activo = 1';
        const [especialidades] = await pool.query(sql);
        return especialidades;
    }

    buscarPorId = async (id) => {
        const sql = 'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1';
        const [especialidades] = await pool.query(sql, [id]);
        return especialidades[0] || null;
    }

    crear = async (nombre) => {
        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';
        const [resultado] = await pool.query(sql, [nombre]);
        return resultado.insertId;
    }

    modificar = async (id, nombre) => {
        const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ? AND activo = 1';
        const [resultado] = await pool.query(sql, [nombre, id]);
        return resultado.affectedRows;
    }

    borrar = async (id) => {
        const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ? AND activo = 1';
        const [resultado] = await pool.query(sql, [id]);
        return resultado.affectedRows;
    }
}
