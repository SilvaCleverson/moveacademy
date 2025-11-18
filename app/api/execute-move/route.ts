import { NextRequest, NextResponse } from "next/server";

/**
 * API Route para executar código Move
 * 
 * Esta rota recebe código Move do frontend e envia para o backend/VPS
 * que tem Sui CLI instalado para compilar e executar.
 * 
 * Segurança:
 * - Validação básica do código recebido
 * - Rate limiting (implementar depois)
 * - Timeout para evitar execuções infinitas
 */

export const runtime = "nodejs";
export const maxDuration = 30; // 30 segundos máximo

interface ExecuteMoveRequest {
  code: string;
  missionId?: string;
  action: "build" | "test" | "run";
}

export async function POST(request: NextRequest) {
  try {
    const body: ExecuteMoveRequest = await request.json();
    const { code, missionId, action = "build" } = body;

    // Validação básica
    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json(
        { error: "Código não fornecido ou inválido" },
        { status: 400 }
      );
    }

    // Limite de tamanho do código (prevenir abuse)
    if (code.length > 50000) {
      return NextResponse.json(
        { error: "Código muito grande. Limite: 50KB" },
        { status: 400 }
      );
    }

    // Verifica se há variável de ambiente com URL do backend
    const BACKEND_URL = process.env.MOVE_EXECUTOR_URL;
    
    if (!BACKEND_URL) {
      // Modo desenvolvimento: retorna simulação
      console.warn("⚠️ MOVE_EXECUTOR_URL não configurado. Usando modo simulação.");
      return NextResponse.json({
        success: true,
        output: [
          "$ sui move build",
          "✓ Compiling Move modules...",
          "✓ Build successful!",
          "",
          "$ sui move test",
          "✓ Running tests...",
          "✓ All tests passed!"
        ],
        exitCode: 0,
        mode: "simulation"
      });
    }

    // Chama o backend real
    try {
      const response = await fetch(`${BACKEND_URL}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.MOVE_EXECUTOR_API_KEY || ""}`
        },
        body: JSON.stringify({
          code,
          missionId,
          action,
          timeout: 20 // 20 segundos timeout
        }),
        signal: AbortSignal.timeout(25000) // 25 segundos timeout total
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Erro desconhecido" }));
        return NextResponse.json(
          { error: errorData.error || "Erro ao executar código", status: response.status },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({
        success: true,
        output: data.output || [],
        exitCode: data.exitCode || 0,
        errors: data.errors || [],
        warnings: data.warnings || [],
        mode: "real"
      });

    } catch (error: any) {
      console.error("Erro ao chamar backend:", error);
      
      // Se for timeout ou conexão, retorna erro específico
      if (error.name === "AbortError" || error.message?.includes("timeout")) {
        return NextResponse.json(
          { error: "Timeout: A execução demorou muito. Tente novamente com código mais simples." },
          { status: 504 }
        );
      }

      return NextResponse.json(
        { error: `Erro ao conectar com backend: ${error.message}` },
        { status: 503 }
      );
    }

  } catch (error: any) {
    console.error("Erro na API route:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor", details: error.message },
      { status: 500 }
    );
  }
}

