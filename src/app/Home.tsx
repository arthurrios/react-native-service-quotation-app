import { Text, View } from 'react-native'
import { Button } from '@/components'
import { StackRoutesProps } from '@/routes/StackRoutes'
import { textStyles } from '@/styles'

export function Home({ navigation }: StackRoutesProps<'home'>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={textStyles.titleLg}>Home</Text>
      <Button.Root onPress={() => navigation.navigate('quoteForm')}>
        <Button.Title>Go to Quote Form</Button.Title>
      </Button.Root>
      <Button.Root variant="secondary">
        <Button.Icon name="filter" />
      </Button.Root>
      <Button.Root variant="danger">
        <Button.Icon name="direction-up-right" />
        <Button.Title>Label</Button.Title>
      </Button.Root>
    </View>
  )
}
