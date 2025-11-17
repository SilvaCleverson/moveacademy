"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/contexts/AudioContext";
import Link from "next/link";

type CodornaType = "transfer" | "entry";

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
];

export default function SelecionarPersonagemPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const { playSound } = useAudio();
  const [personagemSelecionado, setPersonagemSelecionado] = useState<number>(0);
  const [animando, setAnimando] = useState(false);

  const selecionarPersonagem = useCallback((index: number) => {
    if (animando) return;
    if (index === personagemSelecionado) return;
    
    playSound("click");
    setAnimando(true);
    setPersonagemSelecionado(index);
    
    setTimeout(() => {
      setAnimando(false);
    }, 300);
  }, [animando, personagemSelecionado, playSound]);

  const proximoPersonagem = useCallback(() => {
    if (animando) return;
    playSound("click");
    const proximo = (personagemSelecionado + 1) % personagens.length;
    setAnimando(true);
    setPersonagemSelecionado(proximo);
    setTimeout(() => {
      setAnimando(false);
    }, 300);
  }, [animando, personagemSelecionado, playSound]);

  const personagemAnterior = useCallback(() => {
    if (animando) return;
    playSound("click");
    const anterior = (personagemSelecionado - 1 + personagens.length) % personagens.length;
    setAnimando(true);
    setPersonagemSelecionado(anterior);
    setTimeout(() => {
      setAnimando(false);
    }, 300);
  }, [animando, personagemSelecionado, playSound]);

  const confirmarSelecao = useCallback(() => {
    const personagem = personagens[personagemSelecionado];
    localStorage.setItem("moveacademy-codorna", personagem.id);
    playSound("success");
    
    // Redireciona para a página inicial
    setTimeout(() => {
      router.push("/");
    }, 500);
  }, [personagemSelecionado, playSound, router]);

  // Carrega personagem salvo
  useEffect(() => {
    const saved = localStorage.getItem("moveacademy-codorna");
    if (saved === "transfer" || saved === "entry") {
      const index = personagens.findIndex((p) => p.id === saved);
      if (index !== -1) {
        setPersonagemSelecionado(index);
      }
    }
  }, []);

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

  const personagem = personagens[personagemSelecionado];
  const nome = lang === "pt" ? personagem.nome : lang === "en" ? personagem.nomeEn : personagem.nomeEs;
  const descricao = lang === "pt" ? personagem.descricao : lang === "en" ? personagem.descricaoEn : personagem.descricaoEs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E27] via-[#1A1F3A] to-[#0A0E27] text-[#E5E7EB] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efeito de fundo estilo Golden Axe */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sui-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sui-cyan/10 rounded-full blur-3xl" />
      </div>

      {/* Título */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r from-sui-blue via-sui-cyan to-sui-blue bg-clip-text text-transparent">
          {lang === "pt" ? "SELECIONE SEU GUERREIRO" : lang === "en" ? "SELECT YOUR WARRIOR" : "SELECCIONA TU GUERRERO"}
        </h1>
        <p className="text-center text-[#CBD5F5] text-sm md:text-base">
          {lang === "pt" ? "Escolha seu personagem e comece sua jornada em Moviara" : lang === "en" ? "Choose your character and begin your journey in Moviara" : "Elige tu personaje y comienza tu viaje en Moviara"}
        </p>
      </div>

      {/* Container principal do carrossel */}
      <div className="relative w-full max-w-6xl mx-auto z-10">
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Botão anterior */}
          <button
            onClick={personagemAnterior}
            disabled={animando}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-sui-blue/20 hover:bg-sui-blue/40 border-2 border-sui-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center text-2xl md:text-3xl text-sui-blue hover:scale-110 active:scale-95"
            aria-label={lang === "pt" ? "Personagem anterior" : lang === "en" ? "Previous character" : "Personaje anterior"}
          >
            ‹
          </button>

          {/* Carrossel de personagens */}
          <div className="flex-1 flex items-center justify-center gap-4 md:gap-8 overflow-hidden">
            {personagens.map((p, index) => {
              const distancia = Math.abs(index - personagemSelecionado);
              const isSelecionado = index === personagemSelecionado;
              const isVisivel = distancia <= 1;

              if (!isVisivel) return null;

              return (
                <div
                  key={p.id}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isSelecionado
                      ? "scale-100 z-20 opacity-100"
                      : "scale-75 z-10 opacity-50"
                  } ${animando ? "pointer-events-none" : ""}`}
                  style={{
                    transform: isSelecionado
                      ? "translateX(0) scale(1)"
                      : index < personagemSelecionado
                      ? "translateX(-100%) scale(0.75)"
                      : "translateX(100%) scale(0.75)",
                  }}
                >
                  {/* Card do personagem */}
                  <div
                    className={`relative w-48 h-64 md:w-64 md:h-80 rounded-lg border-2 transition-all duration-300 ${
                      isSelecionado
                        ? "border-sui-blue shadow-[0_0_30px_rgba(59,130,246,0.5)] bg-gradient-to-b from-sui-blue/20 to-transparent"
                        : "border-sui-blue/30 bg-gradient-to-b from-sui-blue/10 to-transparent"
                    }`}
                  >
                    {/* Imagem do personagem */}
                    <div className="relative w-full h-full">
                      <Image
                        src={p.imagem}
                        alt={p.nome}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 192px, 256px"
                        unoptimized
                        priority={isSelecionado}
                      />
                      {/* Overlay de seleção */}
                      {isSelecionado && (
                        <div className="absolute inset-0 bg-gradient-to-t from-sui-blue/30 via-transparent to-transparent rounded-lg" />
                      )}
                    </div>

                    {/* Badge de selecionado */}
                    {isSelecionado && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-sui-move px-4 py-1 rounded-full text-[#020617] font-bold text-sm md:text-base shadow-lg">
                        ✓ {lang === "pt" ? "SELECIONADO" : lang === "en" ? "SELECTED" : "SELECCIONADO"}
                      </div>
                    )}
                  </div>

                  {/* Nome e descrição (só mostra para o selecionado) */}
                  {isSelecionado && (
                    <div className="mt-4 text-center max-w-xs">
                      <h2 className="text-2xl md:text-3xl font-bold text-sui-blue mb-2">{nome}</h2>
                      <p className="text-sm md:text-base text-[#CBD5F5] mb-4">{descricao}</p>

                      {/* Atributos */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-sui-blue/20 rounded-lg p-2 border border-sui-blue/30">
                          <div className="text-xs text-[#CBD5F5] mb-1">
                            {lang === "pt" ? "FORÇA" : lang === "en" ? "STRENGTH" : "FUERZA"}
                          </div>
                          <div className="text-lg font-bold text-sui-blue">{p.atributos.forca}</div>
                        </div>
                        <div className="bg-sui-blue/20 rounded-lg p-2 border border-sui-blue/30">
                          <div className="text-xs text-[#CBD5F5] mb-1">
                            {lang === "pt" ? "SABEDORIA" : lang === "en" ? "WISDOM" : "SABIDURÍA"}
                          </div>
                          <div className="text-lg font-bold text-sui-blue">{p.atributos.sabedoria}</div>
                        </div>
                        <div className="bg-sui-blue/20 rounded-lg p-2 border border-sui-blue/30">
                          <div className="text-xs text-[#CBD5F5] mb-1">
                            {lang === "pt" ? "DESTREZA" : lang === "en" ? "DEXTERITY" : "DESTREZA"}
                          </div>
                          <div className="text-lg font-bold text-sui-blue">{p.atributos.destreza}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Botão próximo */}
          <button
            onClick={proximoPersonagem}
            disabled={animando}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-sui-blue/20 hover:bg-sui-blue/40 border-2 border-sui-blue/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center text-2xl md:text-3xl text-sui-blue hover:scale-110 active:scale-95"
            aria-label={lang === "pt" ? "Próximo personagem" : lang === "en" ? "Next character" : "Siguiente personaje"}
          >
            ›
          </button>
        </div>

        {/* Botão de confirmar */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={confirmarSelecao}
            className="px-8 py-4 bg-gradient-sui-move text-[#020617] font-bold text-lg md:text-xl rounded-lg hover:opacity-90 transition-opacity shadow-lg hover:scale-105 active:scale-95"
          >
            {lang === "pt" ? "CONFIRMAR SELEÇÃO" : lang === "en" ? "CONFIRM SELECTION" : "CONFIRMAR SELECCIÓN"}
          </button>
        </div>

        {/* Indicadores de personagem */}
        <div className="flex justify-center gap-2 mt-6">
          {personagens.map((_, index) => (
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
      </div>

      {/* Botão voltar */}
      <Link
        href="/"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 px-6 py-3 bg-move-navy/50 hover:bg-move-navy/80 border border-sui-blue/30 rounded-lg text-[#CBD5F5] hover:text-sui-blue transition-colors"
      >
        {lang === "pt" ? "← Voltar" : lang === "en" ? "← Back" : "← Volver"}
      </Link>
    </div>
  );
}

