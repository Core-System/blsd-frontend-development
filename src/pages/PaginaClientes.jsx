import React, { useState } from 'react';
import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import CartaoKPIClientes from '../components/CartaoKPIClientes';
import TabelaClientes from '../components/TabelaClientes';

const iconePlus = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const iconeBusca = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const iconeChevronBaixo = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const iconeTendencia = (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
const iconeEnvolvimento = (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const iconeAlvo = (
  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const statusOpcoes = ['Todos', 'Ativo', 'Inativo'];
const categoriaOpcoes = ['Todas', 'Botox', 'Peeling', 'Harmonização', 'Bioestimulador'];

export default function PaginaClientes() {
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState('Status');
  const [categoria, setCategoria] = useState('Categoria de Procedimento');
  const [dropStatus, setDropStatus] = useState(false);
  const [dropCategoria, setDropCategoria] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />

      <main className="ml-[152px] min-h-screen bg-[#f5f4ec]">
        <div className="max-w-[1300px] mx-auto px-6 py-7">

          {/* ── Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">Gestão de Clientes</h1>
              <p className="text-sm text-gray-400 mt-1">Central de registros e histórico de pacientes premium.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#B8982A] hover:bg-[#a07f22] text-white text-sm font-bold rounded-lg transition-colors shadow-sm mt-1">
              {iconePlus} Novo Cliente
            </button>
          </div>

          {/* ── KPIs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <CartaoKPIClientes
              rotulo="Total de Clientes"
              valor="1.240"
              sub="+12% este mês"
              subIcone={iconeTendencia}
            />
            <CartaoKPIClientes
              rotulo="Clientes Ativos"
              valor="850"
              sub="Engajamento alto"
              subIcone={iconeEnvolvimento}
            />
            <CartaoKPIClientes
              rotulo="Taxa de Retenção"
              valor="68%"
              sub="Acima da meta (60%)"
              subIcone={iconeAlvo}
              destaque
            />
          </div>

          {/* ── Filtros */}
          <div className="flex items-center gap-3 mb-4">
            {/* busca */}
            <div className="flex items-center gap-2 bg-white border border-[#e8e6d9] rounded-lg px-3 py-2 flex-1 max-w-xs">
              <span className="text-gray-400 flex-shrink-0">{iconeBusca}</span>
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar cliente por nome ou CPF..."
                className="text-sm text-gray-700 bg-transparent outline-none w-full placeholder:text-gray-400"
              />
            </div>

            {/* dropdown status */}
            <div className="relative">
              <button
                onClick={() => { setDropStatus(!dropStatus); setDropCategoria(false); }}
                className="flex items-center gap-2 bg-white border border-[#e8e6d9] rounded-lg px-4 py-2 text-sm text-gray-600 font-medium hover:border-[#2C3E2D] transition-colors"
              >
                {status} {iconeChevronBaixo}
              </button>
              {dropStatus && (
                <div className="absolute left-0 top-10 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[120px]">
                  {statusOpcoes.map((o) => (
                    <button key={o} onClick={() => { setStatus(o); setDropStatus(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">{o}</button>
                  ))}
                </div>
              )}
            </div>

            {/* dropdown categoria */}
            <div className="relative">
              <button
                onClick={() => { setDropCategoria(!dropCategoria); setDropStatus(false); }}
                className="flex items-center gap-2 bg-white border border-[#e8e6d9] rounded-lg px-4 py-2 text-sm text-gray-600 font-medium hover:border-[#2C3E2D] transition-colors"
              >
                {categoria} {iconeChevronBaixo}
              </button>
              {dropCategoria && (
                <div className="absolute left-0 top-10 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[190px]">
                  {categoriaOpcoes.map((o) => (
                    <button key={o} onClick={() => { setCategoria(o); setDropCategoria(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">{o}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Tabela */}
          <TabelaClientes />

        </div>
      </main>
    </div>
  );
}
