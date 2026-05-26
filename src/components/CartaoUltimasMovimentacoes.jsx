import { useState, useEffect } from 'react';
import { listarMovimentacoes } from '../services/movimentacaoService';

export default function CartaoUltimasMovimentacoes({ movimentacoes = [] }) {
  
  return (
    <div className="bg-white border border-[#e8e6d9] rounded-xl p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">Últimas Movimentações</h2>
      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-2">
        {movimentacoes.length === 0 && (
          <p className="text-sm text-gray-400 py-4 text-center">Nenhuma movimentação registrada.</p>
        )}
        {movimentacoes.map((m) => (
          <div key={m.id} className="flex items-center gap-3 py-2 border-b border-[#f0eeea] last:border-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.tipo === 'ENTRADA' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
            }`}>
              {m.tipo === 'ENTRADA' ? '↑' : '↓'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {m.tipo === 'ENTRADA' ? 'Entrada: ' : 'Saída: '}{m.nomeProduto}
              </p>
              <p className="text-[11px] text-gray-400">
                {new Date(m.dataHora).toLocaleString('pt-BR')}
              </p>
            </div>
            <span className={`text-sm font-bold flex-shrink-0 ${
              m.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-500'
            }`}>
              {m.tipo === 'ENTRADA' ? '+' : '-'}{m.quantidade} un.
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}