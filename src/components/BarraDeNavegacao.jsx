const linksDaNavegacao = ["Início", "Procedimentos", "Sobre nós", "Contato", "Agende"];

export default function BarraDeNavegacao() {
  return (
    <header className="w-full bg-[#FAFAE8] px-12 py-5 flex justify-between shadow-sm">


      <span className="text-3xl font-black text-gray-900 tracking-tight">
        Blessed 7
      </span>


      <nav>
        <ul className="flex items-center gap-10">
          {linksDaNavegacao.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={`text-lg font-medium transition-colors duration-200 hover:text-[#B8982A] ${
                  link === "Início"
                    ? "text-gray-900 font-bold"
                    : "text-gray-700"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>


      <a
        href="#"
        className="text-lg font-semibold text-gray-900 hover:text-[#B8982A] transition-colors duration-200"
      >
        Entrar
      </a>

    </header>
  );
}