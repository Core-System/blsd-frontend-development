import api from './api';

export async function listarConsultasCliente(clienteId) {
  const { data } = await api.get(`/consulta/cliente/${clienteId}`);
  return data;
}

export async function avaliarConsulta(consultaId, dados) {
  const { data } = await api.post(`/consulta/${consultaId}/avaliar`, dados);
  return data;
}
