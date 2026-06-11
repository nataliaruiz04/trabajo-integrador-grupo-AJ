import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';

import { estrategia, validacion } from './config/passport.js';
import { testConexion } from './db/testConexion.js';

import { router as v1EspecialidadesRutas } from './rutas/v1/especialidadesRutas.js';
import { router as v1ObrasSocialesRutas } from './rutas/v1/obrasSocialesRutas.js';
import { router as v1UsuariosRutas } from './rutas/v1/usuariosRutas.js';
import { router as v1MedicosRutas } from './rutas/v1/medicosRutas.js';
import { router as v1AuthRutas } from './rutas/v1/authRutas.js';

process.loadEnvFile();

const app = express();
await testConexion();

app.use(cors());
app.use(express.json());

// Configuración Passport
passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

// Morgan - registro de accesos
let log = fs.createWriteStream('./accesos.log', { flags: 'a' });
app.use(morgan('dev'));
app.use(morgan('combined', { stream: log }));

// Ruta de salud
app.get('/', (req, res) => {
    res.status(200).json({ estado: true, mensaje: 'API Turnos OK' });
});

// Rutas públicas
app.use('/api/v1/auth', v1AuthRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/medicos', v1MedicosRutas);

// Rutas protegidas con JWT
app.use('/api/v1/especialidades', passport.authenticate('jwt', { session: false }), v1EspecialidadesRutas);
app.use('/api/v1/usuarios', passport.authenticate('jwt', { session: false }), v1UsuariosRutas);

// Ruta no encontrada
app.use((req, res) => {
    res.status(404).json({
        estado: false,
        mensaje: `Ruta ${req.method} ${req.path} no encontrada`
    });
});

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor iniciado correctamente en puerto ${PUERTO}`);
});