import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.gray[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    ...textStyles.titleSm,
    color: colors.gray[700],
  },
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 20,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    ...textStyles.textXs,
    color: colors.gray[500],
  },
  sectionOptions: {
    gap: 12,
  },
  footer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
})
