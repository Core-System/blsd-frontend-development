import React from 'react';

import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import CabecalhoGlobal from '../components/CabecalhoGlobal';
import BarraFiltrosAgendamento from '../components/BarraFiltrosAgendamento';
import CalendarioAgendamento from '../components/CalendarioAgendamento';
import CartaoVisaoGeral from '../components/CartaoVisaoGeral';
import CartaoListaAgendamentos from '../components/CartaoListaAgendamentos';
import CartaoKPI from '../components/CartaoKPI';
import CartaoRelatorioDetalhado from '../components/CartaoRelatorioDetalhado';

const iconCalendar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
  </svg>
);

export default function PaginaGerenciarAgendamentos() {
  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      {/* barra lateral */}
      <BarraDeNavegacaoLateral />

      {/* header global */}
      <CabecalhoGlobal />

      {/* conteudo principal */}
      <main
        className="conteudo-principal ml-[152px] mt-14 min-h-[calc(100vh-56px)] overflow-y-auto"
        style={{ backgroundColor: '#f5f4ec' }}
      >
        <div className="max-w-[1300px] mx-auto px-6 py-7">

          <div className="animate-fade-in flex items-start justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Gestão
                <span className="mx-1.5 text-gray-300">›</span>
                <span className="text-[#2C3E2D]">Agendamentos</span>
              </p>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                Gerenciar<br />Agendamentos
              </h1>
            </div>
            <div className="mt-1">
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#e8e6d9] rounded-lg text-xs font-semibold text-gray-600">
                {iconCalendar}
                <span>Abril 2026</span>
              </div>
            </div>
          </div>

          {/* barra de filtro */}
          <div className="animate-fade-in-delay-1 mb-5">
            <BarraFiltrosAgendamento />
          </div>

          <div className="animate-fade-in-delay-2 grid grid-cols-12 gap-4 mb-4">
            {/* coluna esquerda calendario + previa */}
            <div className="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
              <CalendarioAgendamento />
              <CartaoVisaoGeral />
            </div>

            {/* coluna direita: lista de agendamentos */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-9">
              <CartaoListaAgendamentos />
            </div>
          </div>

          {/* KPI */}
          <div className="animate-fade-in-delay-3 grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <CartaoKPI
                icon="trend"
                value="+18%"
                label="Crescimento Mensal"
                description="novos agendamentos"
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <CartaoKPI
                icon="hourglass"
                value="12"
                unit="minutos"
                label="Tempo Médio de Espera"
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <CartaoRelatorioDetalhado />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
