import { StyleSheet, ViewStyle } from 'react-native'
import { colors, textStyles, typography } from '@/styles'

const baseInputStyle: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 999,
  paddingHorizontal: 16,
  height: 48,
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

  textarea: {
    height: 'auto',
    minHeight: 80,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },

  currency: {},

  quantity: {
    paddingHorizontal: 8,
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

  quantityNestedComponentColor: {
    color: colors.purple.base,
  },

  quantityFocusNestedComponentColor: {
    color: colors.purple.base,
  },

  // Text input styles
  textInput: {
    flex: 1,
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
    lineHeight: textStyles.textMd.fontSize * 1.2,
    textAlignVertical: 'center',
  },

  // Percentage variant - centered text
  percentageTextInput: {
    flex: 1,
    ...textStyles.textMd,
    lineHeight: textStyles.textMd.fontSize * 1.2,
    color: colors.gray[700],
    padding: 0,
    textAlign: 'center',
  },

  // Currency variant - text input style
  currencyTextInput: {
    flex: 1,
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    lineHeight: textStyles.textMd.fontSize * 1.2,
    textAlignVertical: 'center',
  },

  // Textarea variant
  textareaInput: {
    flex: 1,
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
    textAlignVertical: 'top',
  },

  prefixText: {
    fontFamily: typography.fontFamily.bold,
    ...typography.text.md,
  },

  placeholderText: {
    color: colors.gray[500],
  },

  // Quantity input styles
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  quantityButton: {
    width: 20,
    height: 20,
  },

  quantityText: {
    ...textStyles.textMd,
    color: colors.gray[700],
    padding: 0,
    textAlign: 'center',
  },

  disabled: {
    opacity: 0.6,
  },

  disabledButton: {
    opacity: 0.3,
  },

  disabledText: {
    color: colors.gray[400],
  },
})
