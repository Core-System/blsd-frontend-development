import React from 'react';

const iconeSeta = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const selectCls = "w-full appearance-none px-3 py-2.5 pr-8 bg-[#f9f8f2] border border-[#e8e6d9] rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#2C3E2D]/40 cursor-pointer transition-colors";

export default function BarraFiltrosAgendamento({
  paciente = '', onPaciente,
  periodo = 'Todos os dias', onPeriodo,
  procedimento = 'Todos', onProcedimento,
  status = 'Ver todos', onStatus,
}) {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-4 flex flex-wrap items-end gap-3">
      {/* paciente */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
          Filtrar por Paciente
        </label>
        <input
          type="text"
          value={paciente}
          onChange={(e) => onPaciente?.(e.target.value)}
          placeholder="Nome do cliente..."
          className="w-full px-3 py-2.5 bg-[#f9f8f2] border border-[#e8e6d9] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2C3E2D]/40 transition-colors"
        />
      </div>

      {/* período */}
      <div className="min-w-[150px]">
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Período</label>
        <div className="relative">
          <select value={periodo} onChange={(e) => onPeriodo?.(e.target.value)} className={selectCls}>
            <option>Todos os dias</option>
            <option>Hoje</option>
            <option>Esta semana</option>
            <option>Este mês</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{iconeSeta}</span>
        </div>
      </div>

      {/* procedimento */}
      <div className="min-w-[140px]">
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Procedimento</label>
        <div className="relative">
          <select value={procedimento} onChange={(e) => onProcedimento?.(e.target.value)} className={selectCls}>
            <option>Todos</option>
            <option>Limpeza de Pele</option>
            <option>Peeling de Diamante</option>
            <option>Skinbooster</option>
            <option>Drenagem Linfática</option>
            <option>Massagem Relaxante</option>
            <option>Depilação (Cera e Laser)</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{iconeSeta}</span>
        </div>
      </div>

      {/* status */}
      <div className="min-w-[140px]">
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">Status</label>
        <div className="relative">
          <select value={status} onChange={(e) => onStatus?.(e.target.value)} className={selectCls}>
            <option>Ver todos</option>
            <option>Pendente</option>
            <option>Completo</option>
            <option>Cancelado</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{iconeSeta}</span>
        </div>
      </div>
    </div>
  );
}
