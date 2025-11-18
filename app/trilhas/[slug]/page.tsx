"use client";

import { getTrilhaBySlug, trilhas } from "@/lib/data/trilhas-guerreiro";
import MissaoCard from "@/components/guerreiro/MissaoCard";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PageProps {
  params: {
    slug: string;
  };
}

type CodornaType = "transfer" | "entry" | null;

export default function TrilhaDetailPage({ params }: PageProps) {
  const router = useRouter();
  const trilha = getTrilhaBySlug(params.slug);
  const { lang } = useLanguage();
  const [codornaSelecionada, setCodornaSelecionada] = useState<CodornaType>(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [xpAnimando, setXpAnimando] = useState(false);
  const [xpInicializado, setXpInicializado] = useState(false);

  // Carrega codorna selecionada do localStorage
  useEffect(() => {
    const savedCodorna = localStorage.getItem("moveacademy-codorna") as CodornaType;
    if (savedCodorna === "transfer" || savedCodorna === "entry") {
      setCodornaSelecionada(savedCodorna);
    }
  }, []);

  // Carrega missões concluídas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("moveacademy-missoes-concluidas");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMissoesConcluidas(parsed);
      } catch (e) {
        // Ignora erro
      }
    }
    // Marca que as missões foram carregadas
    setXpInicializado(true);
  }, []);

  // Calcula XP baseado em TODAS as missões concluídas de TODAS as trilhas
  useEffect(() => {
    // Só calcula depois que as missões foram carregadas
    if (!xpInicializado) return;
    
    // Pega todas as missões de todas as trilhas
    const todasMissoes = trilhas.flatMap((t) => t.missoes);
    
    // Calcula XP total de todas as missões concluídas
    const xpTotal = todasMissoes
      .filter((m) => missoesConcluidas.includes(m.id))
      .reduce((sum, m) => sum + m.xpRecompensa, 0);
    
    // Se é a primeira vez carregando (xp === 0), define diretamente sem animação
    if (xp === 0) {
      setXp(xpTotal);
      setXpAnimando(false);
      return;
    }
    
    // Se o XP aumentou, anima
    if (xpTotal > xp) {
      setXpAnimando(true);
      const targetXp = xpTotal;
      const duration = 1000;
      const steps = 30;
      const increment = (targetXp - xp) / steps;
      const interval = duration / steps;
      
      let currentXp = xp;
      const timer = setInterval(() => {
        currentXp += increment;
        if (currentXp >= targetXp) {
          setXp(targetXp);
          setXpAnimando(false);
          clearInterval(timer);
        } else {
          setXp(Math.floor(currentXp));
        }
      }, interval);

      return () => clearInterval(timer);
    } else {
      // Se o XP não mudou, apenas atualiza sem animação
      setXp(xpTotal);
      setXpAnimando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missoesConcluidas, xpInicializado]); // xp removido intencionalmente para evitar loop

  useEffect(() => {
    if (!trilha) {
      router.push("/not-found");
      return;
    }
    // BLOQUEIO REMOVIDO - Trilhas sem missões também são acessíveis
  }, [trilha, router]);

  if (!trilha) {
    return (
      <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#CBD5F5]">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] p-6 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Links de navegação e seletor de idioma */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sui-blue hover:text-sui-cyan transition-colors font-mono text-sm"
          >
            ← Home
          </Link>
          <span className="text-sui-blue/50">•</span>
          <Link
            href="/trilhas"
            className="inline-flex items-center gap-2 text-sui-blue hover:text-sui-cyan transition-colors font-mono text-sm"
          >
            ← Trilhas
          </Link>
          </div>
        </div>

        {/* Card da Codorna Selecionada */}
        {codornaSelecionada && (
          <div className="mb-6 hud-panel p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Imagem da Codorna */}
              <div className="flex-shrink-0">
                <div className={`relative w-24 h-24 sm:w-28 sm:h-28 border-2 ${
                  codornaSelecionada === "transfer" ? "border-sui-blue/60" : "border-move-green/60"
                } bg-[#0A1A2F] p-1.5`} style={{
                  boxShadow: codornaSelecionada === "transfer"
                    ? "inset 0 0 15px rgba(106, 215, 229, 0.4), 0 0 20px rgba(106, 215, 229, 0.3)"
                    : "inset 0 0 15px rgba(63, 254, 149, 0.4), 0 0 20px rgba(63, 254, 149, 0.3)",
                }}>
                  <div className={`relative w-full h-full border-2 ${
                    codornaSelecionada === "transfer" ? "border-sui-blue/50" : "border-move-green/50"
                  }`}>
                    <Image
                      src={codornaSelecionada === "transfer" ? "/C1.png" : "/C2.png"}
                      alt={codornaSelecionada === "transfer" ? "Sir Transfer" : "Sir Entry"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 112px"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Informações */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="hud-text-box mb-2">
                  <h3 className={`text-lg sm:text-xl font-bold mb-1 font-mono uppercase tracking-wider ${
                    codornaSelecionada === "transfer" ? "text-sui-blue" : "text-move-green"
                  }`}>
                    {codornaSelecionada === "transfer" ? "SIR TRANSFER" : "SIR ENTRY"}
                  </h3>
                  <div className={`h-0.5 bg-gradient-to-r from-transparent ${
                    codornaSelecionada === "transfer" ? "via-sui-blue/60" : "via-move-green/60"
                  } to-transparent my-1.5`} />
        </div>

                {/* XP Display */}
                <div className="hud-text-box">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-lg">⭐</span>
                    <span className="text-base sm:text-lg font-bold font-mono text-move-green">
                      {xp} XP
                    </span>
                    {xpAnimando && (
                      <span className="text-xs text-sui-cyan">
                        {lang === "pt" ? "Ganando..." : lang === "en" ? "Earning..." : "Ganando..."}
                      </span>
                    )}
                  </div>
                  {xp > 0 && (
                    <p className="text-xs text-sui-cyan mt-1 font-mono">
                      {lang === "pt" 
                        ? `✓ ${missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length} missões concluídas!`
                        : lang === "en"
                        ? `✓ ${missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length} missions completed!`
                        : `✓ ${missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length} misiones completadas!`
                      }
                    </p>
                  )}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Lista de Missões */}
        <div className="bg-move-navy/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-sui-blue/25">
          {/* Informações da Trilha - Apenas na parte de baixo */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <span className="text-5xl sm:text-6xl">{trilha.icone}</span>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E5E7EB] mb-2">{trilha.titulo[lang]}</h1>
                <p className="text-[#CBD5F5] text-base sm:text-lg mb-3">{trilha.descricao[lang]}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-[#9CA3AF]">
                  <span>{trilha.missoes.length} {lang === "pt" ? "missões" : lang === "en" ? "missions" : "misiones"}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{trilha.xpTotal} XP {lang === "pt" ? "total" : lang === "en" ? "total" : "total"}</span>
                </div>
              </div>
            </div>
            <div className="bg-[#020617]/50 rounded-lg p-3 sm:p-4 border border-sui-blue/20">
              <p className="text-[#CBD5F5] italic text-sm sm:text-base">{trilha.lore[lang]}</p>
            </div>
          </div>
          
          {/* Gauge de Progresso */}
          {trilha.missoes.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-sui-blue">
                  {lang === "pt" ? "Missões" : lang === "en" ? "Missions" : "Misiones"}
                </h2>
                <span className="text-sm sm:text-base text-[#CBD5F5] font-mono">
                  {missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length} / {trilha.missoes.length}
                </span>
              </div>
              {/* Barra de Progresso */}
              <div className="w-full h-3 sm:h-4 bg-[#1E293B] rounded-full overflow-hidden border border-sui-blue/20">
                <div 
                  className="h-full bg-gradient-to-r from-sui-blue via-sui-cyan to-move-green transition-all duration-500 ease-out"
                  style={{
                    width: `${(missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length / trilha.missoes.length) * 100}%`
                  }}
                />
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2 font-mono">
                {lang === "pt" 
                  ? `${Math.round((missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length / trilha.missoes.length) * 100)}% concluído`
                  : lang === "en"
                  ? `${Math.round((missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length / trilha.missoes.length) * 100)}% completed`
                  : `${Math.round((missoesConcluidas.filter(id => trilha.missoes.some(m => m.id === id)).length / trilha.missoes.length) * 100)}% completado`
                }
              </p>
            </div>
          )}
          {trilha.missoes.length === 0 ? (
            <div className="bg-[#020617]/50 rounded-lg p-6 sm:p-8 border border-sui-blue/20">
              <div className="text-center mb-6">
                <p className="text-[#CBD5F5] text-lg sm:text-xl mb-2 font-bold">
                  {lang === "pt" 
                    ? "🚧 Esta trilha está em desenvolvimento"
                    : lang === "en"
                    ? "🚧 This trail is under development"
                    : "🚧 Esta trilha está en desarrollo"}
                </p>
                <p className="text-[#9CA3AF] text-sm mb-4">
                  {lang === "pt"
                    ? "As missões desta trilha serão adicionadas em breve. Fique atento!"
                    : lang === "en"
                    ? "Missions for this trail will be added soon. Stay tuned!"
                    : "Las misiones de esta trilha se agregarán pronto. ¡Mantente atento!"}
                </p>
              </div>
              
              {/* O que será aprendido */}
              <div className="bg-move-navy/30 rounded-lg p-4 sm:p-6 border border-sui-blue/10">
                <h3 className="text-sui-blue font-bold text-base sm:text-lg mb-3 font-mono uppercase">
                  {lang === "pt" ? "📚 O QUE VOCÊ VAI APRENDER" : lang === "en" ? "📚 WHAT YOU'LL LEARN" : "📚 LO QUE APRENDERÁS"}
                </h3>
                <div className="text-[#E5E7EB] text-sm sm:text-base leading-relaxed">
                  <p className="mb-3">{trilha.descricao[lang]}</p>
                  <div className="bg-[#0A1A2F]/50 rounded p-3 border-l-2 border-sui-blue/50">
                    <p className="text-[#CBD5F5] italic text-xs sm:text-sm">{trilha.lore[lang]}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {trilha.missoes.map((missao, index) => {
                const concluida = missoesConcluidas.includes(missao.id);
                
                // Verifica se a trilha anterior foi completamente concluída
                const trilhaIndex = trilhas.findIndex(t => t.id === trilha.id);
                const trilhaAnteriorCompleta = trilhaIndex > 0 
                  ? trilhas[trilhaIndex - 1].missoes.every(m => missoesConcluidas.includes(m.id))
                  : true; // Primeira trilha sempre liberada
                
                // Missão está bloqueada se:
                // 1. É a primeira missão E a trilha anterior não foi completamente concluída
                // 2. OU não é a primeira E a missão anterior não foi concluída
                const bloqueada = (index === 0 && !trilhaAnteriorCompleta) || 
                                 (index > 0 && !missoesConcluidas.includes(trilha.missoes[index - 1].id));

                return (
                  <MissaoCard
                    key={missao.id}
                    missao={missao}
                    trilhaSlug={trilha.slug}
                    concluida={concluida}
                    bloqueada={bloqueada}
                    motivoBloqueio={index === 0 && !trilhaAnteriorCompleta 
                      ? "trilha_anterior" 
                      : index > 0 && !missoesConcluidas.includes(trilha.missoes[index - 1].id)
                      ? "missao_anterior"
                      : undefined}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
