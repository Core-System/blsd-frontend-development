import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

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

export async function listarClientes({ page = 0, size = 10, busca = '' } = {}) {
  const params = {};
  if (page !== undefined && page !== null) params.page = page;
  if (size !== undefined && size !== null) params.size = size;
  if (busca) params.busca = busca;

  const { data } = await axios.get(`${BASE_URL}/cliente`, {
    headers: getAuthHeader(),
    params,
  });

  return normalizarPagina(data, size);
}

export async function deletarCliente(id) {
  await axios.delete(`${BASE_URL}/cliente/${id}`, {
    headers: getAuthHeader(),
  });
}

export async function atualizarCliente(id, dados) {
  const { data } = await axios.put(
    `${BASE_URL}/cliente/${id}`,
    {
      nome: dados.nome,
      email: dados.email,
      dataNasc: dados.dataNasc,
      telefone: dados.telefone,
      urlFoto: dados.urlFoto || '',
      acesso: { id: 0 },
    },
    { headers: getAuthHeader() }
  );
  return data;
}

export async function listarCliente(id) {
  const { data } = await axios.get(`${BASE_URL}/cliente/${id}`, {
    headers: getAuthHeader(),
  });
  return data; // [{ id, nome, email, telefone, urlFoto, dataCriacao, dataNasc, acesso, senha }]
}
