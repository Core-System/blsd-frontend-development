import React from 'react';

const iconeTendencia = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
const iconeAmpulheta = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" strokeLinecap="round"/>
  </svg>
);

const MAPA_ICONES = {
  tendencia: iconeTendencia,
  ampulheta: iconeAmpulheta,
};

export default function CartaoKPI({ icone = 'tendencia', valor, unidade, rotulo, descricao }) {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#f0f5f0] flex items-center justify-center text-[#2C3E2D] flex-shrink-0">
        {MAPA_ICONES[icone]}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{rotulo}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-gray-900 leading-none">{valor}</span>
          {unidade && <span className="text-sm text-gray-500 font-medium">{unidade}</span>}
        </div>
        {descricao && (
          <p className="text-[11px] text-gray-400 mt-0.5">{descricao}</p>
        )}
      </div>
    </div>
  );
}