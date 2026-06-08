import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import GraficoTendenciaFaturamento from '../components/GraficoTendenciaFaturamento';
import CartaoProcedimentosRealizados from '../components/CartaoProcedimentosRealizados';
import TabelaProximosAgendamentos from '../components/TabelaProximosAgendamentos';
import {
  getFaturamentoMensal,
  getProcedimentosMensal,
  getReceitaAnualTotal,
  getTicketMedio,
} from '../services/dashboardService';

/* ── ícones ── */
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

/* ── formata moeda BR ── */
function formatarReais(valor) {
  if (valor == null) return '—';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ── KPI card ── */
function KPI({ rotulo, valor, badge, meta, carregando }) {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl px-5 py-4 flex flex-col gap-1 min-w-0">
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">{rotulo}</p>
      <div className="flex items-end justify-between gap-2 mt-1">
        {carregando
          ? <div className="h-7 w-24 bg-gray-100 animate-pulse rounded"/>
          : <p className="text-2xl font-black text-gray-900 leading-none truncate">{valor}</p>
        }
        {badge && !carregando && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#e8f5e9] text-[#2C3E2D] flex-shrink-0">
            {badge}
          </span>
        )}
      </div>
      {meta && !carregando && <p className="text-[10px] text-gray-400">Meta {meta}</p>}
    </div>
  );
}

/* ── Header ── */
function HeaderDashboard({ nome }) {
  return (
    <>
    </>
  );
}

/* ══════════════════════════════════════════ */
export default function PaginaDashboard() {
  const { usuario } = useAuth();
  const nomeCompleto = usuario?.nome || 'Usuário';
  const primeiroNome = (nomeCompleto || 'Usuário').split(' ')[0] || 'Usuário';

  const [kpis, setKpis] = useState({
    faturamentoMensal: null,
    procedimentosMensal: null,
    receitaAnual: null,
    ticketMedio: null,
  });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarKPIs() {
      try {
        setCarregando(true);
        // allSettled garante que uma falha isolada não derruba os outros KPIs
        const [faturamento, procedimentos, receita, ticket] = await Promise.allSettled([
          getFaturamentoMensal(),
          getProcedimentosMensal(),
          getReceitaAnualTotal(),
          getTicketMedio(),
        ]);
        setKpis({
          faturamentoMensal:  faturamento.status  === 'fulfilled' ? faturamento.value  : null,
          procedimentosMensal:procedimentos.status === 'fulfilled' ? procedimentos.value: null,
          receitaAnual:       receita.status       === 'fulfilled' ? receita.value       : null,
          ticketMedio:        ticket.status        === 'fulfilled' ? ticket.value        : null,
        });
      } catch (e) {
        console.error('Erro ao carregar KPIs do dashboard:', e);
        setErro('Não foi possível carregar os dados.');
      } finally {
        setCarregando(false);
      }
    }
    carregarKPIs();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />
      <HeaderDashboard nome={nomeCompleto} />

      <main className="ml-[152px] pt-6 min-h-screen bg-[#f5f4ec]">
        <div className="max-w-[1300px] mx-auto px-6 py-6">

          {/* ── Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                Bem-vindo, {primeiroNome}
              </h1>
              <p className="text-sm text-gray-400 mt-1">Aqui está o resumo da performance clínica de hoje.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 mt-1 bg-white border border-[#e8e6d9] text-sm font-semibold text-gray-700 rounded-lg hover:border-[#2C3E2D] transition-colors">
              {iconeExportar} Exportar Relatório
            </button>
          </div>

          {/* ── erro global ── */}
          {erro && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
              {erro}
            </div>
          )}

          {/* ── KPIs ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <KPI
              rotulo="Faturamento Mensal"
              valor={formatarReais(kpis.faturamentoMensal)}
              carregando={carregando}
            />
            <KPI
              rotulo="Procedimentos Mensais"
              valor={kpis.procedimentosMensal ?? '—'}
              carregando={carregando}
            />
            <KPI
              rotulo="Receita Anual"
              valor={formatarReais(kpis.receitaAnual)}
              carregando={carregando}
            />
            <KPI
              rotulo="Ticket Médio / Procedimento"
              valor={formatarReais(kpis.ticketMedio)}
              carregando={carregando}
            />
          </div>

          {/* ── Gráficos ── */}
          <div className="grid grid-cols-12 gap-4 mb-4 items-stretch">
            <div className="col-span-12 lg:col-span-8 flex flex-col">
              <GraficoTendenciaFaturamento />
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <CartaoProcedimentosRealizados />
            </div>
          </div>

          {/* ── Próximos Agendamentos ── */}
          <TabelaProximosAgendamentos />

        </div>
      </main>
    </div>
  );
}
