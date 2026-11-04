import api from './api';

export async function listarAvaliacoes() {
  const { data } = await api.get('/avaliacao');
  return data;
}

export async function listarAvaliacaoPorId(id) {
  const { data } = await api.get(`/avaliacao/${id}`);
  return data;
}

export async function deletarAvaliacao(id) {
  const { data } = await api.delete(`/avaliacao/${id}`);
  return data;
}
