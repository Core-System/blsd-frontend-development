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

export async function atualizarCliente(id, dados) {
  const { data } = await axios.put(
    `${BASE_URL}/cliente/${id}`,
    {
      nome: dados.nome,
      email: dados.email,
      dataNasc: dados.dataNasc,
      telefone: dados.telefone,
      urlFoto: dados.urlFoto || '',
      acesso: { id: 0 },
    },
    { headers: getAuthHeader() }
  );
  return data;
}

export async function listarCliente(id) {
  const { data } = await axios.get(`${BASE_URL}/cliente/${id}`, {
    headers: getAuthHeader(),
  });
  return data; // [{ id, nome, email, telefone, urlFoto, dataCriacao, dataNasc, acesso, senha }]
}
