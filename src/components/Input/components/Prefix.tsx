import { Text } from 'react-native'
import { useInputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputPrefixProps } from '../types'

export function Prefix({ children, variant, state }: InputPrefixProps) {
  const context = useInputContext()
  const finalVariant = variant || context.variant
  const finalState = state || context.state

  const prefixColorKey = `${finalVariant}${finalState === 'focus' ? 'Focus' : ''}NestedComponentColor`
  const prefixStyle = styles[prefixColorKey as keyof typeof styles] as {
    color: string
  }

  return <Text style={[prefixStyle, styles.prefixText]}>{children}</Text>
}
