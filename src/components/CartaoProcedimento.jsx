import React from 'react';

export default function CartaoProcedimento({ imagem, titulo, preco, descricao, selecionado, aoClicar }) {
  return (
    <div
      onClick={aoClicar}
      className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 flex flex-col
        ${selecionado
          ? 'shadow-2xl scale-[1.02] ring-2 ring-[#576b5d]'
          : 'shadow-md hover:shadow-xl hover:scale-[1.01] bg-white'
        }
      `}
    >
      {/* Imagem */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteudo */}
      <div className={`p-4 flex flex-col gap-2 flex-1 ${selecionado ? 'bg-[#576b5d]' : 'bg-white'}`}>
        <div className="flex justify-between items-start">
          <h3 className={`font-bold text-base leading-tight ${selecionado ? 'text-white' : 'text-[#2C3E2D]'}`}>
            {titulo}
          </h3>
          <span className={`text-sm font-semibold ml-2 flex-shrink-0 ${selecionado ? 'text-[#d4b055]' : 'text-[#2C3E2D]'}`}>
            {preco}
          </span>
        </div>
        <p className={`text-xs leading-relaxed ${selecionado ? 'text-white/80' : 'text-gray-500'}`}>
          {descricao}
        </p>
        <button
          className={`mt-auto w-full py-2.5 rounded-lg text-sm font-semibold transition-all
            ${selecionado
              ? 'bg-[#d4b055] text-[#2C3E2D] hover:bg-[#c9a44a]'
              : 'bg-[#e8ede8] text-[#2C3E2D] hover:bg-[#d4ddd4]'
            }
          `}
        >
          {selecionado ? 'Selecionado' : 'Selecionar'}
        </button>
      </div>
    </div>
  );
}
