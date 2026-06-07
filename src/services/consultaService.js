import axios from 'axios';

const BASE_URL = 'http://localhost:8080/consulta';

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export async function listarConsultasCliente(clienteId) {
    const r = await axios.get(`${BASE_URL}/cliente/${clienteId}`, getAuthHeaders());
    return r.data;
}

export async function avaliarConsulta(consultaId, dados) {
    const r = await axios.post(`${BASE_URL}/${consultaId}/avaliar`, dados, getAuthHeaders());
    return r.data;
}