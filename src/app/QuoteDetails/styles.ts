import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  quoteInfoContainer: {
    backgroundColor: colors.gray[100],
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  quoteInfoContainerHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  titleContainer: {
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: colors.purple.light,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteInfoContainerTitle: {
    ...textStyles.titleLg,
    color: colors.gray[700],
  },
  quoteInfoContainerContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  infoContainer: {
    flex: 1,
    gap: 4,
  },
  infoHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    ...textStyles.textXs,
    color: colors.gray[600],
  },
  cardValue: {
    ...textStyles.textSm,
    color: colors.gray[700],
  },
  valueLabel: {
    ...textStyles.textSm,
    color: colors.gray[600],
  },
  totalValueLabel: {
    ...textStyles.titleSm,
    color: colors.gray[700],
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray[200],
    width: '100%',
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  quoteActionsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  discountValueContainer: {
    backgroundColor: colors.success.light,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountValueText: {
    ...textStyles.titleXs,
    color: colors.success.dark,
  },
})
