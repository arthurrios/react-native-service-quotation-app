import { StyleSheet, TextStyle } from 'react-native'
import { colors, textStyles } from '@/styles'
import { MoneyLabelStyleProps, MoneySize } from './types'

const sizeToTextStyleMap: Record<MoneySize, TextStyle> = {
  sm: textStyles.textXs,
  md: textStyles.textSm,
  base: textStyles.titleXs,
  lg: textStyles.titleMd,
  xl: textStyles.titleLg,
}

export const colorMap: Record<string, string> = {
  default: colors.gray[700],
  success: colors.success.dark,
  danger: colors.danger.base,
}

export function getMoneyStyles({
  size,
  strikethrough,
  color,
}: MoneyLabelStyleProps) {
  const baseColor = strikethrough ? colors.gray[400] : colorMap[color]

  const baseStyle: TextStyle = {
    ...sizeToTextStyleMap[size],
    color: baseColor,
    textDecorationLine: strikethrough ? 'line-through' : 'none',
  }

  return StyleSheet.create({
    prefix: {
      ...baseStyle,
      ...textStyles.textXs,
    },
    minus: {
      ...baseStyle,
    },
    value: {
      ...baseStyle,
    },
    strikethrough: {
      ...baseStyle,
      color: colors.gray[600],
    },
  })
}
