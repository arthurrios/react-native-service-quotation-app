# Como Criar um Componente de Input

Este documento explica como criar um componente de Input completo e flexível usando o padrão de composição, similar ao componente Button.

## 📋 Pré-requisitos

- Conhecimento intermediário de React Native
- Familiaridade com TypeScript
- Entendimento de Context API
- Conceitos de composição de componentes

## 🎯 Objetivo

Criar um sistema de input flexível usando composição, onde cada parte (Root, Icon, Prefix, Suffix, Field) pode ser usada independentemente, com herança automática de variantes e estados.

## 📁 Estrutura de Arquivos

```
Input/
├── components/           # Componentes individuais
│   ├── Root.tsx         # Container principal e gerenciador de estado
│   ├── Field.tsx        # Campo de texto
│   ├── Icon.tsx         # Componente de ícone
│   ├── Prefix.tsx       # Prefixo (ex: R$)
│   └── Suffix.tsx       # Sufixo (ex: %)
├── hooks/               # Hooks e contexto
│   └── InputContext.tsx # Context para herança de variantes
├── types/               # Definições de tipos
│   └── index.ts         # Todos os tipos centralizados
├── Input.tsx            # Componente composto principal
├── styles.ts            # Estilos compartilhados
└── index.tsx            # Exportações organizadas
```

## 🛠️ Implementação Passo a Passo

### 1. Definir Tipos

```typescript
// types/index.ts
import { DimensionValue, TextInputProps } from 'react-native'
import { IconName } from '@/components/Icon'

// Variantes do input (empty, filled, danger, percentage)
export type InputVariant = 'empty' | 'filled' | 'danger' | 'percentage'

// Estados do input (default, focus)
export type InputState = 'default' | 'focus'

// Props base que todos os componentes compartilham
export interface BaseInputProps
  extends Omit<TextInputProps, 'onFocus' | 'onBlur'> {
  variant?: InputVariant
  onFocus?: () => void
  onBlur?: () => void
}

// Props do componente Root (container)
export interface InputRootProps extends BaseInputProps {
  children: React.ReactNode
  width?: DimensionValue
}

// Props do componente Icon
export interface InputIconProps {
  name: IconName
  variant?: InputVariant  // Override opcional
  state?: InputState      // Override opcional
  size?: number
}

// Props do componente Field (TextInput)
export interface InputFieldProps extends TextInputProps {
  variant?: InputVariant
  state?: InputState
}

// Props do componente Prefix
export interface InputPrefixProps {
  children: React.ReactNode
  variant?: InputVariant
  state?: InputState
}

// Props do componente Suffix
export interface InputSuffixProps {
  children: React.ReactNode
  variant?: InputVariant
  state?: InputState
}

// Props do componente legado (para compatibilidade)
export interface InputProps extends BaseInputProps {
  icon?: IconName
  prefix?: string
  suffix?: string
  placeholder?: string
  width?: DimensionValue
}
```

**Explicação:**
- `InputVariant`: Define os 4 estilos visuais diferentes
- `InputState`: Controla o estado de foco
- `BaseInputProps`: Herda props do TextInput mas customiza onFocus/onBlur
- Cada componente tem props próprias mas pode herdar de context

### 2. Criar Context

```typescript
// hooks/InputContext.tsx
import { createContext, useContext } from 'react'
import { InputState, InputVariant } from '../types'

interface InputContextValue {
  variant: InputVariant
  state: InputState
  setState: (state: InputState) => void
  handleFocus: () => void
  handleBlur: () => void
}

const InputContext = createContext<InputContextValue | null>(null)

export function useInputContext() {
  const context = useContext(InputContext)
  if (!context) {
    throw new Error('Input components must be used within an Input.Root')
  }
  return context
}

export { InputContext }
```

**Explicação:**
- Armazena variante e estado atual
- Fornece funções para gerenciar estado de foco
- Validação garante que componentes filhos só sejam usados dentro de Root

### 3. Implementar Root Component

```typescript
// components/Root.tsx
import { useState } from 'react'
import { View } from 'react-native'
import { InputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputRootProps, InputState } from '../types'

export function Root({
  children,
  variant = 'empty',
  width,
  onFocus,
  onBlur,
  ...props
}: InputRootProps) {
  const [state, setState] = useState<InputState>('default')

  const handleFocus = () => {
    setState('focus')
    onFocus?.()
  }

  const handleBlur = () => {
    setState('default')
    onBlur?.()
  }

  const containerStyle = {
    ...styles.container,
    ...styles[variant],
    ...(state === 'focus' && styles.focus),
    ...(width && { width }),
  }

  return (
    <InputContext.Provider
      value={{ variant, state, setState, handleFocus, handleBlur }}
    >
      <View style={containerStyle} {...props}>
        {children}
      </View>
    </InputContext.Provider>
  )
}
```

**Explicação:**
- Gerencia estado interno (default/focus)
- Combina estilos base + variante + estado de foco
- Fornece context para todos os filhos
- Permite width customizado

### 4. Implementar Field Component

```typescript
// components/Field.tsx
import { NativeSyntheticEvent, TargetedEvent, TextInput } from 'react-native'
import { useInputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputFieldProps } from '../types'

export function Field({
  variant,
  state,
  style,
  onFocus,
  onBlur,
  ...props
}: InputFieldProps) {
  const context = useInputContext()
  const finalVariant = variant || context.variant

  const textInputStyle = [
    finalVariant === 'percentage'
      ? styles.percentageTextInput
      : styles.textInput,
    finalVariant === 'percentage' && { textAlign: 'center' as const },
    style,
  ]

  const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
    context.handleFocus()
    onFocus?.(e)
  }

  const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
    context.handleBlur()
    onBlur?.(e)
  }

  return (
    <TextInput
      style={textInputStyle}
      placeholderTextColor={styles.placeholderText.color}
      keyboardType={finalVariant === 'percentage' ? 'numeric' : 'default'}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  )
}
```

**Explicação:**
- Conecta ao context para herdar variant/state
- Lida com eventos de foco e propaga para Root
- Aplica estilos específicos para variante percentage
- Converte para teclado numérico quando necessário

### 5. Implementar Icon Component

```typescript
// components/Icon.tsx
import { Icon as IconComponent } from '../../Icon'
import { useInputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputIconProps } from '../types'

export function Icon({ name, variant, state, size = 20 }: InputIconProps) {
  const context = useInputContext()
  const finalVariant = variant || context.variant
  const finalState = state || context.state

  const iconColorKey = `${finalVariant}${finalState === 'focus' ? 'Focus' : ''}NestedComponentColor`
  const iconColor = (
    styles[iconColorKey as keyof typeof styles] as { color: string }
  ).color

  return <IconComponent name={name} size={size} color={iconColor} />
}
```

**Explicação:**
- Herda variant e state do context
- Gera nome de estilo dinâmico baseado em variant + state
- Cor muda quando input está em foco

### 6. Implementar Prefix e Suffix

```typescript
// components/Prefix.tsx
import { Text } from 'react-native'
import { useInputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputPrefixProps } from '../types'

export function Prefix({ children, variant, state }: InputPrefixProps) {
  const context = useInputContext()
  const finalVariant = variant || context.variant
  const finalState = state || context.state

  const prefixColorKey = `${finalVariant}${finalState === 'focus' ? 'Focus' : ''}NestedComponentColor`
  const prefixStyle = styles[prefixColorKey as keyof typeof styles] as {
    color: string
  }

  return <Text style={[prefixStyle, styles.prefixText]}>{children}</Text>
}

// components/Suffix.tsx - Mesma lógica do Prefix
```

**Explicação:**
- Prefix e Suffix seguem mesma lógica de cores
- Mudam de cor quando input foca
- Usam mesma chave de estilo dinâmica

### 7. Criar Componente Composto

```typescript
// Input.tsx
import { Field } from './components/Field'
import { Icon } from './components/Icon'
import { Prefix } from './components/Prefix'
import { Root } from './components/Root'
import { Suffix } from './components/Suffix'
import { InputProps } from './types'

// Componente legado (para compatibilidade)
function Input({
  icon,
  prefix,
  suffix,
  placeholder,
  variant = 'empty',
  width,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  return (
    <Root
      variant={variant}
      width={variant === 'percentage' ? 90 : width}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    >
      {icon && <Icon name={icon} />}
      {prefix && <Prefix>{prefix}</Prefix>}
      <Field placeholder={placeholder} />
      {suffix && <Suffix>{suffix}</Suffix>}
      {variant === 'percentage' && <Suffix>%</Suffix>}
    </Root>
  )
}

// Criar componente composto
const InputCompound = Object.assign(Input, {
  Root,
  Icon,
  Prefix,
  Suffix,
  Field,
})

export { InputCompound as Input }
```

**Explicação:**
- Componente legado permite uso simples
- Compõe automaticamente todos os sub-componentes
- Variant percentage adiciona "%" automaticamente
- Object.assign cria API composta (Input.Root, Input.Field, etc)

### 8. Criar Estilos

```typescript
// styles.ts
import { StyleSheet, ViewStyle } from 'react-native'
import { colors, textStyles, typography } from '@/styles'

const baseInputStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 999,
  paddingHorizontal: 16,
  height: 48,
  gap: 8,
}

export const styles = StyleSheet.create({
  // Container base
  container: {
    ...baseInputStyle,
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
  },

  // Variantes
  empty: {
    borderColor: colors.gray[300],
  },
  
  filled: {
    borderColor: colors.purple.base,
  },
  
  danger: {
    borderColor: colors.danger.base,
  },
  
  percentage: {
    borderColor: colors.gray[300],
  },

  // Estado de foco
  focus: {
    borderColor: colors.purple.base,
  },

  // Cores dinâmicas para nested components
  emptyNestedComponentColor: {
    color: colors.gray[600],
  },
  emptyFocusNestedComponentColor: {
    color: colors.purple.base,
  },
  
  filledNestedComponentColor: {
    color: colors.gray[600],
  },
  filledFocusNestedComponentColor: {
    color: colors.purple.base,
  },
  
  dangerNestedComponentColor: {
    color: colors.danger.base,
  },
  dangerFocusNestedComponentColor: {
    color: colors.danger.base,
  },

  // Text input
  textInput: {
    flex: 1,
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
  },

  percentageTextInput: {
    flex: 1,
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
    textAlign: 'center',
  },

  prefixText: {
    fontFamily: typography.fontFamily.bold,
    ...typography.text.md,
  },

  placeholderText: {
    color: colors.gray[500],
  },
})
```

**Explicação:**
- Base style define layout comum
- Variantes mudam cor da borda
- Focus sobrescreve cor da borda
- NestedComponentColor usado para ícones, prefix, suffix
- TextInput usa flex: 1 para ocupar espaço disponível

## 🎨 Como Usar

### Padrão de Composição (Recomendado)

```tsx
import { Input } from '@/components'

// Input básico
<Input.Root variant="empty">
  <Input.Field placeholder="Digite algo..." />
</Input.Root>

// Com ícone
<Input.Root variant="empty">
  <Input.Icon name="search" />
  <Input.Field placeholder="Buscar..." />
</Input.Root>

// Com prefix
<Input.Root variant="filled">
  <Input.Prefix>R$</Input.Prefix>
  <Input.Field placeholder="0,00" />
</Input.Root>

// Com suffix
<Input.Root variant="empty">
  <Input.Field placeholder="100" />
  <Input.Suffix>%</Input.Suffix>
</Input.Root>

// Percentual (automático)
<Input.Root variant="percentage">
  <Input.Field placeholder="0" />
</Input.Root>

// Tudo junto
<Input.Root variant="empty">
  <Input.Icon name="credit-card" />
  <Input.Prefix>R$</Input.Prefix>
  <Input.Field placeholder="0,00" />
  <Input.Suffix>,00</Input.Suffix>
</Input.Root>
```

### Padrão Legado (Compatibilidade)

```tsx
import { Input } from '@/components'

// Básico
<Input placeholder="Nome" />

// Com ícone
<Input icon="search" placeholder="Buscar..." />

// Com prefix
<Input prefix="R$" placeholder="0,00" />

// Percentual
<Input variant="percentage" placeholder="0" />
```

## 🔍 Conceitos Importantes

### Gerenciamento de Estado

O Root gerencia estado interno de foco. Quando Field é focado:
1. Field dispara `onFocus`
2. Root atualiza state para 'focus'
3. Context atualiza para todos filhos
4. Cores dos nested components mudam

### Naming de Estilos

Estilos para nested components seguem padrão:
```
{variant}NestedComponentColor
{variant}FocusNestedComponentColor
```

Por exemplo:
- `emptyNestedComponentColor`
- `emptyFocusNestedComponentColor`

### Herança Automática

Componentes filhos herdam automaticamente:
- `variant` do Root
- `state` do Root (default/focus)

Mas podem fazer override se necessário.

## ✅ Vantagens

1. **Flexibilidade**: Combine componentes como quiser
2. **Herança Automática**: Variant e state propagam sozinhos
3. **Type Safety**: TypeScript previne erros
4. **Reusabilidade**: Use partes individualmente
5. **Variantes**: 4 estilos prontos (empty, filled, danger, percentage)
6. **Feedback Visual**: Estado de foco muda cores automaticamente

## 🎯 Conclusão

O Input component oferece:
- **Padrão de composição** para máxima flexibilidade
- **Herança automática** de variantes e estados
- **4 variantes** prontas para uso
- **Feedback visual** de foco
- **API dupla**: Composição + Legacy

Ideal para formulários complexos, inputs de valores monetários, porcentagens e qualquer caso onde você precisa de máximo controle sobre o layout.
