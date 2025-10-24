import { Button, Text, View } from 'react-native'
import { StackRoutesProps } from '@/routes/StackRoutes'

export function QuoteForm({
  navigation,
  route,
}: StackRoutesProps<'quoteForm'>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Quote</Text>
      <Text>Quote ID: {route.params?.quoteId}</Text>
      <Button
        title="Go to Quote Details"
        onPress={() => navigation.navigate('quoteDetails', { quoteId: '123' })}
      />
      <Button title="Go Back" onPress={navigation.goBack} />
    </View>
  )
}
