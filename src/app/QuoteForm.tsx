import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Radio, Status } from '@/components'
import { Card } from '@/components/Card'
import { statusOptions } from '@/components/FilterModal'
import { Input } from '@/components/Input'
import { QuoteHeader } from '@/components/QuoteHeader'
import { useQuoteForm } from '@/hooks/useQuoteForm'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'

export function QuoteForm({ navigation }: StackRoutesProps<'quoteForm'>) {
  const { top } = useSafeAreaInsets()
  const { selectStatus, isStatusSelected, title, setTitle, client, setClient } =
    useQuoteForm()
  return (
    <View style={{ paddingTop: top, flex: 1, backgroundColor: colors.white }}>
      <QuoteHeader onBack={navigation.goBack} />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 20 }}>
        <Card
          icon="shop"
          title="Informações gerais"
          style={{ padding: 16, gap: 12 }}
        >
          <Input placeholder="Título" value={title} onChangeText={setTitle} />
          <Input
            placeholder="Cliente"
            value={client}
            onChangeText={setClient}
          />
        </Card>
        <Card
          icon="tag"
          title="Status"
          style={{
            padding: 16,
            gap: 12,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'space-between',
            }}
          >
            {statusOptions.map((item) => (
              <View key={item} style={{ width: '48%' }}>
                <Radio
                  label={<Status status={item} />}
                  selected={isStatusSelected(item)}
                  onSelect={() => selectStatus(item)}
                />
              </View>
            ))}
          </View>
        </Card>
        <Card
          icon="note-with-text"
          title="Serviços inclusos"
          style={{ padding: 16, gap: 12 }}
        >
          <Button.Root variant="secondary">
            <Button.Icon name="plus" />
            <Button.Title>Adicionar serviço</Button.Title>
          </Button.Root>
        </Card>
      </ScrollView>
    </View>
  )
}
