import { Text } from 'react-native'
import { useButtonContext } from '../hooks/ButtonContext'
import { styles } from '../styles'
import { ButtonTextProps } from '../types'

function Title({ children, variant }: ButtonTextProps) {
  const context = useButtonContext()
  const finalVariant = variant || context.variant
  const textStyle = styles[`${finalVariant}Text`]

  return <Text style={textStyle}>{children}</Text>
}

export { Title }
