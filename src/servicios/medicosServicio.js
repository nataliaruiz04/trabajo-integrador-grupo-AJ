import Medicos from '../db/medicos.js';

export default class MedicosServicio {

    constructor() {
        this.medicos = new Medicos();
    }

    buscarTodos = () => {
        return this.medicos.buscarTodos();
    }

    buscarPorId = (id) => {
        return this.medicos.buscarPorId(id);
    }

    buscarPorEspecialidad = (id_especialidad) => {
        return this.medicos.buscarPorEspecialidad(id_especialidad);
    }

    crear = (datos) => {
        return this.medicos.crear(datos);
    }

    modificar = (id, datos) => {
        return this.medicos.modificar(id, datos);
    }

    borrar = (id) => {
        return this.medicos.borrar(id);
    }
}
