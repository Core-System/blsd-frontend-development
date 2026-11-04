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
  { icone: <LayoutDashboard {...iconProps} />, rotulo: 'Dashboard', rota: '/dashboard', rolesPermitidas: ['GESTOR', 'FUNCIONARIO'] },
  { icone: <UsersRound {...iconProps} />, rotulo: 'Clientes', rota: '/clientes' },
  { icone: <CalendarDays {...iconProps} />, rotulo: 'Agendamentos', rota: '/agendamentos' },
  { icone: <Package {...iconProps} />, rotulo: 'Estoque', rota: '/estoque' },
  { icone: <UserRoundPlus {...iconProps} />, rotulo: 'Funcionários', rota: '/funcionarios', rolesPermitidas: ['GESTOR'] },
  { icone: <House {...iconProps} />, rotulo: 'Início', rota: '/' },
];

export default function BarraDeNavegacaoLateral() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { temPermissao } = useAuth();

  return (
    <aside className="fixed top-0 left-0 h-full w-[152px] bg-[#2C3E2D] flex flex-col z-40">
      <div className="px-5 pt-6 pb-8">
        <p className="text-white font-bold text-sm leading-tight tracking-wide">Blessed7</p>
        <p className="text-[#a8c5a0] text-[9px] uppercase tracking-widest mt-0.5">Excelência Clínica</p>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {itensNavegacao.map((item) => {
          if (item.rolesPermitidas && !temPermissao(item.rolesPermitidas)) {
            return null;
          }
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
