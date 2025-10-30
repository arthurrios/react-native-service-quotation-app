import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { QuoteDoc } from '@/data'
import { statusMapping } from '@/data/seed'
import { MoneyLabel } from '../MoneyLabel'
import { Status } from '../Status'
import { styles } from './styles'

interface QuoteCardProps extends TouchableOpacityProps {
  quote: QuoteDoc
}

export function QuoteCard({ quote, ...props }: QuoteCardProps) {
  const totalWithoutDiscount = quote.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  )
  const totalWithDiscount =
    totalWithoutDiscount * (1 - (quote.discountPct ?? 0) / 100)
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <View style={{ gap: 8, flexShrink: 1 }}>
        <Text style={styles.quoteTitle}>{quote.title}</Text>
        <Text style={styles.quoteClient}>{quote.client}</Text>
      </View>
      <MoneyLabel value={totalWithDiscount} size="lg" />
      <Status status={statusMapping[quote.status]} style={styles.status} />
    </TouchableOpacity>
  )
}
