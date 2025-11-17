"use client";

import Editor, { OnMount } from "@monaco-editor/react";
import { registerMoveAcademyTheme } from "@/lib/monaco-moveacademy-theme";

interface MoveEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
  readOnly?: boolean;
}

export default function MoveEditor({
  value = "",
  onChange,
  height = "320px",
  readOnly = false,
}: MoveEditorProps) {
  const handleEditorMount: OnMount = (editor, monaco) => {
    // Registra o tema
    registerMoveAcademyTheme(monaco);

    // Aqui depois você registra a linguagem Move, se quiser
    // monaco.languages.register({ id: "move" });
    // monaco.languages.setMonarchTokensProvider("move", moveLanguageDefinition);
  };

  const defaultCode = `module 0x1::hello_move {
    public fun hello() {
        // seu primeiro código Move
    }
}`;

  return (
    <div
      className="code-shell rounded-xl sm:rounded-2xl overflow-hidden border border-sui-blue/25 h-full"
      style={{
        boxShadow: "0 26px 70px rgba(0,0,0,0.75)",
        height: height === "100%" ? "100%" : undefined,
      }}
    >
      <Editor
        height={height === "100%" ? "100%" : height}
        defaultLanguage="move" // futuramente, quando você registrar
        value={value || defaultCode}
        onChange={onChange}
        theme="moveacademy-dark"
        onMount={handleEditorMount}
        options={{
          fontSize: 13, // Menor para mobile
          fontFamily:
            "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          lineNumbers: "on",
          padding: { top: 10, bottom: 10 },
          readOnly: readOnly,
          wordWrap: "on",
          automaticLayout: true,
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
        }}
      />
    </div>
  );
}

