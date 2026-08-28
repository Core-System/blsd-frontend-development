import React, { useState, useEffect } from 'react';
import { useAgendamento } from '../hooks/useAgendamento';
import { useAuth } from '../contexts/AuthContext';
import ShellPublico from '../components/ShellPublico';
import CabecalhoPagina from '../components/CabecalhoPagina';
import IndicadorDePassos from '../components/IndicadorDePassos';
import CartaoProcedimento from '../components/CartaoProcedimento';
import SeletorDeData from '../components/SeletorDeData';
import SeletorDeHorario from '../components/SeletorDeHorario';
import SeletorDeLocal from '../components/SeletorDeLocal';
import CartaoConfirmacaoAgendamento from '../components/CartaoConfirmacaoAgendamento';
import CartaoDicasPreProcedimento from '../components/CartaoDicasPreProcedimento';
import BarraAcaoAgendamento from '../components/BarraAcaoAgendamento';
import TelaConfirmacaoAgendamento from '../components/TelaConfirmacaoAgendamento';
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
    dicas: ['Evite exposição solar direta 48h antes.', 'Não utilize ácidos ou esfoliantes na véspera.', 'Venha sem maquiagem, se possível.'],
    categoria: 'Facial'
  },
  { 
    id: 2, titulo: 'Peeling de Diamante', preco: 'R$ 250', 
    descricao: 'Esfoliação mecânica suave...', imagem: imgPeeling,
    dicas: ['Suspenda cremes com ácido retinóico 3 dias antes.', 'Hidrate bem a pele nos dias anteriores.', 'Evite depilação facial no dia anterior.'],
    categoria: 'Facial'
  },
  { 
    id: 3, titulo: 'Skinbooster', preco: 'R$ 350', 
    descricao: 'Hidratação injetável profunda...', imagem: imgSkincare,
    dicas: ['Beba bastante água no dia anterior.', 'Evite bebidas alcoólicas 24h antes.', 'Informe sobre qualquer alergia a anestésicos locais.'],
    categoria: 'Facial'
  },
  { 
    id: 4, titulo: 'Drenagem Linfática', preco: 'R$ 220', 
    descricao: 'Técnica de massagem que estimula...', imagem: imgDrenagem,
    dicas: ['Beba muita água antes e depois da sessão.', 'Faça refeições leves no dia.', 'Venha com roupas confortáveis e fáceis de tirar.'],
    categoria: 'Corporal'
  },
  { 
    id: 5, titulo: 'Massagem Relaxante', preco: 'R$ 200', 
    descricao: 'Movimentos suaves e contínuos...', imagem: imgMassagem,
    dicas: ['Evite comer refeições pesadas 1h antes.', 'Tome um banho morno antes de vir, se possível.', 'Chegue com 10 minutos de antecedência para "desacelerar".'],
    categoria: 'Corporal'
  },
  { 
    id: 6, titulo: 'Depilação (Cera e Laser)', preco: 'A partir de R$ 80', 
    descricao: 'Remoção de pelos com métodos...', imagem: imgDepilacao,
    dicas: ['Apare os pelos se estiverem muito longos (para cera).', 'Não tome sol na área 7 dias antes (para laser).', 'Não use hidratantes na área no dia da sessão.'],
    categoria: 'Laser'
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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const codeAgendamento = searchParams.get('code');
    if (codeAgendamento) {
      localStorage.removeItem('token');
      async function validarLinkAgendamento() {
        try {
          const response = await api.post('/usuarios/link-agendamento', null, {
            params: { code: codeAgendamento }
          });
          salvarUsuario(response.data);
          localStorage.setItem('token', response.data.token);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {
          console.error('Erro ao validar link de agendamento:', e);
        }
      }
      validarLinkAgendamento();
    }
  }, [searchParams, salvarUsuario]);

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

  // Exibe a tela de sucesso quando há agendamento confirmado
  if (sucesso) {
    return <TelaConfirmacaoAgendamento agendamento={sucesso} />;
  }

  return (
    <ShellPublico>
      <div className="bg-[#f8f7f2] flex flex-col">
        <CabecalhoPagina />

        <div className="mx-auto max-w-4xl">
          <IndicadorDePassos passoAtual={passoAtual} fundoEscuro={false} onStepClick={avancarParaPasso} />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20">
          {passoAtual === 1 && (
            <div>
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
                    aoClicar={() => setProcedimentoSelecionado(procItem.id)}
                  />
                ))}
              </div>

              {procedimentosFiltrados.length === 0 && (
                <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#d6ddd7] bg-white p-8 text-center text-[#55675c]">
                  Nenhum procedimento encontrado com esse filtro.
                </div>
              )}
            </div>
          )}

          {passoAtual === 2 && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b055]">Passo 02</p>
              <h2 className="mb-8 text-3xl font-bold text-[#2C3E2D]" style={{ fontFamily: 'Georgia, serif' }}>
                Escolha o dia, horário e local
              </h2>

              <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-3">
                <SeletorDeData
                  dataSelecionada={dataSelecionada}
                  aoSelecionarData={setDataSelecionada}
                />
                <SeletorDeHorario
                  horarioSelecionado={horarioSelecionado}
                  aoSelecionarHorario={setHorarioSelecionado}
                />
                <SeletorDeLocal
                  localSelecionado={localSelecionado}
                  aoSelecionarLocal={setLocalSelecionado}
                />
              </div>
            </div>
          )}

          {passoAtual === 3 && (
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#d4b055]">Passo 03</p>
              <h2 className="mb-8 text-3xl font-bold text-[#2C3E2D]" style={{ fontFamily: 'Georgia, serif' }}>
                Confirme seu agendamento
              </h2>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_0.9fr]">
                <CartaoConfirmacaoAgendamento
                  procedimento={proc?.titulo || 'Procedimento'}
                  preco={proc?.preco || '—'}
                  data={dataSelecionada ? (() => {
                    const semana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
                    const d = new Date(dataSelecionada.ano, dataSelecionada.mes, dataSelecionada.dia);
                    return `${semana[d.getDay()]}, ${dataSelecionada.dia} de ${NOMES_MESES[dataSelecionada.mes]}`;
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
          )}
        </div>

        {/* Modal de dicas pré-procedimento */}
        {modalDicasAberto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#f8f7f2] w-full max-w-md rounded-2xl p-8 shadow-2xl relative">
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
              <p className="text-[#d4b055] font-semibold mb-6 uppercase text-xs tracking-widest">
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

        {/* Sticky bottom action bar */}
        <BarraAcaoAgendamento
          passo={passoAtual}
          procedimento={proc?.titulo}
          data={dataSelecionada ? `${dataSelecionada.dia} de ${NOMES_MESES[dataSelecionada.mes]}` : ''}
          horario={horarioSelecionado}
          onVoltar={() => setPassoAtual(Math.max(1, passoAtual - 1))}
          onAvancar={() => avancarParaPasso(passoAtual + 1)}
          avancarlEnabled={
            (passoAtual === 1 && procedimentoSelecionado) ||
            (passoAtual === 2 && dataSelecionada && horarioSelecionado)
          }
        />
      </div>
    </ShellPublico>
  );
}
