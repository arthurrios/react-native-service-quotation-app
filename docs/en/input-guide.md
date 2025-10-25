# How to Create an Input Component

This document explains how to create a complete and flexible Input component using the composition pattern, similar to the Button component.

## 📋 Prerequisites

- Intermediate knowledge of React Native
- Familiarity with TypeScript
- Understanding of Context API
- Component composition concepts

## 🎯 Objective

Create a flexible input system using composition, where each part (Root, Icon, Prefix, Suffix, Field) can be used independently, with automatic inheritance of variants and states.

## 📁 File Structure

```
Input/
├── components/           # Individual components
│   ├── Root.tsx         # Main container and state manager
│   ├── Field.tsx        # Text field
│   ├── Icon.tsx         # Icon component
│   ├── Prefix.tsx       # Prefix (e.g., $)
│   └── Suffix.tsx       # Suffix (e.g., %)
├── hooks/               # Hooks and context
│   └── InputContext.tsx # Context for variant inheritance
├── types/               # Type definitions
│   └── index.ts         # All types centralized
├── Input.tsx            # Main compound component
├── styles.ts            # Shared styles
└── index.tsx            # Organized exports
```

## 🛠️ Step-by-Step Implementation

### 1. Define Types

```typescript
// types/index.ts
import { DimensionValue, TextInputProps } from 'react-native'
import { IconName } from '@/components/Icon'

// Input variants (empty, filled, danger, percentage)
export type InputVariant = 'empty' | 'filled' | 'danger' | 'percentage'

// Input states (default, focus)
export type InputState = 'default' | 'focus'

// Base props that all components share
export interface BaseInputProps
  extends Omit<TextInputProps, 'onFocus' | 'onBlur'> {
  variant?: InputVariant
  onFocus?: () => void
  onBlur?: () => void
}

// Props for Root component (container)
export interface InputRootProps extends BaseInputProps {
  children: React.ReactNode
  width?: DimensionValue
}

// Props for Icon component
export interface InputIconProps {
  name: IconName
  variant?: InputVariant  // Optional override
  state?: InputState      // Optional override
  size?: number
}

// Props for Field component (TextInput)
export interface InputFieldProps extends TextInputProps {
  variant?: InputVariant
  state?: InputState
}

// Props for Prefix component
export interface InputPrefixProps {
  children: React.ReactNode
  variant?: InputVariant
  state?: InputState
}

// Props for Suffix component
export interface InputSuffixProps {
  children: React.ReactNode
  variant?: InputVariant
  state?: InputState
}

// Legacy component props (for compatibility)
export interface InputProps extends BaseInputProps {
  icon?: IconName
  prefix?: string
  suffix?: string
  placeholder?: string
  width?: DimensionValue
}
```

**Explanation:**
- `InputVariant`: Defines the 4 different visual styles
- `InputState`: Controls focus state
- `BaseInputProps`: Inherits TextInput props but customizes onFocus/onBlur
- Each component has its own props but can inherit from context

### 2. Create Context

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

**Explanation:**
- Stores current variant and state
- Provides functions to manage focus state
- Validation ensures child components are only used inside Root

### 3. Implement Root Component

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

**Explanation:**
- Manages internal state (default/focus)
- Combines base styles + variant + focus state
- Provides context for all children
- Allows custom width

### 4. Implement Field Component

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

**Explanation:**
- Connects to context to inherit variant/state
- Handles focus events and propagates to Root
- Applies specific styles for percentage variant
- Converts to numeric keyboard when needed

### 5. Implement Icon Component

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

**Explanation:**
- Inherits variant and state from context
- Generates dynamic style name based on variant + state
- Color changes when input is focused

### 6. Implement Prefix and Suffix

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

// components/Suffix.tsx - Same logic as Prefix
```

**Explanation:**
- Prefix and Suffix follow same color logic
- Change color when input focuses
- Use same dynamic style key

### 7. Create Compound Component

```typescript
// Input.tsx
import { Field } from './components/Field'
import { Icon } from './components/Icon'
import { Prefix } from './components/Prefix'
import { Root } from './components/Root'
import { Suffix } from './components/Suffix'
import { InputProps } from './types'

// Legacy component (for compatibility)
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

// Create compound component
const InputCompound = Object.assign(Input, {
  Root,
  Icon,
  Prefix,
  Suffix,
  Field,
})

export { InputCompound as Input }
```

**Explanation:**
- Legacy component allows simple usage
- Automatically composes all sub-components
- Percentage variant automatically adds "%"
- Object.assign creates compound API (Input.Root, Input.Field, etc)

### 8. Create Styles

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
  // Base container
  container: {
    ...baseInputStyle,
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
  },

  // Variants
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

  // Focus state
  focus: {
    borderColor: colors.purple.base,
  },

  // Dynamic colors for nested components
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

**Explanation:**
- Base style defines common layout
- Variants change border color
- Focus overrides border color
- NestedComponentColor used for icons, prefix, suffix
- TextInput uses flex: 1 to occupy available space

## 🎨 How to Use

### Composition Pattern (Recommended)

```tsx
import { Input } from '@/components'

// Basic input
<Input.Root variant="empty">
  <Input.Field placeholder="Type something..." />
</Input.Root>

// With icon
<Input.Root variant="empty">
  <Input.Icon name="search" />
  <Input.Field placeholder="Search..." />
</Input.Root>

// With prefix
<Input.Root variant="filled">
  <Input.Prefix>$</Input.Prefix>
  <Input.Field placeholder="0.00" />
</Input.Root>

// With suffix
<Input.Root variant="empty">
  <Input.Field placeholder="100" />
  <Input.Suffix>%</Input.Suffix>
</Input.Root>

// Percentage (automatic)
<Input.Root variant="percentage">
  <Input.Field placeholder="0" />
</Input.Root>

// Everything together
<Input.Root variant="empty">
  <Input.Icon name="credit-card" />
  <Input.Prefix>$</Input.Prefix>
  <Input.Field placeholder="0.00" />
  <Input.Suffix>.00</Input.Suffix>
</Input.Root>
```

### Legacy Pattern (Compatibility)

```tsx
import { Input } from '@/components'

// Basic
<Input placeholder="Name" />

// With icon
<Input icon="search" placeholder="Search..." />

// With prefix
<Input prefix="$" placeholder="0.00" />

// Percentage
<Input variant="percentage" placeholder="0" />
```

## 🔍 Important Concepts

### State Management

Root manages internal focus state. When Field is focused:
1. Field triggers `onFocus`
2. Root updates state to 'focus'
3. Context updates for all children
4. Nested component colors change

### Style Naming

Styles for nested components follow pattern:
```
{variant}NestedComponentColor
{variant}FocusNestedComponentColor
```

For example:
- `emptyNestedComponentColor`
- `emptyFocusNestedComponentColor`

### Automatic Inheritance

Child components automatically inherit:
- `variant` from Root
- `state` from Root (default/focus)

But can override if needed.

## ✅ Advantages

1. **Flexibility**: Combine components however you want
2. **Automatic Inheritance**: Variant and state propagate automatically
3. **Type Safety**: TypeScript prevents errors
4. **Reusability**: Use parts individually
5. **Variants**: 4 ready-to-use styles (empty, filled, danger, percentage)
6. **Visual Feedback**: Focus state changes colors automatically

## 🎯 Conclusion

The Input component offers:
- **Composition pattern** for maximum flexibility
- **Automatic inheritance** of variants and states
- **4 variants** ready for use
- **Visual feedback** on focus
- **Dual API**: Composition + Legacy

Ideal for complex forms, monetary value inputs, percentages, and any case where you need maximum control over layout.
