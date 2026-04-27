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

export default function CartaoConfirmacaoAgendamento({ procedimento, preco, data, confirmar, loading, erro, horario, local }) {
  return (
    <div className="bg-[#576b5d] rounded-2xl p-7 flex flex-col gap-5 h-full">
      <div className="flex gap-8 flex-1">
        {/* campo esquerdo */}
        <div className="flex flex-col justify-start pt-1">
          <span className="text-[#d4b055] text-[10px] font-bold tracking-widest uppercase">Confirmação</span>
          <h2 className="text-white text-2xl font-bold leading-tight mt-1" style={{ fontFamily: 'Georgia, serif' }}>
            Quase lá...
          </h2>
        </div>

        {/* detalhes */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-start gap-2 text-white">
            <span className="mt-0.5 text-[#d4b055] flex-shrink-0">{iconCheck}</span>
            <span className="text-sm">{procedimento} — <span className="text-[#d4b055] font-semibold">{preco}</span></span>
          </div>
          <div className="flex items-start gap-2 text-white">
            <span className="mt-0.5 text-[#d4b055] flex-shrink-0">{iconCal}</span>
            <span className="text-sm">{data}, às {horario}</span>
          </div>
          <div className="flex items-start gap-2 text-white">
            <span className="mt-0.5 text-[#d4b055] flex-shrink-0">{iconPin}</span>
            <span className="text-sm">{local}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-2">
        <button
          onClick={confirmar}
          disabled={loading}
          className="w-full bg-[#d4b055] hover:bg-[#c9a44a] text-[#2C3E2D] font-bold py-3 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Aguardando...' : 'Confirmar Agendamento'}
        </button>

        {/* mostra erro se houver */}
        {erro && (
          <p className="text-red-300 text-xs text-center">{erro}</p>
        )}
        <p className="text-white/40 text-[10px] text-center leading-relaxed">
          Ao confirmar, você concorda com nossos termos de reserva e política de cancelamento.
        </p>
      </div>
    </div>
  );
}
