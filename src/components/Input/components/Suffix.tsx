import { Text } from 'react-native'
import { useInputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputSuffixProps } from '../types'

export function Suffix({ children, variant, state }: InputSuffixProps) {
  const context = useInputContext()
  const finalVariant = variant || context.variant
  const finalState = state || context.state

  const suffixColorKey = `${finalVariant}${finalState === 'focus' ? 'Focus' : ''}NestedComponentColor`
  const suffixStyle = styles[suffixColorKey as keyof typeof styles] as {
    color: string
  }

  return <Text style={[suffixStyle, styles.prefixText]}>{children}</Text>
}
