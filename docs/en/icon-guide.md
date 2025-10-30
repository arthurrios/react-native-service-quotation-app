# How to Create an SVG Icon Component (React Native)

This guide explains, step by step, how to build a typed, flexible Icon system using SVGs with react-native-svg. Use it to power consistent icons across your app with color/size control and tree‑shakable icon imports.

## 📋 Prerequisites

- React Native project configured
- `react-native-svg` installed
- Basic TypeScript knowledge

Recommended:
- Keep raw SVGs in a single folder (e.g., `src/assets/icons`)
- Convert SVGs into React components (`src/assets/icon-components`)

## 🧱 File Structure

```
src/
├── assets/
│   ├── icons/                 # Raw .svg files (source of truth)
│   └── icon-components/       # TSX components (one per icon)
│       ├── check.tsx
│       ├── search.tsx
│       └── ...
└── components/
    └── Icon/
        ├── index.tsx          # Icon wrapper (public component)
        ├── names.ts           # IconName union type (generated or manual)
        └── map.ts             # name -> component map
```

This repo already includes `src/assets/icon-components` and `src/components/Icon` — this guide explains the pattern and how to extend it safely.

## 🔧 Step 1 — Install dependency

```bash
pnpm add react-native-svg
```

On iOS, CocoaPods will already be integrated via autolinking in modern RN versions.

## 🔧 Step 2 — Create typed IconName

```ts
// src/components/Icon/names.ts
export type IconName =
  | 'check'
  | 'search'
  | 'trash-2'
  | 'edit-pen'
  | 'chevron-left'
  | 'chevron-right'
  // add new names here as you create icons

```

Tip: You can generate this union from files in `src/assets/icon-components` to avoid drift.

## 🔧 Step 3 — Map names to components

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

Why use direct imports instead of dynamic requires? It enables tree‑shaking so only used icons are bundled.

## 🔧 Step 4 — Build the Icon wrapper

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

Each icon component should accept `size` and `color` props and forward them to `Svg`/`Path` elements.

## 🔧 Step 5 — Create an icon component from SVG

Example using `react-native-svg` primitives. Repeat for each SVG.

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

Notes for conversion:
- Keep the original `viewBox` from the SVG.
- Replace hardcoded stroke/fill with `color`.
- Remove width/height from raw SVGs and bind to `size`.

## ➕ Adding a new icon (checklist)

1. Drop `my-icon.svg` in `src/assets/icons` (optional source storage).
2. Create `src/assets/icon-components/my-icon.tsx` using the pattern above.
3. Add `'my-icon'` to `IconName` in `names.ts`.
4. Import and register in `iconMap`.
5. Use `<Icon name="my-icon" />`.

## 🎨 Usage examples

```tsx
import { Icon } from '@/components/Icon'

<Icon name="check" />
<Icon name="trash-2" size={24} color="#EF4444" />
<Icon name="search" accessibilityLabel="Search" />
```

## ♿ Accessibility

- Provide `accessibilityLabel` for interactive icons.
- If an icon is purely decorative, let the parent mark it as such (e.g., accessible={false}).

## ⚙️ Performance tips

- Prefer stroke icons with few paths for smaller bundles.
- Keep icon components small and pure (no hooks, no state).
- Centralize color/size through your design system tokens when possible.

## ✅ Summary

- Convert SVGs into TSX components that accept `size` and `color`.
- Use a typed `IconName` + `iconMap` to keep usage safe and discoverable.
- Render through a single `Icon` wrapper for consistent API and styling.


