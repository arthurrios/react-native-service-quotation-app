import { FC } from 'react'
import { iconRegistry } from './registry'
import { IconProps } from './types'

export const Icon: FC<IconProps> = ({
  name,
  width = 24,
  height = 24,
  color = '#000',
  ...props
}) => {
  const IconComponent = iconRegistry[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`)
    return null
  }

  return (
    <IconComponent
      name={name}
      width={width}
      height={height}
      color={color}
      {...props}
    />
  )
}
