# ⚠️ IMPORTANTE: Encoding UTF-8

## 🚨 LEMBRETE CRÍTICO

**SEMPRE verificar e garantir encoding UTF-8 correto em TODOS os arquivos, especialmente na branch `master`.**

## Problemas comuns de encoding:

- `┬À` → deve ser `·` (middle dot)
- `├ç├âO` → deve ser `ÇÃO`
- `c├│digo` → deve ser `código`
- `exerc├¡cios` → deve ser `exercícios`
- `pr├íticos` → deve ser `práticos`
- `ÔÇö` → deve ser `—` (em dash)
- `come├ºando` → deve ser `começando`
- `b├ísico` → deve ser `básico`
- `at├®` → deve ser `até`
- `­ƒÜº` → deve ser `🚧` (emoji)
- `constru├º├úo` → deve ser `construção`
- `desaf├¡os` → deve ser `desafíos`
- `retroalimentaci├│n` → deve ser `retroalimentación`
- `CONSTRUCCI├ôN` → deve ser `CONSTRUCCIÓN`

## Como verificar:

1. **Sempre usar UTF-8** ao salvar arquivos
2. **Verificar visualmente** no navegador após deploy
3. **Testar caracteres especiais**: ç, ã, á, é, í, ó, ú, ê, ô, etc.
4. **Verificar emojis**: 🚧, ✅, ❌, etc.

## Ao fazer commit na master:

✅ **SEMPRE verificar encoding antes de commitar**
✅ **Testar no navegador após deploy**
✅ **Corrigir imediatamente se houver problemas**

## Comandos úteis:

```bash
# Verificar encoding do arquivo
file -i index.html

# Converter para UTF-8 (se necessário)
iconv -f ISO-8859-1 -t UTF-8 index.html > index_utf8.html
```

---

**Última correção:** 2025-11-13 - Corrigido todos os problemas de encoding no index.html

