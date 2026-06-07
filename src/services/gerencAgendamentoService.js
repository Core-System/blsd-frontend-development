import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

// Busca todas as consultas de todos os clientes em paralelo
export async function listarTodasConsultas(clientes) {
  const resultados = await Promise.all(
    clientes.map((c) =>
      axios
        .get(`${BASE_URL}/consulta/cliente/${c.id}`, { headers: getAuthHeader() })
        .then((r) => r.data.map((consulta) => ({ ...consulta, cliente: c })))
        .catch(() => [])
    )
  );
  return resultados.flat();
}

export async function listarConsultasPorCliente(clienteId) {
  const { data } = await axios.get(`${BASE_URL}/consulta/cliente/${clienteId}`, {
    headers: getAuthHeader(),
  });
  return data; // [{ id, dataHoraInicio, dataHoraFim, status, servicos, avaliacao }]
}
