// lib/validation/move-validator.ts
// Sistema de validação baseado em schema para código Move

export interface ValidationSchema {
  moduleName: string; // Nome do módulo esperado (ex: "despertar")
  moduleAddress?: string; // Endereço esperado (ex: "0x1")
  requiredFunctions?: string[]; // Funções obrigatórias (ex: ["main"])
  requiredPatterns?: string[]; // Padrões que devem existir (ex: ["debug::print"])
  requiredStructs?: string[]; // Structs obrigatórias (ex: ["Hero"])
  syntaxChecks?: boolean; // Se deve verificar sintaxe básica
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Remove comentários do código Move
 */
function removeComments(code: string): string {
  // Remove comentários de linha (// ...)
  let cleaned = code.replace(/\/\/.*$/gm, "");
  // Remove comentários de bloco (/* ... */)
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, "");
  return cleaned;
}

/**
 * Verifica se parênteses, chaves e colchetes estão balanceados
 */
function checkBalancedBrackets(code: string): boolean {
  const stack: string[] = [];
  const pairs: { [key: string]: string } = {
    "(": ")",
    "{": "}",
    "[": "]",
  };

  for (const char of code) {
    if (char in pairs) {
      stack.push(char);
    } else if (Object.values(pairs).includes(char)) {
      if (stack.length === 0) return false;
      const last = stack.pop()!;
      if (pairs[last] !== char) return false;
    }
  }

  return stack.length === 0;
}

/**
 * Verifica se o código contém um módulo válido
 */
function hasValidModule(code: string, expectedName: string, expectedAddress?: string): boolean {
  const moduleRegex = /module\s+(\S+)::(\S+)\s*\{/;
  const match = code.match(moduleRegex);
  
  if (!match) return false;
  
  const address = match[1];
  const name = match[2];
  
  if (expectedAddress && address !== expectedAddress) return false;
  if (name !== expectedName) return false;
  
  return true;
}

/**
 * Verifica se uma função existe no código
 */
function hasFunction(code: string, functionName: string): boolean {
  // Remove comentários para busca mais precisa
  const cleaned = removeComments(code);
  // Busca por função pública ou privada
  const functionRegex = new RegExp(
    `(public\\s+)?fun\\s+${functionName}\\s*\\(`,
    "i"
  );
  return functionRegex.test(cleaned);
}

/**
 * Verifica se um padrão existe no código
 */
function hasPattern(code: string, pattern: string): boolean {
  const cleaned = removeComments(code);
  return cleaned.includes(pattern);
}

/**
 * Verifica se uma struct existe no código
 */
function hasStruct(code: string, structName: string): boolean {
  const cleaned = removeComments(code);
  const structRegex = new RegExp(`struct\\s+${structName}\\s+`, "i");
  return structRegex.test(cleaned);
}

/**
 * Valida código Move baseado em um schema
 */
export function validateMoveCode(
  code: string,
  schema: ValidationSchema
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Remove comentários para validação
  const cleanedCode = removeComments(code);

  // 1. Verificar sintaxe básica (parênteses, chaves balanceados)
  if (schema.syntaxChecks !== false) {
    if (!checkBalancedBrackets(code)) {
      errors.push("Sintaxe inválida: parênteses, chaves ou colchetes não balanceados");
    }
  }

  // 2. Verificar módulo
  if (!hasValidModule(code, schema.moduleName, schema.moduleAddress)) {
    const expected = schema.moduleAddress
      ? `${schema.moduleAddress}::${schema.moduleName}`
      : `::${schema.moduleName}`;
    errors.push(
      `Módulo não encontrado ou incorreto. Esperado: module ${expected}`
    );
  }

  // 3. Verificar funções obrigatórias
  if (schema.requiredFunctions) {
    for (const funcName of schema.requiredFunctions) {
      if (!hasFunction(code, funcName)) {
        errors.push(`Função obrigatória não encontrada: ${funcName}()`);
      }
    }
  }

  // 4. Verificar padrões obrigatórios
  if (schema.requiredPatterns) {
    for (const pattern of schema.requiredPatterns) {
      if (!hasPattern(code, pattern)) {
        errors.push(`Padrão obrigatório não encontrado: ${pattern}`);
      }
    }
  }

  // 5. Verificar structs obrigatórias
  if (schema.requiredStructs) {
    for (const structName of schema.requiredStructs) {
      if (!hasStruct(code, structName)) {
        errors.push(`Struct obrigatória não encontrada: ${structName}`);
      }
    }
  }

  // Verificar se o código não está vazio (após remover comentários)
  if (cleanedCode.trim().length < 20) {
    warnings.push("Código muito curto. Certifique-se de implementar todas as funcionalidades.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Schemas de validação para cada missão
 */
export const missionSchemas: { [missionId: string]: ValidationSchema } = {
  "missao-01": {
    moduleName: "despertar",
    moduleAddress: "0x1",
    requiredFunctions: ["main"],
    requiredPatterns: ["debug::print"],
    syntaxChecks: true,
  },
  "missao-02": {
    moduleName: "nomeie_se",
    moduleAddress: "0x1",
    requiredFunctions: ["main"],
    requiredPatterns: ["debug::print"],
    syntaxChecks: true,
  },
  "missao-03": {
    moduleName: "origem",
    moduleAddress: "0x1",
    requiredFunctions: ["main"],
    requiredPatterns: ["debug::print"],
    syntaxChecks: true,
  },
  "missao-04": {
    moduleName: "hero",
    moduleAddress: "0x1",
    requiredStructs: ["Hero"],
    requiredFunctions: ["criar"],
    syntaxChecks: true,
  },
  "missao-05": {
    moduleName: "defesa",
    moduleAddress: "0x1",
    requiredStructs: ["Hero"],
    requiredFunctions: ["criar", "defenda"],
    syntaxChecks: true,
  },
  "missao-06": {
    moduleName: "mana",
    moduleAddress: "0x1",
    requiredStructs: ["Hero"],
    requiredFunctions: ["criar", "regenerar_mana"],
    syntaxChecks: true,
  },
  "missao-07": {
    moduleName: "hero_nft",
    moduleAddress: "0x1",
    requiredStructs: ["HeroNFT"],
    requiredFunctions: ["criar"],
    requiredPatterns: ["has key", "UID"],
    syntaxChecks: true,
  },
  "missao-08": {
    moduleName: "caminho",
    moduleAddress: "0x1",
    requiredStructs: ["Hero"],
    requiredFunctions: ["escolher_caminho", "obter_nome_caminho"],
    requiredPatterns: ["if"],
    syntaxChecks: true,
  },
  "missao-09": {
    moduleName: "ownership",
    moduleAddress: "0x1",
    requiredStructs: ["Recurso"],
    requiredFunctions: ["criar", "obter_valor"],
    syntaxChecks: true,
  },
  "missao-10": {
    moduleName: "copy_example",
    moduleAddress: "0x1",
    requiredStructs: ["Contador"],
    requiredFunctions: ["duplicar"],
    requiredPatterns: ["has copy"],
    syntaxChecks: true,
  },
  "missao-11": {
    moduleName: "store_example",
    moduleAddress: "0x1",
    requiredStructs: ["Configuracao"],
    requiredPatterns: ["has store"],
    syntaxChecks: true,
  },
  "missao-12": {
    moduleName: "key_example",
    moduleAddress: "0x1",
    requiredStructs: ["ObjetoGlobal"],
    requiredPatterns: ["has key", "UID"],
    syntaxChecks: true,
  },
  "missao-13": {
    moduleName: "drop_example",
    moduleAddress: "0x1",
    requiredStructs: ["Temporario"],
    requiredPatterns: ["has drop"],
    syntaxChecks: true,
  },
  "missao-14": {
    moduleName: "combinado",
    moduleAddress: "0x1",
    requiredStructs: ["RecursoCompleto"],
    requiredPatterns: ["has copy", "has drop", "has store"],
    syntaxChecks: true,
  },
  "missao-15": {
    moduleName: "meu_objeto",
    moduleAddress: "0x1",
    requiredStructs: ["MeuObjeto"],
    requiredFunctions: ["criar"],
    requiredPatterns: ["has key", "UID"],
    syntaxChecks: true,
  },
  "missao-16": {
    moduleName: "transferir",
    moduleAddress: "0x1",
    requiredFunctions: ["transferir_objeto"],
    requiredPatterns: ["transfer::transfer"],
    syntaxChecks: true,
  },
  "missao-17": {
    moduleName: "entry_example",
    moduleAddress: "0x1",
    requiredFunctions: ["acao_publica"],
    requiredPatterns: ["entry"],
    syntaxChecks: true,
  },
  "missao-18": {
    moduleName: "compartilhado",
    moduleAddress: "0x1",
    requiredFunctions: ["compartilhar"],
    requiredPatterns: ["transfer::share_object"],
    syntaxChecks: true,
  },
  "missao-19": {
    moduleName: "congelado",
    moduleAddress: "0x1",
    requiredFunctions: ["congelar"],
    requiredPatterns: ["transfer::freeze_object"],
    syntaxChecks: true,
  },
  "missao-20": {
    moduleName: "sistema_completo",
    moduleAddress: "0x1",
    requiredStructs: ["Sistema"],
    requiredFunctions: ["criar"],
    requiredPatterns: ["has key", "UID"],
    syntaxChecks: true,
  },
};

/**
 * Obtém o schema de validação para uma missão específica
 */
export function getValidationSchema(missionId: string): ValidationSchema | null {
  return missionSchemas[missionId] || null;
}

