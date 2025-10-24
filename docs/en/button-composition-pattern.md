# How to Create a Button Component - Composition Pattern

This document explains how to create a button component using the composition pattern, ideal for developers who need maximum flexibility and component reusability.

## 📋 Prerequisites

- Intermediate knowledge of React Native
- Familiarity with advanced TypeScript
- Understanding of Context API
- Component composition concepts

## 🎯 Objective

Create a flexible button system using composition, where each part (Root, Icon, Title) can be used independently, with automatic variant inheritance.

## 📁 File Structure

```
Button/
├── components/           # Individual components
│   ├── Root.tsx         # Main container
│   ├── Icon.tsx         # Icon component
│   └── Title.tsx         # Text component
├── hooks/               # Hooks and context
│   └── ButtonContext.tsx # Context for variant inheritance
├── types/               # Type definitions
│   └── index.ts         # All types centralized
├── Button.tsx           # Main compound component
├── styles.ts            # Shared styles
└── index.ts             # Organized exports
```

## 🛠️ Step-by-Step Implementation

### 1. Define Centralized Types

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
  variant?: ButtonVariant // Optional override
  size?: number
}

export interface ButtonTextProps {
  children: React.ReactNode
  variant?: ButtonVariant // Optional override
}

export interface ButtonProps extends BaseButtonProps {
  title: string
  icon?: IconName
}

export interface IconButtonProps extends BaseButtonProps {
  icon: IconName
}
```

### 2. Create Context for Variant Inheritance

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
    throw new Error('Button components must be used within Button.Root')
  }
  return context
}

export { ButtonContext }
```

### 3. Implement Root Component

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

### 4. Implement Icon Component

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

### 5. Implement Title Component

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

### 6. Create Main Compound Component

```typescript
// Button.tsx
import { Icon } from './components/Icon'
import { Root } from './components/Root'
import { Title } from './components/Title'
import { ButtonProps, IconButtonProps } from './types'

// Legacy component for compatibility
function Button({ title, variant = 'primary', icon, ...props }: ButtonProps) {
  return (
    <Root variant={variant} {...props}>
      {icon && <Icon name={icon} />}
      <Title>{title}</Title>
    </Root>
  )
}

// Legacy IconButton component
function IconButton({ icon, variant = 'primary', ...props }: IconButtonProps) {
  return (
    <Root variant={variant} {...props}>
      <Icon name={icon} />
    </Root>
  )
}

// Create compound component
const ButtonCompound = Object.assign(Button, {
  Root,
  Icon,
  Title,
})

export { ButtonCompound as Button, IconButton }
```

### 7. Configure Exports

```typescript
// index.ts
// Main compound component
export { Button, IconButton } from './Button'

// Individual components (for direct import if needed)
export { Root } from './components/Root'
export { Icon } from './components/Icon'
export { Title } from './components/Title'

// Hooks
export { useButtonContext } from './hooks/ButtonContext'

// Types
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

## 🎨 How to Use

### Composition Pattern (Recommended)

```tsx
import { Button } from '@/components'

// Basic button - children inherit variant automatically
<Button.Root variant="primary" onPress={handlePress}>
  <Button.Title>Save</Button.Title>
</Button.Root>

// Button with icon and text - no need to pass variant
<Button.Root variant="secondary" onPress={handlePress}>
  <Button.Icon name="check" />
  <Button.Title>Confirm</Button.Title>
</Button.Root>

// Icon-only button
<Button.Root variant="danger" onPress={handleDelete}>
  <Button.Icon name="trash-2" />
</Button.Root>

// Custom composition
<Button.Root variant="primary" onPress={handlePress}>
  <Button.Icon name="plus" size={20} />
  <Button.Title>Add Item</Button.Title>
  <Button.Icon name="direction-up-right" size={16} />
</Button.Root>
```

### Variant Override (Optional)

```tsx
// You can still override variant for specific children
<Button.Root variant="primary" onPress={handlePress}>
  <Button.Icon name="check" variant="secondary" />
  <Button.Title>Mixed Variants</Button.Title>
</Button.Root>
```

### Legacy Pattern (Still Supported)

```tsx
import { Button, IconButton } from '@/components'

// Text button with optional icon
<Button title="Save" variant="primary" icon="check" onPress={handlePress} />

// Icon-only button
<IconButton icon="trash-2" variant="danger" onPress={handleDelete} />
```

## ✅ Composition Pattern Advantages

### 1. **Automatic Variant Inheritance**
- Children automatically inherit parent's variant
- Cleaner API - no need to pass variant to each child
- Reduces inconsistency errors

### 2. **Maximum Flexibility**
- Can mix and match components as needed
- Easy to add custom elements between components
- Allows complex and creative layouts

### 3. **Component Reusability**
- Each component can be used independently
- Easy to create specific variations
- Components are individually testable

### 4. **Advanced Type Safety**
- Each component has specific and well-typed props
- Context validation ensures correct usage
- Complete IntelliSense

### 5. **Scalability**
- Easy to add new components (ex: Button.Badge)
- Easy to add new variants
- Organized and maintainable structure

## 🔧 Advanced Customization

### Adding New Components

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

### Adding New Variants

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

### Creating Custom Hooks

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

## 📝 Complete Example

```tsx
// Example usage in a screen
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@/components'

export function HomeScreen() {
  const handleSave = () => console.log('Saving...')
  const handleCancel = () => console.log('Canceling...')
  const handleDelete = () => console.log('Deleting...')

  return (
    <View style={styles.container}>
      {/* Composition pattern */}
      <Button.Root variant="primary" onPress={handleSave}>
        <Button.Icon name="check" />
        <Button.Title>Save</Button.Title>
      </Button.Root>

      <Button.Root variant="secondary" onPress={handleCancel}>
        <Button.Title>Cancel</Button.Title>
      </Button.Root>

      <Button.Root variant="danger" onPress={handleDelete}>
        <Button.Icon name="trash-2" />
      </Button.Root>

      {/* Custom composition */}
      <Button.Root variant="primary" onPress={handleSave}>
        <Button.Icon name="plus" size={20} />
        <Button.Title>Add</Button.Title>
        <Button.Icon name="direction-up-right" size={16} />
      </Button.Root>

      {/* Legacy pattern still works */}
      <Button title="Quick Save" variant="primary" onPress={handleSave} />
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

## 🎯 When to Use Composition Pattern

### ✅ Ideal For:
- Large and complex projects
- Experienced teams
- When you need maximum flexibility
- Complex design systems
- Components that will be extensively reused

### ⚠️ Consider Legacy Pattern If:
- Small project or MVP
- Beginner team
- Need quick solution
- Don't need advanced flexibility

## 🎯 Conclusion

The composition pattern offers:
- **Maximum flexibility** for complex layouts
- **Automatic inheritance** of variants
- **Reusable and testable** components
- **Advanced type safety**
- **Scalability** for large projects

It's the ideal choice for robust design systems and applications that need highly customizable components.
