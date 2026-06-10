import Usuarios from '../db/usuarios.js';

export default class UsuariosServicio {

    constructor() {
        this.usuarios = new Usuarios();
    }

    buscarTodos = () => {
        return this.usuarios.buscarTodos();
    }

    buscarPorId = (id) => {
        return this.usuarios.buscarPorId(id);
    }

    crear = (datos) => {
        return this.usuarios.crear(datos);
    }

    modificar = (id, datos) => {
        return this.usuarios.modificar(id, datos);
    }

    borrar = (id) => {
        return this.usuarios.borrar(id);
    }
}
