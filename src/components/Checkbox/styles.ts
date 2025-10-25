import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.gray[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.purple.base,
    borderColor: colors.purple.base,
  },
  label: {
    ...textStyles.textMd,
    color: colors.gray[600],
    flex: 1,
  },
  labelDisabled: {
    color: colors.gray[400],
  },
})
