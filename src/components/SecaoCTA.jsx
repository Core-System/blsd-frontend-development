import { useState } from 'react';

const FAQ = [
  { p: 'Qual é a missão da Blessed 7 na estética?', r: 'Proporcionar bem-estar, autoestima e resultados visíveis com atendimento humanizado e personalizado.' },
  { p: 'Quais tipos de procedimentos são oferecidos?', r: 'Limpeza de pele, hidratação facial, tratamentos corporais, massagens relaxantes e protocolos exclusivos.' },
  { p: 'Como funciona o agendamento?', r: 'Você escolhe o melhor horário disponível em tempo real, diretamente pela plataforma e sem burocracia.' },
  { p: 'Quanto tempo dura cada sessão?', r: 'Em média, de 45 a 90 minutos, dependendo do tipo de tratamento escolhido.' },
  { p: 'Posso cancelar ou remarcar meu horário?', r: 'Sim. Basta acessar a plataforma e ajustar seu agendamento com antecedência.' },
];

function IconeChevron({ aberto }) {
  return (
    <svg className={`h-5 w-5 text-[#B8982A] transition-transform duration-300 ${aberto ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SecaoFAQ() {
  const [aberto, setAberto] = useState(null);

  return (
    <section id="faq" className="bg-[#f5f3eb] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B8982A]">Dúvidas frequentes</p>
          <h2 className="font-lora text-4xl font-semibold leading-tight text-[#1d2f26] sm:text-5xl">Tudo o que você precisa saber.</h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-[#68766b]">Informação clara para que sua experiência na Blessed 7 comece antes mesmo da chegada.</p>
        </div>

        <div className="border-t border-gray-200">
          {FAQ.map((item, indice) => {
            const estaAberto = aberto === indice;
            return (
              <div key={item.p} className="border-b border-gray-200">
                <button type="button" onClick={() => setAberto(estaAberto ? null : indice)} aria-expanded={estaAberto} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className="text-sm font-semibold text-[#2C3E2D] sm:text-base">{item.p}</span>
                  <IconeChevron aberto={estaAberto} />
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${estaAberto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-[#68766b]">{item.r}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
