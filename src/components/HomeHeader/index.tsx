import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '../Button'
import { styles } from './styles'

interface HomeHeaderProps {
  onNewQuote: () => void
}

export function HomeHeader({ onNewQuote }: HomeHeaderProps) {
  const { top } = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <View>
        <Text style={styles.title}>Orçamentos</Text>
        <Text style={styles.description}>Você tem 1 item em rascunho</Text>
      </View>
      <Button.Root onPress={onNewQuote}>
        <Button.Icon name="plus" />
        <Button.Title>Novo</Button.Title>
      </Button.Root>
    </View>
  )
}
