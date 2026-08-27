import React from 'react';

export default function CartaoProcedimento({ imagem, titulo, preco, descricao, categoria, duracao, selecionado, aoClicar }) {
  return (
    <div
      onClick={aoClicar}
      className={`group relative overflow-hidden rounded-[1.75rem] cursor-pointer transition-all duration-250 border ${
        selecionado
          ? 'border-[#2D4336] bg-[#2D4336] text-white shadow-[0_20px_45px_rgba(45,67,54,0.18)] scale-[1.01]'
          : 'border-[#e8e5db] bg-white text-[#2C3E2D] shadow-[0_12px_30px_rgba(31,45,38,0.06)] hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(31,45,38,0.12)]'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          aoClicar();
        }
      }}
    >
      <div className="relative h-52 overflow-hidden">
        <img src={imagem} alt={titulo} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        {selecionado && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#d4b055] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2D4336]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L9.5 17L19 7.5" /></svg>
            Selecionado
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col gap-3 p-4 ${selecionado ? 'bg-[#2D4336]' : 'bg-white'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${selecionado ? 'text-[#d9c586]' : 'text-[#7a8d7c]'}`}>
              {categoria}
            </p>
            <h3 className={`mt-2 text-lg font-semibold leading-tight ${selecionado ? 'text-white' : 'text-[#2C3E2D]'}`}>
              {titulo}
            </h3>
          </div>
          <span className={`inline-flex rounded-full px-2 py-1 text-sm font-semibold ${selecionado ? 'bg-[#d4b055]/15 text-[#f3df9d]' : 'bg-[#edf3ef] text-[#2D4336]'}`}>
            {preco}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-medium">
          <span className={selecionado ? 'text-[#dfe9df]' : 'text-[#5b6d5f]'}>{duracao}</span>
        </div>

        <p className={`text-sm leading-relaxed ${selecionado ? 'text-white/80' : 'text-[#5e6f63]'}`}>
          {descricao}
        </p>

        <button
          type="button"
          className={`mt-auto w-full rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
            selecionado
              ? 'bg-[#d4b055] text-[#2D4336] hover:bg-[#caa94a]'
              : 'bg-[#edf3ef] text-[#2D4336] hover:bg-[#e0e9e2]'
          }`}
        >
          {selecionado ? 'Selecionado' : 'Selecionar'}
        </button>
      </div>
    </div>
  );
}
