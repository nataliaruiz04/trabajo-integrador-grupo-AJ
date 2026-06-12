import TurnosReservasServicio from '../servicios/turnosReservasServicio.js';

export default class TurnosReservasControlador {

    constructor() {
        this.servicio = new TurnosReservasServicio();
    }

    // Add - POST /api/v1/turnos-reservas
    crear = async (req, res) => {
        try {
            const turnoReserva = req.dto;

            const id_nuevo = await this.servicio.crear(turnoReserva);

            if (!id_nuevo) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'No se pudo crear el turno. Verificá que el médico y el paciente existan.'
                });
            }

            return res.status(201).json({
                estado: true,
                mensaje: 'Turno creado correctamente.',
                datos: { id_turno_reserva: id_nuevo }
            });

        } catch (error) {
            console.error(`Error en POST /turnos-reservas:`, error);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Browse - GET /api/v1/turnos-reservas
    buscarTodos = async (req, res) => {
        try {
            const turnos = await this.servicio.buscarTodos(req.user);

            res.status(200).json({
                estado: true,
                datos: turnos
            });

        } catch (error) {
            console.error(`Error en GET /turnos-reservas: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }

    // Marcar atendido - PATCH /api/v1/turnos-reservas/:id/atendido
    marcarAtendido = async (req, res) => {
        try {
            const { id } = req.params;

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    estado: false,
                    mensaje: 'El id debe ser un número entero positivo'
                });
            }

            const filasAfectadas = await this.servicio.marcarAtendido(id);

            if (filasAfectadas === 0) {
                return res.status(404).json({
                    estado: false,
                    mensaje: `No se encontró el turno con id ${id}`
                });
            }

            res.status(200).json({
                estado: true,
                mensaje: 'Turno marcado como atendido correctamente'
            });

        } catch (error) {
            console.error(`Error en PATCH /turnos-reservas/:id/atendido: ${error.message}`);
            res.status(500).json({
                estado: false,
                mensaje: 'Error interno del servidor'
            });
        }
    }
}
