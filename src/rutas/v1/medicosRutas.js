import express from 'express';
import MedicosControlador from '../../controladores/medicosControlador.js';

const router = express.Router();
const medicosControlador = new MedicosControlador();

// Browse - listar todos (con filtro opcional por especialidad)
// GET /api/v1/medicos
// GET /api/v1/medicos?especialidad=1
router.get('/', medicosControlador.buscarTodos);

// Read - obtener por id
router.get('/:id', medicosControlador.buscarPorId);

// Add - crear nuevo
router.post('/', medicosControlador.crear);

// Edit - modificar existente
router.put('/:id', medicosControlador.modificar);

// Delete - baja lógica
router.delete('/:id', medicosControlador.borrar);

export { router };
