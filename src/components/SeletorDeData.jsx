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
    if (mes === 0) { setMes(11); setAno((a) => a - 1); }
    else { setMes((m) => m - 1); }
  }

  function proximoMes() {
    if (mes === 11) { setMes(0); setAno((a) => a + 1); }
    else { setMes((m) => m + 1); }
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
    return dataSelecionada?.dia === dia && dataSelecionada?.mes === mes && dataSelecionada?.ano === ano;
  }

  function aoClicarDia(dia) {
    aoSelecionarData({ dia, mes, ano });
  }

  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(22,30,26,0.08)] ring-1 ring-[#edf1ee]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#2C3E2D]">{NOMES_MESES[mes]} {ano}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={mesAnterior}
            disabled={ehMesAtual}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#edf1ee] text-[#2C3E2D] transition hover:bg-[#f3f7f4] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Mês anterior"
          >
            {iconeSetaEsquerda}
          </button>
          <button
            type="button"
            onClick={proximoMes}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#edf1ee] text-[#2C3E2D] transition hover:bg-[#f3f7f4]"
            aria-label="Próximo mês"
          >
            {iconeSetaDireita}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {DIAS_DA_SEMANA.map((d) => (
          <div key={d} className="pb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-400">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {celulas.map((celula, i) => {
          const selecionado = celula.atual && estaSelecionado(celula.dia);
          const diaPassado = ehMesAtual && celula.atual && celula.dia < hoje.getDate();
          const hojeMesmo = celula.atual && celula.dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();

          return (
            <button
              type="button"
              key={`${celula.dia}-${i}`}
              onClick={() => celula.atual && !diaPassado && aoClicarDia(celula.dia)}
              disabled={!celula.atual || diaPassado}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-medium transition-all ${
                !celula.atual || diaPassado
                  ? 'cursor-not-allowed text-gray-300'
                  : 'text-[#2C3E2D] hover:bg-[#edf3ef] hover:text-[#2D4336]'
              } ${
                hojeMesmo && !selecionado ? 'ring-2 ring-[#d4b055] ring-offset-1 ring-offset-white' : ''
              } ${selecionado ? 'bg-[#2D4336] text-white shadow-[0_10px_24px_rgba(45,67,54,0.25)]' : ''}`}
              aria-pressed={selecionado}
            >
              {celula.dia}
            </button>
          );
        })}
      </div>
    </div>
  );
}