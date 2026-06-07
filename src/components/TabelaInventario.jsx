import React, { useState } from 'react';

const iconeFiltrar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);
const iconeExportar = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const iconePonto = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
  </svg>
);

function calcularStatus(quantidade) {
  if (quantidade <= 5) return 'CRÍTICO';
  if (quantidade <= 12) return 'BAIXO';
  return 'NORMAL';
}

const statusCfg = {
  NORMAL:  { bg: 'bg-green-100', cor: 'text-green-700', dot: 'bg-green-500' },
  BAIXO:   { bg: 'bg-amber-100', cor: 'text-amber-700', dot: 'bg-amber-500' },
  CRÍTICO: { bg: 'bg-red-100',   cor: 'text-red-700',   dot: 'bg-red-500'   },
};

export default function TabelaInventario({ produtos = [], carregando = false, onBaixa, onRepor, onEditar }) {
  const [menuAberto, setMenuAberto] = useState(null);

  // ── Modal Repor
  const [modalRepor, setModalRepor]   = useState(false);
  const [produtoAtivo, setProdutoAtivo] = useState(null);
  const [qtdRepor, setQtdRepor]       = useState('');

  // ── Modal Editar
  const [modalEditar, setModalEditar] = useState(false);
  const [dadosEditar, setDadosEditar] = useState({ nome: '', preco: '', quantidade: '' });

  const [modalBaixa, setModalBaixa] = useState(false);
  const [qtdBaixa, setQtdBaixa] = useState('');

  function abrirRepor(produto) {
    setProdutoAtivo(produto);
    setQtdRepor('');
    setMenuAberto(null);
    setModalRepor(true);
  }

  function abrirEditar(produto) {
    setProdutoAtivo(produto);
    setDadosEditar({ nome: produto.nome, preco: produto.preco, quantidade: produto.quantidade });
    setMenuAberto(null);
    setModalEditar(true);
  }

function abrirBaixa(produto) {
    setProdutoAtivo(produto);
    setQtdBaixa('');
    setMenuAberto(null);
    setModalBaixa(true);
  }

  function handleConfirmarBaixa(e) {
    e.preventDefault();
    onBaixa(produtoAtivo.id, parseInt(qtdBaixa));
    setModalBaixa(false);
  }

  function handleConfirmarRepor(e) {
    e.preventDefault();
    onRepor(produtoAtivo.id, parseInt(qtdRepor));
    setModalRepor(false);
  }

  function handleConfirmarEditar(e) {
    e.preventDefault();
    onEditar(produtoAtivo.id, {
      nome: dadosEditar.nome,
      preco: parseFloat(dadosEditar.preco),
      quantidade: parseInt(dadosEditar.quantidade),
    });
    setModalEditar(false);
  }

  return (
    <>
      <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900">Inventário Recente</h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-[#2C3E2D] transition-colors">
              {iconeFiltrar} FILTRAR
            </button>
            <button className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2C3E2D] hover:text-[#1a2a1b] transition-colors">
              {iconeExportar} EXPORTAR
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-[2fr_0.8fr_0.8fr_0.4fr] gap-2 pb-2 border-b border-[#e8e6d9] mb-1">
            {['PRODUTO', 'QUANTIDADE', 'STATUS', 'AÇÕES'].map(col => (
              <span key={col} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">{col}</span>
            ))}
          </div>

          {carregando && <p className="text-sm text-gray-400 py-6 text-center">Carregando...</p>}
          {!carregando && produtos.length === 0 && (
            <p className="text-sm text-gray-400 py-6 text-center">Nenhum produto cadastrado.</p>
          )}

          {!carregando && produtos.map((p) => {
            const status = calcularStatus(p.quantidade);
            const st = statusCfg[status];
            return (
              <div
                key={p.id}
                className="grid grid-cols-[2fr_0.8fr_0.8fr_0.4fr] gap-2 items-center py-3.5 border-b border-[#f0eeea] last:border-0 hover:bg-[#fafaf7] transition-colors rounded-lg px-1"
              >
                <div className="flex items-center gap-3 px-1">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm bg-gray-100">📦</div>
                  <span className="text-sm font-semibold text-gray-800">{p.nome}</span>
                </div>
                <span className="text-sm font-bold text-gray-800 px-2">
                  {String(p.quantidade).padStart(2, '0')}
                </span>
                <div className="px-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${st.bg} ${st.cor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`}/>
                    {status}
                  </span>
                </div>
                <div className="relative px-2">
                  <button
                    onClick={() => setMenuAberto(menuAberto === p.id ? null : p.id)}
                    className="p-1 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    {iconePonto}
                  </button>
                  {menuAberto === p.id && (
                    <div className="absolute right-0 top-7 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[120px]">
                      <button onClick={() => abrirEditar(p)}   className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec] cursor-pointer">Editar</button>
                      <button onClick={() => abrirRepor(p)}    className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec] cursor-pointer">Repor</button>
                      <button onClick={() => abrirBaixa(p)} className="w-full text-left px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 cursor-pointer">Dar Baixa</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!carregando && (
          <p className="text-[11px] text-gray-400 mt-3">
            Exibindo {produtos.length} produto{produtos.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* ── Modal Repor ── */}
      {modalRepor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#2C3E2D]">Repor Estoque</h3>
              <button onClick={() => setModalRepor(false)} className="text-gray-400 hover:text-gray-800 cursor-pointer">✕</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Produto: <span className="font-semibold text-gray-800">{produtoAtivo?.nome}</span></p>
            <form onSubmit={handleConfirmarRepor} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Quantidade a adicionar</label>
                <input
                  type="number" required min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#576b5d]"
                  value={qtdRepor}
                  onChange={e => setQtdRepor(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full bg-[#576b5d] hover:bg-[#4a5e50] text-white font-bold py-3 rounded-xl transition-colors cursor-pointer">
                Confirmar Reposição
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal Baixa (Saída) ── */}
      {modalBaixa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-red-600">Dar Baixa no Estoque</h3>
              <button onClick={() => setModalBaixa(false)} className="text-gray-400 hover:text-gray-800 cursor-pointer">✕</button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Produto: <span className="font-semibold text-gray-800">{produtoAtivo?.nome}</span>
              <br/>
              <span className="text-xs">Estoque atual: {produtoAtivo?.quantidade} un.</span>
            </p>
            <form onSubmit={handleConfirmarBaixa} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Quantidade a retirar</label>
                <input
                  type="number" 
                  required 
                  min="1" 
                  max={produtoAtivo?.quantidade}
                  className="w-full p-3 border border-red-200 focus:border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"
                  value={qtdBaixa}
                  onChange={e => setQtdBaixa(e.target.value)}
                  placeholder={`Máx: ${produtoAtivo?.quantidade}`}
                />
              </div>
              <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer">
                Confirmar Saída
              </button>
            </form>
          </div>
        </div>
      )}

{/* ── Modal Editar ── */}
      {modalEditar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#2C3E2D]">Editar Produto</h3>
              <button onClick={() => setModalEditar(false)} className="text-gray-400 hover:text-gray-800 cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleConfirmarEditar} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
                <input
                  type="text" required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#576b5d]"
                  value={dadosEditar.nome}
                  onChange={e => setDadosEditar({...dadosEditar, nome: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preço (R$)</label>
                  <input
                    type="number" step="0.01" required min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#576b5d]"
                    value={dadosEditar.preco}
                    onChange={e => setDadosEditar({...dadosEditar, preco: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Quantidade</label>
                  <input
                    type="number"
                    disabled
                    className="w-full p-3 border border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                    value={dadosEditar.quantidade}
                  />
                  <p className="text-[10px] text-gray-500 mt-1 leading-tight">
                    A quantidade só pode ser alterada via movimentação (Repor).
                  </p>
                </div>
                
              </div>
              <button type="submit" className="w-full bg-[#576b5d] hover:bg-[#4a5e50] text-white font-bold py-3 rounded-xl transition-colors cursor-pointer mt-4">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}