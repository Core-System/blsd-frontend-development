import React, { useState } from 'react';

const iconeSetaEsquerda = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const iconeSetaDireita = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const DIAS_DA_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const ABRIL_2026 = {
  nome: 'Abril 2026',
  diaInicio: 3,
  totalDias: 30,
  destacados: [9],
  comAgendamentos: [6, 8, 9, 10, 13, 15, 17, 19],
};

export default function CalendarioAgendamento() {
  const [diaSelecionado, setDiaSelecionado] = useState(9);

  const celulas = [];
  for (let i = 0; i < ABRIL_2026.diaInicio; i++) {
    celulas.push({ dia: 30 - ABRIL_2026.diaInicio + i + 1, atual: false });
  }
  for (let d = 1; d <= ABRIL_2026.totalDias; d++) {
    celulas.push({ dia: d, atual: true });
  }

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">{ABRIL_2026.nome}</h3>
        <div className="flex gap-1">
          <button className="p-1.5 rounded-md hover:bg-[#f9f8f2] text-gray-500 hover:text-gray-800 transition-all">
            {iconeSetaEsquerda}
          </button>
          <button className="p-1.5 rounded-md hover:bg-[#f9f8f2] text-gray-500 hover:text-gray-800 transition-all">
            {iconeSetaDireita}
          </button>
        </div>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 mb-2">
        {DIAS_DA_SEMANA.map(d => (
          <div key={d} className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendario */}
      <div className="grid grid-cols-7 gap-y-1">
        {celulas.map((celula, i) => {
          const estaSelecionado = celula.atual && celula.dia === diaSelecionado;
          const temAgendamento = celula.atual && ABRIL_2026.comAgendamentos.includes(celula.dia);
          return (
            <div key={i} className="flex flex-col items-center py-0.5">
              <button
                onClick={() => celula.atual && setDiaSelecionado(celula.dia)}
                className={`w-7 h-7 rounded-full text-[11px] font-medium transition-all relative flex items-center justify-center
                  ${!celula.atual ? 'text-gray-300 cursor-default' : 'cursor-pointer hover:bg-[#f9f8f2]'}
                  ${estaSelecionado ? 'bg-[#2C3E2D] text-white hover:bg-[#2C3E2D] shadow-md' : ''}
                  ${celula.atual && !estaSelecionado ? 'text-gray-700' : ''}
                `}
              >
                {celula.dia}
              </button>
              {temAgendamento && !estaSelecionado && (
                <div className="w-1 h-1 rounded-full bg-[#2C3E2D]/40 mt-0.5" />
              )}
              {!temAgendamento && <div className="w-1 h-1 mt-0.5" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}