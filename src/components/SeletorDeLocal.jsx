import React from 'react';

const locais = {
  clinica: {
    label: 'Clínica',
    endereco: 'Rua Entre-Folhas, 4a - Jardim Arize',
    descricao: 'Atendimento em ambiente exclusivo com estrutura premium.',
  },
  domicilio: {
    label: 'Domicílio',
    endereco: 'Rua Endereço-do-usuário, 123 - Jardim Usuário',
    descricao: 'Atendimento personalizado na comodidade da sua casa.',
  },
};

export default function SeletorDeLocal({ localSelecionado, aoSelecionarLocal }) {
  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(22,30,26,0.08)] ring-1 ring-[#edf1ee]">
      <div className="mb-4 flex gap-2 rounded-2xl bg-[#f1f5f1] p-1.5">
        {Object.entries(locais).map(([key, val]) => {
          const ativo = localSelecionado === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => aoSelecionarLocal(key)}
              className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                ativo ? 'bg-[#2D4336] text-white shadow-[0_8px_18px_rgba(45,67,54,0.2)]' : 'text-[#526357] hover:text-[#2D4336]'
              }`}
            >
              {val.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[#ecf0ed] bg-[#f9faf8] p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7d8d83]">Endereço selecionado</p>
        <h3 className="mt-3 text-lg font-semibold text-[#2C3E2D]">{locais[localSelecionado].label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#536558]">{locais[localSelecionado].endereco}</p>
        <p className="mt-3 text-xs leading-relaxed text-[#6b7a6d]">{locais[localSelecionado].descricao}</p>
      </div>
    </div>
  );
}
