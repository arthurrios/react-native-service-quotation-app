# How to Create a Button Component - Legacy Pattern

This document explains how to create a button component using the legacy pattern, ideal for developers who are starting with React Native and need a simple and straightforward solution.

## 📋 Prerequisites

- Basic knowledge of React Native
- Familiarity with TypeScript
- Understanding of props and components

## 🎯 Objective

Create a reusable button component with different variants (primary, secondary, danger) that is easy to use and maintain.

## 📁 File Structure

```
Button/
├── Button.tsx      # Main component
├── styles.ts       # Component styles
└── index.ts        # Exports
```

## 🛠️ Step-by-Step Implementation

### 1. Define Types

First, let's define the types for our component:

```typescript
// types/index.ts
export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: ButtonVariant
  icon?: IconName
}
```

### 2. Create Styles

```typescript
// styles.ts
import { StyleSheet } from 'react-native'
import { colors } from '../../styles/colors'
import { textStyles } from '../../styles/textStyles'

export const styles = StyleSheet.create({
  // Base container style
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 50,
    gap: 8,
  },

  // Variants
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

  // Text styles
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

  // Icon colors
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

### 3. Implement Components

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

// Text button component
export function Button({ 
  title, 
  variant = 'primary', 
  icon, 
  ...props 
}: ButtonProps) {
  // Combine base styles with variant
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  // Get text style based on variant
  const textStyle = styles[`${variant}Text`]
  
  // Get icon color based on variant
  const iconColor = styles[`${variant}IconColor`].color

  return (
    <TouchableOpacity style={containerStyle} {...props}>
      {icon && <Icon name={icon} size={24} color={iconColor} />}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

// Icon-only button component
export function IconButton({ 
  icon, 
  variant = 'primary', 
  ...props 
}: IconButtonProps) {
  // Combine base styles with variant
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  // Get icon color based on variant
  const iconColor = styles[`${variant}IconColor`].color

  return (
    <TouchableOpacity style={containerStyle} {...props}>
      <Icon name={icon} size={24} color={iconColor} />
    </TouchableOpacity>
  )
}
```

### 4. Configure Exports

```typescript
// index.ts
export { Button, IconButton } from './Button'
export type { ButtonProps, IconButtonProps } from './Button'
```

## 🎨 How to Use

### Basic Usage

```tsx
import { Button, IconButton } from '@/components'

// Simple primary button
<Button title="Save" onPress={handleSave} />

// Button with icon
<Button 
  title="Save" 
  icon="check" 
  variant="primary" 
  onPress={handleSave} 
/>

// Secondary button
<Button 
  title="Cancel" 
  variant="secondary" 
  onPress={handleCancel} 
/>

// Danger button
<Button 
  title="Delete" 
  variant="danger" 
  icon="trash-2" 
  onPress={handleDelete} 
/>

// Icon-only buttons
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

## ✅ Legacy Pattern Advantages

1. **Simplicity**: Easy to understand and implement
2. **Less Code**: Single interface for everything
3. **Familiarity**: Common pattern in React Native
4. **Quick to Implement**: Ideal for prototypes and MVPs

## ⚠️ Limitations

1. **Less Flexible**: Difficult to customize complex layouts
2. **Repetitive Props**: Need to pass variant to each element
3. **Less Composable**: Doesn't allow advanced compositions

## 🔧 Customization

### Adding New Variants

```typescript
// 1. Add to type
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

// 2. Add styles
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

### Adding Sizes

```typescript
// Types
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

// Styles
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

## 📝 Complete Example

```tsx
// Example usage in a screen
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, IconButton } from '@/components'

export function HomeScreen() {
  const handleSave = () => {
    console.log('Saving...')
  }

  const handleCancel = () => {
    console.log('Canceling...')
  }

  const handleDelete = () => {
    console.log('Deleting...')
  }

  const handleEdit = () => {
    console.log('Editing...')
  }

  return (
    <View style={styles.container}>
      {/* Text buttons */}
      <Button 
        title="Save" 
        icon="check" 
        variant="primary" 
        onPress={handleSave} 
      />
      
      <Button 
        title="Cancel" 
        variant="secondary" 
        onPress={handleCancel} 
      />
      
      <Button 
        title="Delete" 
        variant="danger" 
        icon="trash-2" 
        onPress={handleDelete} 
      />

      {/* Icon-only buttons */}
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

## 🎯 Conclusion

The legacy pattern is ideal for:
- Small to medium projects
- Teams new to React Native
- Prototypes and MVPs
- When you need a quick and simple solution

For larger projects or when you need more flexibility, consider the composition pattern.
