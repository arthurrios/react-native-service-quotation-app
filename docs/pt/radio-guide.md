# Como Criar um Componente de Radio

Este documento explica como criar um sistema completo de Radio em React Native, incluindo o componente visual e um hook customizado para gerenciar o estado. O componente Radio é similar ao Checkbox, mas permite apenas uma seleção por grupo.

## 📋 Pré-requisitos

- Conhecimento básico de React Native
- Familiaridade com TypeScript
- Entendimento de hooks no React
- Conhecimento básico de componentes e props

## 🎯 Objetivo

Criar um sistema de radio button completo e reutilizável que:
- Permite apenas uma seleção por grupo
- Armazena valores tipados (strings, enums, objetos)
- Gerencia estado de forma simples
- Retorna apenas o valor selecionado (sem componentes React)

## 📁 Estrutura de Arquivos

```
Radio/
├── index.tsx           # Componente visual do radio button
├── types.ts            # Definições de tipos
├── styles.ts           # Estilos do componente
├── useRadio.ts         # Hook para gerenciar estado de seleção
└── index.ts            # Exportações
```

## 🛠️ Implementação Passo a Passo

### 1. Criar a Estrutura

**Primeiro, crie a pasta do componente Radio:**
```bash
mkdir -p src/components/Radio
```

### 2. Definir os Tipos

**Crie o arquivo `src/components/Radio/types.ts`:**

Neste arquivo, você deve definir:

```typescript
import { TouchableOpacityProps } from 'react-native'

export interface RadioProps extends TouchableOpacityProps {
  label: string | React.ReactNode  // Texto ou componente React
  selected?: boolean               // Se está selecionado
  onSelect?: () => void            // Função chamada ao clicar
  disabled?: boolean               // Se está desabilitado
}

export interface UseRadioReturn<T> {
  selectedValue: T | null          // Valor selecionado (único)
  isSelected: (value: T) => boolean // Verifica se valor está selecionado
  select: (value: T) => void       // Seleciona um valor
  reset: () => void                // Remove seleção
}

export function useRadio<T>(
  initialValue: T | null = null,
  compareFn?: (a: T, b: T) => boolean,
): UseRadioReturn<T>
```

**Dica:** O hook `useRadio` será MUITO similar ao `useCheckbox`, mas:
- Ao invés de array (`T[]`), retorna um único valor (`T | null`)
- Ao invés de `toggle`, usa `select` (que sempre substitui o valor anterior)
- Não precisa de funções como `toggleAll`, `selectAll`, etc.

### 3. Criar os Estilos

**Crie o arquivo `src/components/Radio/styles.ts`:**

Consulte o design da imagem fornecida. O radio deve ser:
- Um **círculo** (não um quadrado como checkbox)
- Quando não selecionado: círculo vazio com borda cinza
- Quando selecionado: círculo com ponto preenchido roxo no centro

**Referência visual:**
- **radio / default**: Círculo vazio, borda cinza
- **radio / selected**: Círculo com ponto roxo central

```typescript
import { StyleSheet } from 'react-native'
import { textStyles } from '@/styles'
import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10, // 10 = totalmente circular (metade de 20)
    borderWidth: 1,
    borderColor: colors.gray[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.purple.base,
    backgroundColor: colors.purple.base, // Fundo roxo quando selecionado
  },
  radioInner: {
    width: 8, // Ponto interno menor (8x8)
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.white, // Ponto branco no centro
  },
  label: {
    ...textStyles.textMd,
    color: colors.gray[600],
    flex: 1,
  },
  labelDisabled: {
    color: colors.gray[400],
  },
})
```

### 4. Implementar o Componente Radio

**Crie o arquivo `src/components/Radio/index.tsx`:**

Estrutura similar ao Checkbox, mas:
- Círculo ao invés de quadrado
- Mostra um ponto interno quando selecionado
- Não usa ícone de check

**Lógica:**
```typescript
{selected && <View style={styles.radioInner} />}
```

### 5. Implementar o Hook useRadio

**Crie o arquivo `src/components/Radio/useRadio.ts`:**

**Diferença chave do useCheckbox:**
- Estado: `useState<T | null>(null)` (não é array)
- `isSelected`: compara com um único valor
- `select`: substitui o valor anterior (não adiciona)
- Não precisa de `toggle` (radio não alterna, sempre seleciona)

**Pseudocódigo:**
```typescript
const [selectedValue, setSelectedValue] = useState<T | null>(initialValue)

const isSelected = (value: T) => {
  return compare(selectedValue, value)
}

const select = (value: T) => {
  setSelectedValue(value)  // Sempre substitui
}

const reset = () => {
  setSelectedValue(null)
}
```

### 6. Configurar Exportações

**Crie o arquivo `src/components/Radio/index.ts`:**

Exporta:
- `Radio` (componente)
- `useRadio` (hook)
- Types

## 🎨 Como Usar (Após Implementar)

### Exemplo com Strings

```tsx
const options = [
  { value: 'option1', label: 'Opção 1' },
  { value: 'option2', label: 'Opção 2' },
]

function MyComponent() {
  const { selectedValue, isSelected, select } = useRadio<string>()

  return (
    <View>
      {options.map((item) => (
        <Radio
          key={item.value}
          label={item.label}
          selected={isSelected(item.value)}
          onSelect={() => select(item.value)}
        />
      ))}
      <Text>Selecionado: {selectedValue || 'Nenhum'}</Text>
    </View>
  )
}
```

### Exemplo com Enums e Status

```tsx
const statusOptions = [
  { value: StatusType.SENT, label: <Status status={StatusType.SENT} /> },
  { value: StatusType.DRAFT, label: <Status status={StatusType.DRAFT} /> },
  // ...
]

function MyComponent() {
  const { selectedValue, isSelected, select } = useRadio<StatusType>()

  return (
    <View>
      {statusOptions.map((item) => (
        <Radio
          key={item.value}
          label={item.label}
          selected={isSelected(item.value)}
          onSelect={() => select(item.value)}
        />
      ))}
    </View>
  )
}
```

## 🔍 Diferenças do Checkbox

| Aspecto | Checkbox | Radio |
|---------|----------|-------|
| **Estado** | Array de valores | Valor único ou null |
| **Seleções** | Múltiplas | Uma única |
| **Visual** | Quadrado com check | Círculo com ponto |
| **Toggle** | Alterna entre selecionado/deselecionado | Sempre seleciona (não deseleciona clicando novamente) |
| **Hook retorna** | `checkedValues: T[]` | `selectedValue: T \| null` |
| **Funções** | toggle, toggleAll, selectAll, etc. | select, reset |

## ✅ Checklist de Implementação

1. [ ] Criar pasta `src/components/Radio`
2. [ ] Criar `types.ts` com as interfaces
3. [ ] Criar `styles.ts` com estilos circulares
4. [ ] Implementar `index.tsx` com componente visual
5. [ ] Implementar `useRadio.ts` com lógica de seleção única
6. [ ] Criar `index.ts` com exportações
7. [ ] Testar em `Home.tsx` com um grupo de radios

## 🎯 Dicas de Implementação

1. **Forma Circular**: Use `borderRadius: 10` em um elemento de 20x20 para criar um círculo perfeito
2. **Ponto Central**: O ponto interno deve ter 8x8 com fundo branco para criar o efeito visual
3. **Background Roxo**: Quando selecionado, o círculo externo tem fundo roxo (`backgroundColor: colors.purple.base`)
4. **Estado Único**: Radio sempre mantém um único valor selecionado
5. **Sem Alternar**: Ao clicar em um radio já selecionado, nada acontece (diferente do checkbox)

Boa implementação! 🚀
