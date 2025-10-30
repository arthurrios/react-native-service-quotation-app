# How to Create a MoneyLabel Component

This document explains how to create a MoneyLabel component in React Native for displaying monetary values (USD) with different sizes, colors, and formatting options.

## 📋 Prerequisites

- Basic knowledge of React Native
- Familiarity with TypeScript
- Understanding of components and props

## 🎯 Objective

Create a reusable MoneyLabel component that:
- Displays US Dollar (USD) currency values
- Supports multiple size variants
- Supports different color variants
- Handles negative values and discounts
- Provides strikethrough for original prices
- Separates the "R$" prefix for independent styling

## 📁 File Structure

```
MoneyLabel/
├── index.tsx           # Main MoneyLabel component
├── types.ts            # Type definitions
├── styles.ts           # Component styles
└── index.ts            # Exports
```

Additionally:
```
utils/
└── formatCurrency.ts   # Currency formatting utility
```

## 🛠️ Step-by-Step Implementation

### 1. Create Utility for Currency Formatting (USD)

First, create a utility function to format numbers as currency:

```typescript
// utils/formatCurrency.ts
/**
 * Formats a number as US Dollar (USD) currency (number only, no symbol)
 * @param value - The numeric value to format
 * @returns Formatted currency string without symbol (e.g., "1.234,56")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}
```

**Explanation:**
- Uses `Intl.NumberFormat` for proper US formatting
- Returns only the number (no "$" symbol)
- Always shows 2 decimal places
- Uses dot as decimal separator and comma as thousands separator

### 2. Define Types

```typescript
// types.ts
import { TextProps } from 'react-native'

export type MoneySize = 'sm' | 'md' | 'lg'

export type MoneyColorVariant = 'default' | 'success' | 'danger'

export interface MoneyLabelProps extends TextProps {
  /** The monetary value in cents (integer) or float */
  value: number
  /** Size variant of the money display: sm (textXs), md (textSm), or lg (titleLg) */
  size?: MoneySize
  /** Color variant: default (gray), success (green), or danger (red) */
  color?: MoneyColorVariant
  /** Whether this is a negative value (shows minus sign) */
  isNegative?: boolean
  /** Whether to show with strikethrough (for original prices) */
  strikethrough?: boolean
  /** Whether to show the "$" prefix (default: true) */
  showPrefix?: boolean
}

export interface MoneyLabelStyleProps {
  size: MoneySize
  strikethrough: boolean
  color: MoneyColorVariant
}
```

**Explanation:**
- `MoneySize`: Maps to typography sizes (sm → textXs, md → textSm, lg → titleLg)
- `MoneyColorVariant`: Defines available color options
- `MoneyLabelProps`: Extends `TextProps` to inherit standard text styling
- All elements (prefix, minus, value) can receive the same color variant

### 3. Create Styles

```typescript
// styles.ts
import { StyleSheet, TextStyle } from 'react-native'
import { colors, textStyles } from '@/styles'
import { MoneyLabelStyleProps, MoneySize } from './types'

// Map size variants to textStyles
const sizeToTextStyleMap: Record<MoneySize, TextStyle> = {
  sm: textStyles.textXs,
  md: textStyles.textSm,
  lg: textStyles.titleLg,
}

// Color mapping for variants
export const colorMap: Record<string, string> = {
  default: colors.gray[700],
  success: colors.success.base,
  danger: colors.danger.base,
}

export function getMoneyStyles({
  size,
  strikethrough,
  color,
}: MoneyLabelStyleProps) {
  // If strikethrough, always use light gray
  // Otherwise, use the color variant
  const baseColor = strikethrough ? colors.gray[400] : colorMap[color]

  const baseStyle: TextStyle = {
    ...sizeToTextStyleMap[size],
    color: baseColor,
    textDecorationLine: strikethrough ? 'line-through' : 'none',
  }

  return StyleSheet.create({
    prefix: {
      ...baseStyle,
      ...textStyles.textXs, // Prefix always small
    },
    minus: {
      ...baseStyle,
    },
    value: {
      ...baseStyle,
    },
  })
}
```

**Explanation:**
- `sizeToTextStyleMap`: Maps size prop to textStyles
- `colorMap`: Defines colors for each variant
- `getMoneyStyles`: Creates styles for prefix, minus, and value
- Striкethrough always uses light gray color
- Prefix always uses textXs for consistency

### 4. Implement the Component

```typescript
// index.tsx
import { Text, View } from 'react-native'
import { formatCurrency } from '@/utils/formatCurrency'
import { getMoneyStyles } from './styles'
import { MoneyLabelProps } from './types'

export function MoneyLabel({
  value,
  size = 'md',
  color = 'default',
  isNegative: isNegativeProp,
  strikethrough = false,
  showPrefix = true,
  ...props
}: MoneyLabelProps) {
  // Auto-detect negative or use prop
  const isNegative = isNegativeProp ?? value < 0

  const { prefix, value: valueStyle, minus } = getMoneyStyles({
    size,
    strikethrough,
    color,
  })

  const formattedValue = formatCurrency(Math.abs(value))

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      {isNegative && <Text style={minus}>- </Text>}
      {showPrefix && <Text style={prefix}>$ </Text>}
      <Text style={[valueStyle, props.style]}>{formattedValue}</Text>
    </View>
  )
}
```

**Key Features:**
- Auto-detects negative values
- Separates minus sign, prefix, and value for independent styling
- Uses `flexDirection: 'row'` with `alignItems: 'baseline'` for alignment
- All elements (minus, prefix, value) inherit the same color variant

## 🎨 Usage Examples

### Basic Usage

```tsx
import { MoneyLabel } from '@/components/MoneyLabel'

// Default medium size
<MoneyLabel value={3847.50} />

// Small size
<MoneyLabel value={100} size="sm" />

// Large size
<MoneyLabel value={5000} size="lg" />
```

### Color Variants

```tsx
// Default gray
<MoneyLabel value={3847.50} color="default" />

// Success (green)
<MoneyLabel value={200} color="success" />

// Danger (red)
<MoneyLabel value={-200} color="danger" />
```

### Negative Values

```tsx
// Auto-detected negative
<MoneyLabel value={-200} color="danger" />

// Explicitly marked as negative
<MoneyLabel value={200} isNegative color="danger" />
```

### Strikethrough (Original Price)

```tsx
// Strikethrough for original price (always light gray)
<MoneyLabel value={4050.00} strikethrough />
```

### Without Prefix

```tsx
// Hide "$" prefix
<MoneyLabel value={3847.50} showPrefix={false} />
```

### Complete Examples

```tsx
// Standard positive value with large size
<MoneyLabel value={3847.50} size="lg" />

// Discount amount (negative, red)
<MoneyLabel value={-200} color="danger" />

// Original price (strikethrough)
<MoneyLabel value={4050.00} strikethrough />

// Final total (large, no color variant needed)
<MoneyLabel value={3847.50} size="lg" />
```

### In Practice: Financial Summary

```tsx
function FinancialSummary() {
  return (
    <View>
      {/* Original price - strikethrough */}
      <MoneyLabel value={4050.00} strikethrough />
      
      {/* Discount - negative, red */}
      <MoneyLabel value={-200} color="danger" />
      
      {/* Final total - large */}
      <MoneyLabel value={3847.50} size="lg" />
    </View>
  )
}
```

## 🔍 Key Concepts

### Why Separate Prefix from Value?

The "R$" prefix is separated from the value to:
1. **Allow independent styling** - Prefix can have different size (always textXs)
2. **Better alignment** - Each element can be positioned independently
3. **Flexibility** - Can hide prefix if needed
4. **Maintainability** - Each part can be styled individually

### Auto-Detection of Negative Values

```typescript
const isNegative = isNegativeProp ?? value < 0
```

- Uses explicit prop if provided (`isNegative={true}`)
- Otherwise, auto-detects from value
- Useful for subtotals where you want to force negative display

### Size Mapping

```
sm → textXs   (12px, regular)
md → textSm   (14px, regular) - default
lg → titleLg  (18px, bold)
```

### Color Variants

```
default → gray[700]   - Standard text color
success → success.base - Green for positive values
danger  → danger.base  - Red for negative values
```

### Strikethrough Behavior

When `strikethrough={true}`:
- Always displays in light gray (`colors.gray[400]`)
- Has line-through decoration
- Ignores color variant
- Used for original prices before discount

## ✅ Advantages

1. **Flexible Styling**: All elements (prefix, minus, value) can be styled independently
2. **Auto-Detection**: Automatically detects negative values
3. **Color Consistency**: All elements use the same color variant
4. **Proper Formatting**: Uses Intl for correct Brazilian currency formatting
5. **Type Safety**: Full TypeScript support
6. **Reusable Utility**: `formatCurrency` can be used elsewhere

## 🎯 Conclusion

The MoneyLabel component offers:
- **Multiple sizes** (sm, md, lg) for different contexts
- **Color variants** (default, success, danger) for semantic meaning
- **Automatic handling** of negative values
- **Strikethrough support** for original prices
- **Flexible prefix** that can be shown or hidden
- **Independent styling** of all elements

It's ideal for financial displays, price comparisons, and any case where you need to display monetary values with proper formatting and styling.
