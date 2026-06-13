import express from 'express';
import ObrasSocialesControlador from '../../controladores/obrasSocialesControlador.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';
import TransformarDTO from '../../middlewares/transformarDTOs.js';

const router = express.Router();
const obrasSocialesControlador = new ObrasSocialesControlador();
const transformarDTO = new TransformarDTO();

// Browse y Read - todos pueden ver (ruta pública)
router.get('/', obrasSocialesControlador.buscarTodas);
router.get('/:id', obrasSocialesControlador.buscarPorId);

// Add, Edit, Delete - solo administrador
router.post('/', autorizarUsuarios([3]), transformarDTO.obrasSocialesCrearDTO, obrasSocialesControlador.crear);
router.put('/:id', autorizarUsuarios([3]), transformarDTO.obrasSocialesActualizarDTO, obrasSocialesControlador.modificar);
router.delete('/:id', autorizarUsuarios([3]), obrasSocialesControlador.borrar);

export { router };