import { Text, View } from 'react-native'
import { Button, Status } from '@/components'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { Radio } from '@/components/Radio'
import { useRadio } from '@/components/Radio/useRadio'
import { StatusType } from '@/components/Status/types'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'

const statusOptions = [
  { value: StatusType.SENT, label: <Status status={StatusType.SENT} /> },
  { value: StatusType.DRAFT, label: <Status status={StatusType.DRAFT} /> },
]

export function Home({ navigation }: StackRoutesProps<'home'>) {
  const { selectedValue, isSelected, select } = useRadio<string>('Radio 1')
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <HomeHeader />
      <View style={{ paddingVertical: 24, paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Input icon="search" placeholder="Título ou cliente" />
          </View>
          <Button.Root variant="secondary">
            <Button.Icon name="filter" />
          </Button.Root>
        </View>
        {statusOptions.map((option) => (
          <Radio
            key={option.value}
            label={option.label}
            selected={isSelected(option.value)}
            onSelect={() => select(option.value)}
          />
        ))}
        <Text>{selectedValue}</Text>
      </View>
    </View>
  )
}
