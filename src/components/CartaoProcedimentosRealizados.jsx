import React from 'react';
import GraficoReceitaAnual from './GraficoReceitaAnual';

const procedimentos = [
  { nome: 'BOTOX FACIAL',       pct: 42, cor: '#2C3E2D' },
  { nome: 'PEELING QUÍMICO',    pct: 28, cor: '#2C3E2D' },
  { nome: 'PREENCHIMENTO LABIAL', pct: 15, cor: '#2C3E2D' },
];

export default function CartaoProcedimentosRealizados() {
  return (
    <div className="bg-[#f0f5f0] border border-[#dce8dc] rounded-xl p-5 flex flex-col flex-1 h-full gap-5">
      <div>
        <h2 className="text-sm font-bold text-[#2C3E2D] mb-4">Procedimentos mais Realizados</h2>
        <div className="space-y-3">
          {procedimentos.map((p) => (
            <div key={p.nome}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-[#2C3E2D] tracking-widest">{p.nome}</span>
                <span className="text-[10px] font-bold text-[#2C3E2D]">{p.pct}%</span>
              </div>
              <div className="h-1.5 bg-[#c8dac8] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#2C3E2D]"
                  style={{ width: `${p.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#c8dac8] pt-4">
        <GraficoReceitaAnual />
      </div>
    </div>
  );
}
