import React from 'react';

export default function CartaoKPIClientes({ rotulo, valor, sub, subIcone, destaque }) {
  return (
    <div className={`rounded-xl px-6 py-5 flex flex-col justify-between min-h-[120px] border ${
      destaque
        ? 'bg-[#2C3E2D] border-[#3a5c3b]'
        : 'bg-white border-[#e8e6d9]'
    }`}>
      <p className={`text-[10px] font-bold uppercase tracking-widest ${destaque ? 'text-[#a8c5a0]' : 'text-gray-400'}`}>
        {rotulo}
      </p>
      <p className={`text-4xl font-black leading-none mt-2 ${destaque ? 'text-white' : 'text-gray-900'}`}>
        {valor}
      </p>
      {sub && (
        <p className={`text-[11px] font-semibold mt-2 flex items-center gap-1 ${destaque ? 'text-[#a8c5a0]' : 'text-[#2C3E2D]'}`}>
          {subIcone && <span>{subIcone}</span>}
          {sub}
        </p>
      )}
    </div>
  );
}
