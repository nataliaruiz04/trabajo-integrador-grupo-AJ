import express from 'express';
import { testConexion } from './db/testConexion.js';
import { router as v1EspecialidadesRutas } from './rutas/v1/especialidadesRutas.js';
import { router as v1ObrasSocialesRutas } from './rutas/v1/obrasSocialesRutas.js';
import { router as v1UsuariosRutas } from './rutas/v1/usuariosRutas.js';
import { router as v1MedicosRutas } from './rutas/v1/medicosRutas.js';

const app = express();

// Middlewares globales
app.use(express.json());

// Verificar conexión a la base de datos al iniciar
await testConexion();

// Ruta de salud
app.get('/', (req, res) => {
    res.status(200).json({ estado: true, mensaje: 'API Turnos OK' });
});

// Rutas v1
app.use('/api/v1/especialidades', v1EspecialidadesRutas);
app.use('/api/v1/obras-sociales', v1ObrasSocialesRutas);
app.use('/api/v1/usuarios', v1UsuariosRutas);
app.use('/api/v1/medicos', v1MedicosRutas);

// Ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({
        estado: false,
        mensaje: `Ruta ${req.method} ${req.path} no encontrada`
    });
});

// Variables de entorno
process.loadEnvFile();
const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor iniciado correctamente en puerto ${PUERTO}`);
});
