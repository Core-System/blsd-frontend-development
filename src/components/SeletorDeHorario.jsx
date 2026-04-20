import React from 'react';

const horarios = ['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'];

const iconRelogio = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2" strokeLinecap="round"/>
  </svg>
);

export default function SeletorDeHorario({ horarioSelecionado, aoSelecionarHorario }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm h-full">
      <div className="flex items-center gap-2 text-[#2C3E2D]">
        {iconRelogio}
        <span className="text-sm font-semibold">Horários Disponíveis</span>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        {horarios.map(h => {
          const selecionado = horarioSelecionado === h;
          return (
            <button
              key={h}
              onClick={() => aoSelecionarHorario(h)}
              className={`py-2.5 rounded-lg text-sm font-medium transition-all border
                ${selecionado
                  ? 'bg-[#576b5d] text-white border-[#576b5d]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#576b5d] hover:text-[#576b5d]'
                }
              `}
            >
              {h}
            </button>
          );
        })}
      </div>
    </div>
  );
}
