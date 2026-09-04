import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrar } from "../services/authService";
import { formatarTelefone } from "../utils/formatters";
import { validarEmail, validarSenha } from "../utils/validators";
import { removerMascara } from "../utils/masks";
import { toast } from "sonner";

export default function CartaoDeCadastro() {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const aoDigitarTelefone = (e) => {
    const formatado = formatarTelefone(e.target.value);
    setTelefone(formatado);
  };

  async function aoEnviarFormulario(e) {
    e.preventDefault();
    setErro(null);

    if (!nomeCompleto || !email || !senha || !telefone || !dataNasc) {
      setErro("Preencha todos os campos.");
      return;
    }
   
    if (!validarEmail(email)) {
      setErro("Por favor, insira um e-mail válido.");
      return;
    }

    if (!validarSenha(senha)) {
      setErro('A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula, um número e um caractere especial.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    if (!aceitouTermos) {
      setErro("Aceite os termos para continuar.");
      return;
    }

    setLoading(true);
    try {
      await cadastrar({
        nome: nomeCompleto,
        email,
        senha,
        telefone: removerMascara(telefone),
        dataNasc,
      });
      navigate("/login");
    } catch (e) {
      const mensagemServidor = e.response?.data?.message;
      if (e.response?.status === 400) {
        toast.error('Verifique os dados informados. A data de nascimento deve ser no passado.');
      } else if (e.response?.status === 409) {
        toast.error(mensagemServidor);
      } else {
        toast.error('Erro ao cadastrar. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  const hoje = new Date().toISOString().split('T')[0];

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
          <label className={estiloLabel}>Data de nascimento</label>
          <input
            type="date"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
            max={hoje}
            className={estiloInput}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className={estiloLabel}>Senha</label>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={`${estiloInput} pr-12`}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {mostrarSenha ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className={estiloLabel}>Confirmar senha</label>
          <div className="relative">
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className={`${estiloInput} pr-12`}
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {mostrarConfirmarSenha ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
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

        {erro && (
          <p className="text-red-500 text-sm text-center">{erro}</p>
        )}

        <button
          onClick={aoEnviarFormulario}
          disabled={loading}
          className="w-full bg-[#B8982A] hover:bg-[#A0831F] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Cadastrando...' : 'CADASTRAR'}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <p className="text-center text-sm text-gray-500">
          Já tem conta?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-lg font-semibold text-gray-900 hover:text-[#B8982A] transition-colors duration-200 bg-transparent border-none cursor-pointer"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
}