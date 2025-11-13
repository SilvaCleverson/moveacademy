"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type CodornaType = "transfer" | "entry" | null;

export default function Home() {
  const { lang, setLang } = useLanguage();
  const [codornaSelecionada, setCodornaSelecionada] = useState<CodornaType>(null);

  // Salva a codorna selecionada no localStorage
  useEffect(() => {
    if (codornaSelecionada) {
      localStorage.setItem("moveacademy-codorna", codornaSelecionada);
    }
  }, [codornaSelecionada]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-4 bg-[#0A1A2F] text-[#FFFFFF] relative overflow-hidden">
      {/* Background pattern estilo Phantasy Star */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(106,215,229,0.1) 2px, rgba(106,215,229,0.1) 4px)`,
      }} />
      <div className="max-w-4xl w-full relative z-10">
        <main className="w-full hud-panel p-4 sm:p-6 relative">
          {/* Borda superior estilo HUD */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sui-blue to-transparent opacity-60" />
          
          {/* Header estilo HUD */}
          <div className="text-center mb-4 sm:mb-5">
            {/* Seletor de idioma - Integrado no header */}
            <div className="flex justify-end mb-3">
              <div className="hud-text-box">
                <div className="flex gap-0.5">
                  <button
                    onClick={() => setLang("pt")}
                    className={`px-2.5 py-1 text-xs tracking-wider uppercase font-mono transition-all ${
                      lang === "pt"
                        ? "bg-sui-blue text-[#020617] font-bold"
                        : "text-[#9CA3AF] hover:text-sui-blue hover:bg-sui-blue/20"
                    }`}
                  >
                    PT
                  </button>
                  <button
                    onClick={() => setLang("en")}
                    className={`px-2.5 py-1 text-xs tracking-wider uppercase font-mono transition-all ${
                      lang === "en"
                        ? "bg-sui-blue text-[#020617] font-bold"
                        : "text-[#9CA3AF] hover:text-sui-blue hover:bg-sui-blue/20"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang("es")}
                    className={`px-2.5 py-1 text-xs tracking-wider uppercase font-mono transition-all ${
                      lang === "es"
                        ? "bg-sui-blue text-[#020617] font-bold"
                        : "text-[#9CA3AF] hover:text-sui-blue hover:bg-sui-blue/20"
                    }`}
                  >
                    ES
                  </button>
                </div>
              </div>
            </div>
            
            <div className="hud-text-box mb-3">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <div className="w-1 h-6 sm:h-8 bg-sui-blue" />
                <Image
                  src="/sui-symbol.svg"
                  alt="Sui"
                  width={32}
                  height={32}
                  className="opacity-90"
                />
                <div className="text-center">
                  <h1 className="text-2xl sm:text-3xl font-bold text-sui-blue tracking-wider">
                    MOVEACADEMY
                  </h1>
                  <p className="text-xs text-sui-cyan/80 font-mono mt-1">
                    {lang === "pt" ? "MUNDO DE MOVIARA" : lang === "en" ? "MOVIARA WORLD" : "MUNDO DE MOVIARA"}
                  </p>
                </div>
                <Image
                  src="/sui-symbol.svg"
                  alt="Sui"
                  width={32}
                  height={32}
                  className="opacity-90"
                />
                <div className="w-1 h-6 sm:h-8 bg-sui-cyan" />
              </div>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-sui-blue to-transparent my-2" />
              <p className="text-[#E5E7EB] text-xs sm:text-sm font-mono">
                &gt; {lang === "pt" 
                  ? "ESCOLHA SUA CODORNA E COMECE SUA JORNADA ÉPICA"
                  : lang === "en"
                  ? "CHOOSE YOUR QUAIL AND BEGIN YOUR EPIC JOURNEY"
                  : "ELIGE TU CODORNIZ Y COMIENZA TU JORNADA ÉPICA"}
              </p>
            </div>
          </div>

          {/* História da Jornada - Painel estilo JRPG */}
          <div className="mb-4 sm:mb-5 hud-text-box">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 border-2 border-sui-blue/60 bg-[#0A1A2F] flex items-center justify-center">
                  <span className="text-xl">📜</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-sui-blue" />
                  <h2 className="text-base sm:text-lg font-bold text-sui-blue font-mono uppercase tracking-wider">
                    {lang === "pt" ? "A HISTÓRIA DE MOVIARA" : lang === "en" ? "THE STORY OF MOVIARA" : "LA HISTORIA DE MOVIARA"}
                  </h2>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-sui-blue/60 to-transparent" />
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm text-[#E5E7EB] leading-relaxed font-mono">
                  <p>
                    {lang === "pt" 
                      ? <>No mundo de <span className="text-sui-cyan font-semibold">Moviara</span>, onde o código rege os contratos do destino, uma nova alma desperta.</>
                      : lang === "en"
                      ? <>In the world of <span className="text-sui-cyan font-semibold">Moviara</span>, where code rules the contracts of destiny, a new soul awakens.</>
                      : <>En el mundo de <span className="text-sui-cyan font-semibold">Moviara</span>, donde el código rige los contratos del destino, un alma nueva despierta.</>
                    }
                  </p>
                  <p>
                    {lang === "pt"
                      ? <>Para dominar os artefatos da blockchain, ela precisa aprender a linguagem dos criadores: <span className="text-move-green font-semibold">Move</span>.</>
                      : lang === "en"
                      ? <>To master the artifacts of blockchain, they must learn the language of the creators: <span className="text-move-green font-semibold">Move</span>.</>
                      : <>Para dominar los artefactos de blockchain, debe aprender el lenguaje de los creadores: <span className="text-move-green font-semibold">Move</span>.</>
                    }
                  </p>
                  <p className="text-sui-cyan italic">
                    {lang === "pt"
                      ? "Cada linha de código é um passo. Cada função, uma conquista. Cada struct, uma evolução."
                      : lang === "en"
                      ? "Every line of code is a step. Every function, a conquest. Every struct, an evolution."
                      : "Cada línea de código es un paso. Cada función, una conquista. Cada struct, una evolución."
                    }
                  </p>
                  <p>
                    {lang === "pt"
                      ? <>Sua jornada começa aqui. Escolha sua codorna guerreira e transforme-se em um mestre do Move, capaz de criar smart contracts, NFTs e aplicações descentralizadas no ecossistema <span className="text-sui-blue font-semibold">Sui</span>.</>
                      : lang === "en"
                      ? <>Your journey begins here. Choose your warrior quail and become a master of Move, capable of creating smart contracts, NFTs, and decentralized applications in the <span className="text-sui-blue font-semibold">Sui</span> ecosystem.</>
                      : <>Tu viaje comienza aquí. Elige tu codorniz guerrera y conviértete en un maestro de Move, capaz de crear smart contracts, NFTs y aplicaciones descentralizadas en el ecosistema <span className="text-sui-blue font-semibold">Sui</span>.</>
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Seleção de Personagem - Cards estilo JRPG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
            {/* Codorna 1 */}
            <Link
              href="/trilhas"
              onClick={() => setCodornaSelecionada("transfer")}
              className={`group relative hud-panel p-4 sm:p-5 hover:border-sui-blue transition-all duration-300 cursor-pointer block h-full ${
                codornaSelecionada === "transfer" ? "border-sui-blue border-2" : ""
              }`}
              style={{
                boxShadow: codornaSelecionada === "transfer" 
                  ? "inset 0 0 20px rgba(106, 215, 229, 0.3), 0 0 25px rgba(106, 215, 229, 0.4)"
                  : "inset 0 0 15px rgba(106, 215, 229, 0.1)",
              }}
            >
              {/* Borda lateral esquerda */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sui-blue via-sui-cyan to-sui-blue opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Personagem - Destaque no topo */}
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 border-2 border-sui-blue/60 bg-[#0A1A2F] p-1.5" style={{
                    boxShadow: "inset 0 0 15px rgba(106, 215, 229, 0.4), 0 0 20px rgba(106, 215, 229, 0.3)",
                  }}>
                    <div className="relative w-full h-full border-2 border-sui-blue/50">
                      <Image
                        src="/C1.png"
                        alt="Codorna Azul"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 144px"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* Texto organizado abaixo */}
                <div className="flex-1 flex flex-col justify-end">
                  <div className="hud-text-box mb-2">
                    <h2 className="text-lg sm:text-xl font-bold text-sui-blue mb-1.5 font-mono uppercase tracking-wider group-hover:text-sui-cyan transition-colors text-center">
                      SIR TRANSFER
                    </h2>
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-sui-blue/60 to-transparent my-1.5" />
                    <p className="text-[#E5E7EB] text-xs font-mono text-center">
                      &gt; {lang === "pt" 
                        ? "A CODORNA QUE MOVE OBJETOS"
                        : lang === "en"
                        ? "THE QUAIL THAT MOVES OBJECTS"
                        : "LA CODORNIZ QUE MUEVE OBJETOS"
                      }
                    </p>
                  </div>
                  <div className="hud-text-box">
                    <p className="text-[#CBD5F5] text-xs font-mono italic text-center">
                      "{lang === "pt"
                        ? "Determinação e foco para dominar Move"
                        : lang === "en"
                        ? "Determination and focus to master Move"
                        : "Determinación y enfoque para dominar Move"
                      }"
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Codorna 2 */}
            <Link
              href="/trilhas"
              onClick={() => setCodornaSelecionada("entry")}
              className={`group relative hud-panel p-4 sm:p-5 hover:border-move-green transition-all duration-300 cursor-pointer block h-full ${
                codornaSelecionada === "entry" ? "border-move-green border-2" : ""
              }`}
              style={{
                boxShadow: codornaSelecionada === "entry"
                  ? "inset 0 0 20px rgba(63, 254, 149, 0.3), 0 0 25px rgba(63, 254, 149, 0.4)"
                  : "inset 0 0 15px rgba(63, 254, 149, 0.1)",
              }}
            >
              {/* Borda lateral direita */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-move-green via-sui-cyan to-move-green opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Personagem - Destaque no topo */}
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 border-2 border-move-green/60 bg-[#0A1A2F] p-1.5" style={{
                    boxShadow: "inset 0 0 15px rgba(63, 254, 149, 0.4), 0 0 20px rgba(63, 254, 149, 0.3)",
                  }}>
                    <div className="relative w-full h-full border-2 border-move-green/50">
                      <Image
                        src="/C2.png"
                        alt="Codorna Verde"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 144px"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* Texto organizado abaixo */}
                <div className="flex-1 flex flex-col justify-end">
                  <div className="hud-text-box mb-2">
                    <h2 className="text-lg sm:text-xl font-bold text-move-green mb-1.5 font-mono uppercase tracking-wider group-hover:text-sui-cyan transition-colors text-center">
                      SIR ENTRY
                    </h2>
                    <div className="h-0.5 bg-gradient-to-r from-transparent via-move-green/60 to-transparent my-1.5" />
                    <p className="text-[#E5E7EB] text-xs font-mono text-center">
                      &gt; {lang === "pt"
                        ? "A CODORNA QUE ENTRA EM AÇÃO"
                        : lang === "en"
                        ? "THE QUAIL THAT TAKES ACTION"
                        : "LA CODORNIZ QUE ENTRA EN ACCIÓN"
                      }
                    </p>
                  </div>
                  <div className="hud-text-box">
                    <p className="text-[#CBD5F5] text-xs font-mono italic text-center">
                      "{lang === "pt"
                        ? "Agilidade e sabedoria para conquistar Move"
                        : lang === "en"
                        ? "Agility and wisdom to conquer Move"
                        : "Agilidad y sabiduría para conquistar Move"
                      }"
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Borda inferior estilo HUD */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sui-cyan to-transparent opacity-60 mt-6" />

        </main>
      </div>
    </div>
  );
}
