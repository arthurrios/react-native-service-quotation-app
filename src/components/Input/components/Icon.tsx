import { Icon as IconComponent } from '../../Icon'
import { useInputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputIconProps } from '../types'

export function Icon({ name, variant, state, size = 20 }: InputIconProps) {
  const context = useInputContext()
  const finalVariant = variant || context.variant
  const finalState = state || context.state

  const iconColorKey = `${finalVariant}${finalState === 'focus' ? 'Focus' : ''}NestedComponentColor`
  const iconColor = (
    styles[iconColorKey as keyof typeof styles] as { color: string }
  ).color

  return <IconComponent name={name} size={size} color={iconColor} />
}
