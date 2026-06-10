import express from 'express';
import UsuariosControlador from '../../controladores/usuariosControlador.js';

const router = express.Router();
const usuariosControlador = new UsuariosControlador();

// Browse - listar todos
router.get('/', usuariosControlador.buscarTodos);

// Read - obtener por id
router.get('/:id', usuariosControlador.buscarPorId);

// Add - crear nuevo
router.post('/', usuariosControlador.crear);

// Edit - modificar existente
router.put('/:id', usuariosControlador.modificar);

// Delete - baja lógica
router.delete('/:id', usuariosControlador.borrar);

export { router };