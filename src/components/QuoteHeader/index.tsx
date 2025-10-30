import { Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { QuoteDoc } from '@/data'
import { statusMapping } from '@/data/seed'
import { colors } from '@/styles'
import { Icon } from '../Icon'
import { Status } from '../Status'
import { styles } from './styles'

interface QuoteHeaderProps {
  quote?: QuoteDoc
  onBack: () => void
}

export function QuoteHeader({ quote, onBack }: QuoteHeaderProps) {
  const { top } = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={onBack}>
          <Icon name="chevron-left" size={24} color={colors.gray[600]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          Quote {quote ? `#${quote?.id}` : null}
        </Text>
      </View>
      {quote && <Status status={statusMapping[quote?.status]} />}
    </View>
  )
}
