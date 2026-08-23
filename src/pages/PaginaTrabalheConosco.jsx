import { useState } from 'react';
import ShellPublico from '../components/ShellPublico';
import Breadcrumbs from '../components/Breadcrumbs';

const vantagens = [
  'Ambiente colaborativo e acolhedor',
  'Treinamento e desenvolvimento contínuo',
  'Flexibilidade de agenda e valorização profissional',
  'Atendimento premium com foco em experiência e cuidado',
];

export default function PaginaTrabalheConosco() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    curriculo: '',
  });
  const [status, setStatus] = useState('');

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('Cadastro enviado com sucesso. Nossa equipe entrará em contato em breve.');
    setForm({ nome: '', email: '', telefone: '', especialidade: '', curriculo: '' });
  }

  return (
    <ShellPublico>
      <div className="min-h-screen flex flex-col justify-between bg-[#f8f7f2] text-[#1d2f26]">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Início', to: '/' },
              { label: 'Institucional', to: null },
              { label: 'Trabalhe Conosco', to: null },
            ]}
          />
        </div>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-2xl bg-[#2D4336] px-5 py-6 text-white shadow-[0_18px_42px_rgba(45,67,54,0.14)] sm:px-7 sm:py-7 lg:px-8">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#d4b055]/15" />
          <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-[#ffffff]/5" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4b055]">Trabalhe conosco</p>
              <h1 className="mt-4 font-lora text-3xl font-bold sm:text-5xl">Faça parte da equipe Blessed 7</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                Junte-se a uma equipe apaixonada por estética, acolhimento e resultados que transformam a autoestima das pessoas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d4b055]">Cultura</p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Valorizamos ética, profissionalismo, atenção ao cliente e cuidado genuíno em cada atendimento.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 grid flex-1 gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl bg-white p-4 shadow-[0_18px_42px_rgba(30,39,32,0.06)] ring-1 ring-[#edf1ee] sm:p-5">
            <h2 className="font-lora text-2xl font-bold text-[#2D4336] sm:text-3xl">Por que fazer parte da nossa equipe?</h2>
            <ul className="mt-4 space-y-2">
              {vantagens.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-[#edf1ee] bg-[#fafcfb] p-3 text-sm leading-6 text-[#536558]">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4b055] text-[10px] font-bold text-[#2D4336]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 shadow-[0_18px_42px_rgba(30,39,32,0.06)] ring-1 ring-[#edf1ee] sm:p-5">
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#7d8d83]">Inscrição</p>
              <h2 className="mt-2 font-lora text-2xl font-bold text-[#2D4336] sm:text-3xl">Candidate-se agora</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-[#2D4336]">
                Nome
                <input
                  value={form.nome}
                  onChange={(event) => handleChange('nome', event.target.value)}
                  className="rounded-xl border border-[#e6eae6] bg-[#f8faf8] px-3 py-2.5 text-sm text-[#1d2f26] outline-none transition focus:border-[#2D4336] focus:ring-2 focus:ring-[#d4b055]/20"
                  placeholder="Seu nome completo"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-[#2D4336]">
                E-mail
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange('email', event.target.value)}
                  className="rounded-xl border border-[#e6eae6] bg-[#f8faf8] px-3 py-2.5 text-sm text-[#1d2f26] outline-none transition focus:border-[#2D4336] focus:ring-2 focus:ring-[#d4b055]/20"
                  placeholder="seu@email.com"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-[#2D4336]">
                Telefone
                <input
                  value={form.telefone}
                  onChange={(event) => handleChange('telefone', event.target.value)}
                  className="rounded-xl border border-[#e6eae6] bg-[#f8faf8] px-3 py-2.5 text-sm text-[#1d2f26] outline-none transition focus:border-[#2D4336] focus:ring-2 focus:ring-[#d4b055]/20"
                  placeholder="(11) 99999-9999"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-[#2D4336]">
                Especialidade
                <input
                  value={form.especialidade}
                  onChange={(event) => handleChange('especialidade', event.target.value)}
                  className="rounded-xl border border-[#e6eae6] bg-[#f8faf8] px-3 py-2.5 text-sm text-[#1d2f26] outline-none transition focus:border-[#2D4336] focus:ring-2 focus:ring-[#d4b055]/20"
                  placeholder="Estética, skincare, laser..."
                  required
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-[#2D4336]">
              Link ou upload do currículo
              <input
                value={form.curriculo}
                onChange={(event) => handleChange('curriculo', event.target.value)}
                className="rounded-xl border border-[#e6eae6] bg-[#f8faf8] px-3 py-2.5 text-sm text-[#1d2f26] outline-none transition focus:border-[#2D4336] focus:ring-2 focus:ring-[#d4b055]/20"
                placeholder="https://linkedin.com/in/seu-perfil"
              />
            </label>

            <div className="mt-5 rounded-[1.2rem] border border-dashed border-[#d5d9d4] bg-[#fafcfb] p-4 text-xs text-[#617266]">
              Também é possível anexar o currículo em PDF ou Word pela área de recrutamento da nossa equipe após o envio inicial.
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-[#2D4336] px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#23372b]"
            >
              Enviar candidatura
            </button>

            {status && (
              <div className="mt-4 rounded-xl border border-[#cfe4d4] bg-[#edf8ef] px-3 py-2 text-sm text-[#1d5f34]">
                {status}
              </div>
            )}
          </form>
        </section>
        </main>
      </div>
    </ShellPublico>
  );
}
