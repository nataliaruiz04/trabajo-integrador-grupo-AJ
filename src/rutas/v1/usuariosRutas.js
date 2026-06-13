import express from 'express';
import UsuariosControlador from '../../controladores/usuariosControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();
const usuariosControlador = new UsuariosControlador();

// Browse y Read - solo administrador
router.get('/', autorizarUsuarios([3]), usuariosControlador.buscarTodos);
router.get('/:id', autorizarUsuarios([3]), usuariosControlador.buscarPorId);

// Add, Edit, Delete - solo administrador
router.post('/', autorizarUsuarios([3]), usuariosControlador.crear);
router.put('/:id', autorizarUsuarios([3]), usuariosControlador.modificar);
router.delete('/:id', autorizarUsuarios([3]), usuariosControlador.borrar);

export { router };