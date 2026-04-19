import React from 'react';

const iconeFiltro = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const iconeDownload = (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const iconeOpcoes = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);
const iconeEditar = (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" strokeLinecap="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const ESTILOS_STATUS = {
  CONFIRMADO: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  PENDENTE: 'bg-amber-50 text-amber-700 border border-amber-200',
  COMPLETO: 'bg-blue-50 text-blue-700 border border-blue-200',
  CANCELADO: 'bg-red-50 text-red-700 border border-red-200',
};
const PONTO_STATUS = {
  CONFIRMADO: 'bg-emerald-500',
  PENDENTE: 'bg-amber-500',
  COMPLETO: 'bg-blue-500',
  CANCELADO: 'bg-red-500',
};

const ESTILOS_PROCEDIMENTO = {
  'TOXINA BOTULÍNICA': 'bg-[#eef4ee] text-[#2C3E2D] border border-[#c8dbc8]',
  'PEELING QUÍMICO': 'bg-[#eef4ee] text-[#2C3E2D] border border-[#c8dbc8]',
  'BIOESTIMULADOR': 'bg-[#eef4ee] text-[#2C3E2D] border border-[#c8dbc8]',
  'RINOMODELAÇÃO': 'bg-[#eef4ee] text-[#2C3E2D] border border-[#c8dbc8]',
};

const agendamentos = [
  {
    data: '09 Abr, 2026',
    hora: '09:30 AM',
    iniciais: 'AM',
    cliente: 'Alice Martins',
    procedimento: 'TOXINA BOTULÍNICA',
    status: 'CONFIRMADO',
    corAvatar: '#7B9E7B',
  },
  {
    data: '09 Abr, 2026',
    hora: '11:00 AM',
    iniciais: 'RS',
    cliente: 'Ricardo Soares',
    procedimento: 'PEELING QUÍMICO',
    status: 'PENDENTE',
    corAvatar: '#6B8E9E',
  },
  {
    data: '08 Abr, 2026',
    hora: '04:45 PM',
    iniciais: 'MP',
    cliente: 'Maria Paula',
    procedimento: 'BIOESTIMULADOR',
    status: 'COMPLETO',
    corAvatar: '#9E7B8E',
  },
  {
    data: '10 Abr, 2026',
    hora: '10:00 AM',
    iniciais: 'JS',
    cliente: 'Juliana Silva',
    procedimento: 'RINOMODELAÇÃO',
    status: 'CONFIRMADO',
    corAvatar: '#8E9E7B',
  },
];

export default function CartaoListaAgendamentos() {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0ede0]">
        <div>
          <h2 className="text-base font-bold text-gray-800">Lista de</h2>
          <p className="text-base font-bold text-gray-800 -mt-0.5">Agendamentos</p>
        </div>
        <div className="flex gap-1.5">
          <button className="p-2 rounded-lg hover:bg-[#f9f8f2] text-gray-500 hover:text-gray-800 transition-all border border-transparent hover:border-[#e8e6d9]">
            {iconeFiltro}
          </button>
          <button className="p-2 rounded-lg hover:bg-[#f9f8f2] text-gray-500 hover:text-gray-800 transition-all border border-transparent hover:border-[#e8e6d9]">
            {iconeDownload}
          </button>
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#faf9f3]">
              {['DATA & HORA', 'CLIENTE', 'PROCEDIMENTO', 'STATUS', 'AÇÕES'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f5f3e8]">
            {agendamentos.map((agendamento, i) => (
              <tr key={i} className="hover:bg-[#fdfcf7] transition-colors group">
                {/* Data & Hora */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-xs font-semibold text-gray-800">{agendamento.data}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{agendamento.hora}</p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: agendamento.corAvatar }}
                    >
                      {agendamento.iniciais}
                    </div>
                    <span className="text-xs font-medium text-gray-800 whitespace-nowrap">{agendamento.cliente}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap ${ESTILOS_PROCEDIMENTO[agendamento.procedimento] || 'bg-gray-100 text-gray-600'}`}>
                    {agendamento.procedimento}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap ${ESTILOS_STATUS[agendamento.status]}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${PONTO_STATUS[agendamento.status]}`} />
                    {agendamento.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-md hover:bg-[#f0ede0] text-gray-500 hover:text-gray-800 transition-all">
                      {iconeEditar}
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-[#f0ede0] text-gray-500 hover:text-gray-800 transition-all">
                      {iconeOpcoes}
                    </button>
                  </div>
                  <div className="flex items-center gap-1 group-hover:hidden">
                    <button className="p-1.5 rounded-md text-gray-400">
                      {iconeOpcoes}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}