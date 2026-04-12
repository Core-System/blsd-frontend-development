import BarraDeNavegacao from "../components/BarraDeNavegacao";
import CartaoDeCadastro from "../components/CartaoDeCadastro";
import Rodape from "../components/Rodape";

import imagemFundo from "../assets/fundoLogin.png"; 

export default function PaginaDeCadastro() {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="relative flex-1">

        <img
          src={imagemFundo}
          alt="Interior do salão Blessed 7"
          className="w-full h-full object-cover absolute inset-0"
        />


        <div className="relative z-10 flex flex-col h-full">


          <BarraDeNavegacao />

          <div className="flex-1 flex items-center justify-center py-10">
            <CartaoDeCadastro />
          </div>

        </div>
      </div>

      <Rodape />

    </div>
  );
}