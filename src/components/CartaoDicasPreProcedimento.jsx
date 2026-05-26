import React from 'react';

export default function CartaoDicasPreProcedimento({ aoClicar }) {
  return (
    <div className="bg-[#4a5e50] rounded-2xl p-7 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-white text-3xl font-bold leading-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Acesse dicas!
        </h2>
        <p className="text-white/75 text-sm leading-relaxed">
          Acesse o link para encontrar dicas e indicações para o pré-procedimento,
          sem pensando na sua melhor experiência.
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <button 
          onClick={aoClicar}
          className="w-max bg-[#d4b055] hover:bg-[#c9a44a] text-[#2C3E2D] font-bold py-2 px-6 rounded-lg text-sm transition-colors mt-auto"
        >
          Acessar dicas
        </button>
      </div>
    </div>
  );
}
