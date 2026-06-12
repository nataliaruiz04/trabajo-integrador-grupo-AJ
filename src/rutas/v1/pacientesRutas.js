import express from 'express';
import PacientesControlador from '../../controladores/pacientesControlador.js';

const router = express.Router();
const pacientesControlador = new PacientesControlador();

// Browse - listar todos
router.get('/', pacientesControlador.buscarTodos);

// Read - obtener por id
router.get('/:id', pacientesControlador.buscarPorId);

// Add - crear nuevo
router.post('/', pacientesControlador.crear);

// Edit - modificar existente
router.put('/:id', pacientesControlador.modificar);

// Delete - baja lógica
router.delete('/:id', pacientesControlador.borrar);

export { router };