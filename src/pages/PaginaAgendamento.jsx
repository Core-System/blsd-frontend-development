import React, { useState } from 'react';
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
import imgMassagem from '../assets/massagem-relaxante.jpg';
import imgDrenagem from '../assets/drenagem.jpg';

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const procedimentos = [
  {
    id: 1,
    titulo: 'Limpeza de Pele',
    preco: 'R$ 280',
    descricao: 'Tratamento profundo para remoção de impurezas e revitalização celular.',
    imagem: imgLimpeza,
  },
  {
    id: 2,
    titulo: 'Massagem Relaxante',
    preco: 'R$ 350',
    descricao: 'Equilíbrio perfeito entre técnicas ancestrais e óleos essenciais orgânicos.',
    imagem: imgMassagem,
  },
  {
    id: 3,
    titulo: 'Drenagem',
    preco: 'R$ 220',
    descricao: 'Técnica especializada para redução de medidas e eliminação de toxinas corporais.',
    imagem: imgDrenagem,
  },
];



export default function PaginaAgendamento() {
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState(2);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState('13:00');
  const [localSelecionado, setLocalSelecionado] = useState('clinica');
  const { loading, erro, sucesso, confirmar } = useAgendamento();
  const { usuario } = useAuth();


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
        ? 'Rua fulano - 123 - Jardim clinica'
        : 'Rua fulano, 123 - Jardim Usuário',
    });
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

      {/* ── FAIXA 1: Claro ── */}
      <div className="bg-[#f8f7f2]">
        <BarraDeNavegacaoSuperior />
        <CabecalhoPagina />

        <div className="max-w-4xl mx-auto">
          <IndicadorDePassos passoAtual={1} fundoEscuro={false} />
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-16">
          <p className="text-xs font-bold text-[#d4b055] tracking-widest uppercase mb-2">Passo 01</p>
          <h2 className="text-3xl font-bold text-[#2C3E2D] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            Selecione o Procedimento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {procedimentos.map(proc => (
              <CartaoProcedimento
                key={proc.id}
                imagem={proc.imagem}
                titulo={proc.titulo}
                preco={proc.preco}
                descricao={proc.descricao}
                selecionado={procedimentoSelecionado === proc.id}
                aoClicar={() => setProcedimentoSelecionado(proc.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── FAIXA 2: Verde Escuro ── */}
      <div className="bg-[#576b5d]">
        <div className="max-w-4xl mx-auto">
          <IndicadorDePassos passoAtual={2} fundoEscuro={true} />
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-16">
          <p className="text-xs font-bold text-[#d4b055] tracking-widest uppercase mb-2">Passo 02</p>
          <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            Escolha o dia, horário e local
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-start">
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
      </div>

      {/* ── FAIXA 3: Claro ── */}
      <div className="bg-[#f8f7f2] flex-1">
        <div className="max-w-4xl mx-auto">
          <IndicadorDePassos passoAtual={3} fundoEscuro={false} />
        </div>

        <div className="max-w-5xl mx-auto px-6 pb-16">
          <p className="text-xs font-bold text-[#d4b055] tracking-widest uppercase mb-2">Passo 03</p>
          <h2 className="text-3xl font-bold text-[#2C3E2D] mb-8" style={{ fontFamily: 'Georgia, serif' }}>
            Confirme seu agendamento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                ? 'Rua clinica - Jardim clinica'
                : 'Rua residencia, 123 - Jardim Usuário'
              }
              confirmar={handleConfirmar}
              loading={loading}
              erro={erro}
            />
            <CartaoDicasPreProcedimento />
          </div>
        </div>
      </div>

      {/* ── FAIXA 4: rodapé ── */}
      <RodapeAgendamento />
    </div>
  );
}
