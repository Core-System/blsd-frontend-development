import React from 'react';

const passos = [
  { numero: 1, label: 'PROCEDIMENTO' },
  { numero: 2, label: 'HORÁRIO' },
  { numero: 3, label: 'CONFIRMAÇÃO' },
];

export default function IndicadorDePassos({ passoAtual = 1, fundoEscuro = false, onStepClick }) {
  const textoLabel = fundoEscuro ? 'text-[#dfe9df]' : 'text-gray-500';
  const linhaBase = fundoEscuro ? 'bg-white/20' : 'bg-[#dfe6df]';
  const linhaAtiva = fundoEscuro ? 'bg-[#d4b055]' : 'bg-[#2C3E2D]';

  return (
    <div className="flex items-center justify-center gap-0 py-7 px-6">
      {passos.map((passo, i) => {
        const ativo = passo.numero === passoAtual;
        const concluido = passo.numero < passoAtual;
        const bloqueado = passo.numero > passoAtual;

        return (
          <React.Fragment key={passo.numero}>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => !bloqueado && onStepClick?.(passo.numero)}
                disabled={bloqueado}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                  ${ativo ? 'bg-[#2C3E2D] text-white shadow-md ring-4 ring-[#d4b055]/30' : concluido ? 'bg-[#2C3E2D] text-white' : fundoEscuro ? 'bg-white/10 text-[#dfe9df]' : 'bg-[#eef1ee] text-gray-500'}
                  ${bloqueado ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105'}
                `}
                aria-current={ativo ? 'step' : undefined}
              >
                {concluido ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5L9.5 17L19 7.5" />
                  </svg>
                ) : (
                  passo.numero
                )}
              </button>
              <span className={`text-[9px] font-bold tracking-[0.2em] mt-2 uppercase ${ativo ? (fundoEscuro ? 'text-white' : 'text-[#2C3E2D]') : textoLabel}`}>
                {passo.label}
              </span>
            </div>

            {i < passos.length - 1 && (
              <div className={`h-px w-24 mb-5 mx-1 ${concluido ? linhaAtiva : linhaBase}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
