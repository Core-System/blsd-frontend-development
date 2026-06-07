import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProximosAgendamentos } from '../services/dashboardService';

const iconeSetaDireita = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const iconePonto = (
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
    </div>
  );
}

function formatarDataHora(dataHoraISO) {
  if (!dataHoraISO) return { data: '—', hora: '—' };
  const d = new Date(dataHoraISO);
  const data = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  const hora = d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return { data, hora };
}

export default function TabelaProximosAgendamentos() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getProximosAgendamentos();
        setAgendamentos(data);
      } catch (e) {
        console.error('Erro ao carregar próximos agendamentos:', e);
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
      {/* cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Próximos Agendamentos</h2>
        <button
          onClick={() => navigate('/agendamentos')}
          className="flex items-center gap-1.5 text-[11px] font-bold text-[#2C3E2D] hover:text-[#1a2a1b] uppercase tracking-widest transition-colors"
        >
          Ver todos {iconeSetaDireita}
        </button>
      </div>

      {/* colunas */}
      <div className="grid grid-cols-[1.4fr_1.6fr_1.2fr_0.5fr] gap-2 pb-2 border-b border-[#f0eeea] mb-1">
        {['Data e Hora', 'Cliente', 'Status', 'Ação'].map((col) => (
          <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">{col}</span>
        ))}
      </div>

      {/* loading skeleton */}
      {carregando && (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="grid grid-cols-[1.4fr_1.6fr_1.2fr_0.5fr] gap-2 items-center py-3.5 border-b border-[#f5f4f0] last:border-0">
            <div className="px-2 space-y-1.5">
              <div className="h-3 w-24 bg-gray-100 animate-pulse rounded"/>
              <div className="h-2.5 w-16 bg-gray-100 animate-pulse rounded"/>
            </div>
            <div className="flex items-center gap-2 px-2">
              <div className="w-7 h-7 rounded-full bg-gray-100 animate-pulse flex-shrink-0"/>
              <div className="h-3 w-28 bg-gray-100 animate-pulse rounded"/>
            </div>
            <div className="px-2 h-3 w-16 bg-gray-100 animate-pulse rounded"/>
            <div className="px-2 h-3 w-4 bg-gray-100 animate-pulse rounded"/>
          </div>
        ))
      )}

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
        const { data, hora } = formatarDataHora(a.dataHoraInicio);

        return (
          <div
            key={a.consultaId}
            className="grid grid-cols-[1.4fr_1.6fr_1.2fr_0.5fr] gap-2 items-center py-3.5 border-b border-[#f5f4f0] last:border-0 hover:bg-[#fafaf7] rounded-lg px-1 transition-colors"
          >
            {/* data e hora */}
            <div className="px-2">
              <p className="text-xs font-semibold text-gray-800">{data}</p>
              <p className="text-[10px] text-gray-400">{hora}</p>
            </div>

            {/* cliente */}
            <div className="flex items-center gap-2 px-2">
              <AvatarNeutro tamanho={28} />
              <span className="text-xs font-semibold text-gray-800">{a.nomeCliente}</span>
            </div>

            {/* local */}
            <div className="px-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"/>
              <span className="text-xs font-semibold text-green-600">
                {a.localConsulta === 'CLINICA' ? 'Clínica' : 'Domicílio'}
              </span>
            </div>

            {/* ação */}
            <div className="px-2 text-gray-400 hover:text-gray-700 cursor-pointer">
              {iconePonto}
            </div>
          </div>
        );
      })}
    </div>
  );
}
