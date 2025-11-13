// lib/types/guerreiro.ts
// Tipos para o sistema gamificado "O Guerreiro(a) do Move"

export type Idioma = "pt" | "en" | "es";

export interface Hero {
  nome: string;
  nivel: number;
  xp: number;
  xpProximoNivel: number;
  badges: Badge[];
  atributos: {
    forca: number; // Baseado em funções escritas
    sabedoria: number; // Baseado em conceitos aprendidos
    destreza: number; // Baseado em código executado com sucesso
  };
  structHero?: string; // Código Move da struct Hero criada pelo aluno
}

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  dataConquista?: Date;
}

export interface Missao {
  id: string;
  slug: string;
  numero: number;
  icone: string;
  titulo: string;
  descricao: string;
  lore: string; // Texto narrativo da missão
  conteudo: string; // Markdown com explicação técnica
  codigoInicial?: string; // Template para começar
  codigoSolucao?: string; // Solução de referência
  dicas?: string[];
  xpRecompensa: number;
  badgeRecompensa?: Badge;
  conceitosAprendidos: string[]; // Lista de conceitos Move ensinados
  preRequisitos?: string[]; // IDs de missões anteriores necessárias
}

export interface Trilha {
  id: string;
  slug: string;
  titulo: {
    pt: string;
    en: string;
    es: string;
  };
  descricao: {
    pt: string;
    en: string;
    es: string;
  };
  lore: {
    pt: string;
    en: string;
    es: string;
  };
  missoes: Missao[];
  xpTotal: number;
  cor: string; // Cor temática da trilha
  icone: string;
}

export interface ProgressoMissao {
  missaoId: string;
  concluida: boolean;
  dataConclusao?: Date;
  tentativas: number;
  codigoSubmetido?: string;
  xpGanha?: number;
  badgeGanha?: Badge;
}

export interface ProgressoTrilha {
  trilhaId: string;
  missoesConcluidas: number;
  totalMissoes: number;
  porcentagem: number;
  xpTotalGanha: number;
  ultimaMissao?: string;
}

