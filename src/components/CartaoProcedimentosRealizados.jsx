import React, { useEffect, useState } from 'react';
import GraficoReceitaAnual from './GraficoReceitaAnual';
import { getRankingServicos } from '../services/dashboardService';

export default function CartaoProcedimentosRealizados({ onDadosCarregados }) {
  const [ranking, setRanking] = useState(null); // null=carregando

  useEffect(() => {
    getRankingServicos()
      .then((res) => {
        const lista = Array.isArray(res) ? res : [];
        if (lista.length === 0) {
          setRanking([]);
          onDadosCarregados?.([]);
          return;
        }
        // Garante que r.servico existe antes de chamar .toUpperCase()
        const max = Math.max(...lista.map((r) => Number(r.quantidade) || 0), 1);
        const rankingFormatado = lista.map((r) => ({
          nome: (r.servico || r.nome || 'Serviço').toUpperCase(),
          quantidade: Number(r.quantidade) || 0,
          pct: Math.round(((Number(r.quantidade) || 0) / max) * 100),
        }));
        setRanking(rankingFormatado);
        onDadosCarregados?.(rankingFormatado);
      })
      .catch((e) => {
        console.error('Erro ranking serviços:', e);
        setRanking([]); // estado seguro em caso de erro
        onDadosCarregados?.([]);
      });
  }, []);

  return (
    <div className="bg-[#f0f5f0] border border-[#dce8dc] rounded-xl p-5 flex flex-col flex-1 h-full gap-5">
      <div>
        <h2 className="text-sm font-bold text-[#2C3E2D] mb-4">Procedimentos mais Realizados</h2>

        {ranking === null ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-3 w-32 bg-[#c8dac8] animate-pulse rounded mb-1.5"/>
                <div className="h-1.5 bg-[#c8dac8] animate-pulse rounded-full"/>
              </div>
            ))}
          </div>
        ) : ranking.length === 0 ? (
          <p className="text-xs text-[#2C3E2D]/50">Sem dados de procedimentos.</p>
        ) : (
          <div className="space-y-3">
            {ranking.map((p, i) => (
              <div key={p.nome + i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#2C3E2D] tracking-widest">{p.nome}</span>
                  <span className="text-[10px] font-bold text-[#2C3E2D]">{p.quantidade}x</span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex-1 h-0.75 bg-gradient-to-r from-[#2C3E2D] to-[#7a8d7c] rounded-full overflow-hidden shadow-sm">
                    <div
                      className="h-full bg-gradient-to-r from-[#2C3E2D] via-[#3a5340] to-[#2C3E2D] transition-all duration-700"
                      style={{ width: `${p.pct}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-bold text-[#7a8d7c] min-w-8">{p.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[#c8dac8] pt-4">
        <GraficoReceitaAnual />
      </div>
    </div>
  );
}
