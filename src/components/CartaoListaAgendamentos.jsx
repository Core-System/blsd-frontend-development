import React, { useState } from 'react';
import ModalDetalhesAgendamento from './ModalDetalhesAgendamento';

const iconeOpcoes = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

/* ── Avatar neutro ── */
function AvatarNeutro({ tamanho = 28 }) {
  return (
    <div
      className="rounded-full bg-[#e8e6d9] flex items-center justify-center flex-shrink-0"
      style={{ width: tamanho, height: tamanho, minWidth: tamanho }}
    >
      <svg width={tamanho * 0.55} height={tamanho * 0.55} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.8}>
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
      </svg>
    {agendamentoDetalhes && (
      <ModalDetalhesAgendamento
        agendamento={agendamentoDetalhes}
        onFechar={() => setAgendamentoDetalhes(null)}
      />
    )}
    </div>
  );
}

const ESTILOS_STATUS = {
  PENDENTE:  'bg-amber-50 text-amber-700 border border-amber-200',
  CONCLUIDA: 'bg-blue-50 text-blue-700 border border-blue-200',
  CANCELADA: 'bg-red-50 text-red-700 border border-red-200',
};
const PONTO_STATUS = {
  PENDENTE:  'bg-amber-500',
  CONCLUIDA: 'bg-blue-500',
  CANCELADA: 'bg-red-500',
};
const LABEL_STATUS = {
  PENDENTE:  'PENDENTE',
  CONCLUIDA: 'COMPLETO',
  CANCELADA: 'CANCELADO',
};

function formatarDataHora(iso) {
  if (!iso) return { data: '—', hora: '—' };
  const d = new Date(iso);
  const data = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return { data, hora };
}

export default function CartaoListaAgendamentos({ agendamentos = [], carregando = false, filtros = {} }) {
  const [menuAberto, setMenuAberto] = useState(null);
  const [agendamentoDetalhes, setAgendamentoDetalhes] = useState(null);

  const filtrados = agendamentos.filter((a) => {
    const nome = a.cliente?.nome?.toLowerCase() || '';
    const buscaNome = filtros.paciente ? nome.includes(filtros.paciente.toLowerCase()) : true;

    const status = a.status || 'PENDENTE';
    const buscaStatus = filtros.status && filtros.status !== 'Ver todos'
      ? status === filtros.status.toUpperCase()
      : true;

    const servicos = (a.servicos || []).join(' ').toLowerCase();
    const buscaServico = filtros.procedimento && filtros.procedimento !== 'Todos'
      ? servicos.includes(filtros.procedimento.toLowerCase())
      : true;

    return buscaNome && buscaStatus && buscaServico;
  });

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0ede0]">
        <div>
          <h2 className="text-base font-bold text-gray-800">Lista de</h2>
          <p className="text-base font-bold text-gray-800 -mt-0.5">Agendamentos</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#faf9f3]">
              {['DATA & HORA', 'CLIENTE', 'PROCEDIMENTO', 'STATUS', 'AÇÕES'].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f3e8]">

            {/* skeleton */}
            {carregando && Array.from({ length: 4 }).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 bg-gray-100 animate-pulse rounded"/>
                    <div className="h-2.5 w-16 bg-gray-100 animate-pulse rounded"/>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse flex-shrink-0"/>
                    <div className="h-3 w-28 bg-gray-100 animate-pulse rounded"/>
                  </div>
                </td>
                <td className="px-6 py-4"><div className="h-6 w-32 bg-gray-100 animate-pulse rounded-md"/></td>
                <td className="px-6 py-4"><div className="h-6 w-24 bg-gray-100 animate-pulse rounded-md"/></td>
                <td className="px-6 py-4"><div className="h-3 w-4 bg-gray-100 animate-pulse rounded"/></td>
              </tr>
            ))}

            {/* vazio */}
            {!carregando && filtrados.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                  Nenhum agendamento encontrado.
                </td>
              </tr>
            )}

            {/* linhas */}
            {!carregando && filtrados.map((a, i) => {
              const { data, hora } = formatarDataHora(a.dataHoraInicio);
              const nomeCliente = a.cliente?.nome || '—';
              const status = a.status || 'PENDENTE';
              const procedimento = a.servicos?.[0]?.toUpperCase() || '—';

              return (
                <tr key={a.id} className="hover:bg-[#fdfcf7] transition-colors group">
                  {/* Data & Hora */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-xs font-semibold text-gray-800">{data}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{hora}</p>
                  </td>

                  {/* Cliente */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <AvatarNeutro tamanho={28} />
                      <span className="text-xs font-medium text-gray-800 whitespace-nowrap">{nomeCliente}</span>
                    </div>
                  </td>

                  {/* Procedimento */}
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap bg-[#eef4ee] text-[#2C3E2D] border border-[#c8dbc8]">
                      {procedimento}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap ${ESTILOS_STATUS[status] || ESTILOS_STATUS.PENDENTE}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${PONTO_STATUS[status] || PONTO_STATUS.PENDENTE}`}/>
                      {LABEL_STATUS[status] || status}
                    </span>
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setMenuAberto(menuAberto === a.id ? null : a.id)}
                        className="p-1.5 rounded-md hover:bg-[#f0ede0] text-gray-400 hover:text-gray-700 transition-all"
                      >
                        {iconeOpcoes}
                      </button>
                      {menuAberto === a.id && (
                        <div className="absolute right-0 top-7 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[130px]">
                          <button onClick={() => { setAgendamentoDetalhes(a); setMenuAberto(null); }} className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">Ver detalhes</button>
                          <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">Remarcar</button>
                          <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">Cancelar</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* rodapé */}
      {!carregando && filtrados.length > 0 && (
        <div className="px-6 py-3 border-t border-[#f0eeea]">
          <p className="text-[11px] text-gray-400">
            Exibindo {filtrados.length} agendamento{filtrados.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    {agendamentoDetalhes && (
      <ModalDetalhesAgendamento
        agendamento={agendamentoDetalhes}
        onFechar={() => setAgendamentoDetalhes(null)}
      />
    )}
    </div>
  );
}
