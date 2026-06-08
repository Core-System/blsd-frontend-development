import axios from "axios";

const BASE_URL = 'http://localhost:8080';

function anotarDataHoraISO(dia, mes, ano, hora) {
    const diaStr = String(dia).padStart(2, '0');
    const mesStr = String(mes + 1).padStart(2, '0');
    const [horas, minutos] = hora.split(':').map(Number);
    const horasUTC = horas + 3;
    const horasStr = String(horasUTC).padStart(2, '0');
    return `${ano}-${mesStr}-${diaStr}T${horasStr}:${String(minutos).padStart(2, '0')}:00Z`;
}

export async function criarAgendamento({ nome, email, dia, mes, ano, hora, procedimento }) {
    const dataHoraInicio = anotarDataHoraISO(dia, mes, ano, hora);
    const token = localStorage.getItem("token");

    const resposta = await axios.post(`${BASE_URL}/api/calendario/calcom/agendar`,
        {
            nome,
            email,
            dataHoraInicio,
            procedimento
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    return resposta.data;
}