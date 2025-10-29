import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  section: {
    gap: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    ...textStyles.textXs,
    color: colors.gray[500],
  },
  sectionOptions: {
    gap: 12,
  },
  footer: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
