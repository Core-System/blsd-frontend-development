import React from 'react';
import { Check } from 'lucide-react';

const passos = [
  { numero: 1, label: 'PROCEDIMENTO', labelMobile: 'Serviço' },
  { numero: 2, label: 'HORÁRIO', labelMobile: 'Horário' },
  { numero: 3, label: 'CONFIRMAÇÃO', labelMobile: 'Confirmar' },
];

export default function IndicadorDePassos({ passoAtual = 1, fundoEscuro = false, onStepClick }) {
  const textoLabel = fundoEscuro ? 'text-[#dfe9df]' : 'text-gray-500';
  const linhaBase = fundoEscuro ? 'bg-white/20' : 'bg-[#dfe6df]';
  const linhaAtiva = fundoEscuro ? 'bg-[#d4b055]' : 'bg-[#2C3E2D]';

  return (
    <div className="flex w-full items-center justify-center gap-0 px-3 py-7 sm:px-6">
      {passos.map((passo, i) => {
        const ativo = passo.numero === passoAtual;
        const concluido = passo.numero < passoAtual;
        const bloqueado = passo.numero > passoAtual;

        return (
          <React.Fragment key={passo.numero}>
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <button
                type="button"
                onClick={() => !bloqueado && onStepClick?.(passo.numero)}
                disabled={bloqueado}
                aria-label={`Passo ${passo.numero}: ${passo.label}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                  ${ativo ? 'bg-[#2C3E2D] text-white shadow-md ring-4 ring-[#d4b055]/30' : concluido ? 'bg-[#2C3E2D] text-white' : fundoEscuro ? 'bg-white/10 text-[#dfe9df]' : 'bg-[#eef1ee] text-gray-500'}
                  ${bloqueado ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-105'}
                `}
                aria-current={ativo ? 'step' : undefined}
              >
                {concluido ? (
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  passo.numero
                )}
              </button>
              <span className={`mt-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.2em] ${ativo ? (fundoEscuro ? 'text-white' : 'text-[#2C3E2D]') : textoLabel}`}>
                <span className="sm:hidden">{passo.labelMobile}</span>
                <span className="hidden sm:inline">{passo.label}</span>
              </span>
            </div>

            {i < passos.length - 1 && (
              <div className={`mx-1 mb-5 h-px w-6 flex-shrink-0 sm:w-24 ${concluido ? linhaAtiva : linhaBase}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
