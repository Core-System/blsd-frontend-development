import React from 'react';

const iconCheck = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="12" cy="12" r="10" strokeOpacity=".4"/>
    <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const iconCal = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
  </svg>
);
const iconPin = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M12 22s-8-5.686-8-12a8 8 0 1 1 16 0c0 6.314-8 12-8 12z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function CartaoConfirmacaoAgendamento({ procedimento, preco, data, confirmar, loading, erro, horario, local, observacoes }) {
  return (
    <div className="h-full rounded-[2rem] bg-[#2D4336] p-6 text-white shadow-[0_24px_60px_rgba(45,67,54,0.2)] ring-1 ring-[#365145]">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4b055]">Recibo</p>
          <h2 className="mt-2 text-2xl font-semibold" style={{ fontFamily: 'Georgia, serif' }}>Resumo do agendamento</h2>
        </div>
        <div className="rounded-full bg-[#d4b055]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#f0d79b]">
          Confirmado
        </div>
      </div>

      <div className="space-y-4 text-sm text-white/90">
        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <span className="mt-0.5 text-[#d4b055]">{iconCheck}</span>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Serviço</p>
            <p className="mt-1 font-medium">{procedimento} <span className="text-[#d4b055] font-semibold">{preco}</span></p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <span className="mt-0.5 text-[#d4b055]">{iconCal}</span>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Data e horário</p>
            <p className="mt-1 font-medium">{data}, às {horario}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <span className="mt-0.5 text-[#d4b055]">{iconPin}</span>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Local</p>
            <p className="mt-1 font-medium">{local}</p>
          </div>
        </div>

        {observacoes && (
          <div className="rounded-2xl border border-dashed border-[#d4b055]/50 bg-[#d4b055]/5 p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0d79b]">Observações</p>
            <p className="mt-1 text-sm text-white/90">{observacoes}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={confirmar}
          disabled={loading}
          className="w-full rounded-xl bg-[#d4b055] px-4 py-3 text-sm font-bold text-[#2D4336] transition hover:bg-[#caa94a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Aguardando confirmação...' : 'Confirmar agendamento'}
        </button>

        {erro && <p className="text-center text-xs text-red-200">{erro}</p>}
        <p className="text-center text-[10px] uppercase tracking-[0.16em] text-white/50">
          Política de cancelamento e confirmação por e-mail
        </p>
      </div>
    </div>
  );
}
