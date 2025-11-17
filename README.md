# 🌊 MoveAcademy

**Aprenda Move com trilhas guiadas, desafios reais e execução de código — inspirado no ecossistema Sui**

O **MoveAcademy** é uma plataforma educacional completa para desenvolvedores que desejam aprender e dominar a linguagem **Move**, usada em blockchains como **Sui**.

## 🌍 Bem-vindo a Moviara

**Moviara** é o mundo onde sua jornada Move começa. Um universo onde código e magia se encontram, e cada linha que você escreve é um passo em direção ao domínio dos artefatos da blockchain.

Neste mundo, você é um **Guerreiro(a) do Move**, escolhendo entre dois caminhos:
- **Sir Transfer** - A codorna que move objetos, especialista em transferências e ownership
- **Sir Entry** - A codorna que entra em ação, mestre em funções entry e execução

Cada missão é uma aventura, cada trilha um continente a explorar. Aprenda Move enquanto constrói seu herói, ganha XP, desbloqueia badges e se torna um verdadeiro mestre de Moviara.

> *"Num mundo onde o código rege os contratos do destino, uma nova alma desperta. Para dominar os artefatos da blockchain, ela precisa aprender a linguagem dos criadores: Move."*

---

## 🎯 Objetivo

Criar a **melhor plataforma de aprendizado Move em PT/EN/ES**, oferecendo:

- ✅ Trilhas interativas organizadas por nível (Iniciante → Avançado)
- ✅ Editor de código integrado com realce de sintaxe Move
- ✅ Execução real de código via backend (sui move test/build)
- ✅ Desafios práticos com correção automática
- ✅ Sistema de progresso e conquistas
- ✅ Identidade visual inspirada no ecossistema Sui
- ✅ Suporte multilíngue (Português, English, Español)

---

## 🚧 Status Atual

- ✅ Next.js 14 com App Router configurado
- ✅ Sistema gamificado "O Guerreiro(a) do Move" implementado
- ✅ Landing page com seleção de personagem (Sir Transfer / Sir Entry) - carrossel estilo Golden Axe
- ✅ Sistema de trilhas e missões com progresso
- ✅ Layout IDE completo (Sidebar, Console, ActionBar, ObjetivoPanel)
- ✅ Editor de código Move integrado (Monaco Editor)
- ✅ Suporte multilíngue (PT/EN/ES) com Context API
- ✅ Identidade visual Phantasy Star inspirada em Sui
- ✅ Sistema de XP e progresso salvo em localStorage (sem resetar no refresh)
- ✅ Card da codorna selecionada nas páginas com XP e progresso
- ✅ Exemplo de código exibido acima do editor
- ✅ Sistema de execução simulada ("Compilação da Sui")
- ✅ Modais informativos (Solução, Erro, Sucesso)
- ✅ Sistema de áudio com howler.js (efeitos sonoros)
- ✅ Botões simplificados para iniciantes (Executar, Solução, Limpar)
- ✅ 3 trilhas completas com missões (20 missões no total)
- 🚧 5 trilhas pendentes (precisam de missões)

---

## 🗺️ Trilhas de Moviara

Explore os 8 continentes de Moviara, cada um com seu próprio desafio e conhecimento:

### ✅ Trilhas Completas

1. **🪨 Despertar da Essência** (8 missões • 1550 XP)
   - Sua jornada começa aqui. Aprenda os fundamentos do Move enquanto constrói seu próprio herói.
   - Conceitos: Módulos, funções, variáveis, tipos, structs, controle de fluxo

2. **🛡️ Domínio da Propriedade** (6 missões • 1000 XP)
   - Domine os conceitos fundamentais de ownership em Move.
   - Conceitos: Ownership, Copy, Store, Key, Drop, abilities combinadas

3. **⚡ Sui Prático** (6 missões • 1300 XP)
   - Aprenda a trabalhar com objetos, transferências e funções entry no Sui.
   - Conceitos: Objetos Sui, transfer, entry functions, compartilhado, congelado

### 🚧 Trilhas em Construção

4. **🪙 Moedas e Tokens** (0 missões • 1800 XP planejado)
   - Crie seu próprio sistema de moedas e tokens no Sui. Aprenda sobre Coin<T> e economia tokenizada.

5. **🎨 NFTs Avançado** (0 missões • 2000 XP planejado)
   - Crie coleções NFT complexas com metadados, royalties e marketplaces no Sui.

6. **💎 DeFi e Finanças** (0 missões • 2500 XP planejado)
   - Construa protocolos DeFi: DEX, staking, lending e yield farming no Sui.

7. **🎮 Gaming e Metaverso** (0 missões • 2200 XP planejado)
   - Crie jogos Web3, sistemas de recompensas e experiências imersivas no Sui.

8. **👑 Caminho do Mestre** (0 missões • 3000 XP planejado)
   - Torne-se um mestre do Move. Projetos avançados, otimizações e padrões de design profissional.

---

## 📁 Estrutura do Projeto

```
/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Página inicial (seleção de personagem)
│   ├── layout.tsx              # Layout raiz
│   ├── globals.css             # Estilos globais
│   └── trilhas/                # Rotas de trilhas
│       ├── page.tsx            # Mapa de Moviara (todas as trilhas)
│       └── [slug]/            # Trilha específica
│           ├── page.tsx       # Detalhes da trilha
│           └── [missao]/      # Missão específica
│               └── page.tsx   # Editor + instruções
│
├── components/                  # Componentes React
│   ├── guerreiro/              # Componentes gamificados
│   ├── ide/                    # Componentes do layout IDE
│   │   ├── IDEHeader.tsx      # Cabeçalho do IDE
│   │   ├── TrilhasSidebar.tsx # Sidebar de navegação
│   │   ├── ActionBar.tsx      # Barra de ações
│   │   ├── ConsolePanel.tsx   # Painel de console
│   │   └── ObjetivoPanel.tsx  # Painel de objetivos
│   ├── MoveEditor.tsx         # Editor Monaco
│   └── providers/             # Providers de contexto
│
├── contexts/                    # Contextos React
│   ├── LanguageContext.tsx   # Gerenciamento de idioma
│   └── AudioContext.tsx     # Gerenciamento de áudio (howler.js)
│
├── lib/                         # Utilitários e dados
│   ├── data/                   # Dados estáticos
│   ├── types/                  # Tipos TypeScript
│   └── monaco-moveacademy-theme.ts
│
├── public/                      # Arquivos estáticos
│   ├── C1.png, C2.png         # Personagens
│   └── sui-symbol.svg         # Ícones
│
└── docs/                        # Documentação
    ├── project/               # Documentação técnica
    ├── branding/              # Identidade visual
    └── PROJECT-STRUCTURE.md   # Estrutura detalhada
```

📄 Veja [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md) para estrutura completa

---

## 🎨 Identidade Visual

A identidade visual é inspirada diretamente no ecossistema **Sui**, criando uma experiência visual coesa e profissional:

### Paleta de Cores

- **Sui Blue (primária):** `#6AD7E5`
- **Sui Cyan Glow (accent):** `#4BE4C9`
- **Sui Dark Blue (background):** `#0A1A2F`
- **Move Deep Navy (cards):** `#0F233E`
- **Aqua Soft (superfícies):** `#122C4A`
- **Move Neon Green (destaques):** `#3FFE95`
- **Texto principal:** `#E5E7EB`
- **Texto secundário:** `#9CA3AF`

### Documentação

📄 [`docs/branding/MOVEACADEMY-BRANDING.md`](docs/branding/MOVEACADEMY-BRANDING.md) - Guia completo de identidade visual  
📄 [`docs/ui/UI-KIT.md`](docs/ui/UI-KIT.md) - Componentes, botões, cards e padrões de UI

---

## 🧱 Roadmap

### Fase 1 — App Base ✅
- [x] Migrar para Next.js 14 (App Router)
- [x] Configurar TailwindCSS com paleta oficial
- [x] Criar layout principal
- [x] Implementar sistema de i18n (PT/EN/ES)

### Fase 2 — Trilhas e Cursos 🚧
- [x] Estrutura de trilhas e missões
- [x] Sistema de progresso (localStorage)
- [x] Templates de missão interativos
- [x] Navegação entre missões
- [x] 3 trilhas completas: Despertar da Essência (8), Domínio da Propriedade (6), Sui Prático (6)
- [ ] Adicionar missões para: Moedas e Tokens, NFTs Avançado, DeFi, Gaming, Caminho do Mestre

### Fase 3 — Editor de Código Move 🚧
- [x] Integrar Monaco Editor
- [x] Tema do editor (MoveAcademy dark)
- [x] Layout IDE completo (Sidebar, Console, ActionBar, ObjetivoPanel)
- [x] Exemplo de código exibido acima do editor
- [x] Sistema de execução simulada (para demo)
- [x] Modais de ajuda (Solução, Erro, Sucesso)
- [x] Sistema de áudio com efeitos sonoros
- [x] Interface simplificada para iniciantes
- [ ] Destaque de sintaxe Move customizado
- [ ] Execução via backend (VPS necessário)
- [ ] Atalhos de teclado (CTRL+B, CTRL+T, CTRL+R)

### Fase 4 — Autenticação e Perfis
- [ ] Integração com Supabase/Clerk
- [ ] Painel do estudante
- [ ] Histórico de progresso
- [ ] Sistema de conquistas/badges

### Fase 5 — Modo Builder
- [ ] Projetos práticos on-chain
- [ ] Deploy em devnet/testnet
- [ ] Integração com Sui RPC
- [ ] Sistema de recompensas

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 18+ e npm

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar build de produção
npm start
```

Acesse: `http://localhost:3000`

### ⚠️ Importante: Encoding

**SEMPRE** configure o encoding UTF-8 antes de fazer commits:

```bash
# PowerShell
chcp 65001

# Ou use arquivo temporário para mensagens de commit
echo "sua mensagem" > commit_msg.txt
git commit -F commit_msg.txt
```

Veja [`.git-encoding-config.md`](.git-encoding-config.md) para mais detalhes.

---

## 🏗️ Infraestrutura

### Atual
- ✅ **Frontend:** Next.js 14 (App Router)
- ✅ **Estilização:** Tailwind CSS
- ✅ **Editor:** Monaco Editor
- ✅ **Hosting:** Vercel (deploy automático via Git)
  - Produção: [moveacademy.vercel.app](https://moveacademy.vercel.app) (branch `master`)
  - Homologação: [moveacademy-site.vercel.app](https://moveacademy-site.vercel.app) (branch `nextjs`)

### Futuro (quando implementar execução de código)
- 🔄 **Backend:** Node.js/Python para execução de código Move
- 🔄 **VPS:** Necessário para compilar e executar código Move (sui move)
- 🔄 **Banco de dados:** Supabase/PostgreSQL para progresso do usuário
- 🔄 **Autenticação:** Supabase Auth ou Clerk

> **Nota:** A execução de código Move requer ambiente isolado (sandbox) com Sui CLI instalado. Isso será implementado na Fase 3.

---

## 🧠 Contribuindo

Toda ajuda é bem-vinda! O foco principal é:

- ✨ UX limpa e intuitiva
- 🎨 Aparência inspirada no ecossistema Sui
- 📝 Código organizado e documentado
- 🧩 Componentização seguindo o UI Kit
- 🌍 Suporte multilíngue (PT/EN/ES)

### Diretrizes

1. Sempre consulte a documentação em `docs/` antes de criar novos componentes
2. Use a paleta oficial MoveAcademy (nunca invente novas cores)
3. Siga os padrões do UI Kit para componentes
4. Mantenha o código limpo e legível
5. Documente mudanças significativas

---

## 📚 Documentação

- [`docs/project/VISION.md`](docs/project/VISION.md) - Visão completa do projeto
- [`docs/project/TECH-STACK.md`](docs/project/TECH-STACK.md) - Stack tecnológica
- [`docs/project/TODO.md`](docs/project/TODO.md) - Tarefas e roadmap detalhado
- [`docs/project/CONCEITO-GUERREIRO-MOVE.md`](docs/project/CONCEITO-GUERREIRO-MOVE.md) - Conceito gamificado
- [`docs/project/DIFERENCIAL.md`](docs/project/DIFERENCIAL.md) - Diferenciais da plataforma
- [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md) - Estrutura detalhada do projeto
- [`docs/branding/UI-KIT.md`](docs/branding/UI-KIT.md) - Guia de identidade visual
- [`MANIFESTO.md`](MANIFESTO.md) - Manifesto do MoveAcademy
- [`.git-encoding-config.md`](.git-encoding-config.md) - Configuração de encoding para commits

---

## 📬 Sobre

Projeto criado para ajudar builders a dominar a linguagem **Move** e construir no ecossistema **Sui**.

**MoveAcademy** · Learn. Build. Deploy.

---

## 📄 Licença

Este projeto está em desenvolvimento ativo.
