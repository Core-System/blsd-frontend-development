import api from './api';

export async function listarFuncionarios({ page = 0, size = 10, sort = 'asc' } = {}) {
  const { data } = await api.get('/funcionario', { params: { page, size, sort } });
  return data;
}

export async function buscarFuncionarioPorId(id) {
  const { data } = await api.get(`/funcionario/${id}`);
  return data;
}

export async function cadastrarFuncionario({ nome, email, senha, cpf, urlFoto }) {
  const { data } = await api.post('/funcionario', {
    nome,
    email,
    senha,
    cpf: cpf || null,
    urlFoto: urlFoto || '',
    acesso: { id: 2 },
  });
  return data;
}

export async function atualizarFuncionario(id, { nome, email, senha, cpf, urlFoto }) {
  const { data } = await api.put(`/funcionario/${id}`, {
    nome,
    email,
    senha,
    cpf: cpf || null,
    urlFoto: urlFoto || '',
    acesso: { id: 2 },
  });
  return data;
}

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
