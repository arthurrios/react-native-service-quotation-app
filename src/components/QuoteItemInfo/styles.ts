import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  nameText: {
    ...textStyles.titleSm,
    color: colors.gray[700],
  },
  descriptionText: {
    ...textStyles.textXs,
    color: colors.gray[500],
  },
  priceContainer: {
    alignItems: 'flex-end',
    gap: 2,
  },
  qtyText: {
    ...textStyles.textXs,
    color: colors.gray[600],
  },
})
