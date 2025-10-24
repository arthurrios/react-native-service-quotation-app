import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

const baseSecondaryStyle = {
  backgroundColor: colors.gray[100],
  borderWidth: 1,
  borderColor: colors.gray[300],
}

export const styles = StyleSheet.create({
  // Base button container
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 999,
    gap: 8,
  },

  // Primary variant
  primary: {
    backgroundColor: colors.purple.base,
  },

  // Secondary variant
  secondary: baseSecondaryStyle,

  // Danger variant
  danger: baseSecondaryStyle,

  // Text styles for each variant
  primaryText: {
    ...textStyles.titleMd,
    color: colors.white,
  },

  secondaryText: {
    ...textStyles.titleMd,
    color: colors.gray[700],
  },

  dangerText: {
    ...textStyles.titleMd,
    color: colors.danger.base,
  },

  // Icon styles for each variant
  primaryIconColor: {
    color: colors.white,
  },

  secondaryIconColor: {
    color: colors.purple.base,
  },

  dangerIconColor: {
    color: colors.danger.base,
  },
})
