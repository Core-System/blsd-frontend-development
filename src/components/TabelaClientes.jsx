import React, { useState } from 'react';

const iconeChevron = (dir) => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    {dir === 'left'
      ? <polyline points="15 18 9 12 15 6"/>
      : <polyline points="9 18 15 12 9 6"/>}
  </svg>
);
const iconePonto = (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

const clientes = [
  {
    nome: 'Juliana Mendes', sub: 'ID 78.432',
    foto: null, iniciais: 'JM', cor: 'bg-amber-300',
    contato: { email: 'juliana.m@email.com', tel: '(11) 98822-1042' },
    procedimento: 'Botox Facial', procedimentoCor: 'bg-green-100 text-green-700',
    visita: '12 Out. 2023',
    status: 'ATIVO', statusCor: 'text-green-600', dotCor: 'bg-green-500',
  },
  {
    nome: 'Ricardo Alencar', sub: 'ID 65.218',
    foto: null, iniciais: 'RA', cor: 'bg-blue-300',
    contato: { email: 'r.alencar@business.com', tel: '(11) 97711-3344' },
    procedimento: 'Peeling Químico', procedimentoCor: 'bg-teal-100 text-teal-700',
    visita: '05 Set. 2023',
    status: 'ATIVO', statusCor: 'text-green-600', dotCor: 'bg-green-500',
  },
  {
    nome: 'Beatriz Santos', sub: 'ID 91.007',
    foto: null, iniciais: 'BS', cor: 'bg-rose-300',
    contato: { email: 'bia.santos@email.com', tel: '(11) 99120-4050' },
    procedimento: 'Harmonização', procedimentoCor: 'bg-purple-100 text-purple-700',
    visita: '20 Ago. 2023',
    status: 'INATIVO', statusCor: 'text-red-500', dotCor: 'bg-red-400',
  },
];

const colunas = ['Paciente', 'Contato', 'Último Procedimento', 'Última Visita', 'Status', 'Ações'];

export default function TabelaClientes() {
  const [menuAberto, setMenuAberto] = useState(null);

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl overflow-hidden">
      {/* cabeçalho */}
      <div className="grid grid-cols-[2fr_2fr_1.6fr_1.2fr_1fr_0.5fr] px-6 py-3 border-b border-[#f0eeea] bg-[#fafaf7]">
        {colunas.map((col) => (
          <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{col}</span>
        ))}
      </div>

      {/* linhas */}
      {clientes.map((c, i) => (
        <div
          key={i}
          className="grid grid-cols-[2fr_2fr_1.6fr_1.2fr_1fr_0.5fr] px-6 py-4 border-b border-[#f5f4f0] last:border-0 hover:bg-[#fafaf7] transition-colors items-center"
        >
          {/* paciente */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-full ${c.cor} flex items-center justify-center flex-shrink-0`}>
              <span className="text-xs font-bold text-white">{c.iniciais}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{c.nome}</p>
              <p className="text-[10px] text-gray-400">{c.sub}</p>
            </div>
          </div>

          {/* contato */}
          <div>
            <p className="text-xs text-gray-600">{c.contato.email}</p>
            <p className="text-xs text-gray-400">{c.contato.tel}</p>
          </div>

          {/* procedimento */}
          <div>
            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${c.procedimentoCor}`}>
              {c.procedimento}
            </span>
          </div>

          {/* última visita */}
          <p className="text-xs text-gray-600">{c.visita}</p>

          {/* status */}
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${c.dotCor}`}/>
            <span className={`text-xs font-semibold ${c.statusCor}`}>{c.status}</span>
          </div>

          {/* ações */}
          <div className="relative">
            <button
              onClick={() => setMenuAberto(menuAberto === i ? null : i)}
              className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
            >
              {iconePonto}
            </button>
            {menuAberto === i && (
              <div className="absolute right-0 top-7 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[130px]">
                <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">Ver perfil</button>
                <button className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">Agendar</button>
                <button className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">Desativar</button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* rodapé paginação */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-[#f0eeea]">
        <p className="text-[11px] text-gray-400 uppercase tracking-widest">Mostrando 3 de 1.246 pacientes</p>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e6d9] text-gray-400 hover:border-[#2C3E2D] hover:text-[#2C3E2D] transition-colors">
            {iconeChevron('left')}
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#2C3E2D] text-white text-xs font-bold">
            1
          </button>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#e8e6d9] text-gray-400 hover:border-[#2C3E2D] hover:text-[#2C3E2D] transition-colors">
            {iconeChevron('right')}
          </button>
        </div>
      </div>
    </div>
  );
}
