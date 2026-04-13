import React, {useState} from 'react';

const dadosProcedimentos = [
  { id: 1, nome: 'DRENAGEM LINFÁTICA', descricao: 'A drenagem linfática é uma técnica de massagem suave e rítmica, projetada para estimular o sistema natural de "limpeza" do organismo.', imagemCarrossel: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500', imgDestaqueFrente: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=500', imgDestaqueTras: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500' },
  { id: 2, nome: 'LIMPEZA DE PELE', descricao: 'Procedimento estético profundo que remove cravos, impurezas e células mortas.', imagemCarrossel: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500', imgDestaqueFrente: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', imgDestaqueTras: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500' },
  { id: 3, nome: 'RADIOFREQUÊNCIA', descricao: 'Tecnologia avançada que estimula a produção de colágeno e elastina.', imagemCarrossel: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=500', imgDestaqueFrente: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500', imgDestaqueTras: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=500' },
  { id: 4, nome: 'SKINCARE PRIME', descricao: 'Um protocolo de hidratação e nutrição intensa e personalizada.', imagemCarrossel: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500', imgDestaqueFrente: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400', imgDestaqueTras: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400' },
  { id: 5, nome: 'PEELING QUÍMICO', descricao: 'Tratamento que utiliza ácidos para renovar as camadas da pele.', imagemCarrossel: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500', imgDestaqueFrente: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500', imgDestaqueTras: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500' },
  { id: 6, nome: 'MASSAGEM RELAXANTE', descricao: 'Técnica que combina movimentos suaves e contínuos pelo corpo todo.', imagemCarrossel: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500', imgDestaqueFrente: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500', imgDestaqueTras: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500' }
];

export default function SecaoProcedimentos() {
  const [procedimentoAtivo, setProcedimentoAtivo] = useState(dadosProcedimentos[0]);

  return (
    <section className="bg-[#FAFAE8] flex flex-col pt-12 pb-16 overflow-hidden">
      <div className="px-12 mb-6">
        <h2 className="font-lora font-bold text-4xl text-[#333333] mb-1">Procedimentos</h2>
        <p className="font-montserrat font-bold text-sm text-[#666666]">Saiba mais sobre os procedimentos realizados em nosso espaço.</p>
      </div>

      <div className="w-full mb-10">
        <div className="flex gap-6 overflow-x-auto px-12 pb-6 hide-scrollbar snap-x snap-mandatory">
          {dadosProcedimentos.map((proc) => (
            <div 
              key={proc.id} 
              onClick={() => setProcedimentoAtivo(proc)}
              className={`snap-start shrink-0 w-85 h-55 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                procedimentoAtivo.id === proc.id ? 'ring-4 ring-[#C5A859] shadow-xl scale-[1.02]' : 'opacity-70 shadow-md'
              }`}
            >
              <img src={proc.imagemCarrossel} alt={proc.nome} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="px-10">
        <div className="bg-[#4a6741] rounded-4xl px-14 py-10 flex items-center justify-between gap-10 shadow-xl transition-all duration-500">
          <div className="max-w-lg flex flex-col items-start">
            <h2 className="font-lora font-bold text-white text-4xl uppercase tracking-wide mb-4">
              {procedimentoAtivo.nome}
            </h2>
            <p className="font-montserrat font-bold text-white/90 text-base leading-relaxed mb-8">
              {procedimentoAtivo.descricao}
            </p>
            <button className="bg-[#C5A859] hover:bg-[#b5994f] text-[#333333] text-[10px] font-bold uppercase tracking-[0.15em] px-10 py-3.5 rounded transition-colors cursor-pointer shadow-md font-montserrat">
              AGENDE O PROCEDIMENTO
            </button>
          </div>

          <div className="flex relative w-145 h-80">
            <img src={procedimentoAtivo.imgDestaqueTras} alt="Traseiro" className="absolute top-0 left-0 w-90 h-60 object-cover rounded-2xl shadow-lg transition-all duration-500" />
            <img src={procedimentoAtivo.imgDestaqueFrente} alt="Frontal" className="absolute bottom-0 right-0 w-90 h-60 object-cover rounded-2xl shadow-2xl z-10 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}