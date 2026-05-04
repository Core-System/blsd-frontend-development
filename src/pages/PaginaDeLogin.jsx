import BarraDeNavegacaoSuperior from "../components/BarraDeNavegacaoSuperior";
import CartaoDeLogin from "../components/CartaoDeLogin";
import Rodape from "../components/Rodape";
import imagemFundo from "../assets/fundoLogin.png";

export default function PaginaDeLogin() {
  return (
    <div className="min-h-screen flex flex-col">

      <BarraDeNavegacaoSuperior />

      <div className="relative flex-1 pt-14">
        <img
          src={imagemFundo}
          alt="Interior do salão Blessed 7"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="relative z-10 flex items-center justify-center min-h-full py-16">
          <div className="w-full max-w-md px-4">
            <CartaoDeLogin />
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  );
}