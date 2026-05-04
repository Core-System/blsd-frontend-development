import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const iconeBusca = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" strokeLinecap="round" />
  </svg>
);
const iconeAjuda = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" strokeLinecap="round" />
    <circle cx="12" cy="17" r=".5" fill="currentColor" />
  </svg>
);
const iconeSino = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
  </svg>
);
const iconeEngrenagem = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const iconeSair = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function CabecalhoGlobal() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate();

  function aoSair() {
    logout();
    navigate('/login');
  }

  const iniciais = usuario?.nome ? usuario.nome.split(' ').map(n => n[0]).slice(0, 2).join('') : '??';

  return (
    <header className="fixed top-0 left-[152px] right-0 h-14 bg-[#f5f4ec] border-b border-[#e8e6d9] flex items-center px-6 gap-4 z-30">
      {/* pesquisa */}
      <div className="flex-1 max-w-lg relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{iconeBusca}</span>
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full pl-9 pr-4 py-2 bg-white border border-[#e0ddd0] rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#2C3E2D]/40 transition-colors"
        />
      </div>

      {/* lado direito */}
      <div className="flex items-center gap-1 ml-auto">
        <button className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 px-2 py-1.5 rounded-md hover:bg-white/60 transition-all text-xs font-medium">
          {iconeAjuda}
          <span>SUPORTE</span>
        </button>
        {[iconeSino, iconeEngrenagem].map((icone, i) => (
          <button key={i} className="p-2 text-gray-500 hover:text-gray-800 rounded-md hover:bg-white/60 transition-all relative">
            {icone}
            {i === 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            )}
          </button>
        ))}

        {/* usuario */}
        <div className="flex items-center gap-2.5 ml-3 pl-3 border-l border-[#e0ddd0]">
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-800 leading-tight">
              {usuario?.nome || 'Usuário'}
            </p>
            <p className="text-[10px] text-gray-500 leading-tight">
              {usuario?.acesso?.nome || ''}
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#8B7355] flex items-center justify-center text-white text-xs font-bold overflow-hidden">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${iniciais}&backgroundColor=8B7355&textColor=ffffff`}
              alt={usuario?.nome}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            {iniciais}
          </div>
          <button
            onClick={aoSair}
            className="flex items-center gap-1.5 text-[#2C3E2D] hover:text-[#1a2a1b] px-2.5 py-1.5 rounded-md border border-[#2C3E2D]/20 hover:bg-[#2C3E2D]/10 transition-all text-[10px] font-bold tracking-wider"
          >
            {iconeSair}
            <span>SAIR</span>
          </button>
        </div>
      </div>
    </header>
  );
}