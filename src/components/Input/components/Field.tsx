import { NativeSyntheticEvent, TargetedEvent, TextInput } from 'react-native'
import { useInputContext } from '../hooks/InputContext'
import { styles } from '../styles'
import { InputFieldProps } from '../types'

export function Field({
  variant,
  state,
  style,
  onFocus,
  onBlur,
  ...props
}: InputFieldProps) {
  const context = useInputContext()
  const finalVariant = variant || context.variant

  const textInputStyle = [
    finalVariant === 'percentage'
      ? styles.percentageTextInput
      : styles.textInput,
    finalVariant === 'percentage' && { textAlign: 'center' as const },
    style,
  ]

  const handleFocus = (e: NativeSyntheticEvent<TargetedEvent>) => {
    context.handleFocus()
    onFocus?.(e)
  }

  const handleBlur = (e: NativeSyntheticEvent<TargetedEvent>) => {
    context.handleBlur()
    onBlur?.(e)
  }

  return (
    <TextInput
      style={textInputStyle}
      placeholderTextColor={styles.placeholderText.color}
      keyboardType={finalVariant === 'percentage' ? 'numeric' : 'default'}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  )
}
