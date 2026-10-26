import api from './api';

export async function login({ email, senha }) {
  const { data } = await api.post('/usuarios/login', { email, senha });
  return data;
}

export async function cadastrar({ nome, email, senha, telefone, dataNasc }) {
  const { data } = await api.post('/cliente', {
    nome,
    email,
    senha,
    urlFoto: 'https://i.sstatic.net/Hq8za.jpgnpm',
    dataNasc,
    telefone,
    acesso: { id: 3 },
  });

  return data;
}
