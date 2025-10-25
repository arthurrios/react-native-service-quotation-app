import { TouchableOpacityProps } from 'react-native'

export interface CheckboxProps extends TouchableOpacityProps {
  label: string | React.ReactNode
  checked?: boolean
  onToggle?: () => void
  disabled?: boolean
}
