# Como Criar um Componente de Ícone SVG (React Native)

Este guia explica, passo a passo, como construir um sistema de Ícones tipado e flexível usando SVGs com `react-native-svg`. Use-o para padronizar ícones no app com controle de cor/tamanho e imports otimizados.

## 📋 Pré-requisitos

- Projeto React Native configurado
- `react-native-svg` instalado
- Noções básicas de TypeScript

Recomendado:
- Manter SVGs brutos em uma pasta (ex.: `src/assets/icons`)
- Converter SVGs em componentes React (`src/assets/icon-components`)

## 🧱 Estrutura de Arquivos

```
src/
├── assets/
│   ├── icons/                 # Arquivos .svg brutos (fonte da verdade)
│   └── icon-components/       # Componentes TSX (um por ícone)
│       ├── check.tsx
│       ├── search.tsx
│       └── ...
└── components/
    └── Icon/
        ├── index.tsx          # Wrapper Icon (componente público)
        ├── names.ts           # Tipo IconName (gerado ou manual)
        └── map.ts             # Mapa nome -> componente
```

Este repositório já inclui `src/assets/icon-components` e `src/components/Icon` — o guia descreve o padrão e como estendê-lo com segurança.

## 🔧 Passo 1 — Instalar dependência

```bash
pnpm add react-native-svg
```

No iOS, o CocoaPods é resolvido via autolinking nas versões atuais do RN.

## 🔧 Passo 2 — Criar o tipo IconName

```ts
// src/components/Icon/names.ts
export type IconName =
  | 'check'
  | 'search'
  | 'trash-2'
  | 'edit-pen'
  | 'chevron-left'
  | 'chevron-right'
  // adicione novos nomes aqui conforme criar ícones

```

Dica: gere esta union a partir dos arquivos em `src/assets/icon-components` para evitar divergências.

## 🔧 Passo 3 — Mapear nomes para componentes

```ts
// src/components/Icon/map.ts
import { default as Check } from '@/assets/icon-components/check'
import { default as Search } from '@/assets/icon-components/search'
import { default as Trash2 } from '@/assets/icon-components/trash-2'
import { default as EditPen } from '@/assets/icon-components/edit-pen'
import { default as ChevronLeft } from '@/assets/icon-components/chevron-left'
import { default as ChevronRight } from '@/assets/icon-components/chevron-right'
import type { IconName } from './names'

export const iconMap: Record<IconName, React.ComponentType<{ size?: number; color?: string }>> = {
  'check': Check,
  'search': Search,
  'trash-2': Trash2,
  'edit-pen': EditPen,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
}
```

Por que imports diretos em vez de require dinâmico? Para permitir tree‑shaking: só os ícones usados entram no bundle.

## 🔧 Passo 4 — Criar o wrapper Icon

```tsx
// src/components/Icon/index.tsx
import React from 'react'
import { iconMap } from './map'
import type { IconName } from './names'

export interface IconProps {
  name: IconName
  size?: number
  color?: string
  accessibilityLabel?: string
}

export function Icon({ name, size = 20, color = '#111827', accessibilityLabel }: IconProps) {
  const Component = iconMap[name]
  return <Component size={size} color={color} accessibilityLabel={accessibilityLabel} />
}
```

Cada componente de ícone deve aceitar `size` e `color` e repassar aos elementos `Svg`/`Path`.

## 🔧 Passo 5 — Criar um componente de ícone a partir do SVG

Exemplo com `react-native-svg`. Repita para cada SVG.

```tsx
// src/assets/icon-components/check.tsx
import Svg, { Path } from 'react-native-svg'

interface Props {
  size?: number
  color?: string
  accessibilityLabel?: string
}

export default function Check({ size = 20, color = 'currentColor', accessibilityLabel }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel={accessibilityLabel}>
      <Path
        d="M20 6L9 17l-5-5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  )
}
```

Notas para conversão:
- Preserve o `viewBox` original do SVG.
- Troque cores fixas (`stroke`/`fill`) por `color`.
- Remova width/height fixos do SVG e use `size`.

## ➕ Adicionando um novo ícone (checklist)

1. Coloque `meu-icone.svg` em `src/assets/icons` (opcional, como fonte).
2. Crie `src/assets/icon-components/meu-icone.tsx` seguindo o padrão.
3. Adicione `'meu-icone'` ao `IconName` em `names.ts`.
4. Importe e registre no `iconMap`.
5. Use `<Icon name="meu-icone" />`.

## 🎨 Exemplos de uso

```tsx
import { Icon } from '@/components/Icon'

<Icon name="check" />
<Icon name="trash-2" size={24} color="#EF4444" />
<Icon name="search" accessibilityLabel="Buscar" />
```

## ♿ Acessibilidade

- Forneça `accessibilityLabel` para ícones interativos.
- Se o ícone for meramente decorativo, deixe o pai marcá-lo como tal (ex.: accessible={false}).

## ⚙️ Dicas de performance

- Prefira ícones com `stroke` e poucos paths para bundles menores.
- Mantenha ícones puros e pequenos (sem hooks/estado).
- Centralize cor/tamanho via tokens do design system quando possível.

## ✅ Resumo

- Converta SVGs em componentes TSX que aceitam `size` e `color`.
- Use `IconName` tipado + `iconMap` para uso seguro e descobrível.
- Renderize via um único wrapper `Icon` para API consistente e estilização uniforme.


