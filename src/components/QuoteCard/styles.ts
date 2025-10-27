import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 12,
  },
  quoteTitle: {
    ...textStyles.titleMd,
    color: colors.gray[700],
  },
  quoteClient: {
    ...textStyles.textSm,
    color: colors.gray[600],
  },
  status: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
})
