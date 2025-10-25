import { View } from 'react-native'
import { Button } from '@/components'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { MoneyLabel } from '@/components/MoneyLabel'
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

        <MoneyLabel value={3847.5} size="lg" />

        <MoneyLabel value={3847.5} />

        <MoneyLabel value={-200} color="danger" />
        <MoneyLabel value={200} color="success" />

        <MoneyLabel value={4050.0} size="sm" strikethrough />
      </View>
    </View>
  )
}
