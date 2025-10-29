import { Text, View } from 'react-native'
import { QuoteItem } from '@/types/quote'

export interface QuoteItemProps {
  quoteItem: QuoteItem
}

export function QuoteItemInfo({ quoteItem }: QuoteItemProps) {
  return (
    <View>
      <Text>{quoteItem.name}</Text>
    </View>
  )
}
