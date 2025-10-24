import { DimensionValue, TextInputProps } from 'react-native'
import { IconName } from '@/components/Icon'

export type InputVariant = 'empty' | 'filled' | 'danger' | 'percentage'
export type InputState = 'default' | 'focus'

export interface BaseInputProps
  extends Omit<TextInputProps, 'onFocus' | 'onBlur'> {
  variant?: InputVariant
  onFocus?: () => void
  onBlur?: () => void
}

export interface InputRootProps extends BaseInputProps {
  children: React.ReactNode
  width?: DimensionValue
}

export interface InputIconProps {
  name: IconName
  variant?: InputVariant
  state?: InputState
  size?: number
}

export interface InputFieldProps extends TextInputProps {
  variant?: InputVariant
  state?: InputState
}

export interface InputPrefixProps {
  children: React.ReactNode
  variant?: InputVariant
  state?: InputState
}

export interface InputSuffixProps {
  children: React.ReactNode
  variant?: InputVariant
  state?: InputState
}

// Legacy Input Component Props (for backward compatibility)
export interface InputProps extends BaseInputProps {
  icon?: IconName
  prefix?: string
  suffix?: string
  placeholder?: string
  width?: DimensionValue
}
