import React from 'react';

const links = ['Início', 'Procedimentos', 'Sobre nós', 'Contato'];

export default function BarraDeNavegacaoSuperior() {
  return (
    <nav className="w-full bg-[#f8f7f2] border-b border-[#e8e6d9] px-6 py-4 flex items-center justify-between">
      <div className="flex-1" />

      <div className="flex items-center gap-10">
        {links.map(link => (
          <a key={link} href="#" className="text-sm text-gray-600 hover:text-[#2C3E2D] transition-colors">
            {link}
          </a>
        ))}
        <a href="#" className="text-sm font-bold text-[#2C3E2D]">Agende</a>
      </div>

      <div className="flex-1 flex justify-end items-center gap-3">
        <span className="text-sm text-gray-600">Olá, XPTO</span>
        <div className="w-9 h-9 rounded-full bg-[#8B7355] overflow-hidden flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white"/>
          </svg>
        </div>
      </div>
    </nav>
  );
}
