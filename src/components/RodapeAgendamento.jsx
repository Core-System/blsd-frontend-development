import React from 'react';
import { Link } from 'react-router-dom';

const linksDaRodape = [
  { label: 'Privacidade', rota: '/privacidade' },
  { label: 'Termos de Uso', rota: '/termos' },
  { label: 'Trabalhe Conosco', rota: '/trabalhe-conosco' },
];

export default function RodapeAgendamento() {
  return (
    <footer className="bg-[#576b5d] px-10 py-6 flex items-center justify-between">
      <span className="text-[#d4b055] font-black text-lg tracking-widest">BLESSED 7</span>
      <div className="flex items-center gap-6">
        {linksDaRodape.map((link) => (
          <Link key={link.label} to={link.rota} className="text-white/60 hover:text-white text-xs transition-colors">
            {link.label}
          </Link>
        ))}
        <span className="text-white/40 text-xs">© 2026 Blessed 7</span>
      </div>
    </footer>
  );
}
