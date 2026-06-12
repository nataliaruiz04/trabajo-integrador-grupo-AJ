import TurnosReservas from '../db/turnosReservas.js';
import MedicosServicio from './medicosServicio.js';
import PacientesServicio from './pacientesServicio.js';
import ObrasSocialesServicio from './obrasSocialesServicio.js';

export default class TurnosReservasServicio {

    constructor() {
        this.turnosReservas = new TurnosReservas();
        this.medicos = new MedicosServicio();
        this.pacientes = new PacientesServicio();
        this.obrasSociales = new ObrasSocialesServicio();
    }

    crear = async (turnoReserva) => {
        console.log('turnoReserva recibido:', turnoReserva);
        const medico = await this.medicos.buscarPorId(turnoReserva.id_medico);
        console.log('medico:', medico);

        if (!medico) {
            return null;
        }

        const paciente = await this.pacientes.buscarPorId(turnoReserva.id_paciente);
        console.log('paciente:', paciente);

        if (!paciente) {
            return null;
        }

        const obra_social = await this.obrasSociales.buscarPorId(paciente.id_obra_social);

        let valor = Number(medico.valor_consulta);

        if (obra_social.es_particular === 0) {
            valor = valor - (Number(obra_social.porcentaje_descuento) / 100 * valor);
        }

        turnoReserva.valor_total = valor;
        turnoReserva.id_obra_social = paciente.id_obra_social;

        const id_nuevo = await this.turnosReservas.crear(turnoReserva);
        return id_nuevo;
    }

    buscarTodos = async (usuario) => {
        if (usuario.rol === 1) {
            return this.turnosReservas.turnosDeUnMedico(usuario.id_usuario);
        } else {
            return this.turnosReservas.turnosDeUnPaciente(usuario.id_usuario);
        }
    }

    marcarAtendido = (id_turno_reserva) => {
        return this.turnosReservas.marcarAtendido(id_turno_reserva);
    }

    porEspecialidad = () => {
        return this.turnosReservas.porEspecialidad();
    }
}