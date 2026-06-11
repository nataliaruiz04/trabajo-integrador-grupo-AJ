import express from 'express';
import AuthControlador from '../../controladores/authControlador.js';
import { check } from 'express-validator';
import { validarCampos } from '../../middlewares/validarCampos.js';

const router = express.Router();
const authControlador = new AuthControlador();

router.post('/login',
    [
        check('email')
            .notEmpty().withMessage('El correo electrónico es requerido.')
            .isEmail().withMessage('Revisar el formato del correo electrónico.'),
        check('contrasenia')
            .notEmpty().withMessage('La contraseña es requerida.'),
        validarCampos
    ],
    authControlador.login);

export { router };