import React from 'react';

const locais = {
  clinica: {
    label: 'Clínica',
    endereco: 'Rua Entre-Folhas, 4a - Jardim Arize',
  },
  domicilio: {
    label: 'Domicílio',
    endereco: 'Rua Endereço-do-usuário, 123 - Jardim Usuário',
  },
};

export default function SeletorDeLocal({ localSelecionado, aoSelecionarLocal }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm h-full">
      {/* toggle */}
      <div className="flex gap-2">
        {Object.entries(locais).map(([key, val]) => {
          const ativo = localSelecionado === key;
          return (
            <button
              key={key}
              onClick={() => aoSelecionarLocal(key)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all border
                ${ativo
                  ? 'bg-[#576b5d] text-white border-[#576b5d]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#576b5d]'
                }
              `}
            >
              {val.label}
            </button>
          );
        })}
      </div>

      {/* endereço */}
      <div className="flex flex-col gap-3 flex-1">
        {Object.entries(locais).map(([key, val]) => (
          <div key={key}>
            <p className="text-xs text-gray-500 leading-relaxed">{val.endereco}</p>
            {key !== 'domicilio' && <div className="border-b border-gray-100 mt-3" />}
          </div>
        ))}
      </div>
    </div>
  );
}
