# 📁 Estrutura do Projeto MoveAcademy

## 📂 Organização de Diretórios

```
moveacademy-site/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout raiz da aplicação
│   ├── page.tsx                 # Página inicial (seleção de personagem)
│   ├── not-found.tsx            # Página 404 customizada
│   ├── globals.css              # Estilos globais e tema Phantasy Star
│   └── trilhas/                 # Rotas de trilhas
│       ├── page.tsx             # Lista de todas as trilhas (Mapa de Moviara)
│       └── [slug]/              # Trilha específica
│           ├── page.tsx         # Detalhes da trilha (lista de missões)
│           └── [missao]/        # Missão específica
│               └── page.tsx     # Página da missão (editor + instruções)
│
├── components/                   # Componentes React reutilizáveis
│   ├── guerreiro/               # Componentes do sistema gamificado
│   │   ├── MissaoCard.tsx      # Card de missão (usado na lista)
│   │   └── MapaTrilha.tsx      # Visualização do mapa de progresso
│   ├── MoveEditor.tsx           # Editor de código Move (Monaco Editor)
│   └── providers/               # Providers de contexto
│       └── LanguageProviderWrapper.tsx
│
├── contexts/                     # Contextos React
│   └── LanguageContext.tsx     # Contexto de idioma (PT/EN/ES)
│
├── lib/                          # Bibliotecas e utilitários
│   ├── data/                    # Dados estáticos
│   │   └── trilhas-guerreiro.ts # Dados de todas as trilhas e missões
│   ├── types/                   # Definições de tipos TypeScript
│   │   └── guerreiro.ts        # Tipos do sistema gamificado
│   └── monaco-moveacademy-theme.ts # Tema customizado do Monaco Editor
│
├── public/                       # Arquivos estáticos
│   ├── C1.png                  # Imagem do personagem Sir Transfer
│   ├── C2.png                  # Imagem do personagem Sir Entry
│   ├── sui-symbol.svg          # Símbolo da Sui
│   └── logo-moveacademy.svg    # Logo do MoveAcademy
│
├── docs/                         # Documentação do projeto
│   ├── project/                # Documentação técnica
│   │   ├── CONCEITO-GUERREIRO-MOVE.md
│   │   ├── DIFERENCIAL.md
│   │   ├── TECH-STACK.md
│   │   ├── TODO.md
│   │   └── VISION.md
│   ├── branding/               # Documentação de marca
│   │   └── UI-KIT.md
│   └── PROJECT-STRUCTURE.md    # Este arquivo
│
├── MANIFESTO.md                 # Manifesto do projeto
├── README.md                    # Documentação principal
│
├── next.config.mjs             # Configuração do Next.js
├── tailwind.config.ts          # Configuração do Tailwind CSS
├── tsconfig.json               # Configuração do TypeScript
├── package.json                # Dependências do projeto
└── vercel.json                 # Configuração do Vercel
```

## 🎯 Descrição dos Diretórios Principais

### `/app`
Páginas e rotas da aplicação Next.js usando App Router. Cada arquivo `page.tsx` representa uma rota.

### `/components`
Componentes React reutilizáveis organizados por funcionalidade:
- `guerreiro/`: Componentes do sistema gamificado
- `providers/`: Wrappers de contextos para uso em Server Components

### `/contexts`
Contextos React para gerenciamento de estado global (idioma, progresso, etc.)

### `/lib`
Bibliotecas, utilitários e dados:
- `data/`: Dados estáticos (trilhas, missões)
- `types/`: Definições de tipos TypeScript
- Temas e configurações de editores

### `/public`
Arquivos estáticos servidos diretamente (imagens, ícones, etc.)

### `/docs`
Documentação do projeto, incluindo visão, conceitos, UI kit e estrutura.

## 📝 Convenções de Nomenclatura

- **Componentes**: PascalCase (ex: `MissaoCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useLanguage`)
- **Tipos/Interfaces**: PascalCase (ex: `Missao`, `Trilha`)
- **Arquivos de dados**: kebab-case (ex: `trilhas-guerreiro.ts`)
- **Rotas**: kebab-case (ex: `despertar-da-essencia`)

## 🔄 Fluxo de Dados

1. **Dados**: `lib/data/trilhas-guerreiro.ts` → Define todas as trilhas e missões
2. **Tipos**: `lib/types/guerreiro.ts` → Define interfaces TypeScript
3. **Páginas**: `app/trilhas/[slug]/page.tsx` → Consome dados e renderiza
4. **Componentes**: `components/guerreiro/*` → Componentes reutilizáveis
5. **Contexto**: `contexts/LanguageContext.tsx` → Estado global de idioma

## 🎨 Estilos

- **Tailwind CSS**: Classes utilitárias
- **globals.css**: Estilos globais, variáveis CSS e tema Phantasy Star
- **Tema Monaco**: `lib/monaco-moveacademy-theme.ts`

