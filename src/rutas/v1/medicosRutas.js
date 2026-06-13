import express from 'express';
import MedicosControlador from '../../controladores/medicosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const medicosControlador = new MedicosControlador();

// Browse - todos pueden listar médicos (ruta pública)
router.get('/', medicosControlador.buscarTodos);

// Read - todos pueden ver un médico
router.get('/:id', medicosControlador.buscarPorId);

// Add, Edit, Delete - solo administrador
router.post('/', autorizarUsuarios([3]), medicosControlador.crear);
router.put('/:id', autorizarUsuarios([3]), medicosControlador.modificar);
router.delete('/:id', autorizarUsuarios([3]), medicosControlador.borrar);

export { router };