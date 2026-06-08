const linksDaRodape = ["Privacidade", "Termos de Uso", "Trabalhe Conosco"];

export default function Rodape() {
  return (
    <footer id="footer" className="bg-[#2D4A3E] text-white py-6 px-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <span className="text-base font-bold tracking-tight">Blessed7</span>
          
          <a 
            href="https://www.instagram.com/fernandaancila/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group" 
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="white"
              className="group-hover:opacity-80 transition-opacity"
              viewBox="0 0 256 256"
            >
              <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
            </svg>
            <span className="text-xs text-gray-200 group-hover:text-white transition-colors">
              fernandaancila
            </span>
          </a>
        </div>
        <div className="flex items-center gap-8">
          {linksDaRodape.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="text-xs text-gray-400 text-right">
          © 2026 Blessed7. O Santuário da estética.
        </div>

      </div>
    </footer>
  );
}