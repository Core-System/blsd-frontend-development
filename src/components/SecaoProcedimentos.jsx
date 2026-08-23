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
    imgDestaqueTras: imgItensSkinCare 
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
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const navigate = useNavigate()

  const selecionarProcedimento = (procedimento, indice) => {
    setProcedimentoAtivo(procedimento);
    setIndiceAtivo(indice);
  };

  const navegarProcedimentos = (direcao) => {
    const proximoIndice = (indiceAtivo + direcao + dadosProcedimentos.length) % dadosProcedimentos.length;
    selecionarProcedimento(dadosProcedimentos[proximoIndice], proximoIndice);
  };

  const handleAgendar = () => {
    navigate('/agendar', { state: { procedimentoId: procedimentoAtivo.id } });
  };

  return (
    <section id="procedimentos" className="bg-[#FAFAE8] flex flex-col pt-12 pb-16 overflow-hidden">
      <div className="mb-6 flex items-end justify-between gap-4 px-6 sm:px-12">
        <div>
          <h2 className="font-lora text-4xl font-bold text-[#333333] mb-1">Procedimentos</h2>
          <p className="font-montserrat text-sm font-bold text-[#666666]">Saiba mais sobre os procedimentos realizados em nosso espaço.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navegarProcedimentos(-1)} aria-label="Procedimento anterior" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C3E2D]/30 text-[#2C3E2D] transition hover:bg-[#2C3E2D] hover:text-white">←</button>
          <button type="button" onClick={() => navegarProcedimentos(1)} aria-label="Próximo procedimento" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C3E2D]/30 text-[#2C3E2D] transition hover:bg-[#2C3E2D] hover:text-white">→</button>
        </div>
      </div>

      <div className="w-full mb-10">
        <div className="flex gap-6 overflow-x-auto px-12 pb-6 hide-scrollbar snap-x snap-mandatory">
          {dadosProcedimentos.map((proc) => (
            <div 
              key={proc.id} 
              onClick={() => selecionarProcedimento(proc, dadosProcedimentos.indexOf(proc))}
              className={`group relative snap-start shrink-0 w-85 h-55 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                procedimentoAtivo.id === proc.id ? 'ring-4 ring-[#C5A859] shadow-xl scale-[1.02]' : 'opacity-80 shadow-md'
              }`}
            >
              <img src={proc.imagemCarrossel} alt={proc.nome} className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-4 pt-10">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-white">{proc.nome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 sm:px-10">
        <div className="grid overflow-hidden rounded-2xl border border-[#e5e1d5] bg-white shadow-[0_18px_42px_rgba(31,45,38,0.08)] lg:grid-cols-2">
          <div>
            <img
              src={procedimentoAtivo.imgDestaqueFrente}
              alt={procedimentoAtivo.nome}
              className="w-full h-[320px] md:h-[380px] object-cover rounded-2xl lg:rounded-r-none"
            />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B8982A]">Detalhes do procedimento</p>
            <h2 className="mt-3 font-lora text-3xl font-semibold leading-tight text-[#2C3E2D] sm:text-4xl">
              {procedimentoAtivo.nome}
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5e6f63]">
              {procedimentoAtivo.descricao}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 border-y border-[#ece9df] py-4">
              <span className="bg-[#f5f3eb] px-3 py-2 text-xs font-semibold text-[#526356]">45 a 60 min</span>
              <span className="bg-[#f5f3eb] px-3 py-2 text-xs font-semibold text-[#526356]">
                {procedimentoAtivo.id === 6 ? 'A partir de R$ 80' : `A partir de R$ ${[280, 250, 350, 220, 200][procedimentoAtivo.id - 1]}`}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAgendar}
              className="mt-7 w-full rounded-lg bg-[#2C3E2D] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm transition hover:bg-[#405843] hover:shadow-md"
            >
              Agendar procedimento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}