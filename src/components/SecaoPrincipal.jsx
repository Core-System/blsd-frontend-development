import { useNavigate } from 'react-router-dom';
import imagemHero from '../assets/limpeza-de-pele.jpg';

export default function SecaoPrincipal() {
  const navigate = useNavigate();

  return (
    <section id="inicio" className="bg-[#FAFAE8] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="max-w-xl">
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#B8982A]">
            Blessed 7 · Clínica estética
          </p>
          <h1 className="font-lora text-5xl font-semibold leading-[1.05] tracking-normal text-[#1d2f26] sm:text-6xl">
            Beleza que revela a sua essência.
          </h1>
          <p className="mt-7 max-w-md text-base leading-8 text-[#526356] sm:text-lg">
            Cuidado, tecnologia e delicadeza para valorizar o que há de mais autêntico em você.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('/agendar')}
              className="rounded-lg bg-[#2C3E2D] px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm transition duration-200 hover:bg-[#405843] hover:shadow-md"
            >
              Agendar agora
            </button>
            <a
              href="#sobre-nos"
              className="rounded-lg border border-[#2C3E2D]/35 px-7 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2C3E2D] transition duration-200 hover:border-[#2C3E2D] hover:bg-white/70"
            >
              Conheça a clínica
            </a>
          </div>
          <div className="mt-12 flex gap-8 border-t border-[#2C3E2D]/15 pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#738074]">
            <span>Atendimento personalizado</span>
            <span>Desde 2018</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -bottom-5 -left-5 h-24 w-24 border-b border-l border-[#B8982A]/60" />
          <img
            src={imagemHero}
            alt="Tratamento facial na clínica Blessed 7"
            className="relative z-10 aspect-[4/5] w-full rounded-2xl object-cover shadow-xl sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute -right-4 top-8 z-20 hidden max-w-[150px] bg-white/90 p-4 shadow-lg backdrop-blur-sm sm:block">
            <p className="font-lora text-2xl text-[#B8982A]">01</p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#2C3E2D]">Cuidado com intenção</p>
          </div>
        </div>
      </div>
    </section>
  );
}