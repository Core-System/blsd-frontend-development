import React, { useState, useEffect } from 'react';
import { useAgendamento } from '../hooks/useAgendamento';
import { useAuth } from '../contexts/AuthContext';
import BarraDeNavegacaoSuperior from '../components/BarraDeNavegacaoSuperior';
import CabecalhoPagina from '../components/CabecalhoPagina';
import IndicadorDePassos from '../components/IndicadorDePassos';
import CartaoProcedimento from '../components/CartaoProcedimento';
import SeletorDeData from '../components/SeletorDeData';
import SeletorDeHorario from '../components/SeletorDeHorario';
import SeletorDeLocal from '../components/SeletorDeLocal';
import CartaoConfirmacaoAgendamento from '../components/CartaoConfirmacaoAgendamento';
import CartaoDicasPreProcedimento from '../components/CartaoDicasPreProcedimento';
import RodapeAgendamento from '../components/RodapeAgendamento';
import imgLimpeza from '../assets/limpeza-de-pele.jpg';
import imgPeeling from '../assets/peeling.jpg';
import imgSkincare from '../assets/skincare.jpg';
import imgDrenagem from '../assets/drenagem.jpg';
import imgMassagem from '../assets/massagem-relaxante.jpg';
import imgDepilacao from '../assets/depilacao.jpg';
import { useLocation, useSearchParams } from 'react-router-dom';
import api from '../services/api';

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const procedimentos = [
  { 
    id: 1, titulo: 'Limpeza de Pele', preco: 'R$ 280', 
    descricao: 'Procedimento estético profundo...', imagem: imgLimpeza,
    dicas: ['Evite exposição solar direta 48h antes.', 'Não utilize ácidos ou esfoliantes na véspera.', 'Venha sem maquiagem, se possível.']
  },
  { 
    id: 2, titulo: 'Peeling de Diamante', preco: 'R$ 250', 
    descricao: 'Esfoliação mecânica suave...', imagem: imgPeeling,
    dicas: ['Suspenda cremes com ácido retinóico 3 dias antes.', 'Hidrate bem a pele nos dias anteriores.', 'Evite depilação facial no dia anterior.']
  },
  { 
    id: 3, titulo: 'Skinbooster', preco: 'R$ 350', 
    descricao: 'Hidratação injetável profunda...', imagem: imgSkincare,
    dicas: ['Beba bastante água no dia anterior.', 'Evite bebidas alcoólicas 24h antes.', 'Informe sobre qualquer alergia a anestésicos locais.']
  },
  { 
    id: 4, titulo: 'Drenagem Linfática', preco: 'R$ 220', 
    descricao: 'Técnica de massagem que estimula...', imagem: imgDrenagem,
    dicas: ['Beba muita água antes e depois da sessão.', 'Faça refeições leves no dia.', 'Venha com roupas confortáveis e fáceis de tirar.']
  },
  { 
    id: 5, titulo: 'Massagem Relaxante', preco: 'R$ 200', 
    descricao: 'Movimentos suaves e contínuos...', imagem: imgMassagem,
    dicas: ['Evite comer refeições pesadas 1h antes.', 'Tome um banho morno antes de vir, se possível.', 'Chegue com 10 minutos de antecedência para "desacelerar".']
  },
  { 
    id: 6, titulo: 'Depilação (Cera e Laser)', preco: 'A partir de R$ 80', 
    descricao: 'Remoção de pelos com métodos...', imagem: imgDepilacao,
    dicas: ['Apare os pelos se estiverem muito longos (para cera).', 'Não tome sol na área 7 dias antes (para laser).', 'Não use hidratantes na área no dia da sessão.']
  }
];



export default function PaginaAgendamento() {
  const location = useLocation();
  const [modalDicasAberto, setModalDicasAberto] = useState(false);
  const [passoAtual, setPassoAtual] = useState(1);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [observacoes, setObservacoes] = useState('');
  
  const procedimentoInicial = location.state?.procedimentoId || 2;
  
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState(procedimentoInicial);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState('13:00');
  const [localSelecionado, setLocalSelecionado] = useState('clinica');
  const { salvarUsuario } = useAuth();
  const [searchParams, setSearchParams ] = useSearchParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(()=>{
      const codeAgendamento = searchParams.get('code');
      let requisicaoEmAndamento = false;
  
      if(codeAgendamento && !requisicaoEmAndamento){
        requisicaoEmAndamento = true;
        localStorage.removeItem('token');
  
      async function validarLinkAgendamento(){
        const response = await api.post('/usuarios/link-agendamento', null,{
          params: {code: codeAgendamento}
        });
  
        salvarUsuario(response.data)

        localStorage.setItem('token', response.data.token);
        
        window.history.replaceState({}, document.title, window.location.pathname);
      }
  
      validarLinkAgendamento();
      }
    }, []);


  const { loading, erro, sucesso, confirmar } = useAgendamento();
  const { usuario } = useAuth();

  const categorias = ['Todas', 'Facial', 'Corporal', 'Laser'];
  const procedimentosFiltrados = procedimentos.filter((proc) => {
    const termo = busca.trim().toLowerCase();
    const categoriaProc = proc.categoria || 'Facial';
    const correspondeBusca = !termo || proc.titulo.toLowerCase().includes(termo);
    const correspondeCategoria = categoriaAtiva === 'Todas' || categoriaProc === categoriaAtiva;
    return correspondeBusca && correspondeCategoria;
  });

  const proc = procedimentos.find(p => p.id === procedimentoSelecionado);

  function handleConfirmar() {
    confirmar({
      nome: usuario?.nome,
      email: usuario?.email,
      dia: dataSelecionada?.dia,
      mes: dataSelecionada?.mes,
      ano: dataSelecionada?.ano,
      hora: horarioSelecionado,
      procedimento: proc?.titulo,
      preco: proc?.preco,
      local: localSelecionado === 'clinica'
        ? 'Rua Entre-Folhas, 4a - Jardim Arize'
        : 'Rua usuário, 123 - Jardim Usuário',
      observacoes,
    });
  }

  function avancarParaPasso(numero) {
    if (numero === 1) { setPassoAtual(1); return; }
    if (numero === 2 && procedimentoSelecionado) { setPassoAtual(2); return; }
    if (numero === 3 && procedimentoSelecionado && dataSelecionada) { setPassoAtual(3); return; }
  }

  if (sucesso) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8f7f2]">
        <BarraDeNavegacaoSuperior />
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-md w-full bg-[#576b5d] rounded-2xl p-8 flex flex-col gap-5">
            <div>
              <p className="text-[#d4b055] text-xs font-bold tracking-widest uppercase mb-1">Confirmado</p>
              <h2 className="text-white text-3xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                Agendamento Confirmado!
              </h2>
            </div>

            <div className="flex flex-col gap-3 text-white text-sm">
              <p>{sucesso.procedimento} — <span className="text-[#d4b055] font-semibold">{sucesso.preco}</span></p>
              <p>Dia {sucesso.dia} de {NOMES_MESES[sucesso.mes]} de {sucesso.ano}, às {sucesso.hora}</p>
              <p>{sucesso.local}</p>
              <p>Confirmação enviada para {sucesso.email}</p>
            </div>

            <div className="bg-[#4a5e50] rounded-xl p-4 text-white/75 text-xs leading-relaxed">
              <p className="font-bold text-white mb-1">Dicas para seu procedimento:</p>
              <p>• Chegue com 10 minutos de antecedência</p>
              <p>• Evite maquiagem no dia</p>
              <p>• Hidrate-se bem antes da sessão</p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#d4b055] text-[#2C3E2D] font-bold py-3 rounded-xl text-sm"
            >
              Fazer novo agendamento
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#f8f7f2]">
        <BarraDeNavegacaoSuperior />
        <CabecalhoPagina />

        <div className="mx-auto max-w-4xl">
          <IndicadorDePassos passoAtual={passoAtual} fundoEscuro={false} onStepClick={avancarParaPasso} />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-16">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b055]">Passo 01</p>
              <h2 className="text-3xl font-bold text-[#2C3E2D]" style={{ fontFamily: 'Georgia, serif' }}>
                Selecione o Procedimento
              </h2>
            </div>
            <div className="rounded-full border border-[#dfe7e0] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#536558]">
              {procedimentosFiltrados.length} opções
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-4 rounded-[2rem] bg-white p-4 shadow-[0_18px_38px_rgba(30,39,32,0.06)] ring-1 ring-[#edf1ee] md:flex-row md:items-center md:justify-between">
            <input
              type="text"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar procedimento"
              className="w-full rounded-xl border border-[#e8ece8] bg-[#f5f6f4] px-4 py-3 text-sm text-[#2C3E2D] outline-none transition focus:border-[#2D4336] focus:ring-2 focus:ring-[#d4b055]/20 md:max-w-md"
            />
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => setCategoriaAtiva(categoria)}
                  className={`rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition ${
                    categoriaAtiva === categoria
                      ? 'bg-[#2D4336] text-white'
                      : 'bg-[#edf3ef] text-[#536558] hover:bg-[#dfece1]'
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {procedimentosFiltrados.map((procItem) => (
              <CartaoProcedimento
                key={procItem.id}
                imagem={procItem.imagem}
                titulo={procItem.titulo}
                preco={procItem.preco}
                descricao={procItem.descricao}
                categoria={procItem.categoria || 'Facial'}
                duracao={procItem.duracao || '45 a 60 min'}
                selecionado={procedimentoSelecionado === procItem.id}
                aoClicar={() => {
                  setProcedimentoSelecionado(procItem.id);
                  setPassoAtual(1);
                }}
              />
            ))}
          </div>

          {procedimentosFiltrados.length === 0 && (
            <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#d6ddd7] bg-white p-8 text-center text-[#55675c]">
              Nenhum procedimento encontrado com esse filtro.
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setPassoAtual(2)}
              disabled={!procedimentoSelecionado}
              className="rounded-xl bg-[#2D4336] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#23372b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuar para horário
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#576b5d]">
        <div className="mx-auto max-w-4xl">
          <IndicadorDePassos passoAtual={passoAtual} fundoEscuro={true} onStepClick={avancarParaPasso} />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-16">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b055]">Passo 02</p>
          <h2 className="mb-8 text-3xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Escolha o dia, horário e local
          </h2>

          <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-3">
            <SeletorDeData
              dataSelecionada={dataSelecionada}
              aoSelecionarData={(valor) => {
                setDataSelecionada(valor);
                setPassoAtual(2);
              }}
            />
            <SeletorDeHorario
              horarioSelecionado={horarioSelecionado}
              aoSelecionarHorario={(valor) => {
                setHorarioSelecionado(valor);
                setPassoAtual(2);
              }}
            />
            <SeletorDeLocal
              localSelecionado={localSelecionado}
              aoSelecionarLocal={(valor) => {
                setLocalSelecionado(valor);
                setPassoAtual(2);
              }}
            />
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => setPassoAtual(3)}
              disabled={!dataSelecionada || !horarioSelecionado}
              className="rounded-xl bg-[#d4b055] px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[#2D4336] transition hover:bg-[#c9a44a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Revisar confirmação
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#f8f7f2]">
        <div className="mx-auto max-w-4xl">
          <IndicadorDePassos passoAtual={passoAtual} fundoEscuro={false} onStepClick={avancarParaPasso} />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-16">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b055]">Passo 03</p>
          <h2 className="mb-8 text-3xl font-bold text-[#2C3E2D]" style={{ fontFamily: 'Georgia, serif' }}>
            Confirme seu agendamento
          </h2>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_0.9fr]">
            <CartaoConfirmacaoAgendamento
              procedimento={proc?.titulo || 'Procedimento'}
              preco={proc?.preco || '—'}
              data={dataSelecionada ? (() => {
                const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                const semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
                const d = new Date(dataSelecionada.ano, dataSelecionada.mes, dataSelecionada.dia);
                return `${semana[d.getDay()]}, ${dataSelecionada.dia} de ${meses[dataSelecionada.mes]}`;
              })() : '—'}
              horario={horarioSelecionado || '—'}
              local={localSelecionado === 'clinica'
                ? 'Rua Entre-Folhas, 4a - Jardim Arize'
                : 'Rua Endereço-do-usuário, 123 - Jardim Usuário'
              }
              observacoes={observacoes || ''}
              confirmar={handleConfirmar}
              loading={loading}
              erro={erro}
            />

            <div className="space-y-5">
              <div className="rounded-[2rem] bg-white p-5 shadow-[0_18px_38px_rgba(30,39,32,0.06)] ring-1 ring-[#edf1ee]">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7a8d7c]">Observações</p>
                <textarea
                  value={observacoes}
                  onChange={(event) => setObservacoes(event.target.value)}
                  rows={6}
                  placeholder="Descreva preferência de horário, alergias, dores específicas ou qualquer detalhe importante..."
                  className="mt-3 w-full resize-none rounded-2xl border border-[#ebefeb] bg-[#f7f8f7] px-4 py-3 text-sm text-[#2C3E2D] outline-none transition focus:border-[#2D4336] focus:ring-2 focus:ring-[#d4b055]/20"
                />
              </div>
              <CartaoDicasPreProcedimento aoClicar={() => setModalDicasAberto(true)} />
            </div>
          </div>
        </div>
      </div>
      {/* ── MODAL DE DICAS PRE-PROCEDIMENTO ── */}
      {modalDicasAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
          <div className="bg-[#f8f7f2] w-full max-w-md rounded-2xl p-8 shadow-2xl relative transform transition-all">
            {/* Botão Fechar */}
            <button
              onClick={() => setModalDicasAberto(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-2xl font-bold text-[#2C3E2D] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Dicas de Preparo
            </h3>
            <p className="text-[hsl(43,60%,58%)] font-semibold mb-6 uppercase text-xs tracking-widest">
              {proc?.titulo}
            </p>
            
            <ul className="space-y-4">
              {proc?.dicas?.map((dica, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <span className="text-[#576b5d] mt-0.5 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span>{dica}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => setModalDicasAberto(false)}
              className="mt-8 w-full bg-[#576b5d] hover:bg-[#4a5e50] text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer"
            >
              Entendi, obrigado!
            </button>
          </div>
        </div>
      )}

      {/* ── FAIXA 4: rodapé ── */}
      <RodapeAgendamento />
    </div>
  );
}