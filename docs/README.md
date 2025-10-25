# Component Documentation

This repository contains comprehensive documentation for creating React Native components, available in both Portuguese and English.

## 📁 Documentation Structure

```
docs/
├── pt/                              # Portuguese documentation
│   ├── button-legacy-pattern.md         # Button legacy pattern (PT)
│   ├── button-composition-pattern.md    # Button composition pattern (PT)
│   ├── checkbox-guide.md                # Checkbox guide (PT)
│   ├── input-guide.md                   # Input guide (PT)
│   ├── radio-guide.md                   # Radio guide (PT)
│   └── money-label-guide.md             # MoneyLabel guide (PT)
├── en/                              # English documentation
│   ├── button-legacy-pattern.md         # Button legacy pattern (EN)
│   ├── button-composition-pattern.md    # Button composition pattern (EN)
│   ├── checkbox-guide.md                # Checkbox guide (EN)
│   ├── input-guide.md                   # Input guide (EN)
│   ├── radio-guide.md                   # Radio guide (EN)
│   └── money-label-guide.md             # MoneyLabel guide (EN)
└── README.md                        # This file
```

## 🎯 Documentation Overview

This documentation covers multiple React Native components with different complexity levels and patterns.

### Button Components
- **Legacy Pattern**: Simple, single-file approach for beginners
- **Composition Pattern**: Advanced, flexible approach for complex projects

### Form Components
- **Checkbox**: Multiple selection with custom hook
- **Radio**: Single selection with custom hook
- **Input**: Flexible input with composition pattern

### Display Components
- **MoneyLabel**: Currency display with variants and formatting

## 📚 Available Documents

### Portuguese (PT)
- [Botão - Padrão Legado](./pt/button-legacy-pattern.md)
- [Botão - Padrão de Composição](./pt/button-composition-pattern.md)
- [Checkbox](./pt/checkbox-guide.md)
- [Input](./pt/input-guide.md)
- [Radio](./pt/radio-guide.md)
- [MoneyLabel](./pt/money-label-guide.md)

### English (EN)
- [Button - Legacy Pattern](./en/button-legacy-pattern.md)
- [Button - Composition Pattern](./en/button-composition-pattern.md)
- [Checkbox](./en/checkbox-guide.md)
- [Input](./en/input-guide.md)
- [Radio](./en/radio-guide.md)
- [MoneyLabel](./en/money-label-guide.md)

## 🚀 Quick Start

### Choose Your Component

1. **Form Inputs**: Checkbox, Radio, Input
   - Start with these for building forms
   - Each has custom hooks for state management
   
2. **Display Elements**: MoneyLabel
   - For displaying formatted currency values
   - Multiple size and color variants

3. **Interactive Elements**: Button
   - Choose Legacy Pattern for simplicity
   - Choose Composition Pattern for flexibility

### By Experience Level

**Beginners**:
- Start with Legacy Button Pattern
- Learn Checkbox and Radio basics
- Use MoneyLabel for display

**Intermediate**:
- Explore Composition Button Pattern
- Master Input component variants
- Use custom hooks for complex forms

**Advanced**:
- Customize all components
- Create new variants
- Build complex form flows

## 📖 Usage Examples

### Button Components
```tsx
// Legacy Pattern
<Button title="Save" variant="primary" onPress={handleSave} />

// Composition Pattern
<Button.Root variant="primary" onPress={handleSave}>
  <Button.Icon name="check" />
  <Button.Title>Save</Button.Title>
</Button.Root>
```

### Form Components
```tsx
// Checkbox with custom hook
const { isChecked, toggle } = useCheckbox<string>()
<Checkbox label="Option" checked={isChecked(value)} onToggle={() => toggle(value)} />

// Radio with custom hook
const { isSelected, select } = useRadio<string>()
<Radio label="Option" selected={isSelected(value)} onSelect={() => select(value)} />

// Input with composition
<Input.Root variant="empty">
  <Input.Icon name="search" />
  <Input.Field placeholder="Search..." />
</Input.Root>
```

### Display Components
```tsx
// MoneyLabel with variants
<MoneyLabel value={3847.50} size="lg" />
<MoneyLabel value={-200} color="danger" />
<MoneyLabel value={4050.00} strikethrough />
```

## 📝 Contributing

If you find any issues or want to improve the documentation:

1. Check the existing documentation structure
2. Follow the same format and style
3. Ensure both PT and EN versions are updated
4. Test the examples provided

## 🎯 Conclusion

This documentation provides comprehensive guides for creating React Native components with different complexity levels and patterns:

- **Button**: Two patterns (Legacy and Composition) for different needs
- **Checkbox & Radio**: Custom hooks for state management
- **Input**: Flexible composition pattern
- **MoneyLabel**: Currency display with variants

Each component is fully typed with TypeScript and follows React Native best practices. Choose the component and pattern that best fits your project needs.
