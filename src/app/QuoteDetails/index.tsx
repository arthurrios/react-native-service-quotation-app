import { Alert, ScrollView, Share, Text, View } from 'react-native'
import { Button } from '@/components'
import { Card } from '@/components/Card'
import { Icon } from '@/components/Icon'
import { MoneyLabel } from '@/components/MoneyLabel'
import { QuoteHeader } from '@/components/QuoteHeader'
import { QuoteItemInfo } from '@/components/QuoteItemInfo'
import {
  calculateQuoteDiscount,
  calculateQuoteTotal,
  useQuotes,
} from '@/hooks/useQuotes'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { colors } from '@/styles'
import { styles } from './styles'

export function QuoteDetails({
  navigation,
  route,
}: StackRoutesProps<'quoteDetails'>) {
  const { quotes, deleteQuote, addQuote } = useQuotes()
  const quote = quotes.find((quote) => quote.id === route.params.quoteId)

  const totalValue = calculateQuoteTotal({ items: quote?.items ?? [] })
  const discountValue = calculateQuoteDiscount({
    items: quote?.items ?? [],
    discountPct: quote?.discountPct ?? 0,
  })

  function handleDeleteQuote() {
    Alert.alert(
      'Excluir cotação',
      'Tem certeza que deseja excluir esta cotação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteQuote(route.params.quoteId)
              navigation.goBack()
              Alert.alert('Cotação excluída com sucesso')
            } catch (error) {
              console.error('Error deleting quote:', error)
              Alert.alert('Erro', 'Erro ao excluir cotação')
            }
          },
        },
      ],
    )
  }

  async function handleDuplicateQuote() {
    if (!quote) return
    try {
      const { id, createdAt, updatedAt, ...rest } = quote
      await addQuote({
        ...rest,
      })

      Alert.alert('Cotação duplicada com sucesso')

      navigation.goBack()
    } catch (error) {
      console.error('Error copying quote:', error)
      Alert.alert('Erro', 'Erro ao duplicar cotação')
    }
  }

  function handleEditQuote() {
    navigation.navigate('quoteForm', { quoteId: route.params.quoteId })
  }

  const handleShare = () => {
    Share.share({
      message: `Veja esta cotação: ${quote?.title}`,
      url: `https://www.google.com`,
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <QuoteHeader quote={quote} onBack={navigation.goBack} />
      <ScrollView
        contentContainerStyle={{ padding: 20, gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quoteInfoContainer}>
          <View style={styles.quoteInfoContainerHeader}>
            <View style={styles.iconContainer}>
              <Icon name="shop" size={20} color={colors.purple.base} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.quoteInfoContainerTitle} numberOfLines={2}>
                {quote?.title}
              </Text>
            </View>
          </View>
          <View style={styles.quoteInfoContainerContent}>
            <View style={styles.infoContainer}>
              <Text style={styles.cardLabel}>Cliente</Text>
              <Text style={styles.cardValue}>{quote?.client}</Text>
            </View>
            <View style={styles.infoHorizontalContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.cardLabel}>Data de criação</Text>
                <Text style={styles.cardValue}>
                  {quote?.createdAt.toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.cardLabel}>Data de atualização</Text>
                <Text style={styles.cardValue}>
                  {quote?.updatedAt.toLocaleDateString()}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Card
          icon="note-with-text"
          title="Serviços inclusos"
          style={{ paddingVertical: 16, paddingHorizontal: 20, gap: 20 }}
        >
          {quote?.items.map((item) => (
            <QuoteItemInfo key={item.id} quoteItem={item} shouldEllipseText />
          ))}
        </Card>
        <View
          style={[
            styles.quoteInfoContainer,
            {
              flexDirection: 'row',
              gap: 16,
              padding: 16,
              alignItems: discountValue > 0 ? 'flex-start' : 'center',
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Icon name="credit-card" size={20} color={colors.purple.base} />
          </View>
          <View style={{ flex: 1, gap: 8 }}>
            {discountValue > 0 && (
              <>
                <View style={styles.infoContainer}>
                  <View style={styles.infoHorizontalContainer}>
                    <Text style={styles.valueLabel}>Subtotal</Text>
                    <MoneyLabel
                      strikethrough
                      value={totalValue}
                      size="base"
                      prefixStyle={{ color: colors.gray[600] }}
                      style={{ color: colors.gray[600] }}
                    />
                  </View>
                  <View style={styles.infoHorizontalContainer}>
                    <View style={styles.discountContainer}>
                      <Text style={styles.valueLabel}>Desconto</Text>
                      <View style={styles.discountValueContainer}>
                        <Text style={styles.discountValueText}>
                          {quote?.discountPct}% off
                        </Text>
                      </View>
                    </View>
                    <MoneyLabel
                      value={discountValue}
                      isNegative
                      size="base"
                      color="success"
                    />
                  </View>
                </View>
                <View style={styles.separator} />
              </>
            )}
            <View style={styles.infoHorizontalContainer}>
              <Text style={styles.totalValueLabel}>Investimento total</Text>
              <MoneyLabel
                value={totalValue - discountValue}
                size="xl"
                color="default"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.quoteActionsContainer}>
          <Button.Root variant="danger" onPress={handleDeleteQuote}>
            <Button.Icon name="trash-2" />
          </Button.Root>

          <Button.Root variant="secondary" onPress={handleDuplicateQuote}>
            <Button.Icon name="copy" />
          </Button.Root>

          <Button.Root variant="secondary" onPress={handleEditQuote}>
            <Button.Icon name="edit-pen" />
          </Button.Root>
        </View>
        <Button.Root variant="primary" onPress={handleShare}>
          <Button.Icon name="direction-up-right" />
          <Button.Title>Compartilhar</Button.Title>
        </Button.Root>
      </View>
    </View>
  )
}
