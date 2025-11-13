# 🌊 MoveAcademy

**Aprenda Move com trilhas guiadas, desafios reais e execução de código — inspirado no ecossistema Sui**

O **MoveAcademy** é uma plataforma educacional completa para desenvolvedores que desejam aprender e dominar a linguagem **Move**, usada em blockchains como **Sui**.

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

- ✅ Landing page finalizada com suporte a 3 idiomas (PT/EN/ES)
- ✅ Identidade visual completa (paleta oficial, logo, UI Kit)
- ✅ Estrutura de documentação criada
- ✅ Design system documentado
- 🚧 Preparação para migração para Next.js 14

---

## 📁 Estrutura do Projeto

```
/
├── index.html                    # Landing page atual (estática)
├── README.md                     # Este arquivo
├── public/
│   └── logo-moveacademy.svg     # Logo oficial
├── docs/
│   ├── branding/
│   │   ├── MOVEACADEMY-BRANDING.md  # Identidade visual completa
│   │   └── logo.svg                  # Logo SVG
│   ├── ui/
│   │   └── UI-KIT.md                 # Componentes e padrões de UI
│   └── project/
│       ├── VISION.md                 # Visão do projeto
│       ├── TECH-STACK.md             # Stack tecnológica
│       └── TODO.md                   # Tarefas e roadmap
└── moveacademy_docs/            # Documentação adicional
```

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

### Fase 1 — App Base
- [ ] Migrar para Next.js 14 (App Router)
- [ ] Configurar TailwindCSS com paleta oficial
- [ ] Criar layout principal (Navbar + Footer)
- [ ] Implementar sistema de i18n (PT/EN/ES)

### Fase 2 — Trilhas e Cursos
- [ ] CRUD de trilhas e aulas
- [ ] Sistema de progresso por usuário
- [ ] Templates de aula interativos
- [ ] Navegação entre aulas

### Fase 3 — Editor de Código Move
- [ ] Integrar Monaco Editor
- [ ] Destaque de sintaxe Move customizado
- [ ] Tema do editor (MoveAcademy dark)
- [ ] Execução via backend (VPS necessário)

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

### Landing Page Atual (HTML estático)

A landing page atual é um arquivo HTML estático que pode ser aberto diretamente no navegador ou servido com qualquer servidor HTTP simples:

```bash
# Com Python
python -m http.server 8000

# Com Node.js (http-server)
npx http-server

# Com PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

### Futuro (Next.js)

Quando migrar para Next.js:

```bash
npm install
npm run dev
```

Acesse: `http://localhost:3000`

---

## 🏗️ Infraestrutura

### Atual
- ✅ **Frontend:** HTML/CSS/JS estático
- ✅ **Hosting:** Vercel/Netlify (deploy automático via Git)

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
- [`docs/branding/MOVEACADEMY-BRANDING.md`](docs/branding/MOVEACADEMY-BRANDING.md) - Guia de identidade visual
- [`docs/ui/UI-KIT.md`](docs/ui/UI-KIT.md) - Componentes e padrões de UI

---

## 📬 Sobre

Projeto criado para ajudar builders a dominar a linguagem **Move** e construir no ecossistema **Sui**.

**MoveAcademy** · Learn. Build. Deploy.

---

## 📄 Licença

Este projeto está em desenvolvimento ativo.
