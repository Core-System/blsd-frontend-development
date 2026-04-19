import React from 'react';

const iconeSeta = (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CartaoRelatorioDetalhado() {
  return (
    <div className="bg-[#536D5D] rounded-xl p-5 flex items-center justify-between relative overflow-hidden group cursor-pointer hover:bg-[#243325] transition-colors">
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -right-2 -bottom-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative z-10">
        <p className="text-[10px] font-bold text-[#a8c5a0] uppercase tracking-[0.15em] mb-1">
          Relatórios Detalhados
        </p>
        <p className="text-white font-bold text-sm">Análise de Performance</p>
      </div>

      <div className="relative z-10 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-white/25 transition-all">
        {iconeSeta}
      </div>
    </div>
  );
}