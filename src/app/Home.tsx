import { useState } from 'react'
import { View } from 'react-native'
import { Button } from '@/components'
import { HomeHeader } from '@/components/HomeHeader'
import { Input } from '@/components/Input'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'

export function Home({ navigation }: StackRoutesProps<'home'>) {
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState<string | number>('')
  const [quantity, setQuantity] = useState<string | number>('')
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
        <View style={{ marginTop: 24 }}>
          <Input
            variant="textarea"
            placeholder="Describe your service..."
            rows={4}
            value={description}
            onChangeValue={(value) => setDescription(String(value))}
          />

          <View style={{ marginTop: 24, flexDirection: 'row', gap: 8 }}>
            <Input
              variant="currency"
              placeholder="0,00"
              value={price}
              onChangeValue={setPrice}
              style={{ flex: 1 }}
            />

            <Input
              variant="quantity"
              value={quantity}
              onChangeValue={setQuantity}
              min={1}
              max={99}
              step={1}
              disabled={false}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
