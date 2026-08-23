import React from 'react';

export default function CartaoDicasPreProcedimento({ aoClicar }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#4a5e50] px-5 py-4">
      <div className="min-w-0">
        <h2 className="text-lg font-bold leading-tight text-white" style={{ fontFamily: 'Georgia, serif' }}>
          Acesse dicas!
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-white/75">
          Recomendações para uma melhor experiência.
        </p>
      </div>
      <div className="flex flex-shrink-0 justify-end">
        <button 
          onClick={aoClicar}
          className="w-max rounded-lg bg-[#d4b055] px-4 py-2 text-xs font-bold text-[#2C3E2D] transition-colors hover:bg-[#c9a44a]"
        >
          Acessar dicas
        </button>
      </div>
    </div>
  );
}
