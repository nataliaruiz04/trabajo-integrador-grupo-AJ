# API REST - Sistema de Gestión de Turnos Médicos
**Programación III – 2026 | Primera Entrega**

**Integrantes**
- Marcela Carina Machuca
- Abril de los Angeles Quiroga
- Natalia Noemi Ruiz
- Leandro Vallejos
- Camila Abigail Wagner



## Tecnologías
- Node.js
- Express
- MySQL

## Instalación

```bash
npm install
```

## Variables de entorno

Crear archivo `.env`:

```env
PUERTO=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=prog3_turnos
```

## Ejecutar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

## Endpoints implementados

### Especialidades
- GET /api/v1/especialidades
- GET /api/v1/especialidades/:id
- POST /api/v1/especialidades
- PUT /api/v1/especialidades/:id
- DELETE /api/v1/especialidades/:id

### Obras sociales
- GET /api/v1/obras-sociales
- GET /api/v1/obras-sociales/:id
- POST /api/v1/obras-sociales
- PUT /api/v1/obras-sociales/:id
- DELETE /api/v1/obras-sociales/:id
