import api from './api';

export async function listarMovimentacoes() {
  const { data } = await api.get('/movimentacao');
  return data;
}

export async function registrarMovimentacao(dados) {
  const { data } = await api.post('/movimentacao', dados);
  return data;
}
