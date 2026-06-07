import React, { useRef, useEffect } from 'react';


import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { getReceitaPorAno } from '../services/dashboardService';

Chart.register(BarElement, BarController, CategoryScale, LinearScale, Tooltip);

export default function GraficoReceitaAnual() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [dados, setDados] = useState(null); // null = carregando, [] = vazio, [...] = ok

  // 1. Busca os dados
  useEffect(() => {
    let mounted = true;
    getReceitaPorAno()
      .then((res) => {
        if (!mounted) return;
        const ordenado = [...res].sort((a, b) => a.ano - b.ano);
        setDados({
          rotulos: ordenado.map((r) => String(r.ano)),
          valores: ordenado.map((r) => Number(r.total)),
        });
      })
      .catch((e) => {
        console.error('Erro ao carregar receita anual:', e);
        if (mounted) setDados({ rotulos: [], valores: [] });
      });
    return () => { mounted = false; };
  }, []);

  // 2. Só cria o chart depois que o canvas está no DOM E os dados chegaram
  useEffect(() => {
    if (!dados || !canvasRef.current) return;
    if (dados.valores.length === 0) return;

    chartRef.current?.destroy();

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dados.rotulos,
        datasets: [{
          data: dados.valores,
          backgroundColor: dados.valores.map((_, i) =>
            i === dados.valores.length - 1 ? '#2C3E2D' : '#ddd9cc'
          ),
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
              label: (ctx) =>
                ` R$ ${ctx.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
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
  }, [dados]); // dispara quando dados muda

  return (
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Receita Anual</p>
      <div style={{ height: 90 }}>
        {dados === null ? (
          // skeleton
          <div className="h-full flex items-end gap-1 px-1">
            {[60, 75, 55, 85, 70, 90].map((h, i) => (
              <div key={i} className="flex-1 bg-gray-100 animate-pulse rounded-sm" style={{ height: `${h}%` }}/>
            ))}
          </div>
        ) : dados.valores.length === 0 ? (
          <p className="text-[10px] text-gray-400 pt-2">Sem dados disponíveis.</p>
        ) : (
          // canvas sempre montado quando dados existem
          <canvas ref={canvasRef}/>
        )}
      </div>
    </div>
  );
}
