export default function SecaoDestaque() {
  return (
    <section className="bg-[#f0f4d8] px-10 pb-12">
      {/* Card verde*/}
      <div
        className="rounded-2xl bg-[#4a6741] flex items-center justify-between"
        style={{padding: '48px 56px', minHeight: '320px'}}
      >
        {/* Texto - lado esquerdo */}
        <div style={{maxWidth: '360px'}}>
          <h2
            className="font-sans font-bold text-white uppercase tracking-widest mb-5"
            style={{fontSize: '1.3rem', letterSpacing: '0.15em'}}
          >
            Drenagem Linfática
          </h2>
          <p className="font-sans text-white/80 text-sm leading-relaxed mb-8">
            A drenagem linfática é uma técnica de massagem suave e rítmica,
            projetada para estimular o sistema natural de "limpeza" do organismo.
            Através de movimentos precisos e relaxantes, auxiliamos o corpo a
            eliminar o excesso de líquidos e toxinas acumulados entre as células.
          </p>
          <button
            className="font-sans font-bold uppercase tracking-widest text-white cursor-pointer hover:opacity-90 transition"
            style={{
              fontSize: '10px',
              padding: '12px 24px',
              backgroundColor: '#b8a84a',
              border: '1px solid #b8a84a',
              borderRadius: '4px',
            }}
          >
            Agende o procedimento
          </button>
        </div>

        {/* Imagens - lado direito */}
        <div className="flex items-start gap-4 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300"
            alt="Drenagem linfática"
            className="object-cover rounded-2xl shadow-lg"
            style={{width: '200px', height: '240px'}}
          />
          <img
            src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=300"
            alt="Drenagem linfática"
            className="object-cover rounded-2xl shadow-lg"
            style={{width: '200px', height: '240px', marginTop: '48px'}}
          />
        </div>
      </div>
    </section>
  )
}
