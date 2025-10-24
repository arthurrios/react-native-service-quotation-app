import { Button, Text, View } from 'react-native'
import { Icon } from '@/components'
import { StackRoutesProps } from '@/routes/StackRoutes'

export function Home({ navigation }: StackRoutesProps<'home'>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Button
        title="Go to Quote Form"
        onPress={() => navigation.navigate('quoteForm')}
      />
      <Icon name="check" />
      <Icon name="chevron-left" />
      <Icon name="chevron-right" />
      <Icon name="copy" />
      <Icon name="credit-card" />
      <Icon name="direction-up-right" />
      <Icon name="edit-pen" />
      <Icon name="filter" />
      <Icon name="minus" />
      <Icon name="multiply" />
      <Icon name="note-with-text" />
      <Icon name="plus" />
      <Icon name="search" />
      <Icon name="shop" />
      <Icon name="tag" />
      <Icon name="trash-2" />
      <Icon name="calendar" />
    </View>
  )
}
