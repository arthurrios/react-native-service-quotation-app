import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '../Button'
import { styles } from './styles'

interface HomeHeaderProps {
  onNewQuote: () => void
  draftQuotesCount: number
}

export function HomeHeader({ onNewQuote, draftQuotesCount }: HomeHeaderProps) {
  const { top } = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View>
        <Text style={styles.title}>Orçamentos</Text>
        {draftQuotesCount > 0 && (
          <Text style={styles.description}>
            Você tem {draftQuotesCount} item{draftQuotesCount > 1 ? 's' : ''} em
            rascunho
          </Text>
        )}
      </View>
      <Button.Root onPress={onNewQuote}>
        <Button.Icon name="plus" />
        <Button.Title>Novo</Button.Title>
      </Button.Root>
    </View>
  )
}
