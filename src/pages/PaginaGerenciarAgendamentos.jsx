import React, { useEffect, useState, useMemo } from 'react';
import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import BarraFiltrosAgendamento from '../components/BarraFiltrosAgendamento';
import CalendarioAgendamento from '../components/CalendarioAgendamento';
import CartaoVisaoGeral from '../components/CartaoVisaoGeral';
import CartaoListaAgendamentos from '../components/CartaoListaAgendamentos';
import CartaoKPI from '../components/CartaoKPI';
import { listarClientes } from '../services/clienteService';
import { listarTodasConsultas } from '../services/gerencAgendamentoService';

const iconCalendar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
  </svg>
);

function getMesAno(date) {
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

export default function PaginaGerenciarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando]     = useState(true);
  const [erro, setErro]                 = useState(null);

  // filtros controlados
  const [filtroPaciente,    setFiltroPaciente]    = useState('');
  const [filtroPeriodo,     setFiltroPeriodo]     = useState('Todos os dias');
  const [filtroProcedimento,setFiltroProcedimento]= useState('Todos');
  const [filtroStatus,      setFiltroStatus]      = useState('Ver todos');

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const clientes = await listarClientes();
        const todas    = await listarTodasConsultas(clientes);
        // Ordena por data decrescente
        todas.sort((a, b) => new Date(b.dataHoraInicio) - new Date(a.dataHoraInicio));
        setAgendamentos(todas);
      } catch (e) {
        console.error('Erro ao carregar agendamentos:', e);
        setErro('Não foi possível carregar os agendamentos.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // ── Filtragem local ──
  const filtrados = useMemo(() => {
    const agora = new Date();
    return agendamentos.filter((a) => {
      const nome = a.cliente?.nome?.toLowerCase() || '';
      if (filtroPaciente && !nome.includes(filtroPaciente.toLowerCase())) return false;

      if (filtroStatus !== 'Ver todos') {
        const mapStatus = { Confirmado: 'PENDENTE', Pendente: 'PENDENTE', Completo: 'CONCLUIDA', Cancelado: 'CANCELADA' };
        if ((a.status || 'PENDENTE') !== (mapStatus[filtroStatus] || filtroStatus.toUpperCase())) return false;
      }

      if (filtroProcedimento !== 'Todos') {
        const servicos = (a.servicos || []).join(' ').toLowerCase();
        if (!servicos.includes(filtroProcedimento.toLowerCase())) return false;
      }

      if (filtroPeriodo !== 'Todos os dias') {
        const data = new Date(a.dataHoraInicio);
        if (filtroPeriodo === 'Hoje') {
          if (data.toDateString() !== agora.toDateString()) return false;
        } else if (filtroPeriodo === 'Esta semana') {
          const diffDias = (data - agora) / (1000 * 60 * 60 * 24);
          if (diffDias < -7 || diffDias > 7) return false;
        } else if (filtroPeriodo === 'Este mês') {
          if (data.getMonth() !== agora.getMonth() || data.getFullYear() !== agora.getFullYear()) return false;
        }
      }
      return true;
    });
  }, [agendamentos, filtroPaciente, filtroPeriodo, filtroProcedimento, filtroStatus]);

  // ── KPIs derivados ──
  const procedimentoTop = useMemo(() => {
    const contagem = {};
    agendamentos.forEach((a) => {
      (a.servicos || []).forEach((s) => { contagem[s] = (contagem[s] || 0) + 1; });
    });
    const top = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0];
    return top ? top[0] : '—';
  }, [agendamentos]);

  const mesAtual = getMesAno(new Date());
  const mesCapitalizado = mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1);

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />

      <main className="ml-[152px] min-h-screen bg-[#f5f4ec]">
        <div className="max-w-[1300px] mx-auto px-6 py-7">

          {/* Cabeçalho */}
          <div className="flex items-start justify-between mb-5">
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
                <span>{mesCapitalizado}</span>
              </div>
            </div>
          </div>

          {/* erro */}
          {erro && (
            <div className="mb-4 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">{erro}</div>
          )}

          {/* filtros */}
          <div className="mb-5">
            <BarraFiltrosAgendamento
              paciente={filtroPaciente}      onPaciente={setFiltroPaciente}
              periodo={filtroPeriodo}         onPeriodo={setFiltroPeriodo}
              procedimento={filtroProcedimento} onProcedimento={setFiltroProcedimento}
              status={filtroStatus}           onStatus={setFiltroStatus}
            />
          </div>

          {/* calendário + lista */}
          <div className="grid grid-cols-12 gap-4 mb-4">
            <div className="col-span-12 lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
              <CalendarioAgendamento agendamentos={agendamentos} />
              <CartaoVisaoGeral
                total={filtrados.length}
                procedimentoTop={procedimentoTop}
                carregando={carregando}
              />
            </div>
            <div className="col-span-12 lg:col-span-8 xl:col-span-9">
              <CartaoListaAgendamentos
                agendamentos={filtrados}
                carregando={carregando}
              />
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6">
              <CartaoKPI
                icone="tendencia"
                valor={carregando ? '...' : `${agendamentos.length}`}
                rotulo="Total de Agendamentos"
                descricao="no histórico completo"
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <CartaoKPI
                icone="ampulheta"
                valor={carregando ? '...' : `${filtrados.filter(a => (a.status || 'PENDENTE') === 'PENDENTE').length}`}
                unidade="pendentes"
                rotulo="Agendamentos Pendentes"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
