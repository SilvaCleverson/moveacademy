"use client";

import { Missao } from "@/lib/types/guerreiro";

interface MapaTrilhaProps {
  missoes: Missao[];
  missoesConcluidas: string[]; // IDs das missões concluídas
}

export default function MapaTrilha({ missoes, missoesConcluidas }: MapaTrilhaProps) {
  return (
    <div className="relative py-6 sm:py-8">
      {/* Linha conectora */}
      <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sui-blue via-sui-cyan to-move-green opacity-30" />

      {/* Missões */}
      <div className="space-y-4 sm:space-y-6 relative">
        {missoes.map((missao, index) => {
          const concluida = missoesConcluidas.includes(missao.id);
          const disponivel = index === 0 || missoesConcluidas.includes(missoes[index - 1].id);

          return (
            <div key={missao.id} className="flex items-start sm:items-center gap-3 sm:gap-4 relative">
              {/* Nó da missão */}
              <div
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold transition-all duration-300 ${
                  concluida
                    ? "bg-gradient-sui-move text-[#020617] shadow-lg shadow-sui-blue/50 scale-110"
                    : disponivel
                    ? "bg-aqua-soft text-sui-blue border-2 border-sui-blue/50"
                    : "bg-[#1E293B] text-[#4B5563] border-2 border-[#1E293B]"
                }`}
              >
                {concluida ? "✓" : disponivel ? missao.numero : "🔒"}
              </div>

              {/* Info da missão */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-lg sm:text-xl">{missao.icone}</span>
                  <h4
                    className={`font-semibold text-sm sm:text-base ${
                      concluida ? "text-move-green" : disponivel ? "text-[#E5E7EB]" : "text-[#6B7280]"
                    }`}
                  >
                    {missao.titulo}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-[#CBD5F5]">{missao.descricao}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

