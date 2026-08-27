/**
 * BarraAcaoAgendamento: Sticky bottom bar para o fluxo de agendamento
 * Mostra resumo do que foi selecionado e botões de navegação
 * Visível durante Passos 1 e 2, oculta em Passo 3 (confirmação)
 */
export default function BarraAcaoAgendamento({
  passo = 1,
  procedimento = '',
  data = '',
  horario = '',
  local = '',
  onVoltar,
  onAvancar,
  avancarlEnabled = true,
}) {
  // Oculta na tela de confirmação (Passo 3)
  if (passo === 3) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 border-t border-[#e8e6d9] bg-white shadow-[0_-8px_24px_rgba(25,35,29,0.08)] px-6 py-4">
      <div className="mx-auto max-w-6xl flex items-center justify-between gap-6">
        {/* Resumo do que foi selecionado */}
        <div className="flex-1 min-w-0">
          {procedimento && (
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Seleção atual</p>
              <p className="text-sm font-semibold text-gray-800 truncate">
                {procedimento}
                {data && ` • ${data}`}
                {horario && ` • ${horario}`}
              </p>
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {passo > 1 && (
            <button
              type="button"
              onClick={onVoltar}
              className="px-4 py-2.5 rounded-xl border border-[#e8e6d9] bg-white text-sm font-bold text-gray-700 transition hover:bg-[#f5f4ec] hover:border-[#2C3E2D]"
            >
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={onAvancar}
            disabled={!avancarlEnabled}
            className="px-5 py-2.5 rounded-xl bg-[#2D4336] text-sm font-bold text-white transition hover:bg-[#23372b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {passo === 1 ? 'Continuar para horário' : 'Revisar confirmação'}
          </button>
        </div>
      </div>
    </div>
  );
}
