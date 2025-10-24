import { Text, View } from 'react-native'
import { Button } from '../Button'
import { styles } from './styles'

export function HomeHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Orçamentos</Text>
        <Text style={styles.description}>Você tem 1 item em rascunho</Text>
      </View>
      <Button.Root>
        <Button.Icon name="plus" />
        <Button.Title>Novo</Button.Title>
      </Button.Root>
    </View>
  )
}
