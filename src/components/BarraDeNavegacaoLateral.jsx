import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const iconePainel = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);
const iconeClientes = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="9" cy="7" r="4"/>
    <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/>
    <path d="M19 8v6m3-3h-6" strokeLinecap="round"/>
  </svg>
);
const iconeAgendamentos = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
  </svg>
);
const iconeEstoque = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round"/>
  </svg>
);
const iconeFuncionarios = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="9" cy="7" r="3"/>
    <circle cx="17" cy="8" r="2.5"/>
    <path d="M2 21v-1a6 6 0 0 1 6-6h3a6 6 0 0 1 6 6v1"/>
    <path d="M20 14a4 4 0 0 1 2 3.5V21" strokeLinecap="round"/>
  </svg>
);
const iconeSuporte = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="4"/>
    <path d="M3.5 5 8.5 9.5M15.5 14.5l5 4.5M20.5 5l-5 4.5M8.5 14.5l-5 4.5" strokeLinecap="round"/>
  </svg>
);
const iconeConfiguracoes = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const iconeInicio = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3"/>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>
);

const itensNavegacao = [
  { icone: iconePainel,        rotulo: 'Dashboard',     rota: '/dashboard'     },
  { icone: iconeClientes,      rotulo: 'Clientes',      rota: '/clientes'      },
  { icone: iconeAgendamentos,  rotulo: 'Agendamentos',  rota: '/agendamentos'  },
  { icone: iconeEstoque,       rotulo: 'Estoque',       rota: '/estoque'       },
  { icone: iconeFuncionarios,  rotulo: 'Funcionários',  rota: '/funcionarios'  },
  { icone: iconeInicio,  rotulo: 'Início',  rota: '/'  }

];

export default function BarraDeNavegacaoLateral() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed top-0 left-0 h-full w-[152px] bg-[#2C3E2D] flex flex-col z-40">
      <div className="px-5 pt-6 pb-8">
        <p className="text-white font-bold text-sm leading-tight tracking-wide">Blessed7</p>
        <p className="text-[#a8c5a0] text-[9px] uppercase tracking-widest mt-0.5">Excelência Clínica</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {itensNavegacao.map((item) => {
          const ativo = pathname === item.rota;
          return (
            <button
              key={item.rotulo}
              onClick={() => navigate(item.rota)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${
                ativo
                  ? 'bg-white/15 text-white'
                  : 'text-[#a8c5a0] hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`flex-shrink-0 ${ativo ? 'text-white' : 'text-[#a8c5a0] group-hover:text-white'}`}>
                {item.icone}
              </span>
              <span className="text-xs font-medium">{item.rotulo}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
