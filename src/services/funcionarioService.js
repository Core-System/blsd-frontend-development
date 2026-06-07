import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

function getAuthHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

/**
 * Lista todos os funcionários
 * Retorna: [{ id, nome, email, cpf, urlFoto, dataCriacao, acesso, empresa }]
 */
export async function listarFuncionarios() {
  const { data } = await axios.get(`${BASE_URL}/funcionario`, {
    headers: getAuthHeader(),
  });
  return data;
}

/**
 * Busca funcionário por ID
 */
export async function buscarFuncionarioPorId(id) {
  const { data } = await axios.get(`${BASE_URL}/funcionario/${id}`, {
    headers: getAuthHeader(),
  });
  return data;
}

/**
 * Cadastra um novo funcionário
 * @param {Object} funcionario - { nome, email, senha, cpf, urlFoto, acesso: { id }, empresa }
 */
export async function cadastrarFuncionario({ nome, email, senha, cpf, urlFoto }) {
  const { data } = await axios.post(
    `${BASE_URL}/funcionario`,
    {
      nome,
      email,
      senha,
      cpf,
      urlFoto: urlFoto || '',
      acesso: { id: 2 }, // id 2 = FUNCIONARIO
    },
    { headers: getAuthHeader() }
  );
  return data;
}

/**
 * Atualiza um funcionário existente
 */
export async function atualizarFuncionario(id, { nome, email, senha, cpf, urlFoto }) {
  const { data } = await axios.put(
    `${BASE_URL}/funcionario/${id}`,
    {
      nome,
      email,
      senha,
      cpf,
      urlFoto: urlFoto || '',
      acesso: { id: 2 },
    },
    { headers: getAuthHeader() }
  );
  return data;
}

/**
 * Remove um funcionário por ID
 */
export async function deletarFuncionario(id) {
  await axios.delete(`${BASE_URL}/funcionario/${id}`, {
    headers: getAuthHeader(),
  });
}
