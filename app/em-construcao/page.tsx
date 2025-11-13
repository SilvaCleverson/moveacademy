"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmConstrucaoPage() {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] flex items-center justify-center p-6 sm:p-4">
      <div className="max-w-2xl w-full">
        <div className="hud-panel p-6 sm:p-8 text-center">
          {/* Ícone de construção */}
          <div className="mb-6">
            <div className="text-6xl sm:text-7xl mb-4">🚧</div>
            <div className="h-1 bg-gradient-to-r from-transparent via-sui-blue to-transparent opacity-60" />
          </div>

          {/* Título */}
          <div className="hud-text-box mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sui-blue mb-3 font-mono uppercase tracking-wider">
              {lang === "pt" 
                ? "EM CONSTRUÇÃO" 
                : lang === "en" 
                ? "UNDER CONSTRUCTION" 
                : "EN CONSTRUCCIÓN"}
            </h1>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-sui-blue/60 to-transparent my-3" />
            <p className="text-[#E5E7EB] text-base sm:text-lg font-mono">
              {lang === "pt"
                ? "Esta trilha está sendo desenvolvida. Em breve, novas missões estarão disponíveis!"
                : lang === "en"
                ? "This track is under development. New missions will be available soon!"
                : "Esta pista está en desarrollo. ¡Pronto estarán disponibles nuevas misiones!"}
            </p>
          </div>

          {/* Mensagem adicional */}
          <div className="hud-text-box mb-6">
            <p className="text-[#CBD5F5] text-sm sm:text-base font-mono italic">
              {lang === "pt"
                ? "Continue sua jornada nas trilhas já disponíveis enquanto preparamos conteúdo incrível para você!"
                : lang === "en"
                ? "Continue your journey on the available tracks while we prepare amazing content for you!"
                : "¡Continúa tu viaje en las pistas disponibles mientras preparamos contenido increíble para ti!"}
            </p>
          </div>

          {/* Botões de navegação */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/trilhas"
              className="px-6 py-3 rounded-full bg-gradient-sui-move text-[#020617] font-semibold hover:opacity-90 transition-opacity font-mono text-sm sm:text-base"
            >
              {lang === "pt" ? "← Voltar para Trilhas" : lang === "en" ? "← Back to Tracks" : "← Volver a Pistas"}
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-move-navy border border-sui-blue/50 text-sui-blue font-semibold hover:bg-move-navy/80 transition-colors font-mono text-sm sm:text-base"
            >
              {lang === "pt" ? "🏠 Home" : lang === "en" ? "🏠 Home" : "🏠 Inicio"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

