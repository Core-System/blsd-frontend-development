import React from 'react';

const iconRelogio = (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2" strokeLinecap="round"/>
  </svg>
);

const horarios = [
  { horario: '09:00', periodo: 'Manhã', popular: false },
  { horario: '10:30', periodo: 'Manhã', popular: false },
  { horario: '13:00', periodo: 'Tarde', popular: true },
  { horario: '14:30', periodo: 'Tarde', popular: false },
  { horario: '16:00', periodo: 'Tarde', popular: true },
  { horario: '17:30', periodo: 'Tarde', popular: false },
];

export default function SeletorDeHorario({ horarioSelecionado, aoSelecionarHorario, carregando = false }) {
  if (carregando) {
    return (
      <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(22,30,26,0.08)] ring-1 ring-[#edf1ee]">
        <div className="mb-4 flex items-center gap-2 text-[#2C3E2D]">
          {iconRelogio}
          <span className="text-sm font-semibold">Horários Disponíveis</span>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="animate-pulse space-y-2">
              <div className="h-3 w-20 rounded-full bg-[#edf1ee]" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-11 rounded-xl bg-[#f1f5f2]" />
                <div className="h-11 rounded-xl bg-[#f1f5f2]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const grupos = {
    Manhã: horarios.filter((h) => h.periodo === 'Manhã'),
    Tarde: horarios.filter((h) => h.periodo === 'Tarde'),
  };

  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(22,30,26,0.08)] ring-1 ring-[#edf1ee]">
      <div className="mb-4 flex items-center gap-2 text-[#2C3E2D]">
        {iconRelogio}
        <span className="text-sm font-semibold">Horários Disponíveis</span>
      </div>

      <div className="space-y-4">
        {Object.entries(grupos).map(([periodo, slots]) => (
          <div key={periodo}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6d796f]">{periodo}</span>
              {periodo === 'Tarde' && (
                <span className="rounded-full bg-[#f3e8c4] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#5d4b1a]">
                  Mais procurado
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {slots.map(({ horario, popular }) => {
                const selecionado = horarioSelecionado === horario;
                return (
                  <button
                    key={horario}
                    type="button"
                    onClick={() => aoSelecionarHorario(horario)}
                    className={`relative rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      selecionado
                        ? 'border-[#2D4336] bg-[#2D4336] text-white shadow-[0_12px_28px_rgba(45,67,54,0.2)]'
                        : 'border-[#e8ece8] bg-white text-[#495a4d] hover:border-[#2D4336] hover:text-[#2D4336]'
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {horario}
                      {popular && (
                        <span className="rounded-full bg-[#d4b055] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#2D4336]">
                          Top
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
