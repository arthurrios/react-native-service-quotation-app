import { Button, Text, View } from 'react-native'
import { Check } from '@/assets/icon-components/check'
import { StackRoutesProps } from '@/routes/StackRoutes'

export function Home({ navigation }: StackRoutesProps<'home'>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button
        title="Go to Quote Form"
        onPress={() => navigation.navigate('quoteForm')}
      />
      <Check />
    </View>
  )
}
