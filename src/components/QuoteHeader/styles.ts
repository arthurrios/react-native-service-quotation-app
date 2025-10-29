import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    borderBottomColor: colors.gray[200],
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    ...textStyles.titleSm,
    color: colors.gray[700],
  },
})
