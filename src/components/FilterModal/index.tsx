import { useState } from 'react'
import { Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { useCheckbox } from '../Checkbox/useCheckbox'
import { Icon } from '../Icon'
import { Radio } from '../Radio'
import { useRadio } from '../Radio/useRadio'
import { Status } from '../Status'
import { StatusType } from '../Status/types'
import { styles } from './styles'

export interface FilterModalProps extends ModalProps {
  visible: boolean
  onClose: () => void
  onReset: () => void
  onApply: () => void
  statuses: StatusType[]
  orderBy: 'mostRecent' | 'oldest' | 'lowestPrice' | 'highestPrice'
}

const statusOptions = [
  StatusType.DRAFT,
  StatusType.SENT,
  StatusType.APPROVED,
  StatusType.DECLINED,
]

const orderByOptions: Array<{
  value: 'mostRecent' | 'oldest' | 'lowestPrice' | 'highestPrice'
  label: string
}> = [
  { value: 'mostRecent', label: 'Mais recente' },
  { value: 'oldest', label: 'Mais antigo' },
  { value: 'highestPrice', label: 'Maior valor' },
  { value: 'lowestPrice', label: 'Menor valor' },
]
export function FilterModal({
  visible,
  onClose,
  onReset,
  onApply,
  statuses,
  orderBy,
  ...props
}: FilterModalProps) {
  // Status management with checkboxes (multiple selection)
  const {
    checkedValues: selectedStatuses,
    isChecked: isStatusSelected,
    toggle: toggleStatus,
  } = useCheckbox<StatusType>(statuses)

  // Order by management with radio (single selection)
  const {
    selectedValue: selectedOrderBy,
    isSelected: isOrderBySelected,
    select: selectOrderBy,
  } = useRadio<'mostRecent' | 'oldest' | 'highestPrice' | 'lowestPrice'>(
    orderBy,
  )

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      {...props}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filtrar e ordenar</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="multiply" size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.sectionOptions}>
                {statusOptions.map((option) => (
                  <Checkbox
                    key={option.toString()}
                    label={<Status status={option} />}
                    checked={isStatusSelected(option)}
                    onToggle={() => toggleStatus(option)}
                  />
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ordenação</Text>
              <View style={styles.sectionOptions}>
                {orderByOptions.map((option) => (
                  <Radio
                    key={option.value}
                    label={option.label}
                    selected={isOrderBySelected(option.value)}
                    onSelect={() => selectOrderBy(option.value)}
                  />
                ))}
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Button.Root variant="secondary" onPress={onReset}>
              <Button.Title>Resetar filtros</Button.Title>
            </Button.Root>
            <Button.Root variant="primary" onPress={onApply}>
              <Button.Icon name="check" />
              <Button.Title>Aplicar</Button.Title>
            </Button.Root>
          </View>
        </View>
      </View>
    </Modal>
  )
}
