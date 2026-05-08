import express from 'express';
import { testConexion } from './db/testConexion.js';
import { router as v1EspecialidadesRutas } from './rutas/v1/especialidadesRutas.js';
import { router as v1ObrasSocialesRutas } from './rutas/v1/obrasSocialesRutas.js';

// Variables de entorno
process.loadEnvFile();

const app = express();

const PUERTO = process.env.PUERTO || 3000;

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

// Ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({
        estado: false,
        mensaje: `Ruta ${req.method} ${req.path} no encontrada`
    });
});

app.listen(PUERTO, () => {
    console.log(`Servidor iniciado correctamente en puerto ${PUERTO}`);
});