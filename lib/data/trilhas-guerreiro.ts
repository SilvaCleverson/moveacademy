// lib/data/trilhas-guerreiro.ts
// Dados das trilhas gamificadas "O Guerreiro(a) do Move"

import { Trilha } from "@/lib/types/guerreiro";

export const trilhas: Trilha[] = [
  {
    id: "trilha-despertar",
    slug: "despertar-da-essencia",
    titulo: {
      pt: "Despertar da Essência",
      en: "The Awakening of Essence",
      es: "El Despertar de la Esencia",
    },
    descricao: {
      pt: "Sua jornada começa aqui. Aprenda os fundamentos do Move enquanto constrói seu próprio herói.",
      en: "Your journey begins here. Learn Move fundamentals while building your own hero.",
      es: "Tu viaje comienza aquí. Aprende los fundamentos de Move mientras construyes tu propio héroe.",
    },
    lore: {
      pt: "Num mundo onde o código rege os contratos do destino, uma nova alma desperta. Para dominar os artefatos da blockchain, ela precisa aprender a linguagem dos criadores: Move.",
      en: "In a world where code rules the contracts of destiny, a new soul awakens. To master the artifacts of blockchain, they must learn the language of the creators: Move.",
      es: "En un mundo donde el código rige los contratos del destino, un alma nueva despierta. Para dominar los artefactos de blockchain, debe aprender el lenguaje de los creadores: Move.",
    },
    cor: "#3FFE95", // Move Neon Green
    icone: "🪨",
    xpTotal: 1550, // 100 + 100 + 150 + 200 + 200 + 250 + 300 + 250
    missoes: [
      {
        id: "missao-01",
        slug: "desperte",
        numero: 1,
        icone: "🪨",
        titulo: "Desperte – Imprima Hello World",
        descricao: "Sua primeira missão: desperte seu poder e imprima sua primeira mensagem no mundo Move.",
        lore: "A escuridão se dissipa. Você sente uma energia pulsante em suas mãos. É hora de dar seu primeiro passo e fazer o mundo saber que você chegou.",
        conteudo: `# 🪨 Missão 1: Desperte

## 📖 A Jornada Começa

A escuridão se dissipa. Você sente uma energia pulsante em suas mãos. É hora de dar seu primeiro passo e fazer o mundo saber que você chegou.

## 🎯 O Que Você Vai Aprender

- Como criar um **módulo Move**
- Como criar uma **função pública**
- Como usar \`std::debug::print\` para exibir mensagens

## 📚 Conceitos Move

### 🔷 O Que É Um Módulo?

Um **módulo** em Move é a unidade fundamental de organização de código. Em Moviara, pense nele como um **artefato mágico** que contém poderes e conhecimentos.

**Analogia (Moviara):**
- Cada **módulo** é um **artefato** com poderes específicos
- As **funções** são os **feitiços** dentro desse artefato
- O **endereço** (ex: \`0x1\`) é como o **selo do criador** (identifica quem forjou o artefato)
- O **nome do módulo** é o **nome do artefato** gravado nele

**Estrutura de um módulo:**
\`\`\`move
module <endereço>::<nome> {
    // Seu código aqui: funções, structs, constantes
}
\`\`\`

**Explicação:**
- \`module\` - Palavra-chave que define um módulo (obrigatória)
- \`<endereço>\` - O endereço do dono do módulo:
  - Temporário para testes: \`0x1\`, \`0x2\`, etc.
  - Real na blockchain Sui: \`0x1234...abcd\`
- \`::\` - Separador entre endereço e nome (dois pontos duplos)
- \`<nome>\` - Nome do módulo (deve começar com letra minúscula, usar snake_case)

**Exemplo: \`0x1::despertar\`**
- \`0x1\` = Endereço temporário usado para testes (hexadecimal)
- \`::\` = Separador
- \`despertar\` = Nome do módulo (artefato)

**Por que usar módulos?**
- ✅ **Organização**: Agrupa código relacionado
- ✅ **Namespace**: Evita conflitos de nomes
- ✅ **Reutilização**: Outros módulos podem importar com \`use\`
- ✅ **Segurança**: Controla o que é público ou privado
- ✅ **Modularidade**: Facilita manutenção e testes

**Importante:**
- Todo arquivo Move deve ter **exatamente um módulo**
- O nome do arquivo deve corresponder ao nome do módulo (ex: \`despertar.move\`)

### 📖 Outros Conceitos

- **Função pública**: Um feitiço que pode ser invocado por outros artefatos (módulos)
- **debug::print**: Um feitiço de comunicação que exibe mensagens durante o desenvolvimento

## 💻 Exemplo

\`\`\`move
module 0x1::despertar {
    use std::debug;

    public fun main() {
        debug::print(&b"Hello World");
    }
}
\`\`\`

## 🔍 Explicação

- \`module 0x1::despertar\` - Forja nosso artefato (seu primeiro!)
- \`use std::debug\` - Invoca o poder de comunicação (debug)
- \`public fun main()\` - Cria um feitiço público chamado main
- \`debug::print(&b"Hello World")\` - Invoca o feitiço para exibir a mensagem (o \`&\` é necessário!)

## ✨ Recompensas

- **XP**: 100 pontos
- **Badge**: "Desperto" 🪨
- **Conquista**: Primeira função escrita em Move!

## 🎮 Sua Missão

Complete o código abaixo para imprimir "Hello World" e despertar seu poder!`,
        codigoInicial: `module 0x1::despertar {
    use std::debug;

    public fun main() {
        // Seu código aqui - imprima "Hello World"
    }
}`,
        codigoSolucao: `module 0x1::despertar {
    use std::debug;

    public fun main() {
        debug::print(&b"Hello World");
    }
}`,
        dicas: [
          "Use debug::print para imprimir",
          "Lembre-se do & antes da string",
          "Strings em Move são escritas como b\"texto\"",
        ],
        xpRecompensa: 100,
        badgeRecompensa: {
          id: "badge-desperto",
          nome: "Desperto",
          descricao: "Você despertou e imprimiu sua primeira mensagem!",
          icone: "🪨",
        },
        conceitosAprendidos: [
          "Módulos Move",
          "Funções públicas",
          "debug::print",
          "Strings em Move (vector<u8>)",
        ],
      },
      {
        id: "missao-02",
        slug: "nomeie-se",
        numero: 2,
        icone: "🔤",
        titulo: "Nomeie-se – Declare seu nome",
        descricao: "Todo herói precisa de um nome. Declare o seu e torne-se único neste mundo.",
        lore: "Agora que você despertou, é hora de se apresentar. Qual é o nome que carregará sua essência? Declare-o ao mundo e torne-se único.",
        conteudo: `# 🔤 Missão 2: Nomeie-se

## 📖 A Identidade

Agora que você despertou, é hora de se apresentar. Qual é o nome que carregará sua essência? Declare-o ao mundo e torne-se único.

## 🎯 O Que Você Vai Aprender

- Como criar **variáveis** em Move
- Como trabalhar com **vector<u8>** (strings)
- Como criar **funções com parâmetros**

## 📚 Conceitos Move

- **Variáveis**: Armazenam valores temporários
- **vector<u8>**: Tipo que representa strings em Move
- **Parâmetros**: Dados que uma função recebe

## 💻 Exemplo

\`\`\`move
module 0x1::nomeie_se {
    use std::debug;

    public fun main(nome: vector<u8>) {
        debug::print(&nome);
    }
}
\`\`\`

## 🔍 Explicação

- \`nome: vector<u8>\` - Parâmetro do tipo string
- \`debug::print(&nome)\` - Imprime o nome recebido
- O \`&\` cria uma referência ao valor

## ✨ Recompensas

- **XP**: 100 pontos
- **Badge**: "Nomeado" 🔤
- **Conquista**: Primeira variável declarada!

## 🎮 Sua Missão

Complete o código para receber e imprimir seu nome!`,
        codigoInicial: `module 0x1::nomeie_se {
    use std::debug;

    public fun main(nome: vector<u8>) {
        // Seu código aqui - imprima o nome recebido
    }
}`,
        codigoSolucao: `module 0x1::nomeie_se {
    use std::debug;

    public fun main(nome: vector<u8>) {
        debug::print(&nome);
    }
}`,
        dicas: [
          "A função já recebe o parâmetro nome",
          "Use debug::print para imprimir",
          "Lembre-se do & antes do nome",
        ],
        xpRecompensa: 100,
        badgeRecompensa: {
          id: "badge-nomeado",
          nome: "Nomeado",
          descricao: "Você declarou seu nome ao mundo!",
          icone: "🔤",
        },
        conceitosAprendidos: [
          "Variáveis",
          "Parâmetros de função",
          "vector<u8> (strings)",
        ],
        preRequisitos: ["missao-01"],
      },
      {
        id: "missao-03",
        slug: "declare-origem",
        numero: 3,
        icone: "📅",
        titulo: "Declare sua origem – Data de nascimento",
        descricao: "Revele quando sua jornada começou. Trabalhe com tipos primitivos e valores numéricos.",
        lore: "Cada herói tem uma origem. Quando sua essência foi forjada? Declare sua data de nascimento e aprenda a trabalhar com números e tipos primitivos.",
        conteudo: `# 📅 Missão 3: Declare sua Origem

## 📖 A Origem

Cada herói tem uma origem. Quando sua essência foi forjada? Declare sua data de nascimento e aprenda a trabalhar com números e tipos primitivos.

## 🎯 O Que Você Vai Aprender

- Tipos primitivos em Move: **u64**, **u8**, **bool**
- Como trabalhar com números
- Como combinar diferentes tipos

## 📚 Conceitos Move

- **u64**: Número inteiro sem sinal de 64 bits
- **u8**: Número inteiro sem sinal de 8 bits
- **bool**: Valor booleano (true/false)

## 💻 Exemplo

\`\`\`move
module 0x1::origem {
    use std::debug;

    public fun main(ano: u64, mes: u8, dia: u8) {
        debug::print(&b"Ano: ");
        debug::print(&std::bcs::to_bytes(&ano));
        debug::print(&b" Mes: ");
        debug::print(&std::bcs::to_bytes(&mes));
        debug::print(&b" Dia: ");
        debug::print(&std::bcs::to_bytes(&dia));
    }
}
\`\`\`

## 🔍 Explicação

- \`u64\`, \`u8\` são tipos numéricos
- Para imprimir números, precisamos convertê-los para bytes
- \`std::bcs::to_bytes\` converte valores para bytes

## ✨ Recompensas

- **XP**: 150 pontos
- **Badge**: "Originado" 📅
- **Conquista**: Primeiros tipos primitivos dominados!

## 🎮 Sua Missão

Crie uma função que recebe ano, mês e dia e os imprime!`,
        codigoInicial: `module 0x1::origem {
    use std::debug;
    use std::bcs;

    public fun main(ano: u64, mes: u8, dia: u8) {
        // Seu código aqui
        // Imprima ano, mês e dia
    }
}`,
        codigoSolucao: `module 0x1::origem {
    use std::debug;
    use std::bcs;

    public fun main(ano: u64, mes: u8, dia: u8) {
        debug::print(&b"Ano: ");
        debug::print(&bcs::to_bytes(&ano));
        debug::print(&b" Mes: ");
        debug::print(&bcs::to_bytes(&mes));
        debug::print(&b" Dia: ");
        debug::print(&bcs::to_bytes(&dia));
    }
}`,
        dicas: [
          "Use std::bcs::to_bytes para converter números em bytes",
          "Imprima cada valor separadamente",
          "Lembre-se de importar std::bcs",
        ],
        xpRecompensa: 150,
        badgeRecompensa: {
          id: "badge-originado",
          nome: "Originado",
          descricao: "Você declarou sua origem ao mundo!",
          icone: "📅",
        },
        conceitosAprendidos: [
          "Tipos primitivos (u64, u8, bool)",
          "Conversão de tipos",
          "Trabalhar com números",
        ],
        preRequisitos: ["missao-02"],
      },
      {
        id: "missao-04",
        slug: "molde-dna",
        numero: 4,
        icone: "🧬",
        titulo: "Molde seu DNA – Crie uma struct Hero",
        descricao: "Crie a estrutura que define seu herói. Aprenda sobre structs, campos e instanciação.",
        lore: "Agora é hora de moldar sua essência. Crie a estrutura que define quem você é. Cada campo é uma característica, cada struct é uma identidade.",
        conteudo: `# 🧬 Missão 4: Molde seu DNA

## 📖 A Essência

Agora é hora de moldar sua essência. Crie a estrutura que define quem você é. Cada campo é uma característica, cada struct é uma identidade.

## 🎯 O Que Você Vai Aprender

- Como criar **structs** em Move
- Como definir **campos** (fields)
- Como **instanciar** uma struct

## 📚 Conceitos Move

- **Struct**: Um tipo personalizado que agrupa dados relacionados
- **Campos**: Propriedades de uma struct
- **Instanciação**: Criar uma nova instância de uma struct

## 💻 Exemplo

\`\`\`move
module 0x1::hero {
    struct Hero has drop {
        nome: vector<u8>,
        nivel: u64,
        xp: u64,
    }

    public fun criar(nome: vector<u8>, nivel: u64, xp: u64): Hero {
        Hero {
            nome,
            nivel,
            xp,
        }
    }
}
\`\`\`

## 🔍 Explicação

- \`struct Hero has drop\` - Define uma struct chamada Hero
- \`has drop\` - Permite que a struct seja descartada
- \`Hero { nome, nivel, xp }\` - Cria uma nova instância

## ✨ Recompensas

- **XP**: 200 pontos
- **Badge**: "Criador de Structs" 🧬
- **Conquista**: Primeira struct criada!

## 🎮 Sua Missão

Crie uma struct Hero com nome, nível e XP, e uma função para criá-la!`,
        codigoInicial: `module 0x1::hero {
    // Crie uma struct Hero com:
    // - nome: vector<u8>
    // - nivel: u64
    // - xp: u64
    
    // Depois crie uma função pública 'criar' que retorna um Hero
}`,
        codigoSolucao: `module 0x1::hero {
    struct Hero has drop {
        nome: vector<u8>,
        nivel: u64,
        xp: u64,
    }

    public fun criar(nome: vector<u8>, nivel: u64, xp: u64): Hero {
        Hero {
            nome,
            nivel,
            xp,
        }
    }
}`,
        dicas: [
          "Use 'struct Hero has drop' para criar a struct",
          "Defina os campos dentro das chaves",
          "A função 'criar' deve retornar Hero",
          "Instancie com Hero { campo1, campo2, ... }",
        ],
        xpRecompensa: 200,
        badgeRecompensa: {
          id: "badge-criador-structs",
          nome: "Criador de Structs",
          descricao: "Você criou sua primeira struct!",
          icone: "🧬",
        },
        conceitosAprendidos: [
          "Structs",
          "Campos (fields)",
          "Instanciação",
          "has drop",
        ],
        preRequisitos: ["missao-03"],
      },
      {
        id: "missao-05",
        slug: "proteja-se",
        numero: 5,
        icone: "🛡️",
        titulo: "Proteja-se – Escreva uma função defenda()",
        descricao: "Aprenda a criar funções com parâmetros e lógica de defesa. Seu herói precisa se proteger!",
        lore: "O perigo se aproxima. É hora de aprender a se defender. Crie uma função que proteja seu herói e aumente sua defesa.",
        conteudo: `# 🛡️ Missão 5: Proteja-se

## 📖 A Defesa

O perigo se aproxima. É hora de aprender a se defender. Crie uma função que proteja seu herói e aumente sua defesa.

## 🎯 O Que Você Vai Aprender

- Funções com **múltiplos parâmetros**
- **Lógica básica** em funções
- Como **modificar** valores de structs

## 📚 Conceitos Move

- **Parâmetros múltiplos**: Funções podem receber vários valores
- **Lógica**: Operações matemáticas e condicionais
- **Modificação**: Alterar valores de structs

## 💻 Exemplo

\`\`\`move
module 0x1::defesa {
    struct Hero has drop {
        nome: vector<u8>,
        defesa: u64,
    }

    public fun criar(nome: vector<u8>): Hero {
        Hero {
            nome,
            defesa: 10,
        }
    }

    public fun defenda(hero: &mut Hero, bonus: u64) {
        hero.defesa = hero.defesa + bonus;
    }
}
\`\`\`

## 🔍 Explicação

- \`&mut Hero\` - Referência mutável ao herói
- \`hero.defesa = hero.defesa + bonus\` - Modifica o campo defesa
- Use \`&\` para referências e \`mut\` para mutabilidade

## ✨ Recompensas

- **XP**: 200 pontos
- **Badge**: "Protetor" 🛡️
- **Conquista**: Primeira função com lógica criada!

## 🎮 Sua Missão

Crie uma função defenda() que aumenta a defesa do herói!`,
        codigoInicial: `module 0x1::defesa {
    struct Hero has drop {
        nome: vector<u8>,
        defesa: u64,
    }

    public fun criar(nome: vector<u8>): Hero {
        Hero {
            nome,
            defesa: 10,
        }
    }

    // Crie uma função defenda que recebe &mut Hero e u64 bonus
    // e aumenta a defesa do herói
}`,
        codigoSolucao: `module 0x1::defesa {
    struct Hero has drop {
        nome: vector<u8>,
        defesa: u64,
    }

    public fun criar(nome: vector<u8>): Hero {
        Hero {
            nome,
            defesa: 10,
        }
    }

    public fun defenda(hero: &mut Hero, bonus: u64) {
        hero.defesa = hero.defesa + bonus;
    }
}`,
        dicas: [
          "Use &mut Hero para modificar o herói",
          "Acesse campos com hero.campo",
          "Modifique com hero.campo = novo_valor",
        ],
        xpRecompensa: 200,
        badgeRecompensa: {
          id: "badge-protetor",
          nome: "Protetor",
          descricao: "Você aprendeu a se defender!",
          icone: "🛡️",
        },
        conceitosAprendidos: [
          "Referências mutáveis (&mut)",
          "Modificação de structs",
          "Lógica em funções",
        ],
        preRequisitos: ["missao-04"],
      },
      {
        id: "missao-06",
        slug: "domine-tempo",
        numero: 6,
        icone: "✨",
        titulo: "Domine o tempo – Controle um contador de mana",
        descricao: "Aprenda sobre mutabilidade e controle de estado. Crie um contador de mana que aumenta com o tempo.",
        lore: "O tempo flui e sua mana se regenera. Aprenda a controlar esse poder e criar sistemas que mudam com o tempo.",
        conteudo: `# ✨ Missão 6: Domine o Tempo

## 📖 A Mana

O tempo flui e sua mana se regenera. Aprenda a controlar esse poder e criar sistemas que mudam com o tempo.

## 🎯 O Que Você Vai Aprender

- **Mutabilidade** em Move
- **Controle de estado** com variáveis mutáveis
- **Operações matemáticas** e incremento

## 📚 Conceitos Move

- **mut**: Palavra-chave para variáveis mutáveis
- **Estado**: Valores que mudam ao longo do tempo
- **Incremento**: Aumentar valores gradualmente

## 💻 Exemplo

\`\`\`move
module 0x1::mana {
    struct Hero has drop {
        nome: vector<u8>,
        mana: u64,
        mana_maxima: u64,
    }

    public fun criar(nome: vector<u8>): Hero {
        Hero {
            nome,
            mana: 0,
            mana_maxima: 100,
        }
    }

    public fun regenerar_mana(hero: &mut Hero, quantidade: u64) {
        let mut nova_mana = hero.mana + quantidade;
        if (nova_mana > hero.mana_maxima) {
            nova_mana = hero.mana_maxima;
        };
        hero.mana = nova_mana;
    }
}
\`\`\`

## 🔍 Explicação

- \`let mut\` - Cria variável mutável
- \`hero.mana + quantidade\` - Operação matemática
- Lógica condicional para limitar o valor máximo

## ✨ Recompensas

- **XP**: 250 pontos
- **Badge**: "Mestre do Tempo" ✨
- **Conquista**: Primeiro sistema de estado criado!

## 🎮 Sua Missão

Crie uma função que regenera a mana do herói, respeitando o limite máximo!`,
        codigoInicial: `module 0x1::mana {
    struct Hero has drop {
        nome: vector<u8>,
        mana: u64,
        mana_maxima: u64,
    }

    public fun criar(nome: vector<u8>): Hero {
        Hero {
            nome,
            mana: 0,
            mana_maxima: 100,
        }
    }

    // Crie uma função regenerar_mana que aumenta a mana
    // mas não ultrapassa mana_maxima
}`,
        codigoSolucao: `module 0x1::mana {
    struct Hero has drop {
        nome: vector<u8>,
        mana: u64,
        mana_maxima: u64,
    }

    public fun criar(nome: vector<u8>): Hero {
        Hero {
            nome,
            mana: 0,
            mana_maxima: 100,
        }
    }

    public fun regenerar_mana(hero: &mut Hero, quantidade: u64) {
        let mut nova_mana = hero.mana + quantidade;
        if (nova_mana > hero.mana_maxima) {
            nova_mana = hero.mana_maxima;
        };
        hero.mana = nova_mana;
    }
}`,
        dicas: [
          "Use let mut para variáveis mutáveis",
          "Use if para verificar condições",
          "Lembre-se do ponto e vírgula após o if",
        ],
        xpRecompensa: 250,
        badgeRecompensa: {
          id: "badge-mestre-tempo",
          nome: "Mestre do Tempo",
          descricao: "Você domina o fluxo do tempo!",
          icone: "✨",
        },
        conceitosAprendidos: [
          "Mutabilidade (mut)",
          "Controle de estado",
          "Operações matemáticas",
          "Lógica condicional básica",
        ],
        preRequisitos: ["missao-05"],
      },
      {
        id: "missao-07",
        slug: "revele-simbolo",
        numero: 7,
        icone: "🔓",
        titulo: "Revele seu símbolo – NFT com nome/atributos",
        descricao: "Crie seu primeiro NFT na blockchain Sui! Aprenda sobre objetos, UID e o ecossistema Sui Move.",
        lore: "Sua essência se materializa. É hora de criar seu símbolo único, um NFT que representa quem você é. Este é seu primeiro passo no mundo real do Sui.",
        conteudo: `# 🔓 Missão 7: Revele seu Símbolo

## 📖 O Símbolo

Sua essência se materializa. É hora de criar seu símbolo único, um NFT que representa quem você é. Este é seu primeiro passo no mundo real do Sui.

## 🎯 O Que Você Vai Aprender

- **Objetos** na blockchain Sui
- **UID** (Unique Identifier)
- **Structs com key** para objetos
- **Transfer** de objetos

## 📚 Conceitos Sui Move

- **key**: Ability que permite um objeto ser armazenado globalmente
- **UID**: Identificador único de cada objeto
- **Transfer**: Mover objetos entre endereços

## 💻 Exemplo

\`\`\`move
module 0x1::hero_nft {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    use sui::transfer;

    struct HeroNFT has key {
        id: UID,
        nome: vector<u8>,
        nivel: u64,
    }

    public fun criar(nome: vector<u8>, nivel: u64, ctx: &mut TxContext): HeroNFT {
        HeroNFT {
            id: object::new(ctx),
            nome,
            nivel,
        }
    }

    public fun transferir(nft: HeroNFT, endereco: address, ctx: &mut TxContext) {
        transfer::transfer(nft, endereco);
    }
}
\`\`\`

## 🔍 Explicação

- \`has key\` - Permite que a struct seja um objeto Sui
- \`UID\` - Identificador único obrigatório
- \`object::new(ctx)\` - Cria novo UID
- \`transfer::transfer\` - Transfere o objeto

## ✨ Recompensas

- **XP**: 300 pontos
- **Badge**: "Criador de NFTs" 🔓
- **Conquista**: Primeiro objeto Sui criado!

## 🎮 Sua Missão

Crie um NFT Hero com nome e nível que pode ser transferido!`,
        codigoInicial: `module 0x1::hero_nft {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    use sui::transfer;

    // Crie uma struct HeroNFT com key, UID, nome e nivel
    // Crie uma função criar que retorna HeroNFT
    // Crie uma função transferir que transfere o NFT
}`,
        codigoSolucao: `module 0x1::hero_nft {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;
    use sui::transfer;

    struct HeroNFT has key {
        id: UID,
        nome: vector<u8>,
        nivel: u64,
    }

    public fun criar(nome: vector<u8>, nivel: u64, ctx: &mut TxContext): HeroNFT {
        HeroNFT {
            id: object::new(ctx),
            nome,
            nivel,
        }
    }

    public fun transferir(nft: HeroNFT, endereco: address, ctx: &mut TxContext) {
        transfer::transfer(nft, endereco);
    }
}`,
        dicas: [
          "Use 'has key' para objetos Sui",
          "Sempre inclua 'id: UID' em objetos",
          "Use object::new(ctx) para criar UID",
          "Importe os módulos necessários do Sui",
        ],
        xpRecompensa: 300,
        badgeRecompensa: {
          id: "badge-criador-nfts",
          nome: "Criador de NFTs",
          descricao: "Você criou seu primeiro NFT na blockchain Sui!",
          icone: "🔓",
        },
        conceitosAprendidos: [
          "Objetos Sui",
          "UID (Unique Identifier)",
          "has key",
          "Transfer de objetos",
          "TxContext",
        ],
        preRequisitos: ["missao-06"],
      },
      {
        id: "missao-08",
        slug: "escolha-caminho",
        numero: 8,
        icone: "🧭",
        titulo: "Escolha seu caminho – Ramificações com if/else",
        descricao: "Domine o controle de fluxo. Aprenda a tomar decisões e criar caminhos diferentes no seu código.",
        lore: "A encruzilhada se apresenta. Múltiplos caminhos se abrem. Aprenda a escolher e criar lógica que se adapta às situações.",
        conteudo: `# 🧭 Missão 8: Escolha seu Caminho

## 📖 A Encruzilhada

A encruzilhada se apresenta. Múltiplos caminhos se abrem. Aprenda a escolher e criar lógica que se adapta às situações.

## 🎯 O Que Você Vai Aprender

- **Controle de fluxo** com if/else
- **Lógica condicional** complexa
- **Tomada de decisões** no código

## 📚 Conceitos Move

- **if/else**: Estruturas condicionais
- **Operadores lógicos**: && (e), || (ou), ! (não)
- **Comparações**: ==, !=, <, >, <=, >=

## 💻 Exemplo

\`\`\`move
module 0x1::caminho {
    struct Hero has drop {
        nome: vector<u8>,
        nivel: u64,
        caminho: u8, // 1 = Guerreiro, 2 = Mago, 3 = Arqueiro
    }

    public fun escolher_caminho(hero: &mut Hero, escolha: u8) {
        if (escolha == 1) {
            hero.caminho = 1;
        } else if (escolha == 2) {
            hero.caminho = 2;
        } else if (escolha == 3) {
            hero.caminho = 3;
        } else {
            hero.caminho = 0; // Caminho inválido
        };
    }

    public fun obter_nome_caminho(hero: &Hero): vector<u8> {
        if (hero.caminho == 1) {
            b"Guerreiro"
        } else if (hero.caminho == 2) {
            b"Mago"
        } else if (hero.caminho == 3) {
            b"Arqueiro"
        } else {
            b"Sem caminho"
        }
    }
}
\`\`\`

## 🔍 Explicação

- \`if (condicao) { ... }\` - Executa se condição for verdadeira
- \`else if\` - Verifica outra condição
- \`else\` - Executa se nenhuma condição for verdadeira
- Sempre termine com ponto e vírgula

## ✨ Recompensas

- **XP**: 250 pontos
- **Badge**: "Navegador" 🧭
- **Conquista**: Controle de fluxo dominado!

## 🎮 Sua Missão

Crie funções que permitem escolher e verificar o caminho do herói!`,
        codigoInicial: `module 0x1::caminho {
    struct Hero has drop {
        nome: vector<u8>,
        nivel: u64,
        caminho: u8, // 1 = Guerreiro, 2 = Mago, 3 = Arqueiro
    }

    // Crie uma função escolher_caminho que define o caminho baseado na escolha
    // Crie uma função obter_nome_caminho que retorna o nome do caminho
}`,
        codigoSolucao: `module 0x1::caminho {
    struct Hero has drop {
        nome: vector<u8>,
        nivel: u64,
        caminho: u8, // 1 = Guerreiro, 2 = Mago, 3 = Arqueiro
    }

    public fun escolher_caminho(hero: &mut Hero, escolha: u8) {
        if (escolha == 1) {
            hero.caminho = 1;
        } else if (escolha == 2) {
            hero.caminho = 2;
        } else if (escolha == 3) {
            hero.caminho = 3;
        } else {
            hero.caminho = 0;
        };
    }

    public fun obter_nome_caminho(hero: &Hero): vector<u8> {
        if (hero.caminho == 1) {
            b"Guerreiro"
        } else if (hero.caminho == 2) {
            b"Mago"
        } else if (hero.caminho == 3) {
            b"Arqueiro"
        } else {
            b"Sem caminho"
        }
    }
}`,
        dicas: [
          "Use if/else if/else para múltiplas condições",
          "Use == para comparação",
          "Lembre-se do ponto e vírgula no final",
          "Retorne valores diretamente sem return",
        ],
        xpRecompensa: 250,
        badgeRecompensa: {
          id: "badge-navegador",
          nome: "Navegador",
          descricao: "Você domina o controle de fluxo!",
          icone: "🧭",
        },
        conceitosAprendidos: [
          "Controle de fluxo (if/else)",
          "Operadores de comparação",
          "Lógica condicional",
          "Tomada de decisões",
        ],
        preRequisitos: ["missao-07"],
      },
    ],
  },
  {
    id: "trilha-ownership",
    slug: "dominio-da-propriedade",
    titulo: {
      pt: "Domínio da Propriedade",
      en: "Ownership Mastery",
      es: "Dominio de la Propiedad",
    },
    descricao: {
      pt: "Aprenda sobre ownership, abilities e como Move gerencia recursos de forma única.",
      en: "Learn about ownership, abilities, and how Move uniquely manages resources.",
      es: "Aprende sobre propiedad, habilidades y cómo Move gestiona recursos de forma única.",
    },
    lore: {
      pt: "Agora que você despertou, é hora de entender as leis fundamentais de Moviara. Ownership, copy, drop, store e key - essas são as habilidades que governam todos os objetos neste mundo.",
      en: "Now that you've awakened, it's time to understand the fundamental laws of Moviara. Ownership, copy, drop, store, and key - these are the abilities that govern all objects in this world.",
      es: "Ahora que has despertado, es hora de entender las leyes fundamentales de Moviara. Propiedad, copia, caída, almacenamiento y clave - estas son las habilidades que gobiernan todos los objetos en este mundo.",
    },
    cor: "#6AD7E5",
    icone: "🔑",
    xpTotal: 1000, // 150 + 150 + 150 + 200 + 150 + 200
    missoes: [
      {
        id: "missao-09",
        slug: "entenda-ownership",
        numero: 1,
        icone: "🔑",
        titulo: "Entenda Ownership",
        descricao: "Aprenda o conceito fundamental de ownership no Move e como ele difere de outras linguagens.",
        lore: "As leis de Moviara são diferentes. Aqui, cada objeto tem um dono. Aprenda a primeira lei: ownership.",
        conteudo: `# 🔑 Missão 1: Entenda Ownership

## 📖 A Primeira Lei

Em Moviara, ownership é fundamental. Cada recurso tem um único dono. Aprenda essa lei básica.

## 🎯 O Que Você Vai Aprender

- **Ownership** no Move
- Diferença entre **copy** e **move**
- Como recursos são transferidos

## 📚 Conceitos Move

- **Ownership**: Cada valor tem um único dono. Quando você passa um valor para uma função, o ownership é transferido (move)
- **Move**: Transferência de ownership - o valor original não pode mais ser usado
- **Copy**: Duplicação de um valor (requer ability \`copy\`)

## 💻 Exemplo

\`\`\`move
module 0x1::ownership {
    struct Recurso has drop {
        valor: u64,
    }

    public fun criar(valor: u64): Recurso {
        Recurso { valor }
    }

    public fun obter_valor(recurso: Recurso): u64 {
        recurso.valor
    }
}
\`\`\`

## 🔍 Explicação

- \`struct Recurso has drop\` - Define uma struct que pode ser descartada
- \`criar(valor: u64): Recurso\` - Cria e retorna um Recurso (ownership é transferido)
- \`obter_valor(recurso: Recurso)\` - Recebe o Recurso (ownership é movido para a função)
- Após chamar \`obter_valor\`, o recurso não pode mais ser usado (foi consumido)

## ✨ Recompensas

- **XP**: 150 pontos
- **Badge**: "Guardião" 🔑

## 🎮 Sua Missão

Crie uma struct Recurso e funções para criar e obter seu valor!`,
        codigoInicial: `module 0x1::ownership {
    // Crie uma struct Recurso com campo valor: u64
    // Crie uma função criar que retorna Recurso
    // Crie uma função obter_valor que recebe Recurso e retorna u64
}`,
        codigoSolucao: `module 0x1::ownership {
    struct Recurso has drop {
        valor: u64,
    }

    public fun criar(valor: u64): Recurso {
        Recurso { valor }
    }

    public fun obter_valor(recurso: Recurso): u64 {
        recurso.valor
    }
}`,
        dicas: ["Use 'has drop' para permitir destruir a struct", "Ownership é transferido quando você passa um valor"],
        xpRecompensa: 150,
        badgeRecompensa: {
          id: "badge-guardiao",
          nome: "Guardião",
          descricao: "Você entendeu ownership!",
          icone: "🔑",
        },
        conceitosAprendidos: ["Ownership", "Structs", "Funções"],
        preRequisitos: [],
      },
      {
        id: "missao-10",
        slug: "abilities-copy",
        numero: 2,
        icone: "📋",
        titulo: "Ability: Copy",
        descricao: "Aprenda a usar a ability 'copy' para duplicar recursos quando necessário.",
        lore: "Algumas coisas podem ser copiadas. Aprenda quando e como usar essa habilidade poderosa.",
        conteudo: `# 📋 Missão 2: Ability Copy

## 📖 A Duplicação

Algumas coisas podem ser copiadas. Aprenda quando e como usar essa habilidade poderosa.

## 🎯 O Que Você Vai Aprender

- Ability **copy** no Move
- Quando usar copy vs move
- Tipos primitivos são copy por padrão

## 📚 Conceitos Move

- **copy**: Ability que permite duplicar valores
- **Tipos primitivos** (u64, u8, bool, address) já são copy por padrão
- **Structs** precisam de \`has copy\` para serem copiadas
- Com copy, você pode usar o mesmo valor múltiplas vezes

## 💻 Exemplo

\`\`\`move
module 0x1::copy_example {
    struct Contador has copy, drop {
        valor: u64,
    }

    public fun duplicar(contador: Contador): (Contador, Contador) {
        (contador, contador) // Pode copiar porque tem 'copy'
    }
}
\`\`\`

## 🔍 Explicação

- \`has copy, drop\` - Permite copiar e descartar a struct
- \`(contador, contador)\` - Cria uma tupla com duas cópias do contador
- Sem \`copy\`, isso causaria erro (tentaria mover o mesmo valor duas vezes)
- Com \`copy\`, o valor é duplicado e ambas as cópias podem ser usadas

## ✨ Recompensas

- **XP**: 150 pontos

## 🎮 Sua Missão

Crie uma struct Contador com copy e uma função que a duplica!`,
        codigoInicial: `module 0x1::copy_example {
    // Crie uma struct Contador com copy e drop
    // Crie uma função que duplica o contador
}`,
        codigoSolucao: `module 0x1::copy_example {
    struct Contador has copy, drop {
        valor: u64,
    }

    public fun duplicar(contador: Contador): (Contador, Contador) {
        (contador, contador)
    }
}`,
        dicas: ["Adicione 'copy' às abilities", "Tipos primitivos já são copy"],
        xpRecompensa: 150,
        conceitosAprendidos: ["Copy ability", "Tuplas"],
        preRequisitos: ["missao-09"],
      },
      {
        id: "missao-11",
        slug: "abilities-store",
        numero: 3,
        icone: "📦",
        titulo: "Ability: Store",
        descricao: "Aprenda a usar 'store' para permitir que structs sejam armazenadas globalmente.",
        lore: "Alguns recursos precisam ser guardados para sempre. Aprenda a habilidade 'store'.",
        conteudo: `# 📦 Missão 3: Ability Store

## 📖 O Armazenamento

Alguns recursos precisam ser guardados para sempre. Aprenda a habilidade 'store'.

## 🎯 O Que Você Vai Aprender

- Ability **store** no Move
- Quando usar store
- Armazenamento global

## 📚 Conceitos Move

- **store**: Ability que permite armazenar structs em recursos globais
- Usado para dados que precisam persistir na blockchain
- Necessário para structs dentro de outras structs armazenadas globalmente
- Diferente de \`key\` (usado na blockchain Sui para objetos)

## 💻 Exemplo

\`\`\`move
module 0x1::store_example {
    struct Configuracao has store {
        nome: vector<u8>,
        ativo: bool,
    }
}
\`\`\`

## 🔍 Explicação

- \`has store\` - Permite que a struct seja armazenada em recursos globais
- \`Configuracao\` pode ser um campo de uma struct maior armazenada globalmente
- Sem \`store\`, a struct não pode ser parte de recursos persistentes
- Útil para configurações e dados que precisam existir permanentemente

## ✨ Recompensas

- **XP**: 150 pontos

## 🎮 Sua Missão

Crie uma struct Configuracao com ability store!`,
        codigoInicial: `module 0x1::store_example {
    // Crie uma struct Configuracao com store
}`,
        codigoSolucao: `module 0x1::store_example {
    struct Configuracao has store {
        nome: vector<u8>,
        ativo: bool,
    }
}`,
        dicas: ["Store permite armazenamento global", "Use quando o recurso precisa persistir"],
        xpRecompensa: 150,
        conceitosAprendidos: ["Store ability"],
        preRequisitos: ["missao-10"],
      },
      {
        id: "missao-12",
        slug: "abilities-key",
        numero: 4,
        icone: "🗝️",
        titulo: "Ability: Key",
        descricao: "Aprenda sobre 'key' - a ability que permite objetos serem identificados globalmente.",
        lore: "A chave mestre. Com ela, você pode criar objetos únicos que existem no mundo inteiro.",
        conteudo: `# 🗝️ Missão 4: Ability Key

## 📖 A Chave Mestre

A chave mestre. Com ela, você pode criar objetos únicos que existem no mundo inteiro.

## 🎯 O Que Você Vai Aprender

- Ability **key** no Move
- Diferença entre key e store
- Uso na blockchain Sui

## 📚 Conceitos Move

- **key**: Ability que permite objetos serem identificados globalmente (específico do Sui)
- **UID**: Identificador único obrigatório para objetos com \`key\`
- **Diferença key vs store**: \`key\` é para objetos Sui, \`store\` é para dados em recursos globais
- Objetos com \`key\` podem ser transferidos e identificados na blockchain

## 💻 Exemplo

\`\`\`move
module 0x1::key_example {
    use sui::object::{Self, UID};

    struct ObjetoGlobal has key {
        id: UID,
        dados: u64,
    }
}
\`\`\`

## 🔍 Explicação

- \`has key\` - Permite que a struct seja um objeto Sui identificável
- \`id: UID\` - Campo obrigatório para objetos com \`key\`
- \`UID\` é criado com \`object::new(ctx)\` durante a criação
- Objetos com \`key\` podem ser transferidos, compartilhados ou congelados na blockchain Sui

## ✨ Recompensas

- **XP**: 200 pontos

## 🎮 Sua Missão

Crie uma struct com ability key e campo UID!`,
        codigoInicial: `module 0x1::key_example {
    // Crie uma struct com key e UID
}`,
        codigoSolucao: `module 0x1::key_example {
    use sui::object::{Self, UID};

    struct ObjetoGlobal has key {
        id: UID,
        dados: u64,
    }
}`,
        dicas: ["Key requer UID", "Key é usado na blockchain Sui para objetos"],
        xpRecompensa: 200,
        conceitosAprendidos: ["Key ability", "UID"],
        preRequisitos: ["missao-11"],
      },
      {
        id: "missao-13",
        slug: "abilities-drop",
        numero: 5,
        icone: "🗑️",
        titulo: "Ability: Drop",
        descricao: "Entenda 'drop' - a ability que permite destruir recursos quando não são mais necessários.",
        lore: "Tudo tem um fim. Aprenda a habilidade de descartar recursos com segurança.",
        conteudo: `# 🗑️ Missão 5: Ability Drop

## 📖 O Fim

Tudo tem um fim. Aprenda a habilidade de descartar recursos com segurança.

## 🎯 O Que Você Vai Aprender

- Ability **drop** no Move
- Quando recursos são destruídos
- Gerenciamento de memória

## 📚 Conceitos Move

- **drop**: Ability que permite destruir valores quando não são mais necessários
- **Automático**: Drop acontece automaticamente no final do escopo
- **Necessário**: Sem \`drop\`, você não pode descartar valores (precisa consumir ou retornar)
- **Gerenciamento**: Move gerencia memória automaticamente através de ownership e drop

## 💻 Exemplo

\`\`\`move
module 0x1::drop_example {
    struct Temporario has drop {
        valor: u64,
    }

    public fun descartar(temp: Temporario) {
        // Drop acontece automaticamente no final
    }
}
\`\`\`

## 🔍 Explicação

- \`has drop\` - Permite que a struct seja descartada
- Quando \`descartar\` termina, \`temp\` é automaticamente destruído
- Sem \`drop\`, você precisaria retornar ou consumir o valor de outra forma
- Útil para valores temporários que não precisam persistir

## ✨ Recompensas

- **XP**: 150 pontos

## 🎮 Sua Missão

Crie uma struct Temporario com ability drop!`,
        codigoInicial: `module 0x1::drop_example {
    // Crie uma struct com drop
}`,
        codigoSolucao: `module 0x1::drop_example {
    struct Temporario has drop {
        valor: u64,
    }

    public fun descartar(temp: Temporario) {
        // Drop automático
    }
}`,
        dicas: ["Drop é automático no final do escopo", "Use quando o recurso pode ser descartado"],
        xpRecompensa: 150,
        conceitosAprendidos: ["Drop ability"],
        preRequisitos: ["missao-12"],
      },
      {
        id: "missao-14",
        slug: "combinando-abilities",
        numero: 6,
        icone: "⚡",
        titulo: "Combinando Abilities",
        descricao: "Aprenda a combinar múltiplas abilities para criar recursos poderosos.",
        lore: "O verdadeiro poder vem da combinação. Domine todas as abilities juntas.",
        conteudo: `# ⚡ Missão 6: Combinando Abilities

## 📖 O Poder Combinado

O verdadeiro poder vem da combinação. Domine todas as abilities juntas.

## 🎯 O Que Você Vai Aprender

- Combinar múltiplas abilities
- Escolher as abilities corretas
- Padrões comuns

## 📚 Conceitos Move

- **Múltiplas abilities**: Você pode combinar \`copy\`, \`drop\`, \`store\` e \`key\`
- **Padrões comuns**:
  - \`copy, drop\` - Valores temporários que podem ser copiados
  - \`drop, store\` - Dados persistentes que não precisam ser copiados
  - \`copy, drop, store\` - Dados flexíveis que podem ser copiados e armazenados
- **Escolha baseada no uso**: Pense em como o valor será usado

## 💻 Exemplo

\`\`\`move
module 0x1::combinado {
    struct RecursoCompleto has copy, drop, store {
        id: u64,
        nome: vector<u8>,
    }
}
\`\`\`

## 🔍 Explicação

- \`has copy, drop, store\` - Combina três abilities
- \`copy\` - Permite duplicar o valor
- \`drop\` - Permite descartar quando não necessário
- \`store\` - Permite armazenar em recursos globais
- Este padrão é útil para dados que precisam de máxima flexibilidade

## ✨ Recompensas

- **XP**: 200 pontos
- **Badge**: "Mestre das Abilities" ⚡

## 🎮 Sua Missão

Crie uma struct que combine copy, drop e store!`,
        codigoInicial: `module 0x1::combinado {
    // Crie uma struct com copy, drop e store
}`,
        codigoSolucao: `module 0x1::combinado {
    struct RecursoCompleto has copy, drop, store {
        id: u64,
        nome: vector<u8>,
    }
}`,
        dicas: ["Você pode ter múltiplas abilities", "Escolha baseado no uso"],
        xpRecompensa: 200,
        badgeRecompensa: {
          id: "badge-mestre-abilities",
          nome: "Mestre das Abilities",
          descricao: "Você domina todas as abilities!",
          icone: "⚡",
        },
        conceitosAprendidos: ["Combinar abilities", "Padrões de design"],
        preRequisitos: ["missao-13"],
      },
    ],
  },
  {
    id: "trilha-sui-pratico",
    slug: "sui-pratico",
    titulo: {
      pt: "Sui Prático",
      en: "Practical Sui",
      es: "Sui Práctico",
    },
    descricao: {
      pt: "Domine os conceitos práticos do Sui: objetos, UID, transfer e entry functions.",
      en: "Master practical Sui concepts: objects, UID, transfer, and entry functions.",
      es: "Domina los conceptos prácticos de Sui: objetos, UID, transfer y funciones entry.",
    },
    lore: {
      pt: "O ecossistema Sui se revela. Aqui você aprenderá a trabalhar com objetos reais, criar NFTs, transferir propriedades e construir aplicações descentralizadas.",
      en: "The Sui ecosystem reveals itself. Here you'll learn to work with real objects, create NFTs, transfer properties, and build decentralized applications.",
      es: "El ecosistema Sui se revela. Aquí aprenderás a trabajar con objetos reales, crear NFTs, transferir propiedades y construir aplicaciones descentralizadas.",
    },
    cor: "#4BE4C9",
    icone: "🌊",
    xpTotal: 1300, // 200 + 200 + 200 + 250 + 200 + 250
    missoes: [
      {
        id: "missao-15",
        slug: "criar-primeiro-objeto",
        numero: 1,
        icone: "🌊",
        titulo: "Criar seu Primeiro Objeto",
        descricao: "Aprenda a criar objetos na blockchain Sui usando UID e a ability key.",
        lore: "O mundo Sui se abre. Crie seu primeiro objeto que existe no blockchain.",
        conteudo: `# 🌊 Missão 1: Criar seu Primeiro Objeto

## 📖 O Mundo Sui

O mundo Sui se abre. Crie seu primeiro objeto que existe no blockchain.

## 🎯 O Que Você Vai Aprender

- Criar objetos na blockchain Sui
- UID (Unique Identifier)
- Ability key

## 📚 Conceitos Sui Move

- **Objetos Sui**: Structs com \`has key\` que existem na blockchain
- **UID**: Identificador único obrigatório para cada objeto
- **TxContext**: Contexto da transação, necessário para criar UIDs
- **object::new(ctx)**: Cria um novo UID único para o objeto

## 💻 Exemplo

\`\`\`move
module 0x1::meu_objeto {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;

    struct MeuObjeto has key {
        id: UID,
        nome: vector<u8>,
    }

    public fun criar(nome: vector<u8>, ctx: &mut TxContext): MeuObjeto {
        MeuObjeto {
            id: object::new(ctx),
            nome,
        }
    }
}
\`\`\`

## 🔍 Explicação

- \`has key\` - Torna a struct um objeto Sui identificável
- \`id: UID\` - Campo obrigatório (deve ser o primeiro campo)
- \`object::new(ctx)\` - Gera um identificador único para o objeto
- \`TxContext\` - Fornece informações sobre a transação atual
- O objeto criado pode ser transferido, compartilhado ou armazenado

## ✨ Recompensas

- **XP**: 200 pontos

## 🎮 Sua Missão

Crie seu primeiro objeto Sui com UID e ability key!`,
        codigoInicial: `module 0x1::meu_objeto {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;

    // Crie uma struct MeuObjeto com key e UID
    // Crie uma função criar que retorna MeuObjeto
}`,
        codigoSolucao: `module 0x1::meu_objeto {
    use sui::object::{Self, UID};
    use sui::tx_context::TxContext;

    struct MeuObjeto has key {
        id: UID,
        nome: vector<u8>,
    }

    public fun criar(nome: vector<u8>, ctx: &mut TxContext): MeuObjeto {
        MeuObjeto {
            id: object::new(ctx),
            nome,
        }
    }
}`,
        dicas: ["Use object::new(ctx) para criar UID", "Key requer UID obrigatório"],
        xpRecompensa: 200,
        conceitosAprendidos: ["Objetos Sui", "UID", "TxContext"],
        preRequisitos: [],
      },
      {
        id: "missao-16",
        slug: "transferir-objetos",
        numero: 2,
        icone: "📤",
        titulo: "Transferir Objetos",
        descricao: "Aprenda a transferir objetos entre endereços usando transfer::transfer.",
        lore: "O poder de mover objetos. Aprenda a transferir propriedades no mundo Sui.",
        conteudo: `# 📤 Missão 2: Transferir Objetos

## 📖 O Poder de Mover

O poder de mover objetos. Aprenda a transferir propriedades no mundo Sui.

## 🎯 O Que Você Vai Aprender

- transfer::transfer
- Transferir objetos para endereços
- Ownership na blockchain Sui

## 📚 Conceitos Sui Move

- **transfer::transfer**: Função que move ownership de um objeto para um endereço
- **Ownership na blockchain Sui**: Objetos pertencem a endereços (carteiras)
- **Address**: Tipo que representa um endereço na blockchain Sui
- Após transferir, o objeto passa a pertencer ao destinatário

## 💻 Exemplo

\`\`\`move
module 0x1::transferir {
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public fun transferir_objeto(objeto: MeuObjeto, destinatario: address, ctx: &mut TxContext) {
        transfer::transfer(objeto, destinatario);
    }
}
\`\`\`

## 🔍 Explicação

- \`transfer::transfer(objeto, destinatario)\` - Move o objeto para o endereço
- O objeto é consumido (ownership transferido)
- O destinatário recebe o objeto em sua carteira
- Útil para NFTs, tokens e outros objetos transferíveis

## ✨ Recompensas

- **XP**: 200 pontos

## 🎮 Sua Missão

Crie uma função que transfere um objeto para um endereço!`,
        codigoInicial: `module 0x1::transferir {
    use sui::transfer;
    use sui::tx_context::TxContext;

    // Crie uma função que transfere um objeto
}`,
        codigoSolucao: `module 0x1::transferir {
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public fun transferir_objeto(objeto: MeuObjeto, destinatario: address, ctx: &mut TxContext) {
        transfer::transfer(objeto, destinatario);
    }
}`,
        dicas: ["transfer::transfer move o objeto", "Não precisa de return"],
        xpRecompensa: 200,
        conceitosAprendidos: ["Transfer", "Address"],
        preRequisitos: ["missao-15"],
      },
      {
        id: "missao-17",
        slug: "entry-functions",
        numero: 3,
        icone: "🚪",
        titulo: "Entry Functions",
        descricao: "Aprenda a criar entry functions que podem ser chamadas diretamente em transações.",
        lore: "A porta de entrada. Entry functions são o ponto de partida para todas as ações na blockchain Sui.",
        conteudo: `# 🚪 Missão 3: Entry Functions

## 📖 A Porta de Entrada

A porta de entrada. Entry functions são o ponto de partida para todas as ações na blockchain Sui.

## 🎯 O Que Você Vai Aprender

- entry fun
- Diferença entre public e entry
- Transações na blockchain Sui

## 📚 Conceitos Sui Move

- **entry fun**: Função que pode ser chamada diretamente em uma transação
- **Diferença public vs entry**: 
  - \`public fun\` - Pode ser chamada por outros módulos
  - \`entry fun\` - Pode ser chamada diretamente em transação (mais restritiva)
- **TxContext**: Sempre necessário em entry functions
- Entry functions são o ponto de entrada para ações do usuário

## 💻 Exemplo

\`\`\`move
module 0x1::entry_example {
    use sui::tx_context::TxContext;

    public entry fun acao_publica(ctx: &mut TxContext) {
        // Pode ser chamada diretamente em transação
    }
}
\`\`\`

## 🔍 Explicação

- \`public entry fun\` - Combina \`public\` (visível) e \`entry\` (chamável em transação)
- \`ctx: &mut TxContext\` - Contexto da transação (obrigatório em entry)
- Entry functions aparecem na interface do Sui como ações disponíveis
- Use entry para funções principais que usuários chamam diretamente

## ✨ Recompensas

- **XP**: 200 pontos

## 🎮 Sua Missão

Crie uma entry function que pode ser chamada diretamente em transação!`,
        codigoInicial: `module 0x1::entry_example {
    use sui::tx_context::TxContext;

    // Crie uma entry function
}`,
        codigoSolucao: `module 0x1::entry_example {
    use sui::tx_context::TxContext;

    public entry fun acao_publica(ctx: &mut TxContext) {
        // Entry function
    }
}`,
        dicas: ["entry fun pode ser chamada diretamente", "Use para ações principais"],
        xpRecompensa: 200,
        conceitosAprendidos: ["Entry functions", "Transações"],
        preRequisitos: ["missao-16"],
      },
      {
        id: "missao-18",
        slug: "objetos-compartilhados",
        numero: 4,
        icone: "🌐",
        titulo: "Objetos Compartilhados",
        descricao: "Aprenda a criar objetos compartilhados que podem ser acessados por todos.",
        lore: "Alguns objetos pertencem a todos. Aprenda a criar recursos compartilhados.",
        conteudo: `# 🌐 Missão 4: Objetos Compartilhados

## 📖 O Recurso Global

Alguns objetos pertencem a todos. Aprenda a criar recursos compartilhados.

## 🎯 O Que Você Vai Aprender

- transfer::share_object
- Objetos compartilhados
- Acesso global

## 📚 Conceitos Sui Move

- **share_object**: Torna um objeto acessível por todos na blockchain
- **Objetos compartilhados**: Não pertencem a um endereço específico
- **Acesso global**: Qualquer um pode ler e modificar (se permitido)
- **Uso comum**: Games, marketplaces, sistemas globais

## 💻 Exemplo

\`\`\`move
module 0x1::compartilhado {
    use sui::transfer;
    use sui::tx_context::TxContext;

    public fun compartilhar(objeto: MeuObjeto, ctx: &mut TxContext) {
        transfer::share_object(objeto);
    }
}
\`\`\`

## 🔍 Explicação

- \`transfer::share_object(objeto)\` - Torna o objeto compartilhado
- O objeto não pertence mais a nenhum endereço específico
- Múltiplos usuários podem interagir com o mesmo objeto
- Útil para sistemas que precisam de estado global compartilhado

## ✨ Recompensas

- **XP**: 250 pontos

## 🎮 Sua Missão

Crie uma função que compartilha um objeto para acesso global!`,
        codigoInicial: `module 0x1::compartilhado {
    use sui::transfer;
    use sui::tx_context::TxContext;

    // Crie uma função que compartilha um objeto
}`,
        codigoSolucao: `module 0x1::compartilhado {
    use sui::transfer;
    use sui::tx_context::TxContext;

    public fun compartilhar(objeto: MeuObjeto, ctx: &mut TxContext) {
        transfer::share_object(objeto);
    }
}`,
        dicas: ["share_object torna o objeto acessível a todos", "Use para recursos globais"],
        xpRecompensa: 250,
        conceitosAprendidos: ["Objetos compartilhados", "share_object"],
        preRequisitos: ["missao-17"],
      },
      {
        id: "missao-19",
        slug: "frozen-objects",
        numero: 5,
        icone: "❄️",
        titulo: "Objetos Congelados",
        descricao: "Aprenda sobre frozen objects - objetos imutáveis na blockchain Sui.",
        lore: "Algumas coisas nunca mudam. Aprenda a criar objetos congelados no tempo.",
        conteudo: `# ❄️ Missão 5: Objetos Congelados

## 📖 A Imutabilidade

Algumas coisas nunca mudam. Aprenda a criar objetos congelados no tempo.

## 🎯 O Que Você Vai Aprender

- transfer::freeze_object
- Objetos imutáveis
- Quando usar frozen

## 📚 Conceitos Sui Move

- **freeze_object**: Torna um objeto imutável permanentemente
- **Imutabilidade**: O objeto não pode mais ser modificado
- **Uso comum**: Metadados, certificados, dados históricos
- **Irreversível**: Uma vez congelado, não pode ser descongelado

## 💻 Exemplo

\`\`\`move
module 0x1::congelado {
    use sui::transfer;
    use sui::tx_context::TxContext;

    public fun congelar(objeto: MeuObjeto, ctx: &mut TxContext) {
        transfer::freeze_object(objeto);
    }
}
\`\`\`

## 🔍 Explicação

- \`transfer::freeze_object(objeto)\` - Congela o objeto permanentemente
- Após congelar, nenhuma função pode modificar o objeto
- O objeto ainda pode ser lido e transferido
- Útil para garantir que dados importantes nunca sejam alterados

## ✨ Recompensas

- **XP**: 200 pontos

## 🎮 Sua Missão

Crie uma função que congela um objeto permanentemente!`,
        codigoInicial: `module 0x1::congelado {
    use sui::transfer;
    use sui::tx_context::TxContext;

    // Crie uma função que congela um objeto
}`,
        codigoSolucao: `module 0x1::congelado {
    use sui::transfer;
    use sui::tx_context::TxContext;

    public fun congelar(objeto: MeuObjeto, ctx: &mut TxContext) {
        transfer::freeze_object(objeto);
    }
}`,
        dicas: ["freeze_object torna o objeto imutável", "Use para dados que nunca mudam"],
        xpRecompensa: 200,
        conceitosAprendidos: ["Frozen objects", "Imutabilidade"],
        preRequisitos: ["missao-18"],
      },
      {
        id: "missao-20",
        slug: "sui-objects-completo",
        numero: 6,
        icone: "🌊",
        titulo: "Sistema Completo de Objetos",
        descricao: "Crie um sistema completo usando todos os conceitos de objetos Sui.",
        lore: "Você dominou os objetos. Agora crie algo grandioso que use todo seu conhecimento.",
        conteudo: `# 🌊 Missão 6: Sistema Completo de Objetos

## 📖 O Domínio Completo

Você dominou os objetos. Agora crie algo grandioso que use todo seu conhecimento.

## 🎯 O Que Você Vai Aprender

- Combinar todos os conceitos
- Criar sistema completo
- Padrões Sui

## 📚 Conceitos Sui Move

- **Sistema completo**: Combina criação, mutação, transferência e compartilhamento
- **Padrões Sui**: 
  - Criar objetos com UID
  - Modificar com entry functions
  - Compartilhar para acesso global
- **Boas práticas**: Use entry para ações principais, organize código em módulos

## 💻 Exemplo

\`\`\`move
module 0x1::sistema_completo {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct Sistema has key {
        id: UID,
        contador: u64,
    }

    public fun criar(ctx: &mut TxContext): Sistema {
        Sistema {
            id: object::new(ctx),
            contador: 0,
        }
    }

    public entry fun incrementar(sistema: &mut Sistema) {
        sistema.contador = sistema.contador + 1;
    }

    public fun compartilhar(sistema: Sistema, ctx: &mut TxContext) {
        transfer::share_object(sistema);
    }
}
\`\`\`

## 🔍 Explicação

- \`criar\` - Cria um novo objeto Sistema com UID
- \`incrementar\` - Entry function que modifica o contador
- \`compartilhar\` - Torna o sistema acessível globalmente
- Este padrão combina todos os conceitos: criação, mutação e compartilhamento

## ✨ Recompensas

- **XP**: 250 pontos
- **Badge**: "Mestre Sui" 🌊

## 🎮 Sua Missão

Crie um sistema completo que combine criação, mutação e compartilhamento de objetos!`,
        codigoInicial: `module 0x1::sistema_completo {
    // Crie um sistema completo com objetos, transfer, entry functions
}`,
        codigoSolucao: `module 0x1::sistema_completo {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct Sistema has key {
        id: UID,
        contador: u64,
    }

    public fun criar(ctx: &mut TxContext): Sistema {
        Sistema {
            id: object::new(ctx),
            contador: 0,
        }
    }

    public entry fun incrementar(sistema: &mut Sistema) {
        sistema.contador = sistema.contador + 1;
    }

    public fun compartilhar(sistema: Sistema, ctx: &mut TxContext) {
        transfer::share_object(sistema);
    }
}`,
        dicas: ["Combine criação, mutação e compartilhamento", "Use entry para ações principais"],
        xpRecompensa: 250,
        badgeRecompensa: {
          id: "badge-mestre-sui",
          nome: "Mestre Sui",
          descricao: "Você domina os objetos Sui!",
          icone: "🌊",
        },
        conceitosAprendidos: ["Sistema completo", "Padrões Sui"],
        preRequisitos: ["missao-19"],
      },
    ],
  },
  {
    id: "trilha-coins-tokens",
    slug: "moedas-e-tokens",
    titulo: {
      pt: "Moedas e Tokens",
      en: "Coins and Tokens",
      es: "Monedas y Tokens",
    },
    descricao: {
      pt: "Crie seu próprio sistema de moedas e tokens na blockchain Sui. Aprenda sobre Coin<T> e economia tokenizada.",
      en: "Create your own coin and token system on Sui. Learn about Coin<T> and tokenized economics.",
      es: "Crea tu propio sistema de monedas y tokens en Sui. Aprende sobre Coin<T> y economía tokenizada.",
    },
    lore: {
      pt: "O poder econômico de Moviara está em suas moedas. Aprenda a criar, distribuir e gerenciar tokens que movimentam o mundo blockchain.",
      en: "The economic power of Moviara lies in its coins. Learn to create, distribute, and manage tokens that move the blockchain world.",
      es: "El poder económico de Moviara está en sus monedas. Aprende a crear, distribuir y gestionar tokens que mueven el mundo blockchain.",
    },
    cor: "#FBBF24",
    icone: "🪙",
    xpTotal: 1800, // 250 + 250 + 300 + 300 + 350 + 350
    missoes: [
      {
        id: "missao-21",
        slug: "criar-primeira-moeda",
        numero: 1,
        icone: "🪙",
        titulo: "Criar sua Primeira Moeda",
        descricao: "Aprenda a criar uma moeda customizada na blockchain Sui usando Coin<T> e TreasuryCap.",
        lore: "O poder econômico começa com uma única moeda. Crie sua primeira moeda e domine o sistema monetário de Moviara.",
        conteudo: `# 🪙 Missão 1: Criar sua Primeira Moeda

## 📖 O Poder Econômico

O poder econômico começa com uma única moeda. Crie sua primeira moeda e domine o sistema monetário de Moviara.

## 🎯 O Que Você Vai Aprender

- **Coin<T>** - Tipo genérico para moedas na Sui
- **TreasuryCap<T>** - Capacidade para criar e gerenciar moedas
- **init** function - Inicialização de módulos
- **sui::coin** - Framework de moedas do Sui

## 📚 Conceitos Sui Move

- **Coin<T>**: Tipo genérico que representa moedas na blockchain Sui
- **TreasuryCap<T>**: Objeto especial que permite criar (mint) e queimar (burn) moedas
- **init function**: Função especial executada uma vez quando o módulo é publicado
- **Denom**: Struct que identifica o tipo de moeda (deve ter apenas \`store\`)

## 💻 Exemplo

\`\`\`move
module 0x1::minha_moeda {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct MINHA_MOEDA has drop {}

    fun init(ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<MINHA_MOEDA>(
            ctx,
            18, // decimals
            b"Minha Moeda",
            b"MM",
            b"Descricao da moeda",
            option::none(),
            ctx,
        );
        transfer::transfer(treasury_cap, tx_context::sender(ctx));
    }
}
\`\`\`

## 🔍 Explicação

- \`struct MINHA_MOEDA has drop {}\` - Struct vazia que identifica o tipo de moeda (witness pattern)
- \`coin::create_currency\` - Cria uma nova moeda com metadados
- \`TreasuryCap\` - Permite criar e queimar moedas (deve ser guardado com segurança!)
- \`transfer::transfer(treasury_cap, ...)\` - Transfere o TreasuryCap para o criador

## ✨ Recompensas

- **XP**: 250 pontos
- **Badge**: "Criador de Moedas" 🪙

## 🎮 Sua Missão

Crie um módulo que inicializa uma nova moeda chamada "GuerreiroCoin"!`,
        codigoInicial: `module 0x1::minha_moeda {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    // Crie uma struct GUERREIRO_COIN com drop
    // Crie uma função init que cria a moeda e transfere o TreasuryCap
}`,
        codigoSolucao: `module 0x1::minha_moeda {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    struct GUERREIRO_COIN has drop {}

    fun init(ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<GUERREIRO_COIN>(
            ctx,
            18,
            b"GuerreiroCoin",
            b"GC",
            b"Moeda do Guerreiro do Move",
            option::none(),
            ctx,
        );
        transfer::transfer(treasury_cap, tx_context::sender(ctx));
    }
}`,
        dicas: [
          "Use struct vazia com drop para identificar a moeda",
          "coin::create_currency cria a moeda e retorna TreasuryCap",
          "Transfira o TreasuryCap para o sender",
        ],
        xpRecompensa: 250,
        badgeRecompensa: {
          id: "badge-criador-moedas",
          nome: "Criador de Moedas",
          descricao: "Você criou sua primeira moeda na blockchain Sui!",
          icone: "🪙",
        },
        conceitosAprendidos: [
          "Coin<T>",
          "TreasuryCap<T>",
          "init function",
          "create_currency",
          "Witness pattern",
        ],
        preRequisitos: ["missao-20"],
      },
      {
        id: "missao-22",
        slug: "mint-moedas",
        numero: 2,
        icone: "💰",
        titulo: "Mint de Moedas",
        descricao: "Aprenda a criar (mint) novas moedas usando o TreasuryCap.",
        lore: "O poder de criar riqueza. Com o TreasuryCap, você pode gerar novas moedas e distribuí-las.",
        conteudo: `# 💰 Missão 2: Mint de Moedas

## 📖 Criar Riqueza

O poder de criar riqueza. Com o TreasuryCap, você pode gerar novas moedas e distribuí-las.

## 🎯 O Que Você Vai Aprender

- **coin::mint** - Criar novas moedas
- **TreasuryCap** - Usar para autorizar mint
- **Transferir moedas** para endereços

## 📚 Conceitos Sui Move

- **mint**: Processo de criar novas moedas
- **TreasuryCap**: Objeto que autoriza operações de mint e burn
- **coin::mint_and_transfer**: Cria moedas e as transfere diretamente
- **Apenas o dono do TreasuryCap** pode criar moedas

## 💻 Exemplo

\`\`\`move
module 0x1::mint_example {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    public entry fun criar_moedas(
        treasury_cap: &mut TreasuryCap<MINHA_MOEDA>,
        quantidade: u64,
        destinatario: address,
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, quantidade, destinatario, ctx);
    }
}
\`\`\`

## 🔍 Explicação

- \`&mut TreasuryCap\` - Referência mutável ao TreasuryCap (necessário para mint)
- \`coin::mint_and_transfer\` - Cria moedas e transfere em uma operação
- \`quantidade\` - Quantidade de moedas a criar (em unidades menores, considerando decimals)
- O destinatário recebe as moedas em sua carteira

## ✨ Recompensas

- **XP**: 250 pontos

## 🎮 Sua Missão

Crie uma entry function que permite criar e distribuir moedas!`,
        codigoInicial: `module 0x1::mint_example {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    // Crie uma entry function que recebe TreasuryCap e cria moedas
}`,
        codigoSolucao: `module 0x1::mint_example {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    public entry fun criar_moedas(
        treasury_cap: &mut TreasuryCap<MINHA_MOEDA>,
        quantidade: u64,
        destinatario: address,
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, quantidade, destinatario, ctx);
    }
}`,
        dicas: [
          "Use coin::mint_and_transfer para criar e transferir",
          "TreasuryCap deve ser &mut",
          "Entry function precisa de ctx",
        ],
        xpRecompensa: 250,
        conceitosAprendidos: ["Mint", "TreasuryCap", "mint_and_transfer"],
        preRequisitos: ["missao-21"],
      },
      {
        id: "missao-23",
        slug: "burn-moedas",
        numero: 3,
        icone: "🔥",
        titulo: "Burn de Moedas",
        descricao: "Aprenda a queimar (burn) moedas para reduzir a oferta.",
        lore: "Tudo que pode ser criado pode ser destruído. Aprenda a queimar moedas e controlar a oferta.",
        conteudo: `# 🔥 Missão 3: Burn de Moedas

## 📖 Destruir Riqueza

Tudo que pode ser criado pode ser destruído. Aprenda a queimar moedas e controlar a oferta.

## 🎯 O Que Você Vai Aprender

- **coin::burn** - Queimar moedas
- **Reduzir oferta** de moedas
- **Controle de economia**

## 📚 Conceitos Sui Move

- **burn**: Processo de destruir moedas permanentemente
- **coin::burn**: Remove moedas da circulação
- **Redução de oferta**: Útil para controle inflacionário
- **Irreversível**: Moedas queimadas não podem ser recuperadas

## 💻 Exemplo

\`\`\`move
module 0x1::burn_example {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    public entry fun queimar_moedas(
        treasury_cap: &mut TreasuryCap<MINHA_MOEDA>,
        moedas: Coin<MINHA_MOEDA>,
        ctx: &mut TxContext,
    ) {
        coin::burn(treasury_cap, moedas, ctx);
    }
}
\`\`\`

## 🔍 Explicação

- \`Coin<MINHA_MOEDA>\` - Moedas a serem queimadas (ownership é consumido)
- \`coin::burn\` - Remove as moedas permanentemente
- O TreasuryCap autoriza a operação
- As moedas são destruídas e não podem ser recuperadas

## ✨ Recompensas

- **XP**: 300 pontos

## 🎮 Sua Missão

Crie uma entry function que permite queimar moedas!`,
        codigoInicial: `module 0x1::burn_example {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    // Crie uma entry function que queima moedas
}`,
        codigoSolucao: `module 0x1::burn_example {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    public entry fun queimar_moedas(
        treasury_cap: &mut TreasuryCap<MINHA_MOEDA>,
        moedas: Coin<MINHA_MOEDA>,
        ctx: &mut TxContext,
    ) {
        coin::burn(treasury_cap, moedas, ctx);
    }
}`,
        dicas: [
          "coin::burn consome o Coin",
          "TreasuryCap autoriza a operação",
          "Burn é irreversível",
        ],
        xpRecompensa: 300,
        conceitosAprendidos: ["Burn", "Redução de oferta", "Controle econômico"],
        preRequisitos: ["missao-22"],
      },
      {
        id: "missao-24",
        slug: "transferir-moedas",
        numero: 4,
        icone: "💸",
        titulo: "Transferir Moedas",
        descricao: "Aprenda a transferir moedas entre endereços usando coin::transfer.",
        lore: "A circulação é a vida da economia. Aprenda a mover moedas entre carteiras.",
        conteudo: `# 💸 Missão 4: Transferir Moedas

## 📖 A Circulação

A circulação é a vida da economia. Aprenda a mover moedas entre carteiras.

## 🎯 O Que Você Vai Aprender

- **coin::transfer** - Transferir moedas
- **coin::join** - Combinar moedas
- **coin::split** - Dividir moedas

## 📚 Conceitos Sui Move

- **coin::transfer**: Move moedas para um endereço
- **coin::join**: Combina múltiplas moedas em uma
- **coin::split**: Divide uma moeda em partes menores
- **Coin<T>**: Tipo genérico para qualquer moeda

## 💻 Exemplo

\`\`\`move
module 0x1::transfer_example {
    use sui::coin::{Self, Coin};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    public entry fun transferir(
        moedas: Coin<MINHA_MOEDA>,
        destinatario: address,
        ctx: &mut TxContext,
    ) {
        transfer::transfer(moedas, destinatario);
    }

    public fun dividir_moedas(
        moedas: &mut Coin<MINHA_MOEDA>,
        quantidade: u64,
        ctx: &mut TxContext,
    ): Coin<MINHA_MOEDA> {
        coin::split(moedas, quantidade, ctx)
    }
}
\`\`\`

## 🔍 Explicação

- \`transfer::transfer\` - Move ownership das moedas
- \`coin::split\` - Cria uma nova moeda com quantidade especificada
- \`coin::join\` - Combina moedas (útil para consolidar)
- Moedas são objetos Sui normais e podem ser transferidas

## ✨ Recompensas

- **XP**: 300 pontos

## 🎮 Sua Missão

Crie funções para transferir e dividir moedas!`,
        codigoInicial: `module 0x1::transfer_example {
    use sui::coin::{Self, Coin};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    // Crie funções para transferir e dividir moedas
}`,
        codigoSolucao: `module 0x1::transfer_example {
    use sui::coin::{Self, Coin};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct MINHA_MOEDA has drop {}

    public entry fun transferir(
        moedas: Coin<MINHA_MOEDA>,
        destinatario: address,
        ctx: &mut TxContext,
    ) {
        transfer::transfer(moedas, destinatario);
    }

    public fun dividir_moedas(
        moedas: &mut Coin<MINHA_MOEDA>,
        quantidade: u64,
        ctx: &mut TxContext,
    ): Coin<MINHA_MOEDA> {
        coin::split(moedas, quantidade, ctx)
    }
}`,
        dicas: [
          "transfer::transfer move ownership",
          "coin::split cria nova moeda",
          "Use &mut para modificar moedas",
        ],
        xpRecompensa: 300,
        conceitosAprendidos: ["Transfer de moedas", "split", "join"],
        preRequisitos: ["missao-23"],
      },
      {
        id: "missao-25",
        slug: "sistema-completo-moedas",
        numero: 5,
        icone: "🏦",
        titulo: "Sistema Completo de Moedas",
        descricao: "Crie um sistema completo de moedas com mint, burn, transfer e controle de oferta.",
        lore: "Você domina as moedas. Agora crie um sistema completo que gerencia toda a economia.",
        conteudo: `# 🏦 Missão 5: Sistema Completo de Moedas

## 📖 O Banco Central

Você domina as moedas. Agora crie um sistema completo que gerencia toda a economia.

## 🎯 O Que Você Vai Aprender

- Combinar todos os conceitos
- Sistema completo de moedas
- Boas práticas

## 📚 Conceitos Sui Move

- **Sistema completo**: Combina criação, mint, burn e transfer
- **TreasuryCap**: Guardado com segurança (não compartilhado!)
- **Entry functions**: Para ações principais
- **Segurança**: Apenas o dono do TreasuryCap pode criar/queimar

## 💻 Exemplo

\`\`\`move
module 0x1::sistema_moedas {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct GUERREIRO_COIN has drop {}

    fun init(ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<GUERREIRO_COIN>(
            ctx, 18, b"GuerreiroCoin", b"GC", b"Moeda oficial", option::none(), ctx
        );
        transfer::transfer(treasury_cap, tx_context::sender(ctx));
    }

    public entry fun mint(
        treasury_cap: &mut TreasuryCap<GUERREIRO_COIN>,
        quantidade: u64,
        destinatario: address,
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, quantidade, destinatario, ctx);
    }

    public entry fun burn(
        treasury_cap: &mut TreasuryCap<GUERREIRO_COIN>,
        moedas: Coin<GUERREIRO_COIN>,
        ctx: &mut TxContext,
    ) {
        coin::burn(treasury_cap, moedas, ctx);
    }
}
\`\`\`

## 🔍 Explicação

- \`init\` - Cria a moeda quando o módulo é publicado
- \`mint\` - Entry function para criar moedas
- \`burn\` - Entry function para queimar moedas
- TreasuryCap deve ser guardado com segurança!

## ✨ Recompensas

- **XP**: 350 pontos
- **Badge**: "Mestre das Moedas" 🏦

## 🎮 Sua Missão

Crie um sistema completo de moedas com init, mint e burn!`,
        codigoInicial: `module 0x1::sistema_moedas {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct GUERREIRO_COIN has drop {}

    // Crie init, mint e burn
}`,
        codigoSolucao: `module 0x1::sistema_moedas {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct GUERREIRO_COIN has drop {}

    fun init(ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency<GUERREIRO_COIN>(
            ctx, 18, b"GuerreiroCoin", b"GC", b"Moeda oficial", option::none(), ctx
        );
        transfer::transfer(treasury_cap, tx_context::sender(ctx));
    }

    public entry fun mint(
        treasury_cap: &mut TreasuryCap<GUERREIRO_COIN>,
        quantidade: u64,
        destinatario: address,
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, quantidade, destinatario, ctx);
    }

    public entry fun burn(
        treasury_cap: &mut TreasuryCap<GUERREIRO_COIN>,
        moedas: Coin<GUERREIRO_COIN>,
        ctx: &mut TxContext,
    ) {
        coin::burn(treasury_cap, moedas, ctx);
    }
}`,
        dicas: [
          "Combine init, mint e burn",
          "TreasuryCap deve ser guardado com segurança",
          "Use entry functions para ações principais",
        ],
        xpRecompensa: 350,
        badgeRecompensa: {
          id: "badge-mestre-moedas",
          nome: "Mestre das Moedas",
          descricao: "Você domina o sistema de moedas na Sui!",
          icone: "🏦",
        },
        conceitosAprendidos: ["Sistema completo", "Economia tokenizada", "Boas práticas"],
        preRequisitos: ["missao-24"],
      },
      {
        id: "missao-26",
        slug: "token-utilitario",
        numero: 6,
        icone: "🎫",
        titulo: "Token Utilitário",
        descricao: "Crie um token utilitário com funcionalidades especiais e casos de uso.",
        lore: "Moedas são poderosas, mas tokens utilitários têm propósito. Crie um token com funcionalidades especiais.",
        conteudo: `# 🎫 Missão 6: Token Utilitário

## 📖 Propósito Especial

Moedas são poderosas, mas tokens utilitários têm propósito. Crie um token com funcionalidades especiais.

## 🎯 O Que Você Vai Aprender

- Tokens com funcionalidades customizadas
- Casos de uso reais
- Integração com outros sistemas

## 📚 Conceitos Sui Move

- **Token utilitário**: Moeda com funcionalidades além de transferência
- **Casos de uso**: Acesso, votação, recompensas, staking
- **Integração**: Tokens podem interagir com outros módulos
- **Design**: Pense no propósito do token antes de criar

## 💻 Exemplo

\`\`\`move
module 0x1::token_util {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct ACCESS_TOKEN has drop {}

    fun init(ctx: &mut TxContext) {
        let (treasury_cap, _) = coin::create_currency<ACCESS_TOKEN>(
            ctx, 0, b"Access Token", b"ACC", b"Token de acesso", option::none(), ctx
        );
        transfer::transfer(treasury_cap, tx_context::sender(ctx));
    }

    public entry fun dar_acesso(
        treasury_cap: &mut TreasuryCap<ACCESS_TOKEN>,
        usuario: address,
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, 1, usuario, ctx);
    }
}
\`\`\`

## 🔍 Explicação

- Token com propósito específico (acesso)
- Decimals = 0 (não precisa de frações)
- Mint controlado para dar acesso
- Pode ser expandido com mais funcionalidades

## ✨ Recompensas

- **XP**: 350 pontos
- **Badge**: "Criador de Tokens" 🎫

## 🎮 Sua Missão

Crie um token utilitário com propósito específico!`,
        codigoInicial: `module 0x1::token_util {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct ACCESS_TOKEN has drop {}

    // Crie um token utilitário com funcionalidade especial
}`,
        codigoSolucao: `module 0x1::token_util {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::TxContext;

    struct ACCESS_TOKEN has drop {}

    fun init(ctx: &mut TxContext) {
        let (treasury_cap, _) = coin::create_currency<ACCESS_TOKEN>(
            ctx, 0, b"Access Token", b"ACC", b"Token de acesso", option::none(), ctx
        );
        transfer::transfer(treasury_cap, tx_context::sender(ctx));
    }

    public entry fun dar_acesso(
        treasury_cap: &mut TreasuryCap<ACCESS_TOKEN>,
        usuario: address,
        ctx: &mut TxContext,
    ) {
        coin::mint_and_transfer(treasury_cap, 1, usuario, ctx);
    }
}`,
        dicas: [
          "Pense no propósito do token",
          "Use decimals = 0 para tokens não divisíveis",
          "Adicione funcionalidades customizadas",
        ],
        xpRecompensa: 350,
        badgeRecompensa: {
          id: "badge-criador-tokens",
          nome: "Criador de Tokens",
          descricao: "Você criou um token utilitário!",
          icone: "🎫",
        },
        conceitosAprendidos: ["Tokens utilitários", "Casos de uso", "Design de tokens"],
        preRequisitos: ["missao-25"],
      },
    ],
  },
  {
    id: "trilha-nfts-avancado",
    slug: "nfts-avancado",
    titulo: {
      pt: "NFTs Avançado",
      en: "Advanced NFTs",
      es: "NFTs Avanzado",
    },
    descricao: {
      pt: "Crie coleções NFT complexas com metadados, royalties e marketplaces na blockchain Sui.",
      en: "Create complex NFT collections with metadata, royalties, and marketplaces on Sui.",
      es: "Crea colecciones NFT complejas con metadatos, regalías y mercados en Sui.",
    },
    lore: {
      pt: "Os artefatos mais poderosos de Moviara são os NFTs. Domine a criação de coleções, sistemas de royalties e mercados descentralizados.",
      en: "The most powerful artifacts of Moviara are NFTs. Master creating collections, royalty systems, and decentralized markets.",
      es: "Los artefactos más poderosos de Moviara son los NFTs. Domina la creación de colecciones, sistemas de regalías y mercados descentralizados.",
    },
    cor: "#F472B6",
    icone: "🎨",
    xpTotal: 2000,
    missoes: [],
  },
  {
    id: "trilha-defi",
    slug: "defi-e-financas",
    titulo: {
      pt: "DeFi e Finanças",
      en: "DeFi and Finance",
      es: "DeFi y Finanzas",
    },
    descricao: {
      pt: "Construa protocolos DeFi: DEX, staking, lending e yield farming na blockchain Sui.",
      en: "Build DeFi protocols: DEX, staking, lending, and yield farming on Sui.",
      es: "Construye protocolos DeFi: DEX, staking, lending y yield farming en Sui.",
    },
    lore: {
      pt: "O sistema financeiro de Moviara é descentralizado. Aprenda a construir protocolos que movimentam milhões e criam novas economias.",
      en: "Moviara's financial system is decentralized. Learn to build protocols that move millions and create new economies.",
      es: "El sistema financiero de Moviara está descentralizado. Aprende a construir protocolos que mueven millones y crean nuevas economías.",
    },
    cor: "#8B5CF6",
    icone: "💎",
    xpTotal: 2500,
    missoes: [],
  },
  {
    id: "trilha-gaming",
    slug: "gaming-e-metaverso",
    titulo: {
      pt: "Gaming e Metaverso",
      en: "Gaming and Metaverse",
      es: "Gaming y Metaverso",
    },
    descricao: {
      pt: "Crie jogos Web3, sistemas de recompensas e experiências imersivas na blockchain Sui.",
      en: "Create Web3 games, reward systems, and immersive experiences on Sui.",
      es: "Crea juegos Web3, sistemas de recompensas y experiencias inmersivas en Sui.",
    },
    lore: {
      pt: "Moviara é um mundo de jogos e aventuras. Aprenda a criar experiências gamificadas que recompensam jogadores e constroem comunidades.",
      en: "Moviara is a world of games and adventures. Learn to create gamified experiences that reward players and build communities.",
      es: "Moviara es un mundo de juegos y aventuras. Aprende a crear experiencias gamificadas que recompensan a los jugadores y construyen comunidades.",
    },
    cor: "#EC4899",
    icone: "🎮",
    xpTotal: 2200,
    missoes: [],
  },
  {
    id: "trilha-mestre",
    slug: "caminho-do-mestre",
    titulo: {
      pt: "Caminho do Mestre",
      en: "Master's Path",
      es: "Camino del Maestro",
    },
    descricao: {
      pt: "Torne-se um mestre do Move. Projetos avançados, otimizações e padrões de design profissional.",
      en: "Become a Move master. Advanced projects, optimizations, and professional design patterns.",
      es: "Conviértete en un maestro de Move. Proyectos avanzados, optimizaciones y patrones de diseño profesional.",
    },
    lore: {
      pt: "Você alcançou o ápice. Agora é hora de se tornar um verdadeiro mestre de Moviara, capaz de criar sistemas complexos e liderar outros guerreiros.",
      en: "You've reached the peak. Now it's time to become a true master of Moviara, capable of creating complex systems and leading other warriors.",
      es: "Has alcanzado la cima. Ahora es hora de convertirte en un verdadero maestro de Moviara, capaz de crear sistemas complejos y liderar a otros guerreros.",
    },
    cor: "#FACC15",
    icone: "👑",
    xpTotal: 3000,
    missoes: [],
  },
];

// Funções helper
export function getTrilhaBySlug(slug: string): Trilha | undefined {
  return trilhas.find((t) => t.slug === slug);
}

export function getMissaoBySlug(
  trilhaSlug: string,
  missaoSlug: string
): { trilha: Trilha; missao: Trilha["missoes"][0] } | undefined {
  const trilha = getTrilhaBySlug(trilhaSlug);
  if (!trilha) return undefined;

  const missao = trilha.missoes.find((m) => m.slug === missaoSlug);
  if (!missao) return undefined;

  return { trilha, missao };
}

