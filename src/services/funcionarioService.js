import api from './api';

/**
 * Lista todos os funcionários.
 */
export async function listarFuncionarios() {
  const { data } = await api.get('/funcionario');
  return data;
}

/**
 * Busca funcionário por ID.
 */
export async function buscarFuncionarioPorId(id) {
  const { data } = await api.get(`/funcionario/${id}`);
  return data;
}

/**
 * Cadastra um novo funcionário.
 */
export async function cadastrarFuncionario({ nome, email, senha, cpf, urlFoto }) {
  const { data } = await api.post('/funcionario', {
    nome,
    email,
    senha,
    cpf,
    urlFoto: urlFoto || '',
    acesso: { id: 2 },
  });
  return data;
}

/**
 * Atualiza um funcionário existente.
 */
export async function atualizarFuncionario(id, { nome, email, senha, cpf, urlFoto }) {
  const { data } = await api.put(`/funcionario/${id}`, {
    nome,
    email,
    senha,
    cpf,
    urlFoto: urlFoto || '',
    acesso: { id: 2 },
  });
  return data;
}

/**
 * Remove um funcionário por ID.
 */
export async function deletarFuncionario(id) {
  await api.delete(`/funcionario/${id}`);
}

export async function atualizarFotoFuncionario(id, arquivoFoto) {
  const formData = new FormData();
  formData.append('file', arquivoFoto);

  const { data } = await api.patch(`/funcionario/${id}/foto`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}
