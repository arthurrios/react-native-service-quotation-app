import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { QuoteHeader } from '@/components/QuoteHeader'
import { StackRoutesProps } from '@/routes/StackRoutes'

export function QuoteForm({ navigation }: StackRoutesProps<'quoteForm'>) {
  const { top } = useSafeAreaInsets()
  return (
    <View style={{ paddingTop: top }}>
      <QuoteHeader onBack={navigation.goBack} />
    </View>
  )
}
