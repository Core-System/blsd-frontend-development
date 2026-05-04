import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const salvo = localStorage.getItem('usuario');
        return salvo ? JSON.parse(salvo) : null;
    });

    function salvarUsuario(dados) {
        localStorage.setItem('usuario', JSON.stringify(dados));
        localStorage.setItem('token', dados.token);
        setUsuario(dados);
    }

    function logout() {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        setUsuario(null);
    }

    return (
        <AuthContext.Provider value={{ usuario, salvarUsuario, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}