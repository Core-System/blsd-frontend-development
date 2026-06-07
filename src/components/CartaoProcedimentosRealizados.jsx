import React, { useEffect, useState } from 'react';
import GraficoReceitaAnual from './GraficoReceitaAnual';
import { getRankingServicos } from '../services/dashboardService';

export default function CartaoProcedimentosRealizados() {
  const [ranking, setRanking] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await getRankingServicos();
        // Calcula percentual relativo ao maior
        const max = Math.max(...data.map((r) => Number(r.quantidade)), 1);
        const comPct = data.map((r) => ({
          nome: r.servico.toUpperCase(),
          quantidade: Number(r.quantidade),
          pct: Math.round((Number(r.quantidade) / max) * 100),
        }));
        setRanking(comPct);
      } catch (e) {
        console.error('Erro ao carregar ranking de serviços:', e);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return (
    <div className="bg-[#f0f5f0] border border-[#dce8dc] rounded-xl p-5 flex flex-col flex-1 h-full gap-5">
      <div>
        <h2 className="text-sm font-bold text-[#2C3E2D] mb-4">Procedimentos mais Realizados</h2>

        {carregando ? (
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
            {ranking.map((p) => (
              <div key={p.nome}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#2C3E2D] tracking-widest">{p.nome}</span>
                  <span className="text-[10px] font-bold text-[#2C3E2D]">{p.quantidade}x</span>
                </div>
                <div className="h-1.5 bg-[#c8dac8] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#2C3E2D] transition-all duration-700"
                    style={{ width: `${p.pct}%` }}
                  />
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
