import api from './api';

function normalizarPagina(data, fallbackSize = 15) {
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

export async function listarConsultas({
  page = 0,
  size = 15,
  status = '',
  busca = '',
} = {}) {
  const params = { page, size };

  if (status) params.status = status;
  if (busca) params.busca = busca;

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
