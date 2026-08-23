import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProximosAgendamentos } from '../services/dashboardService';

const CORES_AVATAR = ['bg-amber-400','bg-blue-400','bg-rose-400','bg-teal-400','bg-purple-400','bg-orange-400'];

const iconeSetaDireita = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const iconePonto = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

function iniciais(nome) {
  return (nome || '?').split(' ').slice(0, 2).map((p) => (p[0] || '').toUpperCase()).join('') || '?';
}

function formatarDataHora(iso) {
  if (!iso) return { data: '—', hora: '—' };
  try {
    const d = new Date(iso);
    if (isNaN(d)) return { data: '—', hora: '—' };
    return {
      data: d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      hora: d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
  } catch {
    return { data: '—', hora: '—' };
  }
}

const badgeProcedimento = 'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e8f5e9] text-[#2C3E2D]';

export default function TabelaProximosAgendamentos({ onDadosCarregados }) {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando]     = useState(true);
  const [erro, setErro]                 = useState(false);

  useEffect(() => {
    getProximosAgendamentos()
      .then((res) => {
        const lista = Array.isArray(res) ? res : [];
        setAgendamentos(lista);
        onDadosCarregados?.(lista);
      })
      .catch((e) => {
        console.error('Erro próximos agendamentos:', e);
        setErro(true);
        onDadosCarregados?.([]);
      })
      .finally(() => setCarregando(false));
  }, []);

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

      <div className="grid grid-cols-[1.4fr_1.6fr_1.2fr_0.5fr] gap-2 pb-2 border-b border-[#f0eeea] mb-1">
        {['Data e Hora', 'Cliente', 'Local', 'Status', 'Ação'].map((col) => (
          <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">{col}</span>
        ))}
      </div>

      {/* skeleton */}
      {carregando && Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="grid grid-cols-[1.4fr_1.6fr_1.2fr_1fr_0.6fr] gap-2 items-center py-3.5 border-b border-[#f5f4f0] last:border-0">
          <div className="px-2 space-y-1.5">
            <div className="h-3 w-24 bg-gray-100 animate-pulse rounded"/>
            <div className="h-2.5 w-16 bg-gray-100 animate-pulse rounded"/>
          </div>
          <div className="flex items-center gap-2 px-2">
            <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse flex-shrink-0"/>
            <div className="h-3 w-28 bg-gray-100 animate-pulse rounded"/>
                    <div className="px-2 h-3 w-16 bg-gray-100 animate-pulse rounded"/>
          </div>
          <div className="px-2 h-3 w-16 bg-gray-100 animate-pulse rounded"/>
          <div className="px-2 h-3 w-4 bg-gray-100 animate-pulse rounded"/>
        </div>
      ))}

      {/* erro */}
      {erro && !carregando && (
        <p className="text-center text-xs text-gray-400 py-8">Não foi possível carregar os agendamentos.</p>
      )}

      {/* vazio */}
      {!carregando && !erro && agendamentos.length === 0 && (
        <p className="text-center text-xs text-gray-400 py-8">Nenhum agendamento próximo encontrado.</p>
      )}

      {/* linhas */}
      {!carregando && !erro && agendamentos.map((a, i) => {
        // Defesa total: garante que nenhum campo undefined causa crash
        const { data, hora } = formatarDataHora(a?.dataHoraInicio);
        const nomeCliente    = a?.nomeCliente || '—';
        const ini            = iniciais(nomeCliente);
        const cor            = CORES_AVATAR[i % CORES_AVATAR.length];
        const local          = a?.localConsulta === 'CLINICA' ? 'Clínica' : 'Domicílio';
  const status         = a?.statusConsulta || 'AGUARDANDO';
  const statusExibir   = status === 'CONFIRMADA' ? 'Confirmado' : status === 'CONCLUIDA' ? 'Concluído' : 'Aguardando';
  const statusCor      = status === 'CONFIRMADA' ? 'bg-green-100 text-green-700' : status === 'CONCLUIDA' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700';
  const localCor       = a?.localConsulta === 'CLINICA' ? 'bg-slate-100 text-slate-700' : 'bg-purple-100 text-purple-700';

        return (
          <div
            key={a?.consultaId ?? i}
            className="grid grid-cols-[1.4fr_1.6fr_1.2fr_1fr_0.6fr] gap-2 items-center py-3.5 border-b border-[#f5f4f0] last:border-0 hover:bg-[#fafaf7] rounded-lg px-1 transition-colors"
          >
            <div className="px-2">
              <p className="text-xs font-semibold text-gray-800">{data}</p>
              <p className="text-[10px] text-gray-400">{hora}</p>
            </div>

            <div className="flex items-center gap-2 px-2">
              {a?.urlFotoCliente ? (
                <img src={a.urlFotoCliente} alt={nomeCliente}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className={`w-7 h-7 rounded-full ${cor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[10px] font-bold text-white">{ini}</span>
                </div>
              )}
              <span className="text-xs font-semibold text-gray-800">{nomeCliente}</span>
            </div>


            <div className="px-2">
              <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold ${localCor}`}>
                {local}
              </span>
            </div>

            <div className="px-2">
              <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-bold ${statusCor}`}>
                {statusExibir}
              </span>
            </div>

            <div className="px-2 flex gap-1">
              <button title="Editar" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" aria-label="Editar">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button title="Mais opções" className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors" aria-label="Mais opções">
                {iconePonto}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
