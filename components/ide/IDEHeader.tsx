"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";

type CodornaType = "transfer" | "entry" | null;

interface IDEHeaderProps {
  codornaSelecionada: CodornaType;
  xp: number;
  xpAnimando: boolean;
}

export default function IDEHeader({ codornaSelecionada, xp, xpAnimando }: IDEHeaderProps) {
  const { lang, setLang } = useLanguage();
  const { isMuted, toggleMute, volume, setVolume } = useAudio();

  return (
    <header className="bg-move-navy border-b border-sui-blue/25 px-4 py-3 flex items-center justify-between gap-4">
      {/* Logo e Navegação */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-sui-blue hover:text-sui-cyan transition-colors">
          <span className="text-xl">🏠</span>
          <span className="font-bold text-lg">MoveAcademy</span>
        </Link>
      </div>

      {/* Direita: Codorna, XP, Idioma, Áudio */}
      <div className="flex items-center gap-4">
        {/* Controle de Áudio */}
        <div className="flex items-center gap-2 bg-[#0A1A2F] px-2 py-1.5 rounded-lg border border-sui-blue/25">
          <button
            onClick={toggleMute}
            className="text-sui-blue hover:text-sui-cyan transition-colors"
            title={isMuted ? (lang === "pt" ? "Ativar som" : lang === "en" ? "Enable sound" : "Activar sonido") : (lang === "pt" ? "Desativar som" : lang === "en" ? "Disable sound" : "Desactivar sonido")}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
          {!isMuted && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-sui-blue/30 rounded-lg appearance-none cursor-pointer accent-sui-blue"
              title={lang === "pt" ? "Volume" : lang === "en" ? "Volume" : "Volumen"}
            />
          )}
        </div>

        {/* Seletor de Idioma */}
        <div className="flex items-center gap-2 bg-[#0A1A2F] px-3 py-1.5 rounded-lg border border-sui-blue/25">
          <button
            onClick={() => setLang("pt")}
            className={`px-2 py-1 text-xs font-semibold transition-colors ${
              lang === "pt" ? "text-sui-blue" : "text-[#9CA3AF] hover:text-sui-cyan"
            }`}
          >
            PT
          </button>
          <span className="text-sui-blue/50">|</span>
          <button
            onClick={() => setLang("en")}
            className={`px-2 py-1 text-xs font-semibold transition-colors ${
              lang === "en" ? "text-sui-blue" : "text-[#9CA3AF] hover:text-sui-cyan"
            }`}
          >
            EN
          </button>
          <span className="text-sui-blue/50">|</span>
          <button
            onClick={() => setLang("es")}
            className={`px-2 py-1 text-xs font-semibold transition-colors ${
              lang === "es" ? "text-sui-blue" : "text-[#9CA3AF] hover:text-sui-cyan"
            }`}
          >
            ES
          </button>
        </div>

        {/* Codorna e XP */}
        {codornaSelecionada && (
          <div className="flex items-center gap-3 bg-[#0A1A2F] px-3 py-1.5 rounded-lg border border-sui-blue/25">
            <div className="relative w-8 h-8 border border-sui-blue/50 rounded">
              <Image
                src={codornaSelecionada === "transfer" ? "/C1.png" : "/C2.png"}
                alt={codornaSelecionada === "transfer" ? "Sir Transfer" : "Sir Entry"}
                fill
                className="object-cover rounded"
                sizes="32px"
                unoptimized
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">⭐</span>
              <span className={`text-sm font-bold font-mono ${
                xpAnimando ? "text-move-green animate-pulse" : "text-move-green"
              }`}>
                {xp} XP
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

