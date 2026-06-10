import MedicosServicio from '../servicios/medicosServicio.js';

export default class MedicosControlador {

    constructor() {
        this.servicio = new MedicosServicio();
    }

    // Browse - GET /api/v1/medicos
    // Browse por especialidad - GET /api/v1/medicos?especialidad=1
    buscarTodos = async (req, res) => {
        try {
            const { especialidad } = req.query;

            let medicos;

            if (especialidad) {
                if (isNaN(especialidad) || Number(especialidad) <= 0) {
                    return res.status(400).json({
                        estado: false,
                        mensaje: 'El parámetro "especialidad" debe ser un número entero positivo'
                    });
                }
                medicos = await this.servicio.buscarPorEspecialidad(especialidad);
            } else {
                medicos = await this.servicio.buscarTodos();
            }

            res.status(200).json({
                estado: true,
                datos: medicos
            });
        } catch (error) {
            console.error(`Error en GET /medicos: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Read - GET /api/v1/medicos/:id
    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            const medico = await this.servicio.buscarPorId(id);

            if (!medico) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el médico con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                datos: medico
            });
        } catch (error) {
            console.error(`Error en GET /medicos/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Add - POST /api/v1/medicos
    crear = async (req, res) => {
        try {
            const { id_usuario, id_especialidad, matricula, descripcion, valor_consulta } = req.body;

            if (!id_usuario || isNaN(id_usuario) || Number(id_usuario) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "id_usuario" es requerido y debe ser un número entero positivo'
                });
            }

            if (!id_especialidad || isNaN(id_especialidad) || Number(id_especialidad) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "id_especialidad" es requerido y debe ser un número entero positivo'
                });
            }

            if (!matricula || isNaN(matricula) || Number(matricula) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "matricula" es requerido y debe ser un número entero positivo'
                });
            }

            if (valor_consulta === undefined || isNaN(valor_consulta) || Number(valor_consulta) < 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "valor_consulta" es requerido y debe ser un número mayor o igual a 0'
                });
            }

            const id = await this.servicio.crear({
                id_usuario: Number(id_usuario),
                id_especialidad: Number(id_especialidad),
                matricula: Number(matricula),
                descripcion: descripcion || '',
                valor_consulta: Number(valor_consulta)
            });

            res.status(201).json({
                estado: true,
                mensaje: 'Médico creado correctamente',
                datos: { id_medico: id }
            });
        } catch (error) {
            console.error(`Error en POST /medicos: ${error.message}`);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe un médico con esa matrícula'
                });
            }

            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El usuario o la especialidad indicada no existe'
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Edit - PUT /api/v1/medicos/:id
    modificar = async (req, res) => {
        try {
            const { id } = req.params;
            const { id_especialidad, matricula, descripcion, valor_consulta } = req.body;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            if (!id_especialidad || isNaN(id_especialidad) || Number(id_especialidad) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "id_especialidad" es requerido y debe ser un número entero positivo'
                });
            }

            if (!matricula || isNaN(matricula) || Number(matricula) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "matricula" es requerido y debe ser un número entero positivo'
                });
            }

            if (valor_consulta === undefined || isNaN(valor_consulta) || Number(valor_consulta) < 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "valor_consulta" es requerido y debe ser un número mayor o igual a 0'
                });
            }

            const filasAfectadas = await this.servicio.modificar(id, {
                id_especialidad: Number(id_especialidad),
                matricula: Number(matricula),
                descripcion: descripcion || '',
                valor_consulta: Number(valor_consulta)
            });

            if (filasAfectadas === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el médico con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Médico modificado correctamente',
                datos: { id_medico: Number(id) }
            });
        } catch (error) {
            console.error(`Error en PUT /medicos/:id: ${error.message}`);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe un médico con esa matrícula'
                });
            }

            if (error.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'La especialidad indicada no existe'
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Delete - DELETE /api/v1/medicos/:id (soft delete via usuario)
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
                    mensaje: `No se encontró el médico con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Médico eliminado correctamente'
            });
        } catch (error) {
            console.error(`Error en DELETE /medicos/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }
}
