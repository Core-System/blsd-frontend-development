import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  House,
  LayoutDashboard,
  Package,
  UserRoundPlus,
  UsersRound,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const iconProps = { size: 18, strokeWidth: 1.8, 'aria-hidden': true };

const itensNavegacao = [
  { icone: <LayoutDashboard {...iconProps} />, rotulo: 'Dashboard', rotuloMobile: 'Painel', rota: '/dashboard', rolesPermitidas: ['GESTOR', 'FUNCIONARIO'] },
  { icone: <UsersRound {...iconProps} />, rotulo: 'Clientes', rotuloMobile: 'Clientes', rota: '/clientes' },
  { icone: <CalendarDays {...iconProps} />, rotulo: 'Agendamentos', rotuloMobile: 'Agenda', rota: '/agendamentos' },
  { icone: <Package {...iconProps} />, rotulo: 'Estoque', rotuloMobile: 'Estoque', rota: '/estoque' },
  { icone: <UserRoundPlus {...iconProps} />, rotulo: 'Funcionários', rotuloMobile: 'Equipe', rota: '/funcionarios', rolesPermitidas: ['GESTOR'] },
  { icone: <House {...iconProps} />, rotulo: 'Início', rotuloMobile: 'Site', rota: '/' },
];

export default function BarraDeNavegacaoLateral() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { temPermissao } = useAuth();

  return (
    <aside className="fixed bottom-0 left-0 z-40 flex h-[calc(4rem_+_env(safe-area-inset-bottom))] w-full flex-col bg-[#2C3E2D] pb-[env(safe-area-inset-bottom)] lg:bottom-auto lg:top-0 lg:h-full lg:w-[152px] lg:pb-0">
      <div className="hidden px-5 pb-8 pt-6 lg:block">
        <p className="text-white font-bold text-sm leading-tight tracking-wide">Blessed7</p>
        <p className="text-[#a8c5a0] text-[9px] uppercase tracking-widest mt-0.5">Excelência Clínica</p>
      </div>
      <nav className="flex flex-1 items-stretch justify-around px-1 lg:flex-col lg:justify-start lg:space-y-1 lg:px-3">
        {itensNavegacao.map((item) => {
          if (item.rolesPermitidas && !temPermissao(item.rolesPermitidas)) {
            return null;
          }
          const ativo = pathname === item.rota;
          return (
            <button
              key={item.rotulo}
              onClick={() => navigate(item.rota)}
              aria-label={item.rotulo}
              title={item.rotulo}
              aria-current={ativo ? 'page' : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-0 py-1 text-center transition-all duration-150 group lg:w-full lg:flex-none lg:flex-row lg:justify-start lg:gap-3 lg:px-3 lg:py-2.5 lg:text-left ${
                ativo
                  ? 'bg-white/15 text-white'
                  : 'text-[#a8c5a0] hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`flex-shrink-0 ${ativo ? 'text-white' : 'text-[#a8c5a0] group-hover:text-white'}`}>
                {item.icone}
              </span>
              <span className="max-w-full truncate text-[9px] font-medium leading-none lg:hidden">{item.rotuloMobile}</span>
              <span className="hidden text-xs font-medium lg:inline">{item.rotulo}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
