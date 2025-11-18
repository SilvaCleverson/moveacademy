// lib/monaco-moveacademy-theme.ts
// Tema Monaco Editor customizado para MoveAcademy
// Paleta de cores alinhada com a identidade visual MoveAcademy (inspirada na blockchain Sui)

export function registerMoveAcademyTheme(monaco: any) {
  monaco.editor.defineTheme("moveacademy-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      // Texto padrão
      { token: "", foreground: "E5E7EB", background: "020617" },

      // Comentários
      { token: "comment", foreground: "64748B", fontStyle: "italic" },

      // Palavras-chave (fun, module, struct, public, entry, etc.)
      { token: "keyword", foreground: "3FFE95", fontStyle: "bold" }, // Move Neon Green

      // Tipos (u64, address, bool, etc.)
      { token: "type", foreground: "6AD7E5" }, // Sui Blue

      // Strings
      { token: "string", foreground: "A5F3FC" },

      // Números
      { token: "number", foreground: "FBBF24" },

      // Funções (identificadores do tipo nome_função)
      { token: "identifier", foreground: "38BDF8" },

      // Operadores
      { token: "operator", foreground: "E5E7EB" },

      // Pontuação / símbolos
      { token: "delimiter", foreground: "9CA3AF" },
      { token: "delimiter.bracket", foreground: "CBD5F5" },

      // Erros
      { token: "invalid", foreground: "F97373", background: "450A0A" },

      // Annotations / attributes (se você usar)
      { token: "annotation", foreground: "F472B6" },

      // Constantes
      { token: "constant", foreground: "FACC15" },

      // Variáveis mutáveis
      { token: "variable", foreground: "E5E7EB" },

      // Structs / módulos (se tokenizados)
      { token: "class", foreground: "A5B4FC" },
      { token: "namespace", foreground: "4BE4C9" }, // Sui Cyan Glow
    ],
    colors: {
      // Fundo geral do editor
      "editor.background": "#020617", // quase preto com leve azul

      // Texto padrão
      "editor.foreground": "#E5E7EB",

      // Linha atual
      "editor.lineHighlightBackground": "#0B11201A",

      // Número das linhas
      "editorLineNumber.foreground": "#4B5563",
      "editorLineNumber.activeForeground": "#E5E7EB",

      // Seletor / seleção
      "editor.selectionBackground": "#1E293B",
      "editor.inactiveSelectionBackground": "#1F293733",

      // Cursor
      "editorCursor.foreground": "#6AD7E5", // Sui Blue

      // Margin de erros / warnings
      "editorError.foreground": "#F97373",
      "editorWarning.foreground": "#FBBF24",
      "editorInfo.foreground": "#38BDF8",

      // Minimapa (opcional)
      "minimap.background": "#020617",
      "minimapSlider.background": "#0F172A88",

      // Borda do editor (pra combinar com os cards)
      "editor.border": "#0F172A",
    },
  });

  // Define como tema ativo
  monaco.editor.setTheme("moveacademy-dark");
}

