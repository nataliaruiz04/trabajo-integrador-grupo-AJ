import Pacientes from '../db/pacientes.js';

export default class PacientesServicio {

    constructor() {
        this.pacientes = new Pacientes();
    }

    buscarTodos = () => {
        return this.pacientes.buscarTodos();
    }

    buscarPorId = (id) => {
        return this.pacientes.buscarPorId(id);
    }

    crear = (datos) => {
        return this.pacientes.crear(datos);
    }

    modificar = (id, datos) => {
        return this.pacientes.modificar(id, datos);
    }

    borrar = (id) => {
        return this.pacientes.borrar(id);
    }
}
