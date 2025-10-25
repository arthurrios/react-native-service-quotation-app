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
  StatusType.SENT,
  StatusType.DRAFT,
  StatusType.APPROVED,
  StatusType.DECLINED,
]

const serviceItems = ['installation', 'maintenance', 'cleaning', 'repair']

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

        {statusItems.map((status) => (
          <Checkbox
            key={status}
            label={<Status status={status} />}
            checked={isStatusChecked(status)}
            onToggle={() => toggleStatus(status)}
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
          {serviceItems.map((service) => (
            <Checkbox
              key={service}
              label={
                service === 'installation'
                  ? 'Instalação'
                  : service === 'maintenance'
                    ? 'Manutenção'
                    : service === 'cleaning'
                      ? 'Limpeza'
                      : 'Reparo'
              }
              checked={isServiceChecked(service)}
              onToggle={() => toggleService(service)}
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
