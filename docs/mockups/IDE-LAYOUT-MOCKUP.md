# 🎨 Mockup: Interface IDE para MoveAcademy

**Inspiração:** [Pontem Playground](https://playground.pontem.network/)  
**Adaptação:** Mantendo gamificação Moviara + Interface profissional tipo IDE

---

## 📐 Layout Visual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [🏠] MoveAcademy  │  [🌍 PT/EN/ES]  │  [👤 Sir Transfer]  │  [⭐ 1250 XP]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────┐  ┌──────────────────────────────────────┐  ┌──────────────┐ │
│  │          │  │                                      │  │              │ │
│  │ TRILHAS  │  │         EDITOR DE CÓDIGO             │  │  OBJETIVO    │ │
│  │          │  │                                      │  │              │ │
│  │ 🪨 Desp. │  │  module 0x1::despertar {            │  │  📋 Missão 1 │ │
│  │   ✓ 1/8  │  │      public fun hello() {          │  │              │ │
│  │          │  │          // seu código aqui         │  │  Crie um     │ │
│  │ 🛡️ Dom.  │  │      }                              │  │  módulo...   │ │
│  │   0/6    │  │  }                                  │  │              │ │
│  │          │  │                                      │  │  💡 Dicas:   │ │
│  │ ⚡ Sui   │  │                                      │  │  - Use 0x1:: │ │
│  │   0/6    │  │                                      │  │  - public fun│ │
│  │          │  │                                      │  │              │ │
│  │ [📁 +]   │  │                                      │  │  [📖 Ver Ex.]│ │
│  │          │  │                                      │  │              │ │
│  └──────────┘  └──────────────────────────────────────┘  └──────────────┘ │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  [▶ Build]  [🧪 Test]  [▶ Run]  [🗑️ Clear]  [💾 Save]  [📤 Export] │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  CONSOLE                                                             │  │
│  ├──────────────────────────────────────────────────────────────────────┤ │
│  │  $ sui move build                                                    │ │
│  │  ✓ Compiling Move modules...                                         │ │
│  │  ✓ Build successful!                                                 │ │
│  │                                                                       │ │
│  │  $ sui move test                                                     │ │
│  │  ✓ Running 1 test                                                    │ │
│  │  ✓ Test passed!                                                      │ │
│  │                                                                       │ │
│  │  🎉 Missão concluída! +150 XP                                        │ │
│  └──────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Estrutura de Componentes

### Header (Top Bar)
```
┌─────────────────────────────────────────────────────────────────┐
│ [🏠 Logo] MoveAcademy │ [🌍 Lang] │ [👤 Codorna] │ [⭐ XP] │ [🎯 Badges] │
└─────────────────────────────────────────────────────────────────┘
```

**Componentes:**
- `Header.tsx` - Barra superior com navegação
- `LanguageSelector.tsx` - Seletor de idioma
- `CodornaCard.tsx` - Card compacto da codorna
- `XPDisplay.tsx` - Display de XP
- `BadgesDisplay.tsx` - Badges conquistados

---

### Painel Esquerdo: Trilhas (Sidebar)
```
┌─────────────────┐
│ 📚 TRILHAS      │
├─────────────────┤
│ 🪨 Despertar    │
│   ✓ 3/8         │
│   [▼]           │
│   ├─ ✓ Missão 1 │
│   ├─ ✓ Missão 2 │
│   ├─ ✓ Missão 3 │
│   ├─ 🔒 Missão 4│
│   └─ ...        │
│                 │
│ 🛡️ Domínio      │
│   0/6           │
│   [▶]           │
│                 │
│ ⚡ Sui Prático   │
│   0/6           │
│   [▶]           │
└─────────────────┘
```

**Componentes:**
- `TrilhasSidebar.tsx` - Lista de trilhas colapsável
- `TrilhaItem.tsx` - Item de trilha com progresso
- `MissaoItem.tsx` - Item de missão (concluída/bloqueada)

**Funcionalidades:**
- Expandir/colapsar trilhas
- Navegação rápida entre missões
- Indicador visual de progresso
- Badge de conclusão

---

### Painel Central: Editor
```
┌─────────────────────────────────────────────┐
│ 📝 Seu Código                    [⚙️] [📋] │
├─────────────────────────────────────────────┤
│                                             │
│  module 0x1::despertar {                   │
│      public fun hello() {                   │
│          // seu código aqui                │
│      }                                      │
│  }                                          │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

**Componentes:**
- `MoveEditor.tsx` - Editor Monaco (já existe, melhorar)
- `EditorToolbar.tsx` - Barra de ferramentas do editor
- `CodeActions.tsx` - Ações rápidas (format, clear, etc.)

**Melhorias:**
- Tabs para múltiplos arquivos (futuro)
- Minimap opcional
- Line numbers
- Syntax highlighting Move customizado

---

### Painel Direito: Objetivo/Instruções
```
┌─────────────────────────┐
│ 📋 OBJETIVO      [📌]   │
├─────────────────────────┤
│                         │
│ Missão 1: Desperte     │
│                         │
│ Crie um módulo Move... │
│                         │
│ 💡 Dicas:               │
│ • Use module 0x1::      │
│ • public fun            │
│                         │
│ 📖 Exemplo:             │
│ [Mostrar/Ocultar]       │
│                         │
│ ⭐ Recompensa:          │
│ +150 XP                 │
│ 🏅 Badge: Iniciante     │
│                         │
└─────────────────────────┘
```

**Componentes:**
- `ObjetivoPanel.tsx` - Painel de objetivo/instruções
- `DicasPanel.tsx` - Dicas contextuais
- `ExemploPanel.tsx` - Exemplo de código (colapsável)
- `RecompensasPanel.tsx` - XP e badges da missão

**Funcionalidades:**
- Colapsar/expandir seções
- Scroll independente
- Sticky header
- Markdown rendering

---

### Barra de Ações (Action Bar)
```
┌──────────────────────────────────────────────────────────────┐
│ [▶ Build] [🧪 Test] [▶ Run] [🗑️ Clear] [💾 Save] [📤 Export]│
└──────────────────────────────────────────────────────────────┘
```

**Componentes:**
- `ActionBar.tsx` - Barra de ações principais
- `ActionButton.tsx` - Botão de ação com ícone

**Ações:**
- **Build** (CTRL+B): Compilar código
- **Test** (CTRL+T): Executar testes
- **Run** (CTRL+R): Executar código
- **Clear** (CTRL+L): Limpar editor
- **Save** (CTRL+S): Salvar código localmente
- **Export** (CTRL+E): Exportar código

**Estados:**
- Idle: Botões habilitados
- Compilando: Spinner + "Compilando..."
- Executando: Spinner + "Executando..."
- Sucesso: ✓ Verde + feedback
- Erro: ✗ Vermelho + mensagem

---

### Console (Bottom Panel)
```
┌──────────────────────────────────────────────────────────────┐
│ CONSOLE                                    [🗑️] [📋] [⬇️] [⬆️]│
├──────────────────────────────────────────────────────────────┤
│ $ sui move build                                             │
│ ✓ Compiling Move modules...                                 │
│   Building module 0x1::despertar                            │
│ ✓ Build successful!                                          │
│                                                              │
│ $ sui move test                                              │
│ ✓ Running 1 test                                             │
│   Test: test_hello                                           │
│ ✓ Test passed!                                               │
│                                                              │
│ 🎉 Missão concluída! +150 XP                                 │
│ ✅ Badge desbloqueado: Iniciante                             │
└──────────────────────────────────────────────────────────────┘
```

**Componentes:**
- `ConsolePanel.tsx` - Painel de console
- `ConsoleOutput.tsx` - Output do console
- `ConsoleToolbar.tsx` - Ferramentas (clear, copy, scroll)

**Funcionalidades:**
- Terminal-style output
- Syntax highlighting (erros em vermelho, sucesso em verde)
- Auto-scroll para última linha
- Copiar output
- Limpar console
- Histórico de comandos (futuro)

---

## 📱 Layout Responsivo

### Desktop (>1024px)
```
┌──────┬──────────────────────┬──────────┐
│      │                      │          │
│ Side │      Editor          │ Objetivo │
│ bar  │                      │          │
│      │                      │          │
├──────┴──────────────────────┴──────────┤
│         Action Bar                     │
├────────────────────────────────────────┤
│         Console                        │
└────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────┬──────────────────────┐
│      │                      │
│ Side │      Editor          │
│ bar  │                      │
│      │                      │
├──────┴──────────────────────┤
│      Action Bar              │
├──────────────────────────────┤
│      Console                 │
├──────────────────────────────┤
│      Objetivo (colapsável)   │
└──────────────────────────────┘
```

### Mobile (<768px)
```
┌──────────────────────────────┐
│ [☰] Menu  [🌍] Lang  [⭐] XP │
├──────────────────────────────┤
│                              │
│      Editor                │
│                              │
├──────────────────────────────┤
│ [▶ Build] [🧪 Test] [▶ Run] │
├──────────────────────────────┤
│      Console                 │
│      (colapsável)            │
├──────────────────────────────┤
│      Objetivo                │
│      (colapsável)            │
└──────────────────────────────┘
```

**Menu Mobile:**
- Hamburger menu para trilhas
- Tabs para alternar entre Editor/Console/Objetivo
- Painéis colapsáveis

---

## 🎨 Tema Visual (Mantendo Moviara)

### Cores
- **Background principal:** `#0A1A2F` (Sui Dark Blue)
- **Painéis:** `#0F233E` (Move Deep Navy)
- **Bordas:** `rgba(106, 215, 229, 0.25)` (Sui Blue)
- **Editor:** Tema dark customizado
- **Console:** Background `#020617` com texto `#E5E7EB`

### Efeitos
- **Glow:** Bordas com glow sutil (Sui Blue)
- **Hover:** Transições suaves
- **Focus:** Outline com Sui Blue
- **Active:** Background mais claro

### Tipografia
- **Headers:** Font bold, uppercase, tracking wider
- **Código:** JetBrains Mono
- **Texto:** Inter ou system font

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `CTRL+B` | Build |
| `CTRL+T` | Test |
| `CTRL+R` | Run |
| `CTRL+L` | Clear editor |
| `CTRL+S` | Save code |
| `CTRL+E` | Export code |
| `CTRL+Enter` | Run (alternativo) |
| `CTRL+/` | Toggle comment |
| `CTRL+0` | Toggle console |
| `CTRL+1` | Focus editor |
| `CTRL+2` | Focus console |
| `ESC` | Close panels |

---

## 🔄 Fluxo de Uso

### 1. Usuário acessa missão
```
Trilhas Sidebar → Clica em missão → Carrega editor com template
```

### 2. Usuário escreve código
```
Editor → Digita código → Auto-save (opcional)
```

### 3. Usuário executa
```
Clica "Run" ou CTRL+R → 
  → Mostra "Compilando..." na Action Bar
  → Console mostra logs
  → Se sucesso: +XP, badge, próxima missão
  → Se erro: mostra erro no console e editor
```

### 4. Usuário completa missão
```
Missão concluída → 
  → Animação de XP
  → Badge desbloqueado
  → Próxima missão desbloqueada
  → Opção de avançar
```

---

## 📦 Estrutura de Arquivos Proposta

```
components/
├── ide/
│   ├── IDEHeader.tsx          # Header com navegação
│   ├── IDELayout.tsx          # Layout principal (grid)
│   ├── TrilhasSidebar.tsx     # Painel esquerdo
│   ├── EditorPanel.tsx        # Painel central (editor)
│   ├── ObjetivoPanel.tsx      # Painel direito
│   ├── ActionBar.tsx          # Barra de ações
│   └── ConsolePanel.tsx       # Console inferior
├── editor/
│   ├── MoveEditor.tsx         # Editor Monaco (melhorado)
│   ├── EditorToolbar.tsx      # Toolbar do editor
│   └── CodeActions.tsx        # Ações do código
└── guerreiro/                 # Componentes gamificados (mantém)
    └── ...
```

---

## 🚀 Implementação em Fases

### Fase 1: Layout Base ✅
- [ ] Criar `IDELayout.tsx` com grid responsivo
- [ ] Implementar painéis colapsáveis
- [ ] Adicionar header com navegação

### Fase 2: Componentes Principais ✅
- [ ] `TrilhasSidebar.tsx` com navegação
- [ ] `EditorPanel.tsx` melhorado
- [ ] `ObjetivoPanel.tsx` com markdown
- [ ] `ConsolePanel.tsx` básico

### Fase 3: Ações e Atalhos ✅
- [ ] `ActionBar.tsx` com botões
- [ ] Separar Build/Test/Run
- [ ] Implementar atalhos de teclado
- [ ] Estados de loading/sucesso/erro

### Fase 4: Console Avançado ✅
- [ ] Terminal-style output
- [ ] Syntax highlighting
- [ ] Auto-scroll
- [ ] Copiar output

### Fase 5: Melhorias UX ✅
- [ ] Auto-save código
- [ ] Histórico de execuções
- [ ] Animações de transição
- [ ] Tooltips e ajuda contextual

---

## 🎮 Mantendo a Gamificação

### Elementos Mantidos
- ✅ Card da codorna no header
- ✅ Display de XP no header
- ✅ Badges conquistados
- ✅ Progresso nas trilhas
- ✅ Animações de XP
- ✅ Tema visual Moviara

### Integração com IDE
- Header mostra codorna + XP
- Sidebar mostra progresso das trilhas
- Console mostra recompensas ao completar
- Animações mantêm o tema gamificado

---

## 📊 Comparação Visual

### Antes (Atual)
```
┌─────────────────────────────────────┐
│ Header simples                      │
├─────────────────────────────────────┤
│ Card Codorna                        │
├─────────────────────────────────────┤
│ Objetivo                            │
├─────────────────────────────────────┤
│ Instruções (markdown)               │
├─────────────────────────────────────┤
│ Exemplo                             │
├─────────────────────────────────────┤
│ Editor                              │
├─────────────────────────────────────┤
│ [▶ Executar código]                 │
├─────────────────────────────────────┤
│ Feedback básico                     │
└─────────────────────────────────────┘
```

### Depois (IDE Layout)
```
┌─────────────────────────────────────────────────────────┐
│ Header completo (Logo, Lang, Codorna, XP, Badges)       │
├──────┬──────────────────────────────┬───────────────────┤
│ Tril │ Editor (grande, focado)      │ Objetivo          │
│ has  │                              │ (colapsável)      │
│      │                              │                   │
├──────┴──────────────────────────────┴───────────────────┤
│ [Build] [Test] [Run] [Clear] [Save] [Export]            │
├─────────────────────────────────────────────────────────┤
│ Console (terminal-style, detalhado)                     │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Vantagens do Novo Layout

1. **Mais profissional** - Interface familiar para desenvolvedores
2. **Melhor organização** - Informações bem separadas
3. **Mais espaço para código** - Editor maior e mais focado
4. **Feedback melhor** - Console dedicado com mais detalhes
5. **Navegação rápida** - Sidebar para acessar missões facilmente
6. **Mantém gamificação** - Todos os elementos Moviara preservados
7. **Responsivo** - Funciona bem em todos os dispositivos

---

**Última atualização:** 2024-11-13  
**Status:** Mockup conceitual - Pronto para implementação

