# Como Criar um Componente de Botão - Padrão Legado

Este documento explica como criar um componente de botão usando o padrão legado, ideal para desenvolvedores que estão começando com React Native e precisam de uma solução simples e direta.

## 📋 Pré-requisitos

- Conhecimento básico de React Native
- Familiaridade com TypeScript
- Entendimento de props e componentes

## 🎯 Objetivo

Criar um componente de botão reutilizável com diferentes variantes (primary, secondary, danger) que seja fácil de usar e manter.

## 📁 Estrutura de Arquivos

```
Button/
├── Button.tsx      # Componente principal
├── styles.ts       # Estilos do componente
└── index.ts        # Exportações
```

## 🛠️ Implementação Passo a Passo

### 1. Definir os Tipos

Primeiro, vamos definir os tipos para nosso componente:

```typescript
// types/index.ts
export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  icon?: IconName
}
```

### 2. Criar os Estilos

```typescript
// styles.ts
import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'
import { textStyles } from '../../styles/textStyles'

export const styles = StyleSheet.create({
  // Estilo base do container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 50,
    gap: 8,
  },

  // Variantes
  primary: {
    backgroundColor: colors.purple.base,
  },

  secondary: {
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
  },

  danger: {
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
  },

  // Estilos de texto
  primaryText: {
    ...textStyles.titleMd,
    color: 'white',
  },

  secondaryText: {
    ...textStyles.titleMd,
    color: colors.gray[700],
  },

  dangerText: {
    ...textStyles.titleMd,
    color: colors.danger.base,
  },

  // Cores dos ícones
  primaryIconColor: {
    color: 'white',
  },

  secondaryIconColor: {
    color: colors.purple.base,
  },

  dangerIconColor: {
    color: colors.danger.base,
  },
})
```

### 3. Implementar os Componentes

```typescript
// Button.tsx
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Icon, IconName } from '../Icon'
import { styles } from './styles'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: IconName
}

interface IconButtonProps extends TouchableOpacityProps {
  icon: IconName
  variant?: 'primary' | 'secondary' | 'danger'
}

// Componente de botão com texto
export function Button({ 
  title, 
  variant = 'primary', 
  icon, 
  ...props 
}: ButtonProps) {
  // Combinar estilos base com variante
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  // Obter estilo de texto baseado na variante
  const textStyle = styles[`${variant}Text`]
  
  // Obter cor do ícone baseada na variante
  const iconColor = styles[`${variant}IconColor`].color

  return (
    <TouchableOpacity style={containerStyle} {...props}>
      {icon && <Icon name={icon} size={24} color={iconColor} />}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

// Componente de botão apenas com ícone
export function IconButton({ 
  icon, 
  variant = 'primary', 
  ...props 
}: IconButtonProps) {
  // Combinar estilos base com variante
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  // Obter cor do ícone baseada na variante
  const iconColor = styles[`${variant}IconColor`].color

  return (
    <TouchableOpacity style={containerStyle} {...props}>
      <Icon name={icon} size={24} color={iconColor} />
    </TouchableOpacity>
  )
}
```

### 4. Configurar as Exportações

```typescript
// index.ts
export { Button, IconButton } from './Button'
export type { ButtonProps, IconButtonProps } from './Button'
```

## 🎨 Como Usar

### Uso Básico

```tsx
import { Button, IconButton } from '@/components'

// Botão primário simples
<Button title="Salvar" onPress={handleSave} />

// Botão com ícone
<Button 
  title="Salvar" 
  icon="check" 
  variant="primary" 
  onPress={handleSave} 
/>

// Botão secundário
<Button 
  title="Cancelar" 
  variant="secondary" 
  onPress={handleCancel} 
/>

// Botão de perigo
<Button 
  title="Excluir" 
  variant="danger" 
  icon="trash-2" 
  onPress={handleDelete} 
/>

// Botões apenas com ícone
<IconButton 
  icon="check" 
  variant="primary" 
  onPress={handleSave} 
/>

<IconButton 
  icon="trash-2" 
  variant="danger" 
  onPress={handleDelete} 
/>

<IconButton 
  icon="edit-pen" 
  variant="secondary" 
  onPress={handleEdit} 
/>
```

## ✅ Vantagens do Padrão Legado

1. **Simplicidade**: Fácil de entender e implementar
2. **Menos Código**: Uma única interface para tudo
3. **Familiaridade**: Padrão comum em React Native
4. **Rápido de Implementar**: Ideal para protótipos e MVPs

## ⚠️ Limitações

1. **Menos Flexível**: Difícil de customizar layouts complexos
2. **Props Repetitivas**: Precisa passar variante para cada elemento
3. **Menos Composable**: Não permite composições avançadas

## 🔧 Personalização

### Adicionar Novas Variantes

```typescript
// 1. Adicionar ao tipo
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

// 2. Adicionar estilos
success: {
  backgroundColor: colors.success.base,
},

successText: {
  ...textStyles.titleMd,
  color: 'white',
},

successIconColor: {
  color: 'white',
},
```

### Adicionar Tamanhos

```typescript
// Tipos
interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  size?: 'small' | 'medium' | 'large'
  icon?: IconName
}

interface IconButtonProps extends TouchableOpacityProps {
  icon: IconName
  variant?: ButtonVariant
  size?: 'small' | 'medium' | 'large'
}

// Estilos
small: {
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 20,
},

medium: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 24,
},

large: {
  paddingHorizontal: 20,
  paddingVertical: 16,
  borderRadius: 28,
},
```

## 📝 Exemplo Completo

```tsx
// Exemplo de uso em uma tela
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, IconButton } from '@/components'

export function HomeScreen() {
  const handleSave = () => {
    console.log('Salvando...')
  }

  const handleCancel = () => {
    console.log('Cancelando...')
  }

  const handleDelete = () => {
    console.log('Excluindo...')
  }

  const handleEdit = () => {
    console.log('Editando...')
  }

  return (
    <View style={styles.container}>
      {/* Botões com texto */}
      <Button 
        title="Salvar" 
        icon="check" 
        variant="primary" 
        onPress={handleSave} 
      />
      
      <Button 
        title="Cancelar" 
        variant="secondary" 
        onPress={handleCancel} 
      />
      
      <Button 
        title="Excluir" 
        variant="danger" 
        icon="trash-2" 
        onPress={handleDelete} 
      />

      {/* Botões apenas com ícone */}
      <View style={styles.iconButtonsRow}>
        <IconButton 
          icon="check" 
          variant="primary" 
          onPress={handleSave} 
        />
        
        <IconButton 
          icon="edit-pen" 
          variant="secondary" 
          onPress={handleEdit} 
        />
        
        <IconButton 
          icon="trash-2" 
          variant="danger" 
          onPress={handleDelete} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  iconButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
})
```

## 🎯 Conclusão

O padrão legado é ideal para:
- Projetos pequenos a médios
- Equipes iniciantes em React Native
- Protótipos e MVPs
- Quando você precisa de uma solução rápida e simples

Para projetos maiores ou quando você precisa de mais flexibilidade, considere o padrão de composição.
