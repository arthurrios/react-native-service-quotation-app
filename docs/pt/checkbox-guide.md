# Como Criar um Componente de Checkbox

Este documento explica como criar um sistema completo de Checkbox em React Native, incluindo o componente visual e um hook customizado para gerenciar o estado.

## 📋 Pré-requisitos

- Conhecimento básico de React Native
- Familiaridade com TypeScript
- Entendimento de hooks no React
- Conhecimento básico de componentes e props

## 🎯 Objetivo

Criar um sistema de checkbox completo e reutilizável que:
- Permite múltiplas seleções
- Armazena valores tipados (strings, enums, objetos)
- Gerencia estado de forma simples
- Retorna apenas os valores selecionados (sem componentes React)

## 📁 Estrutura de Arquivos

```
Checkbox/
├── index.tsx           # Componente visual do checkbox
├── types.ts            # Definições de tipos
├── styles.ts           # Estilos do componente
├── useCheckbox.ts      # Hook para gerenciar estado
└── index.ts            # Exportações
```

## 🛠️ Implementação Passo a Passo

### 1. Definir os Tipos

Primeiro, vamos criar os tipos que definem as props do nosso componente:

```typescript
// types.ts
import { TouchableOpacityProps } from 'react-native'

export interface CheckboxProps extends TouchableOpacityProps {
  label: string | React.ReactNode  // Texto ou componente React
  checked?: boolean                // Se está marcado
  onToggle?: () => void            // Função chamada ao clicar
  disabled?: boolean               // Se está desabilitado
}
```

**Explicação:**
- `CheckboxProps` estende `TouchableOpacityProps` para receber todas as props padrão do TouchableOpacity
- `label` pode ser string ou ReactNode para permitir componentes customizados
- `checked` controla o estado visual
- `onToggle` é chamada quando o usuário clica no checkbox
- `disabled` desabilita interação

### 2. Criar os Estilos

```typescript
// styles.ts
import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  // Container que envolve checkbox e label
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,  // Espaço entre checkbox e label
  },
  
  // Caixa do checkbox (não marcado)
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[300],
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Checkbox quando marcado
  checkboxChecked: {
    backgroundColor: colors.purple.base,
    borderColor: colors.purple.base,
  },
  
  // Container interno do checkmark
  checkmark: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Texto do checkmark (✓)
  checkmarkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  
  // Estilo do label
  label: {
    ...textStyles.textMd,
    color: colors.gray[700],
    flex: 1,
  },
  
  // Label desabilitado
  labelDisabled: {
    color: colors.gray[400],
  },
})
```

**Explicação:**
- `container`: usa `flexDirection: 'row'` para colocar checkbox e label lado a lado
- `checkbox`: tem tamanho fixo e borda para criar o quadrado
- `checkboxChecked`: sobrescreve cores quando marcado
- `checkmark`: centraliza o ícone de check dentro do checkbox
- `label`: estilos de texto com cor padrão
- `labelDisabled`: cor mais clara quando desabilitado

### 3. Implementar o Componente Checkbox

```typescript
// index.tsx
import { Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles'
import { Icon } from '../Icon'
import { styles } from './styles'
import { CheckboxProps } from './types'

export function Checkbox({
  label,
  checked = false,
  onToggle,
  disabled = false,
  ...props
}: CheckboxProps) {
  function handleToggle() {
    if (!disabled) onToggle?.()
  }

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      activeOpacity={0.7}
      onPress={handleToggle}
      {...props}
    >
      {/* Caixa do checkbox */}
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Icon name="check" size={16} color={colors.white} />}
      </View>
      
      {/* Label */}
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}
```

**Explicação:**
- `handleToggle`: só chama `onToggle` se não estiver desabilitado
- `activeOpacity`: reduz opacidade ao tocar para feedback visual
- `[styles.checkbox, checked && styles.checkboxChecked]`: aplica estilo condicional
- Ícone de check só aparece quando `checked` é `true`
- `{label}` renderiza como texto ou componente React

### 4. Criar o Hook useCheckbox

Este é o coração do sistema - um hook que gerencia o estado de seleção:

```typescript
// useCheckbox.ts
import { useCallback, useState } from 'react'

// Tipos de retorno do hook
export interface UseCheckboxReturn<T> {
  checkedValues: T[]              // Array com valores selecionados
  isChecked: (value: T) => boolean // Verifica se valor está selecionado
  toggle: (value: T) => void       // Alterna seleção
  toggleAll: (values: T[]) => void // Alterna todos
  select: (value: T) => void       // Seleciona sem alternar
  deselect: (value: T) => void     // Remove seleção
  selectAll: (values: T[]) => void // Seleciona todos
  deselectAll: () => void          // Remove todas seleções
  reset: () => void                // Volta ao estado inicial
}

export function useCheckbox<T>(
  initialValues: T[] = [],
  compareFn?: (a: T, b: T) => boolean,
): UseCheckboxReturn<T> {
  // Estado que armazena valores selecionados
  const [checkedValues, setCheckedValues] = useState<T[]>(initialValues)

  // Função para comparar valores (padrão usa ===)
  const defaultCompare = (a: T, b: T) => a === b
  const compare = compareFn || defaultCompare

  // Verifica se um valor está selecionado
  const isChecked = useCallback(
    (value: T) => {
      return checkedValues.some((checkedValue) => compare(checkedValue, value))
    },
    [compare, checkedValues],
  )

  // Alterna a seleção de um valor
  const toggle = useCallback(
    (value: T) => {
      setCheckedValues((prev) => {
        const isAlreadyChecked = prev.some((checkedValue) =>
          compare(checkedValue, value),
        )

        // Se já está marcado, remove. Senão, adiciona.
        if (isAlreadyChecked) {
          return prev.filter((checkedValue) => !compare(checkedValue, value))
        } else {
          return [...prev, value]
        }
      })
    },
    [compare],
  )

  // Seleciona um valor (não altera se já estiver selecionado)
  const select = useCallback(
    (value: T) => {
      setCheckedValues((prev) => {
        if (prev.some((checkedValue) => compare(checkedValue, value))) {
          return prev
        }
        return [...prev, value]
      })
    },
    [compare],
  )

  // Remove seleção de um valor
  const deselect = useCallback(
    (value: T) => {
      setCheckedValues((prev) =>
        prev.filter((checkedValue) => !compare(checkedValue, value)),
      )
    },
    [compare],
  )

  // Alterna todos os valores da lista
  const toggleAll = useCallback(
    (values: T[]) => {
      setCheckedValues((prev) => {
        // Verifica se todos estão selecionados
        const allSelected = values.every((value) =>
          prev.some((checkedValue) => compare(checkedValue, value)),
        )

        // Se todos selecionados, desmarca todos. Senão, marca todos.
        if (allSelected) {
          return prev.filter(
            (checkedValue) =>
              !values.some((value) => compare(value, checkedValue)),
          )
        } else {
          const newValues = values.filter(
            (value) => !prev.some((checkedValue) => compare(checkedValue, value)),
          )
          return [...prev, ...newValues]
        }
      })
    },
    [compare],
  )

  // Seleciona todos os valores
  const selectAll = useCallback((values: T[]) => {
    setCheckedValues(() => [...values])
  }, [])

  // Remove todas as seleções
  const deselectAll = useCallback(() => {
    setCheckedValues([])
  }, [])

  // Volta ao estado inicial
  const reset = useCallback(() => {
    setCheckedValues(initialValues)
  }, [initialValues])

  return {
    checkedValues,
    isChecked,
    toggle,
    select,
    deselect,
    toggleAll,
    selectAll,
    deselectAll,
    reset,
  }
}
```

**Explicação detalhada:**
1. **useState**: Armazena array de valores selecionados
2. **compareFn**: Permite comparação customizada (útil para objetos)
3. **isChecked**: Verifica se valor existe no array usando `some()`
4. **toggle**: Adiciona ou remove usando `filter()`
5. **useCallback**: Memoriza funções para evitar re-renders desnecessários

### 5. Configurar Exportações

```typescript
// index.ts
export { Checkbox } from './index'
export { useCheckbox } from './useCheckbox'
export type { CheckboxProps } from './types'
export type { UseCheckboxReturn } from './useCheckbox'
```

## 🎨 Como Usar

### Exemplo 1: Valores Simples (String)

```tsx
import { Checkbox } from '@/components/Checkbox'
import { useCheckbox } from '@/components/Checkbox/useCheckbox'

const services = ['installation', 'maintenance', 'cleaning']

function MyComponent() {
  const { checkedValues, isChecked, toggle } = useCheckbox<string>()

  return (
    <View>
      {services.map((service) => (
        <Checkbox
          key={service}
          label={service}
          checked={isChecked(service)}
          onToggle={() => toggle(service)}
        />
      ))}
      <Text>Selecionados: {checkedValues.join(', ')}</Text>
    </View>
  )
}
```

### Exemplo 2: Valores com Enums

```tsx
import { Checkbox } from '@/components/Checkbox'
import { useCheckbox } from '@/components/Checkbox/useCheckbox'
import { Status, StatusType } from '@/components/Status'

const statuses = [
  StatusType.SENT,
  StatusType.DRAFT,
  StatusType.APPROVED,
]

function MyComponent() {
  const { checkedValues, isChecked, toggle } = useCheckbox<StatusType>()

  return (
    <View>
      {statuses.map((status) => (
        <Checkbox
          key={status}
          label={<Status status={status} />}
          checked={isChecked(status)}
          onToggle={() => toggle(status)}
        />
      ))}
      <Text>Status: {checkedValues.join(', ')}</Text>
    </View>
  )
}
```

### Exemplo 3: Operações Avançadas

```tsx
function MyComponent() {
  const {
    checkedValues,
    isChecked,
    toggle,
    selectAll,
    deselectAll,
  } = useCheckbox<string>()

  const allOptions = ['option1', 'option2', 'option3']

  return (
    <View>
      {/* Botões de controle */}
      <Button onPress={() => selectAll(allOptions)}>
        Selecionar Todos
      </Button>
      <Button onPress={deselectAll}>
        Desmarcar Todos
      </Button>

      {/* Checkboxes */}
      {allOptions.map((option) => (
        <Checkbox
          key={option}
          label={option}
          checked={isChecked(option)}
          onToggle={() => toggle(option)}
        />
      ))}

      {/* Mostrar valores */}
      <Text>Total selecionados: {checkedValues.length}</Text>
    </View>
  )
}
```

## 🔍 Explicação dos Conceitos

### Por que separar componente visual do hook?

1. **Separação de responsabilidades**: Componente só renderiza, hook só gerencia estado
2. **Reutilização**: Hook pode ser usado sem o componente para outros casos
3. **Testabilidade**: Fácil testar lógica separada da UI
4. **Flexibilidade**: Pode usar o estado em contextos sem checkbox visual

### Por que usar generics (<T>)?

```typescript
useCheckbox<string>()      // Para strings
useCheckbox<StatusType>()  // Para enums
useCheckbox<MyObject>()    // Para objetos
```

- TypeScript garante type safety
- `checkedValues` será do tipo correto
- IntelliSense mostra apenas métodos válidos

### Por que usar compareFn?

Quando você tem objetos complexos:

```typescript
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]

// Com compareFn customizada
const { toggle } = useCheckbox<Item>(
  [],
  (a, b) => a.id === b.id  // Compara por ID, não por referência
)

toggle(items[0])  // Funciona corretamente
```

## ✅ Vantagens do Sistema

1. **Type-safe**: TypeScript previne erros
2. **Reutilizável**: Funciona com qualquer tipo de valor
3. **Flexível**: Múltiplas funções de controle
4. **Performático**: useCallback previne re-renders
5. **Simples**: API intuitiva e fácil de usar

## 🎯 Conclusão

Este sistema de checkbox oferece:
- **Componente visual** para renderização
- **Hook customizado** para gerenciar estado
- **Type safety** completo
- **Flexibilidade** para diferentes tipos de valores
- **API simples** e intuitiva

É ideal para formulários, filtros, configurações e qualquer caso onde você precise de múltipla seleção com controle total sobre os valores selecionados.
