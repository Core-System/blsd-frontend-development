import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

function limparSessao() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome_usuario');
    localStorage.removeItem('user_role');
    localStorage.removeItem('usuario');
}

function criarUsuario(token, nome, urlFoto) {
    const decodedToken = jwtDecode(token);

    if (
        !decodedToken.role ||
        !decodedToken.sub ||
        !decodedToken.id ||
        (decodedToken.exp && decodedToken.exp * 1000 <= Date.now())
    ) {
        throw new Error('Token de autenticação inválido.');
    }

    return {
        nome: nome || '',
        email: decodedToken.sub,
        id: decodedToken.id,
        urlFoto,
        acesso: {
            nome: decodedToken.role
        }
    };
}

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const tokenSalvo = localStorage.getItem('token');
        const nomeSalvo = localStorage.getItem('nome_usuario');

        if (!tokenSalvo) return null;

        try {
            const usuarioSalvo = JSON.parse(localStorage.getItem('usuario') || 'null');
            const usuarioAtual = criarUsuario(
                tokenSalvo,
                nomeSalvo || usuarioSalvo?.nome,
                usuarioSalvo?.urlFoto,
            );

            localStorage.setItem('user_role', usuarioAtual.acesso.nome);
            localStorage.setItem('usuario', JSON.stringify(usuarioAtual));
            return usuarioAtual;
        } catch {
            limparSessao();
            return null;
        }
    });

    function salvarUsuario(dados) {
        try {
            if (!dados?.token) {
                throw new Error('Resposta de autenticação sem token.');
            }

            const usuarioObj = criarUsuario(dados.token, dados.nome, dados.urlFoto);

            localStorage.setItem('token', dados.token);
            localStorage.setItem('nome_usuario', usuarioObj.nome);
            localStorage.setItem('user_role', usuarioObj.acesso.nome);
            localStorage.setItem('usuario', JSON.stringify(usuarioObj));
            setUsuario(usuarioObj);
            return usuarioObj;
        } catch (error) {
            limparSessao();
            setUsuario(null);
            throw error;
        }
    }

    function logout() {
        limparSessao();
        setUsuario(null);
    }

    function temPermissao(rolesPermitidas) {
        if (!usuario || !usuario.acesso || !usuario.acesso.nome) {
            return false;
        }        
        const roleDoUsuario = usuario.acesso.nome;
        if (Array.isArray(rolesPermitidas)) {
            return rolesPermitidas.includes(roleDoUsuario);
        }
        return roleDoUsuario === rolesPermitidas;
    }

    return (
        <AuthContext.Provider value={{ usuario, salvarUsuario, logout, temPermissao }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}