import { Button, Text, View } from 'react-native'
import { StackRoutesProps } from '@/routes/StackRoutes'

export function QuoteDetails({
  navigation,
  route,
}: StackRoutesProps<'quoteDetails'>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Quote Details</Text>
      <Text>Quote ID: {route.params.quoteId}</Text>
      <Button title="Go Back" onPress={navigation.goBack} />
    </View>
  )
}
