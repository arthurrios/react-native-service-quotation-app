#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Configuration
const ICONS_DIR = 'src/assets/icons'
const ICON_COMPONENTS_DIR = 'src/assets/icon-components'
const ICON_TYPES_FILE = 'src/components/Icon/types.ts'
const ICON_REGISTRY_FILE = 'src/components/Icon/registry.ts'
const ICON_INDEX_FILE = 'src/components/Icon/index.ts'

// Ensure icon-components directory exists
if (!fs.existsSync(ICON_COMPONENTS_DIR)) {
  fs.mkdirSync(ICON_COMPONENTS_DIR, { recursive: true })
}

// Get all SVG files from icons directory
const svgFiles = fs
  .readdirSync(ICONS_DIR)
  .filter((file) => file.endsWith('.svg'))
  .map((file) => path.basename(file, '.svg'))

console.log(`Found ${svgFiles.length} SVG files:`, svgFiles)

// Generate icon components using SVGR with custom template
svgFiles.forEach((iconName) => {
  const svgPath = path.join(ICONS_DIR, `${iconName}.svg`)
  const outputPath = path.join(ICON_COMPONENTS_DIR, `${iconName}.tsx`)

  console.log(`Generating component for ${iconName}...`)

  try {
    // Use SVGR with custom template to match the existing structure
    const result = execSync(
      `npx @svgr/cli --native --template ./scripts/icon-template.js "${svgPath}"`,
      {
        encoding: 'utf8',
        cwd: process.cwd(),
      },
    )

    // Write the generated component to the output file
    fs.writeFileSync(outputPath, result)
    console.log(`✅ Generated ${iconName}.tsx`)
  } catch (error) {
    console.error(`❌ Failed to generate ${iconName}:`, error.message)
  }
})

// Generate types file
const iconNames = svgFiles.map((name) => `'${name}'`).join(' | ')
const typesContent = `import { SvgProps } from 'react-native-svg'

export type IconName = ${iconNames}

export interface IconProps extends SvgProps {
  name: IconName
  width?: number
  height?: number
  color?: string
}
`

fs.writeFileSync(ICON_TYPES_FILE, typesContent)
console.log('✅ Updated types.ts')

// Generate registry file
const registryImports = svgFiles
  .map(
    (name) =>
      `import { ${toPascalCase(name)} } from '@/assets/icon-components/${name}'`,
  )
  .join('\n')

const registryEntries = svgFiles
  .map((name) => `  ${name}: ${toPascalCase(name)},`)
  .join('\n')

const registryContent = `${registryImports}
import { IconName, IconProps } from './types'

export const iconRegistry: Record<IconName, React.ComponentType<IconProps>> = {
${registryEntries}
} as const
`

fs.writeFileSync(ICON_REGISTRY_FILE, registryContent)
console.log('✅ Updated registry.ts')

// Generate index file
const indexExports = svgFiles
  .map(
    (name) =>
      `export { ${toPascalCase(name)} } from '@/assets/icon-components/${name}'`,
  )
  .join('\n')

const indexContent = `${indexExports}

export { Icon } from './Icon'
export { iconRegistry } from './registry'
export type { IconName, IconProps } from './types'
`

fs.writeFileSync(ICON_INDEX_FILE, indexContent)
console.log('✅ Updated index.ts')

console.log('\n🎉 Icon generation complete!')
console.log(
  `Generated ${svgFiles.length} icon components and updated all Icon system files.`,
)

// Helper function to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}
