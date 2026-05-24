import React, { useState } from 'react';

const iconeFiltrar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const iconeExportar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const iconePonto = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

const iconesCategoria = {
  Injetáveis:    { bg: 'bg-green-100', cor: 'text-green-700', emoji: '💉' },
  Preenchimento: { bg: 'bg-yellow-100', cor: 'text-yellow-700', emoji: '✨' },
  Skincare:      { bg: 'bg-teal-100', cor: 'text-teal-700', emoji: '🌿' },
  Anestésicos:   { bg: 'bg-red-100', cor: 'text-red-700', emoji: '💊' },
};

const statusCfg = {
  NORMAL:  { bg: 'bg-green-100', cor: 'text-green-700', dot: 'bg-green-500' },
  BAIXO:   { bg: 'bg-amber-100', cor: 'text-amber-700', dot: 'bg-amber-500' },
  CRÍTICO: { bg: 'bg-red-100',   cor: 'text-red-700',   dot: 'bg-red-500'   },
};

const produtos = [
  { id: 1, nome: 'Botox 50ml',         categoria: 'Injetáveis',    quantidade: 12, status: 'NORMAL'  },
  { id: 2, nome: 'Ácido Hialurônico',  categoria: 'Preenchimento', quantidade:  5, status: 'BAIXO'   },
  { id: 3, nome: 'Máscara Facial',     categoria: 'Skincare',      quantidade: 20, status: 'NORMAL'  },
  { id: 4, nome: 'Lidocaína',          categoria: 'Anestésicos',   quantidade:  2, status: 'CRÍTICO' },
];

export default function TabelaInventario() {
  const [aberto, setAberto] = useState(null);

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
      {/* cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">Inventário Recente</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-[#2C3E2D] transition-colors">
            {iconeFiltrar} FILTRAR
          </button>
          <button className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2C3E2D] hover:text-[#1a2a1b] transition-colors">
            {iconeExportar} EXPORTAR
          </button>
        </div>
      </div>

      {/* tabela */}
      <div className="w-full">
        <div className="grid grid-cols-[2fr_1.2fr_0.8fr_0.8fr_0.4fr] gap-2 pb-2 border-b border-[#e8e6d9] mb-1">
          {['PRODUTO', 'CATEGORIA', 'QUANTIDADE', 'STATUS', 'AÇÕES'].map(col => (
            <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">{col}</span>
          ))}
        </div>

        {produtos.map((p) => {
          const cat = iconesCategoria[p.categoria] || { bg: 'bg-gray-100', cor: 'text-gray-600', emoji: '📦' };
          const st  = statusCfg[p.status] || statusCfg.NORMAL;
          return (
            <div
              key={p.id}
              className="grid grid-cols-[2fr_1.2fr_0.8fr_0.8fr_0.4fr] gap-2 items-center py-3.5 border-b border-[#f0eeea] last:border-0 hover:bg-[#fafaf7] transition-colors rounded-lg px-1"
            >
              {/* produto */}
              <div className="flex items-center gap-3 px-1">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${cat.bg}`}>
                  {cat.emoji}
                </div>
                <span className="text-sm font-semibold text-gray-800">{p.nome}</span>
              </div>
              {/* categoria */}
              <span className="text-sm text-gray-500 px-2">{p.categoria}</span>
              {/* quantidade */}
              <span className="text-sm font-bold text-gray-800 px-2">
                {String(p.quantidade).padStart(2, '0')}
              </span>
              {/* status */}
              <div className="px-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${st.bg} ${st.cor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/>
                  {p.status}
                </span>
              </div>
              {/* ações */}
              <div className="relative px-2">
                <button
                  onClick={() => setAberto(aberto === p.id ? null : p.id)}
                  className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  {iconePonto}
                </button>
                {aberto === p.id && (
                  <div className="absolute right-0 top-7 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[120px]">
                    <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">Editar</button>
                    <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">Repor</button>
                    <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">Remover</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-gray-400 mt-3">Exibindo 4 de 142 produtos</p>
    </div>
  );
}
