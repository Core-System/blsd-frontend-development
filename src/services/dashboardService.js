import api from './api';

export async function getFaturamentoMensal() {
  const { data } = await api.get('/dashboard/faturamento-mensal');
  return data;
}

export async function getProcedimentosMensal() {
  const { data } = await api.get('/dashboard/procedimentos-mensal');
  return data;
}

export async function getReceitaAnualTotal() {
  const { data } = await api.get('/dashboard/receita-anual-total');
  return data;
}

export async function getTicketMedio() {
  const { data } = await api.get('/dashboard/ticket-medio');
  return data;
}

export async function getTendenciaFaturamento() {
  const { data } = await api.get('/dashboard/tendencia-faturamento');
  return data;
}

export async function getReceitaPorAno() {
  const { data } = await api.get('/dashboard/receita-por-ano');
  return data;
}

export async function getRankingServicos() {
  const { data } = await api.get('/dashboard/ranking-servicos');
  return data;
}

export async function getProximosAgendamentos() {
  const { data } = await api.get('/dashboard/proximos-agendamentos');
  return data;
}
