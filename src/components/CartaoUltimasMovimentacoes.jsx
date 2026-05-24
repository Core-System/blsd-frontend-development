import React from 'react';

const iconeEntrada = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="5 12 12 5 19 12"/>
  </svg>
);
const iconeSaida = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

const movimentacoes = [
  { tipo: 'entrada', produto: 'Toxina Botulínica', data: 'Hoje, 09:13', quantidade: '+10 un.' },
  { tipo: 'saida',   produto: 'Ácido Hialurônico', data: 'Ontem, 16:47', quantidade: '-2 un.' },
];

export default function CartaoUltimasMovimentacoes() {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">Últimas Movimentações</h2>
      <div className="space-y-3">
        {movimentacoes.map((m, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-[#f0eeea] last:border-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.tipo === 'entrada' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
            }`}>
              {m.tipo === 'entrada' ? iconeEntrada : iconeSaida}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {m.tipo === 'entrada' ? 'Entrada: ' : 'Saída: '}{m.produto}
              </p>
              <p className="text-[11px] text-gray-400">{m.data}</p>
            </div>
            <span className={`text-sm font-bold flex-shrink-0 ${
              m.tipo === 'entrada' ? 'text-green-600' : 'text-red-500'
            }`}>
              {m.quantidade}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
