const depoimentos = [
  { id: 1, nome: 'Mariana Silva', avatar: 'https://i.pravatar.cc/48?img=5', texto: '"A clínica Blessed 7 não é apenas estética, é um refúgio. O atendimento da Dra. e de toda a equipe é impecável. Minha pele nunca esteve tão radiante."', estrelas: 5 },
  { id: 2, nome: 'Ricardo Mendes', avatar: 'https://i.pravatar.cc/48?img=12', texto: '"O procedimento de drenagem linfática superou todas as minhas expectativas. Além do resultado estético, a sensação de bem-estar é indescritível."', estrelas: 5 },
  { id: 3, nome: 'Carolina Andrade', avatar: 'https://i.pravatar.cc/48?img=9', texto: '"Ambiente extremamente acolhedor e técnicas de última geração. Me sinto cuidada em cada detalhe. Recomendo para quem busca o melhor."', estrelas: 5 },
];

function Estrelas({ quantidade }) {
  return (
    <div className="flex gap-1 mb-4 text-[#C5A859] text-lg">
      {Array.from({ length: quantidade }).map((_, i) => <span key={i}>★</span>)}
    </div>
  );
}

export default function SecaoDepoimentos() {
  return (
    <section className="bg-[#FAFAE8] px-12 py-16">
      <h2 className="font-lora text-3xl font-bold text-[#333] mb-2">Experiências com Blessed 7</h2>
      <p className="font-montserrat font-bold text-sm text-[#666] mb-12">Descubra sobre experiências que proporcionamos</p>
      <div className="grid grid-cols-3 gap-8">
        {depoimentos.map(dep => (
          <div key={dep.id} className="bg-white rounded-2xl p-8 shadow-sm relative pt-12">
            <span className="absolute top-4 left-6 font-lora font-bold text-[#e0e0e0] text-6xl leading-none">"</span>
            <div className="relative z-10">
              <Estrelas quantidade={dep.estrelas} />
              <p className="font-montserrat font-bold text-[#555] text-sm leading-relaxed mb-8 min-h-20">{dep.texto}</p>
              <div className="flex items-center gap-3">
                <img src={dep.avatar} alt={dep.nome} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-montserrat font-bold text-xs text-[#333]">{dep.nome}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}