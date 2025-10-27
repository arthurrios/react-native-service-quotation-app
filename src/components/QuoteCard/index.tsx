import { Text, View } from 'react-native'
import { QuoteDoc } from '@/data'
import { statusMapping } from '@/data/seed'
import { MoneyLabel } from '../MoneyLabel'
import { Status } from '../Status'
import { styles } from './styles'

interface QuoteCardProps {
  quote: QuoteDoc
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const total = quote.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  )
  return (
    <View style={styles.container}>
      <View style={{ gap: 8, flexShrink: 1 }}>
        <Text style={styles.quoteTitle}>{quote.title}</Text>
        <Text style={styles.quoteClient}>{quote.client}</Text>
      </View>
      <MoneyLabel value={total} size="lg" />
      <Status status={statusMapping[quote.status]} style={styles.status} />
    </View>
  )
}
