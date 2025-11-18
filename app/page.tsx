"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";

type CodornaType = "ang3l" | "transfer" | "entry" | "borrow" | "module" | "patch" | "quasimodo" | "constz";

interface Personagem {
  id: CodornaType;
  nome: string;
  nomeEn: string;
  nomeEs: string;
  descricao: string;
  descricaoEn: string;
  descricaoEs: string;
  imagem: string;
  atributos: {
    forca: number;
    sabedoria: number;
    destreza: number;
  };
}

// Função para embaralhar array (Fisher-Yates), mantendo o último elemento (Ang3l) fixo
function shuffleArray<T>(array: T[]): T[] {
  if (array.length <= 1) return [...array];

  // Separa o último elemento (Ang3l) e embaralha o resto
  const last = array[array.length - 1];
  const rest = array.slice(0, -1);
  const shuffled = [...rest];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Retorna com Ang3l sempre no final
  return [...shuffled, last];
}

const personagens: Personagem[] = [
  {
    id: "transfer",
    nome: "Sir Transfer",
    nomeEn: "Sir Transfer",
    nomeEs: "Sir Transfer",
    descricao: "Mestre da transferência de propriedade. Especialista em mover recursos entre contas com segurança.",
    descricaoEn: "Master of property transfer. Expert in moving resources between accounts safely.",
    descricaoEs: "Maestro de la transferencia de propiedad. Experto en mover recursos entre cuentas de forma segura.",
    imagem: "/C1.png",
    atributos: {
      forca: 8,
      sabedoria: 6,
      destreza: 7,
    },
  },
  {
    id: "borrow",
    nome: "Lady Borrowa",
    nomeEn: "Lady Borrowa",
    nomeEs: "Lady Borrowa",
    descricao: "A codorna que usa borrowing com sabedoria. Especialista em referências e empréstimos em Move.",
    descricaoEn: "The quail who uses borrowing wisely. Expert in references and loans in Move.",
    descricaoEs: "La codorniz que usa borrowing con sabiduría. Experta en referencias y préstamos en Move.",
    imagem: "/C3.png",
    atributos: {
      forca: 7,
      sabedoria: 9,
      destreza: 8,
    },
  },
  {
    id: "entry",
    nome: "Sir Entry",
    nomeEn: "Sir Entry",
    nomeEs: "Sir Entry",
    descricao: "Guardião das funções de entrada. Domina o controle de acesso e validação de parâmetros.",
    descricaoEn: "Guardian of entry functions. Masters access control and parameter validation.",
    descricaoEs: "Guardián de las funciones de entrada. Domina el control de acceso y la validación de parámetros.",
    imagem: "/C2.png",
    atributos: {
      forca: 6,
      sabedoria: 8,
      destreza: 7,
    },
  },
  {
    id: "module",
    nome: "Madame Structa",
    nomeEn: "Madame Structa",
    nomeEs: "Madame Structa",
    descricao: "Guerreira das estruturas. Mestra em criar e organizar módulos e structs complexas.",
    descricaoEn: "Warrior of structures. Master at creating and organizing modules and complex structs.",
    descricaoEs: "Guerrera de las estructuras. Maestra en crear y organizar módulos y structs complejas.",
    imagem: "/C4.png",
    atributos: {
      forca: 8,
      sabedoria: 9,
      destreza: 7,
    },
  },
  {
    id: "patch",
    nome: "Patch",
    nomeEn: "Patch",
    nomeEs: "Patch",
    descricao: "Especialista em correções e atualizações. Domina a arte de melhorar código existente.",
    descricaoEn: "Expert in fixes and updates. Masters the art of improving existing code.",
    descricaoEs: "Experto en correcciones y actualizaciones. Domina el arte de mejorar código existente.",
    imagem: "/C6.png",
    atributos: {
      forca: 7,
      sabedoria: 8,
      destreza: 9,
    },
  },
  {
    id: "quasimodo",
    nome: "Core",
    nomeEn: "Core",
    nomeEs: "Core",
    descricao: "Núcleo do compilador. Dá dicas quando seu código está bugado.",
    descricaoEn: "Compiler core. Gives tips when your code is buggy.",
    descricaoEs: "Núcleo del compilador. Da consejos cuando tu código tiene errores.",
    imagem: "/C7.png",
    atributos: {
      forca: 6,
      sabedoria: 10,
      destreza: 6,
    },
  },
  {
    id: "constz",
    nome: "Mestre F0ntzz",
    nomeEn: "Master F0ntzz",
    nomeEs: "Maestro F0ntzz",
    descricao: "Guardião do Norte do conhecimento imutável. Mestre dos fundamentos da linguagem. Primeiro mentor técnico com explicações diretas e sotaque carismático.",
    descricaoEn: "Guardian of the North of immutable knowledge. Master of language fundamentals. First technical mentor with direct explanations and charismatic accent.",
    descricaoEs: "Guardián del Norte del conocimiento inmutable. Maestro de los fundamentos del lenguaje. Primer mentor técnico con explicaciones directas y acento carismático.",
    imagem: "/C8.png",
    atributos: {
      forca: 9,
      sabedoria: 10,
      destreza: 8,
    },
  },
  {
    id: "ang3l",
    nome: "Ang3l",
    nomeEn: "Ang3l",
    nomeEs: "Ang3l",
    descricao: "Guardadora das Chaves de Autenticidade. Especialista em identidade em Move (address, signers, auth), contextos de transação, visibilidade e permissão.",
    descricaoEn: "Keeper of Authenticity Keys. Expert in Move identity (address, signers, auth), transaction contexts, visibility and permissions.",
    descricaoEs: "Guardiana de las Llaves de Autenticidad. Experta en identidad en Move (address, signers, auth), contextos de transacción, visibilidad y permisos.",
    imagem: "/C0.png",
    atributos: {
      forca: 8,
      sabedoria: 10,
      destreza: 7,
    },
  },
];

export default function Home() {
  const router = useRouter();
  const { lang, setLang } = useLanguage();
  const { playSound } = useAudio();
  const [personagensEmbaralhados, setPersonagensEmbaralhados] = useState<Personagem[]>(() => personagens);
  const [personagemSelecionado, setPersonagemSelecionado] = useState<number>(0);
  const [animando, setAnimando] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Embaralha personagens no client-side apenas
  useEffect(() => {
    setPersonagensEmbaralhados(shuffleArray(personagens));
  }, []);

  // Auto-play do carrossel
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setPersonagemSelecionado((prev) => (prev + 1) % personagensEmbaralhados.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay, personagensEmbaralhados.length]);

  const selecionarPersonagem = useCallback((index: number) => {
    if (animando) return;
    if (index === personagemSelecionado) return;
    
    setAutoPlay(false);
    playSound("click");
    setAnimando(true);
    setPersonagemSelecionado(index);
    
    setTimeout(() => {
      setAnimando(false);
    }, 300);
  }, [animando, personagemSelecionado, playSound]);

  const proximoPersonagem = useCallback(() => {
    if (animando) return;
    setAutoPlay(false);
    playSound("click");
    const proximo = (personagemSelecionado + 1) % personagensEmbaralhados.length;
    setAnimando(true);
    setPersonagemSelecionado(proximo);
    setTimeout(() => {
      setAnimando(false);
    }, 300);
  }, [animando, personagemSelecionado, playSound, personagensEmbaralhados.length]);

  const personagemAnterior = useCallback(() => {
    if (animando) return;
    setAutoPlay(false);
    playSound("click");
    const anterior = (personagemSelecionado - 1 + personagensEmbaralhados.length) % personagensEmbaralhados.length;
    setAnimando(true);
    setPersonagemSelecionado(anterior);
    setTimeout(() => {
      setAnimando(false);
    }, 300);
  }, [animando, personagemSelecionado, playSound, personagensEmbaralhados.length]);

  const confirmarSelecao = useCallback(() => {
    const personagem = personagensEmbaralhados[personagemSelecionado];
    const codornaAnterior = localStorage.getItem("moveacademy-codorna");
    
    // Se trocou de personagem, limpa o histórico
    if (codornaAnterior && codornaAnterior !== personagem.id) {
      localStorage.removeItem("moveacademy-missoes-concluidas");
      localStorage.removeItem("moveacademy-xp");
    }
    
    localStorage.setItem("moveacademy-codorna", personagem.id);
    playSound("success");
    
    // Redireciona para as trilhas
    setTimeout(() => {
      router.push("/trilhas");
    }, 500);
  }, [personagemSelecionado, playSound, router, personagensEmbaralhados]);

  // Carrega personagem salvo
  useEffect(() => {
    const saved = localStorage.getItem("moveacademy-codorna");
    if (saved && ["ang3l", "transfer", "entry", "borrow", "module", "patch", "quasimodo", "constz"].includes(saved)) {
      const index = personagensEmbaralhados.findIndex((p) => p.id === saved);
      if (index !== -1) {
        setPersonagemSelecionado(index);
      }
    }
  }, [personagensEmbaralhados]);

  // Navegação por teclado (setas esquerda/direita)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (animando) return;
      
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        personagemAnterior();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        proximoPersonagem();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        confirmarSelecao();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [personagemSelecionado, animando, personagemAnterior, proximoPersonagem, confirmarSelecao]);

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-6 sm:py-4 sm:px-4 bg-[#0A1A2F] text-[#FFFFFF] relative overflow-y-auto">
      {/* Background pattern estilo Phantasy Star */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(106,215,229,0.1) 2px, rgba(106,215,229,0.1) 4px)`,
      }} />
      <div className="max-w-4xl w-full relative z-10">
        <main className="w-full hud-panel p-4 sm:p-6 relative mb-6">
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
              <p className="text-[#E5E7EB] text-xs sm:text-sm font-mono mb-3">
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

          {/* Carrossel de Seleção de Personagem - Estilo HUD */}
          <div className="mb-4 sm:mb-5">
            <div className="relative">
              {/* Botões de navegação */}
              <button
                onClick={personagemAnterior}
                disabled={animando}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-sui-blue/20 hover:bg-sui-blue/40 border-2 border-sui-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center text-xl md:text-2xl text-sui-blue hover:scale-110 active:scale-95"
                aria-label={lang === "pt" ? "Personagem anterior" : lang === "en" ? "Previous character" : "Personaje anterior"}
              >
                ‹
              </button>

              <button
                onClick={proximoPersonagem}
                disabled={animando}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-sui-blue/20 hover:bg-sui-blue/40 border-2 border-sui-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center text-xl md:text-2xl text-sui-blue hover:scale-110 active:scale-95"
                aria-label={lang === "pt" ? "Próximo personagem" : lang === "en" ? "Next character" : "Siguiente personaje"}
              >
                ›
              </button>

              {/* Container do carrossel */}
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${personagemSelecionado * 100}%)`,
                  }}
                >
                  {personagensEmbaralhados.map((p, index) => {
                    const isSelecionado = index === personagemSelecionado;
                    const isTransfer = p.id === "transfer" || p.id === "entry";
                    const isAng3l = p.id === "ang3l";
                    
                    return (
                      <div
                        key={p.id}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <div 
                          onClick={() => {
                            if (isSelecionado) {
                              confirmarSelecao();
                            } else {
                              selecionarPersonagem(index);
                            }
                          }}
                          className={`group relative hud-panel p-4 sm:p-5 transition-all duration-300 cursor-pointer ${
                            isSelecionado 
                              ? isTransfer 
                                ? "border-sui-blue border-2" 
                                : "border-move-green border-2"
                              : ""
                          }`}
                        style={{
                          boxShadow: isSelecionado
                            ? p.id === "transfer"
                              ? "inset 0 0 20px rgba(106, 215, 229, 0.3), 0 0 25px rgba(106, 215, 229, 0.4)"
                              : "inset 0 0 20px rgba(63, 254, 149, 0.3), 0 0 25px rgba(63, 254, 149, 0.4)"
                            : "inset 0 0 15px rgba(106, 215, 229, 0.1)",
                        }}
                        >
                          {/* Borda lateral */}
                          <div className={`absolute ${p.id === "transfer" || p.id === "entry" || p.id === "ang3l" || p.id === "borrow" || p.id === "module" ? "left-0" : "right-0"} top-0 bottom-0 w-1 bg-gradient-to-b ${
                            p.id === "ang3l"
                              ? "from-white via-gray-300 to-white"
                              : p.id === "transfer" || p.id === "entry"
                              ? "from-sui-blue via-sui-cyan to-sui-blue"
                              : p.id === "borrow" || p.id === "module"
                              ? "from-move-green via-sui-cyan to-move-green"
                              : "from-purple-400 via-purple-300 to-purple-400"
                          } opacity-60 group-hover:opacity-100 transition-opacity`} />
                          
                          <div className="relative z-10 flex flex-col items-center">
                            {/* Personagem */}
                            <div className="mb-3 sm:mb-4">
                              <div className={`relative w-32 h-32 sm:w-36 sm:h-36 border-2 ${
                                p.id === "ang3l" ? "border-white/60" :
                                p.id === "transfer" || p.id === "entry" ? "border-sui-blue/60" :
                                p.id === "borrow" || p.id === "module" ? "border-move-green/60" :
                                "border-purple-400/60"
                              } bg-[#0A1A2F] p-1.5`}
                              style={{
                                boxShadow: p.id === "ang3l"
                                  ? "inset 0 0 15px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.3)"
                                  : p.id === "transfer" || p.id === "entry"
                                  ? "inset 0 0 15px rgba(106, 215, 229, 0.4), 0 0 20px rgba(106, 215, 229, 0.3)"
                                  : p.id === "borrow" || p.id === "module"
                                  ? "inset 0 0 15px rgba(63, 254, 149, 0.4), 0 0 20px rgba(63, 254, 149, 0.3)"
                                  : "inset 0 0 15px rgba(192, 132, 252, 0.4), 0 0 20px rgba(192, 132, 252, 0.3)",
                              }}>
                                <div className={`relative w-full h-full border-2 ${
                                  p.id === "ang3l" ? "border-white/50" :
                                  p.id === "transfer" || p.id === "entry" ? "border-sui-blue/50" :
                                  p.id === "borrow" || p.id === "module" ? "border-move-green/50" :
                                  "border-purple-400/50"
                                }`}>
                                  <Image
                                    src={p.imagem}
                                    alt={p.nome}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 128px, 144px"
                                    unoptimized
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Texto */}
                            <div className="w-full text-center">
                              <div className="hud-text-box mb-2">
                                <h2 className={`text-lg sm:text-xl font-bold ${
                                  p.id === "ang3l" ? "text-white" :
                                  p.id === "transfer" || p.id === "entry" ? "text-sui-blue" :
                                  p.id === "borrow" || p.id === "module" ? "text-move-green" :
                                  "text-purple-400"
                                } mb-1.5 font-mono uppercase tracking-wider group-hover:text-sui-cyan transition-colors`}>
                                  {lang === "pt" ? p.nome : lang === "en" ? p.nomeEn : p.nomeEs}
                                </h2>
                                <div className={`h-0.5 bg-gradient-to-r from-transparent ${
                                  p.id === "ang3l" ? "via-white/60" :
                                  p.id === "transfer" || p.id === "entry" ? "via-sui-blue/60" :
                                  p.id === "borrow" || p.id === "module" ? "via-move-green/60" :
                                  "via-purple-400/60"
                                } to-transparent my-1.5`} />
                                <p className="text-[#E5E7EB] text-xs font-mono">
                                  &gt; {p.id === "transfer"
                                    ? (lang === "pt" 
                                        ? "A CODORNA QUE MOVE OBJETOS"
                                        : lang === "en"
                                        ? "THE QUAIL THAT MOVES OBJECTS"
                                        : "LA CODORNIZ QUE MUEVE OBJETOS")
                                    : p.id === "borrow"
                                    ? (lang === "pt"
                                        ? "A CODORNA QUE EMPRESTA COM SABEDORIA"
                                        : lang === "en"
                                        ? "THE QUAIL WHO LENDS WISELY"
                                        : "LA CODORNIZ QUE PRESTA CON SABIDURÍA")
                                    : p.id === "entry"
                                    ? (lang === "pt"
                                        ? "O PROTETOR DAS PORTAS DO CÓDIGO"
                                        : lang === "en"
                                        ? "THE PROTECTOR OF CODE GATES"
                                        : "EL PROTECTOR DE LAS PUERTAS DEL CÓDIGO")
                                    : p.id === "module"
                                    ? (lang === "pt"
                                        ? "A ARQUITETA DOS MÓDULOS"
                                        : lang === "en"
                                        ? "THE ARCHITECT OF MODULES"
                                        : "LA ARQUITECTA DE LOS MÓDULOS")
                                    : p.id === "patch"
                                    ? (lang === "pt"
                                        ? "O ARTESÃO DAS MELHORIAS"
                                        : lang === "en"
                                        ? "THE CRAFTSMAN OF IMPROVEMENTS"
                                        : "EL ARTESANO DE LAS MEJORAS")
                                    : p.id === "quasimodo"
                                    ? (lang === "pt"
                                        ? "O SÁBIO DAS DICAS"
                                        : lang === "en"
                                        ? "THE WISE ONE OF TIPS"
                                        : "EL SABIO DE LOS CONSEJOS")
                                    : p.id === "constz"
                                    ? (lang === "pt"
                                        ? "O GUARDIÃO DO CONHECIMENTO IMUTÁVEL"
                                        : lang === "en"
                                        ? "THE GUARDIAN OF IMMUTABLE KNOWLEDGE"
                                        : "EL GUARDIÁN DEL CONOCIMIENTO INMUTABLE")
                                    : p.id === "ang3l"
                                    ? (lang === "pt"
                                        ? "A PROTETORA DA IDENTIDADE"
                                        : lang === "en"
                                        ? "THE PROTECTOR OF IDENTITY"
                                        : "LA PROTECTORA DE LA IDENTIDAD")
                                    : (lang === "pt"
                                        ? "A CODORNA QUE ENTRA EM AÇÃO"
                                        : lang === "en"
                                        ? "THE QUAIL THAT TAKES ACTION"
                                        : "LA CODORNIZ QUE ENTRA EN ACCIÓN")
                                  }
                                </p>
                              </div>
                              <div className="hud-text-box">
                                <p className="text-[#CBD5F5] text-xs font-mono italic">
                                  &quot;{lang === "pt" ? p.descricao : lang === "en" ? p.descricaoEn : p.descricaoEs}&quot;
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Indicadores de personagem */}
              <div className="flex justify-center gap-2 mt-4">
                {personagensEmbaralhados.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selecionarPersonagem(index)}
                    disabled={animando}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === personagemSelecionado
                        ? "bg-sui-blue w-8 scale-110"
                        : "bg-sui-blue/30 hover:bg-sui-blue/50"
                    }`}
                    aria-label={`${lang === "pt" ? "Personagem" : lang === "en" ? "Character" : "Personaje"} ${index + 1}`}
                  />
                ))}
              </div>

              {/* Instrução de clique */}
              <div className="mt-4 text-center">
                <p className="text-xs text-[#CBD5F5] font-mono">
                  {lang === "pt" 
                    ? "Clique no personagem para confirmar" 
                    : lang === "en" 
                    ? "Click on character to confirm" 
                    : "Haz clic en el personaje para confirmar"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Borda inferior estilo HUD */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sui-cyan to-transparent opacity-60" />

        </main>
      </div>
    </div>
  );
}
