import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import imgLimpeza from '../assets/limpeza-de-pele.jpg';
import imgPeeling from '../assets/peeling.jpg';
import imgSkincare from '../assets/skincare.jpg';
import imgDrenagem from '../assets/drenagem.jpg';
import imgMassagem from '../assets/massagem-relaxante.jpg';
import imgDepilacao from '../assets/depilacao.jpg';
import imgItensLimpezaPele from '../assets/itensLimpezaPele.jpg';
import imgItensDepilacao from '../assets/itensDepilacao.jpg';
import imgItensPeeling from '../assets/itensPeeling.jpg';
import imgItensMassagem from '../assets/itensMassagem.jpg';
import imgItensDrenagem from '../assets/itensDrenagem.jpg';
import imgItensSkinCare from '../assets/itensSkinCare.jpg';
import { listarServicos } from '../services/servicosService';
import useDelayedLoading from '../hooks/useDelayedLoading';

const imagensPorServico = [
  { termos: ['limpeza'], frente: imgLimpeza, verso: imgItensLimpezaPele },
  { termos: ['peeling'], frente: imgPeeling, verso: imgItensPeeling },
  { termos: ['skin', 'booster'], frente: imgSkincare, verso: imgItensSkinCare },
  { termos: ['drenagem'], frente: imgDrenagem, verso: imgItensDrenagem },
  { termos: ['massagem'], frente: imgMassagem, verso: imgItensMassagem },
  { termos: ['depil'], frente: imgDepilacao, verso: imgItensDepilacao },
];

function resolverImagens(servico) {
  const identificador = `${servico.nome || ''} ${servico.imgUrl || ''}`.toLowerCase();
  const imagens = imagensPorServico.find(({ termos }) => termos.some((termo) => identificador.includes(termo)));

  return {
    frente: imagens?.frente || imgLimpeza,
    verso: imagens?.verso || imgLimpeza,
  };
}

function mapearServico(servico) {
  const imagens = resolverImagens(servico);
  return {
    ...servico,
    imagemCarrossel: imagens.frente,
    imgDestaqueFrente: imagens.frente,
    imgDestaqueTras: imagens.verso,
  };
}

function formatarPreco(preco) {
  if (preco == null) return 'Consulte';
  return `A partir de ${Number(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
}

export default function SecaoProcedimentos() {
  const [procedimentos, setProcedimentos] = useState([]);
  const [procedimentoAtivo, setProcedimentoAtivo] = useState(null);
  const [indiceAtivo, setIndiceAtivo] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const carregandoVisivel = useDelayedLoading(carregando);
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarProcedimentos() {
      try {
        const resposta = await listarServicos({ page: 0, size: 20, sort: 'asc' });
        const servicos = Array.isArray(resposta?.content) ? resposta.content.map(mapearServico) : [];
        setProcedimentos(servicos);
        setProcedimentoAtivo(servicos[0] || null);
      } catch (erro) {
        console.error('Erro ao carregar serviços da página inicial:', erro);
        toast.error('Não foi possível carregar os procedimentos.');
        setProcedimentos([]);
      } finally {
        setCarregando(false);
      }
    }

    carregarProcedimentos();
  }, []);

  const procedimentoSelecionado = useMemo(
    () => procedimentos[indiceAtivo] || procedimentoAtivo,
    [indiceAtivo, procedimentoAtivo, procedimentos],
  );

  function selecionarProcedimento(procedimento, indice) {
    setProcedimentoAtivo(procedimento);
    setIndiceAtivo(indice);
  }

  function navegarProcedimentos(direcao) {
    if (!procedimentos.length) return;
    const proximoIndice = (indiceAtivo + direcao + procedimentos.length) % procedimentos.length;
    selecionarProcedimento(procedimentos[proximoIndice], proximoIndice);
  }

  function handleAgendar() {
    if (procedimentoSelecionado) {
      navigate('/agendar', { state: { procedimentoId: procedimentoSelecionado.id } });
    }
  }

  return (
    <section id="procedimentos" className="bg-[#FAFAE8] flex flex-col pt-12 pb-16 overflow-hidden">
      <div className="mb-6 flex items-end justify-between gap-4 px-6 sm:px-12">
        <div>
          <h2 className="font-lora text-4xl font-bold text-[#333333] mb-1">Procedimentos</h2>
          <p className="font-montserrat text-sm font-bold text-[#666666]">Saiba mais sobre os procedimentos realizados em nosso espaço.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => navegarProcedimentos(-1)} aria-label="Procedimento anterior" disabled={!procedimentos.length} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C3E2D]/30 text-[#2C3E2D] transition hover:bg-[#2C3E2D] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => navegarProcedimentos(1)} aria-label="Próximo procedimento" disabled={!procedimentos.length} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2C3E2D]/30 text-[#2C3E2D] transition hover:bg-[#2C3E2D] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      {carregandoVisivel && (
        <div className="px-12 pb-10 text-sm font-semibold text-[#526356]">Carregando procedimentos...</div>
      )}

      {!carregando && procedimentos.length === 0 && (
        <p className="px-12 pb-10 text-sm text-[#526356]">Nenhum procedimento disponível no momento.</p>
      )}

      {procedimentoSelecionado && (
        <>
          <div className="w-full mb-10">
            <div className="flex gap-6 overflow-x-auto px-12 pb-6 hide-scrollbar snap-x snap-mandatory">
              {procedimentos.map((procedimento, indice) => (
                <button
                  type="button"
                  key={procedimento.id}
                  onClick={() => selecionarProcedimento(procedimento, indice)}
                  className={`group relative snap-start shrink-0 w-85 h-55 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    procedimentoSelecionado.id === procedimento.id ? 'ring-4 ring-[#C5A859] shadow-xl scale-[1.02]' : 'opacity-80 shadow-md'
                  }`}
                >
                  <img src={procedimento.imagemCarrossel} alt={procedimento.nome} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-4 pt-10">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-white">{procedimento.nome}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 sm:px-10">
            <div className="grid overflow-hidden rounded-2xl border border-[#e5e1d5] bg-white shadow-[0_18px_42px_rgba(31,45,38,0.08)] lg:grid-cols-2">
              <div>
                <img
                  src={procedimentoSelecionado.imgDestaqueFrente}
                  alt={procedimentoSelecionado.nome}
                  className="w-full h-[320px] md:h-[380px] object-cover rounded-2xl lg:rounded-r-none"
                />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B8982A]">Detalhes do procedimento</p>
                <h2 className="mt-3 font-lora text-3xl font-semibold leading-tight text-[#2C3E2D] sm:text-4xl">
                  {procedimentoSelecionado.nome}
                </h2>
                <p className="mt-5 text-sm leading-7 text-[#5e6f63]">{procedimentoSelecionado.descricao}</p>

                <div className="mt-6 flex flex-wrap gap-3 border-y border-[#ece9df] py-4">
                  <span className="bg-[#f5f3eb] px-3 py-2 text-xs font-semibold text-[#526356]">
                    {procedimentoSelecionado.duracao ? `${procedimentoSelecionado.duracao} min` : 'Duração sob consulta'}
                  </span>
                  <span className="bg-[#f5f3eb] px-3 py-2 text-xs font-semibold text-[#526356]">
                    {formatarPreco(procedimentoSelecionado.preco)}
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
        </>
      )}
    </section>
  );
}
