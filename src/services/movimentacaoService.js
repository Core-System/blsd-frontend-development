import axios from 'axios';
const BASE_URL = 'http://localhost:8080/movimentacao';

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

export async function listarMovimentacoes() {
    const resposta = await axios.get(BASE_URL, getAuthHeaders());
    return resposta.data;
}

export async function registrarMovimentacao(dados) {
    const resposta = await axios.post(BASE_URL, dados, getAuthHeaders());
    return resposta.data;
}