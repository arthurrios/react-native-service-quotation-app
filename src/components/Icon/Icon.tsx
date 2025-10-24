import { FC } from 'react'
import { iconRegistry } from './registry'
import { IconProps } from './types'

export const Icon: FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  color = '#000',
  size = 24,
  ...props
}) => {
  const IconComponent = iconRegistry[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`)
    return null
  }

  const finalWidth = size || width
  const finalHeight = size || height

  return (
    <IconComponent
      name={name}
      width={finalWidth}
      height={finalHeight}
      color={color}
      {...props}
    />
  )
}
