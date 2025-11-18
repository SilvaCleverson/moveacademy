# 🖥️ Configuração do VPS para Execução de Código Move

Este guia explica como configurar um VPS para executar código Move de forma segura e isolada.

## 📋 Pré-requisitos

- VPS com Ubuntu 20.04+ ou Debian 11+
- Acesso root ou sudo
- Pelo menos 2GB de RAM
- 20GB de espaço em disco
- Docker instalado

## 🚀 Passo 1: Configurar o VPS

### 1.1 Atualizar o sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Instalar Docker

```bash
# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Adicionar usuário ao grupo docker (opcional, se não for usar root)
sudo usermod -aG docker $USER

# Verificar instalação
docker --version
```

### 1.3 Instalar Node.js (para o backend)

```bash
# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version
npm --version
```

## 🐳 Passo 2: Criar Docker Image com Sui CLI

### 2.1 Criar Dockerfile

Crie um arquivo `Dockerfile` no VPS:

```dockerfile
FROM ubuntu:22.04

# Evitar prompts interativos
ENV DEBIAN_FRONTEND=noninteractive

# Instalar dependências
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Instalar Sui CLI
RUN curl -fsSL https://get.sui.io | sh

# Adicionar Sui ao PATH
ENV PATH="/root/.sui/bin:${PATH}"

# Criar diretório de trabalho
WORKDIR /workspace

# Script de execução
COPY execute-move.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/execute-move.sh

CMD ["/bin/bash"]
```

### 2.2 Criar script de execução

Crie `execute-move.sh`:

```bash
#!/bin/bash
set -e

# Recebe código via stdin
CODE="$1"
ACTION="${2:-build}"

# Cria diretório temporário único
WORK_DIR=$(mktemp -d)
cd "$WORK_DIR"

# Cria estrutura básica do projeto Move
mkdir -p src
echo "$CODE" > src/main.move

# Cria Move.toml básico
cat > Move.toml <<EOF
[package]
name = "moveacademy"
version = "1.0.0"

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/mainnet" }
EOF

# Executa comando baseado na ação
case "$ACTION" in
  "build")
    sui move build 2>&1
    ;;
  "test")
    sui move test 2>&1
    ;;
  "run")
    sui move build 2>&1 && sui move run 2>&1
    ;;
  *)
    echo "Ação inválida: $ACTION"
    exit 1
    ;;
esac

# Limpa diretório temporário
rm -rf "$WORK_DIR"
```

### 2.3 Build da imagem Docker

```bash
docker build -t move-executor:latest .
```

## 🔧 Passo 3: Criar Backend Node.js

### 3.1 Estrutura do projeto

```bash
mkdir -p ~/move-executor
cd ~/move-executor
npm init -y
```

### 3.2 Instalar dependências

```bash
npm install express cors dotenv express-rate-limit
```

### 3.3 Criar `server.js`

```javascript
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '100kb' }));

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10 // 10 requisições por minuto
});
app.use('/execute', limiter);

// Função para executar código Move em Docker
async function executeMoveCode(code, action = 'build') {
  return new Promise((resolve, reject) => {
    // Cria container temporário
    const containerName = `move-exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Executa código em container isolado
    const dockerCommand = `docker run --rm --name ${containerName} \
      --memory="512m" \
      --cpus="1" \
      --network="none" \
      --timeout=20 \
      move-executor:latest \
      /usr/local/bin/execute-move.sh '${code.replace(/'/g, "'\\''")}' ${action}`;

    const timeout = setTimeout(() => {
      // Mata container se demorar muito
      exec(`docker kill ${containerName}`, () => {});
      reject(new Error('Timeout: Execução demorou mais de 20 segundos'));
    }, 25000);

    exec(dockerCommand, { timeout: 20000 }, (error, stdout, stderr) => {
      clearTimeout(timeout);
      
      if (error) {
        // Erro de compilação/execução
        resolve({
          success: false,
          exitCode: error.code || 1,
          output: stderr.split('\n').filter(l => l),
          errors: stderr.split('\n').filter(l => l.includes('Error')),
          warnings: []
        });
      } else {
        // Sucesso
        resolve({
          success: true,
          exitCode: 0,
          output: stdout.split('\n').filter(l => l),
          errors: [],
          warnings: []
        });
      }
    });
  });
}

// Rota de execução
app.post('/execute', async (req, res) => {
  try {
    const { code, action = 'build', timeout = 20 } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Código não fornecido' });
    }

    // Validação básica de segurança
    if (code.length > 50000) {
      return res.status(400).json({ error: 'Código muito grande' });
    }

    // Bloqueia comandos perigosos
    const dangerousPatterns = [
      /system\s*\(/i,
      /exec\s*\(/i,
      /eval\s*\(/i,
      /require\s*\(/i,
      /import\s+os/i,
      /import\s+subprocess/i
    ];

    for (const pattern of dangerousPatterns) {
      if (pattern.test(code)) {
        return res.status(400).json({ error: 'Código contém padrões não permitidos' });
      }
    }

    const result = await executeMoveCode(code, action);
    res.json(result);

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ 
      error: 'Erro interno', 
      message: error.message 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Move Executor rodando na porta ${PORT}`);
});
```

### 3.4 Criar `.env`

```bash
PORT=3001
MOVE_EXECUTOR_API_KEY=seu-token-secreto-aqui
```

### 3.5 Instalar PM2 (gerenciador de processos)

```bash
npm install -g pm2
pm2 start server.js --name move-executor
pm2 save
pm2 startup
```

## 🔒 Passo 4: Configurar Firewall

```bash
# Permitir apenas porta do backend
sudo ufw allow 3001/tcp
sudo ufw enable
```

## 🌐 Passo 5: Configurar Nginx (Opcional, para HTTPS)

```bash
sudo apt install nginx certbot python3-certbot-nginx

# Configurar certificado SSL
sudo certbot --nginx -d seu-dominio.com
```

## 📝 Passo 6: Configurar Variáveis de Ambiente no Next.js

No Vercel ou `.env.local`:

```env
MOVE_EXECUTOR_URL=https://seu-vps.com:3001
MOVE_EXECUTOR_API_KEY=seu-token-secreto-aqui
```

## ✅ Testar

```bash
# Testar backend diretamente
curl -X POST http://localhost:3001/execute \
  -H "Content-Type: application/json" \
  -d '{"code": "module 0x1::test { public fun test() {} }", "action": "build"}'
```

## 🛡️ Segurança Adicional

1. **Isolamento de rede**: Containers Docker sem acesso à rede
2. **Limites de recursos**: CPU e memória limitados
3. **Timeout**: Máximo 20 segundos por execução
4. **Rate limiting**: 10 requisições por minuto por IP
5. **Validação de código**: Bloqueio de padrões perigosos

## 💰 Custos Estimados

- VPS básico: $5-10/mês (DigitalOcean, Linode, Vultr)
- VPS médio: $10-20/mês (com mais recursos)
- Domínio: $10-15/ano (opcional)

## 📚 Próximos Passos

1. Configurar monitoramento (PM2 logs)
2. Implementar logs de execução
3. Adicionar métricas (execuções por dia, erros, etc.)
4. Configurar backup automático

