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
  if (passo === 3) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 border-t border-[#e8e6d9] bg-white px-4 py-3 shadow-[0_-8px_24px_rgba(25,35,29,0.08)] sm:px-6 sm:py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 sm:gap-6">
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

        <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
          {passo > 1 && (
            <button
              type="button"
              onClick={onVoltar}
              className="whitespace-nowrap rounded-xl border border-[#e8e6d9] bg-white px-3 py-2.5 text-xs font-bold text-gray-700 transition hover:bg-[#f5f4ec] hover:border-[#2C3E2D] sm:px-4 sm:text-sm"
            >
              Voltar
            </button>
          )}
          <button
            type="button"
            onClick={onAvancar}
            disabled={!avancarlEnabled}
            className="whitespace-nowrap rounded-xl bg-[#2D4336] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#23372b] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-sm"
          >
            {passo === 1 ? 'Continuar para horário' : 'Revisar confirmação'}
          </button>
        </div>
      </div>
    </div>
  );
}
