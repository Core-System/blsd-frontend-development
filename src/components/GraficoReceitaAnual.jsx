import React, { useRef, useEffect } from 'react';


import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip);

const dados = [210000, 245000, 198000, 310000, 280000, 380640];
const rotulos = ['2020', '2021', '2022', '2023', '2024', '2025'];

export default function GraficoReceitaAnual() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: rotulos,
        datasets: [{
          data: dados,
          backgroundColor: dados.map((_, i) => i === dados.length - 1 ? '#2C3E2D' : '#ddd9cc'),
          borderRadius: 4,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#2C3E2D',
            titleColor: '#a8c5a0',
            bodyColor: '#fff',
            padding: 8,
            callbacks: {
              label: (ctx) => ` R$ ${ctx.parsed.y.toLocaleString('pt-BR')}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#aaa', font: { size: 9 } },
            border: { display: false },
          },
          y: { display: false },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, []);

  return (
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Receita Anual</p>
      <div style={{ height: 90 }}>
        <canvas ref={canvasRef}/>
      </div>
    </div>
  );
}
