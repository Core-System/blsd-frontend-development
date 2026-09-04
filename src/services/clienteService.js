import api from "./api";

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

  const { data } = await api.get(`/cliente`, {
    params,
  });

  return normalizarPagina(data, size);
}

export async function deletarCliente(id) {
  await api.delete(`/cliente/${id}`);
}

export async function atualizarCliente(id, dados) {
  const { data } = await api.put(
    `/cliente/${id}`,
    {
      nome: dados.nome,
      email: dados.email,
      dataNasc: dados.dataNasc,
      telefone: dados.telefone,
      urlFoto: dados.urlFoto || '',
    }
  );
  return data;
}

export async function listarCliente(id) {
  const { data } = await api.get(`/cliente/${id}`);
  return data; // [{ id, nome, email, telefone, urlFoto, dataCriacao, dataNasc, acesso, senha }]
}

export async function atualizarFotoCliente(id, arquivoFoto) {
  const formData = new FormData();
  formData.append("file", arquivoFoto);

  const { data } = await api.patch(`/cliente/${id}/foto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
