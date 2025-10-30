import { Text, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles'
import { QuoteItem } from '@/types/quote'
import { Icon } from '../Icon'
import { MoneyLabel } from '../MoneyLabel'
import { styles } from './styles'

export interface QuoteItemProps {
  quoteItem: QuoteItem
  shouldEllipseText?: boolean
  onEditItem?: (item: QuoteItem) => void
}

export function QuoteItemInfo({
  quoteItem,
  onEditItem,
  shouldEllipseText = false,
}: QuoteItemProps) {
  const numberOfLines = shouldEllipseText ? 1 : undefined
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText} numberOfLines={numberOfLines}>
          {quoteItem.name}
        </Text>
        <Text style={styles.descriptionText} numberOfLines={numberOfLines}>
          {quoteItem.description}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <MoneyLabel size="lg" value={quoteItem.price} />
        <Text style={styles.qtyText}>Qt: {quoteItem.qty}</Text>
      </View>
      {onEditItem && (
        <TouchableOpacity onPress={() => onEditItem?.(quoteItem)}>
          <Icon name="edit-pen" size={20} color={colors.purple.base} />
        </TouchableOpacity>
      )}
    </View>
  )
}
