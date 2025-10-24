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

// Generate icon components using SVGR and adapt to your format
svgFiles.forEach((iconName) => {
  const svgPath = path.join(ICONS_DIR, `${iconName}.svg`)
  const outputPath = path.join(ICON_COMPONENTS_DIR, `${iconName}.tsx`)

  console.log(`Generating component for ${iconName}...`)

  try {
    // Use SVGR to generate the basic component
    const svgrResult = execSync(
      `npx @svgr/cli --native --typescript "${svgPath}"`,
      {
        encoding: 'utf8',
        cwd: process.cwd(),
      },
    )

    // Transform the SVGR output to match your format
    const adaptedComponent = adaptSVGROutput(svgrResult, iconName)

    // Write the adapted component to the output file
    fs.writeFileSync(outputPath, adaptedComponent)
    console.log(`✅ Generated ${iconName}.tsx`)
  } catch (error) {
    console.error(`❌ Failed to generate ${iconName}:`, error.message)
  }
})

// Function to adapt SVGR output to your format
function adaptSVGROutput(svgrOutput, iconName) {
  const componentName = toPascalCase(iconName)

  // Extract the SVG content from SVGR output
  const svgMatch = svgrOutput.match(/<Svg[^>]*>([\s\S]*?)<\/Svg>/)
  if (!svgMatch) {
    throw new Error('Could not extract SVG content from SVGR output')
  }

  const svgContent = svgMatch[1]
  const svgProps = svgrOutput.match(/<Svg([^>]*)>/)?.[1] || ''

  // Extract viewBox from the SVGR output (which should preserve the original)
  const viewBoxMatch = svgProps.match(/viewBox="([^"]*)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 32 32'

  // Create the adapted component in your exact format
  return `import Svg, { Path, SvgProps } from 'react-native-svg'

export const ${componentName} = ({
  width = 24,
  height = 24,
  color = '#000',
  ...props
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="${viewBox}" fill="none" {...props}>
    ${svgContent.replace(/fill="[^"]*"/g, 'fill={color}').replace(/stroke="[^"]*"/g, 'stroke={color}')}
  </Svg>
)
`
}

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
  .map((name) => `  '${name}': ${toPascalCase(name)},`)
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
