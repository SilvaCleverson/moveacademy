"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

type CodornaType = "ang3l" | "transfer" | "entry" | "borrow" | "module" | "patch" | "quasimodo" | "constz" | null;

interface IDEHeaderProps {
  codornaSelecionada: CodornaType;
  xp: number;
  xpAnimando: boolean;
}

export default function IDEHeader({ codornaSelecionada, xp, xpAnimando }: IDEHeaderProps) {
  const { lang, setLang } = useLanguage();

  return (
    <header className="bg-move-navy border-b border-sui-blue/25 px-4 py-3 flex items-center justify-between gap-4">
      {/* Logo e Navegação */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-sui-blue hover:text-sui-cyan transition-colors">
          <span className="text-xl">🏠</span>
          <span className="font-bold text-lg">MoveAcademy</span>
        </Link>
      </div>

      {/* Direita: Codorna, XP, Idioma */}
      <div className="flex items-center gap-4">
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
                src={
                  codornaSelecionada === "ang3l" ? "/C0.png" :
                  codornaSelecionada === "transfer" ? "/C1.png" :
                  codornaSelecionada === "borrow" ? "/C3.png" :
                  codornaSelecionada === "entry" ? "/C2.png" :
                  codornaSelecionada === "module" ? "/C4.png" :
                  codornaSelecionada === "patch" ? "/C6.png" :
                  codornaSelecionada === "quasimodo" ? "/C7.png" :
                  codornaSelecionada === "constz" ? "/C8.png" :
                  "/C1.png"
                }
                alt={
                  codornaSelecionada === "ang3l" ? "Ang3l" :
                  codornaSelecionada === "transfer" ? "Sir Transfer" :
                  codornaSelecionada === "borrow" ? "Lady Borrowa" :
                  codornaSelecionada === "entry" ? "Sir Entry" :
                  codornaSelecionada === "module" ? "Madame Structa" :
                  codornaSelecionada === "patch" ? "Patch" :
                  codornaSelecionada === "quasimodo" ? "Core" :
                  codornaSelecionada === "constz" ? "Mestre F0ntzz" :
                  "Codorna"
                }
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

        {/* Commit Hash (versão) - discreto */}
        {process.env.NEXT_PUBLIC_COMMIT_HASH && (
          <div className="text-xs text-sui-blue/40 font-mono" title="Commit hash da versão atual">
            {process.env.NEXT_PUBLIC_COMMIT_HASH.substring(0, 7)}
          </div>
        )}
      </div>
    </header>
  );
}

