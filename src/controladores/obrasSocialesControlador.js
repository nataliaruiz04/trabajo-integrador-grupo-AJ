import ObrasSocialesServicio from '../servicios/obrasSocialesServicio.js';

export default class ObrasSocialesControlador {

    constructor() {
        this.servicio = new ObrasSocialesServicio();
    }

    // Browse - GET /api/v1/obras-sociales
    buscarTodas = async (req, res) => {
        try {
            const obrasSociales = await this.servicio.buscarTodas();
            res.status(200).json({
                estado: true,
                datos: obrasSociales
            });
        } catch (error) {
            console.error(`Error en GET /obras-sociales: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Read - GET /api/v1/obras-sociales/:id
    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            const obraSocial = await this.servicio.buscarPorId(id);

            if (!obraSocial) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró la obra social con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                datos: obraSocial
            });
        } catch (error) {
            console.error(`Error en GET /obras-sociales/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Add - POST /api/v1/obras-sociales
    crear = async (req, res) => {
        try {
            const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "nombre" es requerido y debe ser texto no vacío'
                });
            }

            if (!descripcion || typeof descripcion !== 'string' || descripcion.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "descripcion" es requerido y debe ser texto no vacío'
                });
            }

            if (porcentaje_descuento === undefined || isNaN(porcentaje_descuento) || Number(porcentaje_descuento) < 0 || Number(porcentaje_descuento) > 100) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "porcentaje_descuento" es requerido y debe ser un número entre 0 y 100'
                });
            }

            if (es_particular === undefined || (es_particular !== 0 && es_particular !== 1)) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "es_particular" es requerido y debe ser 0 o 1'
                });
            }

            const id = await this.servicio.crear({
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                porcentaje_descuento: Number(porcentaje_descuento),
                es_particular: Number(es_particular)
            });

            res.status(201).json({
                estado: true,
                mensaje: 'Obra social creada correctamente',
                datos: { id_obra_social: id, nombre: nombre.trim() }
            });
        } catch (error) {
            console.error(`Error en POST /obras-sociales: ${error.message}`);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe una obra social con ese nombre'
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Edit - PUT /api/v1/obras-sociales/:id
    modificar = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, porcentaje_descuento, es_particular } = req.body;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "nombre" es requerido y debe ser texto no vacío'
                });
            }

            if (!descripcion || typeof descripcion !== 'string' || descripcion.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "descripcion" es requerido y debe ser texto no vacío'
                });
            }

            if (porcentaje_descuento === undefined || isNaN(porcentaje_descuento) || Number(porcentaje_descuento) < 0 || Number(porcentaje_descuento) > 100) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "porcentaje_descuento" es requerido y debe ser un número entre 0 y 100'
                });
            }

            if (es_particular === undefined || (es_particular !== 0 && es_particular !== 1)) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "es_particular" es requerido y debe ser 0 o 1'
                });
            }

            const filasAfectadas = await this.servicio.modificar(id, {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                porcentaje_descuento: Number(porcentaje_descuento),
                es_particular: Number(es_particular)
            });

            if (filasAfectadas === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró la obra social con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Obra social modificada correctamente',
                datos: { id_obra_social: Number(id), nombre: nombre.trim() }
            });
        } catch (error) {
            console.error(`Error en PUT /obras-sociales/:id: ${error.message}`);

            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    estado: false,
                    mensaje: 'Ya existe una obra social con ese nombre'
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Delete - DELETE /api/v1/obras-sociales/:id (soft delete)
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
                    mensaje: `No se encontró la obra social con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Obra social eliminada correctamente'
            });
        } catch (error) {
            console.error(`Error en DELETE /obras-sociales/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }
}
