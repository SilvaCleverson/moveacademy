"use client";

import { Missao } from "@/lib/types/guerreiro";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import MoveEditor from "@/components/MoveEditor";

interface ObjetivoPanelProps {
  missao: Missao;
  isCollapsed: boolean;
  onToggle: () => void;
  onMostrarSolucao?: () => void;
}

export default function ObjetivoPanel({ missao, isCollapsed, onToggle, onMostrarSolucao }: ObjetivoPanelProps) {
  const { lang } = useLanguage();
  const { playSound } = useAudio();
  const [mostrarExemplo, setMostrarExemplo] = useState(false);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [isChristmas, setIsChristmas] = useState(false);

  useEffect(() => {
    const checkChristmas = () => {
      setIsChristmas(document.documentElement.classList.contains("christmas-theme"));
    };
    checkChristmas();
    const observer = new MutationObserver(checkChristmas);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (isCollapsed) {
    return (
      <div className="w-12 bg-move-navy border-l border-sui-blue/25 flex flex-col items-center py-4">
        <button
          onClick={onToggle}
          className="text-sui-blue hover:text-sui-cyan transition-colors"
          title={lang === "pt" ? "Expandir" : lang === "en" ? "Expand" : "Expandir"}
        >
          ◀
        </button>
      </div>
    );
  }

  return (
    <aside className={`w-80 ${isChristmas ? 'christmas-scroll' : 'bg-move-navy border-l border-sui-blue/25'} flex flex-col h-full overflow-hidden`}>
      <div className="p-4 border-b border-sui-blue/25 flex items-center justify-between">
        <h2 className={`text-sm font-bold ${isChristmas ? 'text-[#8b4513]' : 'text-sui-blue'} uppercase tracking-wider flex items-center gap-2`}>
          {isChristmas && <span className="text-lg">📜</span>}
          <span>{lang === "pt" ? "Desafio" : lang === "en" ? "Challenge" : "Desafío"}</span>
        </h2>
        <button
          onClick={onToggle}
          className="text-sui-blue hover:text-sui-cyan transition-colors"
          title={lang === "pt" ? "Colapsar" : lang === "en" ? "Collapse" : "Colapsar"}
        >
          ▶
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header da Missão */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{missao.icone}</span>
            <div>
              <div className={`text-xs font-semibold ${isChristmas ? 'text-[#8b4513]' : 'text-sui-blue'}`}>
                {lang === "pt" ? "Missão" : lang === "en" ? "Mission" : "Misión"} {missao.numero}
              </div>
              <h3 className={`text-lg font-bold ${isChristmas ? 'text-[#c41e3a]' : 'text-[#E5E7EB]'}`}>{missao.titulo}</h3>
            </div>
          </div>
          <p className={`text-sm ${isChristmas ? 'text-[#1a0f05] font-semibold' : 'text-[#CBD5F5]'}`}>{missao.descricao}</p>
        </div>

        {/* Conteúdo/Instruções */}
        <div className={`prose prose-invert max-w-none text-sm ${isChristmas ? '[&>p]:text-[#1a0f05] [&>p]:font-semibold [&>li]:text-[#1a0f05] [&>li]:font-semibold [&>h1]:text-[#8b4513] [&>h1]:font-bold [&>h2]:text-[#8b4513] [&>h2]:font-bold [&>strong]:text-[#000000] [&>strong]:font-bold' : '[&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h1]:text-sui-blue [&>h2]:text-base [&>h2]:font-semibold [&>h2]:mb-2 [&>h2]:mt-4 [&>h2]:text-sui-cyan [&>p]:mb-3 [&>p]:text-[#CBD5F5] [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-3 [&>ul]:text-[#CBD5F5] [&>ol]:list-decimal [&>ol]:ml-4 [&>ol]:mb-3 [&>ol]:text-[#CBD5F5]'} [&>code]:bg-[#1E293B] [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-move-green [&>pre]:bg-[#020617] [&>pre]:p-3 [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-sui-blue/25 [&>pre]:overflow-x-auto [&>pre>code]:text-[#E5E7EB]`}>
          <ReactMarkdown>{missao.conteudo}</ReactMarkdown>
        </div>

        {/* Botão de Ajuda */}
        {missao.codigoSolucao && (
          <div className="border-t border-sui-blue/25 pt-4 space-y-3">

            {/* Botão Dica */}
            <button
              onClick={() => {
                setMostrarDica(!mostrarDica);
                playSound("click");
              }}
              className={`w-full text-left mb-2 text-sm transition-colors flex items-center justify-between ${isChristmas ? 'text-[#22c55e] hover:text-[#16a34a] font-semibold' : 'text-sui-cyan hover:text-sui-blue'}`}
            >
              <span className="font-semibold flex items-center gap-2">
                <span>💭</span>
                <span>{lang === "pt" ? "Dica" : lang === "en" ? "Hint" : "Pista"}</span>
              </span>
              <span>{mostrarDica ? "▼" : "▶"}</span>
            </button>
            {mostrarDica && missao.codigoSolucao && (
              <div className="bg-[#020617] rounded-lg p-3 border border-sui-cyan/25">
                <p className="text-xs text-[#CBD5F5] mb-2">
                  {lang === "pt" 
                    ? "💡 Dica: Tente analisar o código de exemplo acima e adapte para sua solução. Preste atenção na estrutura e na lógica!"
                    : lang === "en"
                    ? "💡 Hint: Try analyzing the example code above and adapt it to your solution. Pay attention to the structure and logic!"
                    : "💡 Pista: ¡Intenta analizar el código de ejemplo arriba y adáptalo a tu solución. ¡Presta atención a la estructura y la lógica!"}
                </p>
                {missao.codigoSolucao && (
                  <div className="mt-2">
                    <MoveEditor 
                      value={missao.codigoSolucao} 
                      readOnly={true} 
                      height="150px" 
                    />
                  </div>
                )}
              </div>
            )}

            {/* Exemplo de Código */}
            <button
              onClick={() => {
                setMostrarExemplo(!mostrarExemplo);
                playSound("click");
              }}
              className={`w-full text-left mb-2 text-sm transition-colors flex items-center justify-between ${isChristmas ? 'text-[#22c55e] hover:text-[#16a34a] font-semibold' : 'text-sui-blue hover:text-sui-cyan'}`}
            >
              <span className="font-semibold">
                📖 {lang === "pt" ? "Exemplo Completo" : lang === "en" ? "Full Example" : "Ejemplo Completo"}
              </span>
              <span>{mostrarExemplo ? "▼" : "▶"}</span>
            </button>
            {mostrarExemplo && (
              <div className="bg-[#020617] rounded-lg p-3 border border-sui-blue/25">
                <MoveEditor value={missao.codigoSolucao} readOnly={true} height="200px" />
              </div>
            )}
          </div>
        )}

        {/* Recompensas */}
        <div className="border-t border-sui-blue/25 pt-4">
          <h4 className={`text-xs font-semibold mb-2 uppercase ${isChristmas ? 'text-[#22c55e]' : 'text-sui-blue'}`}>
            {lang === "pt" ? "Recompensas" : lang === "en" ? "Rewards" : "Recompensas"}
          </h4>
          <div className="space-y-2">
            <div className={`flex items-center gap-2 ${isChristmas ? 'text-[#22c55e]' : 'text-move-green'}`}>
              <span>⭐</span>
              <span className="font-semibold">{missao.xpRecompensa} XP</span>
            </div>
            {missao.badgeRecompensa && (
              <div className="flex items-center gap-2">
                <span className="text-lg">{missao.badgeRecompensa.icone}</span>
                <span className={`text-sm font-semibold ${isChristmas ? 'text-[#1a0f05]' : 'text-[#CBD5F5]'}`}>{missao.badgeRecompensa.nome}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

