import express from 'express';
import TurnosReservasControlador from '../../controladores/turnosReservasControlador.js';
import TransformarDTO from '../../middlewares/transformarDTOs.js';

const router = express.Router();
const turnosReservasControlador = new TurnosReservasControlador();
const transformarDTO = new TransformarDTO();

// Browse - listar turnos del usuario logueado
router.get('/', turnosReservasControlador.buscarTodos);

// Add - crear turno
router.post('/', (req, res, next) => {
    console.log('Llegó al POST de turnos-reservas');
    console.log('Body:', req.body);
    console.log('DTO:', req.dto);
    next();
}, transformarDTO.turnosReservasCrearDTO, turnosReservasControlador.crear);
//router.post('/', transformarDTO.turnosReservasCrearDTO, turnosReservasControlador.crear);

// Marcar atendido
router.patch('/:id/atendido', turnosReservasControlador.marcarAtendido);

export { router };