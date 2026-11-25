import React, { useEffect, useState } from 'react';
import BarraDeNavegacaoLateral from '../components/BarraDeNavegacaoLateral';
import CartaoKPIClientes from '../components/CartaoKPIClientes';
import TabelaClientes from '../components/TabelaClientes';
import { listarClientes } from '../services/clienteService';
import { toast } from 'sonner';
import useDelayedLoading from '../hooks/useDelayedLoading';
import { ChevronDown, Clock3, Search, Target, TrendingUp } from 'lucide-react';

const iconeBusca = <Search size={15} strokeWidth={2} aria-hidden="true" />;
const iconeChevronBaixo = <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />;
const iconeTendencia = <TrendingUp size={12} strokeWidth={2.5} aria-hidden="true" />;
const iconeEnvolvimento = <Clock3 size={12} strokeWidth={2.5} aria-hidden="true" />;
const iconeAlvo = <Target size={12} strokeWidth={2.5} aria-hidden="true" />;

const statusOpcoes = ['Todos'];

export default function PaginaClientes() {
  const [clientes, setClientes]         = useState([]);
  const [carregando, setCarregando]     = useState(true);
  const [busca, setBusca]               = useState('');
  const [paginaAtual, setPaginaAtual]   = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalElementos, setTotalElementos] = useState(0);
  const [tamanhoPagina] = useState(8);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [dropStatus, setDropStatus]     = useState(false);
  const carregandoVisivel = useDelayedLoading(carregando);

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const resposta = await listarClientes({ page: paginaAtual, size: tamanhoPagina, busca });
        const lista = Array.isArray(resposta?.content) ? resposta.content : [];
        setClientes(lista);
        setTotalPaginas(Number(resposta?.totalPages ?? 1));
        setTotalElementos(Number(resposta?.totalElements ?? lista.length));
      } catch (e) {
        console.error('Erro ao carregar clientes:', e);
        toast.error('Não foi possível carregar os clientes.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [paginaAtual, tamanhoPagina, busca]);

  const total    = totalElementos;
  const ativos   = clientes.length;
  const retencao = total > 0 ? Math.round((ativos / total) * 100) : 0;
  const clientesFiltrados = clientes;

  function handleRemover(id) {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#f5f4ec] font-sans">
      <BarraDeNavegacaoLateral />

      <main className="min-h-screen bg-[#f5f4ec] pb-28 lg:ml-[152px] lg:pb-0">
        <div className="mx-auto max-w-[1300px] px-4 py-7 sm:px-6">

          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-black leading-tight text-gray-900 sm:text-3xl">Gestão de Clientes</h1>
              <p className="text-sm text-gray-400 mt-1">Central de registros e histórico de pacientes premium.</p>
            </div>
 
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <CartaoKPIClientes
              rotulo="Total de Clientes"
              valor={carregandoVisivel ? '—' : total.toLocaleString('pt-BR')}
              sub={carregandoVisivel ? '' : `${total} cadastrados`}
              subIcone={iconeTendencia}
            />
            <CartaoKPIClientes
              rotulo="Clientes Ativos"
              valor={carregandoVisivel ? '—' : ativos.toLocaleString('pt-BR')}
              sub="Engajamento alto"
              subIcone={iconeEnvolvimento}
            />
            <CartaoKPIClientes
              rotulo="Taxa de Retenção"
              valor={carregandoVisivel ? '—' : `${retencao}%`}
              sub="Baseado nos cadastros"
              subIcone={iconeAlvo}
              destaque
            />
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-[#e8e6d9] bg-white px-3 py-2 sm:flex-1">
              <span className="text-gray-400 flex-shrink-0">{iconeBusca}</span>
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome ou e-mail..."
                className="text-sm text-gray-700 bg-transparent outline-none w-full placeholder:text-gray-400"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setDropStatus(!dropStatus)}
                className="flex items-center gap-2 bg-white border border-[#e8e6d9] rounded-lg px-4 py-2 text-sm text-gray-600 font-medium hover:border-[#2C3E2D] transition-colors"
              >
                {filtroStatus} {iconeChevronBaixo}
              </button>
              {dropStatus && (
                <div className="absolute left-0 top-10 bg-white border border-[#e8e6d9] rounded-lg shadow-lg z-10 py-1 min-w-[120px]">
                  {statusOpcoes.map((o) => (
                    <button key={o} onClick={() => { setFiltroStatus(o); setDropStatus(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-[#f5f4ec]">{o}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <TabelaClientes
            clientes={clientesFiltrados}
            carregando={carregando}
            mostrarSpinner={carregandoVisivel}
            onRemover={handleRemover}
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            totalElementos={totalElementos}
            tamanhoPagina={tamanhoPagina}
            aoMudarPagina={setPaginaAtual}
          />

        </div>
      </main>
    </div>
  );
}
