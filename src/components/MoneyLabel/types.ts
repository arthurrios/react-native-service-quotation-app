import { TextProps } from 'react-native'

export type MoneySize = 'sm' | 'md' | 'lg'

export type MoneyColorVariant = 'default' | 'success' | 'danger'

export interface MoneyLabelProps extends TextProps {
  /** The monetary value in cents (integer) or float */
  value: number
  /** Size variant of the money display: sm (textXs), md (textSm), or lg (titleLg) */
  size?: MoneySize
  /** Color variant: default (gray), success (green), or danger (red) */
  color?: MoneyColorVariant
  /** Whether this is a negative value (shows minus sign) */
  isNegative?: boolean
  /** Whether to show with strikethrough (for original prices) */
  strikethrough?: boolean
  /** Whether to show the "R$" prefix (default: true) */
  showPrefix?: boolean
}

export interface MoneyLabelStyleProps {
  size: MoneySize
  strikethrough: boolean
  color: MoneyColorVariant
}
