import axios from 'axios';

const BASE_URL = 'http://localhost:8080/consulta';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

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
  const params = {
    page,
    size,
  };

  if (status) params.status = status;
  if (busca) params.busca = busca;

  const { data } = await axios.get(BASE_URL, {
    headers: getAuthHeader(),
    params,
  });

  return normalizarPagina(data, size);
}

export async function listarTodasConsultas(clientes) {
  const resultados = await Promise.all(
    clientes.map((c) =>
      axios
        .get(`${BASE_URL}/cliente/${c.id}`, { headers: getAuthHeader() })
        .then((r) => r.data.map((consulta) => ({ ...consulta, cliente: c })))
        .catch(() => [])
    )
  );
  return resultados.flat();
}

export async function listarConsultasPorCliente(clienteId) {
  const { data } = await axios.get(`${BASE_URL}/cliente/${clienteId}`, {
    headers: getAuthHeader(),
  });
  return data;
}
