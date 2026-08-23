import { useEffect, useRef, useState } from 'react';
import { listarAvaliacoes } from '../services/avaliacaoService';

const AVALIACOES_MOCK = [
  { id: 'mock-1', clienteNome: 'Marina Alves', nota: 5, servicos: ['Peeling de Diamante'], descricao: 'Saí com a pele luminosa e uma sensação maravilhosa de cuidado. O atendimento é atencioso do início ao fim.' },
  { id: 'mock-2', clienteNome: 'Camila Nogueira', nota: 5, servicos: ['Drenagem Linfática'], descricao: 'Ambiente tranquilo, equipe muito preparada e resultado perceptível já na primeira sessão. Voltarei com certeza.' },
  { id: 'mock-3', clienteNome: 'Juliana Martins', nota: 5, servicos: ['Limpeza de Pele'], descricao: 'A experiência foi delicada e personalizada. Minha pele ficou renovada, sem aquele atendimento apressado.' },
  { id: 'mock-4', clienteNome: 'Renata Costa', nota: 5, servicos: ['Massagem Relaxante'], descricao: 'Um verdadeiro momento para desacelerar. Profissional excelente e um espaço pensado nos detalhes.' },
  { id: 'mock-5', clienteNome: 'Beatriz Lima', nota: 5, servicos: ['Skinbooster'], descricao: 'Fui muito bem orientada e me senti segura durante todo o protocolo. O resultado ficou natural e lindo.' },
];

function Estrelas() {
  return <div className="flex gap-1 text-sm text-[#B8982A]" aria-label="Avaliação: 5 de 5 estrelas">★★★★★</div>;
}

function iniciais(nome) {
  return (nome || '?').split(' ').slice(0, 2).map((parte) => parte[0]).join('').toUpperCase();
}

export default function SecaoDepoimentos() {
  const [depoimentos, setDepoimentos] = useState(AVALIACOES_MOCK);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    const atualizarVisiveis = () => setVisible(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    atualizarVisiveis();
    window.addEventListener('resize', atualizarVisiveis);
    return () => window.removeEventListener('resize', atualizarVisiveis);
  }, []);

  useEffect(() => {
    const buscarDados = () => {
      listarAvaliacoes()
        .then((dados) => setDepoimentos(Array.isArray(dados) && dados.length ? dados : AVALIACOES_MOCK))
        .catch(() => setDepoimentos(AVALIACOES_MOCK));
    };
    buscarDados();
    window.addEventListener('novaAvaliacaoFeita', buscarDados);
    return () => window.removeEventListener('novaAvaliacaoFeita', buscarDados);
  }, []);

  const totalSlides = Math.max(1, depoimentos.length - visible + 1);
  const mudarSlide = (direcao) => setCurrent((valor) => (valor + direcao + totalSlides) % totalSlides);

  useEffect(() => {
    if (totalSlides <= 1) return undefined;
    timerRef.current = setInterval(() => mudarSlide(1), 5000);
    return () => clearInterval(timerRef.current);
  }, [totalSlides]);

  return (
    <section id="depoimentos" className="bg-[#f5f3eb] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B8982A]">Experiências reais</p>
            <h2 className="font-lora text-4xl font-semibold text-[#1d2f26] sm:text-5xl">Cuidado que permanece.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#68766b]">Cada atendimento é construído para que você se sinta vista, acolhida e segura.</p>
        </div>

        <div className="overflow-hidden" onMouseEnter={() => clearInterval(timerRef.current)} onMouseLeave={() => { timerRef.current = setInterval(() => mudarSlide(1), 5000); }}>
          <div className="flex gap-5 transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * (100 / visible)}%)` }}>
            {depoimentos.map((depoimento) => (
              <article key={depoimento.id || depoimento.clienteNome} className="relative min-w-0 bg-white p-7 shadow-[0_12px_30px_rgba(35,45,38,0.05)]" style={{ flex: `0 0 calc((100% - ${(visible - 1) * 20}px) / ${visible})` }}>
                <span className="absolute right-6 top-2 font-lora text-6xl leading-none text-[#d8c98e]/50">“</span>
                <Estrelas />
                <p className="mt-5 min-h-[112px] text-sm leading-7 text-[#4d5c51]">{depoimento.descricao}</p>
                <span className="mt-5 inline-block border border-[#d8c98e] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8d7625]">{depoimento.servicos?.[0] || 'Experiência Blessed 7'}</span>
                <div className="mt-7 flex items-center gap-3 border-t border-[#ece9df] pt-5">
                  {depoimento.clienteUrlFoto ? <img src={depoimento.clienteUrlFoto} alt="" className="h-9 w-9 rounded-full object-cover" /> : <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e5dfc6] text-[10px] font-bold text-[#756329]">{iniciais(depoimento.clienteNome)}</div>}
                  <span className="text-xs font-bold text-[#2C3E2D]">{depoimento.clienteNome}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {totalSlides > 1 && <div className="mt-9 flex items-center justify-center gap-4">
          <button type="button" onClick={() => mudarSlide(-1)} aria-label="Depoimento anterior" className="text-lg text-[#2C3E2D] transition hover:text-[#B8982A]">←</button>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#879188]">{String(current + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}</span>
          <button type="button" onClick={() => mudarSlide(1)} aria-label="Próximo depoimento" className="text-lg text-[#2C3E2D] transition hover:text-[#B8982A]">→</button>
        </div>}
      </div>
    </section>
  );
}
