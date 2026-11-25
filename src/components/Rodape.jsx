import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const linksDaRodape = [
  { label: 'Privacidade', rota: '/privacidade' },
  { label: 'Termos de Uso', rota: '/termos' },
  { label: 'Trabalhe Conosco', rota: '/trabalhe-conosco' },
];

export default function Rodape() {
  return (
    <footer id="footer" className="bg-[#2D4A3E] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-between">
        <div className="flex flex-col items-start gap-1">
          <span className="text-base font-bold tracking-tight">Blessed7</span>

          <a
            href="https://www.instagram.com/fernandaancila/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group"
          >
            <Camera size={16} strokeWidth={2} className="group-hover:opacity-80 transition-opacity" aria-hidden="true" />
            <span className="text-xs text-gray-200 group-hover:text-white transition-colors">
              fernandaancila
            </span>
          </a>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8">
          {linksDaRodape.map((link) => (
            <Link
              key={link.label}
              to={link.rota}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="max-w-full break-words text-center text-xs text-gray-400 md:text-right">
          © 2026 Blessed7. O Santuário da estética.
        </div>
      </div>
    </footer>
  );
}