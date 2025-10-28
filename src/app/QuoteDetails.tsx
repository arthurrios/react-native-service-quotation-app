import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { QuoteHeader } from '@/components/QuoteHeader'
import { useQuotes } from '@/hooks/useQuotes'
import { StackRoutesProps } from '@/routes/StackRoutes'

export function QuoteDetails({
  navigation,
  route,
}: StackRoutesProps<'quoteDetails'>) {
  const { top } = useSafeAreaInsets()
  const { quotes } = useQuotes()
  const quote = quotes.find((quote) => quote.id === route.params.quoteId)
  return (
    <View style={{ paddingTop: top }}>
      <QuoteHeader quote={quote} onBack={navigation.goBack} />
    </View>
  )
}
