import { useState, useEffect, useRef } from 'react';
import { listarConsultasCliente, avaliarConsulta } from '../services/consultaService';
import { useAuth } from '../contexts/AuthContext';

const iconeCalendario = (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const statusCfg = {
  CONCLUIDA: { bg: 'bg-green-100', cor: 'text-green-700', label: 'Concluída' },
  PENDENTE:  { bg: 'bg-amber-100', cor: 'text-amber-700', label: 'Pendente'  },
  CANCELADA: { bg: 'bg-red-100',   cor: 'text-red-700',   label: 'Cancelada' },
};

export default function BalaoAgendamentos() {
  const { usuario } = useAuth();
  const [aberto, setAberto] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAvaliacao, setModalAvaliacao] = useState(null);
  const [nota, setNota] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);
  const ref = useRef();

  // fecha ao clicar fora
useEffect(() => {
  function handleClick(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setAberto(false);
    }
  }
  document.addEventListener('mousedown', handleClick, true);
  return () => document.removeEventListener('mousedown', handleClick, true);
}, []);

  async function abrirBalao() {
  console.log('clicou, usuario.id:', usuario?.id);
  const novoEstado = !aberto;
  setAberto(novoEstado);

    

    if (novoEstado && usuario?.id) {
      setCarregando(true);
      try {
        const dados = await listarConsultasCliente(usuario.id);
        setConsultas(dados);
      } catch {
        setConsultas([]);
      } finally {
        setCarregando(false);
      }
    }
  }

  async function handleAvaliar(e) {
    e.preventDefault();
    if (!nota) return;
    setEnviando(true);
    try {
      await avaliarConsulta(modalAvaliacao.id, { nota, descricacao: descricao });
      setConsultas(cs => cs.map(c =>
        c.id === modalAvaliacao.id
          ? { ...c, avaliacao: { nota, descricacao: descricao } }
          : c
      ));
      setModalAvaliacao(null);
      setNota(0);
      setDescricao('');

      window.dispatchEvent(new Event('novaAvaliacaoFeita'));
    } catch {
      alert('Erro ao enviar avaliação.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="relative" ref={ref}>

      {/* botão */}
      <button
        onClick={abrirBalao}
        className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-semibold text-gray-600 hover:text-[#2C3E2D] hover:bg-white/60 rounded-md transition-all"
      >
        {iconeCalendario}
        Agendamentos
      </button>

      {/* balão */}
      {aberto && (
        <div className="absolute right-0 top-10 w-80 bg-white border border-[#e8e6d9] rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-[#e8e6d9]">
            <p className="text-sm font-bold text-gray-900">Meus Agendamentos</p>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-[#f0eeea]">
            {carregando && (
              <p className="text-xs text-gray-400 text-center py-6">Carregando...</p>
            )}
            {!carregando && consultas.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-6">
                Nenhum agendamento encontrado.
              </p>
            )}
            {!carregando && consultas.map(c => {
              const st = statusCfg[c.status] || statusCfg.PENDENTE;
              const data = c.dataHoraInicio
                ? new Date(c.dataHoraInicio).toLocaleString('pt-BR', {
                    dateStyle: 'short', timeStyle: 'short'
                  })
                : '—';

              return (
                <div key={c.id} className="px-4 py-3 hover:bg-[#fafaf7] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {c.servicos?.length > 0 ? c.servicos.join(', ') : 'Consulta'}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{data}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${st.bg} ${st.cor}`}>
                      {st.label}
                    </span>
                  </div>

                  {/* botão avaliar — só aparece se CONCLUIDA e sem avaliação */}
                  {c.status === 'CONCLUIDA' && !c.avaliacao && (
                    <button
                      onClick={() => { setModalAvaliacao(c); setNota(0); setDescricao(''); }}
                      className="mt-2 text-[11px] font-semibold text-[#B8982A] hover:text-[#a07f22] transition-colors cursor-pointer"
                    >
                      ★ Avaliar consulta
                    </button>
                  )}

                  {/* avaliação já feita */}
                  {c.avaliacao && (
                    <p className="mt-1.5 text-[11px] text-[#B8982A]">
                      {'★'.repeat(c.avaliacao.nota)}
                      {'☆'.repeat(5 - c.avaliacao.nota)}
                      <span className="text-gray-400 ml-1">avaliado</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* modal de avaliação */}
      {modalAvaliacao && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl p-7 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#2C3E2D]">Avaliar consulta</h3>
              <button
                onClick={() => setModalAvaliacao(null)}
                className="text-gray-400 hover:text-gray-700 cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              {modalAvaliacao.servicos?.join(', ') || 'Consulta'} ·{' '}
              {modalAvaliacao.dataHoraInicio
                ? new Date(modalAvaliacao.dataHoraInicio).toLocaleDateString('pt-BR')
                : ''}
            </p>

            {/* estrelas */}
            <div className="flex gap-2 mb-5">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setNota(n)}
                  className={`text-3xl transition-colors cursor-pointer ${
                    n <= nota ? 'text-[#B8982A]' : 'text-gray-200'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <form onSubmit={handleAvaliar} className="space-y-3">
              <textarea
                rows={3}
                placeholder="Conte como foi sua experiência (opcional)"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#576b5d] resize-none"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
              />
              <button
                type="submit"
                disabled={!nota || enviando}
                className="w-full bg-[#576b5d] hover:bg-[#4a5e50] disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                {enviando ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}