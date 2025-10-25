import { DimensionValue, TextInputProps } from 'react-native'
import { IconName } from '@/components/Icon'

export type InputVariant =
  | 'empty'
  | 'filled'
  | 'danger'
  | 'percentage'
  | 'textarea'
  | 'currency'
  | 'quantity'
export type InputState = 'default' | 'focus'

export interface BaseInputProps
  extends Omit<TextInputProps, 'onFocus' | 'onBlur' | 'value'> {
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

export interface InputFieldProps extends Omit<TextInputProps, 'value'> {
  variant?: InputVariant
  state?: InputState
  value?: number | string
  onChangeValue?: (value: number | string) => void
  rows?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

// Specific types for different variants
export interface TextareaInputProps
  extends Omit<InputFieldProps, 'value' | 'onChangeValue'> {
  variant: 'textarea'
  value?: string
  onChangeValue?: (value: string) => void
}

export interface CurrencyInputProps
  extends Omit<InputFieldProps, 'value' | 'onChangeValue'> {
  variant: 'currency'
  value?: number | string
  onChangeValue?: (value: number | string) => void
}

export interface QuantityInputProps
  extends Omit<InputFieldProps, 'value' | 'onChangeValue'> {
  variant: 'quantity'
  value?: number | string
  onChangeValue?: (value: number | string) => void
  min?: number
  max?: number
  step?: number
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
  value?: number | string
  onChangeValue?: (value: number | string) => void
  rows?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}
