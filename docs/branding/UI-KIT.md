# MoveAcademy UI Kit

Este UI Kit define componentes básicos usando a paleta oficial MoveAcademy (inspirada na blockchain Sui).

## 🎨 Paleta (referência rápida)

- **Sui Blue (primária):** `#6AD7E5`
- **Sui Cyan Glow (accent):** `#4BE4C9`
- **Sui Dark Blue (background):** `#0A1A2F`
- **Move Deep Navy (cards):** `#0F233E`
- **Aqua Soft (superfícies internas):** `#122C4A`
- **Move Neon Green (destaques):** `#3FFE95`
- **Texto principal:** `#E5E7EB`
- **Texto secundário:** `#9CA3AF`

---

## 🔘 Botão Primário

### HTML

```html
<button class="btn-primary">
  Começar jornada em Move
</button>
```

### CSS

```css
.btn-primary {
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #6AD7E5, #4BE4C9);
  color: #020617;
  font-weight: 600;
  font-size: 14px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.55);
}
```

---

## 🃏 Card de Trilha

### HTML

```html
<article class="track-card">
  <header class="track-card-header">
    <span class="track-tag">Trilha 1 · Fundamentos</span>
    <h3>Introdução à linguagem Move</h3>
  </header>
  <p>Aprenda módulos, structs, funções e tipos básicos, com exemplos executáveis na blockchain Sui.</p>
  <footer>
    <span class="track-meta">6 aulas · 12 desafios</span>
    <button class="btn-ghost">Ver conteúdo</button>
  </footer>
</article>
```

### CSS

```css
.track-card {
  background: #0F233E;
  border-radius: 22px;
  padding: 18px 18px 14px;
  border: 1px solid rgba(106, 215, 229, 0.25);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.7);
  color: #E5E7EB;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.track-card-header h3 {
  font-size: 16px;
  margin-top: 2px;
}

.track-tag {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #A5B4FC;
}

.track-card p {
  font-size: 13px;
  color: #CBD5F5;
}

.track-card footer {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
}

.btn-ghost {
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.6);
  background: rgba(15, 23, 42, 0.6);
  color: #E5E7EB;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
}
```

---

## 🏷 Badge de Nível / Status

### HTML

```html
<span class="badge-level badge-level-beginner">Iniciante</span>
<span class="badge-level badge-level-intermediate">Intermediário</span>
<span class="badge-level badge-level-advanced">Avançado</span>
```

### CSS

```css
.badge-level {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.badge-level-beginner {
  background: rgba(34, 197, 94, 0.2);
  color: #A7F3D0;
  border: 1px solid rgba(34, 197, 94, 0.5);
}

.badge-level-intermediate {
  background: rgba(59, 130, 246, 0.18);
  color: #BFDBFE;
  border: 1px solid rgba(59, 130, 246, 0.55);
}

.badge-level-advanced {
  background: rgba(147, 51, 234, 0.18);
  color: #E9D5FF;
  border: 1px solid rgba(147, 51, 234, 0.55);
}
```

---

## 🧑‍💻 Tema do Editor de Código (conceito)

### CSS (container do editor)

```css
.code-shell {
  background: #020617;
  border-radius: 16px;
  padding: 12px;
  border: 1px solid rgba(15, 118, 110, 0.4);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.85);
}
```

Quando configurar o Monaco, usar:

- Fundo: `#020617`
- Destaques:
  - keywords: `#3FFE95`
  - tipos: `#6AD7E5`
  - strings: `#A5F3FC`
  - comentários: `#64748B`
  - erros: `#F97373`

---

Este UI Kit pode crescer com novos componentes, mas já define uma base visual forte para o MoveAcademy.
