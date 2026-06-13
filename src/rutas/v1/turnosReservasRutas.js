import express from 'express';
import TurnosReservasControlador from '../../controladores/turnosReservasControlador.js';
import TransformarDTO from '../../middlewares/transformarDTOs.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const turnosReservasControlador = new TurnosReservasControlador();
const transformarDTO = new TransformarDTO();

// Browse - solo médico y paciente ven sus propios turnos
router.get('/', autorizarUsuarios([1, 2]), turnosReservasControlador.buscarTodos);

// Add - solo paciente y administrador pueden crear turnos
router.post('/', autorizarUsuarios([2, 3]), transformarDTO.turnosReservasCrearDTO, turnosReservasControlador.crear);

// Marcar atendido - solo médico
router.patch('/:id/atendido', autorizarUsuarios([1]), turnosReservasControlador.marcarAtendido);

export { router };