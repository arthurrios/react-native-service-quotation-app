import { Icon as IconComponent } from '../../Icon'
import { useButtonContext } from '../hooks/ButtonContext'
import { styles } from '../styles'
import { ButtonIconProps } from '../types'

function Icon({ name, variant, size = 24 }: ButtonIconProps) {
  const context = useButtonContext()
  const finalVariant = variant || context.variant
  const iconColor = styles[`${finalVariant}IconColor`].color

  return <IconComponent name={name} size={size} color={iconColor} />
}

export { Icon }
