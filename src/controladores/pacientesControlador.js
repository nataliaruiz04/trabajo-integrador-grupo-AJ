import PacientesServicio from '../servicios/pacientesServicio.js';

export default class PacientesControlador {

    constructor() {
        this.servicio = new PacientesServicio();
    }

    // Browse - GET /api/v1/pacientes
    buscarTodos = async (req, res) => {
        try {
            const pacientes = await this.servicio.buscarTodos();
            res.status(200).json({
                estado: true,
                datos: pacientes
            });
        } catch (error) {
            console.error(`Error en GET /pacientes: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Read - GET /api/v1/pacientes/:id
    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            const paciente = await this.servicio.buscarPorId(id);

            if (!paciente) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el paciente con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                datos: paciente
            });
        } catch (error) {
            console.error(`Error en GET /pacientes/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Add - POST /api/v1/pacientes
    crear = async (req, res) => {
        try {
            const { id_usuario, id_obra_social } = req.body;

            if (!id_usuario || isNaN(id_usuario) || Number(id_usuario) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "id_usuario" es requerido y debe ser un número entero positivo'
                });
            }

            if (!id_obra_social || isNaN(id_obra_social) || Number(id_obra_social) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "id_obra_social" es requerido y debe ser un número entero positivo'
                });
            }

            const id = await this.servicio.crear({
                id_usuario: Number(id_usuario),
                id_obra_social: Number(id_obra_social)
            });

            res.status(201).json({
                estado: true,
                mensaje: 'Paciente creado correctamente',
                datos: { id_paciente: id }
            });
        } catch (error) {
            console.error(`Error en POST /pacientes: ${error.message}`);

            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El usuario o la obra social indicada no existe'
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Edit - PUT /api/v1/pacientes/:id
    modificar = async (req, res) => {
        try {
            const { id } = req.params;
            const { id_obra_social } = req.body;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            if (!id_obra_social || isNaN(id_obra_social) || Number(id_obra_social) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "id_obra_social" es requerido y debe ser un número entero positivo'
                });
            }

            const filasAfectadas = await this.servicio.modificar(id, {
                id_obra_social: Number(id_obra_social)
            });

            if (filasAfectadas === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el paciente con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Paciente modificado correctamente'
            });
        } catch (error) {
            console.error(`Error en PUT /pacientes/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Delete - DELETE /api/v1/pacientes/:id (soft delete)
    borrar = async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            const filasAfectadas = await this.servicio.borrar(id);

            if (filasAfectadas === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el paciente con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Paciente eliminado correctamente'
            });
        } catch (error) {
            console.error(`Error en DELETE /pacientes/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }
}