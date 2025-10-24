# Button Component Documentation

This repository contains comprehensive documentation for creating button components in React Native, available in both Portuguese and English.

## 📁 Documentation Structure

```
docs/
├── pt/                          # Portuguese documentation
│   ├── button-legacy-pattern.md     # Legacy pattern (PT)
│   └── button-composition-pattern.md # Composition pattern (PT)
├── en/                          # English documentation
│   ├── button-legacy-pattern.md     # Legacy pattern (EN)
│   └── button-composition-pattern.md # Composition pattern (EN)
└── README.md                    # This file
```

## 🎯 Documentation Overview

### Legacy Pattern
- **Target Audience**: Beginner developers
- **Focus**: Simplicity and ease of use
- **Structure**: Single file with everything centralized
- **Advantages**: Quick to implement, easy to understand
- **Ideal for**: MVPs, prototypes, small projects

### Composition Pattern
- **Target Audience**: Intermediate/Advanced developers
- **Focus**: Maximum flexibility and reusability
- **Structure**: Organized in folders (components/, hooks/, types/)
- **Advantages**: Automatic variant inheritance, maximum flexibility
- **Ideal for**: Large projects, complex design systems

## 📚 Available Documents

### Portuguese (PT)
- [Padrão Legado](./pt/button-legacy-pattern.md) - Como criar um componente de botão usando o padrão legado
- [Padrão de Composição](./pt/button-composition-pattern.md) - Como criar um componente de botão usando o padrão de composição

### English (EN)
- [Legacy Pattern](./en/button-legacy-pattern.md) - How to create a button component using the legacy pattern
- [Composition Pattern](./en/button-composition-pattern.md) - How to create a button component using the composition pattern

## 🚀 Quick Start

### For Beginners
1. Start with the **Legacy Pattern** documentation
2. Choose your preferred language (PT/EN)
3. Follow the step-by-step implementation
4. Use the provided examples

### For Advanced Users
1. Go directly to the **Composition Pattern** documentation
2. Choose your preferred language (PT/EN)
3. Implement the organized structure
4. Leverage the advanced features

## 🎨 Pattern Comparison

| Feature | Legacy Pattern | Composition Pattern |
|---------|----------------|-------------------|
| **Complexity** | Simple | Advanced |
| **Flexibility** | Limited | Maximum |
| **Setup Time** | Quick | Moderate |
| **Maintenance** | Easy | Structured |
| **Reusability** | Basic | High |
| **Type Safety** | Good | Excellent |

## 📖 Usage Examples

### Legacy Pattern
```tsx
// Simple usage
<Button title="Save" variant="primary" onPress={handleSave} />
<IconButton icon="check" variant="primary" onPress={handleSave} />
```

### Composition Pattern
```tsx
// Flexible composition
<Button.Root variant="primary" onPress={handleSave}>
  <Button.Icon name="check" />
  <Button.Title>Save</Button.Title>
</Button.Root>
```

## 🔧 Customization

Both patterns support:
- ✅ Multiple variants (primary, secondary, danger)
- ✅ Icon integration
- ✅ Size customization
- ✅ TypeScript support
- ✅ Theme integration

## 🎯 When to Use Each Pattern

### Use Legacy Pattern When:
- Building a small to medium project
- Working with a beginner team
- Creating prototypes or MVPs
- Need a quick and simple solution

### Use Composition Pattern When:
- Building a large and complex project
- Working with an experienced team
- Need maximum flexibility
- Creating a complex design system
- Components will be extensively reused

## 📝 Contributing

If you find any issues or want to improve the documentation:

1. Check the existing documentation structure
2. Follow the same format and style
3. Ensure both PT and EN versions are updated
4. Test the examples provided

## 🎯 Conclusion

Both patterns are valid and serve different purposes. Choose the one that best fits your project needs and team experience level. The documentation provides comprehensive guides to implement either pattern successfully.
