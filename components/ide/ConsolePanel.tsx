"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useRef, useEffect } from "react";

interface ConsolePanelProps {
  output: string[];
  isOpen: boolean;
  onToggle: () => void;
  onClear?: () => void;
}

export default function ConsolePanel({ output, isOpen, onToggle, onClear }: ConsolePanelProps) {
  const { lang } = useLanguage();
  const [autoScroll, setAutoScroll] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output, autoScroll]);

  const handleCopy = () => {
    const text = output.join("\n");
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  if (!isOpen) {
    return (
      <div className="border-t border-sui-blue/25 bg-move-navy">
        <button
          onClick={onToggle}
          className="w-full px-4 py-2 text-left text-sm text-sui-blue hover:bg-move-navy/80 flex items-center justify-between"
        >
          <span className="font-semibold">
            {lang === "pt" ? "Console" : lang === "en" ? "Console" : "Consola"}
          </span>
          <span>▲</span>
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-sui-blue/25 bg-[#020617] flex flex-col" style={{ height: "200px" }}>
      <div className="px-4 py-2 border-b border-sui-blue/25 flex items-center justify-between bg-move-navy">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-sui-blue">
            {lang === "pt" ? "Console" : lang === "en" ? "Console" : "Consola"}
          </span>
          <span className="text-xs text-[#9CA3AF]">({output.length} {lang === "pt" ? "linhas" : lang === "en" ? "lines" : "líneas"})</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className="px-2 py-1 text-xs text-sui-cyan hover:text-sui-blue transition-colors"
            title={autoScroll ? "Desativar auto-scroll" : "Ativar auto-scroll"}
          >
            {autoScroll ? "⬇️" : "⏸️"}
          </button>
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-xs text-sui-cyan hover:text-sui-blue transition-colors"
            title={lang === "pt" ? "Copiar" : lang === "en" ? "Copy" : "Copiar"}
          >
            📋
          </button>
          {onClear && (
            <button
              onClick={handleClear}
              className="px-2 py-1 text-xs text-sui-cyan hover:text-sui-blue transition-colors"
              title={lang === "pt" ? "Limpar" : lang === "en" ? "Clear" : "Limpiar"}
            >
              🗑️
            </button>
          )}
          <button
            onClick={onToggle}
            className="px-2 py-1 text-xs text-sui-cyan hover:text-sui-blue transition-colors"
            title={lang === "pt" ? "Fechar" : lang === "en" ? "Close" : "Cerrar"}
          >
            ▼
          </button>
        </div>
      </div>
      
      <div
        ref={consoleRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        {output.length === 0 ? (
          <div className="text-[#6B7280] italic">
            {lang === "pt" 
              ? "Console vazio. Execute seu código para ver a saída aqui."
              : lang === "en"
              ? "Console empty. Run your code to see output here."
              : "Consola vacía. Ejecuta tu código para ver la salida aquí."}
          </div>
        ) : (
          output.map((line, index) => {
            // Detecta tipo de linha para coloração
            const isError = line.includes("error") || line.includes("Error") || line.includes("❌");
            const isSuccess = line.includes("success") || line.includes("Success") || line.includes("✓") || line.includes("✅");
            const isCommand = line.startsWith("$");

            return (
              <div
                key={index}
                className={`mb-1 ${
                  isError
                    ? "text-red-400"
                    : isSuccess
                    ? "text-green-400"
                    : isCommand
                    ? "text-sui-blue"
                    : "text-[#E5E7EB]"
                }`}
              >
                {line}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

