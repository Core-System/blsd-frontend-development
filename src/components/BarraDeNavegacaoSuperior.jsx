import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import BalaoAgendamentos from './BalaoAgendamentos';


const links = ['Início', 'Procedimentos', 'Sobre nós', 'Contato'];

export default function BarraDeNavegacaoSuperior() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const primeiroNome = usuario?.nome?.split(' ')[0] || 'Visitante';

  const [mensagemLogin, setMensagemLogin] = useState(null);

  function aoClicarAgendar() {
    if (!usuario) {
      setMensagemLogin(true);
      setTimeout(() => setMensagemLogin(false), 4000);
      return;
    }
    navigate('/agendar');
  }

  function aoSair() {
    logout();
    navigate('/login');
  }



  return (
    <nav className="sticky top-0 left-0 right-0 z-50 w-full bg-[#f8f7f2] border-b border-[#e8e6d9] px-6 py-4 flex items-center justify-between">
      {/* Header da pagina inicial */}
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        className="text-xl font-black text-gray-900 tracking-tight bg-transparent border-none cursor-pointer"
      >
        Blessed 7
      </button>

      {/* Links/botoes centrais */}
      <div className="flex items-center gap-10">
        {links.map(link => (
          <button
            key={link}
            onClick={() => {
              if (link === 'Início') navigate('/');
              if (link === 'Procedimentos') {
                if (window.location.pathname !== '/') {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('procedimentos')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('procedimentos')?.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            className={`
              text-sm bg-transparent border-none transition-colors
              ${link === 'Sobre nós' || link === 'Contato'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-600 hover:text-[#2C3E2D] cursor-pointer font-semibold'
              }
            `}
          >
            {link}
          </button>
        ))}
        <button
          onClick={aoClicarAgendar}
          className="text-sm font-bold text-[#2C3E2D] bg-transparent border-none cursor-pointer hover:text-[#1a2a1b] transition-colors"
        >
          Agende
        </button>
      </div>

      {/* Área direita: usuário */}
      <div className="flex items-center gap-3">
        {usuario ? (
          <>
          <BalaoAgendamentos />
            <span className="text-sm text-gray-600">
              Olá, <strong>{primeiroNome}</strong>
            </span>
            <div className="w-9 h-9 rounded-full bg-[#8B7355] overflow-hidden flex items-center justify-center flex-shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white" />
              </svg>
            </div>
            <button
              onClick={aoSair}
              className="text-sm font-semibold text-red-600 hover:text-red-800 bg-transparent border-none cursor-pointer transition-colors"
            >
              Sair
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-semibold text-gray-900 hover:text-[#B8982A] transition-colors bg-transparent border-none cursor-pointer"
          >
            Entrar
          </button>
        )}
      </div>
      {/* Toast de aviso */}
      {mensagemLogin && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#2C3E2D] text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium animate-fade-in">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          <span>Você precisa estar logado para agendar.</span>
          <button
            onClick={() => navigate('/login')}
            className="ml-2 text-[#d4b055] font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            Entrar
          </button>
        </div>
      )}
    </nav>
  );
}
