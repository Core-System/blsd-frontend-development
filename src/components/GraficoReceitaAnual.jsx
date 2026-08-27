import React, { useRef, useEffect, useState } from 'react';


import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Tooltip,
  DoughnutController,
  ArcElement,
} from 'chart.js';
import { getReceitaPorAno } from '../services/dashboardService';

Chart.register(DoughnutController, ArcElement, Tooltip);

export default function GraficoReceitaAnual() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [dados, setDados] = useState(null);

  // 1. Busca os dados
  useEffect(() => {
    let mounted = true;
    getReceitaPorAno()
      .then((res) => {
        if (!mounted) return;
        const lista = Array.isArray(res) ? res : [];
        // Simula distribuição: últimos 2 anos mostram PIX vs Cartão
        const simulado = lista.slice(-2).map((r, idx) => ({
          ano: r.ano,
          total: r.total,
          metodo: idx % 2 === 0 ? 'PIX' : 'Cartão',
        }));
        // Agrupa por método
        const porMetodo = {};
        simulado.forEach((item) => {
          if (!porMetodo[item.metodo]) porMetodo[item.metodo] = 0;
          porMetodo[item.metodo] += item.total;
        });
        const rotulos = Object.keys(porMetodo);
        setDados(rotulos.length > 0 ? {
          rotulos,
          valores: Object.values(porMetodo),
        } : { rotulos: [], valores: [] });
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
    const cores = ['#2C3E2D', '#B8982A', '#d4b055', '#7a8d7c', '#56675d'];
    
    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: dados.rotulos,
        datasets: [{
          data: dados.valores,
          backgroundColor: cores.slice(0, dados.valores.length),
          borderColor: '#f0f5f0',
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: { size: 9, weight: 'bold' },
              color: '#666',
              padding: 12,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: '#2C3E2D',
            titleColor: '#a8c5a0',
            bodyColor: '#fff',
            padding: 10,
            callbacks: {
              label: (ctx) => {
                const valor = ctx.parsed;
                const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                const pct = Math.round((valor / total) * 100);
                return ` R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 0 })} (${pct}%)`;
              },
            },
          },
        },
      },
    });

    return () => { chartRef.current?.destroy(); };
  }, [dados]); // dispara quando dados muda

  return (
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Receita por Método</p>
      <div style={{ height: 140 }}>
        {dados === null ? (
          // skeleton
          <div className="h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#B8982A] border-t-transparent animate-spin"/>
          </div>
        ) : dados.valores.length === 0 ? (
          <p className="text-[10px] text-gray-400 py-6 text-center">Sem dados disponíveis.</p>
        ) : (
          // canvas sempre montado quando dados existem
          <canvas ref={canvasRef}/>
        )}
      </div>
    </div>
  );
}
