import React, { useState, useEffect } from 'react';
import { listarProdutos, criarProduto, atualizarProduto, deletarProduto } from '../services/produtoService';
import { registrarMovimentacao, listarMovimentacoes } from '../services/movimentacaoService';

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
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', quantidade: '' });
  const [movimentacoes, setMovimentacoes] = useState([]);

  async function carregarMovimentacoes() {
    try {
      const dados = await listarMovimentacoes();
      setMovimentacoes(dados);
    } catch (erro) {
      console.error("Erro ao buscar movimentações:", erro);
    }
  }

  async function carregarEstoque() {
    try {
      setCarregando(true);
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch (erro) {
      console.error("Erro ao buscar produtos:", erro);
      alert("Falha ao carregar o estoque.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarEstoque();
    carregarMovimentacoes();
  }, []);

  async function handleRepor(id, quantidade) {
    try {
      await registrarMovimentacao({
        produtoId: id,
        tipo: 'ENTRADA',
        quantidade: quantidade,
        observacao: 'Reposição de estoque'
      });
      carregarEstoque();
      carregarMovimentacoes();
    } catch (erro) {
      alert("Erro ao repor estoque.");
    }
  }

async function handleBaixa(id, quantidade) {
    try {
      await registrarMovimentacao({
        produtoId: id,
        tipo: 'SAIDA',
        quantidade: quantidade,
        observacao: 'Baixa de estoque'
      });
      carregarEstoque();
      carregarMovimentacoes();
    } catch (erro) {
      alert("Erro ao registrar baixa. Verifique se há saldo suficiente.");
    }
  }

async function handleEditar(id, dados) {
    try {
      await atualizarProduto(id, dados);
      carregarEstoque();
      carregarMovimentacoes();
    } catch (erro) {
      alert("Erro ao editar produto.");
    }
  }

  async function handleSalvarProduto(e) {
    e.preventDefault();
    try {
      // 1- Cria o produto com estoque ZERO para evitar duplicidade na soma
      const produtoSalvo = await criarProduto({
        nome: novoProduto.nome,
        preco: parseFloat(novoProduto.preco),
        quantidade: 0 
      });
      
      // 2- Dispara a movimentação de entrada inicial para registrar no historico
      if (produtoSalvo && produtoSalvo.id) {
        await registrarMovimentacao({
          produtoId: produtoSalvo.id,
          tipo: 'ENTRADA',
          quantidade: parseInt(novoProduto.quantidade),
          observacao: 'Estoque inicial'
        });
      }

      setModalAberto(false);
      setNovoProduto({ nome: '', preco: '', quantidade: '' });
      
      // 3- Atualiza as duas listas na tela ao mesmo tempo
      carregarEstoque();
      carregarMovimentacoes();
    } catch (erro) {
      console.error("Erro ao salvar:", erro);
      alert(erro.response?.data?.message || "Erro ao cadastrar produto. Verifique se o nome já existe.");
    }
  }

  const totalItens = produtos.length;
  const statusCritico = produtos.filter(p => p.quantidade <= 5).length;
  const baixoEstoque = produtos.filter(p => p.quantidade > 5 && p.quantidade <= 12).length;

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />

      <main className="ml-[152px] mt-14 min-h-[calc(100vh-56px)] overflow-y-auto bg-[#f5f4ec]">
        <div className="max-w-[1300px] mx-auto px-6 py-7">

          {/* Cabeçalho */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Gestão <span className="mx-1.5 text-gray-300">›</span> <span className="text-[#2C3E2D]">Estoque</span>
              </p>
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                Controle de Estoque
              </h1>
              <p className="text-sm text-gray-500 mt-1.5 max-w-sm">
                Gerencie insumos e materiais de alta performance.
              </p>
            </div>

            <div className="mt-1">
              <button 
                onClick={() => setModalAberto(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#B8982A] hover:bg-[#a07f22] text-white text-sm font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                {iconePlus}
                Adicionar Produto
              </button>
            </div>
          </div>

          {/* ── KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <CartaoKPIEstoque tipo="total" rotulo="Total de Itens" valor={carregando ? "..." : String(totalItens).padStart(2, '0')} />
            <CartaoKPIEstoque tipo="critico" rotulo="Status Crítico" valor={carregando ? "..." : String(statusCritico).padStart(2, '0')} destaque={statusCritico > 0} />
            <CartaoKPIEstoque tipo="baixo" rotulo="Baixo Estoque" valor={carregando ? "..." : String(baixoEstoque).padStart(2, '0')} />
          </div>

          {/* ── Tabela de inventário*/}
          <div className="mb-4">
            <TabelaInventario
              produtos={produtos}
              carregando={carregando}
              onBaixa={handleBaixa}
              onRepor={handleRepor}
              onEditar={handleEditar}
            />
          </div>

          {/* ── Rodapé: Movimentações */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <CartaoUltimasMovimentacoes movimentacoes={movimentacoes} />
            </div>
          </div>

        </div>
      </main>

      {/* ── MODAL DE ADICIONAR PRODUTO ── */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#2C3E2D]" style={{ fontFamily: 'Georgia, serif' }}>Novo Produto</h3>
              <button onClick={() => setModalAberto(false)} className="text-gray-400 hover:text-gray-800 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarProduto} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Produto</label>
                <input 
                  type="text" required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#576b5d]"
                  value={novoProduto.nome}
                  onChange={e => setNovoProduto({...novoProduto, nome: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preço (R$)</label>
                  <input 
                    type="number" step="0.01" required min="0"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#576b5d]"
                    value={novoProduto.preco}
                    onChange={e => setNovoProduto({...novoProduto, preco: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Quantidade</label>
                  <input 
                    type="number" required min="1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#576b5d]"
                    value={novoProduto.quantidade}
                    onChange={e => setNovoProduto({...novoProduto, quantidade: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" className="w-full mt-6 bg-[#576b5d] hover:bg-[#4a5e50] text-white font-bold py-3 rounded-xl transition-colors cursor-pointer">
                Salvar Produto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}