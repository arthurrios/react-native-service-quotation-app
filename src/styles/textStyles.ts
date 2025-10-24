import { StyleSheet } from 'react-native'
import { typography } from './typography'

export const textStyles = StyleSheet.create({
  // Title Styles
  titleLg: {
    fontFamily: typography.fontFamily.bold,
    ...typography.title.lg,
  },
  titleMd: {
    fontFamily: typography.fontFamily.bold,
    ...typography.title.md,
  },
  titleSm: {
    fontFamily: typography.fontFamily.bold,
    ...typography.title.sm,
  },
  titleXs: {
    fontFamily: typography.fontFamily.bold,
    ...typography.title.xs,
  },

  // Text Styles
  textMd: {
    fontFamily: typography.fontFamily.regular,
    ...typography.text.md,
  },
  textSm: {
    fontFamily: typography.fontFamily.regular,
    ...typography.text.sm,
  },
  textXs: {
    fontFamily: typography.fontFamily.regular,
    ...typography.text.xs,
  },
})
