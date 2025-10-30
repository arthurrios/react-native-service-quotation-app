import { useEffect, useState } from 'react'
import { ModalProps, Text, View } from 'react-native'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { ModalComponent } from '../Modal'
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
  { value: 'mostRecent', label: 'Most recent' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'highestPrice', label: 'Highest price' },
  { value: 'lowestPrice', label: 'Lowest price' },
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
    <ModalComponent
      visible={visible}
      onClose={onClose}
      title="Filter and sort"
      {...props}
      footer={
        <View style={styles.footer}>
          <Button.Root variant="secondary" onPress={onReset}>
            <Button.Title>Reset filters</Button.Title>
          </Button.Root>
          <Button.Root variant="primary" onPress={onApply}>
            <Button.Icon name="check" />
            <Button.Title>Apply</Button.Title>
          </Button.Root>
        </View>
      }
    >
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
        <Text style={styles.sectionTitle}>Sorting</Text>
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
    </ModalComponent>
  )
}
