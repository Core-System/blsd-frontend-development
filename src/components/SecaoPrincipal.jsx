export default function SecaoPrincipal() {
  return (
    <section className="relative w-full bg-[#FAFAE8] pt-20 pb-24 flex justify-center overflow-hidden">
      {/*Circulo*/}
      <div className="absolute -top-48 -right-24 w-250 h-250 bg-[#4a6741] rounded-full z-0" />
      
      {/*Card Principal*/}
      <div className="relative z-10 w-full max-w-325 mx-8 h-165 rounded-3xl overflow-hidden shadow-2xl">
        <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1400&q=80" alt="Estética" className="absolute inset-0 w-full h-full object-cover object-center" />
        
        <div className="absolute inset-0 bg-linear-to-r from-[#FAFAE8] via-[#FAFAE8]/70 to-transparent" />
        
        <div className="relative z-20 flex flex-col justify-start h-full px-20 pt-24 pb-28 max-w-225">
          <h1 className="font-lora font-bold text-[#333333] text-5xl leading-none mb-5">Beleza que revela a sua essência.</h1>
          <p className="font-montserrat font-bold text-[#555555] text-base leading-relaxed mb-auto max-w-105">Cuidado, tecnologia e delicadeza para valorizar o que há de mais autêntico em você.</p>
          <button className="self-start bg-[#C5A859] hover:bg-[#b5994f] text-white text-xs font-bold uppercase tracking-[0.15em] px-8 py-3.5 rounded shadow-md transition-all cursor-pointer font-montserrat">SAIBA MAIS</button>
        </div>
      </div>

      {/* Barras Douradas Decorativas */}
      <div className="absolute -bottom-10 left-0 z-30 flex flex-col gap-4">
        <div className="h-10 bg-[#C5A859] w-125 rounded-r-full shadow-md" />
        <div className="h-10 bg-[#C5A859] w-105 rounded-r-full shadow-md" />
        <div className="h-10 bg-[#C5A859] w-82.5 rounded-r-full shadow-md" />
        <div className="h-10 bg-[#C5A859] w-57.5 rounded-r-full shadow-md" />
      </div>
    </section>
  );
}