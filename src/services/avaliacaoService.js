import axios from 'axios';

const BASE_URL = 'http://localhost:8080/avaliacao';

const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export async function listarAvaliacoes() {
    const r = await axios.get(BASE_URL, getAuthHeaders());
    return r.data;
}

export async function listarAvaliacaoPorId(id) {
    const r = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
    return r.data;
}

export async function deletarAvaliacao(id) {
    const r = await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    return r.data;
}