"use client";

import { getMissaoBySlug, trilhas } from "@/lib/data/trilhas-guerreiro";
import { Trilha, Missao } from "@/lib/types/guerreiro";
import MoveEditor from "@/components/MoveEditor";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
    missao: string;
  };
}

type CodornaType = "transfer" | "entry" | null;

export default function MissaoPage({ params }: PageProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  
  // Estados (sempre declarados no topo)
  const [codigo, setCodigo] = useState("");
  const [mostrarSolucao, setMostrarSolucao] = useState(false);
  const [statusExecucao, setStatusExecucao] = useState<"idle" | "compilando" | "executando" | "sucesso" | "erro">("idle");
  const [mensagemErro, setMensagemErro] = useState("");
  const [result, setResult] = useState<{ trilha: Trilha; missao: Missao } | null>(null);
  const [codornaSelecionada, setCodornaSelecionada] = useState<CodornaType>(null);
  const [missoesConcluidas, setMissoesConcluidas] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [xpAnimando, setXpAnimando] = useState(false);

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
  }, []);

  // Calcula XP baseado em TODAS as missões concluídas de TODAS as trilhas
  useEffect(() => {
    // Pega todas as missões de todas as trilhas
    const todasMissoes = trilhas.flatMap((t) => t.missoes);
    
    // Calcula XP total de todas as missões concluídas
    const xpTotal = todasMissoes
      .filter((m) => missoesConcluidas.includes(m.id))
      .reduce((sum, m) => sum + m.xpRecompensa, 0);
    
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
      setXp(xpTotal);
      setXpAnimando(false);
    }
  }, [missoesConcluidas, xp]);

  useEffect(() => {
    // Garante que params está disponível
    if (!params?.slug || !params?.missao) {
      router.push("/not-found");
      return;
    }

    const missaoResult = getMissaoBySlug(params.slug, params.missao);
    
    if (!missaoResult) {
      router.push("/not-found");
      return;
    }
    
    setResult(missaoResult);
    const { trilha, missao } = missaoResult;
    
    // Inicializa o código quando a missão é carregada
    if (missao.codigoInicial) {
      setCodigo(missao.codigoInicial);
    }
    
    // Se a trilha não tem missões, redireciona para página em construção
    if (trilha.missoes.length === 0) {
      router.push("/em-construcao");
    }
  }, [params, router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#CBD5F5]">Carregando...</p>
        </div>
      </div>
    );
  }

  const { trilha, missao } = result;
  
  // Se não tem missões, mostra loading enquanto redireciona
  if (trilha.missoes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#CBD5F5]">Carregando...</p>
        </div>
      </div>
    );
  }

  const handleExecutar = () => {
    // Verifica se a missão já foi concluída
    const jaConcluida = missoesConcluidas.includes(missao.id);
    
    // Primeiro mostra "Compilação da Sui"
    setStatusExecucao("compilando");
    
    // Após 1.5 segundos, mostra "executando"
    setTimeout(() => {
      setStatusExecucao("executando");
      
      // Após mais 1 segundo, sempre retorna sucesso
      setTimeout(() => {
        setStatusExecucao("sucesso");
        
        // Só salva e ganha XP se ainda não foi concluída
        if (!jaConcluida) {
          // Salva missão como concluída no localStorage
          const saved = localStorage.getItem("moveacademy-missoes-concluidas");
          let novasMissoesConcluidas: string[] = [];
          if (saved) {
            try {
              novasMissoesConcluidas = JSON.parse(saved);
            } catch (e) {
              // Ignora erro
            }
          }
          
          if (!novasMissoesConcluidas.includes(missao.id)) {
            novasMissoesConcluidas.push(missao.id);
            localStorage.setItem("moveacademy-missoes-concluidas", JSON.stringify(novasMissoesConcluidas));
            // Atualiza o estado para refletir a mudança imediatamente
            setMissoesConcluidas(novasMissoesConcluidas);
          }
        }
        
        // Após 2 segundos, redireciona para próxima missão (só se foi a primeira vez)
        if (!jaConcluida) {
          setTimeout(() => {
            const proximaMissao = trilha.missoes.find((m) => m.numero === missao.numero + 1);
            if (proximaMissao) {
              router.push(`/trilhas/${trilha.slug}/${proximaMissao.slug}`);
            } else {
              // Última missão - volta para trilha
              router.push(`/trilhas/${trilha.slug}`);
            }
          }, 2000);
        }
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navegação e seletor de idioma */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <Link
            href={`/trilhas/${trilha.slug}`}
            className="inline-flex items-center gap-2 text-sui-blue hover:text-sui-cyan transition-colors text-sm sm:text-base"
          >
            ← {lang === "pt" ? "Voltar" : lang === "en" ? "Back" : "Volver"}
          </Link>
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
                    <span className={`text-base sm:text-lg font-bold font-mono ${
                      xpAnimando ? "text-move-green" : "text-move-green"
                    }`}>
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

        {/* Seção Visual - Objetivo/Sugestão */}
        <div className="mb-6 hud-panel p-4 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-sui-blue/60 bg-[#0A1A2F] flex items-center justify-center text-3xl sm:text-4xl" style={{
                boxShadow: "inset 0 0 10px rgba(106, 215, 229, 0.4), 0 0 15px rgba(106, 215, 229, 0.3)",
              }}>
                {missao.icone}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="hud-text-box mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-sui-blue" />
                  <h2 className="text-base sm:text-lg font-bold text-sui-blue font-mono uppercase tracking-wider">
                    {lang === "pt" ? "OBJETIVO" : lang === "en" ? "OBJECTIVE" : "OBJETIVO"}
                  </h2>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-sui-blue/60 to-transparent" />
                </div>
                <p className="text-[#E5E7EB] text-sm sm:text-base font-mono leading-relaxed">
                  {missao.descricao}
                </p>
              </div>
              <div className="hud-text-box">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-move-green" />
                  <h3 className="text-xs sm:text-sm font-bold text-move-green font-mono uppercase tracking-wider">
                    {lang === "pt" ? "O QUE VOCÊ PRECISA FAZER" : lang === "en" ? "WHAT YOU NEED TO DO" : "QUÉ NECESITAS HACER"}
                  </h3>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-move-green/60 to-transparent" />
                </div>
                <p className="text-[#CBD5F5] text-xs sm:text-sm font-mono italic">
                  {lang === "pt"
                    ? "Complete o código no editor à direita e clique em 'Executar código'. A compilação da Sui validará seu código e você ganhará XP!"
                    : lang === "en"
                    ? "Complete the code in the editor on the right and click 'Run code'. Sui compilation will validate your code and you'll earn XP!"
                    : "Completa el código en el editor a la derecha y haz clic en 'Ejecutar código'. ¡La compilación de Sui validará tu código y ganarás XP!"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout de 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Coluna Esquerda: Instruções */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header da Missão */}
            <div className="bg-gradient-to-br from-move-navy via-move-navy/90 to-aqua-soft rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-sui-blue/25">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <span className="text-4xl sm:text-5xl flex-shrink-0">{missao.icone}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm text-sui-blue font-semibold mb-1">
                    {lang === "pt" ? "Missão" : lang === "en" ? "Mission" : "Misión"} {missao.numero}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#E5E7EB]">{missao.titulo}</h1>
                </div>
              </div>
              <p className="text-[#CBD5F5] text-base sm:text-lg mb-4">{missao.descricao}</p>
            </div>

            {/* Conteúdo/Instruções */}
            <div className="bg-move-navy/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-sui-blue/25">
              <div className="text-[#E5E7EB] prose prose-invert max-w-none [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-4 [&>h1]:text-sui-blue [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:mt-6 [&>h2]:text-sui-cyan [&>p]:mb-4 [&>p]:text-[#CBD5F5] [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>ul]:text-[#CBD5F5] [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4 [&>ol]:text-[#CBD5F5] [&>code]:bg-[#1E293B] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-move-green [&>pre]:bg-[#020617] [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-sui-blue/25 [&>pre]:overflow-x-auto [&>pre>code]:text-[#E5E7EB]">
                <ReactMarkdown>
                  {missao.conteudo}
                </ReactMarkdown>
              </div>
            </div>

            {/* Dicas */}
            {missao.dicas && missao.dicas.length > 0 && (
              <details className="bg-move-navy/30 rounded-xl p-4 border border-sui-blue/20">
                <summary className="cursor-pointer text-sui-cyan font-semibold mb-2">
                  💡 {lang === "pt" ? "Dicas" : lang === "en" ? "Tips" : "Consejos"} ({missao.dicas.length})
                </summary>
                <ul className="mt-2 space-y-1 text-[#CBD5F5]">
                  {missao.dicas.map((dica, index) => (
                    <li key={index} className="text-sm">
                      • {dica}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </div>

          {/* Coluna Direita: Editor e Execução */}
          <div className="space-y-4 sm:space-y-6">
            {/* Exemplo de Código */}
            {missao.codigoSolucao && (
              <div className="bg-move-navy/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-sui-blue/25">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">💻</span>
                  <h2 className="text-lg sm:text-xl font-bold text-sui-cyan">
                    {lang === "pt" ? "Exemplo" : lang === "en" ? "Example" : "Ejemplo"}
                  </h2>
                </div>
                <div className="bg-[#020617] rounded-lg p-4 border border-sui-blue/25 overflow-x-auto">
                  <pre className="text-sm sm:text-base text-[#E5E7EB] font-mono whitespace-pre-wrap">
                    <code>{missao.codigoSolucao}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Editor de Código */}
            <div className="bg-move-navy/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-sui-blue/25">
              <h2 className="text-lg sm:text-xl font-bold text-[#E5E7EB] mb-3 sm:mb-4">
                {lang === "pt" ? "Seu Código" : lang === "en" ? "Your Code" : "Tu Código"}
              </h2>
              <div className="mb-4">
                <MoveEditor
                  value={codigo}
                  onChange={(newCode) => {
                    setCodigo(newCode || "");
                    setStatusExecucao("idle"); // Reset status ao editar
                  }}
                  height="250px"
                />
              </div>

              {/* Botão Executar */}
              <button
                onClick={handleExecutar}
                disabled={statusExecucao === "compilando" || statusExecucao === "executando"}
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-sui-move text-[#020617] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {statusExecucao === "compilando"
                  ? (lang === "pt" ? "⏳ Compilação da Sui..." : lang === "en" ? "⏳ Sui Compilation..." : "⏳ Compilación de Sui...")
                  : statusExecucao === "executando" 
                  ? (lang === "pt" ? "Executando..." : lang === "en" ? "Running..." : "Ejecutando...")
                  : (lang === "pt" ? "▶ Executar código" : lang === "en" ? "▶ Run code" : "▶ Ejecutar código")
                }
              </button>
            </div>

            {/* Feedback de Compilação */}
            {statusExecucao === "compilando" && (
              <div className="bg-sui-blue/20 border-2 border-sui-blue rounded-xl p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl flex-shrink-0 animate-spin">⚙️</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-sui-blue mb-1">
                    {lang === "pt" ? "Compilação da Sui" : lang === "en" ? "Sui Compilation" : "Compilación de Sui"}
                  </h3>
                  <p className="text-sui-cyan text-xs sm:text-sm">
                    {lang === "pt" ? "Validando seu código..." : lang === "en" ? "Validating your code..." : "Validando tu código..."}
                  </p>
                </div>
              </div>
            )}

            {/* Feedback de Execução */}
            {statusExecucao === "sucesso" && (
              <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl flex-shrink-0">✓</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-1">
                    {lang === "pt" ? "Compilado com sucesso!" : lang === "en" ? "Compiled successfully!" : "¡Compilado con éxito!"}
                  </h3>
                  <p className="text-green-300 text-xs sm:text-sm">
                    {lang === "pt" ? "Avançando para próxima missão..." : lang === "en" ? "Advancing to next mission..." : "Avanzando a la siguiente misión..."}
                  </p>
                </div>
              </div>
            )}

            {statusExecucao === "erro" && (
              <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="text-3xl sm:text-4xl flex-shrink-0">✗</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-1">
                    {lang === "pt" ? "Erro de compilação" : lang === "en" ? "Compilation error" : "Error de compilación"}
                  </h3>
                  <p className="text-red-300 text-xs sm:text-sm">{mensagemErro}</p>
                </div>
              </div>
            )}

            {/* Recompensas */}
            <div className="bg-move-navy/30 rounded-xl p-3 sm:p-4 border border-sui-blue/20">
              <h3 className="text-xs sm:text-sm font-semibold text-sui-blue mb-2 sm:mb-3">
                {lang === "pt" ? "Recompensas:" : lang === "en" ? "Rewards:" : "Recompensas:"}
              </h3>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-move-green">
                  <span>⭐</span>
                  <span className="font-semibold">{missao.xpRecompensa} XP</span>
                </div>
                {missao.badgeRecompensa && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{missao.badgeRecompensa.icone}</span>
                    <span className="text-[#CBD5F5]">{missao.badgeRecompensa.nome}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Botão Ver Solução */}
            <button
              onClick={() => setMostrarSolucao(!mostrarSolucao)}
              className="w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-move-navy border border-sui-blue/50 text-sui-blue font-semibold hover:bg-move-navy/80 transition-colors text-sm sm:text-base"
            >
              {mostrarSolucao 
                ? (lang === "pt" ? "Ocultar" : lang === "en" ? "Hide" : "Ocultar")
                : (lang === "pt" ? "Ver" : lang === "en" ? "View" : "Ver")
              } {lang === "pt" ? "Solução" : lang === "en" ? "Solution" : "Solución"}
            </button>

            {/* Solução */}
            {mostrarSolucao && missao.codigoSolucao && (
              <div className="bg-[#020617] rounded-xl p-4 border border-move-green/25">
                <h3 className="text-sm font-semibold text-move-green mb-2">
                  {lang === "pt" ? "Solução:" : lang === "en" ? "Solution:" : "Solución:"}
                </h3>
                <MoveEditor value={missao.codigoSolucao} readOnly={true} height="200px" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
