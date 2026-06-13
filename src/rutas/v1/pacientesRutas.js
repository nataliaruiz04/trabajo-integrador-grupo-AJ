import express from 'express';
import PacientesControlador from '../../controladores/pacientesControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const pacientesControlador = new PacientesControlador();

// Browse y Read - solo administrador
router.get('/', autorizarUsuarios([3]), pacientesControlador.buscarTodos);
router.get('/:id', autorizarUsuarios([3]), pacientesControlador.buscarPorId);

// Add, Edit, Delete - solo administrador
router.post('/', autorizarUsuarios([3]), pacientesControlador.crear);
router.put('/:id', autorizarUsuarios([3]), pacientesControlador.modificar);
router.delete('/:id', autorizarUsuarios([3]), pacientesControlador.borrar);

export { router };