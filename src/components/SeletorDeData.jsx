import React, { useState } from 'react';

const DIAS_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

// Abril 2026: começa na quarta (índice 3), 30 dias
const diasAbril = () => {
  const diasAnteriores = [27, 28, 29, 30, 31];
  const diasMes = Array.from({ length: 30 }, (_, i) => i + 1);
  // preenche até completar a grade
  const total = diasAnteriores.length + diasMes.length;
  const resto = total % 7 === 0 ? 0 : 7 - (total % 7);
  const diasPosteriores = Array.from({ length: resto }, (_, i) => i + 1);
  return { diasAnteriores, diasMes, diasPosteriores };
};

export default function SeletorDeData({ dataSelecionada, aoSelecionarData }) {
  const { diasAnteriores, diasMes, diasPosteriores } = diasAbril();

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#2C3E2D]">Abril 2026</span>
        <div className="flex gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 text-sm">‹</button>
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 text-sm">›</button>
        </div>
      </div>

      {/* dias da semana */}
      <div className="grid grid-cols-7 gap-0">
        {DIAS_SEMANA.map(d => (
          <div key={d} className="text-center text-[9px] font-bold text-gray-400 uppercase py-1">{d}</div>
        ))}
      </div>

      {/* calendario */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {diasAnteriores.map((d, i) => (
          <div key={`prev-${i}`} className="flex items-center justify-center h-8">
            <span className="text-[11px] text-gray-300">{d}</span>
          </div>
        ))}
        {diasMes.map(d => {
          const selecionado = dataSelecionada === d;
          return (
            <div key={d} className="flex items-center justify-center h-8">
              <button
                onClick={() => aoSelecionarData(d)}
                className={`w-7 h-7 flex items-center justify-center rounded text-[11px] font-medium transition-all
                  ${selecionado
                    ? 'bg-[#576b5d] text-white font-bold rounded-md'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {d}
              </button>
            </div>
          );
        })}
        {diasPosteriores.map((d, i) => (
          <div key={`next-${i}`} className="flex items-center justify-center h-8">
            <span className="text-[11px] text-gray-300">{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
