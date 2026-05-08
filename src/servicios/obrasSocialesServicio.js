import ObrasSociales from '../db/obrasSociales.js';

export default class ObrasSocialesServicio {

    constructor() {
        this.obrasSociales = new ObrasSociales();
    }

    buscarTodas = () => {
        return this.obrasSociales.buscarTodas();
    }

    buscarPorId = (id) => {
        return this.obrasSociales.buscarPorId(id);
    }

    crear = (datos) => {
        return this.obrasSociales.crear(datos);
    }

    modificar = (id, datos) => {
        return this.obrasSociales.modificar(id, datos);
    }

    borrar = (id) => {
        return this.obrasSociales.borrar(id);
    }
}
