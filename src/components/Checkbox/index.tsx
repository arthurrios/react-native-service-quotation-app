import { Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles'
import { Icon } from '../Icon'
import { styles } from './styles'
import { CheckboxProps } from './types'

export function Checkbox({
  label,
  checked = false,
  onToggle,
  disabled = false,
  ...props
}: CheckboxProps) {
  function handleToggle() {
    if (!disabled) onToggle?.()
  }

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      activeOpacity={0.7}
      onPress={handleToggle}
      {...props}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Icon name="check" size={16} color={colors.white} />}
      </View>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}
