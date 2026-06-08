import React, { useRef, useEffect, useState } from 'react';
import {
  Chart, LineElement, PointElement, LineController,
  CategoryScale, LinearScale, Filler, Tooltip,
} from 'chart.js';
import { getTendenciaFaturamento } from '../services/dashboardService';

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Tooltip);

const MESES = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

export default function GraficoTendenciaFaturamento() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);
  const [dados, setDados] = useState(null); // null=carregando | {rotulos,valores} | 'vazio' | 'erro'

  // 1. Fetch
  useEffect(() => {
    let mounted = true;
    getTendenciaFaturamento()
      .then((res) => {
        if (!mounted) return;
        const lista = Array.isArray(res) ? res : [];
        if (lista.length === 0) { setDados('vazio'); return; }
        const ordenado = [...lista].sort((a, b) =>
          a.ano !== b.ano ? a.ano - b.ano : a.mes - b.mes
        );
        setDados({
          rotulos: ordenado.map((t) => `${MESES[(t.mes ?? 1) - 1]} ${t.ano}`),
          valores: ordenado.map((t) => Number(t.total) || 0),
        });
      })
      .catch((e) => {
        console.error('Erro tendência faturamento:', e);
        if (mounted) setDados('erro');
      });
    return () => {
      mounted = false;
      chartRef.current?.destroy();
    };
  }, []);

  // 2. Cria chart após canvas montar
  useEffect(() => {
    if (!dados || typeof dados !== 'object' || !canvasRef.current) return;
    chartRef.current?.destroy();

    const ctx = canvasRef.current.getContext('2d');
    const gradiente = ctx.createLinearGradient(0, 0, 0, 220);
    gradiente.addColorStop(0, 'rgba(184,152,42,0.18)');
    gradiente.addColorStop(1, 'rgba(184,152,42,0)');

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dados.rotulos,
        datasets: [{
          label: 'Atual',
          data: dados.valores,
          borderColor: '#B8982A',
          borderWidth: 2.5,
          pointBackgroundColor: '#B8982A',
          pointRadius: 3,
          pointHoverRadius: 6,
          fill: true,
          backgroundColor: gradiente,
          tension: 0.45,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#2C3E2D',
            titleColor: '#a8c5a0',
            bodyColor: '#fff',
            padding: 10,
            callbacks: {
              label: (c) => ` R$ ${c.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#aaa', font: { size: 10 }, maxRotation: 0 }, border: { display: false } },
          y: { display: false, grid: { display: false } },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, [dados]);

  const vazio = dados === 'vazio' || dados === 'erro';

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5 flex flex-col flex-1 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900">Tendência de Faturamento</h2>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#B8982A] inline-block"/>Atual
        </span>
      </div>
      <div className="flex-1 min-h-0" style={{ minHeight: 200 }}>
        {dados === null && (
          <div className="h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#B8982A] border-t-transparent rounded-full animate-spin"/>
          </div>
        )}
        {vazio && (
          <div className="h-full flex items-center justify-center text-xs text-gray-400">
            Sem dados de faturamento disponíveis.
          </div>
        )}
        {!vazio && dados !== null && <canvas ref={canvasRef}/>}
      </div>
    </div>
  );
}
