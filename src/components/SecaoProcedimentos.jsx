import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import imgLimpeza from '../assets/limpeza-de-pele.jpg';
import imgPeeling from '../assets/peeling.jpg';
import imgSkincare from '../assets/skincare.jpg';
import imgDrenagem from '../assets/drenagem.jpg';
import imgMassagem from '../assets/massagem-relaxante.jpg';
import imgDepilacao from '../assets/depilacao.jpg';
import imgItensLimpezaPele from '../assets/itensLimpezaPele.jpg'
import imgItensDepilacao from '../assets/itensDepilacao.jpg'
import imgItensPeeling from '../assets/itensPeeling.jpg'
import imgItensMassagem from '../assets/itensMassagem.jpg'
import imgItensDrenagem from '../assets/itensDrenagem.jpg'
import imgItensSkinCare from '../assets/itensSkinCare.jpg'

const dadosProcedimentos = [
  { 
    id: 1, 
    nome: 'LIMPEZA DE PELE', 
    descricao: 'Procedimento estético profundo que remove impurezas, cravos e células mortas, devolvendo a vitalidade e o brilho natural ao seu rosto.', 
    imagemCarrossel: imgLimpeza, 
    imgDestaqueFrente: imgLimpeza, 
    imgDestaqueTras: imgItensLimpezaPele 
  },
  { 
    id: 2, 
    nome: 'PEELING DE DIAMANTE', 
    descricao: 'Esfoliação mecânica controlada que promove a renovação celular, ideal para atenuar manchas, linhas finas e uniformizar a textura da pele.', 
    imagemCarrossel: imgPeeling, 
    imgDestaqueFrente: imgPeeling, 
    imgDestaqueTras: imgItensPeeling 
  },
  { 
    id: 3, 
    nome: 'SKINBOOSTER', 
    descricao: 'Tratamento de hidratação injetável que age nas camadas mais profundas da pele, restaurando a firmeza, a elasticidade e o viço.', 
    imagemCarrossel: imgSkincare, 
    imgDestaqueFrente: imgSkincare, 
    imgDestaqueTras: imgItensLimpezaPele 
  },
  { 
    id: 4, 
    nome: 'DRENAGEM LINFÁTICA', 
    descricao: 'Técnica de massagem suave e rítmica que otimiza o sistema linfático, perfeita para reduzir o inchaço e desintoxicar o organismo.', 
    imagemCarrossel: imgDrenagem, 
    imgDestaqueFrente: imgDrenagem, 
    imgDestaqueTras: imgItensDrenagem 
  },
  { 
    id: 5, 
    nome: 'MASSAGEM RELAXANTE', 
    descricao: 'Terapia manual com movimentos precisos e contínuos que dissolvem tensões musculares, proporcionando um estado de profundo relaxamento.', 
    imagemCarrossel: imgMassagem, 
    imgDestaqueFrente: imgMassagem, 
    imgDestaqueTras: imgItensMassagem 
  },
  { 
    id: 6, 
    nome: 'DEPILAÇÃO (CERA E LASER)', 
    descricao: 'Protocolos de depilação personalizados com cera ou tecnologia a laser, focados no seu conforto e na durabilidade da pele lisa.', 
    imagemCarrossel: imgDepilacao, 
    imgDestaqueFrente: imgDepilacao, 
    imgDestaqueTras: imgItensDepilacao 
  }
];

export default function SecaoProcedimentos() {
  const [procedimentoAtivo, setProcedimentoAtivo] = useState(dadosProcedimentos[0]);
  const navigate = useNavigate()

  const handleAgendar = () => {
    navigate('/agendar', { state: { procedimentoId: procedimentoAtivo.id } });
  };

  return (
    <section id="procedimentos" className="bg-[#FAFAE8] flex flex-col pt-12 pb-16 overflow-hidden">
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
            <button 
              onClick={handleAgendar} 
              className="bg-[#C5A859] hover:bg-[#b5994f] text-[#333333] text-[10px] font-bold uppercase tracking-[0.15em] px-10 py-3.5 rounded transition-colors cursor-pointer shadow-md font-montserrat">
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