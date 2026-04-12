import { useState } from "react";

export default function CartaoDeCadastro() {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);


  const aoDigitarTelefone = (e) => {
    const apenasNumeros = e.target.value.replace(/\D/g, "");
    const formatado = apenasNumeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
    setTelefone(formatado);
  };

  const aoEnviarFormulario = (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    if (!aceitouTermos) {
      alert("Você precisa aceitar os Termos de Serviço para continuar.");
      return;
    }


    console.log("Dados de cadastro:", { nomeCompleto, telefone, email, senha });
  };

  const estiloInput =
    "w-full bg-[#EEF2E6] border border-transparent rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8982A] transition";

  const estiloLabel =
    "text-xs font-semibold text-gray-600 uppercase tracking-wider";

  return (
    <div className="bg-white/75 backdrop-blur-md rounded-2xl shadow-xl px-10 py-8 w-full max-w-lg mx-auto">


      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#1B3A4B] mb-1">Crie sua conta</h1>
        <p className="text-sm text-gray-500">
          Comece sua jornada para o bem-estar absoluto.
        </p>
      </div>

      <div className="flex flex-col gap-4">


        <div className="flex flex-col gap-1">
          <label className={estiloLabel}>Nome completo</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nomeCompleto}
            onChange={(e) => setNomeCompleto(e.target.value)}
            className={estiloInput}
          />
        </div>


        <div className="flex gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className={estiloLabel}>Telefone</label>
            <input
              type="tel"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={aoDigitarTelefone}
              className={estiloInput}
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className={estiloLabel}>Email</label>
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={estiloInput}
            />
          </div>
        </div>


        <div className="flex flex-col gap-1">
          <label className={estiloLabel}>Senha</label>
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={estiloInput}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={estiloLabel}>Confirmar senha</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className={estiloInput}
          />
        </div>


        <div className="flex items-start gap-2 mt-1">
          <input
            type="checkbox"
            id="aceitarTermos"
            checked={aceitouTermos}
            onChange={(e) => setAceitouTermos(e.target.checked)}
            className="mt-0.5 accent-[#B8982A] w-4 h-4 cursor-pointer"
          />
          <label htmlFor="aceitarTermos" className="text-xs text-gray-500 leading-relaxed">
            Ao se cadastrar, você concorda com nossos{" "}
            <a href="#" className="text-[#B8982A] hover:underline font-medium">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="text-[#B8982A] hover:underline font-medium">
              Política de Privacidade
            </a>
            .
          </label>
        </div>


        <button
          onClick={aoEnviarFormulario}
          className="w-full bg-[#B8982A] hover:bg-[#A0831F] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mt-1"
        >
          CADASTRAR
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>


        <p className="text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <a href="#" className="text-[#B8982A] font-semibold hover:underline">
            Fazer login
          </a>
        </p>

      </div>
    </div>
  );
}