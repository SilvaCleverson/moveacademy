"use client";

import Link from "next/link";
import { Missao } from "@/lib/types/guerreiro";
import { useLanguage } from "@/contexts/LanguageContext";

interface MissaoCardProps {
  missao: Missao;
  trilhaSlug: string;
  concluida?: boolean;
  bloqueada?: boolean;
  motivoBloqueio?: "trilha_anterior" | "missao_anterior";
}

export default function MissaoCard({
  missao,
  trilhaSlug,
  concluida = false,
  bloqueada = false,
  motivoBloqueio,
}: MissaoCardProps) {
  const { lang } = useLanguage();
  const CardContent = (
    <div
      className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
        bloqueada
          ? "bg-[#0F172A]/50 border-[#1E293B] opacity-50 cursor-not-allowed"
          : concluida
          ? "bg-gradient-to-r from-move-green/20 to-sui-blue/20 border-move-green/50"
          : "bg-move-navy/50 border-sui-blue/25 hover:border-sui-blue/50 hover:bg-move-navy/70 cursor-pointer"
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Número/Status */}
        <div
          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg ${
            bloqueada
              ? "bg-[#1E293B] text-[#4B5563]"
              : concluida
              ? "bg-gradient-sui-move text-[#020617]"
              : "bg-aqua-soft text-sui-blue border border-sui-blue/30"
          }`}
        >
          {bloqueada ? "🔒" : concluida ? "✓" : missao.numero}
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xl sm:text-2xl">{missao.icone}</span>
            {concluida && (
              <span className="px-2 py-0.5 rounded-full bg-move-green/20 text-move-green text-xs font-semibold">
                {lang === "pt" ? "Concluída" : lang === "en" ? "Completed" : "Completada"}
              </span>
            )}
            {bloqueada && (
              <span className="px-2 py-0.5 rounded-full bg-[#1E293B] text-[#9CA3AF] text-xs font-semibold">
                🔒 {lang === "pt" ? "Bloqueada" : lang === "en" ? "Locked" : "Bloqueada"}
              </span>
            )}
          </div>
          <h3
            className={`font-semibold mb-1 text-base sm:text-lg ${
              bloqueada ? "text-[#6B7280]" : concluida ? "text-move-green" : "text-[#E5E7EB]"
            }`}
          >
            {missao.titulo}
          </h3>
          <p className="text-xs sm:text-sm text-[#CBD5F5] mb-3 line-clamp-2">{missao.descricao}</p>
          {bloqueada && (
            <p className="text-xs text-[#9CA3AF] italic mb-2">
              {motivoBloqueio === "trilha_anterior"
                ? (lang === "pt" 
                    ? "Complete todas as missões da trilha anterior para desbloquear"
                    : lang === "en"
                    ? "Complete all missions from the previous trail to unlock"
                    : "Completa todas las misiones de la trilha anterior para desbloquear")
                : (lang === "pt" 
                    ? "Complete a missão anterior para desbloquear"
                    : lang === "en"
                    ? "Complete the previous mission to unlock"
                    : "Completa la misión anterior para desbloquear")
              }
            </p>
          )}

          {/* Recompensas */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
            <div className="flex items-center gap-1 text-sui-blue">
              <span>⭐</span>
              <span>{missao.xpRecompensa} XP</span>
            </div>
            {missao.badgeRecompensa && (
              <div className="flex items-center gap-1 text-move-green">
                <span>{missao.badgeRecompensa.icone}</span>
                <span>{missao.badgeRecompensa.nome}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (bloqueada) {
    return CardContent;
  }

  return (
    <Link href={`/trilhas/${trilhaSlug}/${missao.slug}`}>{CardContent}</Link>
  );
}
