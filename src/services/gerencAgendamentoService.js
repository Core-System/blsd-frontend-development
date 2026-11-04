import api from './api';

function normalizarPagina(data, fallbackSize = 15) {
  if (!data || !Array.isArray(data.content)) {
    throw new Error('Resposta paginada inválida para agendamentos.');
  }

  return {
    content: Array.isArray(data?.content) ? data.content : [],
    totalElements: Number(data?.totalElements ?? 0),
    totalPages: Number(data?.totalPages ?? 1),
    number: Number(data?.number ?? 0),
    size: Number(data?.size ?? fallbackSize),
  };
}

export async function listarConsultas({
  page = 0,
  size = 15,
  status = '',
  busca = '',
  procedimento = '',
  inicio = '',
  fim = '',
} = {}) {
  const params = { page, size };

  if (status) params.status = status;
  if (busca) params.busca = busca;
  if (procedimento) params.procedimento = procedimento;
  if (inicio) params.inicio = inicio;
  if (fim) params.fim = fim;

  const { data } = await api.get('/consulta', { params });
  return normalizarPagina(data, size);
}

export async function listarTodasConsultas(clientes) {
  const resultados = await Promise.all(
    clientes.map((cliente) =>
      api
        .get(`/consulta/cliente/${cliente.id}`)
        .then(({ data }) =>
          data.map((consulta) => ({ ...consulta, cliente }))
        )
        .catch(() => [])
    )
  );

  return resultados.flat();
}

export async function listarConsultasPorCliente(clienteId) {
  const { data } = await api.get(`/consulta/cliente/${clienteId}`);
  return data;
}
