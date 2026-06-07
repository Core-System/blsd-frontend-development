import React, { useState, useMemo } from 'react';

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
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

export default function CalendarioAgendamento({ agendamentos = [] }) {
  const hoje = new Date();

  const [ano, setAno]   = useState(hoje.getFullYear());
  const [mes, setMes]   = useState(hoje.getMonth()); // 0-based
  const [diaSelecionado, setDiaSelecionado] = useState(hoje.getDate());

  // Conjunto de dias que têm agendamentos no mês/ano visível
  const diasComAgendamento = useMemo(() => {
    const conjunto = new Set();
    agendamentos.forEach((a) => {
      if (!a.dataHoraInicio) return;
      const d = new Date(a.dataHoraInicio);
      if (d.getFullYear() === ano && d.getMonth() === mes) {
        conjunto.add(d.getDate());
      }
    });
    return conjunto;
  }, [agendamentos, ano, mes]);

  // Navegar meses
  function mesAnterior() {
    if (mes === 0) { setMes(11); setAno(a => a - 1); }
    else setMes(m => m - 1);
    setDiaSelecionado(null);
  }
  function proximoMes() {
    if (mes === 11) { setMes(0); setAno(a => a + 1); }
    else setMes(m => m + 1);
    setDiaSelecionado(null);
  }

  // Montar células do calendário
  const celulas = useMemo(() => {
    const primeiroDia = new Date(ano, mes, 1).getDay(); // 0=Dom
    const totalDias   = new Date(ano, mes + 1, 0).getDate();
    const diasMesAnterior = new Date(ano, mes, 0).getDate();

    const lista = [];
    for (let i = 0; i < primeiroDia; i++) {
      lista.push({ dia: diasMesAnterior - primeiroDia + i + 1, atual: false });
    }
    for (let d = 1; d <= totalDias; d++) {
      lista.push({ dia: d, atual: true });
    }
    // Completar última linha
    const restante = 7 - (lista.length % 7);
    if (restante < 7) {
      for (let d = 1; d <= restante; d++) {
        lista.push({ dia: d, atual: false });
      }
    }
    return lista;
  }, [ano, mes]);

  const ehHoje = (dia) =>
    dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear();

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">
          {MESES[mes]} {ano}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={mesAnterior}
            className="p-1.5 rounded-md hover:bg-[#f9f8f2] text-gray-500 hover:text-gray-800 transition-all"
          >
            {iconeSetaEsquerda}
          </button>
          <button
            onClick={proximoMes}
            className="p-1.5 rounded-md hover:bg-[#f9f8f2] text-gray-500 hover:text-gray-800 transition-all"
          >
            {iconeSetaDireita}
          </button>
        </div>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 mb-2">
        {DIAS_DA_SEMANA.map((d) => (
          <div key={d} className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-wider py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Células */}
      <div className="grid grid-cols-7 gap-y-1">
        {celulas.map((celula, i) => {
          const selecionado  = celula.atual && celula.dia === diaSelecionado;
          const temAgend     = celula.atual && diasComAgendamento.has(celula.dia);
          const eHoje        = celula.atual && ehHoje(celula.dia);

          return (
            <div key={i} className="flex flex-col items-center py-0.5">
              <button
                onClick={() => celula.atual && setDiaSelecionado(celula.dia)}
                className={`w-7 h-7 rounded-full text-[11px] font-medium transition-all flex items-center justify-center
                  ${!celula.atual ? 'text-gray-300 cursor-default' : 'cursor-pointer'}
                  ${selecionado  ? 'bg-[#2C3E2D] text-white shadow-md' : ''}
                  ${eHoje && !selecionado ? 'ring-1 ring-[#2C3E2D] text-[#2C3E2D] font-bold' : ''}
                  ${celula.atual && !selecionado && !eHoje ? 'text-gray-700 hover:bg-[#f9f8f2]' : ''}
                `}
              >
                {celula.dia}
              </button>
              {/* ponto indicador de agendamento */}
              <div className={`w-1 h-1 rounded-full mt-0.5 ${temAgend && !selecionado ? 'bg-[#B8982A]' : 'bg-transparent'}`}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
