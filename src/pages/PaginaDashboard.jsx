import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import GraficoTendenciaFaturamento from '../components/GraficoTendenciaFaturamento';
import CartaoProcedimentosRealizados from '../components/CartaoProcedimentosRealizados';
import TabelaProximosAgendamentos from '../components/TabelaProximosAgendamentos';

/* ── ícones inline ── */
const iconeExportar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const iconeBusca = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const iconeNotificacao = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const iconeConfig = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

/* ── KPI helper ── */
function KPI({ rotulo, valor, badge, meta }) {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl px-5 py-4 flex flex-col gap-1 min-w-0">
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">{rotulo}</p>
      <div className="flex items-end justify-between gap-2 mt-1">
        <p className="text-2xl font-black text-gray-900 leading-none truncate">{valor}</p>
        {badge && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#2C3E2D] flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      {meta && <p className="text-[10px] text-gray-400">Meta {meta}</p>}
    </div>
  );
}

/* ── Header superior interno ── */
function HeaderDashboard({ nome }) {
  return (
    <header className="fixed top-0 left-[152px] right-0 z-30 bg-[#f5f4ec] border-b border-[#e8e6d9] px-6 h-12 flex items-center justify-between">
      {/* busca */}
      <div className="flex items-center gap-2 bg-white border border-[#e8e6d9] rounded-lg px-3 py-1.5 w-64">
        <span className="text-gray-400">{iconeBusca}</span>
        <input
          placeholder="Buscar..."
          className="text-sm text-gray-600 bg-transparent outline-none w-full placeholder:text-gray-400"
        />
      </div>
      {/* direita */}
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-800 transition-colors">{iconeNotificacao}</button>
        <button className="text-gray-500 hover:text-gray-800 transition-colors">{iconeConfig}</button>
        <div className="flex items-center gap-2 pl-4 border-l border-[#e8e6d9]">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-800 leading-none">Dr. {nome?.split(' ')[0] || 'Silva'}</p>
            <p className="text-[9px] text-gray-400 leading-none mt-0.5">Diretor Clínico</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#2C3E2D] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">
              {nome?.charAt(0) || 'D'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── Página ── */
export default function PaginaDashboard() {
  const { usuario } = useAuth();
  const nomeCompleto = usuario?.nome || 'Dr. Silva';
  const primeiroNome = nomeCompleto.split(' ')[0].replace('Dr.', '').trim() || 'Silva';

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />
      <main className="ml-[152px] pt-12 min-h-screen bg-[#f5f4ec]">
        <div className="max-w-[1300px] mx-auto px-6 py-6">

          {/* ── Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div>   
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                Bem-vinda, Fernada<br />
              </h1>
              <p className="text-sm text-gray-400 mt-1">Aqui está o resumo da performance clínica de hoje.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 mt-1 bg-white border border-[#e8e6d9] text-sm font-semibold text-gray-700 rounded-lg hover:border-[#2C3E2D] transition-colors">
              {iconeExportar} Exportar Relatório
            </button>
          </div>

          {/* ── KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <KPI rotulo="Faturamento Mensal"          valor="R$ 52.480"  badge="+17%"/>
            <KPI rotulo="Procedimentos Mensais"       valor="146"         badge="+12%"/>
            <KPI rotulo="Receita Anual"               valor="R$ 380.640" meta="82%"/>
            <KPI rotulo="Ticket Médio / Procedimento" valor="R$ 850,00"  badge="+5%"/>
          </div>

          {/* ── Gráficos */}
          <div className="grid grid-cols-12 gap-4 mb-4 items-stretch">
            <div className="col-span-12 lg:col-span-8 flex flex-col">
              <GraficoTendenciaFaturamento />
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <CartaoProcedimentosRealizados />
            </div>
          </div>

          {/* ── Tabela agendamentos */}
          <TabelaProximosAgendamentos />

        </div>
      </main>
    </div>
  );
}
