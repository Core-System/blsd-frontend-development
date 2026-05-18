import React from 'react';

import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import BarraDeNavegacao from '../components/BarraDeNavegacao';
import CartaoKPIEstoque from '../components/CartaoKPIEstoque';
import TabelaInventario from '../components/TabelaInventario';
import CartaoUltimasMovimentacoes from '../components/CartaoUltimasMovimentacoes';
import CartaoAlertaInteligente from '../components/CartaoAlertaInteligente';

const iconePlus = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

export default function PaginaEstoque() {
  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />

      <main className="ml-[152px] mt-14 min-h-[calc(100vh-56px)] overflow-y-auto bg-[#f5f4ec]">
        <div className="max-w-[1300px] mx-auto px-6 py-7">

          {/* ── Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Gestão
                <span className="mx-1.5 text-gray-300">›</span>
                <span className="text-[#2C3E2D]">Estoque</span>
              </p>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                Controle de Estoque
              </h1>
              <p className="text-sm text-gray-500 mt-1.5 max-w-sm">
                Gerencie insumos e materiais de alta performance.
                Mantenha a excelência clínica com reposição inteligente.
              </p>
            </div>

            <div className="mt-1">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#B8982A] hover:bg-[#a07f22] text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
                {iconePlus}
                Adicionar Produto
              </button>
            </div>
          </div>

          {/* ── KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <CartaoKPIEstoque tipo="total"   rotulo="Total de Itens"    valor="142" />
            <CartaoKPIEstoque tipo="critico" rotulo="Status Crítico"    valor="02"  destaque />
            <CartaoKPIEstoque tipo="baixo"   rotulo="Baixo Estoque"     valor="05"  />
            <CartaoKPIEstoque tipo="entrega" rotulo="Próxima Entrega"   valor="Amanhã" />
          </div>

          {/* ── Tabela de inventário */}
          <div className="mb-4">
            <TabelaInventario />
          </div>

          {/* ── Rodapé: movimentações + alerta */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-12">
              <CartaoUltimasMovimentacoes />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
