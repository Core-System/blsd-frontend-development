import { useNavigate } from 'react-router-dom';
import ShellPublico from './ShellPublico';

const NOMES_MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * TelaConfirmacaoAgendamento: Página de sucesso pós-agendamento
 * Exibe todos os detalhes do agendamento confirmado e oferece próximos passos
 */
export default function TelaConfirmacaoAgendamento({ agendamento, onNovoAgendamento }) {
  const navigate = useNavigate();

  if (!agendamento) {
    return null;
  }

  const handleVerAgendamentos = () => {
    navigate('/dashboard');
  };

  const handleNovoAgendamento = () => {
    if (onNovoAgendamento) {
      onNovoAgendamento();
    } else {
      window.location.href = '/agendar';
    }
  };

  return (
    <ShellPublico>
      <div className="bg-gradient-to-b from-[#f8f7f2] to-[#f5f4ec]">
      {/* Header visual */}
      <div className="bg-[#576b5d] px-6 py-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4b055]/20">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
            Agendamento Confirmado!
          </h1>
          <p className="mt-2 text-white/80">Sua reserva foi realizada com sucesso</p>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-2xl">
          {/* Card de recibo */}
          <div className="mb-6 rounded-[2rem] border border-[#e8e6d9] bg-white p-8 shadow-[0_18px_42px_rgba(30,39,32,0.08)]">
            <div className="mb-6 border-b border-[#e8e6d9] pb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4b055]">Comprovante de Agendamento</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#2C3E2D]">Detalhes da Sua Reserva</h2>
            </div>

            {/* Detalhes */}
            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-[#edf1ee] bg-[#f8faf8] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Procedimento</p>
                <p className="mt-1.5 text-lg font-bold text-[#2C3E2D]">
                  {agendamento.procedimento}
                </p>
                <p className="mt-1 text-sm text-[#d4b055] font-semibold">{agendamento.preco}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[#edf1ee] bg-[#f8faf8] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Data</p>
                  <p className="mt-1.5 text-base font-bold text-[#2C3E2D]">
                    {agendamento.dia} de {NOMES_MESES[agendamento.mes]} de {agendamento.ano}
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-[#edf1ee] bg-[#f8faf8] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Horário</p>
                  <p className="mt-1.5 text-base font-bold text-[#2C3E2D]">{agendamento.hora}</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#edf1ee] bg-[#f8faf8] p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Local do Procedimento</p>
                <p className="mt-1.5 text-base text-[#2C3E2D]">{agendamento.local}</p>
              </div>

              {agendamento.observacoes && (
                <div className="rounded-[1.5rem] border border-dashed border-[#d4b055]/30 bg-[#fffcf5] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4b055]">Observações</p>
                  <p className="mt-1.5 text-sm text-[#536558]">{agendamento.observacoes}</p>
                </div>
              )}

              <div className="rounded-[1.5rem] border border-[#cfe4d4] bg-[#edf8ef] p-4">
                <p className="text-sm text-[#1d5f34]">
                  <span className="font-semibold">✓ Confirmação enviada para:</span> {agendamento.email}
                </p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="space-y-3">
            <button
              onClick={handleVerAgendamentos}
              className="w-full rounded-xl bg-[#2D4336] px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-[#23372b]"
            >
              Ver Meus Agendamentos
            </button>
            <button
              onClick={handleNovoAgendamento}
              className="w-full rounded-xl border border-[#2D4336] bg-transparent px-6 py-3 text-center text-sm font-bold text-[#2D4336] transition hover:bg-[#f5f4ec]"
            >
              Agendar Outro Procedimento
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full rounded-xl border border-[#e8e6d9] bg-white px-6 py-3 text-center text-sm font-bold text-gray-700 transition hover:bg-[#f5f4ec]"
            >
              Voltar para o Início
            </button>
          </div>
        </div>
      </main>
      </div>
    </ShellPublico>
  );
}
