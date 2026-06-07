import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export async function getFaturamentoMensal() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/faturamento-mensal`, {
    headers: getAuthHeader(),
  });
  return data; // BigDecimal → number
}

export async function getProcedimentosMensal() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/procedimentos-mensal`, {
    headers: getAuthHeader(),
  });
  return data; // Long → number
}

export async function getReceitaAnualTotal() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/receita-anual-total`, {
    headers: getAuthHeader(),
  });
  return data; // BigDecimal → number
}

export async function getTicketMedio() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/ticket-medio`, {
    headers: getAuthHeader(),
  });
  return data; // BigDecimal → number
}

export async function getTendenciaFaturamento() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/tendencia-faturamento`, {
    headers: getAuthHeader(),
  });
  // [{ ano, mes, total }]
  return data;
}

export async function getReceitaPorAno() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/receita-por-ano`, {
    headers: getAuthHeader(),
  });
  // [{ ano, total }]
  return data;
}

export async function getRankingServicos() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/ranking-servicos`, {
    headers: getAuthHeader(),
  });
  // [{ servico, quantidade }]
  return data;
}

export async function getProximosAgendamentos() {
  const { data } = await axios.get(`${BASE_URL}/dashboard/proximos-agendamentos`, {
    headers: getAuthHeader(),
  });
  // [{ consultaId, dataHoraInicio, dataHoraFim, nomeCliente, urlFotoCliente, localConsulta, tipoPagamento }]
  return data;
}
