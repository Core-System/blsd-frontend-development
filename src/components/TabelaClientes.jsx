import React, { useState } from 'react';
import { deletarCliente } from '../services/clienteService';
import Paginacao from './Paginacao';

const iconeChevron = (dir) => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    {dir === 'left' ? <polyline points="15 18 9 12 15 6"/> : <polyline points="9 18 15 12 9 6"/>}
  </svg>
);
const iconePonto = (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

/* ── Avatar neutro reutilizável ── */
function AvatarNeutro({ tamanho = 9 }) {
  const px = tamanho * 4;
  return (
    <div
      className={`w-${tamanho} h-${tamanho} rounded-full bg-[#e8e6d9] flex items-center justify-center flex-shrink-0`}
      style={{ width: px, height: px, minWidth: px }}
    >
      <svg width={px * 0.55} height={px * 0.55} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={1.8}>
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20v-1a8 8 0 0 1 16 0v1"/>
      </svg>
    </div>
  );
}

function formatarData(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const PAGE_SIZE = 8;
const colunas = ['Paciente', 'Contato', 'Cadastro', 'Status', 'Ações'];

export default function TabelaClientes({
  clientes = [],
  carregando = false,
  onRemover,
  paginaAtual = 0,
  totalPaginas = 1,
  totalElementos = 0,
  tamanhoPagina = 8,
  aoMudarPagina,
}) {
  const [menuAberto, setMenuAberto] = useState(null);
  const [removendo, setRemovendoId] = useState(null);

  const totalPaginasLocal = Math.max(1, Number(totalPaginas) || 1);
  const paginaAtualLocal = Math.min(Math.max(0, Number(paginaAtual) || 0), totalPaginasLocal - 1);
  const visiveis = clientes;

  async function handleRemover(id) {
    if (!window.confirm('Deseja remover este cliente?')) return;
    try {
      setRemovendoId(id);
      await deletarCliente(id);
      onRemover?.(id);
    } catch (e) {
      console.error('Erro ao remover cliente:', e);
      alert('Não foi possível remover o cliente.');
    } finally {
      setRemovendoId(null);
      setMenuAberto(null);
    }
  }

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl overflow-hidden">
      {/* cabeçalho */}
      <div className="grid grid-cols-[2fr_2fr_1.4fr_0.9fr_0.4fr] px-6 py-3 border-b border-[#f0eeea] bg-[#fafaf7]">
        {colunas.map((col) => (
          <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{col}</span>
        ))}
      </div>

      {/* skeleton */}
      {carregando && Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-[2fr_2fr_1.4fr_0.9fr_0.4fr] px-6 py-4 border-b border-[#f5f4f0] last:border-0 items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse flex-shrink-0"/>
            <div className="space-y-1.5">
              <div className="h-3 w-28 bg-gray-100 animate-pulse rounded"/>
              <div className="h-2.5 w-16 bg-gray-100 animate-pulse rounded"/>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="h-3 w-36 bg-gray-100 animate-pulse rounded"/>
            <div className="h-2.5 w-24 bg-gray-100 animate-pulse rounded"/>
          </div>
          <div className="h-3 w-24 bg-gray-100 animate-pulse rounded"/>
          <div className="h-5 w-12 bg-gray-100 animate-pulse rounded-full"/>
          <div className="h-3 w-4 bg-gray-100 animate-pulse rounded"/>
        </div>
      ))}

      {/* vazio */}
      {!carregando && clientes.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f4ec] text-lg">👤</div>
          <p className="text-sm font-medium text-[#536558]">Nenhum cliente encontrado.</p>
          <p className="text-xs text-[#7d8d83]">A busca atual não retornou registros.</p>
        </div>
      )}

      {/* linhas */}
      {!carregando && visiveis.map((c, i) => {
        const estaRemovendo = removendo === c.id;

        return (
          <div
            key={c.id}
            className={`grid grid-cols-[2fr_2fr_1.4fr_0.9fr_0.4fr] px-6 py-4 border-b border-[#f5f4f0] last:border-0 items-center transition-colors ${estaRemovendo ? 'opacity-40' : 'hover:bg-[#fafaf7]'}`}
          >
            {/* paciente */}
            <div className="flex items-center gap-3">
              <AvatarNeutro tamanho={9} />
              <div>
                <p className="text-sm font-semibold text-gray-800">{c.nome}</p>
                <p className="text-[10px] text-gray-400">ID {c.id}</p>
              </div>
            </div>

            {/* contato */}
            <div>
              <p className="text-xs text-gray-600 truncate">{c.email}</p>
              <p className="text-[11px] text-gray-400">{c.telefone || '—'}</p>
            </div>

            {/* cadastro */}
            <p className="text-xs text-gray-500">{formatarData(c.dataCriacao)}</p>

            {/* status */}
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>
              <span className="text-xs font-semibold text-green-600">ATIVO</span>
            </div>

            {/* ações */}
            <div className="relative">
              <button
                disabled={estaRemovendo}
                onClick={() => setMenuAberto(menuAberto === c.id ? null : c.id)}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors"
              >
                {iconePonto}
              </button>
              {menuAberto === c.id && (
                <div className="absolute right-0 top-7 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[130px]">
                  <button
                    onClick={() => handleRemover(c.id)}
                    className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                  >
                    Remover
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {!carregando && clientes.length > 0 && (
        <Paginacao
          paginaAtual={paginaAtualLocal + 1}
          totalPaginas={totalPaginasLocal}
          totalElementos={Number(totalElementos) || clientes.length}
          tamanhoPagina={Number(tamanhoPagina) || 8}
          aoMudarPagina={(pagina) => aoMudarPagina?.(pagina - 1)}
          carregando={carregando}
        />
      )}
    </div>
  );
}
