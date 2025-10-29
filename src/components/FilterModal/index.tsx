import { useEffect, useState } from 'react'
import { Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Icon } from '../Icon'
import { Radio } from '../Radio'
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
  onStatusChange: (statuses: StatusType[]) => void
  onOrderByChange: (
    orderBy: 'mostRecent' | 'oldest' | 'lowestPrice' | 'highestPrice',
  ) => void
}

export const statusOptions = [
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
  onStatusChange,
  onOrderByChange,
  ...props
}: FilterModalProps) {
  // Local state for temporary changes
  const [tempStatuses, setTempStatuses] = useState<StatusType[]>(statuses)
  const [tempOrderBy, setTempOrderBy] = useState(orderBy)

  // Update local state when props change
  useEffect(() => {
    setTempStatuses(statuses)
    setTempOrderBy(orderBy)
  }, [statuses, orderBy])

  // Handle status toggle
  const handleStatusToggle = (status: StatusType) => {
    const newStatuses = tempStatuses.includes(status)
      ? tempStatuses.filter((s) => s !== status)
      : [...tempStatuses, status]
    setTempStatuses(newStatuses)
    onStatusChange(newStatuses)
  }

  // Handle order by change
  const handleOrderByChange = (
    newOrderBy: 'mostRecent' | 'oldest' | 'lowestPrice' | 'highestPrice',
  ) => {
    setTempOrderBy(newOrderBy)
    onOrderByChange(newOrderBy)
  }

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
                    checked={tempStatuses.includes(option)}
                    onToggle={() => handleStatusToggle(option)}
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
                    selected={tempOrderBy === option.value}
                    onSelect={() => handleOrderByChange(option.value)}
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
