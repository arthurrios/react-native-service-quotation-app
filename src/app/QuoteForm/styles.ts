import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

const subtotalText = {
  ...textStyles.textSm,
  color: colors.gray[700],
}

export const styles = StyleSheet.create({
  subtotalText,
  discountText: subtotalText,
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    ...textStyles.titleSm,
    color: colors.gray[700],
  },
  totalContainer: {
    alignItems: 'flex-end',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
})
