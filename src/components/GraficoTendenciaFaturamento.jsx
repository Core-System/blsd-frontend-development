import React, { useRef, useEffect } from 'react';
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

Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Tooltip);

const dados = [28000, 45000, 38000, 72000, 55000, 80000, 62000, 90000, 74000, 85000, 95000, 52480];
const dadosAnterior = [22000, 35000, 30000, 55000, 42000, 60000, 50000, 70000, 58000, 68000, 75000, 44000];
const rotulos = ['Nov 2024', 'Dez 2024', 'Jan 2025', 'Fev 2025', 'Mar 2025', 'Abr 2025', 'Mai 2025', 'Jun 2025', 'Jul 2025', 'Ago 2025', 'Set 2025', 'Mar 2026'];

export default function GraficoTendenciaFaturamento() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    const gradiente = ctx.createLinearGradient(0, 0, 0, 220);
    gradiente.addColorStop(0, 'rgba(184,152,42,0.18)');
    gradiente.addColorStop(1, 'rgba(184,152,42,0)');

    chartRef.current = new Chart(ctx, {
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
          {
            label: 'Anterior',
            data: dadosAnterior,
            borderColor: '#c5c0b0',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: false,
            tension: 0.45,
            borderDash: [4, 4],
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
              label: (ctx) => ` R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#aaa', font: { size: 10 }, maxRotation: 0 },
            border: { display: false },
          },
          y: {
            display: false,
            grid: { display: false },
          },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, []);

  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5 flex flex-col flex-1 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900">Tendência de Faturamento</h2>
        <div className="flex items-center gap-4 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B8982A] inline-block"/>Atual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#c5c0b0] inline-block"/>Anterior
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-0" style={{ minHeight: 200 }}>
        <canvas ref={canvasRef}/>
      </div>
    </div>
  );
}
