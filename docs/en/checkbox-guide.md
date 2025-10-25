# How to Create a Checkbox Component

This document explains how to create a complete Checkbox system in React Native, including the visual component and a custom hook to manage state.

## 📋 Prerequisites

- Basic knowledge of React Native
- Familiarity with TypeScript
- Understanding of React hooks
- Basic knowledge of components and props

## 🎯 Objective

Create a complete and reusable checkbox system that:
- Allows multiple selections
- Stores typed values (strings, enums, objects)
- Manages state simply
- Returns only selected values (without React components)

## 📁 File Structure

```
Checkbox/
├── index.tsx           # Visual checkbox component
├── types.ts            # Type definitions
├── styles.ts           # Component styles
├── useCheckbox.ts      # Hook to manage state
└── index.ts            # Exports
```

## 🛠️ Step-by-Step Implementation

### 1. Define Types

First, let's create the types that define our component's props:

```typescript
// types.ts
import { TouchableOpacityProps } from 'react-native'

export interface CheckboxProps extends TouchableOpacityProps {
  label: string | React.ReactNode  // Text or React component
  checked?: boolean                // Whether it's checked
  onToggle?: () => void            // Function called when clicked
  disabled?: boolean               // Whether it's disabled
}
```

**Explanation:**
- `CheckboxProps` extends `TouchableOpacityProps` to receive all TouchableOpacity's default props
- `label` can be string or ReactNode to allow custom components
- `checked` controls visual state
- `onToggle` is called when user clicks the checkbox
- `disabled` disables interaction

### 2. Create Styles

```typescript
// styles.ts
import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  // Container that wraps checkbox and label
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,  // Space between checkbox and label
  },
  
  // Checkbox box (unchecked)
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
  
  // Checkbox when checked
  checkboxChecked: {
    backgroundColor: colors.purple.base,
    borderColor: colors.purple.base,
  },
  
  // Internal checkmark container
  checkmark: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Checkmark text (✓)
  checkmarkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  
  // Label style
  label: {
    ...textStyles.textMd,
    color: colors.gray[700],
    flex: 1,
  },
  
  // Disabled label
  labelDisabled: {
    color: colors.gray[400],
  },
})
```

**Explanation:**
- `container`: uses `flexDirection: 'row'` to place checkbox and label side by side
- `checkbox`: has fixed size and border to create the square
- `checkboxChecked`: overrides colors when checked
- `checkmark`: centers the check icon inside the checkbox
- `label`: text styles with default color
- `labelDisabled`: lighter color when disabled

### 3. Implement the Checkbox Component

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
      {/* Checkbox box */}
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

**Explanation:**
- `handleToggle`: only calls `onToggle` if not disabled
- `activeOpacity`: reduces opacity on touch for visual feedback
- `[styles.checkbox, checked && styles.checkboxChecked]`: applies conditional style
- Check icon only appears when `checked` is `true`
- `{label}` renders as text or React component

### 4. Create the useCheckbox Hook

This is the heart of the system - a hook that manages selection state:

```typescript
// useCheckbox.ts
import { useCallback, useState } from 'react'

// Hook return types
export interface UseCheckboxReturn<T> {
  checkedValues: T[]              // Array with selected values
  isChecked: (value: T) => boolean // Checks if value is selected
  toggle: (value: T) => void       // Toggles selection
  toggleAll: (values: T[]) => void // Toggles all
  select: (value: T) => void       // Selects without toggling
  deselect: (value: T) => void     // Removes selection
  selectAll: (values: T[]) => void // Selects all
  deselectAll: () => void          // Removes all selections
  reset: () => void                // Returns to initial state
}

export function useCheckbox<T>(
  initialValues: T[] = [],
  compareFn?: (a: T, b: T) => boolean,
): UseCheckboxReturn<T> {
  // State that stores selected values
  const [checkedValues, setCheckedValues] = useState<T[]>(initialValues)

  // Function to compare values (default uses ===)
  const defaultCompare = (a: T, b: T) => a === b
  const compare = compareFn || defaultCompare

  // Checks if a value is selected
  const isChecked = useCallback(
    (value: T) => {
      return checkedValues.some((checkedValue) => compare(checkedValue, value))
    },
    [compare, checkedValues],
  )

  // Toggles selection of a value
  const toggle = useCallback(
    (value: T) => {
      setCheckedValues((prev) => {
        const isAlreadyChecked = prev.some((checkedValue) =>
          compare(checkedValue, value),
        )

        // If already marked, remove. Otherwise, add.
        if (isAlreadyChecked) {
          return prev.filter((checkedValue) => !compare(checkedValue, value))
        } else {
          return [...prev, value]
        }
      })
    },
    [compare],
  )

  // Selects a value (doesn't change if already selected)
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

  // Removes selection of a value
  const deselect = useCallback(
    (value: T) => {
      setCheckedValues((prev) =>
        prev.filter((checkedValue) => !compare(checkedValue, value)),
      )
    },
    [compare],
  )

  // Toggles all values in the list
  const toggleAll = useCallback(
    (values: T[]) => {
      setCheckedValues((prev) => {
        // Check if all are selected
        const allSelected = values.every((value) =>
          prev.some((checkedValue) => compare(checkedValue, value)),
        )

        // If all selected, uncheck all. Otherwise, check all.
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

  // Selects all values
  const selectAll = useCallback((values: T[]) => {
    setCheckedValues(() => [...values])
  }, [])

  // Removes all selections
  const deselectAll = useCallback(() => {
    setCheckedValues([])
  }, [])

  // Returns to initial state
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

**Detailed explanation:**
1. **useState**: Stores array of selected values
2. **compareFn**: Allows custom comparison (useful for objects)
3. **isChecked**: Checks if value exists in array using `some()`
4. **toggle**: Adds or removes using `filter()`
5. **useCallback**: Memoizes functions to avoid unnecessary re-renders

### 5. Configure Exports

```typescript
// index.ts
export { Checkbox } from './index'
export { useCheckbox } from './useCheckbox'
export type { CheckboxProps } from './types'
export type { UseCheckboxReturn } from './useCheckbox'
```

## 🎨 How to Use

### Example 1: Simple Values (String)

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
      <Text>Selected: {checkedValues.join(', ')}</Text>
    </View>
  )
}
```

### Example 2: Enum Values

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

### Example 3: Advanced Operations

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
      {/* Control buttons */}
      <Button onPress={() => selectAll(allOptions)}>
        Select All
      </Button>
      <Button onPress={deselectAll}>
        Unselect All
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

      {/* Show values */}
      <Text>Total selected: {checkedValues.length}</Text>
    </View>
  )
}
```

## 🔍 Concept Explanations

### Why separate visual component from hook?

1. **Separation of concerns**: Component only renders, hook only manages state
2. **Reusability**: Hook can be used without component for other cases
3. **Testability**: Easy to test logic separated from UI
4. **Flexibility**: Can use state in contexts without visual checkbox

### Why use generics (<T>)?

```typescript
useCheckbox<string>()      // For strings
useCheckbox<StatusType>()  // For enums
useCheckbox<MyObject>()    // For objects
```

- TypeScript ensures type safety
- `checkedValues` will be the correct type
- IntelliSense shows only valid methods

### Why use compareFn?

When you have complex objects:

```typescript
const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]

// With custom compareFn
const { toggle } = useCheckbox<Item>(
  [],
  (a, b) => a.id === b.id  // Compares by ID, not by reference
)

toggle(items[0])  // Works correctly
```

## ✅ System Advantages

1. **Type-safe**: TypeScript prevents errors
2. **Reusable**: Works with any type of value
3. **Flexible**: Multiple control functions
4. **Performant**: useCallback prevents re-renders
5. **Simple**: Intuitive and easy-to-use API

## 🎯 Conclusion

This checkbox system offers:
- **Visual component** for rendering
- **Custom hook** to manage state
- **Complete type safety**
- **Flexibility** for different value types
- **Simple** and intuitive API

Ideal for forms, filters, settings, and any case where you need multiple selection with full control over selected values.
