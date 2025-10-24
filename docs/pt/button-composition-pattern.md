# Como Criar um Componente de Botão - Padrão de Composição

Este documento explica como criar um componente de botão usando o padrão de composição, ideal para desenvolvedores que precisam de máxima flexibilidade e reutilização de componentes.

## 📋 Pré-requisitos

- Conhecimento intermediário de React Native
- Familiaridade com TypeScript avançado
- Entendimento de Context API
- Conceitos de composição de componentes

## 🎯 Objetivo

Criar um sistema de botão flexível usando composição, onde cada parte (Root, Icon, Title) pode ser usada independentemente, com herança automática de variantes.

## 📁 Estrutura de Arquivos

```
Button/
├── components/           # Componentes individuais
│   ├── Root.tsx         # Container principal
│   ├── Icon.tsx         # Componente de ícone
│   └── Title.tsx         # Componente de texto
├── hooks/               # Hooks e contexto
│   └── ButtonContext.tsx # Context para herança de variantes
├── types/               # Definições de tipos
│   └── index.ts         # Todos os tipos centralizados
├── Button.tsx           # Componente composto principal
├── styles.ts            # Estilos compartilhados
└── index.ts             # Exportações organizadas
```

## 🛠️ Implementação Passo a Passo

### 1. Definir os Tipos Centralizados

```typescript
// types/index.ts
import { TouchableOpacityProps } from 'react-native'
import { IconName } from '../../Icon'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export interface BaseButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
}

export interface ButtonRootProps extends BaseButtonProps {
  children: React.ReactNode
}

export interface ButtonIconProps {
  name: IconName
  variant?: ButtonVariant // Override opcional
  size?: number
}

export interface ButtonTextProps {
  children: React.ReactNode
  variant?: ButtonVariant // Override opcional
}

export interface ButtonProps extends BaseButtonProps {
  title: string
  icon?: IconName
}

export interface IconButtonProps extends BaseButtonProps {
  icon: IconName
}
```

### 2. Criar o Context para Herança de Variantes

```typescript
// hooks/ButtonContext.tsx
import { createContext, useContext } from 'react'
import { ButtonVariant } from '../types'

interface ButtonContextValue {
  variant: ButtonVariant
}

const ButtonContext = createContext<ButtonContextValue | null>(null)

export function useButtonContext() {
  const context = useContext(ButtonContext)
  if (!context) {
    throw new Error('Componentes Button devem ser usados dentro de Button.Root')
  }
  return context
}

export { ButtonContext }
```

### 3. Implementar o Componente Root

```typescript
// components/Root.tsx
import { TouchableOpacity } from 'react-native'
import { ButtonContext } from '../hooks/ButtonContext'
import { styles } from '../styles'
import { ButtonRootProps } from '../types'

function Root({ children, variant = 'primary', ...props }: ButtonRootProps) {
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  return (
    <ButtonContext.Provider value={{ variant }}>
      <TouchableOpacity style={containerStyle} {...props}>
        {children}
      </TouchableOpacity>
    </ButtonContext.Provider>
  )
}

export { Root }
```

### 4. Implementar o Componente Icon

```typescript
// components/Icon.tsx
import { Icon as IconComponent } from '../../Icon'
import { useButtonContext } from '../hooks/ButtonContext'
import { styles } from '../styles'
import { ButtonIconProps } from '../types'

function Icon({ name, variant, size = 24 }: ButtonIconProps) {
  const context = useButtonContext()
  const finalVariant = variant || context.variant
  const iconColor = styles[`${finalVariant}IconColor`].color

  return <IconComponent name={name} size={size} color={iconColor} />
}

export { Icon }
```

### 5. Implementar o Componente Title

```typescript
// components/Title.tsx
import { Text } from 'react-native'
import { useButtonContext } from '../hooks/ButtonContext'
import { styles } from '../styles'
import { ButtonTextProps } from '../types'

function Title({ children, variant }: ButtonTextProps) {
  const context = useButtonContext()
  const finalVariant = variant || context.variant
  const textStyle = styles[`${finalVariant}Text`]

  return <Text style={textStyle}>{children}</Text>
}

export { Title }
```

### 6. Criar o Componente Composto Principal

```typescript
// Button.tsx
import { Icon } from './components/Icon'
import { Root } from './components/Root'
import { Title } from './components/Title'
import { ButtonProps, IconButtonProps } from './types'

// Componente legado para compatibilidade
function Button({ title, variant = 'primary', icon, ...props }: ButtonProps) {
  return (
    <Root variant={variant} {...props}>
      {icon && <Icon name={icon} />}
      <Title>{title}</Title>
    </Root>
  )
}

// Componente IconButton legado
function IconButton({ icon, variant = 'primary', ...props }: IconButtonProps) {
  return (
    <Root variant={variant} {...props}>
      <Icon name={icon} />
    </Root>
  )
}

// Criar componente composto
const ButtonCompound = Object.assign(Button, {
  Root,
  Icon,
  Title,
})

export { ButtonCompound as Button, IconButton }
```

### 7. Configurar as Exportações

```typescript
// index.ts
// Componente composto principal
export { Button, IconButton } from './Button'

// Componentes individuais (para importação direta se necessário)
export { Root } from './components/Root'
export { Icon } from './components/Icon'
export { Title } from './components/Title'

// Hooks
export { useButtonContext } from './hooks/ButtonContext'

// Tipos
export type {
  ButtonVariant,
  BaseButtonProps,
  ButtonProps,
  IconButtonProps,
  ButtonRootProps,
  ButtonIconProps,
  ButtonTextProps,
} from './types'
```

## 🎨 Como Usar

### Padrão de Composição (Recomendado)

```tsx
import { Button } from '@/components'

// Botão básico - filhos herdam variante automaticamente
<Button.Root variant="primary" onPress={handlePress}>
  <Button.Title>Salvar</Button.Title>
</Button.Root>

// Botão com ícone e texto - sem necessidade de passar variante
<Button.Root variant="secondary" onPress={handlePress}>
  <Button.Icon name="check" />
  <Button.Title>Confirmar</Button.Title>
</Button.Root>

// Botão apenas com ícone
<Button.Root variant="danger" onPress={handleDelete}>
  <Button.Icon name="trash-2" />
</Button.Root>

// Composição customizada
<Button.Root variant="primary" onPress={handlePress}>
  <Button.Icon name="plus" size={20} />
  <Button.Title>Adicionar Item</Button.Title>
  <Button.Icon name="direction-up-right" size={16} />
</Button.Root>
```

### Override de Variante (Opcional)

```tsx
// Você ainda pode sobrescrever variante para filhos específicos
<Button.Root variant="primary" onPress={handlePress}>
  <Button.Icon name="check" variant="secondary" />
  <Button.Title>Variantes Misturadas</Button.Title>
</Button.Root>
```

### Padrão Legado (Ainda Suportado)

```tsx
import { Button, IconButton } from '@/components'

// Botão de texto com ícone opcional
<Button title="Salvar" variant="primary" icon="check" onPress={handlePress} />

// Botão apenas com ícone
<IconButton icon="trash-2" variant="danger" onPress={handleDelete} />
```

## ✅ Vantagens do Padrão de Composição

### 1. **Herança Automática de Variantes**
- Filhos automaticamente herdam a variante do pai
- API mais limpa - não precisa passar variante para cada filho
- Reduz erros de inconsistência

### 2. **Máxima Flexibilidade**
- Pode misturar e combinar componentes como necessário
- Fácil adicionar elementos customizados entre componentes
- Permite layouts complexos e criativos

### 3. **Reutilização de Componentes**
- Cada componente pode ser usado independentemente
- Fácil criar variações específicas
- Componentes são testáveis individualmente

### 4. **Type Safety Avançado**
- Cada componente tem props específicas e bem tipadas
- Context validation garante uso correto
- IntelliSense completo

### 5. **Escalabilidade**
- Fácil adicionar novos componentes (ex: Button.Badge)
- Fácil adicionar novas variantes
- Estrutura organizada e manutenível

## 🔧 Personalização Avançada

### Adicionar Novos Componentes

```typescript
// components/Badge.tsx
import { Text } from 'react-native'
import { useButtonContext } from '../hooks/ButtonContext'
import { styles } from '../styles'

interface ButtonBadgeProps {
  children: React.ReactNode
  variant?: ButtonVariant
}

function Badge({ children, variant }: ButtonBadgeProps) {
  const context = useButtonContext()
  const finalVariant = variant || context.variant
  const badgeStyle = styles[`${finalVariant}Badge`]

  return <Text style={badgeStyle}>{children}</Text>
}

export { Badge }
```

### Adicionar Novas Variantes

```typescript
// types/index.ts
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'warning'

// styles.ts
success: {
  backgroundColor: colors.success.base,
},

warning: {
  backgroundColor: colors.warning.base,
},
```

### Criar Hooks Customizados

```typescript
// hooks/useButtonVariant.ts
import { useButtonContext } from './ButtonContext'

export function useButtonVariant() {
  const { variant } = useButtonContext()
  
  return {
    variant,
    isPrimary: variant === 'primary',
    isSecondary: variant === 'secondary',
    isDanger: variant === 'danger',
  }
}
```

## 📝 Exemplo Completo

```tsx
// Exemplo de uso em uma tela
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@/components'

export function HomeScreen() {
  const handleSave = () => console.log('Salvando...')
  const handleCancel = () => console.log('Cancelando...')
  const handleDelete = () => console.log('Excluindo...')

  return (
    <View style={styles.container}>
      {/* Padrão de composição */}
      <Button.Root variant="primary" onPress={handleSave}>
        <Button.Icon name="check" />
        <Button.Title>Salvar</Button.Title>
      </Button.Root>

      <Button.Root variant="secondary" onPress={handleCancel}>
        <Button.Title>Cancelar</Button.Title>
      </Button.Root>

      <Button.Root variant="danger" onPress={handleDelete}>
        <Button.Icon name="trash-2" />
      </Button.Root>

      {/* Composição customizada */}
      <Button.Root variant="primary" onPress={handleSave}>
        <Button.Icon name="plus" size={20} />
        <Button.Title>Adicionar</Button.Title>
        <Button.Icon name="direction-up-right" size={16} />
      </Button.Root>

      {/* Padrão legado ainda funciona */}
      <Button title="Salvar Rápido" variant="primary" onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
})
```

## 🎯 Quando Usar o Padrão de Composição

### ✅ Ideal Para:
- Projetos grandes e complexos
- Equipes experientes
- Quando você precisa de máxima flexibilidade
- Sistemas de design complexos
- Componentes que serão reutilizados extensivamente

### ⚠️ Considere o Padrão Legado Se:
- Projeto pequeno ou MVP
- Equipe iniciante
- Precisa de solução rápida
- Não precisa de flexibilidade avançada

## 🎯 Conclusão

O padrão de composição oferece:
- **Máxima flexibilidade** para layouts complexos
- **Herança automática** de variantes
- **Componentes reutilizáveis** e testáveis
- **Type safety** avançado
- **Escalabilidade** para projetos grandes

É a escolha ideal para sistemas de design robustos e aplicações que precisam de componentes altamente customizáveis.
