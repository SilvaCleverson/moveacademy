/**
 * Cliente para API de execução de código Move
 * 
 * Esta função substitui a execução simulada pela chamada real à API
 */

export interface ExecuteMoveOptions {
  code: string;
  missionId?: string;
  action?: "build" | "test" | "run";
}

export interface ExecuteMoveResult {
  success: boolean;
  output: string[];
  exitCode: number;
  errors?: string[];
  warnings?: string[];
  mode: "real" | "simulation";
}

/**
 * Executa código Move via API
 */
export async function executeMoveCode(
  options: ExecuteMoveOptions
): Promise<ExecuteMoveResult> {
  const { code, missionId, action = "build" } = options;

  try {
    const response = await fetch("/api/execute-move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        missionId,
        action,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "Erro desconhecido",
      }));

      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }

    const data: ExecuteMoveResult = await response.json();
    return data;
  } catch (error: any) {
    // Se a API não estiver disponível, retorna erro
    throw new Error(
      error.message || "Erro ao executar código. Verifique sua conexão."
    );
  }
}

/**
 * Verifica se o backend está disponível
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    // Tenta uma requisição simples
    const response = await fetch("/api/execute-move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: "module 0x1::test { }",
        action: "build",
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

