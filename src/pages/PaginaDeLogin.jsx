import BarraDeNavegacao from "../components/BarraDeNavegacao";
import CartaoDeLogin from "../components/CartaoDeLogin";
import Rodape from "../components/Rodape";

import imagemFundo from "../assets/fundoLogin.png"; 

export default function PaginaDeLogin() {
  return (
    <div className="min-h-screen flex flex-col">


      <div className="relative flex-1">


        <img
          src={imagemFundo}
          alt="Interior do salão Blessed 7"
          className="w-full h-full object-cover absolute inset-0"
        />

    
        <div className="relative z-10 flex flex-col h-full">

    
          <div className="mt-auto">
            <BarraDeNavegacao />
          </div>

          <div className="flex justify-center pr-0 pt-8">
            <div className="w-105">
              <CartaoDeLogin />
            </div>
          </div>




          <div className="flex-1" />

        </div>
      </div>


      <Rodape />

    </div>
  );
}