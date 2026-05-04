import React, { useState } from 'react';

const iconeSetaEsquerda = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const iconeSetaDireita = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const DIAS_DA_SEMANA = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function SeletorDeData({ dataSelecionada, aoSelecionarData }) {
  const hoje = new Date();
  const [mes, setMes] = useState(hoje.getMonth());
  const [ano, setAno] = useState(hoje.getFullYear());

  function mesAnterior() {
    if (mes === 0) { setMes(11); setAno(a => a - 1); }
    else { setMes(m => m - 1); }
  }

  function proximoMes() {
    if (mes === 11) { setMes(0); setAno(a => a + 1); }
    else { setMes(m => m + 1); }
  }

  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();
  const totalDiasMesAnterior = new Date(ano, mes, 0).getDate();
  const ehMesAtual = mes === hoje.getMonth() && ano === hoje.getFullYear();

  const celulas = [];
  for (let i = 0; i < primeiroDia; i++) {
    celulas.push({ dia: totalDiasMesAnterior - primeiroDia + i + 1, atual: false });
  }
  for (let d = 1; d <= totalDias; d++) {
    celulas.push({ dia: d, atual: true });
  }
  const resto = celulas.length % 7 === 0 ? 0 : 7 - (celulas.length % 7);
  for (let d = 1; d <= resto; d++) {
    celulas.push({ dia: d, atual: false });
  }

  function estaSelecionado(dia) {
    return dataSelecionada?.dia === dia &&
           dataSelecionada?.mes === mes &&
           dataSelecionada?.ano === ano;
  }

  function aoClicarDia(dia) {
    aoSelecionarData({ dia, mes, ano });
  }

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#2C3E2D]">{NOMES_MESES[mes]} {ano}</span>
        <div className="flex gap-1">
          <button onClick={mesAnterior} disabled={ehMesAtual}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed">
            {iconeSetaEsquerda}
          </button>
          <button onClick={proximoMes}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500">
            {iconeSetaDireita}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0">
        {DIAS_DA_SEMANA.map(d => (
          <div key={d} className="text-center text-[9px] font-bold text-gray-400 uppercase py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {celulas.map((celula, i) => {
          const selecionado = celula.atual && estaSelecionado(celula.dia);
          const diaPassado = ehMesAtual && celula.atual && celula.dia < hoje.getDate();
          return (
            <div key={i} className="flex items-center justify-center h-8">
              <button
                onClick={() => celula.atual && !diaPassado && aoClicarDia(celula.dia)}
                disabled={!celula.atual || diaPassado}
                className={`w-7 h-7 flex items-center justify-center rounded text-[11px] font-medium transition-all
                  ${!celula.atual || diaPassado ? 'text-gray-300 cursor-default' : 'text-gray-700 hover:bg-gray-100'}
                  ${selecionado ? 'bg-[#576b5d] text-white font-bold' : ''}
                `}
              >
                {celula.dia}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}