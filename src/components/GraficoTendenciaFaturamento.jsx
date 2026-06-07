import React, { useRef, useEffect, useState } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from 'chart.js';
import { getTendenciaFaturamento } from '../services/dashboardService';

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Tooltip);

const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

function buildChart(ctx, rotulos, dados) {
  const gradiente = ctx.createLinearGradient(0, 0, 0, 220);
  gradiente.addColorStop(0, 'rgba(184,152,42,0.18)');
  gradiente.addColorStop(1, 'rgba(184,152,42,0)');

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: rotulos,
      datasets: [
        {
          label: 'Atual',
          data: dados,
          borderColor: '#B8982A',
          borderWidth: 2.5,
          pointBackgroundColor: '#B8982A',
          pointRadius: 3,
          pointHoverRadius: 6,
          fill: true,
          backgroundColor: gradiente,
          tension: 0.45,
        },
      ],
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
            label: (ctx) =>
              ` R$ ${ctx.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#aaa', font: { size: 10 }, maxRotation: 0 },
          border: { display: false },
        },
        y: { display: false, grid: { display: false } },
      },
    },
  });
}

export default function GraficoTendenciaFaturamento() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function carregar() {
      try {
        const tendencia = await getTendenciaFaturamento();
        if (!mounted || !canvasRef.current) return;

        // Ordena por ano/mês e monta rótulos e valores
        const ordenado = [...tendencia].sort((a, b) =>
          a.ano !== b.ano ? a.ano - b.ano : a.mes - b.mes
        );
        const rotulos = ordenado.map((t) => `${MESES[t.mes - 1]} ${t.ano}`);
        const dados = ordenado.map((t) => Number(t.total));

        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = buildChart(ctx, rotulos, dados);
      } catch (e) {
        console.error('Erro ao carregar tendência de faturamento:', e);
        if (mounted) setErro(true);
      } finally {
        if (mounted) setCarregando(false);
      }
    }

    carregar();
    return () => {
      mounted = false;
      chartRef.current?.destroy();
    };
  }, []);

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5 flex flex-col flex-1 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900">Tendência de Faturamento</h2>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#B8982A] inline-block"/>Atual
        </span>
      </div>

      <div className="flex-1 min-h-0" style={{ minHeight: 200 }}>
        {carregando && (
          <div className="h-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#B8982A] border-t-transparent rounded-full animate-spin"/>
          </div>
        )}
        {erro && !carregando && (
          <div className="h-full flex items-center justify-center text-xs text-gray-400">
            Sem dados de faturamento disponíveis.
          </div>
        )}
        <canvas ref={canvasRef} className={carregando || erro ? 'hidden' : ''}/>
      </div>
    </div>
  );
}
