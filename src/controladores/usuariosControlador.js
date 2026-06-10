import UsuariosServicio from '../servicios/usuariosServicio.js';

// Roles válidos según la base de datos
// 1 = Médico, 2 = Paciente, 3 = Administrador
const ROLES_VALIDOS = [1, 2, 3];

export default class UsuariosControlador {

    constructor() {
        this.servicio = new UsuariosServicio();
    }

    // Browse - GET /api/v1/usuarios
    buscarTodos = async (req, res) => {
        try {
            const usuarios = await this.servicio.buscarTodos();
            res.status(200).json({
                estado: true,
                datos: usuarios
            });
        } catch (error) {
            console.error(`Error en GET /usuarios: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Read - GET /api/v1/usuarios/:id
    buscarPorId = async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            const usuario = await this.servicio.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el usuario con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                datos: usuario
            });
        } catch (error) {
            console.error(`Error en GET /usuarios/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Add - POST /api/v1/usuarios
    crear = async (req, res) => {
        try {
            const { documento, apellido, nombres, email, contrasenia, foto_path, rol } = req.body;

            if (!documento || typeof documento !== 'string' || documento.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "documento" es requerido'
                });
            }

            if (!apellido || typeof apellido !== 'string' || apellido.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "apellido" es requerido'
                });
            }

            if (!nombres || typeof nombres !== 'string' || nombres.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "nombres" es requerido'
                });
            }

            if (!email || typeof email !== 'string' || !email.includes('@')) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "email" es requerido y debe ser un email válido'
                });
            }

            if (!contrasenia || typeof contrasenia !== 'string' || contrasenia.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "contrasenia" es requerido'
                });
            }

            if (!rol || !ROLES_VALIDOS.includes(Number(rol))) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "rol" es requerido y debe ser 1 (Médico), 2 (Paciente) o 3 (Administrador)'
                });
            }

            const id = await this.servicio.crear({
                documento: documento.trim(),
                apellido: apellido.trim(),
                nombres: nombres.trim(),
                email: email.trim().toLowerCase(),
                contrasenia,
                foto_path: foto_path || '',
                rol: Number(rol)
            });

            res.status(201).json({
                estado: true,
                mensaje: 'Usuario creado correctamente',
                datos: { id_usuario: id, apellido: apellido.trim(), nombres: nombres.trim(), email: email.trim().toLowerCase(), rol: Number(rol) }
            });
        } catch (error) {
            console.error(`Error en POST /usuarios: ${error.message}`);

            if (error.code === 'ER_DUP_ENTRY') {
                const campo = error.message.includes('documento') ? 'documento' : 'email';
                return res.status(409).json({
                    estado: false,
                    mensaje: `Ya existe un usuario con ese ${campo}`
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Edit - PUT /api/v1/usuarios/:id
    modificar = async (req, res) => {
        try {
            const { id } = req.params;
            const { documento, apellido, nombres, email, foto_path, rol } = req.body;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            if (!documento || typeof documento !== 'string' || documento.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "documento" es requerido'
                });
            }

            if (!apellido || typeof apellido !== 'string' || apellido.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "apellido" es requerido'
                });
            }

            if (!nombres || typeof nombres !== 'string' || nombres.trim() === '') {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "nombres" es requerido'
                });
            }

            if (!email || typeof email !== 'string' || !email.includes('@')) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "email" es requerido y debe ser un email válido'
                });
            }

            if (!rol || !ROLES_VALIDOS.includes(Number(rol))) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El campo "rol" es requerido y debe ser 1 (Médico), 2 (Paciente) o 3 (Administrador)'
                });
            }

            const filasAfectadas = await this.servicio.modificar(id, {
                documento: documento.trim(),
                apellido: apellido.trim(),
                nombres: nombres.trim(),
                email: email.trim().toLowerCase(),
                foto_path: foto_path || '',
                rol: Number(rol)
            });

            if (filasAfectadas === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el usuario con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Usuario modificado correctamente',
                datos: { id_usuario: Number(id), apellido: apellido.trim(), nombres: nombres.trim(), email: email.trim().toLowerCase(), rol: Number(rol) }
            });
        } catch (error) {
            console.error(`Error en PUT /usuarios/:id: ${error.message}`);

            if (error.code === 'ER_DUP_ENTRY') {
                const campo = error.message.includes('documento') ? 'documento' : 'email';
                return res.status(409).json({
                    estado: false,
                    mensaje: `Ya existe un usuario con ese ${campo}`
                });
            }

            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Delete - DELETE /api/v1/usuarios/:id (soft delete)
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
                    mensaje: `No se encontró el usuario con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Usuario eliminado correctamente'
            });
        } catch (error) {
            console.error(`Error en DELETE /usuarios/:id: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }
}
