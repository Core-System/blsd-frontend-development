import React from 'react';

export default function RodapeAgendamento() {
  return (
    <footer className="bg-[#576b5d] px-10 py-6 flex items-center justify-between">
      <span className="text-[#d4b055] font-black text-lg tracking-widest">BLESSED 7</span>
      <div className="flex items-center gap-6">
        {['Privacidade', 'Termos de Uso', 'Trabalhe Conosco'].map(link => (
          <a key={link} href="#" className="text-white/60 hover:text-white text-xs transition-colors">
            {link}
          </a>
        ))}
        <span className="text-white/40 text-xs">© 2026 Blessed 7</span>
      </div>
    </footer>
  );
}
