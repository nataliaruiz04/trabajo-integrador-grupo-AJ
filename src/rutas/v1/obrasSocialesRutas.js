import express from 'express';
import ObrasSocialesControlador from '../../controladores/obrasSocialesControlador.js';

const router = express.Router();
const obrasSocialesControlador = new ObrasSocialesControlador();

// Browse - listar todas
router.get('/', obrasSocialesControlador.buscarTodas);

// Read - obtener por id
router.get('/:id', obrasSocialesControlador.buscarPorId);

// Add - crear nueva
router.post('/', obrasSocialesControlador.crear);

// Edit - modificar existente
router.put('/:id', obrasSocialesControlador.modificar);

// Delete - baja lógica
router.delete('/:id', obrasSocialesControlador.borrar);

export { router };
