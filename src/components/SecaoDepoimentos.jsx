import { useState, useEffect, useRef } from "react";
import { listarAvaliacoes } from '../services/avaliacaoService';

function Estrelas({ quantidade }) {
  return (
    <div className="flex gap-1 mb-4 text-[#C5A859] text-lg">
      {Array.from({ length: quantidade }).map((_, i) => <span key={i}>★</span>)}
    </div>
  );
}

const VISIBLE = 3;

export default function SecaoDepoimentos() {
  const [depoimentos, setDepoimentos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

useEffect(() => {
    const buscarDados = () => {
      listarAvaliacoes()
        .then(data => {
          setDepoimentos(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    buscarDados();
    window.addEventListener('novaAvaliacaoFeita', buscarDados);
    return () => window.removeEventListener('novaAvaliacaoFeita', buscarDados);
  }, []);

  const totalSlides = Math.max(0, depoimentos.length - VISIBLE + 1);

  const goTo = (index) => setCurrent(Math.max(0, Math.min(index, totalSlides - 1)));

  useEffect(() => {
    if (totalSlides <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c < totalSlides - 1 ? c + 1 : 0));
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [totalSlides]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c < totalSlides - 1 ? c + 1 : 0));
    }, 5000);
  };

  if (loading) return (
    <section className="bg-[#FAFAE8] px-12 py-16">
      <h2 className="font-lora text-3xl font-bold text-[#333] mb-2">Experiências com Blessed 7</h2>
      <p className="font-montserrat font-bold text-sm text-[#666] mb-12">Descubra sobre experiências que proporcionamos</p>
      <div className="grid grid-cols-3 gap-8">
        {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-2xl p-8 h-52 animate-pulse" />)}
      </div>
    </section>
  );

  if (depoimentos.length === 0) return (
    <section className="bg-[#FAFAE8] px-12 py-16">
      <h2 className="font-lora text-3xl font-bold text-[#333] mb-2">Experiências com Blessed 7</h2>
      <p className="font-montserrat font-bold text-sm text-[#666] mb-12">Descubra sobre experiências que proporcionamos</p>
      <p className="font-montserrat text-sm text-[#aaa] text-center py-12">Ainda não há avaliações.</p>
    </section>
  );

  return (
    <section className="bg-[#FAFAE8] px-12 py-16">
      <h2 className="font-lora text-3xl font-bold text-[#333] mb-2">Experiências com Blessed 7</h2>
      <p className="font-montserrat font-bold text-sm text-[#666] mb-12">Descubra sobre experiências que proporcionamos</p>

      <div className="overflow-hidden" onMouseEnter={pause} onMouseLeave={resume}>
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current} * (100% / 3 + 10.67px)))` }}
        >
          {depoimentos.map(dep => (
            <div
              key={dep.id}
              className="bg-white rounded-2xl p-8 shadow-sm relative pt-12 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              style={{ flex: '0 0 calc((100% - 64px) / 3)' }}
            >
              <span className="absolute top-4 left-6 font-lora font-bold text-[#e0e0e0] text-6xl leading-none">"</span>
              <div className="relative z-10">
                <Estrelas quantidade={dep.nota} />
                <p className="font-montserrat font-bold text-[#555] text-sm leading-relaxed mb-4 min-h-20">
                  "{dep.descricacao}"
                </p>
                {dep.servicos?.length > 0 && (
                  <span className="inline-block text-[0.65rem] font-bold text-[#C5A859] border border-[#e8d49a] rounded-full px-3 py-1 uppercase tracking-widest mb-4">
                    {dep.servicos[0]}
                  </span>
                )}
                <div className="flex items-center gap-3">
                  {dep.clienteUrlFoto ? (
                    <img src={dep.clienteUrlFoto} alt={dep.clienteNome} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#e8d49a] flex items-center justify-center text-sm font-bold text-[#C5A859] flex-shrink-0">
                      {dep.clienteNome?.charAt(0)}
                    </div>
                  )}
                  <span className="font-montserrat font-bold text-xs text-[#333]">{dep.clienteNome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="flex items-center justify-center gap-5 mt-10">
          <button
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            className="w-11 h-11 rounded-full border border-[#C5A859] text-[#C5A859] flex items-center justify-center hover:bg-[#C5A859] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-default"
          >←</button>
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? 'bg-[#C5A859] scale-125' : 'bg-[#e8d49a]'}`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(current + 1)}
            disabled={current === totalSlides - 1}
            className="w-11 h-11 rounded-full border border-[#C5A859] text-[#C5A859] flex items-center justify-center hover:bg-[#C5A859] hover:text-white transition-colors disabled:opacity-30 disabled:cursor-default"
          >→</button>
        </div>
      )}
    </section>
  );
}