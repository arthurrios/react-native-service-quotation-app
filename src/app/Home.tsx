import { Text, View } from 'react-native'
import { Button, IconButton } from '@/components/Button/Button'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { textStyles } from '@/styles'

export function Home({ navigation }: StackRoutesProps<'home'>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={textStyles.titleLg}>Home</Text>
      <Button
        title="Go to Quote Form"
        onPress={() => navigation.navigate('quoteForm')}
      />
      <Button title="Label" icon="direction-up-right" variant="danger" />
      <IconButton icon="filter" variant="secondary" />
    </View>
  )
}
