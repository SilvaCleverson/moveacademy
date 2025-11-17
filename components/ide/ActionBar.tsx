"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";

interface ActionBarProps {
  onRun: () => void;
  onClear: () => void;
  onMostrarSolucao?: () => void;
  status: "idle" | "compilando" | "executando" | "sucesso" | "erro";
  disabled?: boolean;
}

export default function ActionBar({
  onRun,
  onClear,
  onMostrarSolucao,
  status,
  disabled = false,
}: ActionBarProps) {
  const { lang } = useLanguage();
  const { playSound } = useAudio();

  const isProcessing = status === "compilando" || status === "executando";

  return (
    <div className="bg-move-navy border-t border-sui-blue/25 px-4 py-3 flex items-center gap-3 flex-wrap">
      {/* Botão principal - Executar */}
      <button
        onClick={() => {
          playSound("click");
          onRun();
        }}
        disabled={disabled || isProcessing}
        className="px-6 py-2.5 rounded-lg bg-gradient-sui-move text-[#020617] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-base font-bold transition-opacity flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95"
        title={lang === "pt" ? "Executa e verifica seu código" : lang === "en" ? "Run and verify your code" : "Ejecuta y verifica tu código"}
      >
        <span className="text-lg">▶</span>
        <span>{lang === "pt" ? "Executar" : lang === "en" ? "Run" : "Ejecutar"}</span>
      </button>

      <div className="flex-1" />

      {/* Botão Solução */}
      {onMostrarSolucao && (
        <button
          onClick={() => {
            playSound("click");
            onMostrarSolucao();
          }}
          disabled={disabled || isProcessing}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-move-green/20 to-sui-blue/20 hover:from-move-green/30 hover:to-sui-blue/30 border border-move-green/50 text-move-green hover:text-move-green disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-colors flex items-center gap-2"
          title={lang === "pt" ? "Ver solução completa" : lang === "en" ? "View complete solution" : "Ver solución completa"}
        >
          <span>💡</span>
          <span>{lang === "pt" ? "Solução" : lang === "en" ? "Solution" : "Solución"}</span>
        </button>
      )}

      {/* Botão Limpar */}
      <button
        onClick={() => {
          playSound("click");
          onClear();
        }}
        disabled={disabled || isProcessing}
        className="px-4 py-2 rounded-lg bg-move-navy/50 text-[#CBD5F5] hover:bg-move-navy/80 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold transition-colors flex items-center gap-2"
        title={lang === "pt" ? "Limpar e recomeçar" : lang === "en" ? "Clear and restart" : "Limpiar y reiniciar"}
      >
        <span>🗑️</span>
        <span>{lang === "pt" ? "Limpar" : lang === "en" ? "Clear" : "Limpiar"}</span>
      </button>
    </div>
  );
}

