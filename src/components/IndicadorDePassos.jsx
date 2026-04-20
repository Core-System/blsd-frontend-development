import React from 'react';

const passos = [
  { numero: 1, label: 'PROCEDIMENTO' },
  { numero: 2, label: 'HORÁRIO' },
  { numero: 3, label: 'CONFIRMAÇÃO' },
];

export default function IndicadorDePassos({ passoAtual = 1, fundoEscuro = false }) {
  const textoLabel = fundoEscuro ? 'text-[#a8c5a0]' : 'text-gray-400';
  const linhaBase = fundoEscuro ? 'bg-white/20' : 'bg-gray-200';
  const linhaAtiva = fundoEscuro ? 'bg-white/60' : 'bg-[#2C3E2D]';

  return (
    <div className="flex items-center justify-center gap-0 py-6 px-6">
      {passos.map((passo, i) => {
        const ativo = passo.numero === passoAtual;
        const concluido = passo.numero < passoAtual;

        return (
          <React.Fragment key={passo.numero}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${ativo ? 'bg-[#2C3E2D] text-white shadow-md' : concluido ? 'bg-[#2C3E2D]/60 text-white' : fundoEscuro ? 'bg-white/20 text-white/50' : 'bg-gray-200 text-gray-400'}
                `}
              >
                {passo.numero}
              </div>
              <span className={`text-[9px] font-bold tracking-widest mt-1.5 ${ativo ? (fundoEscuro ? 'text-white' : 'text-[#2C3E2D]') : textoLabel}`}>
                {passo.label}
              </span>
            </div>

            {i < passos.length - 1 && (
              <div className={`h-px w-28 mb-5 mx-1 ${concluido ? linhaAtiva : linhaBase}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
