export default function Paginacao({
  paginaAtual = 1,
  totalPaginas = 1,
  totalElementos = 0,
  tamanhoPagina = 10,
  aoMudarPagina,
  carregando = false,
}) {
  const totalPaginasValida = Math.max(1, Number(totalPaginas) || 1);
  const paginaAtualValida = Math.min(Math.max(1, Number(paginaAtual) || 1), totalPaginasValida);
  const inicio = totalElementos === 0 ? 0 : (paginaAtualValida - 1) * tamanhoPagina + 1;
  const fim = Math.min(paginaAtualValida * tamanhoPagina, totalElementos);

  function irParaPagina(novaPagina) {
    if (!aoMudarPagina || carregando) return;
    const paginaSegura = Math.min(Math.max(1, novaPagina), totalPaginasValida);
    aoMudarPagina(paginaSegura);
  }

  return (
    <div className="flex flex-col gap-3 border-t border-[#f0eeea] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400">
        {totalElementos === 0
          ? 'Nenhum registro encontrado'
          : `Mostrando ${inicio}–${fim} de ${totalElementos} registros`}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => irParaPagina(paginaAtualValida - 1)}
          disabled={carregando || paginaAtualValida === 1}
          className="rounded-lg border border-[#e8e6d9] px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-[#2C3E2D] hover:text-[#2C3E2D] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Anterior
        </button>

        <div className="rounded-lg bg-[#f5f4ec] px-3 py-1.5 text-[11px] font-bold text-[#2C3E2D]">
          Página {paginaAtualValida} de {totalPaginasValida}
        </div>

        <button
          type="button"
          onClick={() => irParaPagina(paginaAtualValida + 1)}
          disabled={carregando || paginaAtualValida >= totalPaginasValida}
          className="rounded-lg border border-[#e8e6d9] px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-[#2C3E2D] hover:text-[#2C3E2D] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
