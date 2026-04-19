import React from 'react';

const iconeSeta = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

export default function BarraFiltrosAgendamento() {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-4 flex flex-wrap items-end gap-3">
      {/* filtro paciente */}
      <div className="flex-1 min-w-[200px]">
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
          Filtrar por Paciente
        </label>
        <input
          type="text"
          placeholder="Nome do cliente..."
          className="w-full px-3 py-2.5 bg-[#f9f8f2] border border-[#e8e6d9] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2C3E2D]/40 transition-colors"
        />
      </div>

      {/* periodo */}
      <div className="min-w-[150px]">
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
          Período
        </label>
        <div className="relative">
          <select className="w-full appearance-none px-3 py-2.5 pr-8 bg-[#f9f8f2] border border-[#e8e6d9] rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#2C3E2D]/40 cursor-pointer transition-colors">
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
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
          Procedimento
        </label>
        <div className="relative">
          <select className="w-full appearance-none px-3 py-2.5 pr-8 bg-[#f9f8f2] border border-[#e8e6d9] rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#2C3E2D]/40 cursor-pointer transition-colors">
            <option>Todos</option>
            <option>Toxina Botulínica</option>
            <option>Peeling Químico</option>
            <option>Bioestimulador</option>
            <option>Rinomodelação</option>
          </select>
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{iconeSeta}</span>
        </div>
      </div>

      {/* status */}
      <div className="min-w-[140px]">
        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
          Status
        </label>
        <div className="relative">
          <select className="w-full appearance-none px-3 py-2.5 pr-8 bg-[#f9f8f2] border border-[#e8e6d9] rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#2C3E2D]/40 cursor-pointer transition-colors">
            <option>Ver todos</option>
            <option>Confirmado</option>
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