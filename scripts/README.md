# Icon Generation Script

This script automatically processes all SVG icons in the `src/assets/icons/` folder and generates React Native components for the Icon system.

## What it does

1. **Scans** the `src/assets/icons/` directory for all `.svg` files
2. **Generates** React Native components using SVGR CLI with a custom template
3. **Updates** the Icon system files:
   - `src/components/Icon/types.ts` - Adds new icon names to the `IconName` type
   - `src/components/Icon/registry.ts` - Registers new components in the icon registry
   - `src/components/Icon/index.ts` - Exports new components

## Usage

### Option 1: Using npm script (recommended)
```bash
pnpm run generate-icons
```

### Option 2: Direct execution
```bash
node scripts/generate-icons.js
```

## Requirements

- `@svgr/cli` package (automatically installed as dev dependency)
- SVG files in `src/assets/icons/` directory

## Generated Files

The script will create/update:
- `src/assets/icon-components/[icon-name].tsx` - Individual icon components
- `src/components/Icon/types.ts` - TypeScript types
- `src/components/Icon/registry.ts` - Icon registry
- `src/components/Icon/index.ts` - Exports

## Example

If you have these SVG files:
- `calendar.svg`
- `filter.svg`
- `search.svg`

The script will:
1. Generate `calendar.tsx`, `filter.tsx`, `search.tsx` components
2. Update `IconName` type to include `'calendar' | 'filter' | 'search'`
3. Register components in the icon registry
4. Export all components from the index file

## Notes

- Icon names are converted from kebab-case to PascalCase for component names
- The script preserves existing icons and only adds new ones
- All generated components follow the same pattern as existing icons
- Uses a custom template to ensure consistent component structure
