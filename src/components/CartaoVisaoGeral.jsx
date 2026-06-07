import React from 'react';

export default function CartaoVisaoGeral({ total = 0, procedimentoTop = '—', carregando = false }) {
  const ocupacao = total > 0 ? Math.min(100, Math.round((total / 20) * 100)) : 0;

  return (
    <div className="bg-[#536D5D] rounded-xl p-5 relative overflow-hidden">
      <div className="absolute -bottom-4 -right-4 opacity-10 pointer-events-none select-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="white">
          <path d="M50 5 C20 5, 5 30, 5 50 C5 70, 20 90, 50 90 C50 90, 95 70, 95 30 C95 15, 75 5, 50 5 Z"/>
        </svg>
      </div>

      <h3 className="text-white font-semibold text-sm mb-1">Visão Geral</h3>
      <p className="text-[#a8c5a0] text-xs leading-relaxed mb-4">
        Você tem{' '}
        <span className="text-white font-bold">
          {carregando ? '...' : `${total} agendamento${total !== 1 ? 's' : ''}`}
        </span>{' '}
        no período selecionado.
      </p>

      <div className="space-y-2.5 relative z-10">
        <div className="flex justify-between items-center">
          <span className="text-[#a8c5a0] text-xs">Taxa de Ocupação</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-[#a8c5a0] rounded-full transition-all duration-700" style={{ width: `${ocupacao}%` }}/>
            </div>
            <span className="text-white text-xs font-bold">{ocupacao}%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#a8c5a0] text-xs">Procedimento mais comum</span>
          <span className="text-white text-xs font-bold truncate max-w-[90px] text-right">
            {carregando ? '...' : procedimentoTop}
          </span>
        </div>
      </div>
    </div>
  );
}
