const linksDaRodape = ["Privacidade", "Termos de Uso", "Trabalhe Conosco"];

export default function Rodape() {
  return (
    <footer className="bg-[#2D4A3E] text-white py-6 px-10">
      <div className="flex flex-col items-center gap-3">

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


        <div className="flex items-center justify-between w-full mt-1">
          <span className="text-base font-bold tracking-tight">Blessed7</span>
          <p className="text-xs text-gray-400 text-center flex-1">
            © 2026 Blessed7. O Santuário da estética.
          </p>
          <div className="w-16" />
        </div>

      </div>
    </footer>
  );
}
