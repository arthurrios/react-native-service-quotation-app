import { StyleSheet } from 'react-native'
import { colors, textStyles } from '@/styles'
import { StatusType } from './types'

export const getStatusConfig = (status: StatusType) => {
  switch (status) {
    case StatusType.SENT:
      return {
        background: colors.info.light,
        indicator: colors.info.base,
        text: colors.info.dark,
        label: 'Enviado',
      }
    case StatusType.DRAFT:
      return {
        background: colors.gray[300],
        indicator: colors.gray[400],
        text: colors.gray[500],
        label: 'Rascunho',
      }
    case StatusType.APPROVED:
      return {
        background: colors.success.light,
        indicator: colors.success.base,
        text: colors.success.dark,
        label: 'Aprovado',
      }
    case StatusType.DECLINED:
      return {
        background: colors.danger.light,
        indicator: colors.danger.base,
        text: colors.danger.dark,
        label: 'Recusado',
      }
    default:
      return {
        background: colors.gray[300],
        indicator: colors.gray[400],
        text: colors.gray[500],
        label: 'Desconhecido',
      }
  }
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  label: {
    ...textStyles.titleXs,
  },
})
