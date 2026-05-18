import React from 'react';

const iconeSeta = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function CartaoAlertaInteligente() {
  return (
    <div className="bg-[#2C3E2D] rounded-xl p-5 text-white flex flex-col justify-between h-full relative overflow-hidden">
      {/* detalhe decorativo */}
      <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/5 pointer-events-none"/>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full bg-white/5 pointer-events-none"/>

      <div>
        <p className="text-[10px] font-bold text-[#a8c5a0] uppercase tracking-widest mb-3">
          Configurações de Alerta Inteligente
        </p>
        <h3 className="text-base font-bold text-white leading-snug mb-2">
          Deseja ser notificado automaticamente quando o estoque atingir o nível crítico?
        </h3>
      </div>

      <button className="mt-4 self-start flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-white/20">
        Configurar Notificações
      </button>

      <button className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
        {iconeSeta}
      </button>
    </div>
  );
}
