import express from 'express';
import EspecialidadesControlador from '../../controladores/especialidadesControlador.js';

const router = express.Router();
const especialidadesControlador = new EspecialidadesControlador();

// Browse - listar todas
router.get('/', especialidadesControlador.buscarTodas);

// Read - obtener por id
router.get('/:id', especialidadesControlador.buscarPorId);

// Add - crear nueva
router.post('/', especialidadesControlador.crear);

// Edit - modificar existente
router.put('/:id', especialidadesControlador.modificar);

// Delete - baja lógica
router.delete('/:id', especialidadesControlador.borrar);

export { router };
