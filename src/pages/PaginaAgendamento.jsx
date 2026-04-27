import React, { useState } from 'react';

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
import { useAgendamento } from '../hooks/useAgendamento';

const procedimentos = [
  {
    id: 1,
    titulo: 'Limpeza de Pele',
    preco: 'R$ 280',
    descricao: 'Tratamento profundo para remoção de impurezas e revitalização celular.',
    imagem: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=250&fit=crop&q=80',
  },
  {
    id: 2,
    titulo: 'Massagem Relaxante',
    preco: 'R$ 350',
    descricao: 'Equilíbrio perfeito entre técnicas ancestrais e óleos essenciais orgânicos.',
    imagem: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop&q=80',
  },
  {
    id: 3,
    titulo: 'Drenagem',
    preco: 'R$ 220',
    descricao: 'Técnica especializada para redução de medidas e eliminação de toxinas corporais.',
    imagem: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=250&fit=crop&q=80',
  },
];

const USUARIO_MOCK = {
  nome: 'Maria Silva',
  email: 'maria@email.com',
};

export default function PaginaAgendamento() {
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState(2);
  const [dataSelecionada, setDataSelecionada] = useState(22);
  const [horarioSelecionado, setHorarioSelecionado] = useState('13:00');
  const [localSelecionado, setLocalSelecionado] = useState('clinica');
  const {loading, erro, sucesso, confirmar } = useAgendamento();

  const proc = procedimentos.find(p => p.id === procedimentoSelecionado);

  const passoAtual =
    !procedimentoSelecionado ? 1 :
    !dataSelecionada || !horarioSelecionado ? 2 : 3;

  function handleConfirmar(){
    confirmar({
      nome: USUARIO_MOCK.nome,
      email: USUARIO_MOCK.email,
      dia:dataSelecionada,
      hora:horarioSelecionado,
    });
  }

  if (sucesso) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f7f2]">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#2C3E2D] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Agendamento Confirmado!
        </h2>
        <p className="text-gray-500">Você receberá uma confirmação no e-mail em breve.</p>
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
          <IndicadorDePassos passoAtual={passoAtual} fundoEscuro={false} />
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
          <IndicadorDePassos passoAtual={passoAtual} fundoEscuro={true} />
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
          <IndicadorDePassos passoAtual={passoAtual} fundoEscuro={false} />
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
              data={`Quinta-feira, ${dataSelecionada} de Abril`}
              horario={horarioSelecionado || '—'}
              local={localSelecionado === 'clinica'
                ? 'Rua Entre-Folhas, 4a - Jardim Arize'
                : 'Rua Endereço-do-usuário, 123 - Jardim Usuário'
              }
              confirmar={handleConfirmar}
              loading={loading}
              erro={erro}
            />
            <CartaoDicasPreProcedimento />
          </div>
        </div>
      </div>

      {/* ── FAIXA 4: Rodapé ── */}
      <RodapeAgendamento />
    </div>
  );
}
