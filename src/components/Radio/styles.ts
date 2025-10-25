import { StyleSheet } from 'react-native'
import { textStyles } from '@/styles'
import { colors } from '@/styles/colors'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.purple.base,
    backgroundColor: colors.purple.base,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.white,
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
