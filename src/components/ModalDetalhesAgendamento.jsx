import React, { useEffect } from 'react';

const iconeFechar = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const iconeCalendario = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
  </svg>
);
const iconeRelogio = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const iconeLocal = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const iconePagamento = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="1" y="4" width="22" height="16" rx="2"/>
    <line x1="1" y1="10" x2="23" y2="10"/>
  </svg>
);
const iconeServico = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
  </svg>
);
const iconeCliente = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
  </svg>
);

const CORES_AVATAR = ['bg-amber-400','bg-blue-400','bg-rose-400','bg-teal-400','bg-purple-400','bg-orange-400'];

const LABEL_STATUS = {
  PENDENTE:  { label: 'Pendente',  bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500'  },
  CONCLUIDA: { label: 'Concluído', bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  CANCELADA: { label: 'Cancelado', bg: 'bg-red-50',    text: 'text-red-700',    dot: 'bg-red-500'    },
};

const LABEL_PAGAMENTO = {
  PIX: 'Pix', CREDITO: 'Cartão de Crédito',
  DEBITO: 'Cartão de Débito', DINHEIRO: 'Dinheiro',
};

function formatarData(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return '—'; }
}

function formatarHora(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } catch { return '—'; }
}

function iniciais(nome) {
  return (nome || '?').split(' ').slice(0, 2).map(p => (p[0] || '').toUpperCase()).join('') || '?';
}

function InfoLinha({ icone, label, valor }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#f0eeea] last:border-0">
      <div className="w-7 h-7 rounded-lg bg-[#f0f5f0] flex items-center justify-center text-[#2C3E2D] flex-shrink-0 mt-0.5">
        {icone}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5">{valor}</p>
      </div>
    </div>
  );
}

export default function ModalDetalhesAgendamento({ agendamento, onFechar }) {
  // Fecha ao apertar Esc
  useEffect(() => {
    function handler(e) { if (e.key === 'Escape') onFechar(); }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onFechar]);

  if (!agendamento) return null;

  const a           = agendamento;
  const cliente     = a.cliente || {};
  const status      = a.status || 'PENDENTE';
  const st          = LABEL_STATUS[status] || LABEL_STATUS.PENDENTE;
  const cor         = CORES_AVATAR[(cliente.id || 0) % CORES_AVATAR.length];
  const ini         = iniciais(cliente.nome);
  const servicos    = Array.isArray(a.servicos) ? a.servicos : [];
  const duracao     = a.dataHoraInicio && a.dataHoraFim
    ? Math.round((new Date(a.dataHoraFim) - new Date(a.dataHoraInicio)) / 60000) + ' min'
    : '—';

  return (
    /* overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onFechar(); }}
    >
      {/* fundo escuro */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"/>

      {/* card */}
      <div className="relative bg-[#f5f4ec] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">

        {/* cabeçalho verde */}
        <div className="bg-[#2C3E2D] px-6 pt-6 pb-8 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none"/>
          <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none"/>

          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-[10px] font-bold text-[#a8c5a0] uppercase tracking-widest mb-1">
                Agendamento #{a.id}
              </p>
              <h2 className="text-lg font-black text-white leading-tight">Detalhes do Agendamento</h2>
            </div>
            <button
              onClick={onFechar}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"
            >
              {iconeFechar}
            </button>
          </div>

          {/* avatar + nome do cliente */}
          <div className="flex items-center gap-3 mt-5 relative z-10">
            {cliente.urlFoto ? (
              <img src={cliente.urlFoto} alt={cliente.nome}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/30"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className={`w-11 h-11 rounded-full ${cor} flex items-center justify-center border-2 border-white/30 flex-shrink-0`}>
                <span className="text-sm font-bold text-white">{ini}</span>
              </div>
            )}
            <div>
              <p className="text-white font-bold text-sm">{cliente.nome || '—'}</p>
              <p className="text-[#a8c5a0] text-xs">{cliente.email || '—'}</p>
            </div>
            {/* badge status */}
            <div className="ml-auto">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.bg} ${st.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/>
                {st.label}
              </span>
            </div>
          </div>
        </div>

        {/* corpo */}
        <div className="px-6 py-2 bg-white mx-4 -mt-4 rounded-xl shadow-sm">
          <InfoLinha
            icone={iconeCalendario}
            label="Data"
            valor={formatarData(a.dataHoraInicio)}
          />
          <InfoLinha
            icone={iconeRelogio}
            label="Horário"
            valor={`${formatarHora(a.dataHoraInicio)} – ${formatarHora(a.dataHoraFim)} (${duracao})`}
          />
          <InfoLinha
            icone={iconeLocal}
            label="Local"
            valor={a.localConsulta === 'CLINICA' ? 'Clínica' : a.localConsulta === 'DOMICILIO' ? 'Domicílio' : '—'}
          />
          <InfoLinha
            icone={iconePagamento}
            label="Pagamento"
            valor={LABEL_PAGAMENTO[a.tipoPagamento] || a.tipoPagamento || '—'}
          />
          <InfoLinha
            icone={iconeServico}
            label={`Procedimento${servicos.length !== 1 ? 's' : ''}`}
            valor={servicos.length > 0 ? servicos.join(', ') : '—'}
          />
          {cliente.telefone && (
            <InfoLinha
              icone={iconeCliente}
              label="Telefone"
              valor={cliente.telefone}
            />
          )}
        </div>

        {/* avaliação */}
        {a.avaliacao && (
          <div className="mx-4 mt-3 px-4 py-3 bg-[#f0f5f0] border border-[#dce8dc] rounded-xl">
            <p className="text-[10px] font-bold text-[#2C3E2D] uppercase tracking-widest mb-1">Avaliação</p>
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24"
                  fill={i < (a.avaliacao.nota || 0) ? '#B8982A' : 'none'}
                  stroke="#B8982A" strokeWidth={2}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
              <span className="text-xs font-bold text-[#2C3E2D] ml-1">{a.avaliacao.nota}/5</span>
            </div>
            {a.avaliacao.descricacao && (
              <p className="text-xs text-gray-600 italic">"{a.avaliacao.descricacao}"</p>
            )}
          </div>
        )}

        {/* rodapé */}
        <div className="px-6 py-4">
          <button
            onClick={onFechar}
            className="w-full py-2.5 bg-[#2C3E2D] hover:bg-[#1a2a1b] text-white text-sm font-bold rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
