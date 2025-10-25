import { View } from 'react-native'
import { Button } from '@/components'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { Status } from '@/components/Status'
import { StatusType } from '@/components/Status/types'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'

export function Home({ navigation }: StackRoutesProps<'home'>) {
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
        <Status status={StatusType.SENT} />
        <Status status={StatusType.DRAFT} />
        <Status status={StatusType.APPROVED} />
        <Status status={StatusType.DECLINED} />
      </View>
    </View>
  )
}
