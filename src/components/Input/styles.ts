import { StyleSheet, ViewStyle } from 'react-native'
import { colors, textStyles, typography } from '@/styles'

const baseInputStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 999,
  paddingHorizontal: 16,
  paddingVertical: 12,
  gap: 8,
}

export const styles = StyleSheet.create({
  // Base input container
  container: {
    ...baseInputStyle,
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[300],
  },

  // Variant Styles
  empty: {
    borderColor: colors.gray[300],
  },

  filled: {
    borderColor: colors.purple.base,
  },

  danger: {
    borderColor: colors.danger.base,
  },

  percentage: {
    borderColor: colors.gray[300],
  },

  // State Styles
  focus: {
    borderColor: colors.purple.base,
  },

  // Icon styles for each variant and state
  emptyNestedComponentColor: {
    color: colors.gray[600],
  },

  emptyFocusNestedComponentColor: {
    color: colors.purple.base,
  },

  filledNestedComponentColor: {
    color: colors.gray[600],
  },

  filledFocusNestedComponentColor: {
    color: colors.purple.base,
  },

  dangerNestedComponentColor: {
    color: colors.danger.base,
  },

  dangerFocusNestedComponentColor: {
    color: colors.danger.base,
  },

  percentageNestedComponentColor: {
    color: colors.gray[600],
  },

  percentageFocusNestedComponentColor: {
    color: colors.purple.base,
  },

  // Text input styles
  textInput: {
    flex: 1,
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
  },

  // Percentage variant - centered text
  percentageTextInput: {
    flex: 1,
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
    textAlign: 'center',
  },

  prefixText: {
    fontFamily: typography.fontFamily.bold,
    ...typography.text.md,
  },

  placeholderText: {
    color: colors.gray[500],
  },
})
