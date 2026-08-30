import { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const tokenSalvo = localStorage.getItem('token');
        const nomeSalvo = localStorage.getItem('nome_usuario');

        if (!tokenSalvo) return null;

        try {
            const decodedToken = jwtDecode(tokenSalvo);
            return {
                nome: nomeSalvo,
                email: decodedToken.sub,
                id: decodedToken.id,
                acesso: {
                    nome: decodedToken.role
                }
            };
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('nome_usuario');
            localStorage.removeItem('user_role');
            localStorage.removeItem('usuario');
            return null;
        }
    });

    function salvarUsuario(dados) {
        localStorage.setItem('token', dados.token);
        localStorage.setItem('nome_usuario', dados.nome);

        try {
            const decodedToken = jwtDecode(dados.token);
            
            const usuarioObj = {
                nome: dados.nome,
                email: decodedToken.sub,
                id: decodedToken.id,
                acesso: {
                    nome: decodedToken.role
                }
            };

            localStorage.setItem('user_role', decodedToken.role);
            localStorage.setItem('usuario', JSON.stringify(usuarioObj));

            setUsuario(usuarioObj);
        } catch (error) {
            console.error("Erro ao decodificar o token no login:", error);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('nome_usuario');
        localStorage.removeItem('user_role');
        localStorage.removeItem('usuario');
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