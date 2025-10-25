import { Text, View } from 'react-native'
import { Button } from '@/components'
import { Checkbox } from '@/components/Checkbox'
import { useCheckbox } from '@/components/Checkbox/useCheckbox'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { Status } from '@/components/Status'
import { StatusType } from '@/components/Status/types'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'

const statusItems = [
  { value: StatusType.SENT, label: <Status status={StatusType.SENT} /> },
  { value: StatusType.DRAFT, label: <Status status={StatusType.DRAFT} /> },
  {
    value: StatusType.APPROVED,
    label: <Status status={StatusType.APPROVED} />,
  },
  {
    value: StatusType.DECLINED,
    label: <Status status={StatusType.DECLINED} />,
  },
]

const serviceItems = [
  { value: 'installation', label: 'Instalação' },
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'cleaning', label: 'Limpeza' },
  { value: 'repair', label: 'Reparo' },
]

export function Home({ navigation }: StackRoutesProps<'home'>) {
  const {
    checkedValues: checkedStatus,
    isChecked: isStatusChecked,
    toggle: toggleStatus,
  } = useCheckbox<StatusType>()

  const {
    checkedValues: checkedServices,
    isChecked: isServiceChecked,
    toggle: toggleService,
  } = useCheckbox<string>()
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

        {statusItems.map((item) => (
          <Checkbox
            key={item.value}
            label={item.label}
            checked={isStatusChecked(item.value)}
            onToggle={() => toggleStatus(item.value)}
          />
        ))}

        <Text>Status Selecionados: {checkedStatus.join(', ')}</Text>

        <View style={{ marginTop: 32 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginBottom: 12,
              color: colors.gray[700],
            }}
          >
            Serviços:
          </Text>
          {serviceItems.map((item) => (
            <Checkbox
              key={item.value}
              label={item.label}
              checked={isServiceChecked(item.value)}
              onToggle={() => toggleService(item.value)}
            />
          ))}
          <Text style={{ marginTop: 12 }}>
            Serviços Selecionados: {checkedServices.join(', ')}
          </Text>
        </View>
      </View>
    </View>
  )
}
