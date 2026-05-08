import EspecialidadesServicio from '../servicios/especialidadesServicio.js';

export default class EspecialidadesControlador {

    constructor() {
        this.servicio = new EspecialidadesServicio();
    }

    // Browse - GET /api/v1/especialidades
    buscarTodas = async (req, res) => {
        try {
            const especialidades = await this.servicio.buscarTodas();
            res.status(200).json({
                estado: true,
                datos: especialidades
            });
        } catch (error) {
            console.error(`Error en GET /especialidades: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Read - GET /api/v1/especialidades/:id
    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            const especialidad = await this.servicio.buscarPorId(id);

            if (!especialidad) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró la especialidad con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                datos: especialidad
            });
        } catch (error) {
            console.error(`Error en GET /especialidades/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Add - POST /api/v1/especialidades
    crear = async (req, res) => {
        try {
            const { nombre } = req.body;

            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "nombre" es requerido y debe ser un texto no vacío'
                });
            }

            const id = await this.servicio.crear(nombre.trim().toUpperCase());

            res.status(201).json({
                estado: true,
                mensaje: 'Especialidad creada correctamente',
                datos: { id_especialidad: id, nombre: nombre.trim().toUpperCase() }
            });
        } catch (error) {
            console.error(`Error en POST /especialidades: ${error.message}`);

            // Nombre duplicado (UNIQUE KEY)
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe una especialidad con ese nombre'
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Edit - PUT /api/v1/especialidades/:id
    modificar = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "nombre" es requerido y debe ser un texto no vacío'
                });
            }

            const filasAfectadas = await this.servicio.modificar(id, nombre.trim().toUpperCase());

            if (filasAfectadas === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró la especialidad con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Especialidad modificada correctamente',
                datos: { id_especialidad: Number(id), nombre: nombre.trim().toUpperCase() }
            });
        } catch (error) {
            console.error(`Error en PUT /especialidades/:id: ${error.message}`);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe una especialidad con ese nombre'
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Delete - DELETE /api/v1/especialidades/:id  (soft delete)
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
                    mensaje: `No se encontró la especialidad con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Especialidad eliminada correctamente'
            });
        } catch (error) {
            console.error(`Error en DELETE /especialidades/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }
}
