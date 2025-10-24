import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Icon, IconName } from '../Icon'
import { styles } from './styles'

export type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface BaseButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
}

interface IconButtonProps extends BaseButtonProps {
  icon: IconName
}

interface ButtonProps extends BaseButtonProps {
  title: string
  icon?: IconName
}

function Button({ title, variant = 'primary', icon, ...props }: ButtonProps) {
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  const textStyle = styles[`${variant}Text`]
  const iconColor = styles[`${variant}IconColor`].color

  return (
    <TouchableOpacity style={containerStyle} {...props}>
      {icon && <Icon name={icon} size={24} color={iconColor} />}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

function IconButton({ icon, variant = 'primary', ...props }: IconButtonProps) {
  const containerStyle = {
    ...styles.container,
    ...styles[variant],
  }

  const iconColor = styles[`${variant}IconColor`].color

  return (
    <TouchableOpacity style={containerStyle} {...props}>
      <Icon name={icon} size={24} color={iconColor} />
    </TouchableOpacity>
  )
}

export { Button, IconButton }
