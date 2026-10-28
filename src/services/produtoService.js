import api from './api';

function normalizarPagina(data, fallbackSize = 10) {
  if (!data || !Array.isArray(data.content)) {
    throw new Error('Resposta paginada inválida para produtos.');
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

  const { data } = await api.get('/produto', { params });
  return normalizarPagina(data, size);
}

export async function criarProduto(produto) {
  const { data } = await api.post('/produto', produto);
  return data;
}

export async function atualizarProduto(id, produto) {
  const { data } = await api.put(`/produto/${id}`, produto);
  return data;
}

export async function deletarProduto(id) {
  await api.delete(`/produto/${id}`);
}
