import Usuarios from '../db/usuarios.js';

export default class UsuariosServicio {

    constructor() {
        this.usuarios = new Usuarios();
    }

    buscarTodos = () => {
        return this.usuarios.buscarTodos();
    }

    buscarPorId = (id_usuario) => {
        return this.usuarios.buscarPorId(id_usuario);
    }

    buscar = (email, contrasenia) => {
        return this.usuarios.buscar(email, contrasenia);
    }

    crear = (datos) => {
        return this.usuarios.crear(datos);
    }

    modificar = async (id_usuario, datos) => {
        const existe = await this.usuarios.buscarPorId(id_usuario);
        if (!existe) {
            return null;
        }
        return this.usuarios.modificar(id_usuario, datos);
    }

    borrar = (id) => {
        return this.usuarios.borrar(id);
    }
}