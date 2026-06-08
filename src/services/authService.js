import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export async function login({ email, senha }) {
    const resposta = await axios.post(`${BASE_URL}/usuarios/login`, { email, senha });
    return resposta.data;
}

export async function cadastrar({ nome, email, senha, telefone, dataNasc }) {
    const resposta = await axios.post(`${BASE_URL}/cliente`, {
        nome,
        email,
        senha,
        urlFoto: 'https://i.sstatic.net/Hq8za.jpgnpm',
        dataNasc,
        telefone,
        acesso: { id: 3 }
    });
    return resposta.data;
}