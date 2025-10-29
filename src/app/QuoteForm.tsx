import { ScrollView, View } from 'react-native'
import { Button, Radio, Status } from '@/components'
import { Card } from '@/components/Card'
import { statusOptions } from '@/components/FilterModal'
import { Input } from '@/components/Input'
import { QuoteHeader } from '@/components/QuoteHeader'
import { QuoteItemInfo } from '@/components/QuoteItemInfo'
import { QuoteItemModal } from '@/components/QuoteItemModal'
import { useQuoteForm } from '@/hooks/useQuoteForm'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'

export function QuoteForm({ navigation }: StackRoutesProps<'quoteForm'>) {
  const {
    selectStatus,
    isStatusSelected,
    title,
    setTitle,
    client,
    setClient,
    items,
    isQuoteItemModalOpen,
    setIsQuoteItemModalOpen,
    addItem,
    updateItem,
    deleteItem,
    setSelectedItem,
    selectedItem,
  } = useQuoteForm()
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
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
          style={{ padding: 16, gap: 20 }}
        >
          {items.length > 0 && (
            <View style={{ gap: 20 }}>
              {items.map((item) => (
                <QuoteItemInfo
                  key={item.id}
                  quoteItem={item}
                  shouldEllipseText
                  onEditItem={(item) => {
                    setSelectedItem(item)
                    setIsQuoteItemModalOpen(true)
                  }}
                />
              ))}
            </View>
          )}
          <Button.Root
            variant="secondary"
            onPress={() => setIsQuoteItemModalOpen(true)}
          >
            <Button.Icon name="plus" />
            <Button.Title>Adicionar serviço</Button.Title>
          </Button.Root>
        </Card>
      </ScrollView>
      <QuoteItemModal
        visible={isQuoteItemModalOpen}
        onClose={() => {
          setIsQuoteItemModalOpen(false)
          setSelectedItem(null)
        }}
        onAddItem={addItem}
        onUpdateItem={(item) => updateItem(item.id, item)}
        onDeleteItem={deleteItem}
        quoteItem={selectedItem}
      />
    </View>
  )
}
