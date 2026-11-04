import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

export default function CartaoDeLogin() {
  const navigate = useNavigate();
  const { salvarUsuario } = useAuth();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const recaptchaRef = useRef(null);
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  async function aoEnviarFormulario(e) {
    e.preventDefault();
    if (!recaptchaSiteKey) {
      toast.error("O CAPTCHA não está configurado.");
      return;
    }
    if (!recaptchaToken) {
      toast.error("Confirme o CAPTCHA para continuar.");
      return;
    }

    setLoading(true);

    try {
      const dados = await login({ email, senha, recaptchaToken });
      salvarUsuario(dados);

      const decodedToken = jwtDecode(dados.token);
      const role = decodedToken.role;

      if (role === 'CLIENTE') navigate('/agendar');
      else navigate('/agendamentos');

    } catch {
      toast.error("Não foi possível autenticar. Verifique seus dados e o CAPTCHA.");
      recaptchaRef.current?.reset();
      setRecaptchaToken("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl px-10 py-10 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#1B3A4B] mb-2">Bem-vindo!</h1>
        <p className="text-sm text-gray-500">
          Por favor, insira suas credenciais para acessar seu perfil.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</label>
          <input
            type="email"
            placeholder="exemplo@dominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8982A] transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Senha</label>
            <a href="#" className="text-xs text-[#B8982A] hover:underline font-medium">Esqueceu senha?</a>
          </div>
          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8982A] transition pr-12"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              {mostrarSenha
                ? <EyeOff size={20} strokeWidth={1.8} aria-hidden="true" />
                : <Eye size={20} strokeWidth={1.8} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {recaptchaSiteKey ? (
          <div className="flex justify-center overflow-hidden">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaSiteKey}
              onChange={(token) => setRecaptchaToken(token || "")}
              onExpired={() => setRecaptchaToken("")}
              onErrored={() => {
                setRecaptchaToken("");
                toast.error("Não foi possível carregar o CAPTCHA.");
              }}
            />
          </div>
        ) : (
          <p className="text-center text-sm text-red-600">
            CAPTCHA indisponível. Configure a chave pública do reCAPTCHA v2.
          </p>
        )}

        <button
          onClick={aoEnviarFormulario}
          disabled={loading}
          className="w-full bg-[#B8982A] hover:bg-[#A0831F] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Entrando...' : 'ENTRAR'}
          <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <p className="text-center text-sm text-gray-500">
          Não possui uma conta?{" "}
          <button onClick={() => navigate("/cadastro")} className="text-[#B8982A] font-semibold hover:underline bg-transparent border-none cursor-pointer">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
}