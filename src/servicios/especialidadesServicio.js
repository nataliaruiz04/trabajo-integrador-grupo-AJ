import Especialidades from '../db/especialidades.js';

export default class EspecialidadesServicio {

    constructor() {
        this.especialidades = new Especialidades();
    }

    buscarTodas = () => {
        return this.especialidades.buscarTodas();
    }

    buscarPorId = (id) => {
        return this.especialidades.buscarPorId(id);
    }

    crear = (nombre) => {
        return this.especialidades.crear(nombre);
    }

    modificar = (id, nombre) => {
        return this.especialidades.modificar(id, nombre);
    }

    borrar = (id) => {
        return this.especialidades.borrar(id);
    }
}
