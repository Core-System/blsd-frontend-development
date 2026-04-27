import axios from "axios";

const BASE_URL = 'http://localhost:8080';

function anotarDataHoraISO(dia, hora){
    const diaString = String(dia).padStart(2, '0');
    return `2026-04-${diaString}T${hora}:00`;
}

export async function criarAgendamento({nome, email, dia, hora}){
    const dataHoraInicio = anotarDataHoraISO(dia, hora);

const resposta = await axios.post(`${BASE_URL}/api/calendario/calcom/agendar`, {
  nome,
  email,
  dataHoraInicio
});
return resposta.data;
}