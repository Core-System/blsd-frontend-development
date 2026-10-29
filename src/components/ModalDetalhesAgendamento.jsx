import React, { useEffect } from 'react';
import { CalendarDays, Circle, CreditCard, MapPin, Scissors, Star, UserRound, X, Clock3 } from 'lucide-react';

const iconProps = { size: 15, strokeWidth: 2, 'aria-hidden': true };
const iconeFechar = <X size={16} strokeWidth={2.5} aria-hidden="true" />;
const iconeCalendario = <CalendarDays {...iconProps} />;
const iconeRelogio = <Clock3 {...iconProps} />;
const iconeLocal = <MapPin {...iconProps} />;
const iconePagamento = <CreditCard {...iconProps} />;
const iconeServico = <Scissors {...iconProps} />;
const iconeCliente = <UserRound {...iconProps} />;

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onFechar(); }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"/>

      <div className="relative bg-[#f5f4ec] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">

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
            <div className="ml-auto">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${st.bg} ${st.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/>
                {st.label}
              </span>
            </div>
          </div>
        </div>

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

        {a.avaliacao && (
          <div className="mx-4 mt-3 px-4 py-3 bg-[#f0f5f0] border border-[#dce8dc] rounded-xl">
            <p className="text-[10px] font-bold text-[#2C3E2D] uppercase tracking-widest mb-1">Avaliação</p>
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill={i < (a.avaliacao.nota || 0) ? '#B8982A' : 'none'} stroke="#B8982A" strokeWidth={2} aria-hidden="true" />
              ))}
              <span className="text-xs font-bold text-[#2C3E2D] ml-1">{a.avaliacao.nota}/5</span>
            </div>
            {a.avaliacao.descricacao && (
              <p className="text-xs text-gray-600 italic">"{a.avaliacao.descricacao}"</p>
            )}
          </div>
        )}

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
