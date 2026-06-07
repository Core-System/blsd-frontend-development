import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export async function listarClientes() {
  const { data } = await axios.get(`${BASE_URL}/cliente`, {
    headers: getAuthHeader(),
  });
  return data; // [{ id, nome, email, telefone, urlFoto, dataCriacao, dataNasc, acesso, senha }]
}

export async function deletarCliente(id) {
  await axios.delete(`${BASE_URL}/cliente/${id}`, {
    headers: getAuthHeader(),
  });
}
