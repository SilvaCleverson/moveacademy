"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trilhas } from "@/lib/data/trilhas-guerreiro";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";
import { useState, useEffect } from "react";

interface TrilhasSidebarProps {
  missoesConcluidas: string[];
  currentTrilhaSlug?: string;
  currentMissaoSlug?: string;
}

export default function TrilhasSidebar({ missoesConcluidas, currentTrilhaSlug, currentMissaoSlug }: TrilhasSidebarProps) {
  const { lang } = useLanguage();
  const { playSound } = useAudio();
  const [expandedTrilhas, setExpandedTrilhas] = useState<Set<string>>(new Set([currentTrilhaSlug || ""]));
  const [previousMissoesConcluidas, setPreviousMissoesConcluidas] = useState<string[]>([]);

  // Detecta quando uma missão é desbloqueada e toca som
  useEffect(() => {
    if (previousMissoesConcluidas.length > 0) {
      const novasMissoes = missoesConcluidas.filter(id => !previousMissoesConcluidas.includes(id));
      if (novasMissoes.length > 0) {
        // Verifica se alguma trilha foi desbloqueada
        trilhas.forEach((trilha, trilhaIndex) => {
          if (trilhaIndex > 0) {
            const trilhaAnterior = trilhas[trilhaIndex - 1];
            const trilhaAnteriorCompleta = trilhaAnterior.missoes.every(m => missoesConcluidas.includes(m.id));
            const trilhaAnteriorEraCompleta = trilhaAnterior.missoes.every(m => previousMissoesConcluidas.includes(m.id));
            
            if (trilhaAnteriorCompleta && !trilhaAnteriorEraCompleta) {
              playSound("unlock");
            }
          }
        });
      }
    }
    setPreviousMissoesConcluidas([...missoesConcluidas]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missoesConcluidas, playSound]); // previousMissoesConcluidas é intencionalmente omitido

  const toggleTrilha = (slug: string) => {
    playSound("click");
    const newExpanded = new Set(expandedTrilhas);
    if (newExpanded.has(slug)) {
      newExpanded.delete(slug);
    } else {
      newExpanded.add(slug);
    }
    setExpandedTrilhas(newExpanded);
  };

  const getTrilhaProgress = (trilha: typeof trilhas[0]) => {
    const concluidas = trilha.missoes.filter(m => missoesConcluidas.includes(m.id)).length;
    return { concluidas, total: trilha.missoes.length };
  };

  const isMissaoConcluida = (missaoId: string) => {
    return missoesConcluidas.includes(missaoId);
  };

  const isTrilhaCompleta = (trilha: typeof trilhas[0]) => {
    if (trilha.missoes.length === 0) return false;
    return trilha.missoes.every(m => isMissaoConcluida(m.id));
  };

  const isTrilhaBloqueada = (trilhaIndex: number) => {
    // A primeira trilha sempre está disponível
    if (trilhaIndex === 0) return false;
    
    // Verifica se a trilha anterior está completa
    const trilhaAnterior = trilhas[trilhaIndex - 1];
    return !isTrilhaCompleta(trilhaAnterior);
  };

  const isMissaoBloqueada = (trilha: typeof trilhas[0], trilhaIndex: number, missaoIndex: number) => {
    // Se a trilha está bloqueada, todas as missões estão bloqueadas
    if (isTrilhaBloqueada(trilhaIndex)) return true;
    
    // A primeira missão da trilha só está disponível se a trilha não estiver bloqueada
    if (missaoIndex === 0) return false;
    
    // As outras missões só estão disponíveis se a missão anterior foi concluída
    const missaoAnterior = trilha.missoes[missaoIndex - 1];
    return !isMissaoConcluida(missaoAnterior.id);
  };

  return (
    <aside className="w-64 bg-move-navy border-r border-sui-blue/25 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-sui-blue/25">
        <h2 className="text-sm font-bold text-sui-blue uppercase tracking-wider">
          {lang === "pt" ? "Trilhas" : lang === "en" ? "Tracks" : "Trilhas"}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {trilhas.map((trilha, trilhaIndex) => {
            const progress = getTrilhaProgress(trilha);
            const isExpanded = expandedTrilhas.has(trilha.slug);
            const isActive = currentTrilhaSlug === trilha.slug;
            const trilhaBloqueada = isTrilhaBloqueada(trilhaIndex);
            const trilhaCompleta = isTrilhaCompleta(trilha);

            return (
              <div key={trilha.id} className="mb-1">
                <button
                  onClick={() => toggleTrilha(trilha.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-sui-blue/20 text-sui-blue border border-sui-blue/50"
                      : trilhaBloqueada
                      ? "opacity-50 cursor-not-allowed text-[#6B7280]"
                      : "hover:bg-move-navy/80 text-[#CBD5F5]"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg flex-shrink-0">{trilha.icone}</span>
                    <span className="text-sm font-semibold truncate">{trilha.titulo[lang]}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    {trilhaCompleta && (
                      <span className="text-xs text-move-green">✓</span>
                    )}
                    <span className="text-xs text-sui-cyan">
                      {progress.concluidas}/{progress.total}
                    </span>
                    <span className="text-xs">{isExpanded ? "▼" : "▶"}</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {trilha.missoes.map((missao, missaoIndex) => {
                      const concluida = isMissaoConcluida(missao.id);
                      const bloqueada = isMissaoBloqueada(trilha, trilhaIndex, missaoIndex);
                      const isCurrent = currentTrilhaSlug === trilha.slug && currentMissaoSlug === missao.slug;

                      return (
                        <Link
                          key={missao.id}
                          href={bloqueada ? "#" : `/trilhas/${trilha.slug}/${missao.slug}`}
                          onClick={(e) => {
                            if (bloqueada) {
                              e.preventDefault();
                            }
                          }}
                          className={`block px-3 py-1.5 rounded text-sm transition-colors ${
                            isCurrent
                              ? "bg-sui-blue/30 text-sui-blue border-l-2 border-sui-blue"
                              : bloqueada
                              ? "text-[#6B7280] cursor-not-allowed opacity-50"
                              : concluida
                              ? "text-move-green hover:bg-move-navy/50"
                              : "text-[#CBD5F5] hover:bg-move-navy/50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {concluida ? (
                              <span className="text-xs">✓</span>
                            ) : bloqueada ? (
                              <span className="text-xs">🔒</span>
                            ) : (
                              <span className="text-xs">○</span>
                            )}
                            <span className="truncate">
                              {missao.numero}. {missao.titulo}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

