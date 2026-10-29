import React from 'react';
import { AlertTriangle, ArrowDown, BriefcaseBusiness, Truck } from 'lucide-react';

const iconProps = { size: 20, strokeWidth: 2, 'aria-hidden': true };
const iconeTotal = <BriefcaseBusiness {...iconProps} />;
const iconeCritico = <AlertTriangle {...iconProps} />;
const iconeBaixo = <ArrowDown {...iconProps} />;
const iconeEntrega = <Truck {...iconProps} />;

const config = {
  total:    { icone: iconeTotal,   cor: 'bg-[#f0f5f0] text-[#2C3E2D]', borda: '' },
  critico:  { icone: iconeCritico, cor: 'bg-red-50 text-red-600',        borda: 'border-l-4 border-l-red-400' },
  baixo:    { icone: iconeBaixo,   cor: 'bg-amber-50 text-amber-600',    borda: 'border-l-4 border-l-amber-400' },
  entrega:  { icone: iconeEntrega, cor: 'bg-[#f5f4ec] text-[#2C3E2D]',  borda: '' },
};

export default function CartaoKPIEstoque({ tipo = 'total', rotulo, valor, destaque = false }) {
  const { icone, cor, borda } = config[tipo] || config.total;
  return (
    <div className={`bg-white border border-[#e8e6d9] rounded-xl p-5 flex items-start gap-4 ${borda}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cor}`}>
        {icone}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{rotulo}</p>
        <p className={`text-2xl font-black leading-none ${destaque ? 'text-red-600' : 'text-gray-900'}`}>
          {valor}
        </p>
      </div>
    </div>
  );
}
