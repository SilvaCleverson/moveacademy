"use client";

import { trilhas } from "@/lib/data/trilhas-guerreiro";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrilhasPage() {
  const { lang } = useLanguage();
  const [trilhaHovered, setTrilhaHovered] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#FFFFFF] p-6 sm:p-4 relative overflow-hidden">
      {/* Background pattern estilo mapa */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(106,215,229,0.1) 20px, rgba(106,215,229,0.1) 22px),
          repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(106,215,229,0.1) 20px, rgba(106,215,229,0.1) 22px)
        `,
      }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Link para Home */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sui-blue hover:text-sui-cyan transition-colors font-mono text-sm"
          >
            ← {lang === "pt" ? "VOLTAR PARA HOME" : lang === "en" ? "BACK TO HOME" : "VOLVER A INICIO"}
          </Link>
        </div>

        {/* Header estilo HUD */}
        <div className="mb-6 sm:mb-8 hud-panel p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div className="hud-text-box">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-sui-blue animate-pulse" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sui-blue font-mono uppercase tracking-wider">
                  {lang === "pt" ? "MAPA DE MOVIARA" : lang === "en" ? "MOVIARA WORLD MAP" : "MAPA DE MOVIARA"}
                </h1>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-sui-blue/60 to-transparent" />
              </div>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-sui-blue to-transparent my-2" />
              <p className="text-[#E5E7EB] text-sm sm:text-base font-mono">
                &gt; {lang === "pt"
                  ? "EXPLORE AS REGIÕES DE MOVIARA E DESPERTE SEU PODER"
                  : lang === "en"
                  ? "EXPLORE THE REGIONS OF MOVIARA AND AWAKEN YOUR POWER"
                  : "EXPLORA LAS REGIONES DE MOVIARA Y DESPIERTA TU PODER"}
              </p>
            </div>
            
          </div>
        </div>

        {/* Mapa Mundi - Grid estilo JRPG */}
        <div className="relative">
          {/* Linhas de conexão entre regiões (estilo mapa) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: 1 }}>
            {trilhas.map((trilha, index) => {
              if (index === trilhas.length - 1) return null;
              const nextTrilha = trilhas[index + 1];
              return (
                <line
                  key={`line-${index}`}
                  x1={`${(index % 2) * 50 + 25}%`}
                  y1={`${Math.floor(index / 2) * 50 + 25}%`}
                  x2={`${((index + 1) % 2) * 50 + 25}%`}
                  y2={`${Math.floor((index + 1) / 2) * 50 + 25}%`}
                  stroke="#6AD7E5"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              );
            })}
          </svg>

          {/* Grid de Regiões (Trilhas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative" style={{ zIndex: 2 }}>
            {trilhas.map((trilha, index) => (
              <Link
                key={trilha.id}
                href={`/trilhas/${trilha.slug}`}
                onMouseEnter={() => setTrilhaHovered(trilha.id)}
                onMouseLeave={() => setTrilhaHovered(null)}
                className="group relative"
              >
                <div
                  className="hud-panel p-6 sm:p-8 hover:border-sui-blue transition-all duration-300 cursor-pointer relative"
                  style={{
                    boxShadow: trilhaHovered === trilha.id
                      ? "inset 0 0 20px rgba(106, 215, 229, 0.3), 0 0 30px rgba(106, 215, 229, 0.4)"
                      : "inset 0 0 15px rgba(106, 215, 229, 0.1)",
                  }}
                >
                  {/* Marcador de região no mapa */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 border-2 border-sui-blue bg-[#0A1A2F] flex items-center justify-center font-mono text-xs font-bold text-sui-blue">
                    {index + 1}
                  </div>

                  {/* Borda lateral colorida */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 transition-opacity"
                    style={{
                      background: `linear-gradient(to bottom, ${trilha.cor || "#3FFE95"}, ${trilha.cor || "#3FFE95"}80)`,
                      opacity: trilhaHovered === trilha.id ? 1 : 0.6,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Cabeçalho da região */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-sui-blue/60 bg-[#0A1A2F] flex items-center justify-center text-4xl sm:text-5xl"
                          style={{
                            boxShadow: `inset 0 0 10px ${trilha.cor || "#3FFE95"}40, 0 0 15px ${trilha.cor || "#3FFE95"}20`,
                          }}
                        >
                          {trilha.icone}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="hud-text-box mb-2">
                          <h2 className="text-xl sm:text-2xl font-bold text-sui-blue font-mono uppercase tracking-wider group-hover:text-sui-cyan transition-colors">
                            {trilha.titulo[lang].toUpperCase()}
                          </h2>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono">
                          <span
                            className="hud-text-box px-2 py-1"
                            style={{
                              borderColor: `${trilha.cor || "#3FFE95"}60`,
                              color: trilha.cor || "#3FFE95",
                            }}
                          >
                            {trilha.missoes.length} {lang === "pt" ? "MISSÕES" : lang === "en" ? "MISSIONS" : "MISIONES"}
                          </span>
                          <span className="hud-text-box px-2 py-1 text-sui-blue font-bold">
                            ⭐ {trilha.xpTotal} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Descrição da região */}
                    <div className="hud-text-box mb-3">
                      <p className="text-[#E5E7EB] text-sm sm:text-base leading-relaxed font-mono">
                        {trilha.descricao[lang]}
                      </p>
                    </div>

                    {/* Lore da região */}
                    <div className="hud-text-box">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-1 bg-sui-cyan" />
                        <p className="text-xs font-mono uppercase text-sui-cyan tracking-wider">
                          {lang === "pt" ? "HISTÓRIA" : lang === "en" ? "LORE" : "HISTORIA"}
                        </p>
                      </div>
                      <p className="text-[#CBD5F5] italic text-xs sm:text-sm leading-relaxed font-mono">
                        {trilha.lore[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Indicador de viagem */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-sui-blue font-mono text-xs uppercase">
                      <span>→</span>
                      <span>{lang === "pt" ? "VIAJAR" : lang === "en" ? "TRAVEL" : "VIAJAR"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
