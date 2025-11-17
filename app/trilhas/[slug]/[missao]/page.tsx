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
import IDEHeader from "@/components/ide/IDEHeader";
import TrilhasSidebar from "@/components/ide/TrilhasSidebar";
import ActionBar from "@/components/ide/ActionBar";
import ConsolePanel from "@/components/ide/ConsolePanel";
import ObjetivoPanel from "@/components/ide/ObjetivoPanel";
import { useAudio } from "@/contexts/AudioContext";

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
  const { playSound } = useAudio();
  
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
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [objetivoCollapsed, setObjetivoCollapsed] = useState(false);
  const [xpInicializado, setXpInicializado] = useState(false);
  const [mostrarModalSucesso, setMostrarModalSucesso] = useState(false);
  const [mostrarModalSolucao, setMostrarModalSolucao] = useState(false);
  const [mostrarModalErro, setMostrarModalErro] = useState(false);
  const [erroDetalhes, setErroDetalhes] = useState<{ titulo: string; mensagem: string; linha?: number; codigo?: string } | null>(null);

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

  // Verifica se a missão está bloqueada e redireciona (ANTES de qualquer early return)
  useEffect(() => {
    if (!result) return;
    
    const { trilha, missao } = result;
    
    // Verifica se a trilha está bloqueada (trilha anterior não completa)
    const trilhaIndex = trilhas.findIndex(t => t.id === trilha.id);
    const isTrilhaCompleta = (t: typeof trilhas[0]) => {
      if (t.missoes.length === 0) return false;
      return t.missoes.every(m => missoesConcluidas.includes(m.id));
    };
    const isTrilhaBloqueada = trilhaIndex > 0 && !isTrilhaCompleta(trilhas[trilhaIndex - 1]);

    // Verifica se a missão está bloqueada
    const missaoIndex = trilha.missoes.findIndex(m => m.id === missao.id);
    const isMissaoBloqueada = () => {
      if (isTrilhaBloqueada) return true;
      if (missaoIndex === 0) return false;
      const missaoAnterior = trilha.missoes[missaoIndex - 1];
      return !missoesConcluidas.includes(missaoAnterior.id);
    };

    const missaoBloqueada = isMissaoBloqueada();
    
    if (missaoBloqueada) {
      router.push(`/trilhas/${trilha.slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, missoesConcluidas, router]); // trilhas é constante importada, não precisa estar nas dependências

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

  // Verifica se a trilha está bloqueada (trilha anterior não completa)
  const trilhaIndex = trilhas.findIndex(t => t.id === trilha.id);
  const isTrilhaCompleta = (t: typeof trilhas[0]) => {
    if (t.missoes.length === 0) return false;
    return t.missoes.every(m => missoesConcluidas.includes(m.id));
  };
  const isTrilhaBloqueada = trilhaIndex > 0 && !isTrilhaCompleta(trilhas[trilhaIndex - 1]);

  // Verifica se a missão está bloqueada (para exibição)
  const missaoIndex = trilha.missoes.findIndex(m => m.id === missao.id);
  const isMissaoBloqueada = () => {
    if (isTrilhaBloqueada) return true;
    if (missaoIndex === 0) return false;
    const missaoAnterior = trilha.missoes[missaoIndex - 1];
    return !missoesConcluidas.includes(missaoAnterior.id);
  };
  const missaoBloqueada = isMissaoBloqueada();

  // Se a missão está bloqueada, mostra mensagem
  if (missaoBloqueada) {
    return (
      <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#CBD5F5]">{lang === "pt" ? "Missão bloqueada. Complete as missões anteriores primeiro." : lang === "en" ? "Mission locked. Complete previous missions first." : "Misión bloqueada. Completa las misiones anteriores primero."}</p>
        </div>
      </div>
    );
  }

  const handleExecutar = () => {
    handleRun();
  };

  const handleBuild = () => {
    const jaConcluida = missoesConcluidas.includes(missao.id);
    setStatusExecucao("compilando");
    setConsoleOutput([`$ sui move build`]);
    playSound("compile");
    
    setTimeout(() => {
      setConsoleOutput(prev => [...prev, `✓ Compiling Move modules...`, `  Building module ${missao.codigoInicial?.match(/module\s+(\S+)/)?.[1] || "0x1::despertar"}`, `✓ Build successful!`]);
      setStatusExecucao("sucesso");
      playSound("success");
    }, 1500);
  };

  const handleTest = () => {
    const jaConcluida = missoesConcluidas.includes(missao.id);
    setStatusExecucao("compilando");
    setConsoleOutput([`$ sui move test`]);
    playSound("compile");
    
    setTimeout(() => {
      setStatusExecucao("executando");
      setConsoleOutput(prev => [...prev, `✓ Running 1 test`, `  Test: test_${missao.slug}`, `✓ Test passed!`]);
      
      setTimeout(() => {
        setStatusExecucao("sucesso");
        playSound("success");
        if (!jaConcluida) {
          setConsoleOutput(prev => [...prev, `🎉 Missão concluída! +${missao.xpRecompensa} XP`]);
          playSound("xp");
        }
      }, 1000);
    }, 1500);
  };

  const handleRun = () => {
    const jaConcluida = missoesConcluidas.includes(missao.id);
    setStatusExecucao("compilando");
    setConsoleOutput([`$ sui move build`]);
    playSound("compile");
    
    // Simula verificação de erros no código
    // Para testar o modal de erro, você pode executar sem implementar a função
    const codigoSemComentarios = codigo.replace(/\/\/.*$/gm, "").replace(/\s+/g, " ").trim();
    const temErro = codigoSemComentarios.length < 50 || 
                    (missao.numero === 1 && !codigo.includes("debug::print")) ||
                    codigo.includes("// Seu código aqui") && codigoSemComentarios.length < 100;
    
    setTimeout(() => {
      if (temErro) {
        // Simula erro de compilação
        setConsoleOutput(prev => [...prev, 
          `✗ Compiling Move modules...`,
          `  Building module ${missao.codigoInicial?.match(/module\s+(\S+)/)?.[1] || "0x1::despertar"}`,
          ``,
          `Error:`,
          `  ┌─ ${missao.slug}.move:5:7`,
          `  │`,
          `5 │     // Seu código aqui`,
          `  │     ^^^^^^^^^^^^^^^^`,
          `  │`,
          `  = Missing implementation`,
          `  = Hint: Você precisa implementar a função main()`,
          ``
        ]);
        setStatusExecucao("erro");
        playSound("error");
        
        // Mostra modal de erro
        setErroDetalhes({
          titulo: lang === "pt" ? "Erro na Execução" : lang === "en" ? "Execution Error" : "Error de Ejecución",
          mensagem: lang === "pt" 
            ? "Seu código não foi executado com sucesso. Verifique se você implementou todas as funções necessárias."
            : lang === "en"
            ? "Your code did not execute successfully. Make sure you implemented all necessary functions."
            : "Tu código no se ejecutó correctamente. Asegúrate de implementar todas las funciones necesarias.",
          linha: 5,
          codigo: codigo
        });
        setMostrarModalErro(true);
      } else {
        // Sucesso
        setConsoleOutput(prev => [...prev, `✓ Compiling Move modules...`, `  Building module ${missao.codigoInicial?.match(/module\s+(\S+)/)?.[1] || "0x1::despertar"}`, `✓ Build successful!`]);
        setStatusExecucao("executando");
        
        setTimeout(() => {
          setConsoleOutput(prev => [...prev, `$ sui move run`, `✓ Executing...`, `✓ Execution successful!`]);
          setStatusExecucao("sucesso");
          playSound("success");
          
          if (!jaConcluida) {
            setConsoleOutput(prev => [...prev, `🎉 Missão concluída! +${missao.xpRecompensa} XP`]);
            playSound("xp");
            playSound("complete");
            
            // Salva missão como concluída
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
              setMissoesConcluidas(novasMissoesConcluidas);
            }
            
            // Mostra modal de sucesso
            setMostrarModalSucesso(true);
          }
        }, 1000);
      }
    }, 1500);
  };

  const handleClear = () => {
    setCodigo(missao.codigoInicial || "");
    setConsoleOutput([]);
    setStatusExecucao("idle");
  };

  const handleMostrarSolucao = () => {
    if (missao.codigoSolucao) {
      setMostrarModalSolucao(true);
      playSound("click");
    }
  };

  const handleCopiarSolucao = () => {
    if (missao.codigoSolucao) {
      navigator.clipboard.writeText(missao.codigoSolucao);
      playSound("success");
      setConsoleOutput([`✓ Solução copiada para a área de transferência!`]);
    }
  };

  // Layout IDE para todas as trilhas
  return (
    <div className="h-screen flex flex-col bg-gradient-deep-night text-[#E5E7EB] overflow-hidden">
      <IDEHeader codornaSelecionada={codornaSelecionada} xp={xp} xpAnimando={xpAnimando} />
      
      <div className="flex-1 flex overflow-hidden">
        <TrilhasSidebar 
          missoesConcluidas={missoesConcluidas}
          currentTrilhaSlug={trilha.slug}
          currentMissaoSlug={missao.slug}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            {/* Editor Central */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#0A1A2F]">
              <div className="p-4 border-b border-sui-blue/25 bg-move-navy flex-shrink-0">
                <h2 className="text-sm font-bold text-sui-blue uppercase tracking-wider">
                  {lang === "pt" ? "Seu Código" : lang === "en" ? "Your Code" : "Tu Código"}
                </h2>
              </div>
              <div className="flex-1 p-4 overflow-hidden min-h-0">
                <div className="h-full">
                  <MoveEditor
                    value={codigo}
                    onChange={(newCode) => {
                      setCodigo(newCode || "");
                      setStatusExecucao("idle");
                    }}
                    height="100%"
                  />
                </div>
              </div>
            </div>
            
            <ObjetivoPanel 
              missao={missao}
              isCollapsed={objetivoCollapsed}
              onToggle={() => setObjetivoCollapsed(!objetivoCollapsed)}
            />
          </div>
          
          <ActionBar
            onRun={handleRun}
            onClear={handleClear}
            onMostrarSolucao={missao.codigoSolucao ? handleMostrarSolucao : undefined}
            status={statusExecucao}
            disabled={false}
          />
          
          <ConsolePanel
            output={consoleOutput}
            isOpen={consoleOpen}
            onToggle={() => setConsoleOpen(!consoleOpen)}
            onClear={() => setConsoleOutput([])}
          />
        </div>
      </div>

      {/* Modal de Sucesso */}
      {mostrarModalSucesso && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-move-navy to-[#0A1A2F] border-2 border-sui-blue rounded-lg p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold text-sui-blue mb-2">
                {lang === "pt" ? "Missão Concluída!" : lang === "en" ? "Mission Complete!" : "¡Misión Completada!"}
              </h2>
              <p className="text-[#CBD5F5] mb-4">
                {lang === "pt" 
                  ? `Você ganhou ${missao.xpRecompensa} XP!` 
                  : lang === "en"
                  ? `You earned ${missao.xpRecompensa} XP!`
                  : `¡Ganaste ${missao.xpRecompensa} XP!`}
              </p>
              {missao.badgeRecompensa && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-2xl">{missao.badgeRecompensa.icone}</span>
                  <span className="text-move-green font-semibold">{missao.badgeRecompensa.nome}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {(() => {
                const proximaMissao = trilha.missoes.find((m) => m.numero === missao.numero + 1);
                if (proximaMissao) {
                  return (
                    <button
                      onClick={() => {
                        setMostrarModalSucesso(false);
                        playSound("click");
                        router.push(`/trilhas/${trilha.slug}/${proximaMissao.slug}`);
                      }}
                      className="w-full px-6 py-3 bg-gradient-sui-move text-[#020617] font-bold rounded-lg hover:opacity-90 transition-opacity hover:scale-105 active:scale-95"
                    >
                      {lang === "pt" ? "➡️ Próxima Missão" : lang === "en" ? "➡️ Next Mission" : "➡️ Siguiente Misión"}
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={() => {
                        setMostrarModalSucesso(false);
                        playSound("click");
                        router.push(`/trilhas/${trilha.slug}`);
                      }}
                      className="w-full px-6 py-3 bg-gradient-sui-move text-[#020617] font-bold rounded-lg hover:opacity-90 transition-opacity hover:scale-105 active:scale-95"
                    >
                      {lang === "pt" ? "📋 Ver Trilha" : lang === "en" ? "📋 View Track" : "📋 Ver Trilha"}
                    </button>
                  );
                }
              })()}
              
              <button
                onClick={() => {
                  setMostrarModalSucesso(false);
                  playSound("click");
                }}
                className="w-full px-6 py-3 bg-sui-blue/20 hover:bg-sui-blue/30 border border-sui-blue/50 text-sui-blue font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                {lang === "pt" ? "✏️ Continuar Editando" : lang === "en" ? "✏️ Keep Editing" : "✏️ Seguir Editando"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Solução */}
      {mostrarModalSolucao && missao.codigoSolucao && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-move-navy to-[#0A1A2F] border-2 border-move-green rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header do Modal */}
            <div className="p-4 border-b border-move-green/25 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-move-green mb-1">
                  {lang === "pt" ? "💡 Solução Completa" : lang === "en" ? "💡 Complete Solution" : "💡 Solución Completa"}
                </h2>
                <p className="text-sm text-[#CBD5F5]">
                  {lang === "pt" 
                    ? "Analise a solução e copie se necessário" 
                    : lang === "en"
                    ? "Analyze the solution and copy if needed"
                    : "Analiza la solución y copia si es necesario"}
                </p>
              </div>
              <button
                onClick={() => {
                  setMostrarModalSolucao(false);
                  playSound("click");
                }}
                className="text-[#CBD5F5] hover:text-sui-blue transition-colors text-2xl"
                aria-label={lang === "pt" ? "Fechar" : lang === "en" ? "Close" : "Cerrar"}
              >
                ×
              </button>
            </div>

            {/* Conteúdo do Modal - Editor com Solução */}
            <div className="flex-1 overflow-hidden p-4 min-h-0" style={{ minHeight: "500px", maxHeight: "calc(90vh - 200px)" }}>
              <div className="w-full h-full border border-sui-blue/25 rounded-lg overflow-hidden bg-[#020617]" style={{ height: "100%" }}>
                {missao.codigoSolucao ? (
                  <MoveEditor 
                    value={missao.codigoSolucao} 
                    readOnly={true} 
                    height="600px"
                  />
                ) : (
                  <div className="p-4 text-[#CBD5F5]">
                    {lang === "pt" ? "Solução não disponível" : lang === "en" ? "Solution not available" : "Solución no disponible"}
                  </div>
                )}
              </div>
            </div>

            {/* Footer do Modal - Botões */}
            <div className="p-4 border-t border-move-green/25 flex gap-3 flex-shrink-0">
              <button
                onClick={handleCopiarSolucao}
                className="flex-1 px-6 py-3 bg-gradient-sui-move text-[#020617] font-bold rounded-lg hover:opacity-90 transition-opacity hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>📋</span>
                <span>{lang === "pt" ? "Copiar Solução" : lang === "en" ? "Copy Solution" : "Copiar Solución"}</span>
              </button>
              <button
                onClick={() => {
                  setMostrarModalSolucao(false);
                  playSound("click");
                }}
                className="px-6 py-3 bg-sui-blue/20 hover:bg-sui-blue/30 border border-sui-blue/50 text-sui-blue font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                {lang === "pt" ? "Fechar" : lang === "en" ? "Close" : "Cerrar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Erro */}
      {mostrarModalErro && erroDetalhes && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#2A1A1A] to-[#0A1A2F] border-2 border-red-500/50 rounded-lg max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Header do Modal */}
            <div className="p-4 border-b border-red-500/25 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-red-400 mb-1">
                    {erroDetalhes.titulo}
                  </h2>
                  <p className="text-sm text-[#CBD5F5]">
                    {lang === "pt" 
                      ? "Não se preocupe! Erros fazem parte do aprendizado." 
                      : lang === "en"
                      ? "Don't worry! Errors are part of learning."
                      : "¡No te preocupes! Los errores son parte del aprendizaje."}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMostrarModalErro(false);
                  playSound("click");
                }}
                className="text-[#CBD5F5] hover:text-red-400 transition-colors text-2xl"
                aria-label={lang === "pt" ? "Fechar" : lang === "en" ? "Close" : "Cerrar"}
              >
                ×
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-4">
              {/* Mensagem de Erro */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-[#E5E7EB] text-sm leading-relaxed">
                  {erroDetalhes.mensagem}
                </p>
              </div>

              {/* Dicas para Iniciantes */}
              <div className="bg-sui-blue/10 border border-sui-blue/30 rounded-lg p-4">
                <h3 className="text-sm font-bold text-sui-blue mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>{lang === "pt" ? "Dicas para Resolver:" : lang === "en" ? "Tips to Fix:" : "Consejos para Resolver:"}</span>
                </h3>
                <ul className="text-sm text-[#CBD5F5] space-y-1.5 ml-6 list-disc">
                  <li>{lang === "pt" ? "Verifique se você implementou todas as funções solicitadas" : lang === "en" ? "Check if you implemented all requested functions" : "Verifica si implementaste todas las funciones solicitadas"}</li>
                  <li>{lang === "pt" ? "Leia novamente as instruções no painel à direita" : lang === "en" ? "Read the instructions in the right panel again" : "Lee nuevamente las instrucciones en el panel derecho"}</li>
                  <li>{lang === "pt" ? "Use o botão 'Solução' se precisar de ajuda" : lang === "en" ? "Use the 'Solution' button if you need help" : "Usa el botón 'Solución' si necesitas ayuda"}</li>
                </ul>
              </div>

              {/* Exemplo de Erro no Console */}
              {erroDetalhes.linha && (
                <div className="bg-[#020617] border border-red-500/25 rounded-lg p-3">
                  <p className="text-xs text-red-400 mb-2 font-mono">
                    {lang === "pt" ? "Erro encontrado na linha:" : lang === "en" ? "Error found at line:" : "Error encontrado en la línea:"} {erroDetalhes.linha}
                  </p>
                  <div className="bg-[#0A1A2F] rounded p-2 font-mono text-xs text-[#CBD5F5] overflow-x-auto">
                    <pre className="whitespace-pre-wrap">
{`Error:
  ┌─ ${missao.slug}.move:${erroDetalhes.linha}:7
  │
${erroDetalhes.linha} │     // Seu código aqui
  │     ^^^^^^^^^^^^^^^^
  │
  = Missing implementation
  = Hint: Você precisa implementar a função main()`}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer do Modal - Botões */}
            <div className="p-4 border-t border-red-500/25 flex gap-3 flex-shrink-0">
              {missao.codigoSolucao && (
                <button
                  onClick={() => {
                    setMostrarModalErro(false);
                    setMostrarModalSolucao(true);
                    playSound("click");
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-move-green/20 to-sui-blue/20 hover:from-move-green/30 hover:to-sui-blue/30 border border-move-green/50 text-move-green font-semibold rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>💡</span>
                  <span>{lang === "pt" ? "Ver Solução" : lang === "en" ? "View Solution" : "Ver Solución"}</span>
                </button>
              )}
              <button
                onClick={() => {
                  setMostrarModalErro(false);
                  playSound("click");
                }}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-semibold rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                {lang === "pt" ? "Tentar Novamente" : lang === "en" ? "Try Again" : "Intentar de Nuevo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
