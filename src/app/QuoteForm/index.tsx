import { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { Button, Radio, Status } from '@/components'
import { Card } from '@/components/Card'
import { statusOptions } from '@/components/FilterModal'
import { Input } from '@/components/Input'
import { MoneyLabel } from '@/components/MoneyLabel'
import { QuoteHeader } from '@/components/QuoteHeader'
import { QuoteItemInfo } from '@/components/QuoteItemInfo'
import { QuoteItemModal } from '@/components/QuoteItemModal'
import { QuoteDoc } from '@/data'
import { storageService } from '@/data/storage'
import { useQuoteForm } from '@/hooks/useQuoteForm'
import { calculateQuoteTotal } from '@/hooks/useQuotes'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'
import { styles } from './styles'

export function QuoteForm({
  navigation,
  route,
}: StackRoutesProps<'quoteForm'>) {
  const [quote, setQuote] = useState<QuoteDoc | null>(null)

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
    setDiscountPct,
    discountPct,
    total,
    discount,
    totalWithDiscount,
    itemsQuantity,
    hasTitleError,
    hasClientError,
    setHasTouchedTitle,
    setHasTouchedClient,
    handleSave,
  } = useQuoteForm({ navigation, quote: quote ?? undefined })

  useEffect(() => {
    if (route.params?.quoteId) {
      async function getQuote() {
        const quote = await storageService.getQuote(route.params?.quoteId ?? '')
        if (quote) {
          setQuote(quote)
        }
      }
      getQuote()
    }
  }, [route.params?.quoteId])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <QuoteHeader onBack={navigation.goBack} quote={quote ?? undefined} />
      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card
          icon="shop"
          title="Informações gerais"
          style={{ padding: 16, gap: 12 }}
        >
          <Input
            placeholder="Título"
            value={title}
            onChangeValue={(value) => setTitle(value as string)}
            onBlur={() => setHasTouchedTitle(true)}
            variant={hasTitleError ? 'danger' : 'empty'}
          />
          <Input
            placeholder="Cliente"
            value={client}
            onChangeValue={(value) => setClient(value as string)}
            onBlur={() => setHasTouchedClient(true)}
            variant={hasClientError ? 'danger' : 'empty'}
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
        <Card title="Investimento" icon="credit-card">
          <View style={{ padding: 16, gap: 20 }}>
            <View style={styles.rowContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <View style={{ ...styles.rowContainer, gap: 12 }}>
                <Text>{itemsQuantity} itens</Text>
                <MoneyLabel value={calculateQuoteTotal({ items })} />
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={{ ...styles.rowContainer, gap: 8 }}>
                <Text style={styles.discountText}>Desconto</Text>
                <Input
                  variant="percentage"
                  value={discountPct}
                  onChangeValue={(value) => setDiscountPct(Number(value))}
                />
              </View>
              {discountPct > 0 && (
                <MoneyLabel color="danger" isNegative value={discount} />
              )}
            </View>
          </View>
          <View
            style={[
              styles.rowContainer,
              {
                backgroundColor: colors.gray[100],
                borderTopWidth: 1,
                borderTopColor: colors.gray[200],
                paddingVertical: 16,
                paddingHorizontal: 20,
              },
            ]}
          >
            <Text style={styles.totalText}>Valor total</Text>
            <View style={styles.totalContainer}>
              {discountPct > 0 && <MoneyLabel strikethrough value={total} />}
              <MoneyLabel size="xl" value={totalWithDiscount} />
            </View>
          </View>
        </Card>
      </ScrollView>
      <View style={styles.footer}>
        <Button.Root variant="secondary" onPress={navigation.goBack}>
          <Button.Title>Cancelar</Button.Title>
        </Button.Root>
        <Button.Root variant="primary" onPress={handleSave}>
          <Button.Icon name="check" />
          <Button.Title>Salvar</Button.Title>
        </Button.Root>
      </View>
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
    </KeyboardAvoidingView>
  )
}
