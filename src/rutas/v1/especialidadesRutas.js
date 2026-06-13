import express from 'express';
import EspecialidadesControlador from '../../controladores/especialidadesControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const especialidadesControlador = new EspecialidadesControlador();

// Browse - todos los roles pueden listar
router.get('/', especialidadesControlador.buscarTodas);

// Read - todos los roles pueden ver
router.get('/:id', especialidadesControlador.buscarPorId);

// Add, Edit, Delete - solo administrador
router.post('/', autorizarUsuarios([3]), especialidadesControlador.crear);
router.put('/:id', autorizarUsuarios([3]), especialidadesControlador.modificar);
router.delete('/:id', autorizarUsuarios([3]), especialidadesControlador.borrar);

export { router };

