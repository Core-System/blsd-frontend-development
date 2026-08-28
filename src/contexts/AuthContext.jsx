import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const salvo = localStorage.getItem('usuario');
        return salvo ? JSON.parse(salvo) : null;
    });

    function salvarUsuario(dados) {
        localStorage.setItem('usuario', JSON.stringify(dados));
        localStorage.setItem('user_role', dados.acesso.nome);
        localStorage.setItem('token', dados.token);
        setUsuario(dados);
    }

    function logout() {
        localStorage.removeItem('usuario');
        localStorage.removeItem('user_role');
        localStorage.removeItem('token');
        setUsuario(null);
    }

    function temPermissao(rolesPermitidas) {
        if (!usuario || !usuario.acesso || !usuario.acesso.nome){
            return false
        };        
        const roleDoUsuario = usuario.acesso.nome;
        if (Array.isArray(rolesPermitidas)) {
            return rolesPermitidas.includes(roleDoUsuario);
        }
        return roleDoUsuario === rolesPermitidas;
    }

    return (
        <AuthContext.Provider value={{ usuario, salvarUsuario, logout, temPermissao}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}