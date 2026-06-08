import { useState } from "react";

const FAQ = [
  { p: "Qual é a missão do Blessed 7 na estética?", r: "Proporcionar bem-estar, autoestima e resultados visíveis com atendimento humanizado e personalizado." },
  { p: "Quais tipos de procedimentos são oferecidos?", r: "Limpeza de pele, hidratação facial, tratamentos corporais, massagens relaxantes e protocolos exclusivos." },
  { p: "Como funciona o agendamento dinâmico?", r: "Você, cliente, escolhe o melhor horário disponível, de acordo com a agenda do profissional, em tempo real, sem burocracia, diretamente pela plataforma." },
  { p: "Quanto tempo dura cada sessão? ", r: "Em média de 45 a 90 minutos, dependendo do tipo de tratamento escolhido." },
  { p: "Quais benefícios posso esperar?", r: "Melhora da pele, relaxamento, aumento da autoestima e sensação de bem-estar." },
  { p: "Posso cancelar ou remarcar meu horário?", r: "Sim, basta acessar a plataforma e ajustar seu agendamento com antecedência." }
];

export default function SecaoFAQ() {
  const [aberto, setAberto] = useState(null);

return (
  <section class = "bg-[#FAFAE8] px-12 py-16">
    <div className="rounded-2xl bg-[#4a6741] flex items-center justify-center px-6 py-8 max-w-4xl flex items-center justify-center container mx-auto w-1/2">
    <div className="bg-[#4A6741] rounded-2xl px-6 py-8 max-w-2xl mx-auto text-center ">
      <h2 className="font-lora text-white mb-2 text-4xl">
        Perguntas Frequentes
      </h2>
      <p className="font-montserrat text-sm text-[#d4e8cf] mb-6">
        Tire suas dúvidas sobre nossos serviços e experiências.
      </p>

      <div>
        {FAQ.map((item, i) => (
          <div key={i} className="border-b border-[#5a7a50]">
            <button
              onClick={() => setAberto(aberto === i ? null : i)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <span className="font-montserrat font-semibold text-base text-white pr-8">
                {item.p}
              </span>
              <svg
                className="flex-shrink-0 text-[#C5A859] transition-transform duration-300 cursor-pointer"
                style={{
                  transform: aberto === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M4.5 6.75L9 11.25L13.5 6.75"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{
                maxHeight: aberto === i ? "300px" : "0",
                opacity: aberto === i ? 1 : 0,
              }}
            >
              <p className="font-montserrat text-base text-[#d4e8cf] leading-relaxed pb-5 pr-10">
                {item.r}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  </section>
  
);
}