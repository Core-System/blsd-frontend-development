import ShellPublico from '../components/ShellPublico';
import Breadcrumbs from '../components/Breadcrumbs';

const secoes = [
  {
    titulo: '1. Coleta de dados',
    texto:
      'Coletamos informações fornecidas diretamente por você ao criar sua conta, agendar procedimentos ou entrar em contato conosco, como nome, e-mail, telefone, data de nascimento e preferências de atendimento. Também podemos coletar dados de uso do site para aprimorar a experiência e a segurança.',
  },
  {
    titulo: '2. Uso das informações',
    texto:
      'Utilizamos seus dados para viabilizar agendamentos, confirmar atendimentos, enviar comunicações relevantes sobre o serviço, melhorar nossos processos internos e atender solicitações de suporte, sempre em conformidade com a LGPD.',
  },
  {
    titulo: '3. Segurança',
    texto:
      'Empregamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, uso indevido, alteração ou destruição. Ainda assim, nenhuma transmissão pela internet é 100% segura, e o uso do site é por sua conta e risco.',
  },
  {
    titulo: '4. Direitos do usuário',
    texto:
      'Você pode solicitar acesso, correção, exclusão, portabilidade e revogação do consentimento de seus dados pessoais, bem como esclarecer dúvidas sobre o tratamento realizado. Para isso, basta entrar em contato com nossa equipe pela central de atendimento.',
  },
];

export default function PaginaPrivacidade() {
  return (
    <ShellPublico>
      <div className="min-h-screen flex flex-col justify-between bg-[#f8f7f2] text-[#1d2f26]">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Início', to: '/' },
              { label: 'Institucional', to: null },
              { label: 'Privacidade', to: null },
            ]}
          />
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-4 rounded-2xl bg-[#2D4336] p-5 text-white shadow-[0_18px_42px_rgba(45,67,54,0.12)] sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4b055]">Blessed 7</p>
            <h1 className="mt-3 font-lora text-3xl font-bold sm:text-4xl">Política de Privacidade</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
              Esta política descreve como tratamos as informações pessoais dos clientes, respeitando os princípios da Lei Geral de Proteção de Dados (LGPD).
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
              <h2 className="text-base font-semibold text-[#2D4336] sm:text-lg">Atualizações</h2>
              <p className="mt-2 text-sm leading-6 text-[#536558]">
                Podemos atualizar esta política para refletir mudanças em nossos serviços, requisitos legais ou melhorias operacionais. Avisos relevantes serão divulgados em nosso site e, quando necessário, por e-mail.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </ShellPublico>
  );
}
