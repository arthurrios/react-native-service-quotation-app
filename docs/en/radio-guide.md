# How to Create a Radio Component

This document explains how to create a complete Radio system in React Native, including the visual component and a custom hook to manage its state. The Radio component is similar to the Checkbox, but allows only one selection per group.

## 📋 Prerequisites

- Basic knowledge of React Native
- Familiarity with TypeScript
- Understanding of React hooks
- Basic knowledge of components and props

## 🎯 Objective

Create a complete and reusable radio button system that:
- Allows only one selection per group
- Stores typed values (strings, enums, objects)
- Manages state simply
- Returns only the selected value (without React components)

## 📁 File Structure

```
Radio/
├── index.tsx           # Visual radio button component
├── types.ts            # Type definitions
├── styles.ts           # Component styles
├── useRadio.ts         # Hook to manage selection state
└── index.ts            # Exports
```

## 🛠️ Step-by-Step Implementation

### 1. Create the Structure

**First, create the Radio component folder:**
```bash
mkdir -p src/components/Radio
```

### 2. Define Types

**Create the file `src/components/Radio/types.ts`:**

In this file, you should define:

```typescript
import { TouchableOpacityProps } from 'react-native'

export interface RadioProps extends TouchableOpacityProps {
  label: string | React.ReactNode  // Text or React component
  selected?: boolean               // Whether it's selected
  onSelect?: () => void            // Function called when clicked
  disabled?: boolean               // Whether it's disabled
}

export interface UseRadioReturn<T> {
  selectedValue: T | null          // Selected value (unique)
  isSelected: (value: T) => boolean // Checks if value is selected
  select: (value: T) => void       // Selects a value
  reset: () => void                // Removes selection
}

export function useRadio<T>(
  initialValue: T | null = null,
  compareFn?: (a: T, b: T) => boolean,
): UseRadioReturn<T>
```

**Tip:** The `useRadio` hook will be VERY similar to `useCheckbox`, but:
- Instead of array (`T[]`), returns a single value (`T | null`)
- Instead of `toggle`, uses `select` (always replaces previous value)
- Doesn't need functions like `toggleAll`, `selectAll`, etc.

### 3. Create Styles

**Create the file `src/components/Radio/styles.ts`:**

Refer to the provided design image. The radio should be:
- A **circle** (not a square like checkbox)
- When not selected: empty circle with gray border
- When selected: circle with purple filled dot in center

**Visual reference:**
- **radio / default**: Empty circle, gray border
- **radio / selected**: Circle with central purple dot

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
    borderRadius: 10, // 10 = fully circular (half of 20)
    borderWidth: 1,
    borderColor: colors.gray[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.purple.base,
    backgroundColor: colors.purple.base, // Purple background when selected
  },
  radioInner: {
    width: 8, // Smaller inner dot (8x8)
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.white, // White dot in the center
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

### 4. Implement Radio Component

**Create the file `src/components/Radio/index.tsx`:**

Structure similar to Checkbox, but:
- Circle instead of square
- Shows inner dot when selected
- Doesn't use check icon

**Logic:**
```typescript
{selected && <View style={styles.radioInner} />}
```

### 5. Implement useRadio Hook

**Create the file `src/components/Radio/useRadio.ts`:**

**Key difference from useCheckbox:**
- State: `useState<T | null>(null)` (not array)
- `isSelected`: compares with single value
- `select`: replaces previous value (doesn't add)
- Doesn't need `toggle` (radio doesn't toggle, always selects)

**Pseudocode:**
```typescript
const [selectedValue, setSelectedValue] = useState<T | null>(initialValue)

const isSelected = (value: T) => {
  return compare(selectedValue, value)
}

const select = (value: T) => {
  setSelectedValue(value)  // Always replaces
}

const reset = () => {
  setSelectedValue(null)
}
```

### 6. Configure Exports

**Create the file `src/components/Radio/index.ts`:**

Export:
- `Radio` (component)
- `useRadio` (hook)
- Types

## 🎨 How to Use (After Implementing)

### Example with Strings

```tsx
const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
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
      <Text>Selected: {selectedValue || 'None'}</Text>
    </View>
  )
}
```

### Example with Enums and Status

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

## 🔍 Differences from Checkbox

| Aspect | Checkbox | Radio |
|--------|----------|-------|
| **State** | Array of values | Single value or null |
| **Selections** | Multiple | One only |
| **Visual** | Square with check | Circle with dot |
| **Toggle** | Alternates between selected/deselected | Always selects (doesn't deselect when clicking again) |
| **Hook returns** | `checkedValues: T[]` | `selectedValue: T \| null` |
| **Functions** | toggle, toggleAll, selectAll, etc. | select, reset |

## ✅ Implementation Checklist

1. [ ] Create folder `src/components/Radio`
2. [ ] Create `types.ts` with interfaces
3. [ ] Create `styles.ts` with circular styles
4. [ ] Implement `index.tsx` with visual component
5. [ ] Implement `useRadio.ts` with single selection logic
6. [ ] Create `index.ts` with exports
7. [ ] Test in `Home.tsx` with a group of radios

## 🎯 Implementation Tips

1. **Circular Shape**: Use `borderRadius: 10` on a 20x20 element to create a perfect circle
2. **Central Dot**: The inner dot should be 8x8 with white background to create the visual effect
3. **Purple Background**: When selected, the outer circle has purple background (`backgroundColor: colors.purple.base`)
4. **Single State**: Radio always maintains a single selected value
5. **No Toggle**: Clicking an already selected radio does nothing (unlike checkbox)

Happy implementing! 🚀
