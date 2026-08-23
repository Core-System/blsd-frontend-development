import axios from 'axios';

const BASE_URL = 'http://localhost:8080/produto';

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
};

function normalizarPagina(data, fallbackSize = 10) {
    if (Array.isArray(data)) {
        return {
            content: data,
            totalElements: data.length,
            totalPages: Math.max(1, Math.ceil(data.length / fallbackSize)),
            number: 0,
            size: fallbackSize,
        };
    }

    return {
        content: Array.isArray(data?.content) ? data.content : [],
        totalElements: Number(data?.totalElements ?? 0),
        totalPages: Number(data?.totalPages ?? 1),
        number: Number(data?.number ?? 0),
        size: Number(data?.size ?? fallbackSize),
    };
}

export async function listarProdutos({ page = 0, size = 10, busca = '' } = {}) {
    const params = {};
    if (page !== undefined && page !== null) params.page = page;
    if (size !== undefined && size !== null) params.size = size;
    if (busca) params.busca = busca;

    const resposta = await axios.get(BASE_URL, {
        ...getAuthHeaders(),
        params,
    });

    return normalizarPagina(resposta.data, size);
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