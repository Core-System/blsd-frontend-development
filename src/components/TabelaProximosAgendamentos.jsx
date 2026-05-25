import React from 'react';
import { useNavigate } from 'react-router-dom';

const iconePonto = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);
const iconeSetaDireita = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const agendamentos = [
  { data: '24 Mar, 2025', hora: '14:50 PM', cliente: 'Ana Valéria',    iniciais: 'AV', cor: 'bg-amber-400',  procedimento: 'BOTOX',          status: 'CONFIRMADO', statusCor: 'text-green-600', dotCor: 'bg-green-500' },
  { data: '24 Mar, 2025', hora: '16:00 PM', cliente: 'Ricardo Fontana', iniciais: 'RF', cor: 'bg-blue-400',   procedimento: 'PEELING',         status: 'PENDENTE',   statusCor: 'text-amber-600', dotCor: 'bg-amber-500' },
  { data: '25 Mar, 2025', hora: '09:30 AM', cliente: 'Mariana Souza',   iniciais: 'MS', cor: 'bg-rose-400',   procedimento: 'PREENCHIMENTO',   status: 'CONFIRMADO', statusCor: 'text-green-600', dotCor: 'bg-green-500' },
];

const badgeProcedimento = 'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f5e9] text-[#2C3E2D]';

export default function TabelaProximosAgendamentos() {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Próximos Agendamentos</h2>
        <button
          onClick={() => navigate('/agendamentos')}
          className="flex items-center gap-1.5 text-[11px] font-bold text-[#2C3E2D] hover:text-[#1a2a1b] uppercase tracking-widest transition-colors"
        >
          Ver todos {iconeSetaDireita}
        </button>
      </div>

      {/* cabeçalho tabela */}
      <div className="grid grid-cols-[1.4fr_1.6fr_1.4fr_1.2fr_0.5fr] gap-2 pb-2 border-b border-[#f0eeea] mb-1">
        {['Data e Hora', 'Cliente', 'Procedimento', 'Status', 'Ação'].map(col => (
          <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">{col}</span>
        ))}
      </div>

      {agendamentos.map((a, i) => (
        <div key={i} className="grid grid-cols-[1.4fr_1.6fr_1.4fr_1.2fr_0.5fr] gap-2 items-center py-3.5 border-b border-[#f5f4f0] last:border-0 hover:bg-[#fafaf7] rounded-lg px-1 transition-colors">
          <div className="px-2">
            <p className="text-xs font-semibold text-gray-800">{a.data}</p>
            <p className="text-[10px] text-gray-400">{a.hora}</p>
          </div>
          <div className="flex items-center gap-2 px-2">
            <div className={`w-7 h-7 rounded-full ${a.cor} flex items-center justify-center flex-shrink-0`}>
              <span className="text-[10px] font-bold text-white">{a.iniciais}</span>
            </div>
            <span className="text-xs font-semibold text-gray-800">{a.cliente}</span>
          </div>
          <div className="px-2">
            <span className={badgeProcedimento}>{a.procedimento}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2">
            <span className={`w-1.5 h-1.5 rounded-full ${a.dotCor} flex-shrink-0`}/>
            <span className={`text-xs font-semibold ${a.statusCor}`}>{a.status}</span>
          </div>
          <div className="px-2 text-gray-400 hover:text-gray-700 cursor-pointer">
            {iconePonto}
          </div>
        </div>
      ))}
    </div>
  );
}
