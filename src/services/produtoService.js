import axios from 'axios';

const BASE_URL = 'http://localhost:8080/produto';

// Função auxiliar para pegar o token de segurança
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

export async function listarProdutos() {
    const resposta = await axios.get(BASE_URL, getAuthHeaders());
    return resposta.data;
}

export async function criarProduto(produto) {
    const resposta = await axios.post(BASE_URL, produto, getAuthHeaders());
    return resposta.data;
}

export async function atualizarProduto(id, produto) {
    const resposta = await axios.put(`${BASE_URL}/${id}`, produto, getAuthHeaders());
    return resposta.data;
}

export async function deletarProduto(id) {
    await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
}