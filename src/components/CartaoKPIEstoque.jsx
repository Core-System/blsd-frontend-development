import React from 'react';

const iconeTotal = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round"/>
  </svg>
);
const iconeCritico = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const iconeBaixo = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);
const iconeEntrega = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v3h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const config = {
  total:    { icone: iconeTotal,   cor: 'bg-[#f0f5f0] text-[#2C3E2D]', borda: '' },
  critico:  { icone: iconeCritico, cor: 'bg-red-50 text-red-600',        borda: 'border-l-4 border-l-red-400' },
  baixo:    { icone: iconeBaixo,   cor: 'bg-amber-50 text-amber-600',    borda: 'border-l-4 border-l-amber-400' },
  entrega:  { icone: iconeEntrega, cor: 'bg-[#f5f4ec] text-[#2C3E2D]',  borda: '' },
};

export default function CartaoKPIEstoque({ tipo = 'total', rotulo, valor, destaque = false }) {
  const { icone, cor, borda } = config[tipo] || config.total;
  return (
    <div className={`bg-white border border-[#e8e6d9] rounded-xl p-5 flex items-start gap-4 ${borda}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cor}`}>
        {icone}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{rotulo}</p>
        <p className={`text-2xl font-black leading-none ${destaque ? 'text-red-600' : 'text-gray-900'}`}>
          {valor}
        </p>
      </div>
    </div>
  );
}
