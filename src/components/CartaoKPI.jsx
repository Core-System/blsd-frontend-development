import React from 'react';
import { Hourglass, TrendingUp } from 'lucide-react';

const iconeTendencia = <TrendingUp size={20} strokeWidth={2} aria-hidden="true" />;
const iconeAmpulheta = <Hourglass size={20} strokeWidth={2} aria-hidden="true" />;

const MAPA_ICONES = {
  tendencia: iconeTendencia,
  ampulheta: iconeAmpulheta,
};

export default function CartaoKPI({ icone = 'tendencia', valor, unidade, rotulo, descricao }) {
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#f0f5f0] flex items-center justify-center text-[#2C3E2D] flex-shrink-0">
        {MAPA_ICONES[icone]}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{rotulo}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-black text-gray-900 leading-none">{valor}</span>
          {unidade && <span className="text-sm text-gray-500 font-medium">{unidade}</span>}
        </div>
        {descricao && (
          <p className="text-[11px] text-gray-400 mt-0.5">{descricao}</p>
        )}
      </div>
    </div>
  );
}