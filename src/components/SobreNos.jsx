import imagemEspaco from '../assets/skincare.jpg';

export default function SecaoSobreNos() {
  return (
    <section id="sobre-nos" className="bg-[#FAFAE8] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative">
          <img src={imagemEspaco} alt="Cuidado estético na clínica Blessed 7" className="aspect-[4/5] w-full rounded-2xl border border-[#d8d4c5] object-cover shadow-xl sm:aspect-[5/4] lg:aspect-[4/5]" />
          <p className="absolute -bottom-5 -right-4 bg-[#2C3E2D] px-5 py-4 font-lora text-xl text-white shadow-lg sm:-right-6">Desde 2018</p>
        </div>

        <div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-[#B8982A]">Sobre a Blessed 7</p>
          <h2 className="max-w-xl font-lora text-4xl font-semibold leading-tight text-[#1d2f26] sm:text-5xl">Um lugar para voltar a si.</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-[#526356]">A Blessed 7 nasceu do desejo de transformar o cuidado estético em uma experiência de presença. Aqui, técnica e acolhimento caminham juntos para revelar a beleza que já existe em você.</p>

          <div className="mt-10 grid gap-8 border-t border-[#2C3E2D]/15 pt-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="font-lora text-xl text-[#2C3E2D]">Nossa história</h3>
              <p className="mt-3 text-sm leading-6 text-[#68766b]">Desde 2018, excelência e cuidado em cada atendimento.</p>
            </div>
            <div>
              <h3 className="font-lora text-xl text-[#2C3E2D]">Nossa origem</h3>
              <p className="mt-3 text-sm leading-6 text-[#68766b]">Uma trajetória de resiliência, enfermagem e empreendedorismo.</p>
            </div>
            <div>
              <h3 className="font-lora text-xl text-[#2C3E2D]">Nosso propósito</h3>
              <p className="mt-3 text-sm leading-6 text-[#68766b]">Criar um refúgio de autoestima, conforto e renovação.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
