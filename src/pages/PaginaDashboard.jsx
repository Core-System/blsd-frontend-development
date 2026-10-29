import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
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
import useDelayedLoading from '../hooks/useDelayedLoading';
import { Bell, Download, Search, Settings } from 'lucide-react';

const iconeExportar = <Download size={14} strokeWidth={2} aria-hidden="true" />;
const iconeBusca = <Search size={15} strokeWidth={2} aria-hidden="true" />;
const iconeNotificacao = <Bell size={18} strokeWidth={1.8} aria-hidden="true" />;
const iconeConfig = <Settings size={18} strokeWidth={1.8} aria-hidden="true" />;

function formatarReais(valor) {
  if (valor == null) return '—';
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

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

function HeaderDashboard({ nome }) {
  return (
    <>
    </>
  );
}

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
  const [agendamentos, setAgendamentos] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);
  const carregandoVisivel = useDelayedLoading(carregando);

  function exportarRelatorio() {
    const faturamentoMensal = Number(kpis.faturamentoMensal) || 0;
    const ticketMedio = Number(kpis.ticketMedio) || 0;
    const totalAtendimentos = procedimentos.reduce(
      (total, procedimento) => total + (Number(procedimento?.quantidade) || 0),
      0,
    );
    const receitaPorServico = procedimentos.map((procedimento) => {
      const quantidade = Number(procedimento?.quantidade) || 0;
      const valorInformado = Number(
        procedimento?.faturamentoEstimado ?? procedimento?.faturamento ?? procedimento?.receita,
      );
      const faturamento = Number.isFinite(valorInformado) && valorInformado > 0
        ? valorInformado
        : (ticketMedio * quantidade) || (totalAtendimentos ? (faturamentoMensal * quantidade) / totalAtendimentos : 0);
      return {
        nome: procedimento?.nome || procedimento?.servico || 'Serviço',
        quantidade,
        faturamento,
      };
    });
    const totalReceitaServicos = receitaPorServico.reduce((total, item) => total + item.faturamento, 0);

    const pagamentos = {};
    agendamentos.forEach((agendamento) => {
      const metodo = agendamento?.tipoPagamento || agendamento?.metodoPagamento || 'Não informado';
      const valor = Number(agendamento?.valor ?? agendamento?.preco ?? agendamento?.valorProcedimento);
      if (!pagamentos[metodo]) pagamentos[metodo] = { quantidade: 0, valor: 0 };
      pagamentos[metodo].quantidade += 1;
      pagamentos[metodo].valor += Number.isFinite(valor) && valor > 0 ? valor : ticketMedio;
    });
    const totalReceitaPagamentos = Object.values(pagamentos).reduce((total, item) => total + item.valor, 0);

    const agora = new Date();
    const dataHora = agora.toLocaleString('pt-BR');
    const planilha = [
      ['BLESSED 7 - EXCELÊNCIA CLÍNICA'],
      ['Relatório Executivo da Dashboard'],
      ['Gerado em', dataHora],
      [],
      ['1. RESUMO DE PERFORMANCE DO MÊS'],
      ['Indicador', 'Valor'],
      ['Faturamento Mensal', faturamentoMensal],
      ['Atendimentos Realizados', Number(kpis.procedimentosMensal) || 0],
      ['Receita Anual', Number(kpis.receitaAnual) || 0],
      ['Ticket Médio por Procedimento', ticketMedio],
      [],
      ['2. DETALHAMENTO DE SERVIÇOS MAIS PRESTADOS'],
      ['Procedimento', 'Quantidade de Atendimentos', 'Faturamento Estimado (R$)', '% da Receita'],
      ...receitaPorServico.map((item) => [
        item.nome,
        item.quantidade,
        item.faturamento,
        totalReceitaServicos ? item.faturamento / totalReceitaServicos : 0,
      ]),
      [],
      ['3. DISTRIBUIÇÃO POR MEIO DE PAGAMENTO'],
      ['Método', 'Percentual (%)', 'Valor Total (R$)'],
      ...Object.entries(pagamentos).map(([metodo, item]) => [
        metodo,
        totalReceitaPagamentos ? item.valor / totalReceitaPagamentos : 0,
        item.valor,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(planilha);
    worksheet['!cols'] = [{ wch: 38 }, { wch: 25 }, { wch: 25 }, { wch: 16 }];
    const moeda = 'R$ #,##0.00';
    [6, 7, 8, 9].forEach((linha) => {
      const celula = worksheet[`B${linha + 1}`];
      if (celula) celula.z = linha === 7 ? '0' : moeda;
    });
    for (let linha = 14; linha < 14 + receitaPorServico.length; linha += 1) {
      if (worksheet[`C${linha}`]) worksheet[`C${linha}`].z = moeda;
      if (worksheet[`D${linha}`]) worksheet[`D${linha}`].z = '0.00%';
    }
    const inicioPagamentos = 17 + receitaPorServico.length;
    for (let linha = inicioPagamentos; linha < inicioPagamentos + Object.keys(pagamentos).length; linha += 1) {
      if (worksheet[`B${linha}`]) worksheet[`B${linha}`].z = '0.00%';
      if (worksheet[`C${linha}`]) worksheet[`C${linha}`].z = moeda;
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório Executivo');
    XLSX.writeFile(workbook, 'Relatorio_Executivo_Blessed7_AGO_2026.xlsx');
  }

  useEffect(() => {
    async function carregarKPIs() {
      try {
        setCarregando(true);
        const [faturamento, procedimentos, receita, ticket] = await Promise.allSettled([
          getFaturamentoMensal(),
          getProcedimentosMensal(),
          getReceitaAnualTotal(),
          getTicketMedio(),
        ]);
        const houveFalha = [faturamento, procedimentos, receita, ticket]
          .some((resultado) => resultado.status === 'rejected');
        if (houveFalha) {
          toast.error('Não foi possível carregar todos os indicadores do dashboard.');
        }
        setKpis({
          faturamentoMensal:  faturamento.status  === 'fulfilled' ? faturamento.value  : null,
          procedimentosMensal:procedimentos.status === 'fulfilled' ? procedimentos.value: null,
          receitaAnual:       receita.status       === 'fulfilled' ? receita.value       : null,
          ticketMedio:        ticket.status        === 'fulfilled' ? ticket.value        : null,
        });
      } catch (e) {
        console.error('Erro ao carregar KPIs do dashboard:', e);
        toast.error('Não foi possível carregar os dados do dashboard.');
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

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                Bem-vindo, {primeiroNome}
              </h1>
              <p className="text-sm text-gray-400 mt-1">Aqui está o resumo da performance clínica de hoje.</p>
            </div>
            <button
              type="button"
              onClick={exportarRelatorio}
              className="flex items-center gap-2 px-4 py-2 mt-1 bg-white border border-[#e8e6d9] text-sm font-semibold text-gray-700 rounded-lg hover:border-[#2C3E2D] transition-colors"
            >
              {iconeExportar} Exportar Relatório
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            <KPI
              rotulo="Faturamento Mensal"
              valor={formatarReais(kpis.faturamentoMensal)}
              carregando={carregandoVisivel}
            />
            <KPI
              rotulo="Procedimentos Mensais"
              valor={kpis.procedimentosMensal ?? '—'}
              carregando={carregandoVisivel}
            />
            <KPI
              rotulo="Receita Anual"
              valor={formatarReais(kpis.receitaAnual)}
              carregando={carregandoVisivel}
            />
            <KPI
              rotulo="Ticket Médio / Procedimento"
              valor={formatarReais(kpis.ticketMedio)}
              carregando={carregandoVisivel}
            />
          </div>

          <div className="grid grid-cols-12 gap-4 mb-4 items-stretch">
            <div className="col-span-12 lg:col-span-8 flex flex-col">
              <GraficoTendenciaFaturamento />
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col">
              <CartaoProcedimentosRealizados onDadosCarregados={setProcedimentos} />
            </div>
          </div>

          <TabelaProximosAgendamentos onDadosCarregados={setAgendamentos} />

        </div>
      </main>
    </div>
  );
}
