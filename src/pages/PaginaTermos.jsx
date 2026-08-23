import ShellPublico from '../components/ShellPublico';
import Breadcrumbs from '../components/Breadcrumbs';

const secoes = [
  {
    titulo: '1. Termos de agendamento',
    texto:
      'Ao realizar um agendamento na Blessed 7, você confirma que as informações fornecidas são verdadeiras e que autoriza o atendimento conforme o procedimento selecionado, data, horário e local escolhidos.',
  },
  {
    titulo: '2. Política de cancelamento e reagendamento',
    texto:
      'O reagendamento ou cancelamento deve ser solicitado com antecedência mínima de 24 horas. Em caso de ausência sem aviso prévio ou cancelamento tardio, a reserva pode ser considerada perdida e, dependendo do atendimento, a cobrança de uma taxa ou bloqueio de novo agendamento pode ser aplicada.',
  },
  {
    titulo: '3. Pagamentos',
    texto:
      'Alguns procedimentos podem requerer pagamento antecipado, confirmação por depósito, transferência ou pagamento na clínica, conforme as regras do atendimento. Os valores praticados podem sofrer ajuste conforme promoções ou protocolos específicos.',
  },
  {
    titulo: '4. Responsabilidades',
    texto:
      'A Blessed 7 se compromete a oferecer um ambiente seguro, profissional e de qualidade. O cliente é responsável por informar condições de saúde relevantes, alergias, medicamentos em uso e eventuais contraindicações antes do início do procedimento.',
  },
];

export default function PaginaTermos() {
  return (
    <ShellPublico>
      <div className="min-h-screen flex flex-col justify-between bg-[#f8f7f2] text-[#1d2f26]">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Início', to: '/' },
              { label: 'Institucional', to: null },
              { label: 'Termos de Uso', to: null },
            ]}
          />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 rounded-2xl bg-[#2D4336] p-5 text-white shadow-[0_18px_42px_rgba(45,67,54,0.12)] sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4b055]">Blessed 7</p>
            <h1 className="mt-3 font-lora text-3xl font-bold sm:text-4xl">Termos de Uso</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
              Estes termos regulam o uso do site e dos serviços de agendamento e atendimento da Blessed 7.
            </p>
          </div>

          <div className="grid flex-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-3 overflow-hidden rounded-2xl bg-white p-4 shadow-[0_18px_42px_rgba(30,39,32,0.06)] ring-1 ring-[#edf1ee] sm:p-5">
              {secoes.map((secao) => (
                <section key={secao.titulo} className="rounded-xl border border-[#edf1ee] bg-[#fafcfb] p-3">
                  <h2 className="text-base font-semibold text-[#2D4336] sm:text-lg">{secao.titulo}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#536558]">{secao.texto}</p>
                </section>
              ))}
            </div>

            <aside className="overflow-hidden rounded-2xl bg-[#f7f1dd] p-4 shadow-[0_18px_42px_rgba(30,39,32,0.06)] ring-1 ring-[#efe6c8] sm:p-5">
              <h2 className="text-base font-semibold text-[#2D4336] sm:text-lg">Consentimento</h2>
              <p className="mt-2 text-sm leading-6 text-[#536558]">
                Ao acessar o site e utilizar os serviços, o usuário declara que leu, compreendeu e concorda com estes termos, ficando responsável por manter suas informações e preferências atualizadas.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </ShellPublico>
  );
}
