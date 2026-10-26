import api from "./api";

export async function listarServicos({ page = 0, size = 10, busca = '' } = {}) {
  const params = {};
  if (page !== undefined && page !== null) params.page = page;
  if (size !== undefined && size !== null) params.size = size;
  if (busca) params.busca = busca;

  const { data } = await api.get(`/servico`, {
    params,
  });

  return data;
}